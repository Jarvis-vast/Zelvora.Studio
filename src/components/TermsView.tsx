import React from "react";

export default function TermsView() {
  return (
    <div className="pt-32 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20 grid-paper">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3 py-1.5 rounded-full">Legal Framework</span>
        <h1 className="font-serif font-semibold text-4xl sm:text-5xl text-brand-charcoal tracking-tight mt-6 mb-8 leading-tight">
          Terms of Creative Service
        </h1>
        <p className="text-xs font-mono text-brand-stone/50 mb-8 font-bold">Last Updated: July 4, 2026</p>

        <div className="space-y-8 text-sm text-brand-stone/75 leading-relaxed max-w-3xl font-medium">
          <section className="space-y-3">
            <h2 className="font-serif font-semibold text-xl text-brand-charcoal">1. Contractual Framework</h2>
            <p>
              By subscribing to or engaging Zelvora Studio ("Zelvora", "we", "us", "our"), you agree to abide by these Terms of Service. These Terms apply to all professional clients, partners, and visitors of our website and client portal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-semibold text-xl text-brand-charcoal">2. Scope of Services</h2>
            <p>
              Zelvora provides outsourced content strategy, digital copywriting, graphic asset design, publication scheduling, and performance analytics representation. The precise deliverables of your plan are defined inside your active visibility subscription invoice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-semibold text-xl text-brand-charcoal">3. Intellectual Property Rights</h2>
            <p>
              Upon successful clearance of monthly payments, all custom written copy and visual assets produced explicitly for your brand become your exclusive property. Zelvora retains the right to reference non-confidential growth metrics and visual layouts in professional portfolios unless explicitly restricted by an NDA.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-semibold text-xl text-brand-charcoal">4. Commitments & Cancellations</h2>
            <p>
              All plans operate on a recurring rolling monthly basis. You can downgrade, upgrade, or cancel your active subscription at any time with a simple 14-day notice emailed to partnership@zelvora.studio prior to your next billing cycle.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-semibold text-xl text-brand-charcoal">5. Liabilities Limit</h2>
            <p>
              Zelvora is not liable for any algorithm alterations, profile restrictions, or business outcomes resulting from publications on third-party channels (LinkedIn, Twitter, Instagram). All content is presented for client review and final authorization inside the approval portal.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
