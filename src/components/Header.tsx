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
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "industries", label: "Industries" },
    { id: "process", label: "Process" },
    { id: "portfolio", label: "Portfolio" },
    { id: "pricing", label: "Pricing" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" }
  ];

  const handleNav = (pageId: string) => {
    setActivePage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-brand-charcoal/5 bg-brand-cream/90 backdrop-blur-md shadow-xs">
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
                className={`relative px-4 py-2 text-sm font-semibold transition-colors hover:text-brand-charcoal rounded-md ${
                  isActive ? "text-brand-charcoal bg-brand-charcoal/5" : "text-brand-charcoal/60"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-1 left-4 right-4 h-[2px] bg-brand-coral rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAdminLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav("admin")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-brand-coral/20 bg-brand-coral/5 text-brand-coral hover:bg-brand-coral/10 transition-all"
              >
                <Shield size={12} />
                Dashboard
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-brand-charcoal/60 hover:text-brand-coral hover:bg-brand-charcoal/5 transition-all"
                title="Log Out Administrator"
              >
                <LogOut size={12} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNav("admin-login")}
              className="text-xs font-mono text-brand-stone/50 hover:text-brand-coral transition-colors px-2 py-1"
            >
              [Admin Login]
            </button>
          )}

          <button
            onClick={() => handleNav("contact")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-brand-coral text-white hover:bg-brand-coral/90 shadow-md shadow-brand-coral/10 hover:shadow-brand-coral/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Get Content Plan
            <ArrowRight size={14} />
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
              ) : (
                <button
                  onClick={() => handleNav("admin-login")}
                  className="text-left text-xs font-mono text-brand-stone/50 hover:text-brand-coral px-4 py-2"
                >
                  [Admin Console Login]
                </button>
              )}

              <button
                onClick={() => handleNav("contact")}
                className="w-full py-3 rounded-lg bg-brand-coral text-white font-semibold text-center flex items-center justify-center gap-2"
              >
                Get Content Plan
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
