import React, { useState } from "react";
import { Lock, Mail, RefreshCw, AlertCircle, ShieldCheck } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: (token: string) => void;
  setActivePage: (page: string) => void;
}

export default function AdminLogin({ onLoginSuccess, setActivePage }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok && data.token) {
        onLoginSuccess(data.token);
        setActivePage("admin");
      } else {
        setError(data.error || "Invalid administrator credentials.");
      }
    } catch (err) {
      setError("Communication failed. Unable to authenticate session.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen flex items-center justify-center grid-paper">
      <div className="w-full max-w-md px-6">
        
        <div className="editorial-card bg-white rounded-2xl border border-brand-charcoal/5 p-8 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-coral/5 rounded-full filter blur-2xl pointer-events-none" />
          
          <div className="text-center mb-8">
            <span className="p-3 bg-brand-coral/5 border border-brand-coral/10 text-brand-coral rounded-xl inline-flex mb-4">
              <Lock size={24} />
            </span>
            <h1 className="font-serif font-semibold text-2xl text-brand-charcoal tracking-tight">Zelvora Studio Admin</h1>
            <p className="text-xs text-brand-stone/50 font-sans mt-1.5 uppercase tracking-wider font-extrabold">Administrator Authentication</p>
          </div>

          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs flex items-start gap-3 mb-6">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-brand-stone/60 mb-1.5 font-bold">Admin Username</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-stone/40">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  required
                  placeholder="admin@zelvora.studio"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/40 text-sm text-brand-charcoal focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-brand-stone/60 mb-1.5 font-bold">Security Token Password</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-stone/40">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-charcoal/10 bg-brand-cream/40 text-sm text-brand-charcoal focus:outline-none focus:border-brand-coral focus:bg-white transition-all font-sans font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-coral hover:bg-brand-coral/95 text-white rounded-full text-xs font-extrabold tracking-widest uppercase shadow-md shadow-brand-coral/15 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Authorize Portal Entry
                </>
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-brand-charcoal/5 pt-4 text-center text-[10px] font-mono text-brand-stone/50 space-y-1 font-bold">
            <div>Default Email: <span className="text-brand-charcoal">admin@zelvora.studio</span></div>
            <div>Default Password: <span className="text-brand-charcoal">zelvora2026</span></div>
          </div>
        </div>

      </div>
    </div>
  );
}
