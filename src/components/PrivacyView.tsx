import React from "react";

export default function PrivacyView() {
  return (
    <div className="pt-32 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20 grid-paper">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3 py-1.5 rounded-full">Privacy & Trust</span>
        <h1 className="font-serif font-semibold text-4xl sm:text-5xl text-brand-charcoal tracking-tight mt-6 mb-8 leading-tight">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-brand-stone/50 mb-8 font-bold">Last Updated: July 4, 2026</p>

        <div className="space-y-8 text-sm text-brand-stone/75 leading-relaxed max-w-3xl font-medium">
          <section className="space-y-3">
            <h2 className="font-serif font-semibold text-xl text-brand-charcoal">1. Information We Capture</h2>
            <p>
              We collect information you explicitly provide inside our Lead Intake Registry or Copywriter tool, including name, business name, email addresses, phone number, and brief contextual details.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-semibold text-xl text-brand-charcoal">2. Operational Discretion</h2>
            <p>
              We treat your operational details with extreme caution. Your private business challenges, strategic goals, email lists, and client roster details are protected. We never sell, rent, or lease client data to third-party list builders.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-semibold text-xl text-brand-charcoal">3. Third-Party Integrations</h2>
            <p>
              When leads submit briefs, their data is logged securely inside our database. If configured, data can be securely bridged to your designated Slack or CRM pipelines using standard HTTPS protocols.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-semibold text-xl text-brand-charcoal">4. Cookies & Log Files</h2>
            <p>
              We use standard cookies to maintain session tokens for our administrative login dashboard. Anonymous analytics are captured to optimize website performance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-semibold text-xl text-brand-charcoal">5. Security Actions</h2>
            <p>
              We implement industry-standard database encryption, sanitization audits, and token verification layers to protect your inputs and session integrity.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
