import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-display', display: 'swap' })

export const metadata: Metadata = {
  title: 'DREXA AI — AI Automation & Software Development Studio',
  description: 'We build AI systems, automation, and digital products that help businesses work smarter and grow faster. Free consultation available.',
  generator: 'Drexa AI',
  metadataBase: new URL('https://drexa.tech'),
  icons: { icon: '/circular-app-icon-2.png' },
  openGraph: {
    title: 'DREXA AI — AI Automation & Software Development Studio',
    description: 'We build AI systems, automation, and digital products that help businesses work smarter and grow faster.',
    url: 'https://drexa.tech',
    siteName: 'DREXA AI',
    type: 'website',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'DREXA AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DREXA AI — AI Automation & Software Development Studio',
    description: 'We build AI systems, automation, and digital products that help businesses work smarter and grow faster.',
    images: ['/logo.png'],
  },
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#070908' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="dark bg-background"><body className={`${geist.variable} ${geistMono.variable} antialiased`}>{children}</body></html>
}
