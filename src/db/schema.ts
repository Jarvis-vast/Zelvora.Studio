import { pgTable, serial, text, varchar, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  email: varchar("email", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: varchar("id", { length: 128 }).primaryKey(),
  name: text("name").notNull(),
  business: text("business"),
  email: varchar("email", { length: 256 }).notNull(),
  phone: varchar("phone", { length: 256 }),
  industry: text("industry"),
  message: text("message"),
  contactMethod: varchar("contact_method", { length: 64 }).default("email"),
  budget: varchar("budget", { length: 64 }),
  source: varchar("source", { length: 128 }),
  status: varchar("status", { length: 64 }).default("new"),
  notes: text("notes"),
  timestamp: varchar("timestamp", { length: 128 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const faqs = pgTable("faqs", {
  id: varchar("id", { length: 128 }).primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 64 }),
  order: serial("order"),
});

export const pricingPlans = pgTable("pricing_plans", {
  id: varchar("id", { length: 128 }).primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  price: varchar("price", { length: 64 }).notNull(),
  description: text("description"),
  popular: boolean("popular").default(false),
  features: jsonb("features"),
  channels: jsonb("channels"),
});

export const portfolioItems = pgTable("portfolio_items", {
  id: varchar("id", { length: 128 }).primaryKey(),
  client: varchar("client", { length: 256 }).notNull(),
  category: varchar("category", { length: 128 }),
  title: text("title"),
  description: text("description"),
  metrics: varchar("metrics", { length: 128 }),
  imageUrl: text("image_url"),
  tags: jsonb("tags"),
  featured: boolean("featured").default(false),
});

export const blogs = pgTable("blogs", {
  id: varchar("id", { length: 128 }).primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  author: varchar("author", { length: 128 }),
  date: varchar("date", { length: 64 }),
  readTime: varchar("read_time", { length: 64 }),
  category: varchar("category", { length: 128 }),
  imageUrl: text("image_url"),
});
