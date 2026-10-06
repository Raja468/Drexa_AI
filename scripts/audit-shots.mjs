/**
 * Design-audit screenshots (D17 verification pass).
 *
 * Drives headless Edge over CDP — no Playwright/Puppeteer in this repo's
 * dependency list, so this reuses the same hand-rolled CDP client style as
 * scripts/bugfix-shots.mjs.
 *
 * Usage:  npx next start -p 3005   (in another shell)
 *         node scripts/audit-shots.mjs [baseUrl]
 */
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const BASE = process.argv[2] ?? "http://127.0.0.1:3005";
const OUT = "docs/screenshots/audit";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9336;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Sections to capture, in page order. `at` is scrolled to near the top. */
const TARGETS = [
  { name: "01-hero", at: "0" },
  { name: "02-services", at: "el('#capabilities') - 60" },
  { name: "03-proof", at: "el('[aria-label=\"Proof\"]') - 60" },
  { name: "04-projects", at: "el('#projects') - 40" },
  { name: "05-approach", at: "el('#approach') - 60" },
  { name: "06-why", at: "el('#why-drexa') - 60" },
  { name: "07-team", at: "el('#team') - 60" },
  { name: "08-faq", at: "el('#faq') - 60" },
  { name: "09-contact", at: "el('#contact') - 60" },
];

/* The boot overlay is server-rendered and lifts ~1.2s after hydration, but a
   cold first load can delay hydration past the CSS failsafe — a fixed sleep is
   therefore not enough (it captured the overlay into the 1440 hero shot).
   Same visible+opaque probe as scripts/phase2a-shots.mjs: presence alone is
   not the test, because the failsafe leaves the element in the DOM. */
const OVERLAY_PROBE =
  "(() => { const el = document.querySelector('.preloader-overlay'); if (!el) return false; const s = getComputedStyle(el); return s.visibility !== 'hidden' && Number(s.opacity) > 0.05; })()";

async function waitForPreloader(cdp, timeoutMs = 12000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (!(await cdp.evaluate(OVERLAY_PROBE))) return true;
    await sleep(120);
  }
  console.warn("WARNING  boot overlay still up — a shot may include it");
  return false;
}

async function waitForEndpoint(url, tries = 80) {
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
  async shot(file) {
    const { data } = await this.send("Page.captureScreenshot", { format: "png" });
    await writeFile(file, Buffer.from(data, "base64"));
    console.log(`Saved ${file}`);
  }
  async scrollTo(expression) {
    await this.evaluate(
      `(() => { const el = (s) => { const n = document.querySelector(s);` +
        ` if (!n) throw new Error("missing " + s);` +
        ` return n.getBoundingClientRect().top + window.scrollY; };` +
        ` window.scrollTo({ top: Math.max(0, ${expression}), behavior: "instant" }); })()`
    );
    await sleep(900);
  }
}

async function goto(cdp, url) {
  await cdp.send("Page.navigate", { url: "about:blank" });
  await sleep(120);
  await cdp.send("Page.navigate", { url });
  await cdp.send("Page.bringToFront").catch(() => {});
  await sleep(1200); // overlay is mid-lift by now
  await waitForPreloader(cdp); // then poll it out — never shoot through it
}

const profile = mkdtempSync(path.join(tmpdir(), "drexa-audit-"));
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
  { stdio: "ignore" }
);

try {
  await waitForEndpoint(`http://127.0.0.1:${PORT}/json/version`);
  const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const page = targets.find((t) => t.type === "page");
  if (!page) throw new Error("no page target");

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener("open", res);
    ws.addEventListener("error", rej);
  });

  const cdp = new CDP(ws);
  await cdp.send("Runtime.enable");
  await cdp.send("Page.enable");
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 20, everyFrame: true });
  await mkdir(OUT, { recursive: true });

  for (const [width, height] of [
    [1440, 900],
    [768, 900],
    [390, 844],
  ]) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 700,
    });
    await goto(cdp, `${BASE}/`);

    for (const target of TARGETS) {
      await cdp.scrollTo(target.at);
      await waitForPreloader(cdp, 4000); // guard for the first target of a pass
      await cdp.shot(path.join(OUT, `${target.name}-${width}.png`));
    }
  }

  console.log("All audit screenshots taken.");
} finally {
  edge.kill();
}
