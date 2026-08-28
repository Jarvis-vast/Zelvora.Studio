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
    tagline: "Run your business. We'll handcraft your premium social media footprint.",
    contactEmail: "partnership@zelvora.studio",
    contactPhone: "+1 (800) 935-8672",
    officeAddress: "600 Montgomery St, San Francisco, CA 94111"
  };

  const s = settings || defaultSettings;

  const handleNav = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-brand-charcoal/5 pt-20 pb-12 text-sm text-brand-stone/75">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <Logo />
          <p className="text-brand-stone/75 leading-relaxed font-sans max-w-xs">
            {s.tagline}
          </p>
          <div className="flex flex-wrap gap-2">
            {["LinkedIn", "Twitter", "Instagram", "Substack"].map((network) => (
              <span
                key={network}
                className="text-xs font-mono px-2.5 py-1 rounded-full border border-brand-charcoal/10 bg-brand-cream/65 text-brand-stone hover:border-brand-coral hover:text-brand-coral transition-colors cursor-pointer select-none"
              >
                {network}
              </span>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-sans font-extrabold text-brand-charcoal tracking-wider uppercase text-xs mb-6">Studio</h4>
          <ul className="flex flex-col gap-3 font-sans font-medium text-brand-stone/80">
            <li><button onClick={() => handleNav("about")} className="hover:text-brand-coral transition-colors cursor-pointer">Our Studio</button></li>
            <li><button onClick={() => handleNav("portfolio")} className="hover:text-brand-coral transition-colors cursor-pointer">Client Records</button></li>
            <li><button onClick={() => handleNav("pricing")} className="hover:text-brand-coral transition-colors cursor-pointer">Creative Plans</button></li>
            <li><button onClick={() => handleNav("contact")} className="hover:text-brand-coral transition-colors cursor-pointer">Start Designing</button></li>
          </ul>
        </div>

        {/* Services & Industries */}
        <div>
          <h4 className="font-sans font-extrabold text-brand-charcoal tracking-wider uppercase text-xs mb-6">Capabilities</h4>
          <ul className="flex flex-col gap-3 font-sans font-medium text-brand-stone/80">
            <li><button onClick={() => handleNav("services")} className="hover:text-brand-coral transition-colors cursor-pointer">Social Strategy</button></li>
            <li><button onClick={() => handleNav("services")} className="hover:text-brand-coral transition-colors cursor-pointer">Creative Decks</button></li>
            <li><button onClick={() => handleNav("services")} className="hover:text-brand-coral transition-colors cursor-pointer">Thought Leadership</button></li>
            <li><button onClick={() => handleNav("industries")} className="hover:text-brand-coral transition-colors cursor-pointer">Coaches & Advisors</button></li>
            <li><button onClick={() => handleNav("industries")} className="hover:text-brand-coral transition-colors cursor-pointer">Elite Specialists</button></li>
          </ul>
        </div>

        {/* Reach Us Column */}
        <div className="flex flex-col gap-5">
          <h4 className="font-sans font-extrabold text-brand-charcoal tracking-wider uppercase text-xs mb-1">Inquiries</h4>
          <div className="flex flex-col gap-3.5 font-sans font-medium text-brand-stone/80">
            <a href={`mailto:${s.contactEmail}`} className="flex items-center gap-3.5 hover:text-brand-coral transition-colors">
              <span className="p-2 rounded-lg bg-brand-coral/5 text-brand-coral border border-brand-coral/10">
                <Mail size={14} />
              </span>
              <span>{s.contactEmail}</span>
            </a>
            <a href={`tel:${s.contactPhone}`} className="flex items-center gap-3.5 hover:text-brand-coral transition-colors">
              <span className="p-2 rounded-lg bg-brand-coral/5 text-brand-coral border border-brand-coral/10">
                <Phone size={14} />
              </span>
              <span>{s.contactPhone}</span>
            </a>
            <div className="flex items-start gap-3.5">
              <span className="p-2 rounded-lg bg-brand-coral/5 text-brand-coral border border-brand-coral/10 shrink-0 mt-0.5">
                <MapPin size={14} />
              </span>
              <span className="leading-relaxed">{s.officeAddress}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-brand-charcoal/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-brand-stone/50 font-medium">
        <div>
          &copy; {new Date().getFullYear()} Zelvora Studio. All rights reserved.
        </div>
        <div className="flex flex-wrap gap-6 items-center">
          <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-brand-coral transition-colors font-mono text-[11px] text-brand-stone/60">
            [llms.txt]
          </a>
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-brand-coral transition-colors font-mono text-[11px] text-brand-stone/60">
            [sitemap.xml]
          </a>
          <button onClick={() => handleNav("privacy")} className="hover:text-brand-coral transition-colors cursor-pointer">Privacy Architecture</button>
          <button onClick={() => handleNav("terms")} className="hover:text-brand-coral transition-colors cursor-pointer">Terms of Creative Service</button>
        </div>
      </div>
    </footer>
  );
}
