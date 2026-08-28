import React, { useState } from "react";
import { Sparkles, ArrowRight, Copy, Check, Sliders, Play, RefreshCw, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CopywriterTool() {
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("Coaching / Consulting");
  const [targetAudience, setTargetAudience] = useState("");
  const [contentType, setContentType] = useState("LinkedIn Educational Carousel");
  const [focusTopic, setFocusTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/gemini/copywriter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          industry,
          targetAudience,
          contentType,
          focusTopic
        })
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setResult(data.text);
      } else {
        setResult(`### Error generating copy assets.\n\n${data.error || "Please verify your server setup and try again."}`);
      }
    } catch (err) {
      setResult("### Communication Failure\n\nUnable to reach Zelvora copywriting endpoint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="editorial-card p-6 md:p-8 bg-white border border-brand-charcoal/5 w-full max-w-4xl mx-auto shadow-lg relative overflow-hidden">
      {/* Absolute ambient light */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-coral/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-pink/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Form Column */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-brand-coral/10 text-brand-coral border border-brand-coral/15">
                <Sparkles size={16} className="animate-pulse" />
              </span>
              <span className="text-xs font-mono text-brand-coral font-bold uppercase tracking-wider">Zelvora Studio Co-Pilot</span>
            </div>
            
            <h3 className="font-serif font-semibold text-2xl text-brand-charcoal tracking-tight mb-2">
              Generate High-End Visibility Assets
            </h3>
            <p className="text-sm text-brand-stone/70 font-sans leading-relaxed mb-6">
              Sample our bespoke content architecture. Outline a dynamic social strategy customized to your exact firm in seconds.
            </p>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-stone/60 mb-1.5 font-bold">Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jenkins Executive Advisory"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/40 text-sm text-brand-charcoal placeholder:text-brand-stone/40 focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-brand-stone/60 mb-1.5 font-bold">Industry Focus</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/40 text-sm text-brand-charcoal focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans font-medium"
                  >
                    <option value="Coaching / Consulting" className="bg-white text-brand-charcoal">Coaching & Advising</option>
                    <option value="Real Estate" className="bg-white text-brand-charcoal">Luxury Real Estate</option>
                    <option value="Finance & Wealth" className="bg-white text-brand-charcoal">Wealth Management</option>
                    <option value="Legal & Advisory" className="bg-white text-brand-charcoal">Law / Advisory Firms</option>
                    <option value="Technology & Startups" className="bg-white text-brand-charcoal">Startups / Technology</option>
                    <option value="Medical & Aesthetics" className="bg-white text-brand-charcoal">Medical Practices</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-brand-stone/60 mb-1.5 font-bold">Content Format</label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/40 text-sm text-brand-charcoal focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans font-medium"
                  >
                    <option value="LinkedIn Educational Carousel" className="bg-white text-brand-charcoal">Educational Carousel</option>
                    <option value="Executive Thought Leadership Essay" className="bg-white text-brand-charcoal">Thought Leadership Essay</option>
                    <option value="High-Impact Social Thread" className="bg-white text-brand-charcoal">Twitter/X Authority Thread</option>
                    <option value="Email Newsletter Curation" className="bg-white text-brand-charcoal">Email Newsletter Campaign</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-stone/60 mb-1.5 font-bold">Target Client Persona</label>
                <input
                  type="text"
                  placeholder="e.g. Venture Capitalists or HNW homeowners (Optional)"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/40 text-sm text-brand-charcoal placeholder:text-brand-stone/40 focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-stone/60 mb-1.5 font-bold">Core Focus Topic</label>
                <input
                  type="text"
                  placeholder="e.g. Time leverage or Scaling infrastructure (Optional)"
                  value={focusTopic}
                  onChange={(e) => setFocusTopic(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/40 text-sm text-brand-charcoal placeholder:text-brand-stone/40 focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !businessName.trim()}
                className={`w-full mt-4 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all ${
                  loading
                    ? "bg-brand-charcoal/5 text-brand-stone/40 cursor-not-allowed border border-brand-charcoal/10"
                    : "bg-brand-coral hover:bg-brand-coral/90 text-white shadow-md shadow-brand-coral/10 cursor-pointer"
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Engineering Creative Blueprint...
                  </>
                ) : (
                  <>
                    <Play size={14} />
                    Generate Strategy Blueprint
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Output Column */}
        <div className="flex-1 flex flex-col border-t lg:border-t-0 lg:border-l border-brand-charcoal/10 pt-6 lg:pt-0 lg:pl-8 justify-between min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase text-brand-stone/50 font-bold tracking-wider">Output Board</span>
            {result && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-charcoal/5 hover:bg-brand-charcoal/10 text-xs text-brand-stone/70 hover:text-brand-charcoal border border-brand-charcoal/10 transition-all cursor-pointer"
                title="Copy contents to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-emerald-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    Copy Copywriting
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex-1 rounded-xl bg-brand-cream/50 border border-brand-charcoal/5 p-5 overflow-y-auto max-h-[360px] text-brand-charcoal font-sans text-xs sm:text-sm leading-relaxed font-normal no-scrollbar">
            <AnimatePresence mode="wait">
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-brand-charcoal/10 rounded w-1/3" />
                  <div className="space-y-2">
                    <div className="h-2.5 bg-brand-charcoal/5 rounded" />
                    <div className="h-2.5 bg-brand-charcoal/5 rounded" />
                    <div className="h-2.5 bg-brand-charcoal/5 rounded w-5/6" />
                  </div>
                  <div className="h-4 bg-brand-charcoal/10 rounded w-1/4 pt-4" />
                  <div className="space-y-2">
                    <div className="h-2.5 bg-brand-charcoal/5 rounded" />
                    <div className="h-2.5 bg-brand-charcoal/5 rounded w-3/4" />
                  </div>
                </div>
              ) : result ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-pre-wrap space-y-2"
                >
                  {result}
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 text-brand-stone/50">
                  <Layers size={32} className="text-brand-stone/30 mb-3" />
                  <p className="font-sans text-sm font-bold text-brand-charcoal">No strategy generated yet.</p>
                  <p className="font-sans text-xs max-w-xs mt-1.5 leading-relaxed">
                    Fill out the form on the left and trigger the blueprint tool to preview custom handcrafted deliverables.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 text-[10px] font-mono text-brand-stone/50 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-coral" />
            <span>Powering real-time copywriting with server-side Gemini 3.5 Flash</span>
          </div>
        </div>
      </div>
    </div>
  );
}
