import React from "react";
import { Check, Shield, ArrowRight } from "lucide-react";
import { PricingPlan } from "../types";

interface PricingViewProps {
  pricing: PricingPlan[];
  setActivePage: (page: string) => void;
}

export default function PricingView({ pricing, setActivePage }: PricingViewProps) {
  return (
    <div className="pt-32 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20 grid-paper">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3 py-1.5 rounded-full">
            Pricing Architecture
          </span>
          <h1 className="font-serif font-semibold text-4xl sm:text-6xl text-brand-charcoal tracking-tight mt-6 mb-6 leading-tight">
            Invest in Autopilot Authority
          </h1>
          <p className="text-brand-stone/75 text-base sm:text-lg leading-relaxed">
            Choose the operational output your personal brand requires. Zero lock-in commitments, absolute handcrafted excellence guaranteed. We act as your private visibility studio.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
          {pricing.map((plan) => (
            <div
              key={plan.id}
              className={`editorial-card rounded-2xl p-8 border relative flex flex-col justify-between transition-all duration-300 ${
                plan.isPopular
                  ? "border-brand-coral/40 shadow-xl shadow-brand-coral/5 bg-[#FFFBF8] scale-[1.01]"
                  : "border-brand-charcoal/5 bg-white hover:border-brand-coral/25"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-coral text-white font-sans text-[10px] font-extrabold tracking-wider uppercase px-4 py-1.5 rounded-full border border-brand-coral/20">
                  Most Popular Choice
                </span>
              )}

              <div>
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-brand-stone/50 block mb-2">{plan.name}</span>
                <div className="flex items-baseline gap-1.5 mb-4">
                  <span className="font-serif font-bold text-4xl sm:text-5xl text-brand-charcoal">{plan.price}</span>
                  <span className="text-brand-stone/50 text-xs font-mono uppercase">/ {plan.period}</span>
                </div>
                <p className="text-xs text-brand-stone/70 leading-relaxed font-sans mb-8 font-medium">
                  {plan.description}
                </p>

                <div className="h-[1px] bg-brand-charcoal/5 my-6" />

                <div className="space-y-4 mb-8">
                  <span className="text-[10px] font-sans text-brand-stone/50 uppercase tracking-wider block font-extrabold">Features Included:</span>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-brand-stone/75 font-semibold leading-snug">
                      <Check size={14} className="text-brand-coral shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActivePage("contact")}
                className={`w-full py-3.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  plan.isPopular
                    ? "bg-brand-coral hover:bg-brand-coral/95 text-white shadow-md shadow-brand-coral/15"
                    : "bg-brand-charcoal/5 border border-brand-charcoal/10 hover:bg-brand-charcoal/10 text-brand-charcoal font-bold"
                }`}
              >
                <span>Book Onboarding Call</span>
                <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* Trust Seal Banner */}
        <div className="editorial-card bg-white border border-brand-charcoal/5 p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-left relative overflow-hidden shadow-sm">
          <div className="p-4 bg-brand-coral/5 border border-brand-coral/10 text-brand-coral rounded-full shrink-0">
            <Shield size={26} />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif font-semibold text-lg text-brand-charcoal">The Zelvora No-Contract Guarantee</h4>
            <p className="text-xs text-brand-stone/70 leading-relaxed font-sans">
              We operate purely on rolling monthly agreements. No rigid annual sign-ups, no hidden activation fees, no exit penalties. We earn your trust month after month through immaculate visual slides and written narrative output.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
