/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { GALLERY } from "../data";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = ["All", "Bedrooms", "Gardens", "Recreation Areas", "Therapy Sessions", "Dining Areas", "Family Visits", "Medical Care", "Daily Activities"];

  const filteredItems = activeFilter === "All"
    ? GALLERY
    : GALLERY.filter(item => item.category === activeFilter);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-cream-warm dark:bg-navy-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-bold">
            Virtual Walkthrough
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 dark:text-white">
            Explore the Sanctuary of Amazing Grace
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Take an interactive visual tour of our senior-safe bedrooms, medical surveillance desks, lush relaxation lawns, and active physical rehab rooms.
          </p>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Gallery category tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => {
                setActiveFilter(f);
                setLightboxIndex(null);
              }}
              className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeFilter === f
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-850"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="relative break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer group bg-slate-100 dark:bg-navy-900 border border-slate-100/40 dark:border-navy-800/40"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-103"
                loading="lazy"
              />
              
              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                <span className="text-[10px] font-mono text-gold-400 font-bold uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-white text-sm font-display font-bold flex items-center justify-between mt-1">
                  {item.title}
                  <Maximize2 className="w-4 h-4 text-slate-300 shrink-0 ml-2" />
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Overlay */}
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div
            className="fixed inset-0 z-50 bg-navy-950/95 flex flex-col items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close trigger */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Carousel viewport */}
            <div className="relative max-w-5xl w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              
              {/* Prev item trigger */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Image content */}
              <div className="space-y-4 text-center">
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/5"
                />
                
                {/* Image metadata caption */}
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase text-gold-400 font-bold">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <h3 className="text-white font-display font-semibold text-base sm:text-lg">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Image {lightboxIndex + 1} of {filteredItems.length}
                  </p>
                </div>
              </div>

              {/* Next item trigger */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
