"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import curatedRaw from "@/lib/curated-images.json";

const C = curatedRaw as Record<string, string[]>;

const palettes = [
  { name: "Warm Earth", mood: "Grounded & Serene", colors: ["#D4C5B9","#C4A882","#A89880","#8B7355","#6B5B4F"], desc: "Rooted in nature — warm neutrals for quiet contemplation.", img: C["japan-interior"]?.[6] },
  { name: "Sage Calm", mood: "Fresh & Peaceful", colors: ["#E2EBDF","#B8C9B2","#8FA88A","#6B8B65","#4A5C3F"], desc: "Green-driven serenity — botanical calm for every room.", img: C["japan-interior"]?.[8] },
  { name: "Coastal Haze", mood: "Airy & Luminous", colors: ["#F5F0EB","#E8E0D8","#D4CAC0","#C5BFB5","#B8B0A6"], desc: "Misted coastlines and sun-bleached stone.", img: C["italy-interior"]?.[10] },
  { name: "Deep Cocoa", mood: "Dramatic & Refined", colors: ["#3C3028","#4A3F35","#5C4A3A","#7A6050","#A08464"], desc: "Dark sophisticated tones for architectural spaces.", img: C["wabi-minimal"]?.[4] },
  { name: "Terracotta Bloom", mood: "Warm & Inviting", colors: ["#C4956A","#D4A87C","#E8D5C0","#F0E8DD","#A08060"], desc: "Sun-baked clay and desert bloom — spaces that embrace.", img: C["morocco-interior"]?.[5] },
  { name: "Nordic Light", mood: "Clean & Bright", colors: ["#FAFAF8","#E8E4DD","#D5CFC7","#C0B8AE","#A0988E"], desc: "The gentle light of Nordic mornings.", img: C["denmark-interior"]?.[9] },
  { name: "Parisian Neutral", mood: "Elegant & Subtle", colors: ["#F0EBE3","#D4CAC0","#B8A898","#9C8B7B","#4A4440"], desc: "Haussmann elegance — cream walls, herringbone, marble.", img: C["france-interior"]?.[12] },
  { name: "Zen Garden", mood: "Tranquil & Meditative", colors: ["#E5DED5","#C4A882","#8B6F5E","#5C7A5C","#3C3028"], desc: "Japanese-inspired balance of warm wood and moss green.", img: C["japan-interior"]?.[14] },
  { name: "Industrial Loft", mood: "Raw & Urban", colors: ["#D4D0CA","#B0A89E","#8C8278","#5C5248","#3A322A"], desc: "Exposed brick, steel beams, concrete floors.", img: C["concrete-arch"]?.[6] },
  { name: "Bali Retreat", mood: "Tropical & Serene", colors: ["#E8E0D0","#C9B896","#A89870","#7C8C6C","#4C5C3C"], desc: "Open-air living — bamboo, teak, and jungle greenery.", img: C["japan-interior"]?.[18] },
];

export default function ColorsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-6 md:px-10 lg:px-14 max-w-[1600px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
          <h1 className="text-4xl md:text-5xl font-serif text-[#3D3227] mb-4" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>Color Palettes</h1>
          <p className="text-[#A0988E] text-lg">Curated color schemes with real room photography.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {palettes.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#D4C4AE]/20">
              <div className="aspect-[3/2] bg-[#EDE8E0] overflow-hidden">
                <img src={p.img || ""} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-serif text-[#3D3227] mb-1" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>{p.name}</h3>
                <p className="text-xs text-[#8FA88A] mb-4">{p.mood}</p>
                <div className="flex gap-2 mb-4">
                  {p.colors.map(c => (
                    <div key={c} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full aspect-square rounded-lg shadow-sm border border-black/5" style={{ backgroundColor: c }} />
                      <span className="text-[9px] text-[#A0988E] font-mono">{c}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#A0988E] leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
