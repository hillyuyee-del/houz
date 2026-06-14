"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { countries, designers, hotels } from "@/lib/data";

const categories = [
  { key: "countries" as const, label: "Countries" },
  { key: "designers" as const, label: "Designers" },
  { key: "hotels" as const, label: "Hotels" },
];

function InspirationCard({
  item, index, href, subtitle,
}: {
  item: { slug: string; name: string; description: string; cover: string };
  index: number; href: string; subtitle: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06 }}
    >
      <a href={href} className="group block">
        {/* Bigger image — 4:3 aspect, fills card width */}
        <div className="relative overflow-hidden mb-5 aspect-[4/3] bg-[#EDE8E0] rounded-xl">
          <img
            src={item.cover}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-800 group-hover:scale-105"
            loading={index < 4 ? "eager" : "lazy"}
          />
        </div>

        <div>
          <p className="text-xs text-[#8FA88A] tracking-widest uppercase mb-1.5">{subtitle}</p>
          <h3 className="text-xl font-serif text-[#3D3227] group-hover:text-[#8FA88A] transition-colors mb-1.5"
            style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>
            {item.name}
          </h3>
          <p className="text-sm text-[#A0988E] leading-relaxed line-clamp-2">{item.description}</p>
        </div>
      </a>
    </motion.div>
  );
}

export function InspirationSection() {
  const [activeTab, setActiveTab] = useState<"countries" | "designers" | "hotels">("countries");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const activeData = activeTab === "countries" ? countries : activeTab === "designers" ? designers : hotels;

  const getSubtitle = (item: any) =>
    activeTab === "countries" ? item.subtitle :
    activeTab === "designers" ? `${item.origin} · ${item.style}` : item.location;

  const getHref = (item: any) => `/inspiration/${activeTab}/${item.slug}`;

  return (
    <section id="inspiration" ref={ref} className="py-28 md:py-40 px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-[#8FA88A] mb-4">Session 01</p>
          <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.1] text-[#3D3227]"
            style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>
            Inspiration
          </h2>
        </div>
        <p className="text-[#A0988E] text-base max-w-[340px] leading-relaxed">
          Every culture tells a design story. Explore the world&apos;s most distinctive interior aesthetics.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 mb-14 bg-[#EDE8E0]/60 p-1 rounded-full w-fit">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(cat.key)}
            className={`px-7 py-3 rounded-full text-sm tracking-wide transition-all duration-400 ${
              activeTab === cat.key ? "bg-white text-[#5C4A3A] shadow-sm" : "text-[#A0988E] hover:text-[#5C4A3A]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12"
        >
          {activeData.map((item, i) => (
            <InspirationCard
              key={item.slug}
              item={item}
              index={i}
              href={getHref(item)}
              subtitle={getSubtitle(item)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
