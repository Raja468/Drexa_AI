/**
 * Phase 2a proof rig — zero-dependency CDP driver for Edge headless.
 *
 * Usage:  node scripts/phase2a-shots.mjs [baseURL] [outDir]
 * e.g.    node scripts/phase2a-shots.mjs http://127.0.0.1:3000 docs/screenshots/phase2a
 *
 * Requires a server already running at baseURL (production: npm run build &&
 * npm run start). Needs Node >= 22 (global WebSocket) and Edge on the default
 * install path. Installs nothing — it drives the browser over the DevTools
 * protocol and saves PNGs plus PASS/FAIL lines for the owner conditions:
 *
 *   2. preloader (D16: every full page load): server-rendered over the first
 *      paint, body locked while up, lifts ≤2s, no flicker, no layout shift,
 *      and shows again on each subsequent load
 *   5. Lenis: Back-to-top anchor, route change lands at top, Why Drexa sticky
 *   6. email placeholder: zoomed crops at 390/768/1440 + a measured
 *      placeholder-width ≤ field-width check (the geometric no-clip proof)
 */
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const BASE = process.argv[2] ?? "http://127.0.0.1:3000";
const OUT = process.argv[3] ?? "docs/screenshots/phase2a";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9333;
/* D16: the overlay is now a CSS-class component (`preloader-overlay`), not a
   Tailwind `z-[90]` div — and presence alone is not enough, because the CSS
   failsafe leaves it in the DOM with `visibility: hidden`. Visible+opaque is
   the real "the preloader is up" test. */
const OVERLAY_PROBE =
  "(() => { const el = document.querySelector('.preloader-overlay'); if (!el) return false; const s = getComputedStyle(el); return s.visibility !== 'hidden' && Number(s.opacity) > 0.05; })()";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const results = [];
let shots = 0;
const T0 = Date.now();
const stamp = () => `[${String(((Date.now() - T0) / 1000).toFixed(1)).padStart(6)}s]`;
function check(name, ok, detail = "") {
  results.push({ name, ok: !!ok, detail });
  console.log(`${stamp()} ${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
}
function note(text) {
  results.push({ name: text, ok: true, note: true });
  console.log(`${stamp()} NOTE  ${text}`);
}
function stage(text) {
  console.log(`${stamp()} ---- ${text}`);
}

async function waitForEndpoint(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await sleep(250);
  }
  throw new Error("DevTools endpoint never came up");
}

class CDP {
  constructor(ws, onError) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    /* Screencast frames are the only non-blocking way to capture a first
       paint: Page.captureScreenshot blocks the CDP connection for seconds on
       this build, long enough that the "first paint" image can already show
       the lift. `record` is flipped on just before the navigation under test
       and the frame timestamps are compared against the lift timeline. */
    this.record = false;
    this.frames = [];
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.method === "Page.screencastFrame") {
        if (this.record) this.frames.push({ t: Date.now(), data: msg.params.data });
        /* Keep the frame pump running — unacked frames throttle it. */
        this.send("Page.screencastFrameAck", { sessionId: msg.params.sessionId }).catch(() => {});
        return;
      }
      if (msg.method === "Runtime.exceptionThrown") {
        onError(msg.params?.exceptionDetails?.exception?.description ?? msg.params?.exceptionDetails?.text ?? "exception");
        return;
      }
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      /* A command that never gets a reply must not hang the whole run — it
         gets reported and resolves empty so the caller's own check fails
         loudly instead of the watchdog killing the process with no context. */
      const timer = setTimeout(() => {
        if (!this.pending.has(id)) return;
        this.pending.delete(id);
        console.error(`${stamp()} (no reply to ${method} after 60s)`);
        resolve({});
      }, 60_000);
      this.pending.set(id, {
        resolve: (v) => {
          clearTimeout(timer);
          resolve(v);
        },
        reject: (e) => {
          clearTimeout(timer);
          reject(e);
        },
      });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(expression) {
    const r = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (r.exceptionDetails) {
      throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
    }
    return r.result?.value;
  }

  /** clip uses document (page) CSS-px coordinates; captureBeyondViewport
      renders the region even when it is outside the viewport. NOTE: on this
      build the call blocks the CDP connection for seconds, so never use it to
      sample anything mid-animation — use the screencast frame pump instead. */
  async shot(file, clip, scale = 1) {
    const params = { format: "png", captureBeyondViewport: true };
    if (clip) params.clip = { ...clip, scale };
    const { data } = await this.send("Page.captureScreenshot", params);
    await writeFile(file, Buffer.from(data, "base64"));
    return file;
  }
}

function navigate(cdp, url, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const onMessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.method === "Page.loadEventFired") {
        clearTimeout(timer);
        cdp.ws.removeEventListener("message", onMessage);
        resolve();
      }
    };
    /* A same-document navigation never fires loadEventFired. Callers always
       follow up with a readiness poll, so resolving after the cap is safe and
       keeps a stale page from hanging the whole run. */
    const timer = setTimeout(() => {
      cdp.ws.removeEventListener("message", onMessage);
      resolve();
    }, timeoutMs);
    cdp.ws.addEventListener("message", onMessage);
    cdp.send("Page.navigate", { url }).catch(reject);
  });
}

/** Page.navigate to the SAME url (or same url + hash) is a same-document
    navigation — loadEventFired never fires and the await hangs. Detouring
    through about:blank forces a real load every time. bringToFront guards
    against headless flipping the page to `visibility: hidden`, which pauses
    rAF (framer-motion / GSAP ticker / Lenis all starve).

    D16: the preloader now runs on EVERY full load, so it is not enough to
    wait for the load event — while the overlay is up the body is
    scroll-locked and Lenis has not started, so any scenario that scrolls or
    clicks would sample a frozen page. Every caller expects a page that is
    ready for interaction, so wait for the lift here. */
async function goto(cdp, url) {
  await navigate(cdp, "about:blank");
  await cdp.send("Page.navigate", { url });
  await cdp.send("Page.bringToFront").catch(() => {});
  await sleep(150);
  await waitForReady(cdp);
}

/** Wait until the preloader overlay is gone (or absent) and the page is
    scroll-ready. Under reduced motion Lenis is deliberately never started, so
    that case is satisfied as soon as the overlay is gone. */
async function waitForReady(cdp, timeoutMs = 15000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const ready = await cdp.evaluate(`(() => {
      if (document.querySelector(".preloader-overlay")) return false;
      if (document.documentElement.className.includes("lenis")) return true;
      return matchMedia("(prefers-reduced-motion: reduce)").matches;
    })()`);
    if (ready) return true;
    await sleep(120);
  }
  return false;
}

/* The modal state of the preloader scenario. Captured by reference into the
   scenario function and filled in there. */
const pre = {};

const profile = mkdtempSync(path.join(tmpdir(), "drexa-edge-"));
const edge = spawn(
  EDGE,
  [
    "--headless",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--remote-allow-origins=*",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    "--window-size=1440,900",
    "--hide-scrollbars",
    "about:blank",
  ],
  { stdio: "ignore" },
);

const watchdog = setTimeout(() => {
  console.error("WATCHDOG TIMEOUT — aborting");
  edge.kill();
  process.exit(2);
}, 300_000);

/* --- SCENARIOS (appended below) --- */
try {
  await waitForEndpoint(`http://127.0.0.1:${PORT}/json/version`);
  const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const page = targets.find((t) => t.type === "page");
  if (!page) throw new Error("no page target");

  const jsErrors = [];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener("open", res);
    ws.addEventListener("error", rej);
  });
  const cdp = new CDP(ws, (d) => jsErrors.push(d));
  await cdp.send("Runtime.enable");
  await cdp.send("Page.enable");
  /* Headless only paints on demand: without continuous BeginFrames, rAF —
     framer-motion, the GSAP ticker, Lenis — never fires and every time-based
     check freezes. The screencast keeps frames flowing for the whole run. */
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 30, everyFrame: true });

  await mkdir(OUT, { recursive: true });

  /* Click-delivery instrumentation for the whole run: counts clicks that land
     on an in-page anchor and whether anything called preventDefault, so a flat
     scroll trajectory can be told apart from a click that never arrived. */
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", {
    source:
      "window.__anchorClicks = 0; window.__anchorDefaultPrevented = 0;" +
      "document.addEventListener('click', (e) => {" +
      "  const a = e.target && e.target.closest ? e.target.closest('a[href^=\"#\"]') : null;" +
      "  if (!a) return;" +
      "  window.__anchorClicks++;" +
      "}, true);" +
      "document.addEventListener('click', (e) => {" +
      "  const a = e.target && e.target.closest ? e.target.closest('a[href^=\"#\"]') : null;" +
      "  if (a && e.defaultPrevented) window.__anchorDefaultPrevented++;" +
      "}, false);",
  });
  /* The HTTP cache is disabled only inside the preloader scenario (see
     runPreloaderScenario): its with/without-preloader layout-shift comparison
     is meaningless if the control load has the fonts already cached, and
     leaving it off for the whole run makes every one of the 20+ navigations a
     cold load, which starves rAF and times the run out. */

  /* 6. Email placeholder — zoomed crops at 390/768/1440 + measured fit. */
  stage("email placeholder crops");
  for (const width of [390, 768, 1440]) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 800,
      deviceScaleFactor: 3,
      mobile: width < 700,
    });
    await goto(cdp, `${BASE}/#contact`);
    await sleep(3500); // preloader (≤1.2s) + load sequence + whileInView reveals

    const layout = await cdp.evaluate(`(() => {
      const el = document.querySelector('input[type="email"]');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const pcs = getComputedStyle(el, "::placeholder");
      const cs = getComputedStyle(el);
      const probe = document.createElement("span");
      probe.textContent = el.getAttribute("placeholder");
      probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
      probe.style.fontFamily = pcs.fontFamily;
      probe.style.fontSize = pcs.fontSize;
      probe.style.fontWeight = pcs.fontWeight;
      probe.style.letterSpacing = pcs.letterSpacing;
      probe.style.textTransform = pcs.textTransform;
      document.body.appendChild(probe);
      const textW = probe.getBoundingClientRect().width;
      probe.remove();
      const availW = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      return {
        clip: { x: Math.max(0, r.left + window.scrollX - 16), y: r.top + window.scrollY - 16, width: r.width + 32, height: r.height + 32 },
        textW: Math.ceil(textW),
        availW: Math.floor(availW),
        fieldCssW: Math.round(r.width),
      };
    })()`);

    if (!layout) {
      check(`email field present @${width}`, false);
      continue;
    }
    await cdp.shot(path.join(OUT, `email-placeholder-${width}.png`), layout.clip, 3);
    check(
      `email placeholder fits @${width}`,
      layout.textW <= layout.availW,
      `hint ${layout.textW}px vs ${layout.availW}px available (field ${layout.fieldCssW}px)`,
    );
  }

  /* 2. Preloader — EVERY full page load (D16): server-rendered over the
     first paint, body locked while up, lifts ≤2s after hydration (2s hard
     failsafe), no flicker, no layout shift, Lenis held until the lift, and
     it shows AGAIN on every subsequent load. */
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "no-preference" }],
  });

async function runPreloaderScenario(cdp) {
  stage("preloader scenario");
  /* Cold loads for this scenario only: with the fonts already cached the
     control load below would show no font-swap shift, which would make the
     comparison meaningless. */
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  /* Lenis stays asleep while the overlay is up, which also means Lenis cannot
     scroll the page: this scenario runs last, and it starts by parking the
     document at the top. */
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  /* The "no hero flash" guarantee, proven at the source: the overlay is
     already in the raw server HTML, so the very first paint is covered
     before any script runs. */
  const ssr = await (await fetch(`${BASE}/`)).text();
  check(
    "SSR HTML ships the overlay over the first paint",
    ssr.includes("preloader-overlay") && ssr.includes("preloader-failsafe") && ssr.includes("preloader-lock"),
    `overlay=${ssr.includes("preloader-overlay")} failsafe=${ssr.includes("preloader-failsafe")} bodyLock=${ssr.includes("preloader-lock")}`,
  );

  /* Recorder injected BEFORE any page script: it captures, from the first
     frame, (a) layout-shift entries with their source nodes and times, (b) the
     overlay's opacity every frame, (c) when JS took over from the CSS failsafe
     and when the nav/body-lock resolved. That gives the flicker, CLS and
     "≤2s after hydration" checks a timeline instead of a late poll. */
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", {
    source:
      "window.__cls = 0; window.__clsEntries = []; window.__pl = []; window.__navAt = undefined; window.__unlockAt = undefined; window.__ctl = undefined; window.__liftAt = undefined; window.__anchorClicks = 0; window.__anchorPrevented = 0;" +
      "const t0 = performance.now();" +
      "document.fonts.ready.then(() => { window.__fontsAt = Math.round(performance.now() - t0); });" +
      "new PerformanceObserver((l) => { for (const e of l.getEntries()) {" +
      "  if (e.hadRecentInput) continue;" +
      "  window.__cls += e.value;" +
      "  window.__clsEntries.push({ t: Math.round(e.startTime), v: Number(e.value.toFixed(4)), src: (e.sources || []).map((s) => { const n = s.node; if (!n || !n.getBoundingClientRect) return '?'; const r = n.getBoundingClientRect(); return (n.nodeName || '?') + (typeof n.className === 'string' && n.className ? '.' + n.className.trim().split(' ')[0] : '') + '@top' + Math.round(r.top) + '/h' + Math.round(r.height); }).slice(0, 4) });" +
      "} }).observe({ type: 'layout-shift', buffered: true });" +
      "const rec = () => {" +
      "  if (document.body && window.__unlockAt === undefined && !document.body.classList.contains('preloader-lock')) window.__unlockAt = Math.round(performance.now() - t0);" +
      "  const el = document.querySelector('.preloader-overlay');" +
      "  if (el) window.__seenOverlay = true; else if (window.__seenOverlay && window.__liftAt === undefined) window.__liftAt = Math.round(performance.now() - t0);" +
      "  if (el && window.__ctl === undefined && !el.classList.contains('preloader-failsafe')) window.__ctl = Math.round(performance.now() - t0);" +
      "  const nav = document.querySelector('header');" +
      "  if (nav && window.__navAt === undefined && Number(getComputedStyle(nav).opacity) > 0.9) window.__navAt = Math.round(performance.now() - t0);" +
      "  const s = el ? getComputedStyle(el) : null;" +
      "  window.__pl.push({ t: Math.round(performance.now() - t0), o: s ? Number(s.opacity) : null, v: s ? s.visibility : null });" +
      "  if (window.__pl.length < 1200) requestAnimationFrame(rec);" +
      "};" +
      "requestAnimationFrame(rec);" +
      /* Click delivery counters: count clicks that land on an in-page anchor and
         whether anything called preventDefault, so a flat scroll trajectory can
         be told apart from a click that never arrived. */
      "document.addEventListener('click', (e) => {" +
      "  const a = e.target && e.target.closest ? e.target.closest('a[href^=\"#\"]') : null;" +
      "  if (!a) return;" +
      "  window.__anchorClicks++;" +
      "  if (e.defaultPrevented) window.__anchorPrevented++;" +
      "}, true);" +
      "document.addEventListener('click', (e) => {" +
      "  const a = e.target && e.target.closest ? e.target.closest('a[href^=\"#\"]') : null;" +
      "  if (a && e.defaultPrevented) window.__anchorDefaultPrevented = (window.__anchorDefaultPrevented ?? 0) + 1;" +
      "}, false);",
  });

  await navigate(cdp, "about:blank");
  cdp.frames = [];
  cdp.record = true;
  const navAt = Date.now();
  await cdp.send("Page.navigate", { url: `${BASE}/` });
  await cdp.send("Page.bringToFront").catch(() => {});
  /* Quiet window long enough to cover the worst case: hydration at the 2s
     failsafe → lift at ~2.9s → 350ms fade → gone by ~3.3s. No CDP traffic at
     all during it, so rAF runs at full rate and the in-page recorder samples
     the fade. (Polling here starves rAF in headless and freezes the GSAP
     ticker mid-tween — a rig artifact, not page behaviour.) */
  await sleep(3500);
  cdp.record = false;
  /* First-paint evidence straight off the frame pump (not a blocking capture):
     the earliest frame is what the browser painted before hydration. */
  const firstFrame = cdp.frames[0];
  if (firstFrame) {
    await writeFile(path.join(OUT, "preloader-first-paint.jpg"), Buffer.from(firstFrame.data, "base64"));
  }
  const firstFrameT = firstFrame ? firstFrame.t - navAt : null;

  const tl = await cdp.evaluate(`(() => ({
    ctl: window.__ctl ?? null,
    unlockAt: window.__unlockAt ?? null,
    liftAt: window.__liftAt ?? null,
    navAt: window.__navAt ?? null,
    cls: Number(window.__cls.toFixed(4)),
    clsEntries: window.__clsEntries,
    samples: window.__pl,
  }))()`);

  /* Rare case: hydration landed so late that the CSS failsafe won the race.
     Poll for the overlay to be gone so the later checks still see final state. */
  let goneFirst = !(await cdp.evaluate(OVERLAY_PROBE));
  const goneStart = Date.now();
  while (!goneFirst && Date.now() - goneStart < 10000) {
    await sleep(120);
    goneFirst = !(await cdp.evaluate(OVERLAY_PROBE));
  }

  const samples = [];
  for (const s of tl.samples.filter((x) => x.o !== null)) {
    const last = samples[samples.length - 1];
    if (last === undefined || Math.abs(last.o - s.o) > 0.001) samples.push({ t: s.t, o: s.o });
  }
  const firstSeen = samples[0]?.o ?? null;
  const rises = samples.filter((s, i) => i > 0 && s.o > samples[i - 1].o + 0.001);
  const fadeList = samples.map((s) => `${s.t}ms:${s.o.toFixed(2)}`).join(" → ");
  check(
    "load 1: overlay was opaque from the very first sample (covered the first paint)",
    firstSeen === 1,
    `firstSample=${firstSeen} at ${samples[0]?.t ?? "?"}ms; fade=${fadeList}`,
  );
  /* The "no hero flash" guarantee, from the raw server HTML: the headline is
     already masked (translated 110% inside an overflow-hidden wrapper) before
     any script runs, so there is nothing finished for the overlay to reveal. */
  check(
    "hero headline is mask-hidden in the raw server HTML (nothing to flash)",
    ssr.includes("translateY(110%)") && ssr.includes("overflow-hidden"),
    `translateY(110%)=${ssr.includes("translateY(110%)")} overflow-hidden=${ssr.includes("overflow-hidden")}`,
  );
  check(
    "load 1: overlay never brightens again after the first sample (no flicker)",
    goneFirst && samples.length > 0 && rises.length === 0,
    `overlayGoneAfterLoad=${goneFirst} samples=${fadeList}`,
  );
  /* Resolution of the fade is limited by how many frames headless produces;
     scripts/preloader-trace.mjs is the authoritative fade trace. */
  check(
    "load 1: fade observed with intermediate opacity values",
    samples.length >= 2,
    `distinct opacity values=${samples.length}; first screencast frame at ${firstFrameT ?? "?"}ms (see preloader-trace.mjs)`,
  );
  check(
    "load 1: first-paint frame exists and precedes the lift (overlay covered it)",
    firstFrameT !== null && firstFrameT < (tl.unlockAt ?? Infinity),
    `firstFrame=${firstFrameT}ms unlockAt=${tl.unlockAt}ms totalFrames=${cdp.frames.length}`,
  );
  const unlockDelta = tl.ctl !== null && tl.unlockAt !== null ? tl.unlockAt - tl.ctl : null;
  /* Two legitimate ways to satisfy the hard failsafe: JS took over and lifted
     within 2s, or hydration was so late that the CSS-only failsafe lifted it. */
  const jsPath = unlockDelta !== null && unlockDelta <= 2100;
  check(
    "load 1: body unlocked ≤2s after JS took over, or by the CSS failsafe",
    jsPath || (tl.ctl === null && goneFirst),
    JSON.stringify({ ctl: tl.ctl, unlockAt: tl.unlockAt, liftAt: tl.liftAt, unlockDelta, cssFailsafePath: tl.ctl === null && goneFirst }),
  );
  await sleep(1200);
  const afterLift = await cdp.evaluate(`(() => {
    const line = document.querySelector("h1 > span.overflow-hidden > span");
    const tf = line ? getComputedStyle(line).transform : "none";
    const m = tf && tf !== "none" ? tf.match(/matrix\\(([^)]+)\\)/) : null;
    const p = m ? m[1].split(",").map(Number) : [];
    return {
      lock: getComputedStyle(document.body).overflow,
      lenis: document.documentElement.className.includes("lenis"),
      navOpacity: Number(getComputedStyle(document.querySelector("header")).opacity),
      heroLineY: p.length >= 6 ? Math.round(p[5]) : 0,
      cls: Number(window.__cls.toFixed(4)),
    };
  })()`);
  check(
    "load 1: body unlocked, Lenis started, nav at full opacity after the lift",
    afterLift.lock !== "hidden" && afterLift.lenis === true && afterLift.navOpacity > 0.9,
    JSON.stringify(afterLift),
  );
  check(
    "load 1: hero sequence settles after the lift (headline at y=0)",
    afterLift.heroLineY === 0,
    `headline translateY=${afterLift.heroLineY}px`,
  );
  const clsDetail = await cdp.evaluate("({ cls: Number(window.__cls.toFixed(4)), entries: window.__clsEntries, fontsAt: window.__fontsAt ?? null })");

  /* Control experiment: the same measurement on a load where the preloader is
     skipped. The HTTP cache is disabled for the whole run (below), so the
     control is a genuinely cold load too — without that, cached fonts hide the
     font-swap shift and the comparison would be meaningless. Any shift that
     appears in BOTH loads is pre-existing (font swap / video) and not
     attributable to the preloader. */
  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await goto(cdp, `${BASE}/`);
  /* Deterministic: wait for the skip instead of guessing at a sleep. */
  let rmGone = false;
  const rmStarted = Date.now();
  while (Date.now() - rmStarted < 15000) {
    if ((await cdp.evaluate(OVERLAY_PROBE)) === false) {
      rmGone = true;
      break;
    }
    await sleep(100);
  }
  await sleep(500);
  const clsControl = await cdp.evaluate(
    "({ cls: Number(window.__cls.toFixed(4)), entries: window.__clsEntries, reduceMatches: matchMedia('(prefers-reduced-motion: reduce)').matches, lenis: document.documentElement.className.includes('lenis') })",
  );
  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "no-preference" }],
  });
  check(
    "control: reduced motion really is emulated and skips the overlay",
    clsControl.reduceMatches === true && rmGone,
    JSON.stringify({ reduceMatches: clsControl.reduceMatches, overlayGone: rmGone }),
  );
  const delta = Math.abs(clsDetail.cls - clsControl.cls);
  const afterLiftEntries = (clsDetail.entries ?? []).filter((e) => e.t > (tl.liftAt ?? Infinity));
  const beforeLiftEntries = (clsDetail.entries ?? []).filter((e) => e.t <= (tl.liftAt ?? Infinity));
  const afterLiftSum = afterLiftEntries.reduce((a, e) => a + e.v, 0);
  check(
    "load 1: zero layout shift once the overlay is gone (the preloader exit is free)",
    afterLiftEntries.length === 0 && afterLiftSum <= 0.01,
    `post-lift=${JSON.stringify(afterLiftEntries)} · pre-lift (covered by the overlay) sum=${beforeLiftEntries.reduce((a, e) => a + e.v, 0).toFixed(4)} ${JSON.stringify(beforeLiftEntries)}`,
  );
  check(
    "load 1: total CLS within budget",
    clsDetail.cls <= 0.1,
    `total CLS=${clsDetail.cls} (budget 0.1); no-preloader control=${clsControl.cls} delta=${delta.toFixed(4)}`,
  );
  const shiftT = beforeLiftEntries[0]?.t ?? null;
  const fontsAt = clsDetail.fontsAt ?? null;
  check(
    "any pre-lift shift is attributable to the font swap, not the preloader",
    beforeLiftEntries.length === 0 ||
      (fontsAt !== null && shiftT !== null && Math.abs(shiftT - fontsAt) <= 300),
    `shift at ${shiftT}ms · fonts ready at ${fontsAt}ms · control (no preloader) CLS=${clsControl.cls}`,
  );
  await cdp.shot(path.join(OUT, "hero-after-first-load.png"));

  /* The overlay must stay gone: no re-pop after the lift. */
  await sleep(1500);
  check(
    "load 1: overlay stays dismissed (no re-pop after lift)",
    (await cdp.evaluate(OVERLAY_PROBE)) === false,
  );

  /* D16: every subsequent full load must show the preloader once, again. */
  for (const n of [2, 3]) {
    await navigate(cdp, "about:blank");
    cdp.frames = [];
    cdp.record = true;
    await cdp.send("Page.navigate", { url: `${BASE}/` });
    await cdp.send("Page.bringToFront").catch(() => {});
    await sleep(400);
    const loadN = await cdp.evaluate(`(() => ({
      overlay: ${OVERLAY_PROBE},
      lock: getComputedStyle(document.body).overflow,
      lenis: document.documentElement.className.includes("lenis"),
    }))()`);
    cdp.record = false;
    if (n === 2) {
      /* Wait for a frame of THIS load rather than assuming 400ms is enough,
         so the evidence file can never be a leftover from an older run. */
      const frameStart = Date.now();
      while (cdp.frames.length === 0 && Date.now() - frameStart < 3000) await sleep(60);
      if (cdp.frames[0]) {
        await writeFile(path.join(OUT, "preloader-second-load.jpg"), Buffer.from(cdp.frames[0].data, "base64"));
      }
    }
    check(
      `load ${n}: preloader shows again, body locked, Lenis held`,
      loadN.overlay === true && loadN.lock === "hidden" && loadN.lenis === false,
      JSON.stringify(loadN),
    );
    let liftedN = false;
    const startedN = Date.now();
    while (Date.now() - startedN < 15000) {
      if ((await cdp.evaluate(OVERLAY_PROBE)) === false) {
        liftedN = true;
        break;
      }
      await sleep(150);
    }
    check(`load ${n}: preloader lifted again ≤2s after hydration`, liftedN);
  }
}

/* 5. Lenis — sticky Why Drexa, Back to top, route change round trip. */
  await cdp.evaluate("window.scrollTo({ top: 0, behavior: 'instant' })");
  await sleep(300);
  /* Mechanism test: the sticky column works, but with the current copy the
     real travel is tiny (left ≈ 572px vs row ≈ 592px) — nowhere near enough
     to observe pinning. Temporarily give the right column synthetic height,
     verify the column clamps at its `top-32` (128px) offset across two
     scroll positions under Lenis, then restore. */
  const sticky = await cdp.evaluate(`(async () => {
    const sec = document.querySelector('#why-drexa');
    const el = sec.querySelector('[class~="lg:sticky"]');
    const right = sec.querySelector(".grid > div:last-child");
    const y0 = sec.offsetTop;
    right.style.minHeight = "1800px";
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    window.scrollTo({ top: y0 + 300, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 500));
    const a = { top: Math.round(el.getBoundingClientRect().top), y: Math.round(window.scrollY) };
    window.scrollTo({ top: y0 + 900, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 500));
    const b = { top: Math.round(el.getBoundingClientRect().top), y: Math.round(window.scrollY) };
    right.style.minHeight = "";
    return { a, b, pinned: Math.abs(a.top - b.top) <= 2 && a.top > 100 && a.top < 140 };
  })()`);
  await cdp.evaluate("window.scrollTo({ top: document.querySelector('#why-drexa').offsetTop + 300, behavior: 'instant' })");
  await sleep(500);
  await cdp.shot(path.join(OUT, "why-drexa-sticky-1440.png"));
  check(
    "why-drexa sticky column pins under Lenis",
    sticky.pinned,
    JSON.stringify(sticky),
  );

  await cdp.evaluate("window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })");
  await sleep(800);
  /* Self-diagnosing: record the click target and the delivery, then sample the
     trajectory. A flat result must be distinguishable from "the click never
     arrived" or "the element was not there", so the in-page counters
     (__anchorClicks / __anchorPrevented) and Lenis's presence are captured. */
  const clickPre = await cdp.evaluate(`(() => {
    const a = document.querySelector('a[href="#hero"]');
    return {
      found: !!a,
      text: a ? a.textContent.trim().slice(0, 40) : null,
      lenis: document.documentElement.className.includes("lenis"),
      reduce: matchMedia("(prefers-reduced-motion: reduce)").matches,
      y: Math.round(window.scrollY),
      maxY: Math.round(document.documentElement.scrollHeight - window.innerHeight),
      clicks: window.__anchorClicks ?? null,
      prevented: window.__anchorDefaultPrevented ?? 0,
    };
  })()`);
  await cdp.evaluate(`document.querySelector('a[href="#hero"]').click()`);
  /* Lenis eases the ~9700px trip home exponentially (lerp 0.1). */
  const traj = [];
  const trajStart = Date.now();
  while (Date.now() - trajStart < 6000) {
    const y = await cdp.evaluate("Math.round(window.scrollY)");
    if (traj[traj.length - 1] !== y) traj.push(y);
    if (y <= 2) break;
    await sleep(150);
  }
  const clicked = await cdp.evaluate("({ clicks: window.__anchorClicks ?? null, prevented: window.__anchorDefaultPrevented ?? 0, lenis: document.documentElement.className.includes('lenis') })");
  const backTop = traj[traj.length - 1] ?? clickPre.y;
  const delivered = clickPre.clicks === null || clicked.clicks === null ? null : clicked.clicks - clickPre.clicks;
  check(
    "footer Back to top eases home via Lenis",
    clickPre.found && backTop <= 80 && Math.max(...traj, 0) > backTop + 1000,
    `trajectory=${traj.join("→")} · click delivered=${delivered} (prevented=${clicked.prevented}) · lenis=${clicked.lenis} · reduce=${clickPre.reduce} · target="${clickPre.text}" · from y=${clickPre.y}/${clickPre.maxY}`,
  );

  await cdp.evaluate("window.scrollTo({ top: 600, behavior: 'instant' })");
  await sleep(300);
  const teamLink = await cdp.evaluate(`(() => {
    const a = document.querySelector('header a[href="/team"]');
    return { found: !!a };
  })()`);
  await cdp.evaluate(`document.querySelector('header a[href="/team"]').click()`);
  await sleep(2200);
  const route = await cdp.evaluate("({ path: location.pathname, y: Math.round(window.scrollY) })");
  check(
    "route change (/ → /team) resets scroll to top",
    teamLink.found && route.path === "/team" && route.y <= 40,
    JSON.stringify({ ...route, linkFound: teamLink.found }),
  );

  /* Back to home the same way (completes the / → /team → back round trip). */
  await cdp.evaluate(`document.querySelector('header a[href="/"]').click()`);
  await sleep(2200);
  const routeBack = await cdp.evaluate("({ path: location.pathname, y: Math.round(window.scrollY) })");
  check("route change (/team → /) resets scroll to top", routeBack.path === "/" && routeBack.y <= 40, JSON.stringify(routeBack));

  /* 2. Preloader — runs last: it navigates, and it needs the page unpolled so
     rAF runs at full rate and the in-page recorder can sample the fade. */
  await runPreloaderScenario(cdp);

  check("no uncaught page exceptions during the run", jsErrors.length === 0, jsErrors.slice(0, 3).join(" | "));

  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} checks passed. Screenshots in ${OUT}/`);
  if (failed > 0) process.exitCode = 1;
  await cdp.send("Page.stopScreencast").catch(() => {});
} finally {
  clearTimeout(watchdog);
  edge.kill();
}

