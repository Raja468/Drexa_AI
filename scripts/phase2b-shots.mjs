/**
 * Phase 2b proof rig — width sweep, scroll-linked effects and the
 * reduced-motion walkthrough. Zero dependencies (CDP over the native
 * WebSocket, Node >= 22, Edge on the default install path).
 *
 * Usage:  node scripts/phase2b-shots.mjs [baseURL] [outDir]
 * Final check runs against a production server (npm run build && npx next start -p 3001).
 *
 * Covers owner Phase 2a items:
 *   7  §7.2 hero TEXT load sequence completes (mask reveal settles at y=0)
 *   8  §7.3 ticker: exact 40s loop + pauses on hover
 *   10 §7.5 count-up: runs once and settles on the true content values
 *   9  §7.11 FAQ: sticky heading left / accordion right, toggles correctly
 *   13 §5.8 progress bar tracks scroll; screenshots at 390/768/1440,
 *      including mid-scroll positions; reduced-motion walkthrough
 *      (no preloader, no Lenis, no cursor, static marquee, static counters,
 *      instant hero).
 */
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const BASE = process.argv[2] ?? "http://127.0.0.1:3001";
const OUT = process.argv[3] ?? "docs/screenshots/phase2a";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9334;
/* D16: the overlay is a CSS-class component (`preloader-overlay`); it counts
   as "up" only while actually visible and opaque. */
const OVERLAY_PROBE =
  "(() => { const el = document.querySelector('.preloader-overlay'); if (!el) return false; const s = getComputedStyle(el); return s.visibility !== 'hidden' && Number(s.opacity) > 0.05; })()";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForEndpoint(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await sleep(250);
  }
  throw new Error("DevTools endpoint never came up");
}

class CDP {
  constructor(ws, onError) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.method === "Page.screencastFrame") {
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
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async evaluate(expression) {
    const r = await this.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
    return r.result?.value;
  }
  /** Full-viewport shot; JPEG keeps the width sweep small on disk. */
  async shot(file, { clip, scale = 1, jpeg = true } = {}) {
    const params = { captureBeyondViewport: true };
    if (jpeg) {
      params.format = "jpeg";
      params.quality = 80;
    } else {
      params.format = "png";
    }
    if (clip) params.clip = { ...clip, scale };
    const { data } = await this.send("Page.captureScreenshot", params);
    await writeFile(file, Buffer.from(data, "base64"));
    return file;
  }
  async scrollTo(expression) {
    await this.evaluate(`window.scrollTo({ top: ${expression}, behavior: "instant" })`);
    await sleep(650); // let Lenis sync + reveals fire
  }
}

async function navigate(cdp, url) {
  return new Promise((resolve, reject) => {
    const onMessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.method === "Page.loadEventFired") {
        cdp.ws.removeEventListener("message", onMessage);
        resolve();
      }
    };
    cdp.ws.addEventListener("message", onMessage);
    cdp.send("Page.navigate", { url }).catch(reject);
  });
}

async function goto(cdp, url) {
  await navigate(cdp, "about:blank");
  await cdp.send("Page.navigate", { url });
  await cdp.send("Page.bringToFront").catch(() => {});
  await sleep(150);
}

/* Wait until client effects are live (Lenis/cursor classes on <html>),
   marking the moment the §7.2 sequence and count-ups can run. */
async function waitEffects(cdp, timeoutMs = 15000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const on = await cdp.evaluate(
      "document.documentElement.className.includes('lenis') || document.documentElement.className.includes('has-custom-cursor')",
    );
    if (on) return Date.now() - started;
    await sleep(200);
  }
  return -1;
}

/* --- SCENARIOS (appended below) --- */
const profile = mkdtempSync(path.join(tmpdir(), "drexa-edge-2b-"));
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
}, 240_000);

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
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 30, everyFrame: true });

  await mkdir(OUT, { recursive: true });
  const results = [];
  const check = (name, ok, detail = "") => {
    results.push({ name, ok, detail });
    console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
  };
  const shots = [];

  /* ------------------------------------------------------------------
     Width sweep at 390 / 768 / 1440 — top + mid-scroll screenshots.
     ------------------------------------------------------------------ */
  for (const width of [390, 768, 1440]) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 800,
      deviceScaleFactor: 1,
      mobile: width < 700,
    });
    await goto(cdp, `${BASE}/`);
    const hydration = await waitEffects(cdp);
    check(`effects/hydration came up @${width}`, hydration >= 0, `${hydration}ms after load`);
    await sleep(2600); // preloader (every load, D16) + §7.2 load sequence
    shots.push(await cdp.shot(path.join(OUT, `home-${width}-1-hero.png`)));

    /* §7.2 hero completion (asserted at 1440, harmless elsewhere). */
    if (width === 1440) {
      const hero = await cdp.evaluate(`(() => {
        const lines = [...document.querySelectorAll("h1 span > span")].map((el) => ({
          y: getComputedStyle(el).transform,
        }));
        return { lines, navOpacity: Number(getComputedStyle(document.querySelector("header")).opacity) };
      })()`);
      const settled = hero.lines.every((l) => l.y === "none" || l.y === "matrix(1, 0, 0, 1, 0, 0)");
      check(
        "§7.2 hero load sequence settles (lines at y=0)",
        settled && hero.navOpacity > 0.9,
        JSON.stringify(hero),
      );
    }

    /* §7.3 ticker band. */
    await cdp.scrollTo(`document.querySelector('main section[class~="z-20"]').offsetTop - 250`);
    shots.push(await cdp.shot(path.join(OUT, `home-${width}-2-ticker.png`)));

    if (width === 1440) {
      const ticker = await cdp.evaluate(`(() => {
        const track = document.querySelector(".marquee-track");
        const r = document.querySelector('main section[class~="z-20"]').getBoundingClientRect();
        return {
          loop: track.style.getPropertyValue("--marquee-duration"),
          rect: { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) },
        };
      })()`);
      check("§7.3 ticker runs one ~40s loop", parseFloat(ticker.loop) >= 38 && parseFloat(ticker.loop) <= 42, `loop=${ticker.loop}`);

      /* Real hover over the band → animation-play-state must flip to paused. */
      await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: ticker.rect.x, y: ticker.rect.y });
      await sleep(400);
      const paused = await cdp.evaluate(`getComputedStyle(document.querySelector(".marquee-track")).animationPlayState`);
      await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 10, y: 10 });
      await sleep(400);
      const resumed = await cdp.evaluate(`getComputedStyle(document.querySelector(".marquee-track")).animationPlayState`);
      check("§7.3 ticker pauses on hover and resumes", paused === "paused" && resumed === "running", `hover=${paused} → leave=${resumed}`);
    }

    /* §7.5 proof strip + count-up. */
    await cdp.scrollTo(`document.querySelector('section[aria-label="Proof"]').offsetTop - 250`);
    if (width === 1440) {
      const early = await cdp.evaluate(`[...document.querySelectorAll('section[aria-label="Proof"] span[title^="Source:"]')].map((el) => el.textContent)`);
      await sleep(2200); // tween is 1.2s once ~40% visible
      const settled = await cdp.evaluate(`[...document.querySelectorAll('section[aria-label="Proof"] span[title^="Source:"]')].map((el) => el.textContent)`);
      const counts = early.some((v, i) => v !== settled[i]);
      check(
        "§7.5 count-up runs once and settles on true values",
        counts && JSON.stringify(settled) === JSON.stringify(["3", "30+", "100%", "24h"]),
        `early=${JSON.stringify(early)} → settled=${JSON.stringify(settled)}`,
      );
    }
    shots.push(await cdp.shot(path.join(OUT, `home-${width}-3-proof.png`)));

    await cdp.scrollTo(`document.querySelector('#why-drexa').offsetTop - 100`);
    shots.push(await cdp.shot(path.join(OUT, `home-${width}-4-why-drexa.png`)));

    /* §7.11 FAQ. */
    await cdp.scrollTo(`document.querySelector('#faq').offsetTop - 100`);
    if (width === 1440) {
      const faq = await cdp.evaluate(`(() => {
        const head = document.querySelector('#faq [class~="lg:sticky"]');
        const trigger = document.querySelector('#faq-trigger-1');
        return {
          sticky: head ? getComputedStyle(head).position : null,
          headX: head ? Math.round(head.getBoundingClientRect().left) : null,
          accX: trigger ? Math.round(trigger.getBoundingClientRect().left) : null,
        };
      })()`);
      await cdp.evaluate(`document.querySelector('#faq-trigger-1').click()`);
      await sleep(700); // height spring
      const after = await cdp.evaluate(`(() => {
        const panel = document.querySelector('#faq-panel-1');
        return {
          two: document.querySelector('#faq-trigger-1').getAttribute("aria-expanded"),
          one: document.querySelector('#faq-trigger-0').getAttribute("aria-expanded"),
          panelHeight: panel ? Math.round(panel.getBoundingClientRect().height) : 0,
        };
      })()`);
      await cdp.evaluate(`document.querySelector('#faq-trigger-1').click()`);
      await sleep(700);
      check(
        "§7.11 FAQ: sticky heading left, accordion right, one-at-a-time toggle",
        faq.sticky === "sticky" && faq.headX < faq.accX && after.two === "true" && after.one === "false" && after.panelHeight > 20,
        JSON.stringify({ faq, after }),
      );
    }
    shots.push(await cdp.shot(path.join(OUT, `home-${width}-5-faq.png`)));

    await cdp.scrollTo(`document.querySelector('#contact').offsetTop - 150`);
    shots.push(await cdp.shot(path.join(OUT, `home-${width}-6-contact.png`)));

    /* §5.8 progress bar tracks scroll (asserted at 1440). */
    if (width === 1440) {
      const bar = await cdp.evaluate(`(() => {
        const m = getComputedStyle(document.querySelector('[class~="z-[60]"]')).transform;
        return parseFloat((m.match(/matrix\\(([-\\d.]+)/) || [])[1] ?? "-1");
      })()`);
      check("§5.8 scroll progress bar tracks the document", bar > 0.3 && bar < 1, `scaleX=${bar}`);
    }
  }

  /* ------------------------------------------------------------------
     Reduced-motion walkthrough (§11): no preloader, no Lenis, no custom
     cursor, static marquee, static counters, instant hero.
     ------------------------------------------------------------------ */
  for (const width of [1440, 390]) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 800,
      deviceScaleFactor: 1,
      mobile: width < 700,
    });
    await cdp.send("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }],
    });
    /* D16: the preloader runs on every full load, so a fresh load under
       reduced motion is all that is needed to prove it is skipped. */
    await goto(cdp, `${BASE}/`);
    let rm = null;
    const started = Date.now();
    while (Date.now() - started < 15000) {
      const probe = await cdp.evaluate(`(() => ({
        overlay: ${OVERLAY_PROBE},
        hydrated: [...document.querySelectorAll("body *")].some((el) => Object.keys(el).some((k) => k.startsWith("__react"))),
      }))()`);
      if (probe.hydrated) {
        await sleep(700); // allow the skip effect (mount → rAF → unmount)
        rm = await cdp.evaluate(`(() => ({
          overlay: ${OVERLAY_PROBE},
          lenis: document.documentElement.className.includes("lenis"),
          cursor: document.documentElement.className.includes("has-custom-cursor"),
          marqueeAnim: getComputedStyle(document.querySelector(".marquee-track")).animationName,
          navOpacity: Number(getComputedStyle(document.querySelector("header")).opacity),
        }))()`);
        break;
      }
      await sleep(250);
    }
    check(
      `reduced motion @${width}: no preloader, no Lenis, no cursor, static marquee`,
      rm && !rm.overlay && !rm.lenis && !rm.cursor && rm.marqueeAnim === "none",
      JSON.stringify(rm),
    );

    /* Counters must read their final values immediately — no count-up. */
    await cdp.scrollTo(`document.querySelector('section[aria-label="Proof"]').offsetTop - 250`);
    const counters = await cdp.evaluate(`[...document.querySelectorAll('section[aria-label="Proof"] span[title^="Source:"]')].map((el) => el.textContent)`);
    check(
      `reduced motion @${width}: counters static on true values`,
      JSON.stringify(counters) === JSON.stringify(["3", "30+", "100%", "24h"]),
      JSON.stringify(counters),
    );

    if (width === 1440) {
      check(
        "reduced motion @1440: nav appears immediately",
        rm.navOpacity > 0.9,
        `navOpacity=${rm.navOpacity}`,
      );
      /* FAQ still operable under reduced motion. */
      await cdp.scrollTo(`document.querySelector('#faq').offsetTop - 100`);
      await cdp.evaluate(`document.querySelector('#faq-trigger-1').click()`);
      await sleep(400);
      const faqRm = await cdp.evaluate(`document.querySelector('#faq-trigger-1').getAttribute("aria-expanded")`);
      check("reduced motion @1440: FAQ accordion still toggles", faqRm === "true");
    }

    await cdp.evaluate("window.scrollTo({ top: 0, behavior: 'instant' })");
    await sleep(400);
    shots.push(await cdp.shot(path.join(OUT, `reduced-${width}-1-hero.png`)));
    await cdp.scrollTo(`document.querySelector('section[aria-label="Proof"]').offsetTop - 250`);
    shots.push(await cdp.shot(path.join(OUT, `reduced-${width}-2-proof.png`)));

    /* Restore the default for subsequent runs. */
    await cdp.send("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "no-preference" }],
    });
  }

  check("no uncaught page exceptions during the run", jsErrors.length === 0, jsErrors.slice(0, 3).join(" | "));

  console.log(`\nScreenshots written: ${shots.length} (+ email crops from the 2a rig)`);
  const failed = results.filter((r) => !r.ok).length;
  console.log(`${results.length - failed}/${results.length} checks passed.`);
  if (failed > 0) process.exitCode = 1;
  await cdp.send("Page.stopScreencast").catch(() => {});
} finally {
  clearTimeout(watchdog);
  edge.kill();
}

