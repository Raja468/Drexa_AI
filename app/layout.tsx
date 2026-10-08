import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const manrope = localFont({ src: './fonts/manrope-var.woff2', variable: '--font-manrope', display: 'swap', preload: true })
const inter = localFont({ src: './fonts/inter-var.woff2', variable: '--font-inter', display: 'swap', preload: true })
const instrumentSerif = localFont({ src: './fonts/instrument-serif-italic.woff2', variable: '--font-instrument', display: 'swap', preload: false })
const jetbrainsMono = localFont({ src: './fonts/jetbrains-mono-var.woff2', variable: '--font-jetbrains', display: 'swap', preload: false })

export const metadata: Metadata = {
  title: 'Drexa AI | AI Automation, Web & Software Development',
  description: 'Independent studio in Pakistan building AI automation, websites, custom software and cybersecurity services for growing businesses. Free consultation.',
  metadataBase: new URL('https://drexa.tech'),
  alternates: { canonical: 'https://drexa.tech' },
  icons: { icon: '/circular-app-icon-1.png', apple: '/circular-app-icon-1.png' },
  openGraph: { title: 'Drexa AI | Build smarter. Run safer.', description: 'AI automation, web and software development, and cybersecurity for growing businesses.', url: 'https://drexa.tech', siteName: 'Drexa AI', type: 'website', images: [{ url: '/logo.png', width: 1672, height: 941, alt: 'Drexa AI — Build smarter. Run safer.' }] },
  twitter: { card: 'summary_large_image', title: 'Drexa AI | Build smarter. Run safer.', description: 'AI automation, web and software development, and cybersecurity for growing businesses.', images: ['/logo.png'] },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#ffffff' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <body>
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
                "Independent technology studio building AI automation, web and software development, and cybersecurity services.",
              email: "hello@drexa.tech",
              telephone: "+923715082737",
              areaServed: ["Pakistan", "Worldwide"],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Islamabad",
                addressCountry: "PK",
              },
              sameAs: ["https://github.com/Raja468"],
            }),
          }}
        />
      </body>
    </html>
  )
}
