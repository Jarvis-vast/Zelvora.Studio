import React from "react";
import { ArrowRight, RefreshCw, Zap, Settings, Shield, Clock } from "lucide-react";

interface ProcessViewProps {
  setActivePage: (page: string) => void;
}

export default function ProcessView({ setActivePage }: ProcessViewProps) {
  const steps = [
    {
      num: "01",
      title: "Strategic Extraction Call",
      time: "45 Minutes Monthly",
      desc: "We conduct a structured interview with the managing partner to extract real casework, contrarian market perspectives, and proprietary frameworks. You don't write a single sentence—our editorial desk records, structures, and synthesizes your exact insights.",
      icon: <Settings size={20} className="text-brand-coral" />
    },
    {
      num: "02",
      title: "Senior Editorial Production",
      time: "Days 2 to 10",
      desc: "Our senior ghostwriters and typographic designers draft your bi-weekly content batch: long-form commentary, multi-slide framework carousels, and executive essays. Every piece is refined to match partner-level tone and peer-reviewed for editorial credibility.",
      icon: <Zap size={20} className="text-brand-coral" />
    },
    {
      num: "03",
      title: "Rapid Mobile Review & Signoff",
      time: "< 10 Minutes a Week",
      desc: "Your upcoming posts and slide decks are delivered via a private mobile preview link or your dedicated WhatsApp/Slack channel. Review full typographic layouts, request tweaks via voice note, or approve the batch with a quick tap. Zero complicated project software.",
      icon: <RefreshCw size={20} className="text-brand-coral" />
    },
    {
      num: "04",
      title: "Agreed Publishing & Inbound Tracking",
      time: "Ongoing Cadence",
      desc: "Content is scheduled directly via your approved social scheduler or delivered formatted with graphics ready for 1-tap posting by you or your practice manager. Every 30 days, we review profile engagement and inbound inquiry attribution.",
      icon: <Shield size={20} className="text-brand-coral" />
    }
  ];

  return (
    <div className="pt-28 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold text-brand-coral uppercase tracking-wider bg-brand-coral/5 border border-brand-coral/10 px-3 py-1 rounded-full">
            Operating Methodology
          </span>
          <h1 className="font-serif font-semibold text-3xl sm:text-5xl text-brand-charcoal tracking-tight mt-4 mb-4 leading-tight">
            The Autopilot Editorial Workflow
          </h1>
          <p className="text-brand-stone/75 text-sm sm:text-base leading-relaxed">
            Consistent market presence is not about writing every morning—it is about deploying a disciplined editorial operating system that protects your billable hours.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-20 max-w-4xl mx-auto">
          {steps.map((st, i) => (
            <div key={i} className="editorial-card bg-white p-7 sm:p-9 border border-brand-charcoal/8 rounded-2xl relative overflow-hidden flex flex-col md:flex-row gap-6 items-start hover:border-brand-coral/25 transition-all shadow-xs">
              <div className="text-4xl font-serif font-bold text-brand-coral/20 shrink-0 select-none">
                {st.num}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif font-semibold text-xl text-brand-charcoal tracking-tight">
                    {st.title}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-brand-coral/5 text-brand-coral border border-brand-coral/10">
                    {st.time}
                  </span>
                </div>
                
                <p className="text-xs sm:text-sm text-brand-stone/75 leading-relaxed font-sans pt-1">
                  {st.desc}
                </p>
              </div>

              <div className="p-3 bg-brand-coral/5 border border-brand-coral/10 text-brand-coral rounded-xl shrink-0 hidden md:block">
                {st.icon}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="editorial-card bg-white border border-brand-charcoal/8 p-8 md:p-12 text-center max-w-3xl mx-auto rounded-2xl shadow-xs">
          <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-brand-charcoal mb-3">
            See the workflow applied to your practice
          </h2>
          <p className="text-xs sm:text-sm text-brand-stone/75 leading-relaxed font-sans max-w-xl mx-auto mb-6">
            Request a Private Visibility Audit. Within 48 hours, our editorial desk will deliver an objective assessment of your current executive presence and 2 custom post concepts.
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
