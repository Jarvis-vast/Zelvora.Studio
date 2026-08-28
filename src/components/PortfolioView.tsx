import React, { useState } from "react";
import { Zap, Layers } from "lucide-react";
import { PortfolioItem } from "../types";

interface PortfolioViewProps {
  portfolio: PortfolioItem[];
}

export default function PortfolioView({ portfolio }: PortfolioViewProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = ["all", "Consulting / Coaching", "Real Estate", "Technology", "Design / Architecture"];

  const filteredItems = activeFilter === "all"
    ? portfolio
    : portfolio.filter(item => item.category.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter.toLowerCase().includes(item.category.toLowerCase()));

  return (
    <div className="pt-32 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20 grid-paper">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3 py-1.5 rounded-full">
            Case Studies
          </span>
          <h1 className="font-serif font-semibold text-4xl sm:text-6xl text-brand-charcoal tracking-tight mt-6 mb-6 leading-tight">
            The Organic Authority Record
          </h1>
          <p className="text-brand-stone/75 text-base sm:text-lg leading-relaxed">
            Real clients. Verifiable metrics. Absolute visibility authority established on complete autopilot. Discover how we turn quiet specialists into recognized category leaders.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4.5 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all cursor-pointer ${
                activeFilter === cat
                  ? "bg-brand-coral text-white shadow-md border border-brand-coral/30"
                  : "bg-white border border-brand-charcoal/10 text-brand-stone hover:text-brand-charcoal hover:bg-brand-cream/60"
              }`}
            >
              {cat === "all" ? "All Records" : cat}
            </button>
          ))}
        </div>

        {/* Portfolio Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="editorial-card bg-white rounded-2xl overflow-hidden border border-brand-charcoal/5 flex flex-col hover:border-brand-coral/25 hover:shadow-lg transition-all duration-300 group">
              {/* Image box */}
              <div className="aspect-[16/9] w-full relative overflow-hidden bg-brand-cream/35">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute top-4 left-4 bg-brand-charcoal text-white text-[10px] font-sans font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                  {item.category}
                </div>
              </div>

              {/* Text box */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-brand-stone/50 uppercase block mb-1 font-bold">Partner client: {item.client}</span>
                  <h3 className="font-serif font-semibold text-2xl text-brand-charcoal tracking-tight mb-4 group-hover:text-brand-coral transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-stone/70 leading-relaxed mb-6 font-sans font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-brand-charcoal/5 flex flex-col gap-2">
                  <span className="text-[10px] font-sans text-brand-stone/50 uppercase tracking-wider font-extrabold">Audited Performance Impact</span>
                  <div className="text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg w-fit flex items-center gap-1.5 shadow-xs">
                    <Zap size={14} className="animate-pulse shrink-0 text-emerald-600" />
                    <span>{item.metrics}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center py-20 text-brand-stone/50 flex flex-col items-center justify-center">
              <Layers size={40} className="text-brand-stone/30 mb-4" />
              <p className="font-sans font-bold text-base text-brand-charcoal">No case studies found in this category.</p>
              <p className="font-sans text-xs mt-1">Check back later or explore another filter selection.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
