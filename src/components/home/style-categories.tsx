"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import curatedRaw from "@/lib/curated-images.json";

const C = curatedRaw as Record<string, string[]>;

const styles = [
  { name: "Japandi", key: "japandi-style", desc: "Minimal warmth" },
  { name: "Wabi-Sabi", key: "wabi-sabi-style", desc: "Imperfect beauty" },
  { name: "Modern Luxury", key: "modern-luxury-style", desc: "Refined opulence" },
  { name: "Scandinavian", key: "scandi-style", desc: "Light & functional" },
  { name: "Industrial", key: "industrial-style", desc: "Raw materials" },
  { name: "French Cream", key: "french-cream-style", desc: "Effortless elegance" },
  { name: "Mediterranean", key: "mediterranean-style", desc: "Sun-drenched warmth" },
  { name: "Minimal", key: "minimal-style", desc: "Pure essence" },
];

export function StyleCategories() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-10 flex items-end justify-between"
      >
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-[#8FA88A] mb-3">Browse by</p>
          <h2 className="text-3xl md:text-4xl text-[#3D3227]" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>
            Style
          </h2>
        </div>
        <a href="/styles" className="text-sm text-[#8FA88A] hover:text-[#5C4A3A] transition-colors hidden md:block">
          View all →
        </a>
      </motion.div>

      {/* Horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
        {styles.map((style, i) => (
          <motion.a
            key={style.name}
            href={`/styles`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="flex-shrink-0 w-[220px] md:w-[260px] snap-start group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-[#EDE8E0] mb-3">
              <img
                src={C[style.key]?.[i % 5 + 2] || ""}
                alt={style.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white text-lg font-serif" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>
                  {style.name}
                </p>
                <p className="text-white/60 text-xs mt-0.5">{style.desc}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
