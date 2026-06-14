"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const styles = [
  {
    id: "japandi",
    name: "Japandi",
    origin: "Japan + Scandinavia",
    description:
      "The art of minimal warmth — clean lines meet natural materials in perfect harmony.",
    image:
      "https://images.unsplash.com/photo-1598928506311-c55e8431f34b?q=80&w=1200&auto=format&fit=crop",
    palette: ["#D4C5B9", "#8B7355", "#E8E0D5", "#4A4A4A"],
  },
  {
    id: "scandinavian",
    name: "Scandinavian",
    origin: "Nordic Region",
    description:
      "Light-filled simplicity — where functionality embraces the beauty of natural light.",
    image:
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1200&auto=format&fit=crop",
    palette: ["#F5F0EB", "#C5BFB5", "#E8E0D8", "#6B6B6B"],
  },
  {
    id: "wabi-sabi",
    name: "Wabi-Sabi",
    origin: "Japan",
    description:
      "Beauty in imperfection — celebrating the transient nature of all things.",
    image:
      "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=1200&auto=format&fit=crop",
    palette: ["#D4C9BC", "#A89880", "#6B5B4F", "#3A3A3A"],
  },
  {
    id: "mediterranean",
    name: "Mediterranean",
    origin: "Southern Europe",
    description:
      "Sun-drenched textures and organic forms — the warmth of coastal living.",
    image:
      "https://images.unsplash.com/photo-1615572359976-1e23f59e265e?q=80&w=1200&auto=format&fit=crop",
    palette: ["#E8D5C0", "#C9A882", "#F0E8DD", "#5C4F42"],
  },
  {
    id: "modern-luxury",
    name: "Modern Luxury",
    origin: "Global",
    description:
      "Refined opulence — rich materials and sculptural forms in curated restraint.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
    palette: ["#E5E0D8", "#A09080", "#D5CEC5", "#2A2A2A"],
  },
  {
    id: "parisian",
    name: "Parisian",
    origin: "France",
    description:
      "Effortless elegance — classical bones with a contemporary, romantic spirit.",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop",
    palette: ["#F0EBE3", "#D4CAC0", "#B8A898", "#4A4440"],
  },
  {
    id: "contemporary-chinese",
    name: "Contemporary Chinese",
    origin: "China",
    description:
      "Heritage reimagined — ancient philosophy expressed through modernist language.",
    image:
      "https://images.unsplash.com/photo-1604572244532-993c5a94c5a1?q=80&w=1200&auto=format&fit=crop",
    palette: ["#E5DED5", "#C4A882", "#8B6F5E", "#3C3028"],
  },
];

function StyleCard({
  style,
  index,
}: {
  style: (typeof styles)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.1,
      }}
      className="group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-none mb-6 aspect-[4/5] bg-[#F5F1EB]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
          style={{ backgroundImage: `url(${style.image})` }}
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />

        {/* Palette Dots on Hover */}
        <div className="absolute bottom-6 left-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {style.palette.map((color, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full border border-white/30 shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-1">
        <div className="flex items-baseline justify-between mb-2">
          <h3
            className="text-2xl font-serif text-[#181818] group-hover:text-[#A8946E] transition-colors duration-500"
            style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}
          >
            {style.name}
          </h3>
          <span className="text-xs text-[#999999] tracking-widest uppercase">
            {style.origin}
          </span>
        </div>
        <p className="text-sm text-[#999999] leading-relaxed">
          {style.description}
        </p>
      </div>
    </motion.div>
  );
}

export function GlobalStylesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      id="styles"
      ref={ref}
      className="relative py-32 md:py-44 px-8 md:px-12 lg:px-16 max-w-[1440px] mx-auto"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <p className="label mb-4 text-[#999999]">Design Lexicon</p>
          <h2
            className="heading-lg text-[#181818] max-w-[600px]"
            style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}
          >
            Global Design Styles
          </h2>
        </div>
        <p className="body-lg text-[#999999] max-w-[360px]">
          Every culture tells a design story. Explore the world&apos;s most
          distinctive interior aesthetics.
        </p>
      </motion.div>

      {/* Style Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-20">
        {/* Large first card */}
        <div className="lg:col-span-1">
          <StyleCard style={styles[0]} index={0} />
        </div>
        <div className="lg:col-span-1">
          <StyleCard style={styles[1]} index={1} />
        </div>
        <div className="lg:col-span-1">
          <StyleCard style={styles[2]} index={2} />
        </div>
        <div className="lg:col-span-1">
          <StyleCard style={styles[3]} index={3} />
        </div>
        <div className="lg:col-span-1">
          <StyleCard style={styles[4]} index={4} />
        </div>
        <div className="lg:col-span-1">
          <StyleCard style={styles[5]} index={5} />
        </div>
        <div className="lg:col-span-1 md:col-span-2 lg:col-span-1 lg:col-start-2">
          <StyleCard style={styles[6]} index={6} />
        </div>
      </div>
    </section>
  );
}
