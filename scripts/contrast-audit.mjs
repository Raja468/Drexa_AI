/**
 * One-off WCAG 2.1 contrast audit for the site's dark sections.
 *
 * Every informational text/background pair drawn on the three dark surfaces
 * (home "Approach" band, the CTA band, and the footer — all bg #16181D, with
 * hover states #1B1E22) is checked here. Decorative-only surfaces (the giant
 * footer "Drexa" wordmark and the #2A2D33 hairlines) are excluded: WCAG
 * contrast applies to text that conveys information, not brand graphics.
 *
 * Run: node scripts/contrast-audit.mjs
 */
function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}
function luminance(hex) {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}
function ratio(fg, bg) {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

const DARK = "#16181D";   // section bg
const DARK_HOVER = "#1B1E22"; // Approach row hover
const ACCENT = "#0B6B57";  // CTA button fill

const pairs = [
  ["Main heading / body on dark", "#F2F2EE", DARK, 4.5],
  ["Secondary body text on dark", "#A9ACB2", DARK, 4.5],
  ["Mono section label on dark (04 / Approach)", "#A9ACB2", DARK, 4.5],
  ["Secondary body text on dark hover", "#A9ACB2", DARK_HOVER, 4.5],
  ["Main heading on dark hover", "#F2F2EE", DARK_HOVER, 4.5],
  ["CTA button: white on accent green", "#FFFFFF", ACCENT, 4.5],
  ["CTA WhatsApp button: white text on dark", "#FFFFFF", DARK, 4.5],
  ["Footer heading / link-hover on dark", "#F2F2EE", DARK, 4.5],
];

// --- Candidate "accent on dark" tones: must read as the same brand-green
// family as #0B6B57 but clear WCAG AA on the dark surface #16181D. Pick the
// most subdued value that still passes 4.5:1 (normal text) so emphasized
// words, hovers and numerals stay legible without going neon. -------------
const ACCENT_DARK_CANDIDATES = ["#3EA88A", "#46B494", "#4EC3A2", "#57C9A9", "#5FCFAE"];
for (const c of ACCENT_DARK_CANDIDATES) {
  console.log(`candidate ${c}: on dark ${ratio(c, DARK).toFixed(2)}:1  on hover ${ratio(c, DARK_HOVER).toFixed(2)}:1`);
}
console.log(`reference base accent #0B6B57 on dark: ${ratio(ACCENT, DARK).toFixed(2)}:1`);

// Dim numeral / secondary greys used inside the dark Services rows.
console.log(`numeral grey #8A8D93 on dark: ${ratio("#8A8D93", DARK).toFixed(2)}:1  on hover: ${ratio("#8A8D93", DARK_HOVER).toFixed(2)}:1`);

let fail = 0;
for (const [name, fg, bg, min] of pairs) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) fail++;
  const tag = ok ? "PASS" : "FAIL";
  console.log(`${tag}  ${r.toFixed(2)}:1  (need ${min})  ${name}  [${fg} on ${bg}]`);
}
console.log(`\n${fail === 0 ? "All text-on-dark pairs pass WCAG AA." : `${fail} pair(s) below threshold.`}`);
process.exit(fail === 0 ? 0 : 1);
