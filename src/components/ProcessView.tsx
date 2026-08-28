import React from "react";
import { ArrowRight, RefreshCw, Zap, Settings, Shield } from "lucide-react";

interface ProcessViewProps {
  setActivePage: (page: string) => void;
}

export default function ProcessView({ setActivePage }: ProcessViewProps) {
  const steps = [
    {
      num: "01",
      title: "Strategy Alignment Sync",
      time: "Day 1-5",
      desc: "We initiate a high-level 45-minute onboarding call to map your exact framework methodologies, corporate goals, tone parameters, and primary buyer avatars. We don't guess your brand voice — we extract it systematically.",
      icon: <Settings size={22} className="text-brand-coral" />
    },
    {
      num: "02",
      title: "Bespoke Assets Production",
      time: "Day 5-12",
      desc: "Our elite production team moves into motion. Writers draft tailored thought essays, designers build sophisticated visual slide decks, and copywriters structure conversion-optimized posts. Every asset is handcrafted.",
      icon: <Zap size={22} className="text-brand-coral" />
    },
    {
      num: "03",
      title: "The 1-Click Client Approval",
      time: "Day 12-14",
      desc: "Your custom content catalog is populated into your private, mobile-optimized approval portal. Review all visual designs, make inline notes, and approve in a single tap from your phone. Zero administrative time drain.",
      icon: <RefreshCw size={22} className="text-brand-coral" />
    },
    {
      num: "04",
      title: "Omnichannel Dominance",
      time: "Ongoing",
      desc: "We schedule, optimize, and automatically publish across your designated platforms. We actively monitor comments, filter inbound opportunities, and send detailed growth impact audits every 30 days.",
      icon: <Shield size={22} className="text-brand-coral" />
    }
  ];

  return (
    <div className="pt-32 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20 grid-paper">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3 py-1.5 rounded-full">
            Our Workflow
          </span>
          <h1 className="font-serif font-semibold text-4xl sm:text-6xl text-brand-charcoal tracking-tight mt-6 mb-6 leading-tight">
            The autopilot content pipeline
          </h1>
          <p className="text-brand-stone/75 text-base sm:text-lg leading-relaxed">
            Consistency is not about writing every morning — it is about building a robust, delegated operational engine that runs flawlessly behind the scenes.
          </p>
        </div>

        {/* Chronological Steps */}
        <div className="space-y-8 mb-24 max-w-5xl mx-auto">
          {steps.map((st, i) => (
            <div key={i} className="editorial-card bg-white p-8 border border-brand-charcoal/5 relative overflow-hidden flex flex-col md:flex-row gap-8 items-start hover:border-brand-coral/25 transition-all duration-300 shadow-xs">
              <div className="text-5xl font-serif font-bold text-brand-coral/10 shrink-0 select-none">
                {st.num}
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif font-semibold text-2xl text-brand-charcoal tracking-tight">
                    {st.title}
                  </h3>
                  <span className="px-3.5 py-1 rounded-full text-xs font-sans font-bold bg-brand-coral/5 text-brand-coral border border-brand-coral/10">
                    {st.time}
                  </span>
                </div>
                
                <p className="text-sm text-brand-stone/70 leading-relaxed font-sans pt-2">
                  {st.desc}
                </p>
              </div>

              <div className="p-3 bg-brand-coral/5 border border-brand-coral/10 text-brand-coral rounded-xl shrink-0 hidden md:block">
                {st.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className="editorial-card bg-white border border-brand-charcoal/5 p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden shadow-md">
          <h2 className="font-serif font-semibold text-3xl text-brand-charcoal mb-4 tracking-tight leading-tight">Ready to reclaim your weekends?</h2>
          <p className="text-sm text-brand-stone/75 leading-relaxed font-normal max-w-2xl mx-auto mb-8">
            Take 2 minutes to submit your details. Our strategy team will research your firm and draft a bespoke content sample for your review, entirely complimentary.
          </p>
          <button 
            onClick={() => setActivePage("contact")} 
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-coral hover:bg-brand-coral/95 text-white text-xs font-bold rounded-full tracking-wide shadow-md shadow-brand-coral/10 transition-all hover:scale-[1.02] cursor-pointer"
          >
            Book Your Complimentary Strategy Audit
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
