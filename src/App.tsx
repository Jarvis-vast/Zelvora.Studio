import React, { useState, useEffect } from "react";
import { FAQ, PortfolioItem, Blog, PricingPlan, WebsiteSettings } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Views
import HomeView from "./components/HomeView";
import ServicesView from "./components/ServicesView";
import IndustriesView from "./components/IndustriesView";
import ProcessView from "./components/ProcessView";
import PortfolioView from "./components/PortfolioView";
import PricingView from "./components/PricingView";
import AboutView from "./components/AboutView";
import ContactView from "./components/ContactView";
import BlogView from "./components/BlogView";
import TermsView from "./components/TermsView";
import PrivacyView from "./components/PrivacyView";
import NotFoundView from "./components/NotFoundView";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const getPageFromPath = (path: string): string => {
    const cleanPath = path.toLowerCase().replace(/^\/|\/$/g, "");
    if (!cleanPath || cleanPath === "home") return "home";
    if (cleanPath === "audit" || cleanPath === "contact" || cleanPath === "inquiry") return "contact";
    if (cleanPath === "insights" || cleanPath === "blog") return "blog";
    if (cleanPath === "login" || cleanPath === "admin-login") return "admin-login";
    const validPages = ["services", "industries", "process", "portfolio", "pricing", "about", "terms", "privacy", "admin"];
    if (validPages.includes(cleanPath)) return cleanPath;
    return "home";
  };

  const [activePage, setActivePageState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return getPageFromPath(window.location.pathname);
    }
    return "home";
  });
  const [adminToken, setAdminToken] = useState<string | null>(null);

  // Navigate function that pushes browser history
  const setActivePage = (page: string, pushHistory = true) => {
    setActivePageState(page);
    if (pushHistory && typeof window !== "undefined") {
      const targetPath = page === "home" ? "/" : `/${page}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ page }, "", targetPath);
      }
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Sync with browser navigation (Back/Forward)
  useEffect(() => {
    const handlePopState = () => {
      const pageFromUrl = getPageFromPath(window.location.pathname);
      setActivePageState(pageFromUrl);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Update document title per page
  useEffect(() => {
    const titleMap: Record<string, string> = {
      home: "Zelvora Studio — Outsourced Executive Content & Visibility for Advisory Firms",
      contact: "Request a Private Visibility Audit — Zelvora Studio",
      services: "Executive Editorial Capabilities & Scope — Zelvora Studio",
      pricing: "Advisory Investment & Scopes — Zelvora Studio",
      portfolio: "Illustrative Executive Work Samples — Zelvora Studio",
      process: "The Autopilot Editorial Workflow — Zelvora Studio",
      industries: "Specialized Practice Areas — Zelvora Studio",
      about: "About Zelvora Studio — Executive Visibility Team",
      blog: "Advisory Insights & Editorial Standards — Zelvora Studio",
      admin: "Editorial Administration Desk — Zelvora Studio",
      "admin-login": "Staff Login — Zelvora Studio",
      terms: "Terms of Creative Service — Zelvora Studio",
      privacy: "Privacy Architecture — Zelvora Studio"
    };

    if (typeof document !== "undefined") {
      document.title = titleMap[activePage] || "Zelvora Studio — Outsourced Executive Content";
    }
  }, [activePage]);

  // Core Data Tables
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);

  // Fetch initial content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const [faqRes, portRes, blogRes, pricingRes, settingsRes] = await Promise.all([
          fetch("/api/faq"),
          fetch("/api/portfolio"),
          fetch("/api/blogs"),
          fetch("/api/pricing"),
          fetch("/api/settings")
        ]);

        if (faqRes.ok) setFaqs(await faqRes.json());
        if (portRes.ok) setPortfolio(await portRes.json());
        if (blogRes.ok) setBlogs(await blogRes.json());
        if (pricingRes.ok) setPricing(await pricingRes.json());
        if (settingsRes.ok) setSettings(await settingsRes.json());
      } catch (err) {
        console.error("Failed to load initial Zelvora databases.", err);
      }
    };

    loadContent();

    // Check localStorage for active admin tokens
    const storedToken = localStorage.getItem("zelvora_admin_token");
    if (storedToken) {
      setAdminToken(storedToken);
    }
  }, []);

  // Handle Login success
  const handleLoginSuccess = (token: string) => {
    setAdminToken(token);
    localStorage.setItem("zelvora_admin_token", token);
    setActivePage("admin");
  };

  // Handle Logout
  const handleLogout = () => {
    setAdminToken(null);
    localStorage.removeItem("zelvora_admin_token");
    setActivePage("home");
  };

  // Content Dispatcher / Router
  const renderView = () => {
    switch (activePage) {
      case "home":
        return <HomeView setActivePage={setActivePage} faqs={faqs} portfolio={portfolio} pricing={pricing} />;
      case "services":
        return <ServicesView setActivePage={setActivePage} />;
      case "industries":
        return <IndustriesView setActivePage={setActivePage} />;
      case "process":
        return <ProcessView setActivePage={setActivePage} />;
      case "portfolio":
        return <PortfolioView portfolio={portfolio} />;
      case "pricing":
        return <PricingView pricing={pricing} setActivePage={setActivePage} />;
      case "about":
        return <AboutView setActivePage={setActivePage} />;
      case "contact":
        return <ContactView />;
      case "blog":
        return <BlogView blogs={blogs} />;
      case "terms":
        return <TermsView />;
      case "privacy":
        return <PrivacyView />;
      case "login":
      case "admin-login":
        return <AdminLogin onLoginSuccess={handleLoginSuccess} setActivePage={setActivePage} />;
      case "admin":
        return adminToken ? (
          <AdminDashboard token={adminToken} onLogout={handleLogout} />
        ) : (
          <AdminLogin onLoginSuccess={handleLoginSuccess} setActivePage={setActivePage} />
        );
      default:
        return <NotFoundView setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="bg-brand-alabaster text-brand-charcoal font-sans selection:bg-brand-coral selection:text-white min-h-screen flex flex-col justify-between">
      {/* Dynamic Navigation Header */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        isAdminLoggedIn={!!adminToken}
        onLogout={handleLogout}
      />

      {/* Primary Routed View */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* Global Brand Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
