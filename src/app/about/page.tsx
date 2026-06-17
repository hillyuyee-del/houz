"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-6 md:px-10 lg:px-14 max-w-[1200px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <p className="text-xs tracking-[0.2em] uppercase text-[#8FA88A] mb-4">About</p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#3D3227] mb-6" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>Our Story</h1>
          <p className="text-[#A0988E] text-lg max-w-[640px] leading-relaxed">
            AetherHouz is a curated interior design platform for those who believe spaces shape lives. We collect the world&apos;s most beautiful interiors — from Tokyo penthouses to Tuscan villas — and make them discoverable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { title: "Curate", desc: "Our team of design editors hand-picks every image, ensuring only the most inspiring interiors make it onto the platform." },
            { title: "Connect", desc: "We link you to the world's best designers, hotels, and brands — making great design accessible to everyone." },
            { title: "Create", desc: "Our AI Studio helps you reimagine your own spaces, guided by the principles found in the world's finest interiors." },
          ].map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="p-6">
                <div className="w-10 h-10 rounded-full bg-[#E2EBDF] flex items-center justify-center mb-4 text-[#8FA88A] font-serif text-lg" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>{i + 1}</div>
                <h3 className="text-lg font-serif text-[#3D3227] mb-2" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>{v.title}</h3>
                <p className="text-sm text-[#A0988E] leading-relaxed">{v.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-serif text-[#3D3227] mb-8" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>Curatorial Principles</h2>
          <div className="space-y-4">
            {[
              "Every image is sourced from verified photographers, hotels, and design studios.",
              "We prioritize authenticity — real spaces, real materials, real light.",
              "Our style taxonomy is built with designers, not algorithms.",
              "No AI-generated imagery is presented as real interior photography.",
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-3 text-[#7A7065]">
                <span className="text-[#8FA88A] mt-1">◆</span>
                <span className="text-sm leading-relaxed">{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif text-[#3D3227] mb-8" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>Contact</h2>
          <p className="text-[#7A7065] text-sm leading-relaxed mb-4">
            For collaborations, image submissions, or general inquiries:
          </p>
          <a href="mailto:hillyuyee@gmail.com" className="text-[#8FA88A] hover:text-[#6B8B65] transition-colors text-sm">hillyuyee@gmail.com</a>
        </div>
      </main>
      <Footer />
    </>
  );
}
