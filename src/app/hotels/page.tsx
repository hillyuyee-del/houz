"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { Lightbox } from "@/components/shared/lightbox";
import curatedRaw from "@/lib/curated-images.json";

const C = curatedRaw as Record<string, string[]>;

const hotelKeys = ["aman-tokyo","four-seasons-florence","ace-hotel-kyoto","amangiri","hoxton-paris","il-sereno-como","upper-house-hk","bulgari-milan","soneva-fushi","post-ranch-inn","marina-bay-sands","ritz-paris"];

const hotelData = [
  { slug: "aman-tokyo", name: "Aman Tokyo", location: "Tokyo, Japan", style: "Zen Urban Sanctuary", key: "aman-tokyo" },
  { slug: "four-seasons-florence", name: "Four Seasons Firenze", location: "Florence, Italy", style: "Renaissance Palazzo", key: "four-seasons-florence" },
  { slug: "ace-hotel-kyoto", name: "Ace Hotel Kyoto", location: "Kyoto, Japan", style: "East-Meets-West Cool", key: "ace-hotel-kyoto" },
  { slug: "amangiri", name: "Amangiri", location: "Utah, USA", style: "Desert Modernism", key: "amangiri" },
  { slug: "hoxton-paris", name: "The Hoxton Paris", location: "Paris, France", style: "18th-Century Reinvented", key: "hoxton-paris" },
  { slug: "il-sereno", name: "Il Sereno", location: "Lake Como, Italy", style: "Modernist Lakeside", key: "il-sereno-como" },
  { slug: "upper-house", name: "The Upper House", location: "Hong Kong", style: "Zen Urban Elegance", key: "upper-house-hk" },
  { slug: "bulgari-milan", name: "Bulgari Hotel Milano", location: "Milan, Italy", style: "Italian Modernist", key: "bulgari-milan" },
  { slug: "soneva-fushi", name: "Soneva Fushi", location: "Maldives", style: "Barefoot Luxury", key: "soneva-fushi" },
  { slug: "post-ranch-inn", name: "Post Ranch Inn", location: "Big Sur, USA", style: "Organic Architecture", key: "post-ranch-inn" },
  { slug: "marina-bay-sands", name: "Marina Bay Sands", location: "Singapore", style: "Futurist Icon", key: "marina-bay-sands" },
  { slug: "ritz-paris", name: "Ritz Paris", location: "Paris, France", style: "Belle Époque Grandeur", key: "ritz-paris" },
  { slug: "the-brando", name: "The Brando", location: "Tetiaroa, French Polynesia", style: "Eco-Luxury Sanctuary", key: "the-brando" },
  { slug: "fogo-island-inn", name: "Fogo Island Inn", location: "Newfoundland, Canada", style: "Architectural Minimalism", key: "fogo-island-inn" },
  { slug: "hotel-de-crillon", name: "Hôtel de Crillon", location: "Paris, France", style: "18th-Century Grandeur", key: "hotel-de-crillon" },
  { slug: "the-silo", name: "The Silo Hotel", location: "Cape Town, South Africa", style: "Industrial-Chic Luxury", key: "the-silo" },
  { slug: "giraffe-manor", name: "Giraffe Manor", location: "Nairobi, Kenya", style: "Colonial Safari Elegance", key: "giraffe-manor" },
  { slug: "adrere-amellal", name: "Adrère Amellal", location: "Siwa, Egypt", style: "Earthen Desert Refuge", key: "adrere-amellal" },
  { slug: "hoshinoya-tokyo", name: "Hoshinoya Tokyo", location: "Tokyo, Japan", style: "Modern Onsen Ryokan", key: "hoshinoya-tokyo" },
  { slug: "borgo-egnazia", name: "Borgo Egnazia", location: "Puglia, Italy", style: "Apulian Village Revival", key: "borgo-egnazia" },
];

const countries = ["All", "Japan", "Italy", "France", "USA", "Hong Kong", "Maldives", "Singapore"];

export default function HotelsPage() {
  const [activeCountry, setActiveCountry] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxTitle, setLightboxTitle] = useState("");

  const filtered = activeCountry === "All"
    ? hotelData
    : hotelData.filter(h => h.location.includes(activeCountry));

  const openLightbox = (hotel: typeof hotelData[0]) => {
    const images = C[hotel.key] || [];
    setLightboxImages(images);
    setLightboxIndex(0);
    setLightboxTitle(hotel.name);
    setLightboxOpen(true);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-6 md:px-10 lg:px-14 max-w-[1600px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#3D3227] mb-4" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>Design Hotels</h1>
          <p className="text-[#A0988E] text-lg">The world&apos;s most beautiful hotel interiors.</p>
        </motion.div>

        {/* Country filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {countries.map(c => (
            <button key={c} onClick={() => setActiveCountry(c)}
              className={`px-5 py-2 rounded-full text-xs tracking-wide transition-all ${activeCountry === c ? "bg-[#5C4A3A] text-white" : "bg-white text-[#7A7065] border border-[#D4C4AE]/20 hover:border-[#8FA88A]/50"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((hotel, i) => (
            <motion.div key={hotel.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }} className="group cursor-pointer" onClick={() => openLightbox(hotel)}>
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-[#EDE8E0] mb-3">
                <img src={C[hotel.key]?.[0] || ""} alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-white/60 text-[10px] tracking-widest uppercase">{hotel.style}</p>
                  <p className="text-white text-sm">{hotel.location}</p>
                </div>
              </div>
              <h3 className="text-base font-serif text-[#3D3227] group-hover:text-[#8FA88A] transition-colors" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>{hotel.name}</h3>
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
