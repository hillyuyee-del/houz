"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const rooms = [
  {
    id: "living-room",
    name: "Living Room",
    subtitle: "The art of gathering",
    count: 248,
    image:
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1200&auto=format&fit=crop",
    description:
      "Where conversation meets comfort. Explore living spaces designed for connection, contemplation, and the rhythm of daily life.",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    subtitle: "Sanctuary of rest",
    count: 186,
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop",
    description:
      "Personal retreats crafted for restoration. Spaces that embrace you in warmth and quiet luxury at the end of each day.",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    subtitle: "The heart of home",
    count: 173,
    image:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop",
    description:
      "Culinary spaces where form and function dance. From minimalist preparation zones to warm gathering kitchens.",
  },
  {
    id: "bathroom",
    name: "Bathroom",
    subtitle: "Ritual & renewal",
    count: 142,
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop",
    description:
      "Private spas of everyday ritual. Where water, stone, and light create spaces of profound rejuvenation.",
  },
  {
    id: "workspace",
    name: "Workspace",
    subtitle: "Creative focus",
    count: 127,
    image:
      "https://images.unsplash.com/photo-1598928506311-c55e8431f34b?q=80&w=1200&auto=format&fit=crop",
    description:
      "Environments that nurture focus and creativity. Studios, home offices, and libraries designed for deep work.",
  },
];

export function RoomExplorer() {
  const [activeRoom, setActiveRoom] = useState(rooms[0]);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="rooms"
      ref={ref}
      className="relative py-32 md:py-44 bg-[#F5F1EB] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="label mb-4 text-[#999999]">Explore by Space</p>
            <h2
              className="heading-lg text-[#181818] max-w-[600px]"
              style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}
            >
              Room Explorer
            </h2>
          </div>
          <p className="body-lg text-[#999999] max-w-[360px]">
            Browse interiors by the spaces that shape our daily lives.
          </p>
        </motion.div>

        {/* Room Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
          {/* Left: Room List */}
          <div className="space-y-2">
            {rooms.map((room, i) => (
              <motion.button
                key={room.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.08 * i,
                }}
                onClick={() => setActiveRoom(room)}
                className={`w-full text-left px-6 py-5 rounded-none transition-all duration-500 group ${
                  activeRoom.id === room.id
                    ? "bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]"
                    : "hover:bg-white/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className={`text-xl md:text-2xl font-serif transition-colors duration-500 ${
                        activeRoom.id === room.id
                          ? "text-[#181818]"
                          : "text-[#999999] group-hover:text-[#666666]"
                      }`}
                      style={{
                        fontFamily: "'Playfair Display', ui-serif, Georgia, serif",
                      }}
                    >
                      {room.name}
                    </h3>
                    <p className="text-xs text-[#999999] mt-1">
                      {room.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[#C5BFB5] tracking-wider">
                      {room.count} spaces
                    </span>
                    <motion.span
                      animate={{
                        opacity: activeRoom.id === room.id ? 1 : 0,
                        x: activeRoom.id === room.id ? 0 : -10,
                      }}
                      className="text-[#A8946E] text-lg hidden md:block"
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: Active Room Preview */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRoom.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-none aspect-[4/5] mb-8">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${activeRoom.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/20 via-transparent to-transparent" />
                </div>

                {/* Room Info */}
                <div>
                  <h3
                    className="text-3xl md:text-4xl font-serif text-[#181818] mb-4"
                    style={{
                      fontFamily: "'Playfair Display', ui-serif, Georgia, serif",
                    }}
                  >
                    {activeRoom.name}
                  </h3>
                  <p className="text-sm text-[#999999] leading-relaxed max-w-[400px] mb-6">
                    {activeRoom.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm text-[#181818] border-b border-[#181818]/20 pb-1 hover:border-[#181818] transition-all duration-500"
                  >
                    Explore {activeRoom.count} spaces
                    <span className="text-[#A8946E]">→</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
