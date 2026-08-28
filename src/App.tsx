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
  const [activePage, setActivePage] = useState<string>("home");
  const [adminToken, setAdminToken] = useState<string | null>(null);

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
