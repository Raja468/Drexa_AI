import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { ScrollProgress } from '@/components/motion/ScrollProgress'

const manrope = localFont({ src: './fonts/manrope-var.woff2', variable: '--font-manrope', display: 'swap', preload: true })
const inter = localFont({ src: './fonts/inter-var.woff2', variable: '--font-inter', display: 'swap', preload: true })
const instrumentSerif = localFont({ src: './fonts/instrument-serif-italic.woff2', variable: '--font-instrument', display: 'swap', preload: false })
const jetbrainsMono = localFont({ src: './fonts/jetbrains-mono-var.woff2', variable: '--font-jetbrains', display: 'swap', preload: false })

export const metadata: Metadata = {
  title: 'Drexa AI | Website Security, AI Visibility & Web Development',
  description: 'Chakwal-based, remote-first studio. Website security testing, AI search visibility, web and software development, AI automation. Free consultation.',
  metadataBase: new URL('https://drexa.tech'),
  alternates: { canonical: 'https://drexa.tech' },
  openGraph: { title: 'Drexa AI | Website Security, AI Visibility & Web Development', description: 'Chakwal-based, remote-first studio. Website security testing, AI search visibility, web and software development, AI automation. Free consultation.', url: 'https://drexa.tech', siteName: 'Drexa AI', type: 'website', images: [{ url: '/logo.png', width: 1672, height: 941, alt: 'Drexa AI — Build smarter. Run safer.' }] },
  twitter: { card: 'summary_large_image', title: 'Drexa AI | Website Security, AI Visibility & Web Development', description: 'Chakwal-based, remote-first studio. Website security testing, AI search visibility, web and software development, AI automation. Free consultation.', images: ['/logo.png'] },
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#09090b' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ScrollProgress />
        <SmoothScroll />
        <Navbar />
        <div>{children}</div>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Drexa AI",
              url: "https://drexa.tech",
              logo: "https://drexa.tech/logo.png",
              description:
                "Remote-first technology studio offering website security, AI visibility, web development, software development, and AI automation.",
              email: "hello@drexa.tech",
              telephone: "+923715082737",
              founder: { "@type": "Person", name: "Ahmed Bilal" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chakwal",
                addressRegion: "Punjab",
                addressCountry: "PK",
              },
              areaServed: [
                { "@type": "City", name: "Chakwal" },
                { "@type": "Country", name: "Pakistan" },
                "Worldwide",
              ],
              sameAs: ["https://github.com/Raja468"],
            }),
          }}
        />
      </body>
    </html>
  )
}
