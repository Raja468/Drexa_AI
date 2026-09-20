/**
 * Preloader coordination (design brief §5.5 as amended by the owner — D16:
 * the preloader runs on EVERY full page load; the per-session
 * `sessionStorage` flag was removed entirely).
 *
 * The preloader is the clock the §7.2 hero load sequence hangs off: a window
 * event fires the instant its lift starts, so `waitPreloader()` gives every
 * waiting component (hero type column, nav fade, Lenis startup) the same
 * t=0.
 *
 * Pure client utility — every importer is a "use client" component.
 */

const DONE_EVENT = "drexa:preloader-done";

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Fired by the Preloader when its lift starts (not when it finishes). */
export function dispatchPreloaderDone(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(DONE_EVENT));
}

/**
 * Resolves once the preloader has started lifting — or immediately under
 * reduced motion (no preloader will run). A defensive timeout keeps the
 * page usable even if the event is lost (mirrors the overlay's own 2s
 * failsafe).
 */
export function waitPreloader(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (prefersReducedMotion()) return Promise.resolve();

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.removeEventListener(DONE_EVENT, finish);
      window.clearTimeout(timer);
      resolve();
    };
    /* Slightly above the preloader's own 2s failsafe. */
    const timer = window.setTimeout(finish, 2500);
    window.addEventListener(DONE_EVENT, finish, { once: true });
  });
}
