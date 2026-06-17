"use client";

import { motion } from "framer-motion";
import curatedRaw from "@/lib/curated-images.json";

const C = curatedRaw as Record<string, string[]>;
const heroBg = "/hero-bg.png";
const preview1 = C["denmark-interior"]?.[5] || "";
const preview2 = C["italy-interior"]?.[4] || "";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1B18]/80 via-[#1E1B18]/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-32 pb-40">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="text-sm tracking-[0.2em] uppercase text-[#B8C9B2] mb-6">aetherhouz</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white text-[clamp(3.2rem,7vw,6rem)] leading-[1.05] tracking-[-0.02em] mb-8 max-w-[700px]"
          style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>
          Spaces that<br /><span className="text-[#B8C9B2]">breathe</span> calm
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
          className="text-white/70 text-lg leading-relaxed max-w-[420px] mb-12">
          Curated global interior design — cultural inspiration, AI-guided creation, and timeless elements.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0 }}
          className="flex items-center gap-4 flex-wrap">
          <a href="#inspiration" className="inline-flex items-center gap-2 bg-white text-[#3D3227] px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-[#E2EBDF] transition-all duration-500">
            Explore Inspiration <span className="text-[#8FA88A]">↓</span>
          </a>
          <a href="#chat" className="inline-flex items-center gap-2 text-white/80 text-sm tracking-wide border-b border-white/30 pb-1.5 hover:text-white hover:border-white transition-all duration-500">
            AI Design Chat →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
