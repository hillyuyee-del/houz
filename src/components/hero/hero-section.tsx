"use client";

import { motion } from "framer-motion";
import curatedRaw from "@/lib/curated-images.json";

const C = curatedRaw as Record<string, string[]>;
const heroImg = C["modern-luxury-style"]?.[4] || C["japandi-style"]?.[2] || "";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-end pb-20">
      {/* Full-bleed image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content — bottom-aligned, minimal */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/60 text-sm tracking-[0.25em] uppercase mb-4"
        >
          AetherHouz
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-white text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em] max-w-[800px]"
          style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}
        >
          Find your<br />space.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex items-center gap-4 mt-8"
        >
          <a href="#explore" className="bg-white text-[#1a1a1a] px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white/90 transition-all">
            Explore Styles
          </a>
          <a href="/ai-studio" className="text-white/70 text-sm border-b border-white/20 pb-1 hover:text-white hover:border-white/50 transition-all">
            AI Studio →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
