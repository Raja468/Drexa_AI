import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-display', display: 'swap' })

export const metadata: Metadata = {
  title: 'Drexa AI — Build what thinks forward.',
  description: 'Drexa AI is an independent technology studio building intelligent systems, AI products, and digital experiences for ambitious teams.',
  generator: 'Drexa AI',
  icons: { icon: '/logo.png' },
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#070908' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="dark bg-background"><body className={`${geist.variable} ${geistMono.variable} antialiased`}>{children}</body></html>
}
