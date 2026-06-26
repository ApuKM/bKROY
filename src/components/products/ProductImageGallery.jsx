"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ProductImageGallery({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback if no images are provided
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] bg-[#18181b] rounded-2xl border border-zinc-800 flex items-center justify-center text-zinc-500">
        No image available
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="relative w-full aspect-[4/3] md:aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 group">
        <Image
          src={images[currentIndex]}
          alt={`Product image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover"
          priority
        />
        
        {/* Navigation Arrows (Only show if multiple images exist) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#0A7C6E] text-white p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all border border-zinc-700 hover:border-[#0A7C6E]"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#0A7C6E] text-white p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all border border-zinc-700 hover:border-[#0A7C6E]"
            >
              <FiChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                currentIndex === idx
                  ? "border-[#0A7C6E] opacity-100"
                  : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}