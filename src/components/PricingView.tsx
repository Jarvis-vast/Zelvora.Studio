import React from "react";
import { Check, Shield, ArrowRight } from "lucide-react";
import { PricingPlan } from "../types";

interface PricingViewProps {
  pricing: PricingPlan[];
  setActivePage: (page: string) => void;
}

export default function PricingView({ pricing, setActivePage }: PricingViewProps) {
  return (
    <div className="pt-28 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold text-brand-coral uppercase tracking-wider bg-brand-coral/5 border border-brand-coral/10 px-3 py-1 rounded-full">
            Transparent Investment Architecture
          </span>
          <h1 className="font-serif font-semibold text-3xl sm:text-5xl text-brand-charcoal tracking-tight mt-4 mb-4 leading-tight">
            Predictable Scopes. Zero Lock-In.
          </h1>
          <p className="text-brand-stone/75 text-sm sm:text-base leading-relaxed">
            Choose the operational output your practice requires. Rolling monthly engagements with no annual lock-in contracts. You retain 100% ownership of all published content and visual assets.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {pricing.map((plan) => (
            <div
              key={plan.id}
              className={`editorial-card rounded-2xl p-8 border relative flex flex-col justify-between transition-all duration-300 ${
                plan.isPopular
                  ? "border-brand-coral/40 shadow-xl bg-[#FFFDFB] scale-[1.01]"
                  : "border-brand-charcoal/8 bg-white hover:border-brand-coral/25"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-coral text-white font-mono text-[10px] font-bold tracking-wider uppercase px-3.5 py-1 rounded-full border border-brand-coral/20">
                  Signature Advisory Tier
                </span>
              )}

              <div>
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-brand-stone/50 block mb-2">{plan.name}</span>
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="font-serif font-bold text-4xl text-brand-charcoal">{plan.price}</span>
                  <span className="text-brand-stone/50 text-xs font-mono uppercase">/ {plan.period}</span>
                </div>
                <p className="text-xs text-brand-stone/75 leading-relaxed font-sans mb-6">
                  {plan.description}
                </p>

                <div className="h-[1px] bg-brand-charcoal/5 my-4" />

                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-mono text-brand-stone/50 uppercase tracking-wider block font-bold">Scope Includes:</span>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-brand-stone/80 font-medium">
                      <Check size={13} className="text-brand-coral shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() => setActivePage("contact")}
                  className={`w-full py-3.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.isPopular
                      ? "bg-brand-coral hover:bg-brand-coral/95 text-white shadow-md shadow-brand-coral/15"
                      : "bg-brand-charcoal/5 border border-brand-charcoal/10 hover:bg-brand-charcoal/10 text-brand-charcoal"
                  }`}
                >
                  <span>Request Private Audit</span>
                  <ArrowRight size={12} />
                </button>
                <p className="text-[10px] font-mono text-center text-brand-stone/50 mt-2">
                  Audit includes tier fit assessment
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Seal Banner */}
        <div className="editorial-card bg-white border border-brand-charcoal/8 p-8 max-w-4xl mx-auto rounded-2xl flex flex-col sm:flex-row items-center gap-6 text-left shadow-xs">
          <div className="p-3.5 bg-brand-coral/5 border border-brand-coral/10 text-brand-coral rounded-xl shrink-0">
            <Shield size={24} />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif font-semibold text-lg text-brand-charcoal">The Rolling Monthly Guarantee</h4>
            <p className="text-xs text-brand-stone/75 leading-relaxed font-sans">
              We operate exclusively on rolling monthly commitments with 14-day notice to pause or adjust. No predatory lock-in retainers, no exit hurdles. We earn your partnership every single month through impeccable executive copywriting, typographic design, and visible authority compounding.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
