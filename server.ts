import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Helper for URL sanitization
function sanitizeSupabaseUrl(candidate?: string | null): string | null {
  if (!candidate || typeof candidate !== "string") return null;
  const trimmed = candidate.trim().replace(/^["']|["']$/g, "");
  if (!trimmed || trimmed === "undefined" || trimmed === "null" || trimmed === "MY_APP_URL" || trimmed.includes("jtcrrnngbgrmqczerfve")) return null;
  try {
    const formatted = trimmed.startsWith("http://") || trimmed.startsWith("https://") ? trimmed : `https://${trimmed}`;
    const parsed = new URL(formatted);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.origin;
    }
  } catch (_) {
    return null;
  }
  return null;
}

function sanitizeSupabaseKey(candidate?: string | null): string | null {
  if (!candidate || typeof candidate !== "string") return null;
  const trimmed = candidate.trim().replace(/^["']|["']$/g, "");
  if (!trimmed || trimmed === "undefined" || trimmed === "null" || trimmed.includes("sb_publishable_tL4BeZffytf20JOYhC6SGA_n06AB01-")) return null;
  return trimmed;
}

// Supabase Cloud Client Initialization
const SUPABASE_URL = sanitizeSupabaseUrl(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL);
const SUPABASE_KEY = sanitizeSupabaseKey(
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

let supabaseClient: any = null;
if (SUPABASE_URL && SUPABASE_KEY) {
  try {
    supabaseClient = createSupabaseClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch (err) {
    console.warn("Supabase initialization exception:", err);
  }
}

// Path to JSON Database and Durable Backup Log
const DB_PATH = path.join(process.cwd(), "database.json");
const DB_BACKUP_PATH = path.join(process.cwd(), "leads_backup.jsonl");

async function appendLeadBackup(lead: Lead) {
  try {
    await fs.appendFile(DB_BACKUP_PATH, JSON.stringify(lead) + "\n", "utf8");
  } catch (err) {
    console.error("Warning: Failed to append lead to backup log:", err);
  }
}

// Types for DB structure
interface Lead {
  id: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  industry: string;
  message: string;
  contactMethod: string;
  budget: string;
  timestamp: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "archived";
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  metrics: string;
  imageUrl: string;
}

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  category: string;
}

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

interface Database {
  leads: Lead[];
  faqs: FAQ[];
  portfolio: PortfolioItem[];
  blogs: Blog[];
  pricing: PricingPlan[];
  settings: {
    tagline: string;
    contactEmail: string;
    contactPhone: string;
    officeAddress: string;
    slackConfigured: boolean;
    sheetsConfigured: boolean;
  };
}

// Initial Database Seeds
const INITIAL_DB: Database = {
  leads: [
    {
      id: "lead-1",
      name: "Marcus Vance",
      business: "Vance Luxury Realty",
      email: "marcus@vanceluxury.com",
      phone: "+1 (555) 382-9012",
      industry: "Real Estate",
      message: "We need a consistent, premium Instagram and LinkedIn strategy to showcase our properties and position our agents as market authorities.",
      contactMethod: "email",
      budget: "$2,500 - $5,000 / mo",
      timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(), // 2 days ago
      source: "Services Page",
      status: "qualified"
    },
    {
      id: "lead-2",
      name: "Dr. Catherine Thorne",
      business: "Thorne Aesthetics Clinic",
      email: "dr.thorne@thorneaesthetics.com",
      phone: "+1 (555) 890-3412",
      industry: "Medical",
      message: "Looking to outsource medical education content. Must comply with strict medical advertising regulations but still be visually arresting.",
      contactMethod: "phone",
      budget: "$1,500 - $2,500 / mo",
      timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
      source: "Home Page",
      status: "new"
    }
  ],
  faqs: [
    {
      id: "faq-1",
      question: "How does Zelvora Studio work?",
      answer: "We act as your dedicated executive content and brand-visibility team. Each month, we conduct a 45-minute structured strategy extraction with the founder or managing partner. From that single conversation, our senior editorial desk drafts, designs, and batches 14 to 20 bespoke executive posts, carousel slide decks, and thought-leadership essays. You review and approve everything in minutes via your private mobile preview link or dedicated WhatsApp/Slack channel.",
      category: "Workflow"
    },
    {
      id: "faq-2",
      question: "How do you handle AI vs. human editorial work?",
      answer: "Zelvora is our parent AI technology firm, but Zelvora Studio is an editorial-first operation. Behind the scenes, we use intelligent research and semantic clustering to rapidly analyze market trends and competitor gaps. However, 100% of the strategic narrative, executive ghostwriting, tone calibration, and visual design is led, written, and refined by experienced human editors. We never publish raw, unvetted AI text or generic templates.",
      category: "Editorial Standards"
    },
    {
      id: "faq-3",
      question: "How much time is required from me each month?",
      answer: "Under 60 minutes per month total. You invest 45 minutes in our monthly voice and strategy extraction call. Once we produce your bi-weekly content batch, reviewing and approving it takes under 10 minutes a week via your private mobile preview link or direct message. We handle the entire operational burden.",
      category: "Commitment"
    },
    {
      id: "faq-4",
      question: "What channels do you manage?",
      answer: "We focus on high-leverage channels where boutique consulting and advisory founders win client trust: LinkedIn (executive personal profiles and firm pages), Twitter/X (industry discourse and framework threads), and executive email newsletters (Substack, Beehiiv, or LinkedIn Newsletters). Visual syndication to Instagram is available on Growth and Scale tiers.",
      category: "Channels"
    },
    {
      id: "faq-5",
      question: "What are your contract terms and cancellation policy?",
      answer: "Zelvora Studio operates on transparent, rolling monthly engagements with no lock-in contracts. You can scale your tier up, down, or pause with a simple 14-day written notice before your next renewal. You own 100% of all intellectual property, copy, and visual assets created.",
      category: "Terms"
    }
  ],
  portfolio: [
    {
      id: "port-1",
      title: "Executive Carousel: The Silent Advisory Trap",
      client: "Illustrative Concept • Founder-Led Management Advisory",
      category: "Boutique Consulting / Advisory",
      description: "Sample multi-slide executive LinkedIn carousel illustrating how high-billing consultancies lose enterprise market share when their digital footprint is silent. Features crisp typography and framework-driven pacing.",
      metrics: "Illustrative Deliverable • High Save & Repost Benchmark",
      imageUrl: "/zelvora_post.png"
    },
    {
      id: "port-2",
      title: "Contrarian Editorial: When Referrals Stop Scaling",
      client: "Illustrative Concept • Boutique Strategy Consultancy",
      category: "Executive Ghostwriting",
      description: "Ghostwritten long-form executive post unpacking the hidden revenue volatility of relying purely on historical referral networks, framing the firm's proprietary methodology as the strategic answer.",
      metrics: "Illustrative Deliverable • Partner Inquiry Anchor",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "port-3",
      title: "Executive Dispatch: Mid-Market Transformation Insights",
      client: "Illustrative Concept • Corporate Advisory & Transformation Practice",
      category: "Executive Newsletter",
      description: "A bi-weekly executive brief ghostwritten for a managing partner, dissecting mid-market M&A restructuring lessons and establishing category authority among board members and corporate buyers.",
      metrics: "Illustrative Deliverable • 45%+ Executive Open Benchmark",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "port-4",
      title: "Visual Framework Breakdown: The Diagnostic Matrix",
      client: "Illustrative Concept • Specialized Advisory Practice",
      category: "Visual Framework Design",
      description: "Converting proprietary consulting frameworks and whiteboard models into high-contrast, polished graphic assets formatted for executive distribution on LinkedIn.",
      metrics: "Illustrative Deliverable • Premium Editorial Standard",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
    }
  ],
  blogs: [
    {
      id: "blog-1",
      title: "The Invisible Partner: Why Elite Boutique Consultancies Lose Deals to Louder Competitors",
      excerpt: "Your advisory work is world-class, but prospective clients validate credentials online before calling you back. Here is how silent firms lose the narrative.",
      content: `In high-value consulting and advisory engagements ($25,000 to $250,000+), referral recommendations remain powerful. But the referral journey has fundamentally evolved.
      
When an enterprise CEO, private equity operating partner, or corporate board member hears your name recommended at dinner, their very first action is to look up your personal profile on LinkedIn or Google.

If they encounter an inactive profile, sporadic generic reposts, or silence, doubt creeps in. They do not assume you are too busy doing brilliant client work; they subconsciously assume your practice has stalled.

### The Modern Validation Layer
Executive content is not about chasing superficial virality or dancing for social algorithms. For boutique advisory leaders, executive visibility functions as an always-on credibility validator:
1. **Validating Real Depth:** Demonstrating that your proprietary frameworks address the exact board-level pain points your prospects face.
2. **Shortening the Sales Cycle:** Prospects who read your thoughtful commentary arrive at introductory discovery calls already educated on your point of view and pre-sold on your approach.
3. **Protecting Enterprise Pricing:** When your public authority matches your advisory fees, price resistance disappears.

### Outsource the Heavy Lifting, Protect Your Voice
The obstacle for boutique founders has never been a lack of insight—it is operational time. Developing narratives, designing visual carousels, and managing publishing cadences takes 12 to 15 hours each week.

Zelvora Studio extracts your genuine partner expertise in one structured monthly briefing, then turns it into a consistent stream of executive-grade assets. You stay focused on billable client engagements while your firm's market authority compounds.`,
      author: "Zelvora Editorial Desk",
      date: "2026-09-15",
      readTime: "4 min read",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
      category: "Advisory Strategy"
    },
    {
      id: "blog-2",
      title: "The Death of AI Slop: Why Enterprise Buyers Demand Authentic Executive Voice",
      excerpt: "Automated, generic AI posts are flooding executive feeds. Here is why boutique consultancies must insist on rigorous human editorial standards.",
      content: `Social feeds and newsletters are inundated with robotic, prompt-generated summaries. Bulleted lists with rocket emojis, generic buzzwords, and shallow platitudes masquerading as thought leadership.

Sophisticated decision-makers detect low-effort automated content within three seconds—and it instantly devalues an advisory firm's credibility.

### True Authority Cannot Be Prompted
High-ticket enterprise clients do not pay for basic information; they pay for seasoned judgment, contrarian perspectives, and nuanced lessons forged through real market experience.

A generic AI generator cannot replicate:
- The exact conversational pushback a CEO gave during a restructuring.
- The subtle tradeoffs between two competing organizational strategies.
- The precise typographic elegance that commands respect from an enterprise buyer.

### The Hybrid Editorial Standard
At Zelvora Studio, we leverage intelligent research and structural analysis tools to accelerate background analysis. But every single word of executive ghostwriting, narrative rhythm, and visual asset composition is crafted, edited, and approved by human editorial strategists.

When your name is on the byline, only genuine editorial excellence protects your reputation.`,
      author: "Zelvora Editorial Desk",
      date: "2026-09-22",
      readTime: "5 min read",
      imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=800",
      category: "Editorial Standards"
    }
  ],
  pricing: [
    {
      id: "plan-starter",
      name: "Starter",
      price: "$1,490",
      period: "month",
      description: "Designed for solo managing directors, executive coaches, and boutique practice founders establishing consistent digital authority.",
      features: [
        "LinkedIn & Twitter/X executive channel management",
        "3 bespoke handcrafted executive posts per week",
        "Monthly 45-minute voice & strategy extraction call",
        "1 high-impact visual carousel deck per month",
        "Mobile batch review via private preview link or WhatsApp/Slack",
        "1 revision round per content batch",
        "Monthly executive visibility & reach review"
      ]
    },
    {
      id: "plan-growth",
      name: "Growth",
      price: "$2,850",
      period: "month",
      description: "Our signature plan. For established boutique consultancies and advisory firms requiring strong category authority and steady inbound demand.",
      features: [
        "LinkedIn & Twitter/X presence (optional Instagram visual syndication)",
        "5 bespoke handcrafted executive posts per week",
        "2 high-impact typographic carousel slide decks per month",
        "1 long-form thought-leadership essay or executive newsletter per month",
        "Monthly 45-minute strategic extraction session",
        "Priority Slack/email editorial communication channel",
        "Mobile batch review with 48-hour revision turnaround",
        "Comprehensive monthly visibility & inbound attribution audit"
      ],
      isPopular: true
    },
    {
      id: "plan-scale",
      name: "Scale",
      price: "$4,900",
      period: "month",
      description: "For multi-partner firms and growing advisory practices scaling cross-channel market dominance with zero internal friction.",
      features: [
        "Full multi-channel executive coverage (LinkedIn, Twitter/X, Newsletter, IG)",
        "Daily tailored publishing & scheduled cadence (7 posts/week)",
        "4 custom visual carousel decks & framework graphics per month",
        "2 long-form thought-leadership essays or executive dispatches",
        "Executive commentary monitoring & strategic conversation drivers",
        "Dedicated Senior Editorial Director & Lead Visual Designer",
        "Quarterly narrative repositioning & competitive gap audits",
        "Real-time performance analytics & pipeline attribution review"
      ]
    }
  ],
  settings: {
    tagline: "Your expertise should be visible, even when you're busy running the business.",
    contactEmail: "partnership@zelvora.studio",
    contactPhone: "",
    officeAddress: "Digital Editorial Studio • Operating Globally",
    slackConfigured: false,
    sheetsConfigured: false
  }
};

// Database Initializer
async function initDatabase() {
  try {
    await fs.access(DB_PATH);
  } catch {
    // Write seeds if file does not exist
    await fs.writeFile(DB_PATH, JSON.stringify(INITIAL_DB, null, 2), "utf8");
    console.log("Database initialized with seed data!");
  }
}

// Database Helpers
async function getDB(): Promise<Database> {
  try {
    const data = await fs.readFile(DB_PATH, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database file, returning seeds:", err);
    return INITIAL_DB;
  }
}

async function saveDB(db: Database) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

// Initialize Gemini SDK lazily
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined. AI copywriting functionality will operate in demo simulation mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Setup APIs
app.get("/api/faq", async (req, res) => {
  const db = await getDB();
  res.json(db.faqs);
});

app.get("/api/portfolio", async (req, res) => {
  const db = await getDB();
  res.json(db.portfolio);
});

app.get("/api/pricing", async (req, res) => {
  const db = await getDB();
  res.json(db.pricing);
});

app.get("/api/blogs", async (req, res) => {
  const db = await getDB();
  res.json(db.blogs);
});

app.get("/api/settings", async (req, res) => {
  const db = await getDB();
  res.json(db.settings);
});

// Dedicated AI Agent Context Endpoints (LLMs, ChatGPT, Gemini, Perplexity)
app.get("/llms.txt", async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "public", "llms.txt");
    const content = await fs.readFile(filePath, "utf8");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(content);
  } catch {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send("# Zelvora Studio\n\nOutsourced brand visibility and thought leadership team for founders and leaders.");
  }
});

app.get("/llms-full.txt", async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "public", "llms-full.txt");
    const content = await fs.readFile(filePath, "utf8");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(content);
  } catch {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send("# Zelvora Studio Full Documentation\n\nFull documentation at https://zelvora.studio");
  }
});

app.get("/robots.txt", async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "public", "robots.txt");
    const content = await fs.readFile(filePath, "utf8");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(content);
  } catch {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send("User-agent: *\nAllow: /\nSitemap: https://zelvora.studio/sitemap.xml");
  }
});

app.get("/sitemap.xml", async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "public", "sitemap.xml");
    const content = await fs.readFile(filePath, "utf8");
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.send(content);
  } catch {
    res.status(404).send("Sitemap not found");
  }
});

// JSON AI Context Endpoint for Agent Tooling and SearchGPT/Gemini
app.get("/api/ai-summary", async (req, res) => {
  const db = await getDB();
  res.json({
    agency: {
      name: "Zelvora Studio",
      tagline: db.settings.tagline,
      contact: {
        email: db.settings.contactEmail,
        phone: db.settings.contactPhone,
        address: db.settings.officeAddress,
      },
      verticals: [
        "Founder-Led Boutique Consulting Firms",
        "Executive Leadership & Strategy Advisors",
        "M&A, Restructuring & Corporate Finance Advisors",
        "Specialized High-Value Professional Practices"
      ]
    },
    pricingPlans: db.pricing,
    faqs: db.faqs,
    caseStudies: db.portfolio.map(p => ({
      client: p.client,
      category: p.category,
      metrics: p.metrics,
      description: p.description
    })),
    recentInsights: db.blogs.map(b => ({
      title: b.title,
      excerpt: b.excerpt,
      category: b.category,
      readTime: b.readTime
    }))
  });
});

// Contact Lead Submission endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, business, email, phone, industry, message, contactMethod, budget, _gotcha, hp, website_url_hp } = req.body;
    
    // Honeypot spam defense (drops bot submissions silently)
    if (_gotcha || hp || website_url_hp) {
      return res.json({ success: true, message: "Audit request received." });
    }

    // Input Sanitization & Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Managing Partner or contact name is required." });
    }
    if (!business || typeof business !== "string" || !business.trim()) {
      return res.status(400).json({ error: "Firm or practice name is required." });
    }
    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({ error: "Work email address is required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: "Please enter a valid work email address." });
    }

    const cleanName = name.trim().slice(0, 100);
    const cleanBusiness = business.trim().slice(0, 150);
    const cleanEmail = email.trim().toLowerCase().slice(0, 150);
    const cleanPhone = (phone && typeof phone === "string") ? phone.trim().slice(0, 50) : "N/A";
    const cleanIndustry = (industry && typeof industry === "string") ? industry.trim().slice(0, 100) : "Boutique Advisory";
    const cleanMessage = (message && typeof message === "string") ? message.trim().slice(0, 2000) : "No message provided";
    const cleanContactMethod = (contactMethod && typeof contactMethod === "string") ? contactMethod.trim().slice(0, 30) : "email";
    const cleanBudget = (budget && typeof budget === "string") ? budget.trim().slice(0, 100) : "Private Visibility Audit";

    const db = await getDB();
    
    // Duplicate Prevention (within 3 minutes for identical email and firm)
    const now = Date.now();
    const existingDuplicate = db.leads.find(l => {
      if (l.email.toLowerCase() === cleanEmail && l.business.toLowerCase() === cleanBusiness.toLowerCase()) {
        const leadTime = new Date(l.timestamp).getTime();
        return (now - leadTime) < 180000;
      }
      return false;
    });

    if (existingDuplicate) {
      return res.json({
        success: true,
        duplicate: true,
        lead: existingDuplicate,
        message: "Your audit request is already recorded and is currently being prepared by our editorial desk."
      });
    }

    const newLead: Lead = {
      id: "lead-" + now,
      name: cleanName,
      business: cleanBusiness,
      email: cleanEmail,
      phone: cleanPhone,
      industry: cleanIndustry,
      message: cleanMessage,
      contactMethod: cleanContactMethod,
      budget: cleanBudget,
      timestamp: new Date().toISOString(),
      source: "Contact Form",
      status: "new"
    };

    // Primary store + append-only backup log
    db.leads.unshift(newLead);
    await saveDB(db);
    await appendLeadBackup(newLead);

    // SLACK INTEGRATION (Triggered only when valid webhook is configured)
    const slackUrl = process.env.SLACK_WEBHOOK_URL;
    let slackSuccess = false;
    if (slackUrl && slackUrl.startsWith("http")) {
      try {
        const slackPayload = {
          text: `🚨 *New Visibility Audit Request for Zelvora Studio*`,
          attachments: [
            {
              color: "#EA580C",
              fields: [
                { title: "Partner Name", value: cleanName, short: true },
                { title: "Firm / Practice", value: cleanBusiness, short: true },
                { title: "Work Email", value: cleanEmail, short: true },
                { title: "Phone", value: cleanPhone, short: true },
                { title: "Advisory Vertical", value: cleanIndustry, short: true },
                { title: "Scope / Budget", value: cleanBudget, short: true },
                { title: "Contact Preference", value: cleanContactMethod, short: true },
                { title: "Bottleneck / Notes", value: cleanMessage, short: false },
                { title: "Timestamp", value: new Date().toISOString(), short: true },
                { title: "Source", value: "Zelvora.Studio Audit Intake", short: true }
              ]
            }
          ]
        };
        const sRes = await fetch(slackUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(slackPayload)
        });
        slackSuccess = sRes.ok;
      } catch (e) {
        console.error("Slack integration webhook failed:", e);
      }
    }

    // GOOGLE SHEETS INTEGRATION (Triggered only when valid URL configured)
    const sheetsUrl = process.env.GOOGLE_SHEETS_URL;
    let sheetsSuccess = false;
    if (sheetsUrl && sheetsUrl.startsWith("http")) {
      try {
        const sheetsPayload = {
          timestamp: new Date().toISOString(),
          name: cleanName,
          business: cleanBusiness,
          industry: cleanIndustry,
          email: cleanEmail,
          phone: cleanPhone,
          budget: cleanBudget,
          message: cleanMessage,
          source: "Zelvora.Studio Audit Intake",
          status: "new"
        };
        const gRes = await fetch(sheetsUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sheetsPayload)
        });
        sheetsSuccess = gRes.ok;
      } catch (e) {
        console.error("Google Sheets webhook integration failed:", e);
      }
    }

    // SUPABASE CLOUD SYNC (Triggered only when client is active)
    let supabaseSuccess = false;
    if (supabaseClient) {
      try {
        const { error: sbError } = await supabaseClient.from("leads").insert([
          {
            id: newLead.id,
            name: newLead.name,
            business: newLead.business,
            email: newLead.email,
            phone: newLead.phone,
            industry: newLead.industry,
            message: newLead.message,
            contact_method: newLead.contactMethod,
            budget: newLead.budget,
            source: newLead.source,
            status: newLead.status,
            created_at: newLead.timestamp,
          }
        ]);
        if (!sbError) {
          supabaseSuccess = true;
        } else {
          console.warn("Supabase lead sync note:", sbError.message);
        }
      } catch (sbErr) {
        console.warn("Supabase lead sync exception:", sbErr);
      }
    }

    // RESEND EMAIL CONFIRMATION (Triggered only with valid non-mock Edge Function)
    const edgeFunctionEmailUrl = process.env.SUPABASE_EDGE_FUNCTION_RESEND_URL;
    let emailSent = false;
    if (edgeFunctionEmailUrl && edgeFunctionEmailUrl.startsWith("http") && !edgeFunctionEmailUrl.includes("jtcrrnngbgrmqczerfve") && SUPABASE_KEY) {
      try {
        const emailPayload = {
          from: "Zelvora Studio <audit@zelvora.studio>",
          to: [cleanEmail],
          subject: "We received your Private Visibility Audit request — Zelvora Studio",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #121110; line-height: 1.6;">
              <div style="border-bottom: 2px solid #EA580C; padding-bottom: 12px; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #121110; font-size: 20px; letter-spacing: -0.5px;">Zelvora Studio</h2>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #78716c; font-family: monospace;">OUTSOURCED EXECUTIVE EDITORIAL & VISIBILITY OPERATION</p>
              </div>
              <p>Dear ${cleanName},</p>
              <p>Thank you for requesting a <strong>Private Visibility Audit</strong> for <strong>${cleanBusiness}</strong>. Our editorial desk has received your submission and initiated a preliminary benchmark of your digital presence against category peers in ${cleanIndustry}.</p>
              <div style="background-color: #FAF9F5; border: 1px solid #e7e5e4; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <h3 style="margin-top: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #57534e;">Audit Submission Details</h3>
                <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #292524;">
                  <li><strong>Managing Partner / Lead:</strong> ${cleanName} (${cleanEmail})</li>
                  <li><strong>Practice / Firm:</strong> ${cleanBusiness}</li>
                  <li><strong>Practice Focus:</strong> ${cleanIndustry}</li>
                  <li><strong>Preferred Contact Channel:</strong> ${cleanContactMethod}</li>
                </ul>
              </div>
              <p><strong>What happens next:</strong> Within 24 to 48 hours, our editorial desk will deliver your written visibility assessment, benchmark observations, and 2 tailored executive content concepts.</p>
              <p style="margin-top: 30px; font-size: 12px; color: #a8a29e;">Zelvora Studio &bull; Managed Executive Editorial Operation &bull; audit@zelvora.studio</p>
            </div>
          `
        };

        const emailRes = await fetch(edgeFunctionEmailUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "apikey": SUPABASE_KEY
          },
          body: JSON.stringify(emailPayload)
        });
        emailSent = emailRes.ok;
      } catch (emailErr) {
        console.warn("Email dispatch note:", emailErr);
      }
    }

    res.json({
      success: true,
      lead: newLead,
      integrations: {
        slack: slackSuccess,
        slackConfigured: !!slackUrl,
        googleSheets: sheetsSuccess,
        sheetsConfigured: !!sheetsUrl,
        supabase: supabaseSuccess,
        supabaseConfigured: !!supabaseClient,
        emailNotification: emailSent
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to submit audit request" });
  }
});

// DISPATCH EMAIL VIA SUPABASE RESEND EDGE FUNCTION
app.post("/api/email/send", async (req, res) => {
  try {
    const { to, subject, html, from } = req.body;
    if (!to || !subject || !html) {
      return res.status(400).json({ error: "Missing required fields: 'to', 'subject', 'html'" });
    }

    const edgeFunctionEmailUrl = process.env.SUPABASE_EDGE_FUNCTION_RESEND_URL;
    if (!edgeFunctionEmailUrl || edgeFunctionEmailUrl.includes("jtcrrnngbgrmqczerfve") || !SUPABASE_KEY) {
      return res.status(503).json({ error: "Email delivery service not configured in current environment." });
    }

    const response = await fetch(edgeFunctionEmailUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "apikey": SUPABASE_KEY
      },
      body: JSON.stringify({
        from: from || "Zelvora Studio <partnership@zelvora.studio>",
        to,
        subject,
        html
      })
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: data?.error || `Edge Function returned HTTP ${response.status}`,
        details: data
      });
    }

    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Failed to trigger Edge Function" });
  }
});

// SUPABASE STATUS & SYNC ENDPOINTS
app.get("/api/supabase/status", async (req, res) => {
  const isConfigured = !!supabaseClient;
  let connectionState = isConfigured ? "idle" : "unconfigured";
  let tableAccessible = false;
  let count = 0;

  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient.from("leads").select("id", { count: "exact" }).limit(1);
      if (!error) {
        connectionState = "connected";
        tableAccessible = true;
        count = data ? data.length : 0;
      } else {
        connectionState = "connected_table_pending";
      }
    } catch (e: any) {
      connectionState = "error: " + (e.message || "Connection failed");
    }
  }

  res.json({
    configured: isConfigured,
    url: SUPABASE_URL || "not_configured",
    status: connectionState,
    tableAccessible,
    recordSampleCount: count
  });
});

// ADMIN AUTHENTICATION
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;
  const configPassword = process.env.ADMIN_PASSWORD || "zelvora2026";
  
  if ((email === "admin@zelvora.ai" || email === "admin@zelvora.studio") && password === configPassword) {
    return res.json({
      success: true,
      token: "zelvora-token-" + Buffer.from(email + ":" + Date.now()).toString("base64"),
      user: { email, role: "administrator" }
    });
  }
  
  res.status(401).json({ error: "Invalid credentials. Double-check your username and password." });
});

// Admin Authorization Middleware (simple validation since it's an applet)
const checkAdminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer zelvora-token-")) {
    return next();
  }
  res.status(403).json({ error: "Unauthorized access. Valid administrator session token required." });
};

// ADMIN - List leads
app.get("/api/admin/leads", checkAdminAuth, async (req, res) => {
  const db = await getDB();
  res.json(db.leads);
});

// ADMIN - Update lead status
app.put("/api/admin/leads/:id", checkAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const db = await getDB();
    const idx = db.leads.findIndex(l => l.id === id);
    if (idx !== -1) {
      db.leads[idx].status = status;
      await saveDB(db);
      return res.json({ success: true, lead: db.leads[idx] });
    }
    res.status(404).json({ error: "Lead not found" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN - Delete lead
app.delete("/api/admin/leads/:id", checkAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDB();
    const lenBefore = db.leads.length;
    db.leads = db.leads.filter(l => l.id !== id);
    if (db.leads.length < lenBefore) {
      await saveDB(db);
      return res.json({ success: true });
    }
    res.status(404).json({ error: "Lead not found" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN - FAQ operations
app.post("/api/admin/faq", checkAdminAuth, async (req, res) => {
  const { question, answer, category } = req.body;
  if (!question || !answer) return res.status(400).json({ error: "Question and answer are required" });
  const db = await getDB();
  const newFaq: FAQ = { id: "faq-" + Date.now(), question, answer, category: category || "General" };
  db.faqs.push(newFaq);
  await saveDB(db);
  res.json(newFaq);
});

app.put("/api/admin/faq/:id", checkAdminAuth, async (req, res) => {
  const { id } = req.params;
  const { question, answer, category } = req.body;
  const db = await getDB();
  const idx = db.faqs.findIndex(f => f.id === id);
  if (idx !== -1) {
    db.faqs[idx] = { ...db.faqs[idx], question, answer, category: category || db.faqs[idx].category };
    await saveDB(db);
    return res.json(db.faqs[idx]);
  }
  res.status(404).json({ error: "FAQ not found" });
});

app.delete("/api/admin/faq/:id", checkAdminAuth, async (req, res) => {
  const { id } = req.params;
  const db = await getDB();
  db.faqs = db.faqs.filter(f => f.id !== id);
  await saveDB(db);
  res.json({ success: true });
});

// ADMIN - Portfolio operations
app.post("/api/admin/portfolio", checkAdminAuth, async (req, res) => {
  const { title, client, category, description, metrics, imageUrl } = req.body;
  if (!title || !client) return res.status(400).json({ error: "Title and Client are required" });
  const db = await getDB();
  const newItem: PortfolioItem = {
    id: "port-" + Date.now(),
    title,
    client,
    category: category || "Branding",
    description: description || "",
    metrics: metrics || "",
    imageUrl: imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  };
  db.portfolio.push(newItem);
  await saveDB(db);
  res.json(newItem);
});

app.put("/api/admin/portfolio/:id", checkAdminAuth, async (req, res) => {
  const { id } = req.params;
  const db = await getDB();
  const idx = db.portfolio.findIndex(p => p.id === id);
  if (idx !== -1) {
    db.portfolio[idx] = { ...db.portfolio[idx], ...req.body };
    await saveDB(db);
    return res.json(db.portfolio[idx]);
  }
  res.status(404).json({ error: "Portfolio item not found" });
});

app.delete("/api/admin/portfolio/:id", checkAdminAuth, async (req, res) => {
  const { id } = req.params;
  const db = await getDB();
  db.portfolio = db.portfolio.filter(p => p.id !== id);
  await saveDB(db);
  res.json({ success: true });
});

// ADMIN - Blog operations
app.post("/api/admin/blogs", checkAdminAuth, async (req, res) => {
  const { title, excerpt, content, author, readTime, imageUrl, category } = req.body;
  if (!title || !content) return res.status(400).json({ error: "Title and Content are required" });
  const db = await getDB();
  const newBlog: Blog = {
    id: "blog-" + Date.now(),
    title,
    excerpt: excerpt || "A new insight from Zelvora.",
    content,
    author: author || "Zelvora Team",
    date: new Date().toISOString().split("T")[0],
    readTime: readTime || "3 min read",
    imageUrl: imageUrl || "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=800",
    category: category || "Insights"
  };
  db.blogs.push(newBlog);
  await saveDB(db);
  res.json(newBlog);
});

app.put("/api/admin/blogs/:id", checkAdminAuth, async (req, res) => {
  const { id } = req.params;
  const db = await getDB();
  const idx = db.blogs.findIndex(b => b.id === id);
  if (idx !== -1) {
    db.blogs[idx] = { ...db.blogs[idx], ...req.body };
    await saveDB(db);
    return res.json(db.blogs[idx]);
  }
  res.status(404).json({ error: "Blog post not found" });
});

app.delete("/api/admin/blogs/:id", checkAdminAuth, async (req, res) => {
  const { id } = req.params;
  const db = await getDB();
  db.blogs = db.blogs.filter(b => b.id !== id);
  await saveDB(db);
  res.json({ success: true });
});

// ADMIN - Update plan price
app.put("/api/admin/pricing/:id", checkAdminAuth, async (req, res) => {
  const { id } = req.params;
  const { price, features, description } = req.body;
  const db = await getDB();
  const idx = db.pricing.findIndex(p => p.id === id);
  if (idx !== -1) {
    if (price !== undefined) db.pricing[idx].price = price;
    if (features !== undefined) db.pricing[idx].features = features;
    if (description !== undefined) db.pricing[idx].description = description;
    await saveDB(db);
    return res.json(db.pricing[idx]);
  }
  res.status(404).json({ error: "Plan not found" });
});

// ADMIN - Update site settings
app.put("/api/admin/settings", checkAdminAuth, async (req, res) => {
  const db = await getDB();
  db.settings = { ...db.settings, ...req.body };
  await saveDB(db);
  res.json(db.settings);
});

// GEMINI COPYWRITING AGENT ROUTE (Server Side Only - No key leakage)
app.post("/api/gemini/copywriter", async (req, res) => {
  try {
    const { businessName, industry, targetAudience, contentType, focusTopic } = req.body;
    
    if (!businessName || !industry || !contentType) {
      return res.status(400).json({ error: "Missing business details to generate copywriting assets." });
    }

    const hasApiKey = !!process.env.GEMINI_API_KEY;

    if (!hasApiKey) {
      // Simulate highly professional, detailed demo copywriting output if no key is configured,
      // showing premium value without crashing!
      const simulatedOutput = `### Generated Content Strategy for ${businessName}

**Content Style:** Premium, Trustworthy, Modern, Intelligent
**Target Audience:** ${targetAudience || "Busy HNW Clients & Industry Leaders"}
**Channel Format:** ${contentType}
**Topic Scope:** ${focusTopic || "Industry Innovation & Outsourced Time Benefits"}

---

#### 📌 Part 1: Strategic Post Outline & Captivating Hook
*Designed to seize immediate attention on professional feeds (LinkedIn / Twitter).*

* **The Hook:** "The average business founder spends 12 hours a week drafting, editing, and publishing content. That's 12 hours taken directly from scaling operations. Run your business — let the professionals maintain your voice."
* **Core Narrative:** Position your team as the primary authority. Highlight the transition from high-stress self-publishing to an elegant, batched, 14-day approval workflow.
* **Call To Action:** "If you are too busy running your business to tell the market you exist, let's talk. DM or email us to secure your elite visibility plan."

---

#### 🎨 Part 2: Premium Visual Slide-by-Slide Carousel Blueprint
*A blueprint for a 5-slide visual carousel asset.*

* **Slide 1 (Cover):** "The Silent Founder Trap" (Bold, clean typography, deep slate charcoal background with Electric Blue accent).
* **Slide 2:** "Referrals are great. But they don't scale. When buyers hear your name, their first move is to search you. A blank grid is an invisible brand."
* **Slide 3:** "The bottleneck is time, not expertise. You are too busy closing deals and scaling infrastructure to design vectors."
* **Slide 4:** "Zelvora transforms silent operators into prominent market authorities. Fully outsourced, client-approved, zero-time-drain content pipeline."
* **Slide 5 (CTA):** "Secure Consistent Visibility. Visit zelvora.ai to claim your spot."

---

*(Note: This response was elegantly compiled by Zelvora's intelligence engine. Configure your real GEMINI_API_KEY to unlock infinite custom generation!)*`;
      
      return res.json({ text: simulatedOutput, isSimulated: true });
    }

    const ai = getGemini();
    const prompt = `You are the chief strategist and copywriter at Zelvora.AI, an elite agency managing the digital brand visibility of high-level coaches, consultants, doctors, lawyers, and startup founders.
    
    Generate a complete, premium, ready-to-publish social media copy and a visual carousel outline based on these specifications:
    - Business Name: "${businessName}"
    - Industry: "${industry}"
    - Target Audience: "${targetAudience || "Busy professionals and high-ticket clients"}"
    - Content Format requested: "${contentType}"
    - Core Focus Topic: "${focusTopic || "Brand authority, consistent visibility, and modern trust"}"
    
    Format your response beautifully in clean markdown. Provide:
    1. A premium, compelling, conversion-focused written post containing a powerful hook, a strong educational/narrative body, and a clear call-to-action (no generic hashtags, keep emojis minimal and sophisticated).
    2. A slide-by-slide visual layout concept for a 5-slide visual carousel (specify background accent and visual text for each slide).
    Make the copywriting sound confident, intelligent, sophisticated, and highly human (no robotic AI vocabulary or cliches).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite, highly paid SaaS and brand copywriting strategist who writes elegant, human, and high-converting copy.",
        temperature: 0.7,
      }
    });

    const text = response.text || "Failed to generate copywriting assets.";
    res.json({ text, isSimulated: false });

  } catch (err: any) {
    res.status(500).json({ error: err.message || "Gemini copywriter service encountered an error." });
  }
});


// Serve static files / Vite dev server middleware
async function startServer() {
  await initDatabase();

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Zelvora.AI Premium Server running on http://localhost:${PORT}`);
  });
}

// On standalone Node, start server; on Vercel Serverless, initialize DB and export app
if (process.env.VERCEL !== "1") {
  startServer();
} else {
  initDatabase().catch(console.error);
}

export { app };
export default app;

