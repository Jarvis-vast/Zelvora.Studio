import React, { useState } from "react";
import { Send, CheckCircle2, Shield, AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ContactView() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("Coaching / Consulting");
  const [message, setMessage] = useState("");
  const [contactMethod, setContactMethod] = useState("email");
  const [budget, setBudget] = useState("$2,500 - $5,000 / mo");
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !business || !email) {
      setError("Please complete all required fields (Name, Business Name, and Email Address).");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          business,
          email,
          phone,
          industry,
          message,
          contactMethod,
          budget
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSuccess(true);
        // Clear Form fields
        setName("");
        setBusiness("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setError(data.error || "Failed to submit lead registration.");
      }
    } catch (err) {
      setError("Network communication error. Unable to reach Zelvora partner desk.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20 grid-paper">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Contact Info Column */}
        <div className="lg:col-span-5 flex flex-col justify-between py-2">
          <div>
            <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3 py-1.5 rounded-full">
              Partner With Us
            </span>
            <h1 className="font-serif font-semibold text-4xl sm:text-5xl text-brand-charcoal tracking-tight mt-6 mb-6 leading-tight">
              Claim Your Visibility Edge
            </h1>
            <p className="text-brand-stone/75 text-sm leading-relaxed mb-8">
              Complete the intake brief. Our strategy team will research your digital footprint, audit your top competitors, and coordinate a personalized content playbook for our strategy sync.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <span className="p-3 bg-brand-coral/5 border border-brand-coral/10 text-brand-coral rounded-xl shrink-0">
                  <Shield size={18} />
                </span>
                <div>
                  <h4 className="font-serif font-semibold text-lg text-brand-charcoal">Confidentiality Assured</h4>
                  <p className="text-xs text-brand-stone/70 leading-relaxed font-sans mt-1">
                    We maintain absolute operational silence. None of your internal strategic playbooks or publishing details are shared publicly.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="p-3 bg-brand-coral/5 border border-brand-coral/10 text-brand-coral rounded-xl shrink-0">
                  <CheckCircle2 size={18} />
                </span>
                <div>
                  <h4 className="font-serif font-semibold text-lg text-brand-charcoal">Complimentary Audit</h4>
                  <p className="text-xs text-brand-stone/70 leading-relaxed font-sans mt-1">
                    Your brief includes a complimentary profile visibility score and a curated, custom copywriting sample tailored to your firm.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-brand-charcoal/5 mt-8 text-xs font-mono text-brand-stone/50 flex flex-col gap-1.5 font-semibold">
            <div>Studio Desk: San Francisco, California</div>
            <div>Inquiries: partnership@zelvora.studio</div>
          </div>
        </div>

        {/* Lead Intake Form Column */}
        <div className="lg:col-span-7">
          <div className="editorial-card bg-white rounded-2xl border border-brand-charcoal/5 p-6 sm:p-8 shadow-md relative overflow-hidden">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center flex flex-col items-center justify-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 size={36} className="animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif font-semibold text-2xl text-brand-charcoal tracking-tight">Brief Secured Successfully</h3>
                    <p className="text-xs text-brand-stone/70 font-sans max-w-sm mx-auto leading-relaxed">
                      Thank you. Your firm details have been logged. Our brand strategists have begun auditing your digital channels. We will email you with your custom audit date within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-xs font-sans font-bold text-brand-coral hover:underline cursor-pointer"
                  >
                    Submit another intake brief
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <h3 className="font-serif font-semibold text-2xl text-brand-charcoal tracking-tight mb-2">Lead Intake Registry</h3>
                  
                  {error && (
                    <div className="p-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs flex items-start gap-3">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-brand-stone/60 mb-1.5 font-bold">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Marcus Jenkins"
                        className="w-full px-4 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/40 text-sm text-brand-charcoal placeholder:text-brand-stone/40 focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-brand-stone/60 mb-1.5 font-bold">Business Name *</label>
                      <input
                        type="text"
                        required
                        value={business}
                        onChange={(e) => setBusiness(e.target.value)}
                        placeholder="e.g. Jenkins Executive Advisory"
                        className="w-full px-4 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/40 text-sm text-brand-charcoal placeholder:text-brand-stone/40 focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-brand-stone/60 mb-1.5 font-bold">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="marcus@advisor.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/40 text-sm text-brand-charcoal placeholder:text-brand-stone/40 focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-brand-stone/60 mb-1.5 font-bold">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000 (Optional)"
                        className="w-full px-4 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/40 text-sm text-brand-charcoal placeholder:text-brand-stone/40 focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-brand-stone/60 mb-1.5 font-bold">Industry Vertical</label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/40 text-sm text-brand-charcoal focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans font-medium"
                      >
                        <option value="Coaching / Consulting" className="bg-white text-brand-charcoal">Coaching & Advisors</option>
                        <option value="Real Estate" className="bg-white text-brand-charcoal">Luxury Real Estate</option>
                        <option value="Finance & Wealth" className="bg-white text-brand-charcoal">Wealth Management</option>
                        <option value="Legal & Advisory" className="bg-white text-brand-charcoal">Law / Legal Partners</option>
                        <option value="Technology & Startups" className="bg-white text-brand-charcoal">Technology & Startups</option>
                        <option value="Medical & Aesthetics" className="bg-white text-brand-charcoal">Medical Clinic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-brand-stone/60 mb-1.5 font-bold">Target Budget Limit</label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/40 text-sm text-brand-charcoal focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans font-medium"
                      >
                        <option value="$1,500 - $2,500 / mo" className="bg-white text-brand-charcoal">$1,500 - $2,500 / mo</option>
                        <option value="$2,500 - $5,000 / mo" className="bg-white text-brand-charcoal">$2,500 - $5,000 / mo</option>
                        <option value="$5,000 - $10,000 / mo" className="bg-white text-brand-charcoal">$5,000 - $10,000 / mo</option>
                        <option value="$10,000+ / mo" className="bg-white text-brand-charcoal">$10,000+ / mo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-brand-stone/60 mb-1.5 font-bold">Preferred Contact Method</label>
                    <div className="flex gap-6 mt-2 font-sans text-xs">
                      {["email", "phone", "Slack DM"].map((method) => (
                        <label key={method} className="flex items-center gap-2 cursor-pointer text-brand-stone/80 font-semibold">
                          <input
                            type="radio"
                            name="contactMethod"
                            value={method}
                            checked={contactMethod === method}
                            onChange={() => setContactMethod(method)}
                            className="text-brand-coral focus:ring-brand-coral bg-brand-cream/40 border-brand-charcoal/10"
                          />
                          <span className="capitalize">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-brand-stone/60 mb-1.5 font-bold">Core Business Challenge / Vision</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. We close high-ticket coaching programs but have no consistent visual posts on LinkedIn..."
                      className="w-full px-4 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/40 text-sm text-brand-charcoal placeholder:text-brand-stone/40 focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans resize-none font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-coral hover:bg-brand-coral/95 text-white rounded-full text-xs font-extrabold tracking-widest uppercase shadow-md shadow-brand-coral/15 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        Logging brief data...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Claim Complimentary Strategy Audit
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
