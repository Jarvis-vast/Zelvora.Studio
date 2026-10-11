import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Clock, Shield, ChevronDown, Award, Sparkles, FileText, Check, Eye, Layers } from "lucide-react";
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

  const corePillars = [
    {
      icon: <Clock size={20} className="text-brand-coral" />,
      title: "Under 60 Minutes a Month",
      desc: "One structured 45-minute monthly strategy extraction call gives our editorial desk everything needed to produce your entire month of executive posts, carousels, and essays."
    },
    {
      icon: <Award size={20} className="text-brand-coral" />,
      title: "Human Editorial Rigor",
      desc: "No unvetted AI slop or generic templates. Every word, narrative hook, and typographic layout is crafted and verified by senior human editors who understand advisory buyers."
    },
    {
      icon: <Shield size={20} className="text-brand-coral" />,
      title: "Rapid Mobile Approvals",
      desc: "Review ready-to-publish graphic slides and long-form commentary from your phone via a private preview link or WhatsApp/Slack. Request an edit or tap approve in minutes."
    }
  ];

  return (
    <div className="pt-20 bg-brand-alabaster text-brand-charcoal overflow-hidden min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative px-6 pt-14 pb-20 lg:pt-24 lg:pb-32 flex flex-col items-center justify-center text-center max-w-7xl mx-auto">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-coral/6 rounded-full filter blur-[140px] pointer-events-none" />

        {/* Positioning Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-charcoal/10 bg-white text-[11px] font-mono font-bold tracking-wider text-brand-stone uppercase mb-8 shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-brand-coral" />
          Outsourced Executive Content &bull; For Boutique Advisory Firms
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif font-semibold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.12] max-w-5xl mb-8 text-brand-charcoal"
        >
          Your expertise should be visible,{" "}
          <span className="italic font-normal text-brand-stone/85 block sm:inline">
            even when you're busy running the business.
          </span>
        </motion.h1>

        {/* Core Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-brand-stone/80 font-sans text-lg sm:text-xl max-w-3xl leading-relaxed mb-10 font-normal"
        >
          We turn genuine partner-level knowledge into distinctive, consistent executive content across LinkedIn, Twitter/X, and industry newsletters. Managed execution, authentic editorial voice, and low client effort.
        </motion.p>

        {/* Unified Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full mb-16 relative z-10"
        >
          <button
            onClick={() => setActivePage("contact")}
            className="w-full sm:w-auto px-8 py-4 bg-brand-coral hover:bg-brand-coral/95 rounded-full text-white text-sm font-bold tracking-wide uppercase transition-all shadow-md shadow-brand-coral/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Request a Private Visibility Audit</span>
            <ArrowRight size={15} />
          </button>
          <button
            onClick={() => {
              const el = document.getElementById("work-samples");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-white border border-brand-charcoal/10 hover:bg-brand-cream/80 rounded-full text-brand-charcoal text-sm font-bold tracking-wide transition-all shadow-xs cursor-pointer"
          >
            Review Deliverable Samples
          </button>
        </motion.div>

        {/* 2. REALISTIC EDITORIAL DELIVERABLE MOCKUP */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="w-full max-w-5xl rounded-2xl border border-brand-charcoal/10 bg-white p-6 md:p-8 shadow-lg text-left relative"
        >
          <div className="flex flex-wrap items-center justify-between border-b border-brand-charcoal/8 pb-4 mb-6 gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-brand-charcoal/5 text-brand-charcoal font-mono text-[11px] font-bold uppercase">
                Deliverable Specimen #01
              </span>
              <span className="text-xs font-sans text-brand-stone/60">
                Typographic Executive Carousel & Commentary
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-stone/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Human Ghostwritten &bull; Mobile Approved
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Real Graphic Deliverable Image (zelvora_post.png) */}
            <div className="lg:col-span-5 bg-brand-charcoal/5 rounded-xl p-2 border border-brand-charcoal/10 shadow-inner overflow-hidden">
              <div className="relative group overflow-hidden rounded-lg bg-brand-charcoal">
                <img
                  src="/zelvora_post.png"
                  alt="Zelvora Studio Executive Content Post Specimen"
                  className="w-full h-auto object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-brand-charcoal/90 backdrop-blur-md px-3 py-2 rounded-md border border-white/10 flex items-center justify-between text-white text-[10px] font-mono">
                  <span>Actual Typographic Slide Sample</span>
                  <span className="text-brand-coral font-bold">1080 &times; 1350 px</span>
                </div>
              </div>
            </div>

            {/* Editorial Content Breakdown */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-coral font-bold block mb-1">
                  Advisory ICP: Boutique Strategy & Transformation
                </span>
                <h3 className="font-serif font-semibold text-2xl text-brand-charcoal tracking-tight mb-3">
                  "The Silent Advisory Trap: Why the Best Consultancies Lose to Louder Peers"
                </h3>
                <p className="text-xs text-brand-stone/75 leading-relaxed font-sans mb-4">
                  Prospects validate your advisory depth before they reply to introductory emails. We ghostwrite contrarian perspectives that break down proprietary partner frameworks into crisp, multi-slide typographic carousels.
                </p>

                <div className="space-y-2 bg-brand-cream/60 p-4 rounded-xl border border-brand-charcoal/5 font-sans text-xs">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-brand-coral shrink-0 mt-0.5" />
                    <span><strong>Strategic Hook:</strong> Addresses board-level buyer hesitations without hyperbole.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-brand-coral shrink-0 mt-0.5" />
                    <span><strong>Framework Articulation:</strong> Translates 3-step advisory methodology into clear visual slides.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-brand-coral shrink-0 mt-0.5" />
                    <span><strong>Conversion Narrative:</strong> Drives qualified founders & corporate buyers directly to private discovery.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-charcoal/8 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono text-brand-stone/60">
                  Client Time Spent: <span className="font-bold text-brand-charcoal">3 minutes to review & approve</span>
                </div>
                <button
                  onClick={() => setActivePage("contact")}
                  className="px-4 py-2 rounded-full bg-brand-coral text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-coral/90 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Request Private Audit</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. THE PROBLEM: INVISIBILITY IN BOUTIQUE ADVISORY */}
      <section className="border-y border-brand-charcoal/8 bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-brand-coral bg-brand-coral/5 border border-brand-coral/10 px-3 py-1 rounded-full">
              The Reality of Advisory Sales
            </span>
            <h2 className="font-serif font-semibold text-3xl sm:text-5xl text-brand-charcoal tracking-tight leading-tight">
              Referrals get you in the conversation. Public authority closes the engagement.
            </h2>
            <p className="text-brand-stone/80 font-sans leading-relaxed text-sm sm:text-base">
              When an enterprise buyer hears your name recommended, their immediate reaction is to look you up on LinkedIn. If what they discover is complete silence or three-year-old updates, friction enters the deal.
            </p>
            <p className="text-brand-stone/80 font-sans leading-relaxed text-sm sm:text-base">
              They don't assume you're too busy doing great work; they assume your methodology has fallen behind. Zelvora Studio guarantees that your digital presence reflects your actual fee caliber.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-brand-cream/40 border border-brand-charcoal/8 space-y-3">
              <span className="font-mono text-xs text-brand-coral font-bold block">01 / TIME CONSTRAINT</span>
              <h4 className="font-serif font-semibold text-lg text-brand-charcoal">Billable Hours vs. Writing</h4>
              <p className="text-xs text-brand-stone/75 leading-relaxed font-sans">
                You cannot spend 12 hours a week drafting posts, designing slides, and managing queues when client deliverables demand your attention.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-brand-cream/40 border border-brand-charcoal/8 space-y-3">
              <span className="font-mono text-xs text-brand-coral font-bold block">02 / BRAND PROTECTION</span>
              <h4 className="font-serif font-semibold text-lg text-brand-charcoal">The 'AI Slop' Danger</h4>
              <p className="text-xs text-brand-stone/75 leading-relaxed font-sans">
                Generic, automated AI templates instantly erode credibility with sophisticated buyers. Partner-level trust demands human editorial precision.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-brand-cream/40 border border-brand-charcoal/8 space-y-3">
              <span className="font-mono text-xs text-brand-coral font-bold block">03 / INCONSISTENCY CLIFFS</span>
              <h4 className="font-serif font-semibold text-lg text-brand-charcoal">The Inactivity Trap</h4>
              <p className="text-xs text-brand-stone/75 leading-relaxed font-sans">
                Posting once every two months yields zero momentum. Without a dedicated outsourced editorial system, content production collapses during busy client sprints.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-brand-cream/40 border border-brand-charcoal/8 space-y-3">
              <span className="font-mono text-xs text-brand-coral font-bold block">04 / PIPELINE VALIDATION</span>
              <h4 className="font-serif font-semibold text-lg text-brand-charcoal">Shortening Sales Cycles</h4>
              <p className="text-xs text-brand-stone/75 leading-relaxed font-sans">
                Prospects who read your viewpoints arrive at introductory calls already educated on your diagnostic frameworks and pre-sold on your counsel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OPERATING SYSTEM / MANAGED EXECUTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-coral bg-brand-coral/5 border border-brand-coral/10 px-3 py-1 rounded-full">
            Managed Execution
          </span>
          <h2 className="font-serif font-semibold text-3xl sm:text-5xl text-brand-charcoal tracking-tight mt-4 mb-5">
            How Zelvora Studio Runs Your Visibility
          </h2>
          <p className="text-brand-stone/75 font-sans text-sm sm:text-base leading-relaxed">
            A specialist editorial operation engineered specifically for time-constrained partners. You maintain absolute strategic control; we handle every operational step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {corePillars.map((p, i) => (
            <div key={i} className="editorial-card bg-white p-8 border border-brand-charcoal/8 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="p-3 bg-brand-coral/5 border border-brand-coral/10 rounded-xl w-fit mb-4">
                  {p.icon}
                </div>
                <h3 className="font-serif font-semibold text-xl text-brand-charcoal">{p.title}</h3>
                <p className="text-xs text-brand-stone/75 leading-relaxed font-sans mt-2">{p.desc}</p>
              </div>
              <div className="pt-4 border-t border-brand-charcoal/5 text-[11px] font-mono text-brand-stone/50 font-semibold">
                Guaranteed Operational SLA
              </div>
            </div>
          ))}
        </div>

        {/* Chronological 4-Step Pipeline Summary */}
        <div className="rounded-2xl border border-brand-charcoal/8 bg-brand-cream/50 p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", name: "Strategy Extraction", detail: "45-minute monthly partner interview capturing your real casework, frameworks, and views." },
              { step: "02", name: "Editorial Production", detail: "Senior writers and visual designers craft 14 to 20 bespoke posts, carousels, and essays." },
              { step: "03", name: "Mobile Review & Signoff", detail: "Review bi-weekly draft batches on your phone. Tap approve or leave voice feedback in minutes." },
              { step: "04", name: "Agreed Publishing", detail: "We handle scheduling across LinkedIn, X, and newsletters, tracking organic executive resonance." }
            ].map((s, idx) => (
              <div key={idx} className="space-y-2">
                <span className="font-serif font-bold text-2xl text-brand-coral/60">{s.step}</span>
                <h4 className="font-serif font-semibold text-base text-brand-charcoal">{s.name}</h4>
                <p className="text-xs text-brand-stone/75 leading-relaxed font-sans">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WORK SAMPLES / ILLUSTRATIVE CASE CONCEPTS */}
      <section id="work-samples" className="bg-white py-24 px-6 border-t border-brand-charcoal/8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div>
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-brand-coral bg-brand-coral/5 border border-brand-coral/10 px-3 py-1 rounded-full">
                Work Samples & Taxonomy
              </span>
              <h2 className="font-serif font-semibold text-3xl sm:text-5xl text-brand-charcoal tracking-tight mt-4">
                What Our Clients Actually Receive
              </h2>
              <p className="text-xs font-mono text-brand-stone/60 mt-2">
                Illustrative editorial concepts formulated for founder-led advisory practices.
              </p>
            </div>
            <button
              onClick={() => setActivePage("portfolio")}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-coral hover:text-brand-charcoal transition-colors cursor-pointer"
            >
              <span>Explore All Case Concepts</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolio.slice(0, 2).map((item) => (
              <div key={item.id} className="editorial-card rounded-2xl overflow-hidden border border-brand-charcoal/8 bg-white flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/9] w-full relative overflow-hidden bg-brand-cream/40 border-b border-brand-charcoal/8">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-brand-charcoal text-white text-[10px] font-mono uppercase px-3 py-1 rounded-full shadow-md">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[11px] font-mono text-brand-stone/50 block mb-1 font-semibold">{item.client}</span>
                    <h3 className="font-serif font-semibold text-xl text-brand-charcoal mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs text-brand-stone/75 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-brand-charcoal/5 flex items-center justify-between text-xs font-mono text-brand-stone/60">
                  <span>{item.metrics}</span>
                  <button
                    onClick={() => setActivePage("contact")}
                    className="text-brand-coral font-bold hover:underline cursor-pointer"
                  >
                    Request Similar Audit &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE EDITORIAL TAXONOMY PLAYGROUND */}
      <section className="py-20 px-6 bg-[#FAF6F0] border-t border-brand-charcoal/8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold tracking-wider text-brand-coral uppercase bg-brand-coral/5 border border-brand-coral/10 px-3 py-1 rounded-full">
              Editorial Concept Sandbox
            </span>
            <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-brand-charcoal mt-4 mb-3">
              Test Our Strategic Post Architecture
            </h2>
            <p className="text-xs sm:text-sm text-brand-stone/75 font-sans max-w-2xl mx-auto">
              Behind the scenes, we use intelligent research models to structure narrative hooks and framework slides before our senior human editors craft publication-ready copy. Input your practice parameters to see an initial concept outline.
            </p>
          </div>
          <CopywriterTool />
        </div>
      </section>

      {/* 6. TRANSPARENT INVESTMENT & SCOPE */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-brand-charcoal/8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-coral bg-brand-coral/5 border border-brand-coral/10 px-3 py-1 rounded-full">
            Transparent Investment
          </span>
          <h2 className="font-serif font-semibold text-3xl sm:text-5xl text-brand-charcoal tracking-tight mt-4 mb-4">
            Predictable Scopes. Zero Lock-In.
          </h2>
          <p className="text-brand-stone/75 text-sm sm:text-base font-sans">
            Rolling monthly commitments. Scale, pause, or adjust with 14 days notice. You own 100% of all intellectual property, copyright, and visual assets produced.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {pricing.map((plan) => (
            <div
              key={plan.id}
              className={`editorial-card rounded-2xl p-8 border flex flex-col justify-between transition-all ${
                plan.isPopular
                  ? "border-brand-coral/40 shadow-lg bg-[#FFFDFB]"
                  : "border-brand-charcoal/8 bg-white"
              }`}
            >
              <div>
                {plan.isPopular && (
                  <span className="inline-block mb-3 px-3 py-1 rounded-full bg-brand-coral text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                    Signature Advisory Tier
                  </span>
                )}
                <span className="text-xs font-mono font-bold uppercase text-brand-stone/60 block mb-1">{plan.name}</span>
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="font-serif font-bold text-4xl text-brand-charcoal">{plan.price}</span>
                  <span className="text-xs font-mono text-brand-stone/50">/ {plan.period}</span>
                </div>
                <p className="text-xs text-brand-stone/75 leading-relaxed font-sans mb-6">
                  {plan.description}
                </p>

                <div className="h-[1px] bg-brand-charcoal/5 my-4" />

                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-mono text-brand-stone/50 uppercase tracking-wider block font-bold">Includes:</span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-brand-stone/80 font-medium">
                      <Check size={13} className="text-brand-coral shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActivePage("contact")}
                className={`w-full py-3.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  plan.isPopular
                    ? "bg-brand-coral text-white hover:bg-brand-coral/95 shadow-md shadow-brand-coral/15"
                    : "bg-brand-charcoal/5 text-brand-charcoal hover:bg-brand-charcoal/10 border border-brand-charcoal/10"
                }`}
              >
                <span>Request Private Audit</span>
                <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-brand-charcoal/8">
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-coral bg-brand-coral/5 border border-brand-coral/10 px-3 py-1 rounded-full">
            Strategic Clarity
          </span>
          <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-brand-charcoal mt-4 mb-3">
            Common Executive Questions
          </h2>
          <p className="text-xs sm:text-sm text-brand-stone/75 font-sans">
            Transparent operational standards, confidentiality parameters, and delivery workflows.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isExpanded = expandedFaq === faq.id;
            return (
              <div key={faq.id} className="bg-white rounded-xl border border-brand-charcoal/8 overflow-hidden shadow-xs">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4.5 flex items-center justify-between text-left hover:bg-brand-cream/30 transition-all cursor-pointer"
                >
                  <span className="font-serif font-semibold text-base sm:text-lg text-brand-charcoal pr-4">{faq.question}</span>
                  <ChevronDown size={16} className={`text-brand-stone/50 shrink-0 transform transition-transform duration-200 ${isExpanded ? "rotate-180 text-brand-coral" : ""}`} />
                </button>
                {isExpanded && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-brand-stone/75 font-sans leading-relaxed border-t border-brand-charcoal/5 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. HIGH-CONVERTING CLOSING SECTION */}
      <section className="relative py-24 px-6 text-center border-t border-brand-charcoal/8 bg-brand-cream/40">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-coral bg-brand-coral/10 px-3.5 py-1 rounded-full">
            Immediate Sales Readiness
          </span>
          <h2 className="font-serif font-semibold text-3xl sm:text-5xl text-brand-charcoal tracking-tight mt-6 mb-6 leading-tight">
            Stop remaining silent while your firm does category-defining work.
          </h2>
          <p className="text-sm sm:text-base text-brand-stone/80 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            Request a complimentary Private Visibility Audit. Within 48 hours, our editorial desk will benchmark your executive presence against top category peers and deliver 2 custom post concepts tailored to your practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setActivePage("contact")}
              className="w-full sm:w-auto px-8 py-4 bg-brand-coral hover:bg-brand-coral/95 rounded-full text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-brand-coral/15 hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Request a Private Visibility Audit</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => setActivePage("pricing")}
              className="w-full sm:w-auto px-8 py-4 bg-white border border-brand-charcoal/10 hover:bg-brand-cream rounded-full text-brand-charcoal text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            >
              View Transparent Scopes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
