'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react'

const links = [['Work', '/work'], ['About', '/about'], ['Blog', '/blog'], ['Contact', '/contact']] as const
const services = [['AI Development & Automation', '/services/ai-automation'], ['Web Development', '/services/web-development'], ['Software Development', '/services/software-development'], ['Cybersecurity', '/services/cybersecurity']] as const

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href))
    return (
      <Link href={href} className={`relative flex min-h-11 items-center text-[15px] font-semibold transition-colors hover:text-accent ${isActive ? 'text-accent' : 'text-foreground'}`}>
        {children}
        {isActive && (
          <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-accent rounded-t-sm" />
        )}
      </Link>
    )
  }

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white border-b border-border shadow-sm' : 'bg-transparent'}`}>
      <div className={`mx-auto flex h-[88px] max-w-[1440px] items-center justify-between px-6 lg:px-10 border-x ${scrolled ? 'border-border' : 'border-transparent transition-colors duration-300'}`}>
        <Link href="/" className="flex items-center gap-3 font-display text-[20px] font-bold tracking-tight" aria-label="Drexa AI home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-[15px] font-bold text-white">D</span>
          <span>Drexa AI</span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          <div className="group relative">
            <button className={`flex min-h-11 items-center gap-1 text-[15px] font-semibold transition-colors hover:text-accent ${pathname?.startsWith('/services') ? 'text-accent' : 'text-foreground'}`}>
              Services <ChevronDown size={15} />
              {pathname?.startsWith('/services') && <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-accent rounded-t-sm" />}
            </button>
            <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="rounded-[12px] border border-border bg-white p-2 shadow-lg">
                {services.map(([label, href]) => (
                  <Link key={href} href={href} className="block rounded-lg px-4 py-3 text-[14px] font-semibold text-[#54585F] transition-colors hover:bg-[#F6F6F3] hover:text-accent">{label}</Link>
                ))}
              </div>
            </div>
          </div>
          {links.map(([label, href]) => (
            <NavLink key={href} href={href}>{label}</NavLink>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link href="/contact" className="group inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-white transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B6B57] hover:bg-accent-hover">
            Book a free consultation <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
          </Link>
        </div>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-white lg:hidden">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-white px-6 py-6 lg:hidden shadow-lg h-screen overflow-y-auto pb-32">
          <nav className="mx-auto flex max-w-[1440px] flex-col" aria-label="Mobile navigation">
            <p className="mb-4 font-mono text-[13px] uppercase tracking-[0.06em] text-accent">Services</p>
            {services.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className={`border-b border-border py-4 text-[18px] font-semibold ${pathname === href ? 'text-accent' : 'text-foreground'}`}>
                {label}
              </Link>
            ))}
            <div className="mt-8">
              {links.map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className={`block border-b border-border py-4 text-[18px] font-semibold ${pathname === href ? 'text-accent' : 'text-foreground'}`}>
                  {label}
                </Link>
              ))}
            </div>
            <Link href="/contact" onClick={() => setOpen(false)} className="group mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-accent px-6 font-semibold text-white">
              Book a free consultation <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
