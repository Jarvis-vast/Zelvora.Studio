import React from "react";
import { Briefcase, ArrowRight, Shield, TrendingUp, Award } from "lucide-react";

interface IndustriesViewProps {
  setActivePage: (page: string) => void;
}

export default function IndustriesView({ setActivePage }: IndustriesViewProps) {
  const industries = [
    {
      title: "Coaches & Consultants",
      problem: "Your advice is elite, but your social channels don't reflect your actual strategic depth.",
      solution: "We ghostwrite comprehensive thought-leadership frameworks, dissecting your proprietary IP into premium visual slides and educational essays that attract high-paying enterprise clients.",
      icon: <Briefcase size={22} className="text-brand-coral" />,
      tag: "Consulting / Advising"
    },
    {
      title: "Luxury Real Estate",
      problem: "Traditional listings feel cheap. You need an arresting visual presence that attracts HNW home buyers.",
      solution: "We replace standard property spam with elegant editorial grids. We create narrative-driven carousels on local micro-markets and architecture design, positioning you as a premium authority.",
      icon: <Award size={22} className="text-brand-coral" />,
      tag: "Real Estate Brokers"
    },
    {
      title: "Professional Services",
      problem: "Doctors, lawyers, and financial advisors must remain visible while maintaining strict regulatory compliance.",
      solution: "We build strict, education-first authority assets. Every single word of your strategy is vetted for absolute professional compliance, establishing public trust without compromising credentials.",
      icon: <Shield size={22} className="text-brand-coral" />,
      tag: "Medical / Legal / Wealth"
    },
    {
      title: "Architects & Designers",
      problem: "You design gorgeous spaces, but your social profiles look cluttered or disorganized.",
      solution: "We create a high-end minimalist design aesthetic across Instagram and LinkedIn, framing your case study sketches with elegant negative space and sophisticated visual narratives.",
      icon: <TrendingUp size={22} className="text-brand-coral" />,
      tag: "Design / Architecture"
    }
  ];

  return (
    <div className="pt-32 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20 grid-paper">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3 py-1.5 rounded-full">
            Target Industries
          </span>
          <h1 className="font-serif font-semibold text-4xl sm:text-6xl text-brand-charcoal tracking-tight mt-6 mb-6 leading-tight">
            Designed for Elite Leaders
          </h1>
          <p className="text-brand-stone/75 text-base sm:text-lg leading-relaxed">
            We do not cater to average businesses. We partner exclusively with high-caliber service providers, specialists, and builders who sell premium trust.
          </p>
        </div>

        {/* Bento/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {industries.map((ind, i) => (
            <div key={i} className="editorial-card bg-white rounded-2xl p-8 md:p-10 border border-brand-charcoal/5 flex flex-col justify-between hover:border-brand-coral/25 transition-all duration-300 relative group shadow-xs">
              <div className="absolute top-6 right-6 text-xs font-sans font-bold text-brand-stone/50 bg-brand-cream border border-brand-charcoal/10 px-3 py-1 rounded-full">
                {ind.tag}
              </div>
              
              <div>
                <div className="p-3 bg-brand-coral/5 border border-brand-coral/10 text-brand-coral rounded-xl w-fit mb-6">
                  {ind.icon}
                </div>
                
                <h3 className="font-serif font-semibold text-2xl text-brand-charcoal tracking-tight mb-4">
                  {ind.title}
                </h3>

                <div className="space-y-4 font-sans text-xs mb-8">
                  <div>
                    <span className="block text-[10px] uppercase font-sans tracking-wider text-red-700 font-extrabold mb-1">The Bottleneck</span>
                    <p className="text-brand-stone/75 leading-relaxed text-sm font-medium">{ind.problem}</p>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10px] uppercase font-sans tracking-wider text-brand-coral font-extrabold mb-1">Our Strategy</span>
                    <p className="text-brand-stone/75 leading-relaxed text-sm font-semibold">{ind.solution}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setActivePage("contact")} 
                className="flex items-center justify-between px-5 py-3 rounded-full bg-brand-charcoal/5 hover:bg-brand-charcoal/10 text-xs font-bold tracking-wide border border-brand-charcoal/10 transition-all cursor-pointer"
              >
                <span>Request Customized Blueprint</span>
                <ArrowRight size={14} className="text-brand-coral" />
              </button>
            </div>
          ))}
        </div>

        {/* Trust Statement Card */}
        <div className="editorial-card bg-white border border-brand-charcoal/5 p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden shadow-md">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-coral/5 rounded-full filter blur-[80px]" />
          
          <h2 className="font-serif font-semibold text-3xl text-brand-charcoal mb-4 relative z-10 tracking-tight leading-tight">The Brand Standard</h2>
          <p className="text-sm text-brand-stone/75 leading-relaxed font-sans max-w-2xl mx-auto mb-8 relative z-10 font-medium">
            "Your clients trust you to navigate their health, their wealth, their architectural investments, or their corporate strategies. You cannot afford to showcase a visual footprint that looks half-hearted, unorganized, or machine-generated. We treat your brand voice with the pristine care of a luxury publisher."
          </p>
          <div className="flex justify-center gap-2.5 text-xs text-brand-coral font-sans uppercase tracking-widest font-extrabold">
            <span>Precision</span>
            <span>•</span>
            <span>Reputation</span>
            <span>•</span>
            <span>Consistency</span>
          </div>
        </div>

      </div>
    </div>
  );
}
