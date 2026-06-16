"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  title?: string;
}

export function Lightbox({ images, currentIndex, onClose, onPrev, onNext, title }: LightboxProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  if (!images[currentIndex]) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 text-white/60 hover:text-white transition-colors">
          <X size={28} />
        </button>

        {/* Counter */}
        <div className="absolute top-6 left-6 z-10 text-white/50 text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Save */}
        <button onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-10 p-2 text-white/60 hover:text-white transition-colors">
          <Heart size={24} className={saved ? "fill-red-400 text-red-400" : ""} />
        </button>

        {/* Title */}
        {title && <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40 text-sm">{title}</div>}

        {/* Previous */}
        <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/50 hover:text-white transition-colors">
          <ChevronLeft size={40} />
        </button>

        {/* Image */}
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src={images[currentIndex]}
          alt={title || ""}
          className="max-w-[90vw] max-h-[85vh] object-contain select-none"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Next */}
        <button onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/50 hover:text-white transition-colors">
          <ChevronRight size={40} />
        </button>

        {/* Thumbnail strip */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[80vw] px-4">
          {images.slice(0, 15).map((img, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); if (i !== currentIndex) { onPrev(); } }}
              className={`flex-shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all ${i === currentIndex ? "border-white opacity-100" : "border-transparent opacity-40 hover:opacity-70"}`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
