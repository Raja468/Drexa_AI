import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoMarkProps = { className?: string };
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <Link href="/" className={cn("group inline-flex items-center", className)} aria-label="DREXA AI home">
      <Image src="/logo.png" alt="DREXA AI Logo" width={180} height={48} className="h-10 w-auto object-contain" priority />
    </Link>
  );
}
