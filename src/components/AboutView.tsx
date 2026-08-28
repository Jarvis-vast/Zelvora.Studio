import React from "react";
import { ArrowRight, Shield, Globe, Award } from "lucide-react";

interface AboutViewProps {
  setActivePage: (page: string) => void;
}

export default function AboutView({ setActivePage }: AboutViewProps) {
  const coreValues = [
    {
      title: "Handcrafted Pedigree",
      desc: "We stand aggressively against generic templates, machine-generated cliches, and low-effort artificial slop. Every visual element and written thought is engineered by hand.",
      icon: <Award size={20} className="text-brand-coral" />
    },
    {
      title: "Absolute Operational Discretion",
      desc: "Many of our clients are top executive advisors, wealth management directors, and elite startup founders who demand absolute confidentiality. We protect your brand reputation like our own.",
      icon: <Shield size={20} className="text-brand-coral" />
    },
    {
      title: "Data & Insight Grounded",
      desc: "We track the shifts of social feed algorithms every week. Our strategies align with real client analytics and inbound buyer behaviors, never generic likes or vanity metrics.",
      icon: <Globe size={20} className="text-brand-coral" />
    }
  ];

  return (
    <div className="pt-32 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20 grid-paper">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3 py-1.5 rounded-full">
            Our Studio
          </span>
          <h1 className="font-serif font-semibold text-4xl sm:text-6xl text-brand-charcoal tracking-tight mt-6 mb-6 leading-tight">
            The premium brand team for elite operators
          </h1>
          <p className="text-brand-stone/75 text-base sm:text-lg leading-relaxed">
            We are not a traditional marketing agency. We are a specialized, high-performing brand publishing partner that builds authentic digital leverage for busy industry leaders.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3 py-1.5 rounded-full">Our Mission</span>
            <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-brand-charcoal tracking-tight leading-tight">
              We return your time while amplifying your digital reputation.
            </h2>
            <p className="text-sm text-brand-stone/75 leading-relaxed font-normal">
              Zelvora was founded after observing a massive bottleneck in premium professional industries: coaches, consultants, wealth advisors, architects, and lawyers had exceptional operational knowledge, but literally had zero hours in their week to publish consistently.
            </p>
            <p className="text-sm text-brand-stone/75 leading-relaxed font-normal">
              Instead of hiring expensive full-time copywriters, art directors, and social strategists, Zelvora bundles elite, multidisciplinary brand-management expertise into a streamlined month-to-month subscription, complete with a frictionless mobile 1-click approve module.
            </p>
          </div>

          <div className="lg:col-span-6 rounded-2xl overflow-hidden aspect-[4/3] border border-brand-charcoal/10 relative shadow-md bg-white p-2">
            <img
              src="https://images.unsplash.com/photo-1552581234-2612b75d8953?auto=format&fit=crop&q=80&w=800"
              alt="Co-working on strategy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Values Block */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3 py-1.5 rounded-full">The Brand Philosophy</span>
            <h2 className="font-serif font-semibold text-3xl text-brand-charcoal mt-6 tracking-tight">The guidelines that drive our work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((v, i) => (
              <div key={i} className="editorial-card bg-white rounded-xl p-8 border border-brand-charcoal/5 space-y-4 shadow-xs hover:border-brand-coral/25 transition-all duration-300">
                <div className="p-3 bg-brand-coral/5 border border-brand-coral/10 text-brand-coral rounded-xl w-fit">
                  {v.icon}
                </div>
                <h3 className="font-serif font-semibold text-xl text-brand-charcoal">{v.title}</h3>
                <p className="text-sm text-brand-stone/70 leading-relaxed font-sans">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call To Action */}
        <div className="editorial-card bg-white border border-brand-charcoal/5 p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden shadow-md">
          <h2 className="font-serif font-semibold text-3xl text-brand-charcoal mb-4 tracking-tight leading-tight">Let's discuss your custom content footprint</h2>
          <p className="text-sm text-brand-stone/75 leading-relaxed font-normal max-w-2xl mx-auto mb-8">
            We operate with limited client capacity to guarantee high-end, bespoke creative and copy output. Contact our partners desk to secure your operational spot today.
          </p>
          <button 
            onClick={() => setActivePage("contact")} 
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-coral hover:bg-brand-coral/95 text-white text-xs font-bold rounded-full tracking-wide shadow-md shadow-brand-coral/10 transition-all hover:scale-[1.02] cursor-pointer"
          >
            Connect With Our Partners Desk
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
