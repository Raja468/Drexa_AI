import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const BASE = process.argv[2] ?? "http://127.0.0.1:3005";
const OUT = "docs/screenshots/bugfix";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9335;

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
  async shot(file, { clip, scale = 1, captureBeyondViewport = false } = {}) {
    const params = { format: "png", captureBeyondViewport };
    if (clip) params.clip = { ...clip, scale };
    const { data } = await this.send("Page.captureScreenshot", params);
    await writeFile(file, Buffer.from(data, "base64"));
    console.log(`Saved screenshot: ${file}`);
    return file;
  }
  async scrollTo(expression) {
    await this.evaluate(`window.scrollTo({ top: ${expression}, behavior: "instant" })`);
    await sleep(650);
  }
}

async function goto(cdp, url) {
  await cdp.send("Page.navigate", { url: "about:blank" });
  await sleep(100);
  await cdp.send("Page.navigate", { url });
  await cdp.send("Page.bringToFront").catch(() => {});
  await sleep(2500); // let preloader lift and animations settle
}

const profile = mkdtempSync(path.join(tmpdir(), "drexa-edge-fix-"));
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

  for (const width of [390, 768, 1440]) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: width < 700,
    });
    await goto(cdp, `${BASE}/`);

    // 1. Work section top view
    await cdp.scrollTo(`document.querySelector('#projects').offsetTop - 50`);
    await sleep(800);
    await cdp.shot(path.join(OUT, `work-section-${width}.png`), { captureBeyondViewport: false });

    // 2. Work section mid-scroll (showing cards and outcome contrast)
    await cdp.scrollTo(`document.querySelector('#projects').offsetTop + 350`);
    await sleep(800);
    await cdp.shot(path.join(OUT, `work-midscroll-${width}.png`), { captureBeyondViewport: false });

    // 3. Contact section view
    await cdp.scrollTo(`document.querySelector('#contact').offsetTop - 80`);
    await sleep(800);
    await cdp.shot(path.join(OUT, `contact-section-${width}.png`), { captureBeyondViewport: false });
  }

  // Also check image elements loading status
  const imgStatus = await cdp.evaluate(`(() => {
    const imgs = [...document.querySelectorAll('#projects img')].map((img) => ({
      src: img.src,
      alt: img.alt,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    }));
    return imgs;
  })()`);
  console.log("Work images status:", JSON.stringify(imgStatus, null, 2));

  console.log("All screenshots taken successfully.");
} finally {
  edge.kill();
}
