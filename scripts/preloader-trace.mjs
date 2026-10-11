/**
 * Focused preloader trace (debug tool, D16).
 *
 * Records the overlay's class list, opacity and existence on every animation
 * frame from before hydration, then prints a deduped timeline. Also prints
 * the reduced-motion media state before/after each run so emulation problems
 * are visible immediately.
 *
 * --reduce          emulate prefers-reduced-motion: reduce
 * --poll            mirror the proof rig: poll the overlay's opacity over CDP
 *                   every 25ms AND take a captureBeyondViewport PNG at 380ms
 *                   (to isolate rig artifacts from real page behaviour)
 *
 * Usage: node scripts/preloader-trace.mjs [baseURL] [--reduce] [--poll]
 */
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const BASE = process.argv[2] ?? "http://127.0.0.1:3001";
const REDUCE = process.argv.includes("--reduce");
const POLL = process.argv.includes("--poll");
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9335;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.method === "Page.screencastFrame") {
        this.send("Page.screencastFrameAck", { sessionId: msg.params.sessionId }).catch(() => {});
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
}

const profile = mkdtempSync(path.join(tmpdir(), "drexa-trace-"));
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

try {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) break;
    } catch {}
    await sleep(250);
  }
  const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const page = targets.find((t) => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener("open", res);
    ws.addEventListener("error", rej);
  });
  const cdp = new CDP(ws);
  await cdp.send("Runtime.enable");
  await cdp.send("Page.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 30, everyFrame: true });
  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: REDUCE ? "reduce" : "no-preference" }],
  });

  await cdp.send("Page.addScriptToEvaluateOnNewDocument", {
    source:
      "window.__t = [];" +
      "const t0 = performance.now();" +
      "const rec = () => {" +
      "  const el = document.querySelector('.preloader-overlay');" +
      "  window.__t.push({ t: Math.round(performance.now() - t0), ex: !!el, o: el ? Number(getComputedStyle(el).opacity) : null, v: el ? getComputedStyle(el).visibility : null, cls: el ? el.className : null, bodyCls: document.body ? document.body.className.replace(/\\S+_\\S+/g, 'fontvar') : null });" +
      "  requestAnimationFrame(rec);" +
      "};" +
      "requestAnimationFrame(rec);",
  });

  await cdp.send("Page.navigate", { url: "about:blank" });
  await sleep(200);
  await cdp.send("Page.navigate", { url: BASE });
  await cdp.send("Page.bringToFront").catch(() => {});

  if (POLL) {
    /* Mirror the proof rig exactly, including the mid-loop screenshot. */
    const t0 = Date.now();
    const poll = [];
    let shotTaken = false;
    while (Date.now() - t0 < 20000) {
      const probe = await cdp.evaluate(`(() => {
        const el = document.querySelector(".preloader-overlay");
        if (!el) return null;
        return { o: Number(getComputedStyle(el).opacity) };
      })()`);
      if (probe === null) {
        poll.push({ t: Date.now() - t0, o: null });
        break;
      }
      const last = poll[poll.length - 1];
      if (last === undefined || last.o === null || Math.abs(last.o - probe.o) > 0.001) {
        poll.push({ t: Date.now() - t0, o: probe.o });
      }
      if (!shotTaken && Date.now() - t0 >= 380) {
        shotTaken = true;
        const shot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
        console.log(`  (took captureBeyondViewport PNG at ${Date.now() - t0}ms, ${Math.round(shot.data.length / 1365)}KB)`);
      }
      await sleep(25);
    }
    console.log(`poll samples (each = opacity change, last = overlay removed):`);
    console.log(`  ${poll.map((p) => `${p.t}ms:${p.o === null ? "REMOVED" : p.o.toFixed(2)}`).join(" → ")}`);
    await sleep(1200);
  }

  await sleep(POLL ? 0 : 4000);

  const reduceMatches = await cdp.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches");
  const timeline = await cdp.evaluate("window.__t");
  console.log(`reduceMatches=${reduceMatches} (requested: ${REDUCE})`);
  console.log(`frames=${timeline.length}`);
  /* Dedupe consecutive identical states so the transitions are legible. */
  const key = (f) => `${f.ex}|${f.o}|${f.v}|${f.cls}|${f.bodyCls}`;
  let prev = null;
  for (const f of timeline) {
    const k = key(f);
    if (k === prev) continue;
    prev = k;
    console.log(
      `t=${String(f.t).padStart(5)}ms  exists=${f.ex ? "yes" : "no "}  opacity=${f.o === null ? "-" : f.o.toFixed(3)}  visibility=${f.v ?? "-"}  overlay="${(f.cls || "").replace(/\s+/g, " ")}"  body="${(f.bodyCls || "").split(" ").filter((c) => c === "preloader-lock").join() || "-"}"`,
    );
  }
} finally {
  edge.kill();
}
