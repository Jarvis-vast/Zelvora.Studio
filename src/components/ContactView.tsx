import React, { useState } from "react";
import { Send, CheckCircle2, Shield, AlertCircle, RefreshCw, FileText, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ContactView() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("Boutique Management Consulting");
  const [channelFocus, setChannelFocus] = useState("LinkedIn Executive Profile");
  const [message, setMessage] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !business.trim() || !email.trim()) {
      setError("Please complete all required fields (Full Name, Firm Name, and Work Email Address).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid work email address (e.g. partner@firm.com).");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const fullMessage = `Primary Channel Focus: ${channelFocus}\n\nVisibility Challenge / Goals:\n${message || "Requested 48-Hour Private Visibility Audit and Benchmark Review."}`;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          business: business.trim(),
          email: email.trim(),
          phone: phone.trim() || "Not provided",
          industry,
          message: fullMessage,
          contactMethod: "email",
          budget: "Private Visibility Audit Request",
          _gotcha: honeypot
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSuccess(true);
        setName("");
        setBusiness("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setError(data.error || "Failed to submit audit request. Please try again.");
      }
    } catch (err) {
      setError("Network communication error. Unable to reach Zelvora editorial desk.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Information Column */}
        <div className="lg:col-span-5 flex flex-col justify-between py-4 space-y-8">
          <div>
            <span className="text-xs font-mono font-bold text-brand-coral uppercase tracking-wider bg-brand-coral/5 border border-brand-coral/10 px-3 py-1 rounded-full">
              48-Hour Assessment
            </span>
            <h1 className="font-serif font-semibold text-3xl sm:text-5xl text-brand-charcoal tracking-tight mt-4 mb-5 leading-tight">
              Request a Private Visibility Audit
            </h1>
            <p className="text-brand-stone/80 text-sm leading-relaxed mb-6 font-normal">
              An objective, partner-level review of your firm's current executive footprint. We benchmark your presence against top advisory peers and deliver 2 tailored post concepts.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-brand-charcoal/8 shadow-xs">
                <span className="p-2 bg-brand-coral/5 text-brand-coral rounded-lg shrink-0 mt-0.5">
                  <FileText size={16} />
                </span>
                <div>
                  <h4 className="font-serif font-semibold text-sm text-brand-charcoal">Peer Benchmark Review</h4>
                  <p className="text-xs text-brand-stone/75 leading-relaxed mt-0.5 font-sans">
                    We analyze where your primary competitors are gaining executive traction and identify the exact positioning gaps your practice can exploit.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-brand-charcoal/8 shadow-xs">
                <span className="p-2 bg-brand-coral/5 text-brand-coral rounded-lg shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </span>
                <div>
                  <h4 className="font-serif font-semibold text-sm text-brand-charcoal">2 Bespoke Post Concepts</h4>
                  <p className="text-xs text-brand-stone/75 leading-relaxed mt-0.5 font-sans">
                    Receive one typographic framework carousel outline and one contrarian thought-leadership draft crafted specifically for your target advisory buyers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-brand-charcoal/8 shadow-xs">
                <span className="p-2 bg-brand-coral/5 text-brand-coral rounded-lg shrink-0 mt-0.5">
                  <Shield size={16} />
                </span>
                <div>
                  <h4 className="font-serif font-semibold text-sm text-brand-charcoal">Complete Discretion</h4>
                  <p className="text-xs text-brand-stone/75 leading-relaxed mt-0.5 font-sans">
                    We maintain strict partner-level confidentiality. No outreach to your clients, no public disclosures, no unsolicited sales follow-up loops.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-charcoal/8 text-xs font-mono text-brand-stone/60 space-y-1">
            <div>Editorial Desk: audit@zelvora.studio</div>
            <div>Partnership Enquiries: partnership@zelvora.studio</div>
            <div>SLA: Written Assessment within 48 Hours</div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7">
          <div className="editorial-card bg-white rounded-2xl border border-brand-charcoal/10 p-7 sm:p-9 shadow-md relative overflow-hidden">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-14 text-center flex flex-col items-center justify-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="space-y-2 max-w-md">
                    <h3 className="font-serif font-semibold text-2xl text-brand-charcoal tracking-tight">Audit Request Secured</h3>
                    <p className="text-xs text-brand-stone/75 font-sans leading-relaxed">
                      Thank you. Your practice details have been routed to our senior editorial desk. We have initiated your peer benchmark and will email your written assessment and post concepts within 48 hours.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setSuccess(false)}
                      className="text-xs font-mono font-bold text-brand-coral hover:underline cursor-pointer"
                    >
                      &larr; Submit another inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Invisible Honeypot Field */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>
                  <div className="border-b border-brand-charcoal/8 pb-3 mb-2">
                    <h3 className="font-serif font-semibold text-xl text-brand-charcoal tracking-tight">
                      Confidential Practice Intake
                    </h3>
                    <p className="text-xs text-brand-stone/60 font-sans mt-0.5">
                      Provide your practice details below for a customized editorial evaluation.
                    </p>
                  </div>
                  
                  {error && (
                    <div className="p-3.5 rounded-lg bg-red-50 border border-red-100 text-red-700 text-xs flex items-start gap-2.5">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-stone/70 mb-1 font-bold">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Marcus Vance"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/30 text-xs text-brand-charcoal placeholder:text-brand-stone/40 focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-stone/70 mb-1 font-bold">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="marcus@vanceadvisory.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/30 text-xs text-brand-charcoal placeholder:text-brand-stone/40 focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-stone/70 mb-1 font-bold">Firm Name & Website *</label>
                      <input
                        type="text"
                        required
                        value={business}
                        onChange={(e) => setBusiness(e.target.value)}
                        placeholder="Vance Strategy Partners (vanceadvisory.com)"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/30 text-xs text-brand-charcoal placeholder:text-brand-stone/40 focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-stone/70 mb-1 font-bold">Direct Phone (Optional)</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/30 text-xs text-brand-charcoal placeholder:text-brand-stone/40 focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-stone/70 mb-1 font-bold">Practice Area</label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/30 text-xs text-brand-charcoal focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans"
                      >
                        <option value="Boutique Management Consulting">Boutique Management Consulting</option>
                        <option value="Executive Leadership & Strategy Advisory">Executive Leadership & Strategy Advisory</option>
                        <option value="M&A / Restructuring / Corporate Finance">M&A / Restructuring / Corporate Finance</option>
                        <option value="Specialized Professional Practice">Specialized Professional Practice (Legal/Wealth)</option>
                        <option value="Other Specialist Advisory">Other Specialist Advisory</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-stone/70 mb-1 font-bold">Primary Target Channel</label>
                      <select
                        value={channelFocus}
                        onChange={(e) => setChannelFocus(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/30 text-xs text-brand-charcoal focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans"
                      >
                        <option value="LinkedIn Executive Profile">LinkedIn Executive Profile</option>
                        <option value="Twitter/X Industry Discourse">Twitter/X Industry Discourse</option>
                        <option value="Executive Newsletter / Substack">Executive Newsletter / Substack</option>
                        <option value="Multi-Channel Omnipresence">Multi-Channel Omnipresence</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-stone/70 mb-1 font-bold">Current Visibility Bottleneck / Context</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. We close $50k+ advisory retainers via referrals, but our partners have zero hours to publish. Looking for high-end typographic carousels and ghostwritten viewpoints..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/30 text-xs text-brand-charcoal placeholder:text-brand-stone/40 focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-coral hover:bg-brand-coral/95 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-md shadow-brand-coral/15 transition-all cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw size={13} className="animate-spin" />
                        Routing to Editorial Desk...
                      </>
                    ) : (
                      <>
                        <Send size={13} />
                        Request a Private Visibility Audit
                      </>
                    )}
                  </button>
                  
                  <p className="text-[11px] font-mono text-center text-brand-stone/50 mt-2">
                    Confidential Assessment &bull; Response SLA within 48 Hours &bull; Zero Spam
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
