"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { Lightbox } from "@/components/shared/lightbox";
import { Heart, Sparkles } from "lucide-react";
import { hotelBrands, hotelCollections } from "@/lib/hotels-data";
import curatedRaw from "@/lib/curated-images.json";

const C = curatedRaw as Record<string, string[]>;

// All properties flattened
const allProperties = hotelBrands.flatMap((b) => b.properties);

export default function HotelsPage() {
  const [activeBrand, setActiveBrand] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [savedImages, setSavedImages] = useState<Set<string>>(new Set());

  const filtered = activeBrand === "all"
    ? allProperties
    : allProperties.filter((p) => p.brand.toLowerCase() === activeBrand);

  const toggleSave = (slug: string) => {
    setSavedImages((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  };

  // Get images for a property
  const getPropertyImages = (slug: string): string[] => {
    // Try curated key first, fallback to search-based
    const key = slug.replace(/-/g, " ");
    return C[slug] || C[key] || [];
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-6 md:px-10 lg:px-14 max-w-[1600px] mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-[#8FA88A] mb-3">Luxury Hospitality</p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#3D3227] mb-4" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>
            Hotels & Resorts
          </h1>
          <p className="text-[#A0988E] text-lg max-w-[600px]">
            The world&apos;s finest hotel interiors — from Aman sanctuaries to Bulgari palazzos.
          </p>
        </motion.div>

        {/* Brand filters */}
        <div className="flex flex-wrap gap-2 mb-14">
          <button onClick={() => setActiveBrand("all")}
            className={`px-5 py-2.5 rounded-full text-xs tracking-wide transition-all ${activeBrand === "all" ? "bg-[#5C4A3A] text-white" : "bg-white text-[#7A7065] border border-[#D4C4AE]/20 hover:border-[#8FA88A]/50"}`}>
            All Brands
          </button>
          {hotelBrands.map((brand) => (
            <button key={brand.slug} onClick={() => setActiveBrand(brand.slug)}
              className={`px-5 py-2.5 rounded-full text-xs tracking-wide transition-all ${activeBrand === brand.slug ? "bg-[#5C4A3A] text-white" : "bg-white text-[#7A7065] border border-[#D4C4AE]/20 hover:border-[#8FA88A]/50"}`}>
              {brand.name}
            </button>
          ))}
        </div>

        {/* Brand description */}
        {activeBrand !== "all" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
            <p className="text-sm text-[#7A7065] max-w-[600px] leading-relaxed">
              {hotelBrands.find((b) => b.slug === activeBrand)?.description}
            </p>
          </motion.div>
        )}

        {/* Properties grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-20">
          {filtered.map((property, i) => {
            const images = getPropertyImages(property.slug);
            const coverImg = images[0] || "";
            return (
              <motion.div key={property.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }} className="group cursor-pointer"
                onClick={() => { setLightboxImages(images); setLightboxIndex(0); setLightboxOpen(true); }}>
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-[#EDE8E0] mb-3">
                  <img src={coverImg} alt={property.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <button onClick={(e) => { e.stopPropagation(); toggleSave(property.slug); }}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart size={15} className={savedImages.has(property.slug) ? "fill-red-400 text-red-400" : "text-[#5C4A3A]"} />
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white/60 text-[10px] tracking-widest uppercase">{property.brand}</p>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-[#3D3227] group-hover:text-[#8FA88A] transition-colors">{property.name}</h3>
                <p className="text-xs text-[#A0988E] mt-0.5">{property.location} · {property.style}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Netflix-style Collections */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-[#8FA88A]" />
            <p className="text-xs tracking-[0.2em] uppercase text-[#8FA88A]">Curated Collections</p>
          </div>
          <h2 className="text-2xl font-serif text-[#3D3227] mb-6" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>
            Discover by Theme
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {hotelCollections.map((col, i) => {
            const colImages = C[col.slug] || [];
            const cover = colImages[0] || "";
            return (
              <motion.a key={col.slug} href={`/explore?collection=${col.slug}`}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl aspect-[16/9] bg-[#EDE8E0] mb-3">
                  <img src={cover} alt={col.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-serif" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>{col.title}</h3>
                    <p className="text-white/60 text-xs mt-1 line-clamp-2">{col.description}</p>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </main>
      <Footer />

      {lightboxOpen && (
        <Lightbox images={lightboxImages} currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % lightboxImages.length)} />
      )}
    </>
  );
}
