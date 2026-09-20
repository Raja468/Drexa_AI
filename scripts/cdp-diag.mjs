/**
 * One-off diagnostic: what is (and is not) alive inside headless Edge?
 * Usage: node scripts/cdp-diag.mjs [baseURL]
 */
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const BASE = process.argv[2] ?? "http://127.0.0.1:3000";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9333;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const profile = mkdtempSync(path.join(tmpdir(), "drexa-diag-"));
const edge = spawn(
  EDGE,
  [
    "--headless",
    "--disable-gpu",
    "--no-first-run",
    "--remote-allow-origins=*",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    "--window-size=1440,900",
    "about:blank",
  ],
  { stdio: "ignore" },
);

const watchdog = setTimeout(() => {
  console.error("WATCHDOG TIMEOUT");
  edge.kill();
  process.exit(2);
}, 90_000);

try {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) break;
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

  let id = 0;
  const pending = new Map();
  const frames = { count: 0 };
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.method === "Page.screencastFrame") {
      frames.count++;
      ws.send(JSON.stringify({ id: 100000 + frames.count, method: "Page.screencastFrameAck", params: { sessionId: msg.params.sessionId } }));
      return;
    }
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const mid = ++id;
      pending.set(mid, { resolve, reject });
      ws.send(JSON.stringify({ id: mid, method, params }));
    });
  const evaluate = async (expression) => {
    const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
    return r.result?.value;
  };

  await send("Runtime.enable");
  await send("Page.enable");

  console.log("before screencast: rAF test…");
  const rafTest = () => evaluate(
    `new Promise(res => { const t = setTimeout(() => res("TIMEOUT"), 2000); requestAnimationFrame(() => { clearTimeout(t); res("RAF_FIRED"); }); })`,
  );
  console.log("rAF (no screencast):", await rafTest());

  await send("Page.startScreencast", { format: "jpeg", quality: 20, everyFrame: true });

  const loaded = new Promise((resolve) => {
    const h = (ev) => {
      const m = JSON.parse(ev.data);
      if (m.method === "Page.loadEventFired") {
        ws.removeEventListener("message", h);
        resolve();
      }
    };
    ws.addEventListener("message", h);
  });
  await send("Page.navigate", { url: `${BASE}/` });
  await loaded;
  await sleep(3500);

  const diag = await evaluate(`(() => ({
    htmlClass: document.documentElement.className,
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    pointerFine: matchMedia("(pointer: fine)").matches,
    reactFibers: [...document.querySelectorAll("body *")].some((el) => Object.keys(el).some((k) => k.startsWith("__react"))),
    windowNext: typeof window.next !== "undefined",
    headerOpacity: getComputedStyle(document.querySelector("header")).opacity,
    overlay: [...document.querySelectorAll("body div")].some((d) => (d.getAttribute("class") || "").includes("z-[90]")),
    scripts: document.scripts.length,
  }))()`);
  console.log("diag:", JSON.stringify(diag, null, 2));
  console.log("screencast frames received:", frames.count);
  console.log("rAF (with screencast):", await rafTest());

  /* ---- round 2: why are effects pending? ---- */
  const consoleMsgs = [];
  ws.addEventListener("message", (ev) => {
    const m = JSON.parse(ev.data);
    if (m.method === "Runtime.consoleAPICalled") {
      consoleMsgs.push((m.params.args ?? []).map((a) => a.value ?? a.description ?? "").join(" ").slice(0, 200));
    }
    if (m.method === "Log.entryAdded") {
      consoleMsgs.push("LOG:" + (m.params.entry?.text ?? "").slice(0, 200));
    }
  });
  await send("Log.enable");

  console.log("\n-- waiting 8 more seconds --");
  await sleep(8000);
  console.log("after 11.5s total:", await evaluate(`(() => ({
    headerOpacity: getComputedStyle(document.querySelector("header")).opacity,
    overlay: [...document.querySelectorAll("body div")].some((d) => (d.getAttribute("class") || "").includes("z-[90]")),
  }))()`));

  console.log("-- dispatching synthetic mouse move + click --");
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 400, y: 400 });
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x: 400, y: 400, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: 400, y: 400, button: "left", clickCount: 1 });
  await sleep(2500);
  console.log("after gesture:", await evaluate(`(() => ({
    headerOpacity: getComputedStyle(document.querySelector("header")).opacity,
    overlay: [...document.querySelectorAll("body div")].some((d) => (d.getAttribute("class") || "").includes("z-[90]")),
  }))()`));

  console.log("console/log entries:", JSON.stringify(consoleMsgs.slice(0, 20), null, 1));
  console.log("failed resources:", await evaluate(
    `performance.getEntriesByType("resource").filter(r => r.responseStatus && r.responseStatus >= 400).map(r => r.name + " -> " + r.responseStatus)`,
  ));
  console.log("flight queue:", await evaluate(`({ f: Array.isArray(window.__next_f), len: window.__next_f?.length })`));
  console.log("visibility:", await evaluate(`({ v: document.visibilityState, hidden: document.hidden })`));

  /* ---- round 3: sticky + Lenis forensics ---- */
  console.log("\n-- round 3 --");
  await send("Page.navigate", { url: "about:blank" });
  await sleep(300);
  await send("Page.navigate", { url: `${BASE}/` });
  await sleep(4000);
  console.log("htmlClass:", await evaluate("document.documentElement.className"));
  await evaluate("window.scrollTo({ top: document.querySelector('#why-drexa').offsetTop + 600, behavior: 'instant' })");
  await sleep(600);
  console.log("sticky forensics:", await evaluate(`(() => {
    const sec = document.querySelector('#why-drexa');
    const el = sec.querySelector('[class~="lg:sticky"]');
    const item = el.parentElement;
    const cs = getComputedStyle(sec);
    const m1 = Math.round(el.getBoundingClientRect().top);
    sec.style.overflow = 'visible';
    const m2 = Math.round(el.getBoundingClientRect().top);
    sec.style.overflow = '';
    let chain = [];
    let n = el;
    for (let i = 0; i < 4; i++) { n = n.parentElement; if (!n) break; chain.push(n.tagName + " [" + (n.className || "").slice(0, 60) + "]"); }
    return {
      sectionOverflow: cs.overflow,
      topWithClip: m1,
      topWithVisible: m2,
      elPosition: getComputedStyle(el).position,
      itemHeight: Math.round(item.getBoundingClientRect().height),
      stickyHeight: Math.round(el.getBoundingClientRect().height),
      itemAlignSelf: getComputedStyle(item).alignSelf,
      ancestorChain: chain,
      y: Math.round(window.scrollY),
    };
  })()`));



} finally {
  clearTimeout(watchdog);
  edge.kill();
}
