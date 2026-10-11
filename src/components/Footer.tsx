import React from "react";
import Logo from "./Logo";
import { Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  setActivePage: (page: string) => void;
  settings?: {
    contactEmail: string;
    contactPhone: string;
    officeAddress: string;
    tagline: string;
  };
}

export default function Footer({ setActivePage, settings }: FooterProps) {
  const defaultSettings = {
    tagline: "Your expertise should be visible, even when you're busy running the business.",
    contactEmail: "audit@zelvora.studio",
    partnershipEmail: "partnership@zelvora.studio",
    officeAddress: "Digital Editorial Studio • Operating Globally"
  };

  const s = settings ? { ...defaultSettings, ...settings } : defaultSettings;

  const handleNav = (pageId: string) => {
    setActivePage(pageId);
  };

  return (
    <footer className="bg-white border-t border-brand-charcoal/8 pt-20 pb-12 text-sm text-brand-stone/75">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <Logo />
          <p className="text-brand-stone/75 leading-relaxed font-sans max-w-xs text-xs">
            {s.tagline}
          </p>
          <div className="text-[11px] font-mono text-brand-stone/60">
            A specialized executive content & brand-visibility unit of Zelvora AI.
          </div>
          <div className="flex flex-wrap gap-2">
            {["LinkedIn", "Twitter/X", "Substack", "Newsletters"].map((network) => (
              <span
                key={network}
                className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-brand-charcoal/10 bg-brand-cream/65 text-brand-stone select-none"
              >
                {network}
              </span>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-sans font-extrabold text-brand-charcoal tracking-wider uppercase text-xs mb-6">Studio</h4>
          <ul className="flex flex-col gap-3 font-sans text-xs font-medium text-brand-stone/80">
            <li><button onClick={() => handleNav("about")} className="hover:text-brand-coral transition-colors cursor-pointer">About Studio</button></li>
            <li><button onClick={() => handleNav("portfolio")} className="hover:text-brand-coral transition-colors cursor-pointer">Work Samples</button></li>
            <li><button onClick={() => handleNav("pricing")} className="hover:text-brand-coral transition-colors cursor-pointer">Investment & Scopes</button></li>
            <li><button onClick={() => handleNav("process")} className="hover:text-brand-coral transition-colors cursor-pointer">Editorial Workflow</button></li>
            <li><button onClick={() => handleNav("contact")} className="text-brand-coral font-bold hover:underline cursor-pointer">Request Private Audit</button></li>
          </ul>
        </div>

        {/* Services & Industries */}
        <div>
          <h4 className="font-sans font-extrabold text-brand-charcoal tracking-wider uppercase text-xs mb-6">Capabilities</h4>
          <ul className="flex flex-col gap-3 font-sans text-xs font-medium text-brand-stone/80">
            <li><button onClick={() => handleNav("services")} className="hover:text-brand-coral transition-colors cursor-pointer">Executive Ghostwriting</button></li>
            <li><button onClick={() => handleNav("services")} className="hover:text-brand-coral transition-colors cursor-pointer">Typographic Carousels</button></li>
            <li><button onClick={() => handleNav("services")} className="hover:text-brand-coral transition-colors cursor-pointer">Executive Newsletters</button></li>
            <li><button onClick={() => handleNav("industries")} className="hover:text-brand-coral transition-colors cursor-pointer">Boutique Consultancies</button></li>
            <li><button onClick={() => handleNav("industries")} className="hover:text-brand-coral transition-colors cursor-pointer">Advisory Partnerships</button></li>
          </ul>
        </div>

        {/* Reach Us Column */}
        <div className="flex flex-col gap-5">
          <h4 className="font-sans font-extrabold text-brand-charcoal tracking-wider uppercase text-xs mb-1">Editorial Desk</h4>
          <div className="flex flex-col gap-3.5 font-sans text-xs font-medium text-brand-stone/80">
            <a href="mailto:audit@zelvora.studio" className="flex items-center gap-3 hover:text-brand-coral transition-colors">
              <span className="p-2 rounded-lg bg-brand-coral/5 text-brand-coral border border-brand-coral/10">
                <Mail size={13} />
              </span>
              <div>
                <span className="block font-bold text-brand-charcoal">Audit Desk</span>
                <span>audit@zelvora.studio</span>
              </div>
            </a>
            <a href="mailto:partnership@zelvora.studio" className="flex items-center gap-3 hover:text-brand-coral transition-colors">
              <span className="p-2 rounded-lg bg-brand-coral/5 text-brand-coral border border-brand-coral/10">
                <Mail size={13} />
              </span>
              <div>
                <span className="block font-bold text-brand-charcoal">Partnership Desk</span>
                <span>partnership@zelvora.studio</span>
              </div>
            </a>
            <div className="flex items-start gap-3 text-brand-stone/60 pt-1">
              <span className="p-2 rounded-lg bg-brand-charcoal/5 text-brand-stone border border-brand-charcoal/10 shrink-0">
                <MapPin size={13} />
              </span>
              <div>
                <span className="block font-bold text-brand-charcoal">Operating Model</span>
                <span>Distributed Editorial Desk &bull; 24h SLA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-brand-charcoal/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-brand-stone/50 font-medium">
        <div>
          &copy; {new Date().getFullYear()} Zelvora Studio. All rights reserved.
        </div>
        <div className="flex flex-wrap gap-5 items-center">
          <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-brand-coral transition-colors font-mono text-[11px] text-brand-stone/60">
            [llms.txt]
          </a>
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-brand-coral transition-colors font-mono text-[11px] text-brand-stone/60">
            [sitemap.xml]
          </a>
          <button onClick={() => handleNav("privacy")} className="hover:text-brand-coral transition-colors cursor-pointer">Privacy Architecture</button>
          <button onClick={() => handleNav("terms")} className="hover:text-brand-coral transition-colors cursor-pointer">Terms of Creative Service</button>
          <button onClick={() => handleNav("admin-login")} className="hover:text-brand-coral transition-colors cursor-pointer font-mono text-[11px] text-brand-stone/50">
            [Staff Console]
          </button>
        </div>
      </div>
    </footer>
  );
}
