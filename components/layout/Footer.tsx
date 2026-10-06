import Link from 'next/link'

const services = [['AI Development & Automation', '/services/ai-automation'], ['Web Development', '/services/web-development'], ['Software Development', '/services/software-development'], ['Cybersecurity', '/services/cybersecurity']]
const company = [['Work', '/work'], ['About', '/about'], ['Blog', '/blog'], ['Contact', '/contact']]

export function Footer() {
  return <footer className="bg-dark text-on-dark"><div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10"><div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
    <div><Link href="/" className="text-xl font-bold">Drexa AI</Link><p className="mt-5 text-lg font-semibold">Build smarter. Run safer.</p><p className="mt-4 max-w-xs leading-7 text-on-dark-muted">Drexa AI is an independent technology studio based in Pakistan, working with clients worldwide.</p></div>
    <div><h2 className="text-sm font-semibold">Services</h2><ul className="mt-5 space-y-3 text-on-dark-muted">{services.map(([label, href]) => <li key={href}><Link href={href} className="hover:text-white">{label}</Link></li>)}</ul></div>
    <div><h2 className="text-sm font-semibold">Company</h2><ul className="mt-5 space-y-3 text-on-dark-muted">{company.map(([label, href]) => <li key={href}><Link href={href} className="hover:text-white">{label}</Link></li>)}</ul></div>
    <div><h2 className="text-sm font-semibold">Contact</h2><div className="mt-5 space-y-3 text-on-dark-muted"><a className="block hover:text-white" href="mailto:hello@drexa.tech">hello@drexa.tech</a><a className="block hover:text-white" href="https://wa.me/923715082737">WhatsApp +92 371 5082737</a><a className="block hover:text-white" href="https://github.com/Raja468" target="_blank" rel="noreferrer">GitHub / Raja468</a></div></div>
  </div><div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-on-dark-muted sm:flex-row sm:justify-between"><span>© 2026 Drexa AI</span><div className="flex gap-5"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/terms" className="hover:text-white">Terms</Link></div></div></div></footer>
}
