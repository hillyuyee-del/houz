"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Sparkles, ImageIcon } from "lucide-react";

const roomTypes = [
  "Living Room", "Bedroom", "Kitchen", "Bathroom",
  "Home Office", "Dining Room", "Entryway", "Balcony",
];

const formFields = [
  { key: "area", label: "Area (sqm)", placeholder: "e.g. 85 sqm apartment", type: "text" },
  { key: "layout", label: "Layout", placeholder: "e.g. open-plan, L-shaped", type: "text" },
  { key: "style", label: "Preferred Style", placeholder: "e.g. Japandi, Mediterranean, Scandinavian...", type: "text" },
  { key: "budget", label: "Budget (USD)", placeholder: "e.g. $15,000 – $40,000", type: "text" },
  { key: "requirements", label: "Special Requirements", placeholder: "e.g. child-friendly, pet-friendly, home office...", type: "text" },
];

export function ChatSection() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [roomType, setRoomType] = useState("Living Room");
  const [response, setResponse] = useState<{ advice: string; images: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, roomType }),
      });
      const data = await res.json();
      setResponse({ advice: data.advice, images: data.images || [] });
    } catch {
      setResponse({
        advice: "Could not connect to design service. Please try again.",
        images: [],
      });
    }
    setLoading(false);
  };

  return (
    <section id="chat" ref={ref} className="py-24 md:py-36 bg-[#EDE8E0]/50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="label mb-4 text-[#8FA88A]">Session 02</p>
            <h2
              className="heading-lg text-[#3D3227]"
              style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}
            >
              Design Chat
            </h2>
          </div>
          <p className="body-lg text-[#A0988E] max-w-[340px]">
            Tell us about your space, pick a room, and get AI-powered design
            recommendations with curated imagery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">
          {/* Left: Form */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Room Type Selector */}
            <div>
              <label className="block text-xs text-[#8FA88A] tracking-widest uppercase mb-2">
                Room Type (Generate Images For)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {roomTypes.map((room) => (
                  <button
                    key={room}
                    type="button"
                    onClick={() => setRoomType(room)}
                    className={`text-xs py-2.5 px-2 rounded-lg border transition-all duration-300 ${
                      roomType === room
                        ? "bg-white border-[#8FA88A] text-[#5C4A3A] shadow-sm"
                        : "border-[#D4C4AE]/30 text-[#A0988E] hover:border-[#8FA88A]/50"
                    }`}
                  >
                    {room}
                  </button>
                ))}
              </div>
            </div>

            {formFields.map((field) => (
              <div key={field.key}>
                <label className="block text-xs text-[#8FA88A] tracking-widest uppercase mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={form[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full bg-white border border-[#D4C4AE]/40 px-5 py-3.5 rounded-xl text-sm text-[#3D3227] placeholder:text-[#A0988E]/60 focus:outline-none focus:border-[#8FA88A] transition-colors duration-300"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-[#5C4A3A] text-[#F7F4EF] px-7 py-3.5 rounded-full text-sm tracking-wide hover:bg-[#8B7355] transition-all duration-500 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate Design + Images
                </>
              )}
            </button>
          </motion.form>

          {/* Right: Response */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#D4C4AE]/20 min-h-[500px] flex flex-col"
          >
            {response ? (
              <div className="flex-1 overflow-y-auto space-y-5">
                {/* AI advice */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E2EBDF] flex items-center justify-center flex-shrink-0">
                    <Sparkles size={14} className="text-[#8FA88A]" />
                  </div>
                  <div className="text-sm text-[#3D3227] leading-relaxed whitespace-pre-line">
                    {response.advice.split("\n").map((line, i) => {
                      if (line.startsWith("**") && line.includes("**")) {
                        return (
                          <p key={i} className="font-semibold text-[#5C4A3A] pt-2 pb-1">
                            {line.replace(/\*\*/g, "")}
                          </p>
                        );
                      }
                      if (line.startsWith("•")) {
                        return <p key={i} className="pl-3 text-[#7A7065]">{line}</p>;
                      }
                      return <p key={i} className="text-[#7A7065]">{line}</p>;
                    })}
                  </div>
                </div>

                {/* Generated/Curated Images */}
                {response.images.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <ImageIcon size={14} className="text-[#8FA88A]" />
                      <p className="text-xs text-[#8FA88A] tracking-wider">
                        {roomType} Inspiration
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {response.images.map((img, i) => (
                        <div key={i} className="aspect-[4/3] bg-[#EDE8E0] rounded-lg overflow-hidden">
                          <img
                            src={img}
                            alt={`${roomType} design ${i + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center">
                <div>
                  <div className="w-16 h-16 rounded-full bg-[#E2EBDF] flex items-center justify-center mx-auto mb-5">
                    <Send size={22} className="text-[#8FA88A]" />
                  </div>
                  <p className="text-sm text-[#A0988E] max-w-[260px] leading-relaxed">
                    Pick a room type, fill in the details, and get AI-powered
                    design advice with curated inspiration images.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
