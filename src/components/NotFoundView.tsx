import React from "react";
import { AlertCircle, ArrowRight } from "lucide-react";

interface NotFoundViewProps {
  setActivePage: (page: string) => void;
}

export default function NotFoundView({ setActivePage }: NotFoundViewProps) {
  return (
    <div className="pt-32 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen flex items-center justify-center grid-paper">
      <div className="max-w-md px-6 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-brand-coral/5 border border-brand-coral/10 text-brand-coral flex items-center justify-center mx-auto">
          <AlertCircle size={32} />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif font-extrabold text-7xl tracking-tight text-brand-charcoal">404</h1>
          <h2 className="font-serif font-semibold text-xl text-brand-charcoal">Page Not Found</h2>
          <p className="text-xs text-brand-stone/75 leading-relaxed max-w-xs mx-auto font-medium">
            The resource, case study, or strategic asset you are attempting to audit does not exist on our servers. Let's return to active coordinates.
          </p>
        </div>
        <button
          onClick={() => setActivePage("home")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-coral hover:bg-brand-coral/95 text-white text-xs font-extrabold tracking-widest uppercase rounded-full transition-all shadow-md shadow-brand-coral/15 hover:scale-[1.01] cursor-pointer"
        >
          <span>Return Home</span>
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}
