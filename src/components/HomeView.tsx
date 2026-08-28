import React, { useState } from "react";
import { ArrowRight, Sparkles, TrendingUp, Clock, CheckCircle, Shield, ChevronDown, Award, RefreshCw, Zap, Star, MessageSquare, Heart, Share2, Instagram, Twitter } from "lucide-react";
import { motion } from "motion/react";
import CopywriterTool from "./CopywriterTool";
import { FAQ, PortfolioItem, PricingPlan } from "../types";

interface HomeViewProps {
  setActivePage: (page: string) => void;
  faqs: FAQ[];
  portfolio: PortfolioItem[];
  pricing: PricingPlan[];
}

export default function HomeView({ setActivePage, faqs, portfolio, pricing }: HomeViewProps) {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const benefits = [
    {
      icon: <Clock size={20} className="text-brand-coral" />,
      title: "Save 15+ Hours Every Week",
      desc: "Stop drafting, editing, and designing on weekends. We completely handle ideation and creative production so you can focus purely on scaling your company."
    },
    {
      icon: <TrendingUp size={20} className="text-brand-coral" />,
      title: "Vibrant Social Consistency",
      desc: "Social algorithms reward continuous presence. We keep your channels alive with regular, high-impact stories, maintaining top-of-mind brand authority."
    },
    {
      icon: <Award size={20} className="text-brand-coral" />,
      title: "Zero-AI Handcrafted Quality",
      desc: "Say goodbye to robotic, generic 'AI slop'. Our creative writers and visual artists handcraft bespoke media assets matching the tier of your expertise."
    }
  ];

  return (
    <div className="pt-20 bg-brand-alabaster text-brand-charcoal overflow-hidden grid-paper min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative px-6 py-16 lg:py-28 flex flex-col items-center justify-center text-center max-w-7xl mx-auto">
        {/* Warm ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-coral/10 rounded-full filter blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-brand-violet/5 rounded-full filter blur-[120px] pointer-events-none" />

        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-coral/10 bg-brand-coral/5 text-xs font-sans font-bold tracking-wider text-brand-coral uppercase mb-8"
        >
          <Sparkles size={12} className="text-brand-coral" />
          The Bespoke Social Media Studio For Founders
        </motion.div>

        {/* Dynamic Heading - Editorial Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif font-semibold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.08] max-w-5xl mb-8 text-brand-charcoal"
        >
          Run your business. We'll design your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-brand-pink italic">digital legacy</span>.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-brand-stone/75 font-sans text-lg sm:text-2xl max-w-3xl leading-relaxed mb-12 font-normal"
        >
          We construct, publish, and scale breathtaking social media presence and visual branding for high-performing advisors, coaches, and luxury leaders. Zero effort required from you.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full mb-16 relative z-10"
        >
          <button
            onClick={() => setActivePage("contact")}
            className="w-full sm:w-auto px-10 py-5 bg-brand-coral hover:bg-brand-coral/95 rounded-full text-white text-base font-bold tracking-wide transition-all shadow-lg shadow-brand-coral/20 hover:shadow-brand-coral/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Claim Your Free Content Plan
          </button>
          <button
            onClick={() => {
              const el = document.getElementById("problem-section");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto px-10 py-5 bg-white border border-brand-charcoal/10 hover:bg-brand-cream/80 rounded-full text-brand-charcoal text-base font-bold tracking-wide transition-all shadow-xs cursor-pointer"
          >
            See Our Creative Work
          </button>
        </motion.div>

        {/* Visually stunning App/Creative Hub Preview Mockup (Light First, Elegant Grid) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full max-w-5xl rounded-3xl border border-brand-charcoal/8 bg-white p-5 md:p-8 shadow-xl relative"
        >
          <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-5 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-brand-coral/20 border border-brand-coral/30" />
              <span className="w-3.5 h-3.5 rounded-full bg-brand-pink/20 border border-brand-pink/30" />
              <span className="w-3.5 h-3.5 rounded-full bg-brand-blue/20 border border-brand-blue/30" />
              <span className="ml-2 font-mono text-xs text-brand-stone/50">zelvora_creative_dashboard_v2.0</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-sans font-bold text-brand-coral bg-brand-coral/5 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-brand-coral animate-ping" />
              Next Post Live in 4 Hours
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
            <div className="lg:col-span-2 bg-brand-cream/50 rounded-2xl p-6 border border-brand-charcoal/5 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase bg-brand-coral/10 text-brand-coral border border-brand-coral/15 px-2.5 py-1 rounded-full">
                      CAMPAIGN #Z-841
                    </span>
                    <h4 className="font-serif font-semibold text-2xl text-brand-charcoal mt-2">Executive Instagram & LinkedIn Slides</h4>
                  </div>
                  <span className="text-xs font-sans font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    ✍️ Awaiting Review
                  </span>
                </div>
                
                {/* Beautiful Social Media Mockup post */}
                <div className="my-6 p-5 bg-white rounded-xl border border-brand-charcoal/5 shadow-xs">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-coral to-brand-pink flex items-center justify-center text-white font-bold text-sm">
                      Z
                    </div>
                    <div>
                      <h5 className="font-sans font-bold text-sm text-brand-charcoal">Alexander Mercer</h5>
                      <p className="text-[10px] text-brand-stone/50 font-medium">Founder, Mercer Global • Partnered with Zelvora</p>
                    </div>
                  </div>
                  <p className="text-sm text-brand-charcoal/90 font-sans leading-relaxed mb-4 italic">
                    "The greatest bottleneck for high-caliber firms is not their competence; it's their silence. We are so consumed with execution that we stay digital ghosts. Real visibility breeds compound trust..."
                  </p>
                  
                  {/* Grid of visual slides mockups */}
                  <div className="grid grid-cols-3 gap-3 mb-2">
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-brand-cream to-amber-50 border border-brand-charcoal/5 p-3 flex flex-col justify-between">
                      <span className="font-serif font-bold text-xs text-brand-coral">01 / BRAND</span>
                      <span className="text-[10px] font-sans font-bold text-brand-charcoal tracking-tight leading-tight">The Art of Silent Authority</span>
                    </div>
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-[#FFF5F2] to-[#FFEBE5] border border-brand-coral/10 p-3 flex flex-col justify-between">
                      <span className="font-serif font-bold text-xs text-brand-pink">02 / PROBLEM</span>
                      <span className="text-[10px] font-sans font-bold text-brand-charcoal tracking-tight leading-tight">Why Referrals are Leaking</span>
                    </div>
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-[#F5F2FF] to-[#EBE5FF] border border-brand-violet/10 p-3 flex flex-col justify-between">
                      <span className="font-serif font-bold text-xs text-brand-violet">03 / TRUST</span>
                      <span className="text-[10px] font-sans font-bold text-brand-charcoal tracking-tight leading-tight">Owning Digital Presence</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-brand-stone/40 font-mono mt-3">
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1"><Heart size={12} className="text-brand-coral fill-brand-coral" /> 1.2k</span>
                      <span className="flex items-center gap-1"><MessageSquare size={12} /> 148</span>
                      <span className="flex items-center gap-1"><Share2 size={12} /> 85</span>
                    </div>
                    <span>Preview Format</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-end gap-3 pt-4 border-t border-brand-charcoal/5">
                <button 
                  onClick={() => setActivePage("contact")} 
                  className="px-5 py-2.5 rounded-full bg-emerald-500 text-white text-xs font-bold tracking-wide hover:bg-emerald-600 transition-all shadow-sm cursor-pointer"
                >
                  Approve and Publish
                </button>
                <button className="px-5 py-2.5 rounded-full bg-white hover:bg-brand-cream border border-brand-charcoal/10 text-brand-charcoal text-xs font-bold transition-all">
                  Request Revision
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Active Channels Card */}
              <div className="bg-brand-cream/50 rounded-2xl p-6 border border-brand-charcoal/5 flex-1 flex flex-col justify-between">
                <div>
                  <h5 className="font-sans font-extrabold text-xs text-brand-stone/50 uppercase tracking-widest mb-4">ACTIVE CHANNELS</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs py-2 border-b border-brand-charcoal/5">
                      <span className="font-sans font-bold text-brand-charcoal flex items-center gap-2">
                        <Twitter size={14} className="text-brand-coral" /> Twitter/X Executive Threads
                      </span>
                      <span className="text-brand-coral font-bold font-mono">3x / week</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-2 border-b border-brand-charcoal/5">
                      <span className="font-sans font-bold text-brand-charcoal flex items-center gap-2">
                        <Instagram size={14} className="text-brand-pink" /> Instagram Visual Carousel
                      </span>
                      <span className="text-brand-coral font-bold font-mono">2x / week</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-2">
                      <span className="font-sans font-bold text-brand-charcoal flex items-center gap-2">
                        <Sparkles size={14} className="text-brand-violet" /> Monthly Thought Essays
                      </span>
                      <span className="text-brand-coral font-bold font-mono">1x / month</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-brand-charcoal/5 text-xs font-mono text-brand-stone/50 flex justify-between">
                  <span>Design Consistency Score</span>
                  <span className="text-brand-charcoal font-bold">100% (Handcrafted)</span>
                </div>
              </div>
              
              {/* Premium Quote Card */}
              <div className="bg-[#FFF8F5] rounded-2xl p-6 border border-brand-coral/10 text-brand-stone flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-brand-coral font-bold mb-2 text-xs uppercase tracking-wide">
                  <Star size={12} className="fill-brand-coral text-brand-coral" />
                  <span>The Zero-Time Workflow</span>
                </div>
                <p className="leading-relaxed text-xs text-brand-charcoal/80 italic">
                  "Zelvora extracts your original ideas in a single monthly alignment, then drafts everything for you. Review, request edits, or tap approve. Total client workflow is under 5 minutes a week."
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. THE PROBLEM SECTION */}
      <section id="problem-section" className="border-t border-brand-charcoal/5 bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-sans font-extrabold tracking-wider uppercase text-brand-coral bg-brand-coral/10 px-3 py-1 rounded-full">
              The Invisible Brand Trap
            </span>
            <h2 className="font-serif font-semibold text-4xl sm:text-5xl lg:text-6xl text-brand-charcoal tracking-tight mt-6 mb-8 leading-tight">
              When your profile is silent, your competitors define the narrative.
            </h2>
            <p className="text-brand-stone/80 font-sans leading-relaxed mb-6 text-base sm:text-lg">
              In the modern business landscape, visual and written trust is your most critical asset. The moment a premium referral or prospect hears your name, they immediately look you up on LinkedIn, Google, or Instagram to validate your caliber.
            </p>
            <p className="text-brand-stone/80 font-sans leading-relaxed text-base sm:text-lg">
              If they find an empty profile, robotic AI templates, or inconsistent updates, they click away instantly. You aren't losing leads because your service is weak; you are losing them because your digital presence doesn't mirror your real-world excellence.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="editorial-card p-8 bg-brand-cream/30 border border-brand-charcoal/5">
              <span className="text-2xl font-serif text-brand-coral italic font-bold mb-4 block">01</span>
              <h4 className="font-serif font-semibold text-xl text-brand-charcoal mb-3">The Time Bottleneck</h4>
              <p className="text-sm text-brand-stone/70 leading-relaxed">
                Writing authentic social essays, constructing clean layout slide decks, and managing publishing queues takes 15+ hours a week. You are too busy building your company to become a full-time content editor.
              </p>
            </div>

            <div className="editorial-card p-8 bg-brand-cream/30 border border-brand-charcoal/5">
              <span className="text-2xl font-serif text-brand-coral italic font-bold mb-4 block">02</span>
              <h4 className="font-serif font-semibold text-xl text-brand-charcoal mb-3">The Consistency Collapse</h4>
              <p className="text-sm text-brand-stone/70 leading-relaxed">
                Posting once a month doesn't sustain momentum. Social algorithms aggressively suppress inactive accounts. Without a dedicated outsourced content studio, consistency fails.
              </p>
            </div>

            <div className="editorial-card p-8 bg-brand-cream/30 border border-brand-charcoal/5">
              <span className="text-2xl font-serif text-brand-coral italic font-bold mb-4 block">03</span>
              <h4 className="font-serif font-semibold text-xl text-brand-charcoal mb-3">The 'AI Slop' Dilution</h4>
              <p className="text-sm text-brand-stone/70 leading-relaxed">
                Bland, robotic, copy-pasted artificial paragraphs devalue high-ticket brands. Sophisticated buyers detect generic AI immediately. If you sound like a standard machine, you lose premium trust.
              </p>
            </div>

            <div className="editorial-card p-8 bg-brand-cream/30 border border-brand-charcoal/5">
              <span className="text-2xl font-serif text-brand-coral italic font-bold mb-4 block">04</span>
              <h4 className="font-serif font-semibold text-xl text-brand-charcoal mb-3">The Trust Validation Leak</h4>
              <p className="text-sm text-brand-stone/70 leading-relaxed">
                Warm referrals visit your social space as their primary validation layer. A silent or poorly styled digital presence converts a devastatingly small percentage of those premium inbound visitors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE SOLUTION SECTION (Value Proposition) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3.5 py-1.5 rounded-full">
            The Zelvora Content Engine
          </span>
          <h2 className="font-serif font-semibold text-4xl sm:text-6xl tracking-tight text-brand-charcoal mt-6 mb-6 leading-tight">
            Delegate the execution.<br />Retain absolute brand control.
          </h2>
          <p className="text-brand-stone/80 font-sans text-lg sm:text-xl leading-relaxed">
            We operate as your premium social media department. We study your exact methodologies, draft your customized slides, write professional copy, and orchestrate visual perfection on your terms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <div key={i} className="editorial-card bg-white p-8 border border-brand-charcoal/5 flex flex-col gap-5 relative">
              <div className="p-4 rounded-xl bg-brand-coral/5 text-brand-coral w-fit">
                {b.icon}
              </div>
              <h3 className="font-serif font-semibold text-2xl text-brand-charcoal">{b.title}</h3>
              <p className="text-sm text-brand-stone/70 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE INTERACTIVE CO-PILOT TOOL */}
      <section className="py-20 px-6 bg-[#FAF6F0] border-t border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-sans font-extrabold tracking-wider text-brand-coral uppercase bg-brand-coral/5 px-3 py-1.5 rounded-full">
              Interactive Content Playground
            </span>
            <h2 className="font-serif font-semibold text-3xl sm:text-5xl text-brand-charcoal mt-6 mb-4">
              Test Our Creative DNA
            </h2>
            <p className="text-sm sm:text-base text-brand-stone/70 font-sans">
              Experience our handcrafted copywriting and social concept frameworks instantly. Input your business parameters below and analyze the curated visibility blueprint.
            </p>
          </div>
          <CopywriterTool />
        </div>
      </section>

      {/* 5. PROCESS / HOW IT WORKS AT A GLANCE */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-brand-charcoal/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <div>
            <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3.5 py-1.5 rounded-full">
              Curated Operations
            </span>
            <h2 className="font-serif font-semibold text-4xl sm:text-6xl text-brand-charcoal mt-6 tracking-tight leading-tight">
              A content department running on autopilot
            </h2>
          </div>
          <button onClick={() => setActivePage("process")} className="flex items-center gap-2 text-sm font-bold text-brand-coral hover:text-brand-charcoal transition-colors group cursor-pointer">
            Explore our complete 4-step workflow
            <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Brand Alignment", desc: "A 45-minute deep-dive consultation to extract your core stories, design guidelines, tone variables, and targeted social audiences." },
            { step: "02", title: "Handcrafted Drafts", desc: "Our writers and visual designers handcraft gorgeous slider decks, insightful threads, and essays 14 days in advance." },
            { step: "03", title: "Beautiful Approval", desc: "Receive a simple review portal in your email. Request tweaks or click to approve with zero friction. Zero complex log-ins." },
            { step: "04", title: "Sustained Momentum", desc: "We coordinate optimization, scheduling, and distribution on your channels. We track metrics and send visual reports." }
          ].map((item, idx) => (
            <div key={idx} className="editorial-card bg-white p-8 border border-brand-charcoal/5 relative">
              <span className="text-6xl font-serif font-semibold text-brand-charcoal/5 absolute top-4 right-4 select-none">{item.step}</span>
              <div className="w-9 h-9 rounded-full bg-brand-coral/10 border border-brand-coral/20 flex items-center justify-center text-xs font-mono font-bold text-brand-coral mb-6">
                {idx + 1}
              </div>
              <h4 className="font-serif font-semibold text-xl text-brand-charcoal mb-3">{item.title}</h4>
              <p className="text-xs text-brand-stone/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CASE STUDIES / PORTFOLIO PREVIEW */}
      <section className="bg-white py-24 px-6 border-t border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
            <div>
              <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3 py-1.5 rounded-full">
                Excellence Spotlights
              </span>
              <h2 className="font-serif font-semibold text-4xl sm:text-6xl text-brand-charcoal mt-6 tracking-tight leading-tight">
                Crafted social media success stories
              </h2>
            </div>
            <button onClick={() => setActivePage("portfolio")} className="flex items-center gap-2 text-sm font-bold text-brand-coral hover:text-brand-charcoal transition-colors group cursor-pointer">
              View all client records
              <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolio.slice(0, 2).map((item) => (
              <div key={item.id} className="editorial-card bg-brand-cream/10 rounded-2xl overflow-hidden border border-brand-charcoal/5 flex flex-col md:flex-row items-stretch group hover:border-brand-coral/20 transition-all duration-300">
                <div className="md:w-2/5 min-h-[220px] relative overflow-hidden bg-brand-cream">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 to-transparent md:hidden" />
                </div>
                <div className="md:w-3/5 p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase text-brand-coral bg-brand-coral/5 border border-brand-coral/10 px-2.5 py-1 rounded-full w-fit block mb-4">
                      {item.category}
                    </span>
                    <h3 className="font-serif font-semibold text-2xl text-brand-charcoal tracking-tight mb-3 group-hover:text-brand-coral transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-stone/75 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-brand-charcoal/5">
                    <span className="block text-[10px] font-sans font-extrabold text-brand-stone/50 uppercase tracking-wider mb-1.5">ORGANIC PERFORMANCE</span>
                    <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5 font-sans">
                      <Zap size={14} />
                      {item.metrics}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQ) PREVIEW */}
      <section className="py-24 px-6 max-w-4xl mx-auto border-t border-brand-charcoal/5">
        <div className="text-center mb-20">
          <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3 py-1.5 rounded-full">
            Demystifying Content Logistics
          </span>
          <h2 className="font-serif font-semibold text-3xl sm:text-5xl text-brand-charcoal mt-6 mb-4 leading-tight">
            Answers to your strategic concerns
          </h2>
          <p className="text-base text-brand-stone/75 font-sans">
            We prioritize your personal brand safety, narrative authority, and organic legal ownership.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.slice(0, 4).map((faq) => {
            const isExpanded = expandedFaq === faq.id;
            return (
              <div key={faq.id} className="bg-white rounded-2xl border border-brand-charcoal/5 overflow-hidden shadow-xs transition-all duration-300">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-brand-cream/30 transition-all cursor-pointer"
                >
                  <span className="font-serif font-semibold text-base sm:text-lg text-brand-charcoal pr-4">{faq.question}</span>
                  <ChevronDown size={18} className={`text-brand-stone/55 shrink-0 transform transition-transform duration-300 ${isExpanded ? "rotate-180 text-brand-coral" : ""}`} />
                </button>
                {isExpanded && (
                  <div className="px-6 pb-6 text-sm text-brand-stone/75 font-sans leading-relaxed border-t border-brand-charcoal/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. HIGH-IMPACT FINAL CTA */}
      <section className="relative py-24 px-6 text-center overflow-hidden border-t border-brand-charcoal/5 bg-brand-cream/45">
        {/* Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-coral/5 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/10 px-4 py-1.5 rounded-full">
            Unlock High-Yield Presence
          </span>
          <h2 className="font-serif font-semibold text-4xl sm:text-6xl text-brand-charcoal tracking-tight mt-6 mb-8 leading-tight">
            Stop remaining silent in a crowded market.
          </h2>
          <p className="text-base sm:text-lg text-brand-stone/75 max-w-2xl mx-auto leading-relaxed mb-12 font-normal">
            Join the elite circle of founders and industry advisors who delegate their storytelling and branding operations to Zelvora. Studio-crafted social content that wins organic clients on complete autopilot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setActivePage("contact")}
              className="w-full sm:w-auto px-10 py-5 bg-brand-coral hover:bg-brand-coral/95 rounded-full text-white text-base font-bold tracking-wide transition-all shadow-md shadow-brand-coral/15 hover:scale-[1.02] cursor-pointer"
            >
              Request Free Strategic Plan
            </button>
            <button
              onClick={() => setActivePage("pricing")}
              className="w-full sm:w-auto px-10 py-5 bg-white border border-brand-charcoal/10 hover:bg-brand-cream rounded-full text-brand-charcoal text-base font-bold tracking-wide transition-all shadow-xs cursor-pointer"
            >
              Review Pricing Plans
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
