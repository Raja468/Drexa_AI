'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'

const links = [['Work', '/work'], ['About', '/about'], ['Blog', '/blog'], ['Contact', '/contact']] as const
const services = [['AI Development & Automation', '/services/ai-automation'], ['Web Development', '/services/web-development'], ['Software Development', '/services/software-development'], ['Cybersecurity', '/services/cybersecurity']] as const

export function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3 font-display text-lg font-bold tracking-tight" aria-label="Drexa AI home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">D</span>
          <span>Drexa AI</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          <div className="group relative"><button className="flex min-h-11 items-center gap-1 text-sm font-semibold text-body hover:text-accent">Services <ChevronDown size={15} /></button><div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100"><div className="rounded-xl border border-border bg-white p-2 shadow-sm">{services.map(([label, href]) => <Link key={href} href={href} className="block rounded-lg px-3 py-2.5 text-sm text-body hover:bg-muted hover:text-accent">{label}</Link>)}</div></div></div>
          {links.map(([label, href]) => <Link key={href} href={href} className="flex min-h-11 items-center text-sm font-semibold text-body hover:text-accent">{label}</Link>)}
        </nav>
        <div className="hidden lg:block"><Link href="/contact" className="inline-flex min-h-11 items-center rounded-lg bg-accent px-5 text-sm font-semibold text-white transition hover:bg-accent-hover">Book a free consultation</Link></div>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border lg:hidden">{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      {open && <div className="border-t border-border bg-white px-6 py-6 lg:hidden"><nav className="mx-auto flex max-w-[1200px] flex-col" aria-label="Mobile navigation"><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">Services</p>{services.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="border-b border-border py-3 text-lg">{label}</Link>)}{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="border-b border-border py-3 text-lg">{label}</Link>)}<Link href="/contact" onClick={() => setOpen(false)} className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 font-semibold text-white">Book a free consultation</Link></nav></div>}
    </header>
  )
}
