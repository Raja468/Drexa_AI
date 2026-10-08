import React from 'react'

interface SectionProps {
  id?: string
  number?: string
  title?: string
  children: React.ReactNode
  dark?: boolean
  noBorderTop?: boolean
  headerTextMuted?: boolean
}

export function Section({ id, number, title, children, dark = false, noBorderTop = false, headerTextMuted = true }: SectionProps) {
  const borderColor = dark ? 'border-[#2A2D33]' : 'border-border'
  const textColor = dark ? 'text-[#A9ACB2]' : (headerTextMuted ? 'text-[#54585F]' : 'text-accent')
  
  return (
    <section id={id} className={`relative border-x ${borderColor} ${noBorderTop ? '' : `border-t ${borderColor}`} ${dark ? 'bg-[#16181D] text-[#F2F2EE]' : 'bg-white text-foreground'}`}>
      <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row">
        {title && (
          <div className={`lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r ${borderColor} p-6 md:p-8 lg:p-10`}>
            <div className={`sticky top-28 font-mono text-[13px] uppercase tracking-[0.06em] ${textColor}`}>
              {number && `${number} / `}{title}
            </div>
          </div>
        )}
        <div className={`flex-1 ${title ? '' : 'w-full'}`}>
          {children}
        </div>
      </div>
    </section>
  )
}
