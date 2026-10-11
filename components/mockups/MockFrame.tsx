import Image from 'next/image'
import type { ComponentType, ReactNode } from 'react'
import { ChatConnectDashboard } from './ChatConnectDashboard'
import { IqraDashboard } from './IqraDashboard'

export type MockName = 'chatconnect' | 'iqra'

const DASHBOARDS: Record<MockName, ComponentType> = {
  chatconnect: ChatConnectDashboard,
  iqra: IqraDashboard,
}

/**
 * Browser chrome around a product panel.
 *
 * The panel inside is laid out on an 840x525 (16:10) design canvas: the
 * viewport below is a container, so `--u` (one canvas pixel) tracks the frame
 * width and every size inside scales with it. The dashboard therefore always
 * fills the frame edge to edge — no scrolling, no cropped rows.
 *
 * `label` becomes the frame's accessible name; the panel itself is hidden from
 * assistive tech because it is decorative demo content, not real data.
 */
export function MockFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="browser-frame shadow-[0_1px_2px_rgba(22,24,29,0.06)]">
      <div className="browser-bar" aria-hidden="true">
        <span /><span /><span />
        <div className="ml-auto font-mono text-[11px] leading-none text-[#8A8D93]">Demo data</div>
      </div>
      <div className="mock-viewport">
        <div className="mock-canvas" role="img" aria-label={label}>
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * Project artwork frame: a mock dashboard where one exists, otherwise the
 * real screenshot. Both render inside the same 16:10 window.
 */
export function ProjectFrame({
  mock,
  image,
  alt,
  sizes = '(max-width: 1024px) 100vw, 50vw',
  priority = false,
}: {
  mock?: MockName
  image?: string
  alt: string
  sizes?: string
  priority?: boolean
}) {
  if (mock) {
    const Dashboard = DASHBOARDS[mock]
    return <MockFrame label={alt}><Dashboard /></MockFrame>
  }

  return (
    <div className="browser-frame shadow-[0_1px_2px_rgba(22,24,29,0.06)]">
      <div className="browser-bar" aria-hidden="true">
        <span /><span /><span />
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image src={image ?? ''} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    </div>
  )
}
