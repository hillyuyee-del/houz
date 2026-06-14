"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <footer ref={ref} className="bg-[#3D3227] text-white/80 pt-28 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20"
        >
          <div>
            <p
              className="text-xl font-serif text-white mb-4"
              style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}
            >
              aetherhouz
            </p>
            <p className="text-white/30 text-xs leading-relaxed max-w-[180px]">
              A global curation of interior design inspiration, AI-guided creation, and curated elements.
            </p>
          </div>
          {[
            {
              title: "Inspiration",
              links: ["Countries", "Designers", "Hotels", "All Styles"],
            },
            {
              title: "Elements",
              links: ["Living Room", "Bedroom", "Kitchen", "Bathroom"],
            },
            {
              title: "About",
              links: ["Our Story", "Curators", "Contact", "Journal"],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-[10px] text-white/25 tracking-[0.2em] uppercase mb-5">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/35 hover:text-white/70 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/8"
        >
          <p className="text-[10px] text-white/18 tracking-wider">
            © 2026 AETHERHOUZ. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            {["TERMS", "PRIVACY", "ACCESSIBILITY"].map((t) => (
              <a
                key={t}
                href="#"
                className="text-[10px] text-white/18 hover:text-white/45 tracking-wider transition-colors duration-300"
              >
                {t}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
