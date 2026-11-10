import type { Metadata } from 'next'
import TeamPageClient from './TeamPageClient'

export const metadata: Metadata = {
  title: 'Our Team | Drexa AI',
  description: 'Meet the people behind Drexa AI, a small remote-first technology studio based in Chakwal, Pakistan.',
  alternates: { canonical: 'https://drexa.tech/team' },
  openGraph: {
    title: 'Our Team | Drexa AI',
    description: 'Meet the people behind Drexa AI, a small remote-first technology studio based in Chakwal, Pakistan.',
    url: 'https://drexa.tech/team',
    siteName: 'Drexa AI',
    type: 'website',
    images: [{ url: '/logo.png', width: 1672, height: 941, alt: 'Drexa AI — Build smarter. Run safer.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Team | Drexa AI',
    description: 'Meet the people behind Drexa AI, a small remote-first technology studio based in Chakwal, Pakistan.',
    images: ['/logo.png'],
  },
}

export default function TeamPage() {
  return <TeamPageClient />
}
