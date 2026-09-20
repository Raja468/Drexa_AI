import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { NoiseTexture } from '@/components/ui/NoiseTexture'
import { Preloader } from '@/components/motion/Preloader'
import { ScrollProgress } from '@/components/motion/ScrollProgress'
import { CustomCursor } from '@/components/motion/CustomCursor'
import { SmoothScroll } from '@/components/motion/SmoothScroll'

/* Kinetic Typography display face. Self-hosted latin-subset variable files
   (brief §2 rule 3: no Google Fonts — Google is unreachable in the owner's
   region), so builds and rendering need no external font requests. */
const spaceGrotesk = localFont({
  src: './fonts/space-grotesk-latin-var.woff2',
  weight: '300 700',
  variable: '--font-display',
  display: 'swap',
})
/* Mono is retained deliberately for micro-labels (uppercase, tracked-wide
   eyebrows). It reads as technical/poster and is a deep pattern in this
   codebase, so it stays even though the design system only names one face. */
const geistMono = localFont({
  src: './fonts/geist-mono-latin-var.woff2',
  weight: '100 900',
  variable: '--font-mono',
  display: 'swap',
})

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

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#09090B' }

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
      {/* Browser extensions (e.g. chatgpt shortcut tools) inject attributes
          like `cz-shortcut-listen` into <body> before React hydrates, which
          throws a persistent dev-overlay hydration error. The markup itself
          matches; only foreign attributes differ, so this is the sanctioned
          React/Next treatment. */}
      <body suppressHydrationWarning className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased bg-background text-foreground flex min-h-screen flex-col preloader-lock`}>
        {/* §5 global systems (Phase 2a). The preloader gates the §7.2 hero
            load sequence via lib/preloader.ts. */}
        <Preloader />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        {/* Fixed print-grain texture over the whole viewport (§5.4). */}
        <NoiseTexture />
        {/* Thin scroll progress bar along the top edge (§5.8). */}
        <ScrollProgress />
        {/* Custom cursor — fine pointers only (§5.3). */}
        <CustomCursor />
        {/* Lenis smooth scroll, driven by the GSAP ticker (§5.1). Last so its
            sync exists for the ScrollTriggers mounted above it. */}
        <SmoothScroll />
      </body>
    </html>
  )
}

