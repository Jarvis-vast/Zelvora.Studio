import React, { useState, useEffect } from "react";
import {
  Users, HelpCircle, Briefcase, FileText, Sliders, Settings, Search, Filter,
  Plus, Trash2, Edit, Save, CheckCircle, AlertCircle, RefreshCw, Download, LogOut,
  SlidersHorizontal, Check, Shield, MessageSquare, Tag, Layout, Database
} from "lucide-react";
import { Lead, FAQ, PortfolioItem, Blog, PricingPlan, WebsiteSettings } from "../types";

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
}

export default function AdminDashboard({ token, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"leads" | "faq" | "portfolio" | "blogs" | "pricing" | "settings">("leads");

  // Core Data State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);

  // Status State
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Filter/Search states (Leads)
  const [leadsSearch, setLeadsSearch] = useState("");
  const [leadsStatusFilter, setLeadsStatusFilter] = useState("all");

  // FAQ Form State
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [faqForm, setFaqForm] = useState({ question: "", answer: "", category: "Process" });

  // Portfolio Form State
  const [editingPort, setEditingPort] = useState<PortfolioItem | null>(null);
  const [portForm, setPortForm] = useState({
    title: "", client: "", category: "Consulting", description: "", metrics: "", imageUrl: ""
  });

  // Blog Form State
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "", excerpt: "", content: "", author: "Zelvora Team", readTime: "4 min read", imageUrl: "", category: "Strategy"
  });

  // Fetch all database metrics
  const fetchAllData = async () => {
    setLoading(true);
    setSaveStatus(null);
    try {
      const headers = { "Authorization": `Bearer ${token}` };

      const [leadsRes, faqRes, portRes, blogRes, pricingRes, settingsRes] = await Promise.all([
        fetch("/api/admin/leads", { headers }),
        fetch("/api/faq"),
        fetch("/api/portfolio"),
        fetch("/api/blogs"),
        fetch("/api/pricing"),
        fetch("/api/settings")
      ]);

      if (leadsRes.ok) setLeads(await leadsRes.json());
      if (faqRes.ok) setFaqs(await faqRes.json());
      if (portRes.ok) setPortfolio(await portRes.json());
      if (blogRes.ok) setBlogs(await blogRes.json());
      if (pricingRes.ok) setPricing(await pricingRes.json());
      if (settingsRes.ok) setSettings(await settingsRes.json());

    } catch (err) {
      triggerStatus("error", "Failed to retrieve fresh server database tables.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [token]);

  const triggerStatus = (type: "success" | "error", text: string) => {
    setSaveStatus({ type, text });
    setTimeout(() => setSaveStatus(null), 4000);
  };

  // LEADS ACTIONS
  const handleUpdateLeadStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setLeads(leads.map(l => l.id === id ? { ...l, status: status as any } : l));
        triggerStatus("success", "Lead operational status updated.");
      } else {
        triggerStatus("error", "Failed to update lead status.");
      }
    } catch (e) {
      triggerStatus("error", "Failed to reach administration API.");
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Are you absolute sure you want to delete this lead from records?")) return;
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setLeads(leads.filter(l => l.id !== id));
        triggerStatus("success", "Lead records deleted successfully.");
      } else {
        triggerStatus("error", "Failed to clear lead from backend database.");
      }
    } catch (e) {
      triggerStatus("error", "Failed to reach administration API.");
    }
  };

  const exportLeadsCSV = () => {
    const headers = ["ID", "Name", "Business", "Email", "Phone", "Industry", "Budget", "Message", "Preferred Contact", "Status", "Timestamp"];
    const rows = filteredLeads.map(l => [
      l.id, l.name, l.business, l.email, l.phone, l.industry, l.budget, l.message.replace(/,/g, " "), l.contactMethod, l.status, l.timestamp
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `zelvora_leads_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // FAQ ACTIONS
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEdit = !!editingFaq;
      const url = isEdit ? `/api/admin/faq/${editingFaq!.id}` : "/api/admin/faq";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(faqForm)
      });

      if (res.ok) {
        const savedFaq = await res.json();
        if (isEdit) {
          setFaqs(faqs.map(f => f.id === editingFaq!.id ? savedFaq : f));
          setEditingFaq(null);
        } else {
          setFaqs([...faqs, savedFaq]);
        }
        setFaqForm({ question: "", answer: "", category: "Process" });
        triggerStatus("success", `FAQ ${isEdit ? "updated" : "added"} successfully.`);
      } else {
        triggerStatus("error", "Failed to write FAQ parameters.");
      }
    } catch (e) {
      triggerStatus("error", "FAQ database update failed.");
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!window.confirm("Delete this FAQ item?")) return;
    try {
      const res = await fetch(`/api/admin/faq/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setFaqs(faqs.filter(f => f.id !== id));
        triggerStatus("success", "FAQ cleared successfully.");
      }
    } catch (e) {
      triggerStatus("error", "FAQ deletion operation failed.");
    }
  };

  // PORTFOLIO ACTIONS
  const handleSavePort = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEdit = !!editingPort;
      const url = isEdit ? `/api/admin/portfolio/${editingPort!.id}` : "/api/admin/portfolio";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(portForm)
      });

      if (res.ok) {
        const savedPort = await res.json();
        if (isEdit) {
          setPortfolio(portfolio.map(p => p.id === editingPort!.id ? savedPort : p));
          setEditingPort(null);
        } else {
          setPortfolio([...portfolio, savedPort]);
        }
        setPortForm({ title: "", client: "", category: "Consulting", description: "", metrics: "", imageUrl: "" });
        triggerStatus("success", `Portfolio item ${isEdit ? "updated" : "added"} successfully.`);
      }
    } catch (e) {
      triggerStatus("error", "Failed to update portfolio details.");
    }
  };

  const handleDeletePort = async (id: string) => {
    if (!window.confirm("Delete this portfolio case study?")) return;
    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setPortfolio(portfolio.filter(p => p.id !== id));
        triggerStatus("success", "Portfolio case study cleared.");
      }
    } catch (e) {
      triggerStatus("error", "Portfolio clear process failed.");
    }
  };

  // BLOG ACTIONS
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEdit = !!editingBlog;
      const url = isEdit ? `/api/admin/blogs/${editingBlog!.id}` : "/api/admin/blogs";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(blogForm)
      });

      if (res.ok) {
        const savedBlog = await res.json();
        if (isEdit) {
          setBlogs(blogs.map(b => b.id === editingBlog!.id ? savedBlog : b));
          setEditingBlog(null);
        } else {
          setBlogs([...blogs, savedBlog]);
        }
        setBlogForm({ title: "", excerpt: "", content: "", author: "Zelvora Team", readTime: "4 min read", imageUrl: "", category: "Strategy" });
        triggerStatus("success", `Blog post ${isEdit ? "updated" : "published"} successfully.`);
      }
    } catch (e) {
      triggerStatus("error", "Blog publishing operation failed.");
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm("Delete this blog insight permanently?")) return;
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setBlogs(blogs.filter(b => b.id !== id));
        triggerStatus("success", "Blog insight cleared from backend.");
      }
    } catch (e) {
      triggerStatus("error", "Blog deletion failed.");
    }
  };

  // PRICING ACTIONS
  const handleUpdatePrice = async (id: string, price: string, desc: string) => {
    try {
      const res = await fetch(`/api/admin/pricing/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ price, description: desc })
      });
      if (res.ok) {
        const updatedPlan = await res.json();
        setPricing(pricing.map(p => p.id === id ? updatedPlan : p));
        triggerStatus("success", "Pricing tier parameters updated.");
      }
    } catch (e) {
      triggerStatus("error", "Pricing edit pipeline failed.");
    }
  };

  // SETTINGS ACTION
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
        triggerStatus("success", "Site configurations updated successfully.");
      }
    } catch (e) {
      triggerStatus("error", "Failed to write site settings.");
    }
  };

  // Filtering leads locally
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(leadsSearch.toLowerCase()) ||
      lead.business.toLowerCase().includes(leadsSearch.toLowerCase()) ||
      lead.email.toLowerCase().includes(leadsSearch.toLowerCase()) ||
      lead.industry.toLowerCase().includes(leadsSearch.toLowerCase()) ||
      lead.message.toLowerCase().includes(leadsSearch.toLowerCase());

    const matchesStatus = leadsStatusFilter === "all" || lead.status === leadsStatusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="pt-28 bg-brand-charcoal min-h-screen text-white pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Dashboard Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Shield size={18} />
              </span>
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">Zelvora.AI Admin Portal</span>
            </div>
            <h1 className="font-display font-bold text-3xl text-white tracking-tight mt-1">Management Cockpit</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              disabled={loading}
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 transition-all cursor-pointer"
              title="Refresh CRM tables"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold rounded-lg transition-all cursor-pointer"
            >
              <LogOut size={14} />
              Close Session
            </button>
          </div>
        </div>

        {/* Global Save Status Alerts */}
        {saveStatus && (
          <div className={`p-4 rounded-xl border mb-6 flex items-start gap-3 text-xs sm:text-sm ${
            saveStatus.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}>
            {saveStatus.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span>{saveStatus.text}</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Nav Panels */}
          <aside className="lg:w-64 shrink-0 flex flex-col gap-1.5">
            {[
              { id: "leads", label: "Leads Board", icon: <Users size={16} /> },
              { id: "pricing", label: "Pricing plans", icon: <Sliders size={16} /> },
              { id: "faq", label: "FAQ Manager", icon: <HelpCircle size={16} /> },
              { id: "portfolio", label: "Case Studies", icon: <Briefcase size={16} /> },
              { id: "blogs", label: "Insights Blog", icon: <FileText size={16} /> },
              { id: "settings", label: "Settings", icon: <Settings size={16} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-xs tracking-wider uppercase font-semibold text-left transition-all ${
                  activeTab === tab.id
                    ? "bg-brand-blue text-white shadow-md border border-brand-blue/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </aside>

          {/* Module Grid Panels */}
          <main className="flex-1 min-h-[500px]">
            {/* 1. LEADS BOARD */}
            {activeTab === "leads" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                  <div className="flex flex-1 items-center gap-3">
                    <div className="relative flex-1 max-w-sm">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                        <Search size={14} />
                      </span>
                      <input
                        type="text"
                        placeholder="Search leads, firms, emails..."
                        value={leadsSearch}
                        onChange={(e) => setLeadsSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-white/5 bg-white/5 text-xs text-white focus:outline-none focus:border-brand-blue/40 font-sans"
                      />
                    </div>

                    <select
                      value={leadsStatusFilter}
                      onChange={(e) => setLeadsStatusFilter(e.target.value)}
                      className="px-3.5 py-2.5 rounded-lg border border-white/5 bg-white/5 text-xs text-gray-400 focus:outline-none focus:border-brand-blue/40 font-sans"
                    >
                      <option value="all">All Statuses</option>
                      <option value="new">New Briefs</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <button
                    onClick={exportLeadsCSV}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-xs font-semibold tracking-wide transition-all"
                  >
                    <Download size={14} />
                    Export CSV
                  </button>
                </div>

                <div className="rounded-xl border border-white/5 bg-brand-secondary/45 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/5 font-mono text-gray-500 uppercase">
                          <th className="p-4 font-semibold">Client Name / Business</th>
                          <th className="p-4 font-semibold">Email & Phone</th>
                          <th className="p-4 font-semibold">Intake Scope</th>
                          <th className="p-4 font-semibold">Budget Limit</th>
                          <th className="p-4 font-semibold">Method</th>
                          <th className="p-4 font-semibold">Status</th>
                          <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeads.map((lead) => (
                          <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors font-sans">
                            <td className="p-4">
                              <span className="block font-bold text-white text-sm">{lead.name}</span>
                              <span className="block text-gray-400 text-[11px] mt-0.5">{lead.business} • {lead.industry}</span>
                            </td>
                            <td className="p-4">
                              <span className="block text-gray-300 font-mono">{lead.email}</span>
                              <span className="block text-gray-500 font-mono mt-0.5">{lead.phone}</span>
                            </td>
                            <td className="p-4 max-w-xs truncate" title={lead.message}>
                              <span className="text-gray-400 text-[11px]">{lead.message}</span>
                            </td>
                            <td className="p-4 font-mono text-cyan-400">
                              {lead.budget}
                            </td>
                            <td className="p-4 uppercase text-[10px] font-mono font-semibold text-gray-500">
                              {lead.contactMethod}
                            </td>
                            <td className="p-4">
                              <select
                                value={lead.status}
                                onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                                className={`px-2.5 py-1 rounded text-[10px] uppercase font-mono tracking-wider font-bold border ${
                                  lead.status === "new" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                                  lead.status === "qualified" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                                  lead.status === "contacted" ? "bg-brand-blue/10 border-brand-blue/20 text-brand-blue" :
                                  "bg-white/5 border-white/10 text-gray-500"
                                }`}
                              >
                                <option value="new" className="bg-brand-charcoal text-amber-400 font-bold">New</option>
                                <option value="contacted" className="bg-brand-charcoal text-brand-blue font-bold">Contacted</option>
                                <option value="qualified" className="bg-brand-charcoal text-emerald-400 font-bold">Qualified</option>
                                <option value="archived" className="bg-brand-charcoal text-gray-500">Archived</option>
                              </select>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 rounded hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"
                                title="Clear Lead from DB"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}

                        {filteredLeads.length === 0 && (
                          <tr>
                            <td colSpan={7} className="p-16 text-center text-gray-500 font-mono">
                              No intake leads registered.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PRICING PLANS */}
            {activeTab === "pricing" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pricing.map((plan) => {
                    const [localPrice, setLocalPrice] = useState(plan.price);
                    const [localDesc, setLocalDesc] = useState(plan.description);
                    return (
                      <div key={plan.id} className="glass-panel rounded-xl p-6 border border-white/5 flex flex-col justify-between">
                        <div className="space-y-4">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 block">{plan.name} Tier</span>
                          
                          <div>
                            <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1 font-semibold">Price per month</label>
                            <input
                              type="text"
                              value={localPrice}
                              onChange={(e) => setLocalPrice(e.target.value)}
                              className="w-full px-3 py-1.5 rounded border border-white/5 bg-white/5 text-sm text-white focus:outline-none focus:border-brand-blue/40 font-mono font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1 font-semibold">Tier Narrative</label>
                            <textarea
                              rows={3}
                              value={localDesc}
                              onChange={(e) => setLocalDesc(e.target.value)}
                              className="w-full px-3 py-1.5 rounded border border-white/5 bg-white/5 text-xs text-gray-300 focus:outline-none focus:border-brand-blue/40 font-sans leading-relaxed resize-none"
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => handleUpdatePrice(plan.id, localPrice, localDesc)}
                          className="w-full mt-6 py-2 bg-brand-blue hover:bg-brand-blue/90 rounded text-xs font-semibold tracking-wide uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Save size={12} />
                          Save Plan Configuration
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. FAQ MANAGER */}
            {activeTab === "faq" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 glass-panel rounded-xl p-6 border border-white/5">
                  <h3 className="font-display font-bold text-lg text-white mb-4">
                    {editingFaq ? "Edit FAQ Item" : "Create New FAQ"}
                  </h3>
                  <form onSubmit={handleSaveFaq} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1 font-semibold">Question</label>
                      <input
                        type="text"
                        required
                        value={faqForm.question}
                        onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-white/5 bg-white/5 text-xs text-white focus:outline-none focus:border-brand-blue/40 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1 font-semibold">Detailed Answer</label>
                      <textarea
                        rows={4}
                        required
                        value={faqForm.answer}
                        onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-white/5 bg-white/5 text-xs text-gray-300 focus:outline-none focus:border-brand-blue/40 font-sans resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1 font-semibold">Category</label>
                      <select
                        value={faqForm.category}
                        onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-white/5 bg-white/5 text-xs text-white focus:outline-none focus:border-brand-blue/40 font-sans"
                      >
                        <option value="Process">Process</option>
                        <option value="Quality">Quality</option>
                        <option value="Channels">Channels</option>
                        <option value="Billing">Billing</option>
                        <option value="General">General</option>
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 py-2 bg-brand-blue hover:bg-brand-blue/90 rounded text-xs font-semibold tracking-wide uppercase cursor-pointer">
                        {editingFaq ? "Update" : "Create"}
                      </button>
                      {editingFaq && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingFaq(null);
                            setFaqForm({ question: "", answer: "", category: "Process" });
                          }}
                          className="px-3.5 py-2 rounded bg-white/5 hover:bg-white/10 text-xs"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="p-5 rounded-xl border border-white/5 bg-brand-secondary/40 flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-wider bg-brand-blue/15 text-brand-blue border border-brand-blue/20 px-2 py-0.5 rounded w-fit block mb-2">{faq.category}</span>
                        <h4 className="font-display font-semibold text-sm text-white">{faq.question}</h4>
                        <p className="text-xs text-gray-400 mt-2 leading-relaxed font-sans">{faq.answer}</p>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingFaq(faq);
                            setFaqForm({ question: faq.question, answer: faq.answer, category: faq.category });
                          }}
                          className="p-1.5 rounded hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(faq.id)}
                          className="p-1.5 rounded hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. PORTFOLIO CASE STUDIES */}
            {activeTab === "portfolio" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 glass-panel rounded-xl p-6 border border-white/5">
                  <h3 className="font-display font-bold text-lg text-white mb-4">
                    {editingPort ? "Edit Case Study" : "Add Case Study"}
                  </h3>
                  <form onSubmit={handleSavePort} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1 font-semibold">Title</label>
                      <input
                        type="text"
                        required
                        value={portForm.title}
                        onChange={(e) => setPortForm({ ...portForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-white/5 bg-white/5 text-xs text-white focus:outline-none focus:border-brand-blue/40 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1 font-semibold">Client Name</label>
                      <input
                        type="text"
                        required
                        value={portForm.client}
                        onChange={(e) => setPortForm({ ...portForm, client: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-white/5 bg-white/5 text-xs text-white focus:outline-none focus:border-brand-blue/40 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1 font-semibold">Category</label>
                      <input
                        type="text"
                        required
                        value={portForm.category}
                        onChange={(e) => setPortForm({ ...portForm, category: e.target.value })}
                        placeholder="e.g. Luxury Real Estate"
                        className="w-full px-3 py-2 rounded border border-white/5 bg-white/5 text-xs text-white focus:outline-none focus:border-brand-blue/40 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1 font-semibold">Aesthetic Description</label>
                      <textarea
                        rows={3}
                        value={portForm.description}
                        onChange={(e) => setPortForm({ ...portForm, description: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-white/5 bg-white/5 text-xs text-gray-300 focus:outline-none focus:border-brand-blue/40 font-sans resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1 font-semibold">Key Growth Metrics</label>
                      <input
                        type="text"
                        value={portForm.metrics}
                        onChange={(e) => setPortForm({ ...portForm, metrics: e.target.value })}
                        placeholder="e.g. +340% views • 14 Inbound DM leads"
                        className="w-full px-3 py-2 rounded border border-white/5 bg-white/5 text-xs text-white focus:outline-none focus:border-brand-blue/40 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1 font-semibold">Case Image URL</label>
                      <input
                        type="url"
                        value={portForm.imageUrl}
                        onChange={(e) => setPortForm({ ...portForm, imageUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 rounded border border-white/5 bg-white/5 text-xs text-white focus:outline-none focus:border-brand-blue/40 font-mono"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 py-2 bg-brand-blue hover:bg-brand-blue/90 rounded text-xs font-semibold tracking-wide uppercase cursor-pointer">
                        {editingPort ? "Save Changes" : "Create"}
                      </button>
                      {editingPort && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPort(null);
                            setPortForm({ title: "", client: "", category: "Consulting", description: "", metrics: "", imageUrl: "" });
                          }}
                          className="px-3.5 py-2 rounded bg-white/5 hover:bg-white/10 text-xs"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  {portfolio.map((item) => (
                    <div key={item.id} className="p-4 rounded-xl border border-white/5 bg-brand-secondary/40 flex gap-4 items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded overflow-hidden shrink-0 bg-brand-charcoal">
                          <img src={item.imageUrl} alt={item.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-gray-500 block">Client: {item.client}</span>
                          <h4 className="font-display font-semibold text-sm text-white mt-0.5">{item.title}</h4>
                          <span className="text-[10px] font-mono text-emerald-400 font-semibold block mt-1">{item.metrics}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingPort(item);
                            setPortForm({
                              title: item.title, client: item.client, category: item.category,
                              description: item.description, metrics: item.metrics, imageUrl: item.imageUrl
                            });
                          }}
                          className="p-1.5 rounded hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeletePort(item.id)}
                          className="p-1.5 rounded hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. INSIGHTS BLOG */}
            {activeTab === "blogs" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 glass-panel rounded-xl p-6 border border-white/5">
                  <h3 className="font-display font-bold text-lg text-white mb-4">
                    {editingBlog ? "Edit Insight Post" : "Publish Insight Post"}
                  </h3>
                  <form onSubmit={handleSaveBlog} className="space-y-4 font-sans text-xs">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1.5 font-semibold">Post Title</label>
                      <input
                        type="text"
                        required
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        placeholder="e.g. The Invisible Founder"
                        className="w-full px-3 py-2 rounded border border-white/5 bg-white/5 text-xs text-white focus:outline-none focus:border-brand-blue/40 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1.5 font-semibold">Excerpt</label>
                      <textarea
                        rows={2}
                        value={blogForm.excerpt}
                        onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-white/5 bg-white/5 text-xs text-gray-300 focus:outline-none focus:border-brand-blue/40 font-sans resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1.5 font-semibold">Post content markdown</label>
                      <textarea
                        rows={6}
                        required
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-white/5 bg-white/5 text-xs text-gray-300 focus:outline-none focus:border-brand-blue/40 font-mono resize-none leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1 font-semibold">Category</label>
                        <input
                          type="text"
                          value={blogForm.category}
                          onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-white/5 bg-white/5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1 font-semibold">Read Time</label>
                        <input
                          type="text"
                          value={blogForm.readTime}
                          onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-white/5 bg-white/5 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1 font-semibold">Cover Image URL</label>
                      <input
                        type="url"
                        value={blogForm.imageUrl}
                        onChange={(e) => setBlogForm({ ...blogForm, imageUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 rounded border border-white/5 bg-white/5 text-xs text-white"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button type="submit" className="flex-1 py-2.5 bg-brand-blue hover:bg-brand-blue/90 rounded text-xs font-semibold tracking-wide uppercase cursor-pointer">
                        {editingBlog ? "Save post" : "Publish Now"}
                      </button>
                      {editingBlog && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingBlog(null);
                            setBlogForm({ title: "", excerpt: "", content: "", author: "Zelvora Team", readTime: "4 min read", imageUrl: "", category: "Strategy" });
                          }}
                          className="px-3 py-2 rounded bg-white/5"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  {blogs.map((b) => (
                    <div key={b.id} className="p-4 rounded-xl border border-white/5 bg-brand-secondary/40 flex justify-between items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded overflow-hidden shrink-0 bg-brand-charcoal">
                          <img src={b.imageUrl} alt={b.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-gray-500">{b.date} • {b.category}</span>
                          <h4 className="font-display font-semibold text-sm text-white mt-0.5">{b.title}</h4>
                        </div>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingBlog(b);
                            setBlogForm({
                              title: b.title, excerpt: b.excerpt, content: b.content,
                              author: b.author, readTime: b.readTime, imageUrl: b.imageUrl, category: b.category
                            });
                          }}
                          className="p-1.5 rounded hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(b.id)}
                          className="p-1.5 rounded hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. SETTINGS */}
            {activeTab === "settings" && settings && (
              <div className="max-w-xl glass-panel rounded-xl p-8 border border-white/5">
                <h3 className="font-display font-bold text-lg text-white mb-6">Site Configuration Parameters</h3>
                <form onSubmit={handleSaveSettings} className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5 font-semibold">Core Value Proposition Tagline</label>
                    <input
                      type="text"
                      required
                      value={settings.tagline}
                      onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white focus:outline-none focus:border-brand-blue/40 font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5 font-semibold">Partnership Email</label>
                      <input
                        type="email"
                        required
                        value={settings.contactEmail}
                        onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white focus:outline-none focus:border-brand-blue/40 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5 font-semibold">Partnership Phone</label>
                      <input
                        type="text"
                        required
                        value={settings.contactPhone}
                        onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white focus:outline-none focus:border-brand-blue/40 font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5 font-semibold">Headquarters Location</label>
                    <input
                      type="text"
                      required
                      value={settings.officeAddress}
                      onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white focus:outline-none focus:border-brand-blue/40 font-sans"
                    />
                  </div>

                  <div className="h-[1px] bg-white/5 my-6" />

                  {/* Webhook notification state logs */}
                  <div className="space-y-3.5">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block font-semibold">Global Bridges Integration Status:</span>
                    
                    <div className="flex items-center justify-between py-2 px-4 rounded-lg bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3">
                        <MessageSquare size={14} className="text-gray-400" />
                        <div>
                          <span className="block text-xs text-white font-medium">Slack Live Webhooks</span>
                          <span className="block text-[10px] text-gray-500 font-mono">Triggers instant Slack alert upon lead submitted</span>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${
                        process.env.SLACK_WEBHOOK_URL ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-white/5 text-gray-500 border border-white/10"
                      }`}>
                        {process.env.SLACK_WEBHOOK_URL ? "ACTIVE BRIDGED" : "PENDING SECRETS"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 px-4 rounded-lg bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3">
                        <Database size={14} className="text-emerald-400" />
                        <div>
                          <span className="block text-xs text-white font-medium">Supabase Cloud Database</span>
                          <span className="block text-[10px] text-gray-500 font-mono">Syncs incoming leads to jtcrrnngbgrmqczerfve.supabase.co</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        ACTIVE BRIDGED
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 px-4 rounded-lg bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3">
                        <Layout size={14} className="text-gray-400" />
                        <div>
                          <span className="block text-xs text-white font-medium">Google Sheets Appender</span>
                          <span className="block text-[10px] text-gray-500 font-mono">Appends incoming lead parameters automatically</span>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${
                        process.env.GOOGLE_SHEETS_URL ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-white/5 text-gray-500 border border-white/10"
                      }`}>
                        {process.env.GOOGLE_SHEETS_URL ? "ACTIVE BRIDGED" : "PENDING SECRETS"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-blue hover:bg-brand-blue/90 rounded-lg text-xs font-semibold tracking-wide uppercase flex items-center justify-center gap-1.5 cursor-pointer pt-3"
                  >
                    <Save size={14} />
                    Save Website Settings
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>

      </div>
    </div>
  );
}
