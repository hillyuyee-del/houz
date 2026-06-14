"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { rooms } from "@/lib/data";

const colorPalettes = [
  {
    name: "Warm Earth",
    mood: "Grounded & Serene",
    colors: ["#D4C5B9", "#C4A882", "#A89880", "#8B7355", "#6B5B4F"],
    description: "Rooted in nature — warm neutrals for quiet contemplation.",
    image: "/api/images?q=warm%20earth%20tone%20interior&i=20&w=600",
  },
  {
    name: "Sage Calm",
    mood: "Fresh & Peaceful",
    colors: ["#E2EBDF", "#B8C9B2", "#8FA88A", "#6B8B65", "#4A5C3F"],
    description: "Green-driven serenity — botanical calm for every room.",
    image: "/api/images?q=sage%20green%20interior%20calm&i=21&w=600",
  },
  {
    name: "Coastal Haze",
    mood: "Airy & Luminous",
    colors: ["#F5F0EB", "#E8E0D8", "#D4CAC0", "#C5BFB5", "#B8B0A6"],
    description: "Misted coastlines and sun-bleached stone — effortless elegance.",
    image: "/api/images?q=coastal%20airy%20luminous%20interior&i=22&w=600",
  },
  {
    name: "Deep Cocoa",
    mood: "Dramatic & Refined",
    colors: ["#3C3028", "#4A3F35", "#5C4A3A", "#7A6050", "#A08464"],
    description: "Dark, sophisticated tones — depth and drama in architectural spaces.",
    image: "/api/images?q=dark%20cocoa%20dramatic%20interior&i=23&w=600",
  },
  {
    name: "Terracotta Bloom",
    mood: "Warm & Inviting",
    colors: ["#C4956A", "#D4A87C", "#E8D5C0", "#F0E8DD", "#A08060"],
    description: "Sun-baked clay and desert bloom — spaces that embrace you.",
    image: "/api/images?q=terracotta%20warm%20inviting%20interior&i=24&w=600",
  },
  {
    name: "Nordic Light",
    mood: "Clean & Bright",
    colors: ["#FAFAF8", "#E8E4DD", "#D5CFC7", "#C0B8AE", "#A0988E"],
    description: "The gentle light of Nordic mornings — whisper-soft and functional.",
    image: "/api/images?q=nordic%20light%20clean%20bright%20interior&i=25&w=600",
  },
];

type ElementsTab = "rooms" | "colors";

export function ElementsSection() {
  const [activeRoom, setActiveRoom] = useState(rooms[0]);
  const [activeTab, setActiveTab] = useState<ElementsTab>("rooms");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="elements" ref={ref} className="py-24 md:py-36 px-6 md:px-10 lg:px-14 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <p className="label mb-4 text-[#8FA88A]">Session 03</p>
          <h2
            className="heading-lg text-[#3D3227]"
            style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}
          >
            Elements
          </h2>
        </div>
        <p className="body-lg text-[#A0988E] max-w-[340px]">
          Every piece and palette tells a story. Browse furniture and color
          schemes organized by space.
        </p>
      </motion.div>

      {/* Tabs: Rooms | Colors */}
      <div className="flex gap-1 mb-10 bg-[#EDE8E0]/60 p-1 rounded-full w-fit">
        {[
          { key: "rooms" as const, label: "Rooms & Furniture" },
          { key: "colors" as const, label: "Color Palettes" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-2.5 rounded-full text-sm tracking-wide transition-all duration-400 ${
              activeTab === tab.key
                ? "bg-white text-[#5C4A3A] shadow-sm"
                : "text-[#A0988E] hover:text-[#5C4A3A]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Rooms & Furniture */}
      {activeTab === "rooms" && (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-14">
          {/* Left: Room Selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-1"
          >
            {rooms.map((room) => (
              <button
                key={room.slug}
                onClick={() => setActiveRoom(room)}
                className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-400 ${
                  activeRoom.slug === room.slug
                    ? "bg-white shadow-sm border border-[#D4C4AE]/30"
                    : "hover:bg-white/50 border border-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className={`text-base font-serif transition-colors duration-400 ${
                        activeRoom.slug === room.slug ? "text-[#3D3227]" : "text-[#A0988E]"
                      }`}
                      style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}
                    >
                      {room.name}
                    </h3>
                    <p className="text-xs text-[#A0988E] mt-0.5">{room.subtitle}</p>
                  </div>
                  {activeRoom.slug === room.slug && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8FA88A]" />
                  )}
                </div>
              </button>
            ))}
          </motion.div>

          {/* Right: Items Grid */}
          <motion.div
            key={activeRoom.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="relative overflow-hidden rounded-2xl mb-8 aspect-[2.5/1] bg-[#EDE8E0]">
              <img
                src={activeRoom.cover}
                alt={activeRoom.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D3227]/10 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-xs text-white/80 tracking-widest uppercase mb-1">
                  {activeRoom.subtitle}
                </p>
                <h3
                  className="text-2xl text-white font-serif"
                  style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}
                >
                  {activeRoom.name}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {activeRoom.items.map((item, i) => (
                <motion.a
                  key={item.slug}
                  href={`/elements/${activeRoom.slug}/${item.slug}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-xl aspect-[3/4] bg-[#EDE8E0] mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover img-hover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#3D3227]/60 to-transparent">
                      <p className="text-xs text-white/80">{item.count} designs</p>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-[#3D3227] group-hover:text-[#8FA88A] transition-colors">
                    {item.name}
                  </h4>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Tab: Color Palettes */}
      {activeTab === "colors" && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {colorPalettes.map((palette, i) => (
            <motion.div
              key={palette.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#D4C4AE]/20"
            >
              {/* Palette image preview */}
              <div className="aspect-[3/2] bg-[#EDE8E0] overflow-hidden">
                <img
                  src={palette.image}
                  alt={palette.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-6">
                <h3
                  className="text-lg font-serif text-[#3D3227] mb-1"
                  style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}
                >
                  {palette.name}
                </h3>
                <p className="text-xs text-[#8FA88A] mb-4">{palette.mood}</p>

                {/* Color swatches */}
                <div className="flex gap-2 mb-4">
                  {palette.colors.map((color) => (
                    <div key={color} className="flex-1 flex flex-col items-center gap-1.5">
                      <div
                        className="w-full aspect-square rounded-lg shadow-sm border border-black/5"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-[9px] text-[#A0988E] font-mono">{color}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#A0988E] leading-relaxed">{palette.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
