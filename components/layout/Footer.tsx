import Link from 'next/link'
import Image from 'next/image'

const services = [['AI Development & Automation', '/services/ai-automation'], ['Web Development', '/services/web-development'], ['Software Development', '/services/software-development'], ['Cybersecurity', '/services/cybersecurity']]
const company = [['Work', '/work'], ['About', '/about'], ['Blog', '/blog'], ['Contact', '/contact']]

export function Footer() {
  return (
    <footer className="bg-[#16181D] text-[#F2F2EE]">
      <div className="mx-auto flex max-w-[1440px] flex-col border-x border-[#2A2D33]">
        <div className="grid gap-12 p-8 py-16 md:grid-cols-2 md:p-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:p-20">
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="Drexa AI home">
              <Image src="/logo.png" alt="Drexa AI" width={1672} height={941} className="h-8 w-auto" />
            </Link>
            <p className="mt-5 text-[18px] font-bold">Build smarter. Run safer.</p>
            <p className="mt-4 max-w-[30ch] text-[16px] leading-[1.6] text-[#A9ACB2]">
              Drexa AI is an independent technology studio based in Pakistan, working with clients worldwide.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-[13px] font-semibold uppercase tracking-[0.06em] text-[#F2F2EE]">Services</h2>
            <ul className="mt-6 space-y-4 text-[16px] text-[#A9ACB2]">
              {services.map(([label, href]) => (
                <li key={href}><Link href={href} className="transition-colors hover:text-white">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-[13px] font-semibold uppercase tracking-[0.06em] text-[#F2F2EE]">Company</h2>
            <ul className="mt-6 space-y-4 text-[16px] text-[#A9ACB2]">
              {company.map(([label, href]) => (
                <li key={href}><Link href={href} className="transition-colors hover:text-white">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-[13px] font-semibold uppercase tracking-[0.06em] text-[#F2F2EE]">Contact</h2>
            <div className="mt-6 space-y-4 text-[16px] text-[#A9ACB2]">
              <a className="block transition-colors hover:text-white" href="mailto:hello@drexa.tech">hello@drexa.tech</a>
              <a className="block transition-colors hover:text-white" href="https://wa.me/923715082737">WhatsApp +92 371 5082737</a>
              <a className="block transition-colors hover:text-white" href="https://github.com/Raja468" target="_blank" rel="noreferrer">GitHub / Raja468</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-[#2A2D33] p-8 md:flex-row md:items-center md:justify-between md:px-14 lg:px-20">
          <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#A9ACB2]">© 2026 Drexa AI</span>
          <div className="flex gap-6 font-mono text-[12px] uppercase tracking-[0.06em] text-[#A9ACB2]">
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-white">Terms</Link>
          </div>
        </div>

        <div className="border-t border-[#2A2D33] overflow-hidden leading-none pt-4 pb-2 text-center text-[18vw] font-display font-bold text-[#2A2D33] tracking-tighter">
          Drexa
        </div>
      </div>
    </footer>
  )
}
