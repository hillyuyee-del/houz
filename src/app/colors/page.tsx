"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import curatedRaw from "@/lib/curated-images.json";

const C = curatedRaw as Record<string, string[]>;

const palettes = [
  { name: "Warm Earth", mood: "Grounded & Serene", colors: ["#D4C5B9","#C4A882","#A89880","#8B7355","#6B5B4F"], desc: "Rooted in nature — warm neutrals for quiet contemplation.", img: C["japan-interior"]?.[6], examples: [C["japan-interior"]?.[2], C["japan-interior"]?.[8], C["wabi-sabi-style"]?.[5]] },
  { name: "Sage Calm", mood: "Fresh & Peaceful", colors: ["#E2EBDF","#B8C9B2","#8FA88A","#6B8B65","#4A5C3F"], desc: "Green-driven serenity — botanical calm for every room.", img: C["japan-interior"]?.[8], examples: [C["japan-interior"]?.[10], C["japan-interior"]?.[15], C["scandi-style"]?.[3]] },
  { name: "Coastal Haze", mood: "Airy & Luminous", colors: ["#F5F0EB","#E8E0D8","#D4CAC0","#C5BFB5","#B8B0A6"], desc: "Misted coastlines and sun-bleached stone.", img: C["italy-interior"]?.[10], examples: [C["italy-interior"]?.[5], C["mediterranean-style"]?.[8], C["italy-interior"]?.[15]] },
  { name: "Deep Cocoa", mood: "Dramatic & Refined", colors: ["#3C3028","#4A3F35","#5C4A3A","#7A6050","#A08464"], desc: "Dark sophisticated tones for architectural spaces.", img: C["modern-luxury-style"]?.[7], examples: [C["modern-luxury-style"]?.[4], C["modern-luxury-style"]?.[10], C["modern-luxury-style"]?.[15]] },
  { name: "Terracotta Bloom", mood: "Warm & Inviting", colors: ["#C4956A","#D4A87C","#E8D5C0","#F0E8DD","#A08060"], desc: "Sun-baked clay and desert bloom.", img: C["morocco-interior"]?.[5], examples: [C["morocco-interior"]?.[8], C["italy-interior"]?.[12], C["mediterranean-style"]?.[10]] },
  { name: "Nordic Light", mood: "Clean & Bright", colors: ["#FAFAF8","#E8E4DD","#D5CFC7","#C0B8AE","#A0988E"], desc: "The gentle light of Nordic mornings.", img: C["denmark-interior"]?.[9], examples: [C["denmark-interior"]?.[3], C["scandi-style"]?.[8], C["denmark-interior"]?.[14]] },
  { name: "Parisian Neutral", mood: "Elegant & Subtle", colors: ["#F0EBE3","#D4CAC0","#B8A898","#9C8B7B","#4A4440"], desc: "Haussmann elegance — cream walls, herringbone, marble.", img: C["france-interior"]?.[12], examples: [C["france-interior"]?.[5], C["france-interior"]?.[8], C["french-cream-style"]?.[6]] },
  { name: "Zen Garden", mood: "Tranquil & Meditative", colors: ["#E5DED5","#C4A882","#8B6F5E","#5C7A5C","#3C3028"], desc: "Japanese balance of warm wood and moss green.", img: C["japan-interior"]?.[14], examples: [C["japan-interior"]?.[18], C["wabi-sabi-style"]?.[8], C["japanese-ryokan"]?.[10]] },
  { name: "Industrial Loft", mood: "Raw & Urban", colors: ["#D4D0CA","#B0A89E","#8C8278","#5C5248","#3A322A"], desc: "Exposed brick, steel beams, concrete floors.", img: C["industrial-style"]?.[4], examples: [C["industrial-style"]?.[8], C["industrial-style"]?.[12], C["industrial-style"]?.[16]] },
  { name: "Bali Retreat", mood: "Tropical & Serene", colors: ["#E8E0D0","#C9B896","#A89870","#7C8C6C","#4C5C3C"], desc: "Open-air living — bamboo, teak, jungle greenery.", img: C["japan-interior"]?.[18], examples: [C["mediterranean-style"]?.[12], C["japan-interior"]?.[22], C["morocco-interior"]?.[10]] },
  { name: "Japandi Oak", mood: "Warm & Minimal", colors: ["#E8DDD0","#C4A882","#A08464","#8B7355","#5C4A3A"], desc: "Japanese+Scandinavian fusion — oak, paper, linen.", img: C["japandi-style"]?.[10], examples: [C["japandi-style"]?.[4], C["scandi-style"]?.[12], C["japan-interior"]?.[20]] },
  { name: "Monochrome Luxe", mood: "Sleek & Sophisticated", colors: ["#FAFAFA","#E0E0E0","#B0B0B0","#606060","#1A1A1A"], desc: "Black, white, and everything between — timeless sophistication.", img: C["minimal-style"]?.[8], examples: [C["minimal-style"]?.[12], C["modern-luxury-style"]?.[18], C["minimal-style"]?.[16]] },
  { name: "Moroccan Spice", mood: "Rich & Exotic", colors: ["#E8D5C0","#D4A87C","#C08060","#8B5A3C","#4A2A1A"], desc: "Zellige blues, terracotta, brass — North African warmth.", img: C["morocco-interior"]?.[15], examples: [C["morocco-interior"]?.[8], C["morocco-interior"]?.[22], C["mediterranean-style"]?.[14]] },
  { name: "Midnight Blue", mood: "Deep & Calming", colors: ["#D5DEE8","#A0B0C0","#6B7B8B","#3A4A5A","#1A2A3A"], desc: "Navy depths — perfect for bedrooms and studies.", img: C["modern-luxury-style"]?.[14], examples: [C["modern-luxury-style"]?.[20], C["minimal-style"]?.[10], C["modern-luxury-style"]?.[22]] },
  { name: "Chinese Ink", mood: "Eastern & Serene", colors: ["#E5DED5","#C4B8A8","#8B7B6B","#5C5A4A","#2A2820"], desc: "Ink wash paintings, dark wood, rice paper — timeless East.", img: C["china-interior"]?.[10], examples: [C["china-interior"]?.[5], C["china-interior"]?.[15], C["japan-interior"]?.[24]] },
  { name: "Riviera Sunset", mood: "Warm & Golden", colors: ["#F5E0C0","#E8C8A0","#D4A878","#C08860","#A06848"], desc: "French Riviera dusk — golden light on limestone walls.", img: C["france-interior"]?.[8], examples: [C["france-interior"]?.[3], C["italy-interior"]?.[18], C["mediterranean-style"]?.[6]] },
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
                <p className="text-xs text-[#A0988E] leading-relaxed mb-3">{p.desc}</p>
                {/* Example images */}
                {p.examples && (
                  <div className="flex gap-1.5 mt-2">
                    {p.examples.filter(Boolean).slice(0, 3).map((ex, ei) => (
                      <div key={ei} className="flex-1 aspect-[4/3] rounded-lg overflow-hidden bg-[#EDE8E0]">
                        <img src={ex || ""} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
