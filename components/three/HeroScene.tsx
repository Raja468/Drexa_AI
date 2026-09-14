"use client";

import dynamic from "next/dynamic";

const NeuralConstellation = dynamic(
  () =>
    import("@/components/three/NeuralConstellation").then(
      (mod) => mod.NeuralConstellation
    ),
  { ssr: false }
);

export default function HeroScene({ className = "" }: { className?: string }) {
  return <NeuralConstellation className={className} />;
}
