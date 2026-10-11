import React from "react";
import { Layers, RefreshCw, FileText, Check, Sparkles, TrendingUp, Zap, ArrowRight, ShieldCheck } from "lucide-react";

interface ServicesViewProps {
  setActivePage: (page: string) => void;
}

export default function ServicesView({ setActivePage }: ServicesViewProps) {
  const capabilities = [
    {
      title: "Strategic Voice & IP Extraction",
      desc: "In one structured 45-minute monthly session, we extract your casework lessons, contrarian industry viewpoints, and proprietary advisory frameworks without consuming your billable hours.",
      icon: <Layers size={20} className="text-brand-coral" />,
      features: [
        "Structured monthly partner interview",
        "Proprietary framework translation",
        "Executive tone calibration",
        "Topic taxonomy & cadence modeling"
      ]
    },
    {
      title: "Executive Ghostwriting",
      desc: "Senior human editors craft narrative-driven LinkedIn posts and industry commentary that command respect from board members, CEOs, and private equity operators.",
      icon: <FileText size={20} className="text-brand-coral" />,
      features: [
        "Human-crafted executive commentary",
        "Contrarian point-of-view essays",
        "Zero generic prompt templates",
        "Peer-reviewed editorial standards"
      ]
    },
    {
      title: "Typographic Visual Carousels",
      desc: "Stop using boring text walls. Our designers build high-contrast, typographic carousel slides and framework diagrams optimized for executive engagement.",
      icon: <Sparkles size={20} className="text-brand-coral" />,
      features: [
        "Bespoke typography-first slide layouts",
        "Framework diagram visualization",
        "High-contrast editorial palettes",
        "Formatted 1080x1350 document slides"
      ]
    },
    {
      title: "Executive Newsletters & Dispatches",
      desc: "Ghostwritten bi-weekly or monthly long-form briefs (Substack, Beehiiv, or LinkedIn Newsletters) to nurture warm referral networks and shorten inbound sales cycles.",
      icon: <Zap size={20} className="text-brand-coral" />,
      features: [
        "Deep research-backed executive briefs",
        "Advisory framework case dissections",
        "Newsletter layout and distribution",
        "Warm network authority maintenance"
      ]
    },
    {
      title: "Rapid Mobile Review & Approval",
      desc: "Zero SaaS friction. We send your upcoming bi-weekly draft batch via a private mobile preview link or direct WhatsApp/Slack channel. Review full posts and carousels on your phone in under 5 minutes. Tap approve or dictate quick voice notes.",
      icon: <RefreshCw size={20} className="text-brand-coral" />,
      features: [
        "Private mobile preview link or WhatsApp/Slack",
        "Zero dashboard or login overhead",
        "Voice-memo or inline revision notes",
        "48-hour turnarounds on agreed edits"
      ]
    },
    {
      title: "Organic Authority Audits",
      desc: "We analyze executive profile reach, audience resonance, and inbound partner inquiries every 30 days, continually refining the content matrix based on real engagement data.",
      icon: <TrendingUp size={20} className="text-brand-coral" />,
      features: [
        "Inbound inquiry attribution review",
        "Content resonance analytics",
        "Competitive peer gap analysis",
        "Quarterly narrative repositioning"
      ]
    }
  ];

  return (
    <div className="pt-28 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold text-brand-coral uppercase tracking-wider bg-brand-coral/5 border border-brand-coral/10 px-3 py-1 rounded-full">
            Specialist Editorial Capabilities
          </span>
          <h1 className="font-serif font-semibold text-3xl sm:text-5xl text-brand-charcoal tracking-tight mt-4 mb-4 leading-tight">
            Outsourced Executive Visibility
          </h1>
          <p className="text-brand-stone/75 text-sm sm:text-base leading-relaxed">
            We don't sell generic marketing retainers or automated software tools. We run a dedicated executive editorial department that turns partner expertise into undeniable market authority.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {capabilities.map((cap, i) => (
            <div key={i} className="editorial-card bg-white p-8 border border-brand-charcoal/8 rounded-2xl flex flex-col justify-between hover:border-brand-coral/25 transition-all shadow-xs">
              <div>
                <div className="p-3 bg-brand-coral/5 border border-brand-coral/10 text-brand-coral rounded-xl w-fit mb-5">
                  {cap.icon}
                </div>
                <h3 className="font-serif font-semibold text-xl text-brand-charcoal tracking-tight mb-3">
                  {cap.title}
                </h3>
                <p className="text-xs text-brand-stone/75 leading-relaxed font-sans mb-6">
                  {cap.desc}
                </p>
              </div>

              <div className="border-t border-brand-charcoal/5 pt-4 space-y-2">
                {cap.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-brand-stone/80 font-medium">
                    <Check size={12} className="text-brand-coral shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Operating Architecture Banner */}
        <div className="editorial-card bg-white border border-brand-charcoal/8 p-8 md:p-12 rounded-2xl relative overflow-hidden mb-16 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono font-bold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3 py-1 rounded-full">
                Zero Operational Drag
              </span>
              <h2 className="font-serif font-semibold text-2xl sm:text-4xl text-brand-charcoal tracking-tight">
                Your practice stays focused on clients. We keep you top-of-mind.
              </h2>
              <p className="text-xs sm:text-sm text-brand-stone/75 leading-relaxed font-sans">
                Founders and managing partners should never spend weekends wrestling with social post schedulers, visual canvas editors, or copywriting drafts.
              </p>
              <p className="text-xs sm:text-sm text-brand-stone/75 leading-relaxed font-sans">
                With Zelvora Studio, 60 minutes a month of client commitment yields a continuous stream of publication-ready, partner-caliber authority assets.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => setActivePage("contact")} 
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-coral text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-coral/95 transition-all shadow-md shadow-brand-coral/10 cursor-pointer"
                >
                  <span>Request a Private Visibility Audit</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-xl bg-brand-cream/60 border border-brand-charcoal/8 p-6 space-y-3 font-sans text-xs">
              <div className="font-mono text-[11px] font-bold text-brand-stone/50 uppercase tracking-wider mb-2">
                Monthly Executive Cadence Summary
              </div>
              <div className="flex items-start gap-3 py-2 border-b border-brand-charcoal/5">
                <span className="font-mono text-brand-coral font-bold shrink-0">Wk 1</span>
                <span><strong>45-Min Extraction Sync:</strong> Partner debrief extracting 4 distinct strategic themes and proprietary frameworks.</span>
              </div>
              <div className="flex items-start gap-3 py-2 border-b border-brand-charcoal/5">
                <span className="font-mono text-brand-coral font-bold shrink-0">Wk 2</span>
                <span><strong>Batch 1 Delivery:</strong> 7 to 10 executive posts and carousel decks populated into private mobile review portal.</span>
              </div>
              <div className="flex items-start gap-3 py-2 border-b border-brand-charcoal/5">
                <span className="font-mono text-brand-coral font-bold shrink-0">Wk 3</span>
                <span><strong>Batch 2 Delivery:</strong> Mid-month commentary posts and long-form thought leadership essay ready for approval.</span>
              </div>
              <div className="flex items-start gap-3 py-2">
                <span className="font-mono text-brand-coral font-bold shrink-0">Wk 4</span>
                <span><strong>Authority Audit:</strong> Monthly resonance review, peer benchmarking adjustments, and next month's narrative outline.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
