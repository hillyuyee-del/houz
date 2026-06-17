"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import curatedRaw from "@/lib/curated-images.json";

const C = curatedRaw as Record<string, string[]>;

const countries = [
  { name: "Japan", key: "japan-interior", flag: "🇯🇵" },
  { name: "Italy", key: "italy-interior", flag: "🇮🇹" },
  { name: "France", key: "france-interior", flag: "🇫🇷" },
  { name: "Denmark", key: "denmark-interior", flag: "🇩🇰" },
  { name: "Morocco", key: "morocco-interior", flag: "🇲🇦" },
  { name: "China", key: "china-interior", flag: "🇨🇳" },
];

export function CountryExplorer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto bg-[#F7F4EF]/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-10 flex items-end justify-between"
      >
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-[#8FA88A] mb-3">Explore by</p>
          <h2 className="text-3xl md:text-4xl text-[#3D3227]" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>
            Country
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {countries.map((c, i) => {
          const img = C[c.key]?.[0] || "";
          return (
            <motion.a
              key={c.name}
              href="/explore"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-[#EDE8E0] mb-3">
                <img src={img} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-2xl">{c.flag}</span>
                  <p className="text-white text-sm font-medium mt-1">{c.name}</p>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
