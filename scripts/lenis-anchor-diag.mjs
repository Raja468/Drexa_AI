/**
 * Focused diagnostic for the footer "Back to top" anchor under Lenis.
 *
 * The full proof rig's trajectory check is the only check in the suite that
 * depends on rAF actually ticking in headless. This script separates the two
 * possible causes of a flat trajectory:
 *   - the app: Lenis stopped/locked, handler not attached, anchor missing
 *   - the environment: rAF/GSAP ticker stalled (headless frame throttling)
 * by sampling a rAF frame counter next to the scroll position.
 *
 * Usage: node scripts/lenis-anchor-diag.mjs [baseURL] [--mouse]
 *        --mouse dispatches a real CDP mouse click instead of element.click()
 */
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const BASE = process.argv[2] ?? "http://127.0.0.1:3001";
const USE_MOUSE = process.argv.includes("--mouse");
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9337;
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

const profile = mkdtempSync(path.join(tmpdir(), "drexa-lenis-"));
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
      if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) break;
    } catch {}
    await sleep(250);
  }
  const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener("open", res);
    ws.addEventListener("error", rej);
  });
  const cdp = new CDP(ws);
  await cdp.send("Runtime.enable");
  await cdp.send("Page.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 30, everyFrame: true });

  /* Frame counter + a capture-phase click counter, injected before page scripts. */
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", {
    source:
      "window.__f = 0; window.__def = 0;" +
      "const step = () => { window.__f++; requestAnimationFrame(step); };" +
      "requestAnimationFrame(step);" +
      "document.addEventListener('click', (e) => { if (e.defaultPrevented) window.__def++; }, true);",
  });

  await cdp.send("Page.navigate", { url: BASE });
  await cdp.send("Page.bringToFront").catch(() => {});
  await sleep(4000); /* preloader lift + Lenis start */

  const pre = await cdp.evaluate(`(() => {
    const a = document.querySelector('footer a[href="#hero"]');
    return {
      lenis: document.documentElement.className.includes("lenis"),
      anchorFound: !!a,
      heroFound: !!document.querySelector("#hero"),
      heroTop: document.querySelector("#hero")?.offsetTop ?? null,
      visibility: document.visibilityState,
      focused: document.hasFocus(),
      frames: window.__f,
    };
  })()`);
  console.log("pre-click state:", JSON.stringify(pre));

  await cdp.evaluate("window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })");
  await sleep(700);
  const beforeClick = await cdp.evaluate("({ y: Math.round(window.scrollY), frames: window.__f, def: window.__def })");
  console.log("at bottom:", JSON.stringify(beforeClick));

  if (USE_MOUSE) {
    /* A real user click: bring the link into view, then click its coordinates. */
    await cdp.evaluate(`document.querySelector('footer a[href="#hero"]').scrollIntoView({ block: 'center' })`);
    await sleep(400);
    const rect = await cdp.evaluate(`(() => {
      const r = document.querySelector('footer a[href="#hero"]').getBoundingClientRect();
      return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) };
    })()`);
    console.log("mouse click at:", JSON.stringify(rect));
    for (const type of ["mousePressed", "mouseReleased"]) {
      await cdp.send("Input.dispatchMouseEvent", { type, x: rect.x, y: rect.y, button: "left", clickCount: 1 });
    }
  } else {
    await cdp.evaluate(`document.querySelector('footer a[href="#hero"]').click()`);
  }

  const traj = [];
  let prevFrames = beforeClick.frames;
  for (let i = 0; i < 30; i++) {
    const s = await cdp.evaluate("({ y: Math.round(window.scrollY), frames: window.__f, def: window.__def })");
    traj.push(`y=${s.y} frames=+${s.frames - prevFrames}${s.def > beforeClick.def ? " prevented" : ""}`);
    prevFrames = s.frames;
    await sleep(150);
  }
  console.log(`trajectory (${USE_MOUSE ? "real mouse click" : "element.click()"}):`);
  for (const t of traj) console.log("  " + t);
} finally {
  edge.kill();
}
