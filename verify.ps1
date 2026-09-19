<#
  Content + design-integrity smoke test for the home page.

  Checks the BUILT page (run `npm run build` first), not a stale snapshot.
  The previous version asserted against home.html - a 100KB server-rendered
  dump committed at the repo root that stopped tracking the real page the
  moment the page changed, so it kept reporting OK while the site drifted.

  Usage:  npm run build; ./verify.ps1
#>
$page = Join-Path $PSScriptRoot ".next\server\app\index.html"

if (-not (Test-Path $page)) {
  Write-Host "FAIL  No build output at $page - run 'npm run build' first."
  exit 1
}

$content = Get-Content $page -Raw
# Page body only. Site chrome (navbar / footer) is not yet migrated to the
# Kinetic system, so it is not held to the page's design rules here.
$main = [regex]::Match($content, '(?s)<main.*?</main>').Value

# --- Content must survive a refactor -------------------------------------
$required = @(
  @{ label = "8 capability titles"; pattern = '(AI automation|AI agents|LLM integration|Custom software|Web experiences|AI development|Cybersecurity|Creative)'; min = 8 },
  @{ label = "Real projects only"; pattern = '(ChatConnect AI|DREX AI Assistant|Iqra School Management System)'; min = 3 },
  @{ label = "Project source links"; pattern = 'github\.com/Raja468'; min = 3 },
  @{ label = "Process steps"; pattern = '>(Discover|Design|Build|Launch)<'; min = 4 },
  @{ label = "Differentiators"; pattern = '(AI that actually works|Small team\. Direct communication\.|Built for the long term)'; min = 3 },
  @{ label = "FAQ disclosures"; pattern = 'aria-expanded'; min = 6 },
  @{ label = "Contact heading"; pattern = 'Or send a project brief'; min = 1 },
  @{ label = "WhatsApp link"; pattern = 'wa\.me'; min = 1 },
  @{ label = "Email link"; pattern = 'mailto:hello@drexa\.tech'; min = 1 },
  @{ label = "Form fields"; pattern = 'name="(name|email|budget|message)"'; min = 4 }
)

# --- Kinetic signatures: the style is absent without these ---------------
$signatures = @(
  @{ label = "Two infinite marquees"; pattern = 'marquee-track'; min = 2 },
  @{ label = "Viewport-width headline"; pattern = 'text-mega'; min = 1 },
  @{ label = "Massive numerals (process sequence + work)"; pattern = 'text-numeral-'; min = 4 },
  @{ label = "Hairline grid dividers"; pattern = 'border-r border-b border-border'; min = 1 },
  @{ label = "Sticky element (Why Drexa left column)"; pattern = 'sticky'; min = 1 },
  @{ label = "Grain texture"; pattern = 'noise-overlay'; min = 1 }
)

# --- Anti-patterns that must not reappear in the page body ---------------
$forbidden = @(
  @{ label = "Softened corners (radius must be 0)"; pattern = 'rounded-(sm|md|lg|xl|2xl|3xl|4xl|\[)' },
  @{ label = "Legacy glow shims"; pattern = 'hero-(glow-text|neon-pill|scroll-cue)' },
  @{ label = "Gradients (linear/bg only; .text-gradient-accent + radial glows allowed)"; pattern = '(bg-gradient|bg-linear-to-|linear-gradient)' },
  @{ label = "Drop shadows"; pattern = 'shadow-(sm|md|lg|xl|2xl|\[)' }
)

$failed = 0

function Test-Rule($rule, $text, $mode) {
  $count = ([regex]::Matches($text, $rule.pattern)).Count
  switch ($mode) {
    "min" { $ok = $count -ge $rule.min; $expect = "need $($rule.min)" }
    "zero" { $ok = $count -eq 0; $expect = "want 0" }
  }
  $script:failed += if ($ok) { 0 } else { 1 }
  $status = if ($ok) { "OK  " } else { "FAIL" }
  Write-Host "$status  $($rule.label) (found $count, $expect)"
}

Write-Host "`nContent"
foreach ($rule in $required) { Test-Rule $rule $content "min" }

Write-Host "`nKinetic signatures"
foreach ($rule in $signatures) { Test-Rule $rule $content "min" }

Write-Host "`nAnti-patterns (page body)"
foreach ($rule in $forbidden) { Test-Rule $rule $main "zero" }

if ($failed -gt 0) {
  Write-Host "`n$failed check(s) failed."
  exit 1
}
Write-Host "`nAll checks passed."