import React from "react";
import { ArrowRight, Shield, Globe, Award, Sparkles, CheckCircle2 } from "lucide-react";

interface AboutViewProps {
  setActivePage: (page: string) => void;
}

export default function AboutView({ setActivePage }: AboutViewProps) {
  const coreValues = [
    {
      title: "Human Editorial Craftsmanship",
      desc: "Zelvora is our parent AI technology firm, but Zelvora Studio is an editorial-first operation. We believe partner-level authority demands human nuance, refined typography, and thoughtful narrative pacing—never raw automated AI output.",
      icon: <Award size={20} className="text-brand-coral" />
    },
    {
      title: "Partner-Level Discretion",
      desc: "Our clients are managing partners, advisory founders, and senior directors handling confidential enterprise mandates. We sign strict non-disclosure agreements and protect your intellectual property as if it were our own.",
      icon: <Shield size={20} className="text-brand-coral" />
    },
    {
      title: "Advisory-Focused Commercial Rigor",
      desc: "We don't optimize for vanity likes or teen entertainment algorithms. Every post, carousel, and newsletter brief is calibrated to build commercial trust with enterprise buyers, boards, and corporate decision-makers.",
      icon: <Globe size={20} className="text-brand-coral" />
    }
  ];

  return (
    <div className="pt-28 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold text-brand-coral uppercase tracking-wider bg-brand-coral/5 border border-brand-coral/10 px-3 py-1 rounded-full">
            Our Studio Mission
          </span>
          <h1 className="font-serif font-semibold text-3xl sm:text-5xl text-brand-charcoal tracking-tight mt-4 mb-4 leading-tight">
            The Executive Editorial Desk for Boutique Advisory
          </h1>
          <p className="text-brand-stone/75 text-sm sm:text-base leading-relaxed">
            We are not a traditional marketing agency. We are an outsourced executive content and brand-visibility operation built to make genuine expertise undeniable.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-mono font-bold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-2.5 py-1 rounded-full">
              Why We Exist
            </span>
            <h2 className="font-serif font-semibold text-2xl sm:text-4xl text-brand-charcoal tracking-tight leading-tight">
              Reclaiming partner time while expanding digital authority.
            </h2>
            <p className="text-xs sm:text-sm text-brand-stone/80 leading-relaxed font-sans">
              Boutique consulting and advisory leaders possess immense intellectual depth. They have guided enterprise restructurings, solved thorny organizational bottlenecks, and engineered corporate turnarounds.
            </p>
            <p className="text-xs sm:text-sm text-brand-stone/80 leading-relaxed font-sans">
              Yet when prospective enterprise buyers search their names online, their profiles are quiet. Founders lack the 15 hours each week required to write commentary, design slides, and manage publishing cadences.
            </p>
            <p className="text-xs sm:text-sm text-brand-stone/80 leading-relaxed font-sans font-medium">
              Zelvora Studio solves this bottleneck through a disciplined editorial operating system: one 45-minute monthly debrief translates into a full month of publication-ready, partner-grade authority assets.
            </p>
          </div>

          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-brand-charcoal/10 bg-white p-3 shadow-md">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-brand-charcoal/5 relative">
              <img
                src="https://images.unsplash.com/photo-1552581234-2612b75d8953?auto=format&fit=crop&q=80&w=800"
                alt="Editorial Strategy Meeting"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-brand-charcoal/90 backdrop-blur-md p-3 rounded-lg text-white text-xs font-mono border border-white/10 flex justify-between items-center">
                <span>The Executive Editorial Standard</span>
                <span className="text-brand-coral font-bold">100% Confidential</span>
              </div>
            </div>
          </div>
        </div>

        {/* Values Block */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3 py-1 rounded-full">
              Editorial Standards
            </span>
            <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-brand-charcoal mt-3 tracking-tight">
              Our Operating Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((v, i) => (
              <div key={i} className="editorial-card bg-white rounded-2xl p-7 border border-brand-charcoal/8 space-y-4 shadow-xs">
                <div className="p-3 bg-brand-coral/5 border border-brand-coral/10 text-brand-coral rounded-xl w-fit">
                  {v.icon}
                </div>
                <h3 className="font-serif font-semibold text-lg text-brand-charcoal">{v.title}</h3>
                <p className="text-xs text-brand-stone/75 leading-relaxed font-sans">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="editorial-card bg-white border border-brand-charcoal/8 p-8 md:p-12 text-center max-w-3xl mx-auto rounded-2xl shadow-xs">
          <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-brand-charcoal mb-3">
            Start with an objective assessment of your executive footprint
          </h2>
          <p className="text-xs sm:text-sm text-brand-stone/75 leading-relaxed font-sans max-w-xl mx-auto mb-6">
            We operate with capped partner capacity to maintain high-caliber editorial and visual output. Request a Private Visibility Audit to evaluate fit.
          </p>
          <button 
            onClick={() => setActivePage("contact")} 
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-coral hover:bg-brand-coral/95 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md shadow-brand-coral/10 transition-all cursor-pointer"
          >
            <span>Request a Private Visibility Audit</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </div>
  );
}
