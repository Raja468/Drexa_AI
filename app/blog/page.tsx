import Link from 'next/link'

export const metadata = { title: 'Blog | Drexa AI', description: 'Practical notes on AI automation, web development, software, and security from Drexa AI.', alternates: { canonical: 'https://drexa.tech/blog' } }

export default function BlogPage() {
  return <main className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10 lg:py-28"><p className="text-sm font-semibold uppercase tracking-[.08em] text-accent">Notes from Drexa</p><h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-[56px]">Useful technology notes.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-body">We are preparing practical guides about AI automation, websites, software, and security for small businesses. New articles will appear here soon.</p><div className="mt-10 rounded-xl border border-border bg-muted p-8"><h2 className="text-xl font-bold">Want to talk before then?</h2><p className="mt-2 text-body">Tell us what you are trying to build or improve.</p><Link href="/contact" className="mt-5 inline-flex min-h-12 items-center rounded-lg bg-accent px-5 text-sm font-semibold text-white hover:bg-accent-hover">Book a free consultation</Link></div></main>
}
