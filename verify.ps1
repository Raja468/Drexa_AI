$content = Get-Content "D:\Drexa_AI_web\home.html" -Raw
$checks = @(
  @{ label = "8 capability titles"; pattern = '(AI automation|AI agents|LLM integration|Custom software|Web experiences|AI development|Cybersecurity|Creative)'; min = 8 },
  @{ label = "Project R&D/Internal labels"; pattern = '(Internal build|R&amp;D project)'; min = 2 },
  @{ label = "Single CTA label (Start a project)"; pattern = 'Start a project'; min = 1 },
  @{ label = "Contact section heading"; pattern = 'Or send a project brief'; min = 1 },
  @{ label = "FAQ cybersecurity Q"; pattern = 'cybersecurity and creative work'; min = 1 },
  @{ label = "WhatsApp link"; pattern = 'wa.me'; min = 1 },
  @{ label = "Email link"; pattern = 'mailto:hello@drexa.tech'; min = 1 },
  @{ label = "Form name input"; pattern = 'name="name"'; min = 1 },
  @{ label = "Form email input"; pattern = 'name="email"'; min = 1 },
  @{ label = "Form budget input"; pattern = 'name="budget"'; min = 1 },
  @{ label = "Form message textarea"; pattern = 'name="message"'; min = 1 },
  @{ label = "lucide-shield icon"; pattern = 'lucide-shield'; min = 1 },
  @{ label = "lucide-wand2 icon"; pattern = 'lucide-wand2'; min = 1 },
  @{ label = "lucide-circuit-board icon"; pattern = 'lucide-circuit-board'; min = 1 }
)
foreach ($c in $checks) {
  $count = ([regex]::Matches($content, $c.pattern)).Count
  $ok = if ($count -ge $c.min) { "OK " } else { "FAIL" }
  Write-Host "$ok  $($c.label) (found $count, need $($c.min))"
}
