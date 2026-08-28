export interface Lead {
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

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  metrics: string;
  imageUrl: string;
}

export interface Blog {
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

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface WebsiteSettings {
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;
  slackConfigured: boolean;
  sheetsConfigured: boolean;
}
