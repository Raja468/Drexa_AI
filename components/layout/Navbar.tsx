'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react'
import { Magnetic } from '@/components/motion/Magnetic'

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
      <Link href={href} className={`group relative flex min-h-11 items-center text-[15px] font-semibold transition-colors hover:text-accent-dark ${isActive ? 'text-accent-dark' : 'text-[#F2F2EE]'}`}>
        {children}
        <span className={`absolute -bottom-[2px] left-0 right-0 h-[2px] origin-left rounded-t-sm bg-accent-dark transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
      </Link>
    )
  }

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 bg-[#16181D] transition-all duration-300 ${scrolled ? 'border-b border-[#2A2D33]' : 'border-b border-transparent'}`}>
      <div className="mx-auto flex h-[88px] max-w-[1440px] items-center justify-between px-6 lg:px-10 border-x border-[#2A2D33]">
        <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-105" aria-label="Drexa AI home">
          <Image src="/logo.png" alt="Drexa AI" width={1672} height={941} priority className="h-9 w-auto" />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          <div className="group relative">
            <button className={`flex min-h-11 items-center gap-1 text-[15px] font-semibold transition-colors hover:text-accent-dark ${pathname?.startsWith('/services') ? 'text-accent-dark' : 'text-[#F2F2EE]'}`}>
              Services <ChevronDown size={15} className="transition-transform duration-300 group-hover:rotate-180" />
              <span className={`absolute -bottom-[2px] left-0 right-0 h-[2px] origin-left rounded-t-sm bg-accent-dark transition-transform duration-300 ${pathname?.startsWith('/services') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </button>
            <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-[12px] border border-[#2A2D33] bg-[#1B1E22] p-2 shadow-lg">
                {services.map(([label, href]) => (
                  <Link key={href} href={href} className="block rounded-lg px-4 py-3 text-[14px] font-semibold text-[#A9ACB2] transition-all duration-200 hover:translate-x-1 hover:bg-[#16181D] hover:text-accent-dark">{label}</Link>
                ))}
              </div>
            </div>
          </div>
          {links.map(([label, href]) => (
            <NavLink key={href} href={href}>{label}</NavLink>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Magnetic strength={6}>
            <Link href="/contact" className="group inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-white transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3EA88A] hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0">
              Book a free consultation <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
            </Link>
          </Magnetic>
        </div>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#2A2D33] bg-[#1B1E22] text-[#F2F2EE] transition-colors hover:border-accent-dark hover:text-accent-dark lg:hidden">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="animate-fade-up border-t border-[#2A2D33] bg-[#16181D] px-6 py-6 lg:hidden shadow-lg h-screen overflow-y-auto pb-32">
          <nav className="mx-auto flex max-w-[1440px] flex-col" aria-label="Mobile navigation">
            <p className="mb-4 font-mono text-[13px] uppercase tracking-[0.06em] text-accent-dark">Services</p>
            {services.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className={`border-b border-[#2A2D33] py-4 text-[18px] font-semibold transition-colors hover:text-accent-dark ${pathname === href ? 'text-accent-dark' : 'text-[#F2F2EE]'}`}>
                {label}
              </Link>
            ))}
            <div className="mt-8">
              {links.map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className={`block border-b border-[#2A2D33] py-4 text-[18px] font-semibold transition-colors hover:text-accent-dark ${pathname === href ? 'text-accent-dark' : 'text-[#F2F2EE]'}`}>
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
