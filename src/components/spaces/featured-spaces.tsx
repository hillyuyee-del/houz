"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Heart, Plus } from "lucide-react";

const spaces = [
  {
    id: 1,
    title: "Kyoto Garden Residence",
    location: "Kyoto, Japan",
    style: "Japandi",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: 2,
    title: "Copenhagen Light Loft",
    location: "Copenhagen, Denmark",
    style: "Scandinavian",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "aspect-[4/5]",
  },
  {
    id: 3,
    title: "Mallorca Stone Villa",
    location: "Mallorca, Spain",
    style: "Mediterranean",
    image:
      "https://images.unsplash.com/photo-1615572359976-1e23f59e265e?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "aspect-[3/2]",
  },
  {
    id: 4,
    title: "Parisian Haussmann",
    location: "Paris, France",
    style: "Parisian",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: 5,
    title: "Shanghai Silk House",
    location: "Shanghai, China",
    style: "Contemporary Chinese",
    image:
      "https://images.unsplash.com/photo-1604572244532-993c5a94c5a1?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "aspect-[4/5]",
  },
  {
    id: 6,
    title: "Milan Modernist",
    location: "Milano, Italy",
    style: "Modern Luxury",
    image:
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "aspect-[1/1]",
  },
  {
    id: 7,
    title: "Stockholm Serenity",
    location: "Stockholm, Sweden",
    style: "Scandinavian",
    image:
      "https://images.unsplash.com/photo-1598928506311-c55e8431f34b?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: 8,
    title: "Bali Zen Pavilion",
    location: "Bali, Indonesia",
    style: "Wabi-Sabi",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "aspect-[3/2]",
  },
  {
    id: 9,
    title: "Brooklyn Heights",
    location: "New York, USA",
    style: "Modern Luxury",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "aspect-[4/5]",
  },
];

function SpaceCard({
  space,
  index,
}: {
  space: (typeof spaces)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
  const [saved, setSaved] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.08,
      }}
      className="group cursor-pointer break-inside-avoid mb-6"
    >
      <div className={`relative overflow-hidden rounded-none ${space.aspectRatio} bg-[#F5F1EB] mb-4`}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
          style={{ backgroundImage: `url(${space.image})` }}
        />
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />

        {/* Save Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSaved(!saved);
          }}
          className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white"
          aria-label={saved ? "Unsave" : "Save"}
        >
          <Heart
            size={16}
            className={saved ? "fill-[#A8946E] text-[#A8946E]" : "text-[#181818]"}
          />
        </button>

        {/* Quick View Button */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
          <button className="w-full flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm text-[#181818] text-sm py-3 rounded-full hover:bg-white transition-all duration-300">
            <Plus size={14} />
            Quick View
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-0.5">
        <h3
          className="text-base font-serif text-[#181818] mb-1"
          style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}
        >
          {space.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-[#999999]">
          <span>{space.location}</span>
          <span className="text-[#D4C9BC]">·</span>
          <span>{space.style}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedSpaces() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="spaces"
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
          <p className="label mb-4 text-[#999999]">Curated Collection</p>
          <h2
            className="heading-lg text-[#181818] max-w-[600px]"
            style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}
          >
            Featured Spaces
          </h2>
        </div>
        <p className="body-lg text-[#999999] max-w-[360px]">
          A handpicked selection of extraordinary interiors from around the
          world.
        </p>
      </motion.div>

      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-x-6">
        {spaces.map((space, i) => (
          <SpaceCard key={space.id} space={space} index={i} />
        ))}
      </div>

      {/* View All */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-16 text-center"
      >
        <button className="inline-flex items-center gap-2 text-sm text-[#181818] border border-[#181818]/15 px-10 py-4 rounded-full hover:bg-[#181818] hover:text-white transition-all duration-500 tracking-wide">
          View All Spaces
          <span className="opacity-40">→</span>
        </button>
      </motion.div>
    </section>
  );
}
