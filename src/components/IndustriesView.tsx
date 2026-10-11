import React from "react";
import { Briefcase, ArrowRight, Shield, TrendingUp, Award } from "lucide-react";

interface IndustriesViewProps {
  setActivePage: (page: string) => void;
}

export default function IndustriesView({ setActivePage }: IndustriesViewProps) {
  const industries = [
    {
      title: "Boutique Strategy & Management Consulting",
      problem: "Your advisory frameworks produce transformative client outcomes, but your public profiles look quiet or generic.",
      solution: "We translate your proprietary diagnostic tools and client engagement takeaways into multi-slide typographic carousels that pre-sell enterprise buyers on your approach.",
      icon: <Briefcase size={20} className="text-brand-coral" />,
      tag: "Strategy Consulting"
    },
    {
      title: "Executive Leadership & Board Advisory",
      problem: "You advise C-suite leaders and board members, but lack time to author consistent viewpoints on leadership governance.",
      solution: "We ghostwrite thoughtful, high-gravitas commentary examining leadership dilemmas, succession dynamics, and culture transformation that validate your fee caliber.",
      icon: <Award size={20} className="text-brand-coral" />,
      tag: "Executive Advisory"
    },
    {
      title: "M&A, Restructuring & Corporate Finance",
      problem: "Deal flow is confidential and episodic; silence between major transactions allows competitor banks and advisory firms to dominate deal attention.",
      solution: "We author bi-weekly market transaction commentary and macroeconomic analyses that keep your firm top-of-mind with corporate development teams and PE partners.",
      icon: <TrendingUp size={20} className="text-brand-coral" />,
      tag: "Transaction Advisory"
    },
    {
      title: "Specialized Professional Practices",
      problem: "Law firms, wealth managers, and risk advisors need visibility without violating professional compliance or appearing like aggressive marketers.",
      solution: "We develop education-first regulatory commentary and governance analyses that build institutional trust while strictly honoring professional conduct standards.",
      icon: <Shield size={20} className="text-brand-coral" />,
      tag: "Legal & Governance"
    }
  ];

  return (
    <div className="pt-28 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold text-brand-coral uppercase tracking-wider bg-brand-coral/5 border border-brand-coral/10 px-3 py-1 rounded-full">
            Target ICP & Practice Areas
          </span>
          <h1 className="font-serif font-semibold text-3xl sm:text-5xl text-brand-charcoal tracking-tight mt-4 mb-4 leading-tight">
            Built for Boutique Advisory Leaders
          </h1>
          <p className="text-brand-stone/75 text-sm sm:text-base leading-relaxed">
            We partner exclusively with founder-led advisory firms and specialist consultancies selling high-value expertise ($25,000 to $250,000+ engagements).
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {industries.map((ind, i) => (
            <div key={i} className="editorial-card bg-white rounded-2xl p-7 md:p-9 border border-brand-charcoal/8 flex flex-col justify-between hover:border-brand-coral/25 transition-all relative shadow-xs">
              <div className="absolute top-6 right-6 text-[10px] font-mono font-bold uppercase tracking-wider text-brand-stone/60 bg-brand-cream border border-brand-charcoal/8 px-2.5 py-1 rounded-full">
                {ind.tag}
              </div>
              
              <div>
                <div className="p-3 bg-brand-coral/5 border border-brand-coral/10 text-brand-coral rounded-xl w-fit mb-5">
                  {ind.icon}
                </div>
                
                <h3 className="font-serif font-semibold text-xl sm:text-2xl text-brand-charcoal tracking-tight mb-4">
                  {ind.title}
                </h3>

                <div className="space-y-3 font-sans text-xs mb-8">
                  <div className="p-3 rounded-lg bg-red-50/50 border border-red-100/50">
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-red-700 font-bold mb-1">The Friction</span>
                    <p className="text-brand-stone/75 leading-relaxed">{ind.problem}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-brand-cream/60 border border-brand-charcoal/5">
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-brand-coral font-bold mb-1">Our Editorial Strategy</span>
                    <p className="text-brand-stone/80 leading-relaxed font-medium">{ind.solution}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setActivePage("contact")} 
                className="flex items-center justify-between px-4 py-3 rounded-full bg-brand-charcoal/5 hover:bg-brand-coral hover:text-white text-xs font-bold uppercase tracking-wider border border-brand-charcoal/8 transition-all cursor-pointer group"
              >
                <span>Request Practice Visibility Audit</span>
                <ArrowRight size={13} className="text-brand-coral group-hover:text-white transition-colors" />
              </button>
            </div>
          ))}
        </div>

        {/* Trust Statement */}
        <div className="editorial-card bg-white border border-brand-charcoal/8 p-8 md:p-12 text-center max-w-3xl mx-auto rounded-2xl shadow-xs">
          <h2 className="font-serif font-semibold text-2xl text-brand-charcoal mb-3">
            Is your firm a fit for our editorial desk?
          </h2>
          <p className="text-xs sm:text-sm text-brand-stone/75 leading-relaxed font-sans max-w-xl mx-auto mb-6">
            If your partners have genuine advisory depth but zero spare hours to maintain public consistency, Zelvora Studio is built specifically for you.
          </p>
          <button 
            onClick={() => setActivePage("contact")} 
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-coral hover:bg-brand-coral/95 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md shadow-brand-coral/15 transition-all cursor-pointer"
          >
            <span>Request a Private Visibility Audit</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </div>
  );
}
