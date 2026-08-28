import React from "react";
import { Layers, RefreshCw, FileText, Check, Sparkles, TrendingUp, Zap, ArrowRight, Instagram, MessageSquare } from "lucide-react";

interface ServicesViewProps {
  setActivePage: (page: string) => void;
}

export default function ServicesView({ setActivePage }: ServicesViewProps) {
  const capabilities = [
    {
      title: "Content Strategy & Alignment",
      desc: "We analyze your target market, extract your proprietary intellectual methodologies, and construct a bespoke monthly content matrix matching your corporate vision.",
      icon: <Layers size={22} className="text-brand-coral" />,
      features: ["Methodology extraction audits", "Target partner alignment mapping", "Platform cadence configuration", "Custom topic taxonomy modeling"]
    },
    {
      title: "Handcrafted Visual Carousels",
      desc: "Stop using boring bullet-point walls. Our designers construct high-contrast, premium visual slides and vector graphics that stand out on crowded professional grids.",
      icon: <Sparkles size={22} className="text-brand-coral" />,
      features: ["Custom visual direction guidelines", "Original graphic assets (no stocks)", "High-converting copy layouts", "Optimized PDF slider files"]
    },
    {
      title: "Thought Leadership Essays",
      desc: "We ghostwrite comprehensive essays and long-form newsletters (Substack, LinkedIn articles, Beehiiv) to cement your absolute intellectual authority in your domain.",
      icon: <FileText size={22} className="text-brand-coral" />,
      features: ["Deep research-driven ghostwriting", "Structured executive narratives", "Newsletter design & layouts", "Authority funnel coordination"]
    },
    {
      title: "Twitter/X Thread Orchestration",
      desc: "Capture rapid, organic engagement loops. We design elegant threads analyzing macro market moves, company case studies, and strategic advice.",
      icon: <Zap size={22} className="text-brand-coral" />,
      features: ["Hook-optimization matrices", "Story-driven narrative structures", "Formatting optimized for X engagement", "Thread-publishing automation"]
    },
    {
      title: "The 14-Day Approval Board",
      desc: "A streamlined client approval interface. Zero complicated logins. Check copy, examine slide previews, leave feedback, and approve in a single tap.",
      icon: <RefreshCw size={22} className="text-brand-coral" />,
      features: ["Mobile-optimized interface", "No account credentials required", "One-tap approvals & revisions", "Active collaboration timelines"]
    },
    {
      title: "Monthly Authority Audits",
      desc: "We do not just publish and hope. Every 30 days, we run detailed performance analytics auditing audience growth, profile views, and warm lead capture metrics.",
      icon: <TrendingUp size={22} className="text-brand-coral" />,
      features: ["Inbound lead attribution tracking", "Content resonance heatmapping", "Algorithm adjustment updates", "Quarterly strategy revision syncs"]
    }
  ];

  return (
    <div className="pt-32 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20 grid-paper">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3 py-1.5 rounded-full">
            Services & Capabilities
          </span>
          <h1 className="font-serif font-semibold text-4xl sm:text-6xl text-brand-charcoal tracking-tight mt-6 mb-6 leading-tight">
            Elite content strategy and brand presence
          </h1>
          <p className="text-brand-stone/75 text-base sm:text-lg leading-relaxed">
            We do not sell standard templates or automated scheduling. We build cohesive visual engines and authority strategies that earn premium trust from target clients on complete autopilot.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {capabilities.map((cap, i) => (
            <div key={i} className="editorial-card bg-white p-8 border border-brand-charcoal/5 flex flex-col justify-between hover:border-brand-coral/25 transition-all duration-300 shadow-xs">
              <div>
                <div className="p-3 bg-brand-coral/5 border border-brand-coral/10 text-brand-coral rounded-xl w-fit mb-6">
                  {cap.icon}
                </div>
                <h3 className="font-serif font-semibold text-2xl text-brand-charcoal tracking-tight mb-3">
                  {cap.title}
                </h3>
                <p className="text-sm text-brand-stone/70 leading-relaxed mb-6">
                  {cap.desc}
                </p>
              </div>

              <div className="border-t border-brand-charcoal/5 pt-5 space-y-2.5">
                {cap.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-brand-stone/75 font-semibold">
                    <Check size={12} className="text-brand-coral shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Showcase */}
        <div className="editorial-card bg-white border border-brand-charcoal/5 p-8 md:p-12 relative overflow-hidden mb-16 shadow-md">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-coral/5 rounded-full filter blur-[100px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3 py-1.5 rounded-full">
                The Approval Board
              </span>
              <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-brand-charcoal mt-6 mb-4 tracking-tight leading-tight">
                Your creative pipeline on absolute rails
              </h2>
              <p className="text-sm text-brand-stone/75 leading-relaxed font-normal mb-6">
                Busy founders don't want to learn confusing software, handle messy file shares, or manage endless threads.
              </p>
              <p className="text-sm text-brand-stone/75 leading-relaxed font-normal mb-6">
                Our proprietary 14-day client pipeline lets you review ready-to-publish graphic slides, Twitter essays, and LinkedIn copy from your mobile browser in seconds. Review, leave feedback, or approve with one tap.
              </p>
              <button 
                onClick={() => setActivePage("contact")} 
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-brand-coral text-white text-xs font-bold tracking-wide hover:bg-brand-coral/95 transition-all shadow-md shadow-brand-coral/10 cursor-pointer"
              >
                Request Strategy Blueprint
                <ArrowRight size={12} />
              </button>
            </div>

            <div className="lg:col-span-7 rounded-2xl bg-brand-cream border border-brand-charcoal/5 p-6 space-y-4 font-sans text-xs shadow-xs">
              <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-3">
                <span className="font-mono text-brand-stone/40 font-bold">[PREVIEW PORTAL]</span>
                <span className="font-mono text-brand-coral uppercase text-[10px] tracking-wider font-extrabold bg-brand-coral/5 px-2 py-0.5 rounded-full">
                  1-Tap Approved
                </span>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white border border-brand-charcoal/5 flex items-start gap-3 shadow-xs">
                  <span className="p-2 rounded-lg bg-brand-coral/5 text-brand-coral border border-brand-coral/10 mt-0.5 font-bold font-mono text-[10px]">#Z-841</span>
                  <div>
                    <h4 className="font-serif font-semibold text-lg text-brand-charcoal mb-1">LinkedIn Strategy Deconstruction Carousel</h4>
                    <p className="text-xs text-brand-stone/70 leading-relaxed mb-2">Slide cover: "The Silent Loss: Why Silence is Costing You Inbound Trust". Custom visual style: Minimal light cream layout, high-end editorial fonts.</p>
                    <span className="text-[10px] font-sans font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      Approved for Publishing (Jul 12)
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-brand-charcoal/5 flex items-start gap-3 shadow-xs">
                  <span className="p-2 rounded-lg bg-brand-coral/5 text-brand-coral border border-brand-coral/10 mt-0.5 font-bold font-mono text-[10px]">#Z-842</span>
                  <div>
                    <h4 className="font-serif font-semibold text-lg text-brand-charcoal mb-1">Weekly Thought Essay for Substack</h4>
                    <p className="text-xs text-brand-stone/70 leading-relaxed mb-2">Title: "Bespoke Trust in the Age of AI-Slop: The Sophisticated Buyer Standard". Focus: Elite brand positioning and customer alignment.</p>
                    <span className="text-[10px] font-sans font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      Approved for Publishing (Jul 15)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
