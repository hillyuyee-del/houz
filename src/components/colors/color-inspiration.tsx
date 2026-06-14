"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const palettes = [
  {
    id: "warm-earth",
    name: "Warm Earth",
    mood: "Grounded & Serene",
    colors: ["#D4C5B9", "#C4A882", "#A89880", "#8B7355", "#6B5B4F"],
    materials: ["Natural Oak", "Wool", "Clay Plaster", "Linen"],
    description:
      "A palette rooted in nature — warm neutrals that create spaces of quiet contemplation.",
  },
  {
    id: "soft-dawn",
    name: "Soft Dawn",
    mood: "Airy & Calm",
    colors: ["#F5F0EB", "#E8E0D8", "#D4CAC0", "#C5BFB5", "#B8B0A6"],
    materials: ["Limestone", "Raw Cotton", "Brushed Oak", "Paper"],
    description:
      "The gentle light of early morning captured in a palette of whisper-soft tones.",
  },
  {
    id: "deep-noir",
    name: "Deep Noir",
    mood: "Dramatic & Refined",
    colors: ["#2A2A2A", "#3C3028", "#4A4440", "#5C4F42", "#1A1A1A"],
    materials: ["Charcoal Oak", "Blackened Steel", "Velvet", "Marble"],
    description:
      "Dark, sophisticated tones that bring depth and drama to architectural spaces.",
  },
  {
    id: "coastal-haze",
    name: "Coastal Haze",
    mood: "Fresh & Luminous",
    colors: ["#E8D5C0", "#F0E8DD", "#D4C9BC", "#C9A882", "#B8A898"],
    materials: ["Travertine", "Rattan", "Sea Grass", "Ceramic"],
    description:
      "Misted coastlines and sun-bleached stone — a palette of effortless coastal elegance.",
  },
];

export function ColorInspiration() {
  const [activePalette, setActivePalette] = useState(palettes[0]);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="colors"
      ref={ref}
      className="relative py-32 md:py-44 bg-[#181818] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="label mb-4 text-[#999999]">Color Theory</p>
            <h2
              className="heading-lg text-white max-w-[600px]"
              style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}
            >
              Color Inspiration
            </h2>
          </div>
          <p className="body-lg text-[#999999] max-w-[360px]">
            Discover palettes that transform spaces into emotional experiences.
          </p>
        </motion.div>

        {/* Palette Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Palette Names */}
          <div className="space-y-6">
            {palettes.map((palette, i) => (
              <motion.button
                key={palette.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.1 * i,
                }}
                onClick={() => setActivePalette(palette)}
                className="w-full text-left group"
              >
                <div className="flex items-center justify-between py-5 border-b border-white/10">
                  <div>
                    <h3
                      className={`text-2xl md:text-3xl font-serif transition-colors duration-500 ${
                        activePalette.id === palette.id
                          ? "text-white"
                          : "text-white/40 group-hover:text-white/70"
                      }`}
                      style={{
                        fontFamily: "'Playfair Display', ui-serif, Georgia, serif",
                      }}
                    >
                      {palette.name}
                    </h3>
                    <p className="text-sm text-white/30 mt-1">{palette.mood}</p>
                  </div>
                  <motion.div
                    animate={{
                      opacity: activePalette.id === palette.id ? 1 : 0,
                      scale: activePalette.id === palette.id ? 1 : 0.8,
                    }}
                    className="text-white/60 text-sm tracking-widest"
                  >
                    →
                  </motion.div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: Active Palette Display */}
          <div className="lg:pl-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePalette.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Color Swatches */}
                <div className="flex gap-3 mb-12">
                  {activePalette.colors.map((color, i) => (
                    <motion.div
                      key={color}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.08 * i,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="flex-1 aspect-[3/4] rounded-none relative group/swatch cursor-pointer"
                      style={{ backgroundColor: color }}
                    >
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-white/50 tracking-widest uppercase whitespace-nowrap">
                        {color}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed mb-10 mt-12">
                  {activePalette.description}
                </p>

                {/* Materials */}
                <div>
                  <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase mb-4">
                    Recommended Materials
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activePalette.materials.map((material) => (
                      <span
                        key={material}
                        className="text-xs text-white/50 border border-white/10 px-4 py-2 rounded-full hover:border-white/30 hover:text-white/80 transition-all duration-500"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
