import React, { useState } from "react";
import { Layers, ArrowRight, ShieldCheck } from "lucide-react";
import { PortfolioItem } from "../types";

interface PortfolioViewProps {
  portfolio: PortfolioItem[];
  setActivePage?: (page: string) => void;
}

export default function PortfolioView({ portfolio, setActivePage }: PortfolioViewProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    "all",
    "Boutique Consulting / Advisory",
    "Executive Ghostwriting",
    "Executive Newsletter",
    "Visual Framework Design"
  ];

  const filteredItems = activeFilter === "all"
    ? portfolio
    : portfolio.filter(item => item.category.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter.toLowerCase().includes(item.category.toLowerCase()));

  const handleAuditRequest = () => {
    if (setActivePage) {
      setActivePage("contact");
    } else {
      window.location.pathname = "/contact";
    }
  };

  return (
    <div className="pt-28 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold text-brand-coral uppercase tracking-wider bg-brand-coral/5 border border-brand-coral/10 px-3 py-1 rounded-full">
            Editorial Deliverables & Taxonomy
          </span>
          <h1 className="font-serif font-semibold text-3xl sm:text-5xl text-brand-charcoal tracking-tight mt-4 mb-4 leading-tight">
            Illustrative Work Samples
          </h1>
          <p className="text-brand-stone/75 text-sm sm:text-base leading-relaxed">
            Tangible editorial assets produced for boutique consulting and advisory leaders. Client identities and proprietary casework are anonymized under confidentiality agreements.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-brand-stone/60">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Honest illustrative benchmarks &bull; No fabricated testimonial claims</span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === cat
                  ? "bg-brand-charcoal text-white shadow-xs font-bold"
                  : "bg-white border border-brand-charcoal/10 text-brand-stone hover:text-brand-charcoal hover:bg-brand-cream/60"
              }`}
            >
              {cat === "all" ? "All Deliverables" : cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {filteredItems.map((item) => (
            <div key={item.id} className="editorial-card bg-white rounded-2xl overflow-hidden border border-brand-charcoal/8 flex flex-col justify-between hover:border-brand-coral/30 hover:shadow-md transition-all group">
              <div>
                {/* Image box */}
                <div className="aspect-[16/9] w-full relative overflow-hidden bg-brand-charcoal/5 border-b border-brand-charcoal/8">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute top-4 left-4 bg-brand-charcoal text-white text-[10px] font-mono uppercase px-3 py-1 rounded-full shadow-md">
                    {item.category}
                  </div>
                </div>

                {/* Text box */}
                <div className="p-6 sm:p-8">
                  <span className="text-[11px] font-mono text-brand-stone/50 block mb-1 font-semibold">{item.client}</span>
                  <h3 className="font-serif font-semibold text-xl sm:text-2xl text-brand-charcoal tracking-tight mb-3 group-hover:text-brand-coral transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-stone/75 leading-relaxed mb-4 font-sans">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 border-t border-brand-charcoal/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <span className="text-brand-stone/60">{item.metrics}</span>
                <button
                  onClick={handleAuditRequest}
                  className="text-brand-coral font-bold uppercase tracking-wider flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Request Similar Audit</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center py-20 text-brand-stone/50 flex flex-col items-center justify-center">
              <Layers size={36} className="text-brand-stone/30 mb-3" />
              <p className="font-sans font-bold text-sm text-brand-charcoal">No deliverable samples under this category.</p>
              <p className="font-sans text-xs mt-1">Select "All Deliverables" to view our complete sample archive.</p>
            </div>
          )}
        </div>

        {/* Bottom CTA Card */}
        <div className="editorial-card bg-brand-cream/50 border border-brand-charcoal/8 p-8 md:p-12 text-center max-w-4xl mx-auto rounded-2xl">
          <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-brand-charcoal mb-3">
            Want to see how your firm's expertise looks in this format?
          </h2>
          <p className="text-xs sm:text-sm text-brand-stone/75 max-w-xl mx-auto mb-6 font-sans">
            Request a Private Visibility Audit. Our editorial desk will formulate 2 custom post concepts tailored to your practice area and target enterprise buyers within 48 hours.
          </p>
          <button
            onClick={handleAuditRequest}
            className="px-8 py-3.5 bg-brand-coral hover:bg-brand-coral/95 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md shadow-brand-coral/15 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Request a Private Visibility Audit</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </div>
  );
}
