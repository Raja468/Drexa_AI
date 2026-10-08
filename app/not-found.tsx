import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="bg-white pt-[88px]">
      <section className="relative border-b border-border bg-[#F6F6F3]">
        <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row border-x border-border">
          <div className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 lg:p-10">
            <div className="sticky top-28 font-mono text-[13px] uppercase tracking-[0.06em] text-[#54585F]">
              Error / 404
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 py-20 md:p-14 lg:p-24">
            <p className="font-display text-[80px] md:text-[120px] font-[800] leading-none text-[#E4E4DF]">
              404
            </p>
            <h1 className="mt-8 font-display text-[40px] md:text-[56px] font-[800] leading-[1.02] tracking-[-0.03em] text-foreground">
              Page not found.
            </h1>
            <p className="mt-6 max-w-[60ch] text-[18px] leading-[1.6] text-[#54585F]">
              The page you're looking for has moved or doesn't exist.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/" className="group inline-flex min-h-12 items-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-white transition hover:bg-accent-hover">
                Back home <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
