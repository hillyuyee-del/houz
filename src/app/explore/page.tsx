"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { MasonryGrid, MasonryItem } from "@/components/shared/masonry-grid";
import { Lightbox } from "@/components/shared/lightbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Search } from "lucide-react";
import curatedRaw from "@/lib/curated-images.json";

const C = curatedRaw as Record<string, string[]>;
const allImages = Object.entries(C).flatMap(([cat, urls]) =>
  urls.slice(0, 8).map((url, i) => ({ url, category: cat, id: `${cat}-${i}` }))
);

const styles = ["All", "Japandi", "Wabi-Sabi", "Scandinavian", "French Cream", "Mediterranean", "Industrial", "Minimal", "Modern Luxury"];
const rooms = ["All", "Living Room", "Bedroom", "Kitchen", "Bathroom", "Dining"];

export default function ExplorePage() {
  const [activeStyle, setActiveStyle] = useState("All");
  const [activeRoom, setActiveRoom] = useState("All");
  const [search, setSearch] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  const filtered = allImages.filter((img) => {
    if (activeStyle !== "All" && !img.category.includes(activeStyle.toLowerCase())) return false;
    if (activeRoom !== "All" && !img.category.includes(activeRoom.toLowerCase().replace(" ", "-"))) return false;
    if (search && !img.category.includes(search.toLowerCase())) return false;
    return true;
  });

  const openLightbox = (images: string[], idx: number) => {
    setLightboxImages(images);
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-6 md:px-10 lg:px-14 max-w-[1600px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#3D3227] mb-4" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>Explore</h1>
          <p className="text-[#A0988E] text-lg">Browse our curated collection of interior design inspiration.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0988E]" />
            <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-[#D4C4AE]/30 bg-white text-sm focus:outline-none focus:border-[#8FA88A]" />
          </div>
          <div className="flex flex-wrap gap-2">
            {styles.map((s) => (
              <button key={s} onClick={() => setActiveStyle(s)}
                className={`px-4 py-2 rounded-full text-xs tracking-wide transition-all ${activeStyle === s ? "bg-[#5C4A3A] text-white" : "bg-white text-[#7A7065] border border-[#D4C4AE]/20 hover:border-[#8FA88A]/50"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <p className="text-sm text-[#A0988E] mb-6">{filtered.length} images</p>

        <MasonryGrid>
          {filtered.map((img, i) => (
            <MasonryItem key={img.id}>
              <Card className="overflow-hidden border-0 shadow-none bg-transparent">
                <div className="relative overflow-hidden rounded-xl cursor-pointer group" onClick={() => openLightbox(filtered.map(f => f.url), i)}>
                  <img src={img.url} alt={img.category} loading="lazy"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart size={16} className="text-[#5C4A3A]" />
                  </button>
                </div>
                <CardContent className="p-0 pt-2">
                  <Badge variant="secondary" className="text-[10px]">{img.category.replace(/-/g, " ")}</Badge>
                </CardContent>
              </Card>
            </MasonryItem>
          ))}
        </MasonryGrid>
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
