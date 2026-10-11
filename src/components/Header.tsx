import React, { useState } from "react";
import { Menu, X, Shield, LogOut, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
}

export default function Header({ activePage, setActivePage, isAdminLoggedIn, onLogout }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Overview" },
    { id: "services", label: "Capabilities" },
    { id: "industries", label: "Practice Areas" },
    { id: "process", label: "Workflow" },
    { id: "portfolio", label: "Work Samples" },
    { id: "pricing", label: "Investment" },
    { id: "about", label: "About" }
  ];

  const handleNav = (pageId: string) => {
    setActivePage(pageId);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-brand-charcoal/8 bg-brand-cream/95 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="cursor-pointer" onClick={() => handleNav("home")}>
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`relative px-3.5 py-2 text-xs uppercase tracking-wider font-semibold transition-colors hover:text-brand-charcoal rounded-md cursor-pointer ${
                  isActive ? "text-brand-charcoal bg-brand-charcoal/5 font-bold" : "text-brand-charcoal/65 font-medium"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-brand-coral rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAdminLoggedIn && (
            <div className="flex items-center gap-2 mr-2">
              <button
                onClick={() => handleNav("admin")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-brand-coral/20 bg-brand-coral/5 text-brand-coral hover:bg-brand-coral/10 transition-all cursor-pointer"
              >
                <Shield size={12} />
                Dashboard
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold text-brand-charcoal/60 hover:text-brand-coral hover:bg-brand-charcoal/5 transition-all cursor-pointer"
                title="Log Out Administrator"
              >
                <LogOut size={12} />
              </button>
            </div>
          )}

          <button
            onClick={() => handleNav("contact")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-coral text-white hover:bg-brand-coral/90 shadow-sm shadow-brand-coral/15 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Request Private Audit
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Mobile Hamburguer */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-brand-charcoal/70 hover:text-brand-charcoal p-2"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full border-b border-brand-charcoal/10 bg-brand-cream/95 md:hidden px-6 py-6 flex flex-col gap-4 shadow-lg backdrop-blur-md"
          >
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                      isActive ? "bg-brand-charcoal/5 text-brand-charcoal border-l-2 border-brand-coral" : "text-brand-charcoal/70"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="h-[1px] bg-brand-charcoal/5 my-2" />

            <div className="flex flex-col gap-3">
              {isAdminLoggedIn ? (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleNav("admin")}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm text-brand-coral font-medium"
                  >
                    <Shield size={16} />
                    Admin Dashboard
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="px-4 py-3 text-sm text-brand-stone/60 hover:text-brand-coral"
                  >
                    Sign Out
                  </button>
                </div>
              ) : null}

              <button
                onClick={() => handleNav("contact")}
                className="w-full py-3.5 rounded-full bg-brand-coral text-white font-bold text-xs uppercase tracking-wide text-center flex items-center justify-center gap-2 shadow-md shadow-brand-coral/15"
              >
                Request Private Audit
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
