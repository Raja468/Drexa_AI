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
  // Site-wide dark theme (homepage was darkened first, other pages follow here):
  // both branches are dark now. `dark` is kept so existing callers still compile.
  void dark
  const borderColor = 'border-[#2A2D33]'
  const textColor = headerTextMuted ? 'text-[#A9ACB2]' : 'text-accent-dark'

  return (
    <section id={id} className={`relative ${noBorderTop ? '' : `border-t ${borderColor}`} bg-[#16181D] text-[#F2F2EE]`}>
      <div className={`mx-auto flex max-w-[1440px] flex-col border-x ${borderColor} lg:flex-row`}>
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
