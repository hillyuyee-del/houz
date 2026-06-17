"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { rooms } from "@/lib/data";

export function ElementsSection() {
  const [activeRoom, setActiveRoom] = useState(rooms[0]);
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
          Every piece tells a story. Browse curated furniture and décor organized by space.
        </p>
      </motion.div>

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
    </section>
  );
}
