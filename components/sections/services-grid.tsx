import Link from 'next/link'
import { ArrowRight, CircuitBoard, Eye, Globe, Shield, Terminal, type LucideIcon } from 'lucide-react'
import { FadeUp } from '@/components/motion/FadeUp'

export type ServiceItem = {
  num: string
  title: string
  href: string
  copy: string
  tags: string[]
}

const ICONS: LucideIcon[] = [Shield, Eye, Globe, Terminal, CircuitBoard]

/* First three cards span 2 of 6 columns, last two span 3: 3 + 2 layout. */
export function ServicesGrid({ services }: { services: ServiceItem[] }) {
  if (services.length === 0) return null

  return (
    <ul className="grid gap-px bg-[#2A2D33] lg:grid-cols-6">
      {services.map((service, i) => {
        const Icon = ICONS[i % ICONS.length]
        return (
          <li key={service.href} className={i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <FadeUp delay={i * 0.06} className="h-full">
              <Link
                href={service.href}
                className="group flex h-full flex-col bg-[#09090B] p-8 transition-colors duration-300 hover:bg-[#141416] focus-visible:outline-offset-[-2px] md:p-10"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#A1A1AA]">
                    {service.num}
                  </span>
                  <Icon size={22} strokeWidth={1.5} className="text-accent-dark" aria-hidden="true" />
                </div>
                <h3 className="mt-8 font-display text-[24px] font-bold leading-[1.15] tracking-tight text-[#F2F2EE] md:text-[28px]">
                  {service.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.6] text-[#A1A1AA]">{service.copy}</p>
                <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1">
                  {service.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#A1A1AA]">
                      [{tag}]
                    </span>
                  ))}
                </div>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-accent-dark group-hover:underline">
                  Explore <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
                </span>
              </Link>
            </FadeUp>
          </li>
        )
      })}
    </ul>
  )
}
