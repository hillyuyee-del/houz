"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import curatedRaw from "@/lib/curated-images.json";
import { Lightbox } from "@/components/shared/lightbox";
import { Heart } from "lucide-react";

const C = curatedRaw as Record<string, string[]>;

// Flatten all curated images for the masonry grid
const allImages = (() => {
  const items: { url: string; category: string }[] = [];
  const seen = new Set<string>();
  for (const [cat, urls] of Object.entries(C)) {
    for (const url of urls.slice(0, 6)) {
      if (!seen.has(url)) { seen.add(url); items.push({ url, category: cat }); }
    }
  }
  return items.sort(() => Math.random() - 0.5);
})();

export function HomeMasonry() {
  const [visible, setVisible] = useState(24);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [lightboxImgs, setLightboxImgs] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const loadMore = useCallback(() => {
    setVisible((v) => Math.min(v + 24, allImages.length));
  }, []);

  const openLightbox = (idx: number) => {
    setLightboxImgs(allImages.slice(0, visible).map((i) => i.url));
    setLightboxIdx(idx);
    setLightboxOpen(true);
  };

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="mb-10"
      >
        <p className="text-xs tracking-[0.2em] uppercase text-[#8FA88A] mb-3">Discover</p>
        <h2 className="text-3xl md:text-4xl text-[#3D3227]" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>
          Latest Inspiration
        </h2>
      </motion.div>

      {/* Pinterest-style masonry */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {allImages.slice(0, visible).map((item, i) => (
          <motion.div
            key={`${item.url.slice(-20)}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.6) }}
            className="break-inside-avoid group cursor-pointer"
            onClick={() => openLightbox(i)}
          >
            <div className="relative overflow-hidden rounded-xl bg-[#EDE8E0]">
              <img
                src={item.url}
                alt={item.category}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart size={16} className="text-[#5C4A3A]" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white/80 text-xs capitalize">{item.category.replace(/-/g, " ")}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {visible < allImages.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-[#5C4A3A] text-white rounded-full text-sm hover:bg-[#8B7355] transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      {lightboxOpen && (
        <Lightbox
          images={lightboxImgs}
          currentIndex={lightboxIdx}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIdx((lightboxIdx - 1 + lightboxImgs.length) % lightboxImgs.length)}
          onNext={() => setLightboxIdx((lightboxIdx + 1) % lightboxImgs.length)}
        />
      )}
    </section>
  );
}
