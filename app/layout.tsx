import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const geist = Geist({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  title: 'DREXA AI — AI Automation & Software Development Studio',
  description: 'We build AI systems, automation, and digital products that help businesses work smarter and grow faster. Free consultation available.',
  generator: 'Drexa AI',
  metadataBase: new URL('https://drexa.tech'),
  icons: { icon: '/circular-app-icon-1.png', apple: '/circular-app-icon-1.png' },
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
  return (
    <html lang="en" className="dark bg-background">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'DREXA AI',
              url: 'https://drexa.tech',
              logo: 'https://drexa.tech/logo.png',
              image: 'https://drexa.tech/logo.png',
              description: 'We build AI systems, automation, and digital products that help businesses work smarter and grow faster.',
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} antialiased bg-bg-dark text-white flex min-h-screen flex-col`}>
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}

