"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { Lightbox } from "@/components/shared/lightbox";
import curatedRaw from "@/lib/curated-images.json";

const C = curatedRaw as Record<string, string[]>;

const styleData = [
  { slug: "japandi", name: "Japandi", origin: "Japan + Scandinavia", desc: "Minimal warmth — clean lines meet natural materials.", color: "#8FA88A", query: "japandi-style" },
  { slug: "wabi-sabi", name: "Wabi-Sabi", origin: "Japan", desc: "Beauty in imperfection — organic, handmade, earthy.", color: "#A89880", query: "wabi-sabi-style" },
  { slug: "scandinavian", name: "Scandinavian", origin: "Nordic", desc: "Light-filled simplicity, functional beauty, hygge.", color: "#C5BFB5", query: "scandi-style" },
  { slug: "french-cream", name: "French Cream", origin: "France", desc: "Haussmann elegance — herringbone, marble, moldings.", color: "#D4CAC0", query: "french-cream-style" },
  { slug: "mediterranean", name: "Mediterranean", origin: "Southern Europe", desc: "Terracotta, stone arches, sun-drenched warmth.", color: "#C9A882", query: "mediterranean-style" },
  { slug: "industrial", name: "Industrial", origin: "Global", desc: "Exposed brick, steel beams, concrete — loft living.", color: "#6B6B6B", query: "industrial-style" },
  { slug: "minimal", name: "Minimal", origin: "Global", desc: "Less is more — pure, clean, uncluttered spaces.", color: "#E8E0D8", query: "minimal-style" },
  { slug: "modern-luxury", name: "Modern Luxury", origin: "Global", desc: "Marble, brass, velvet — refined sculptural opulence.", color: "#5C4A3A", query: "modern-luxury-style" },
  { slug: "moroccan", name: "Moroccan", origin: "North Africa", desc: "Zellige tiles, carved plaster, lanterns, rich textiles.", color: "#C4956A", query: "moroccan-style" },
  { slug: "chinese-contemporary", name: "Chinese Contemporary", origin: "China", desc: "Ming philosophy, wood screens, tea rooms, modern.", color: "#A08464", query: "chinese-style" },
];

export default function StylesPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxTitle, setLightboxTitle] = useState("");

  const openLightbox = (style: typeof styleData[0]) => {
    const images = C[style.query] || [];
    setLightboxImages(images);
    setLightboxIndex(0);
    setLightboxTitle(style.name);
    setLightboxOpen(true);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-6 md:px-10 lg:px-14 max-w-[1600px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
          <h1 className="text-4xl md:text-5xl font-serif text-[#3D3227] mb-4" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>Style Library</h1>
          <p className="text-[#A0988E] text-lg">Explore design languages from around the world.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {styleData.map((style, i) => (
            <motion.div key={style.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }} className="group cursor-pointer" onClick={() => openLightbox(style)}>
              <div className="relative overflow-hidden rounded-xl aspect-[3/4] bg-[#EDE8E0] mb-3">
                <img src={C[style.query]?.[0] || ""} alt={style.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/70 text-xs tracking-wider mb-1">{style.origin}</p>
                  <h3 className="text-white text-lg font-serif" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>{style.name}</h3>
                </div>
              </div>
              <p className="text-xs text-[#A0988E] leading-relaxed px-0.5">{style.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />

      {lightboxOpen && (
        <Lightbox images={lightboxImages} currentIndex={lightboxIndex} title={lightboxTitle}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % lightboxImages.length)} />
      )}
    </>
  );
}
