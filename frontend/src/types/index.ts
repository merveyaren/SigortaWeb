// ============================================================
// Backend BACKEND_HANDOFF.md'deki alan isimleriyle birebir eşleşir
// ============================================================

// --- Auth ---
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

// --- Pages ---
export interface PageSection {
  key: string;
  title: string;
  body: string;
  image_path: string;
  image_url: string;
  sort_order: number;
}

export interface StaticPage {
  slug: string;
  meta_title: string;
  hero_headline: string;
  hero_subheadline: string;
  intro: string;
  updated_at: string;
  sections: PageSection[];
  statistics: StatisticItem[];
}

export interface StatisticItem {
  label: string;
  value: string;
}

// --- Category (nested object from API) ---
export interface Category {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
  description?: string;
}

// --- Services ---
export interface ServiceListItem {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  icon_path: string;
  icon_url: string;
  category: Category;
  sort_order: number;
  updated_at: string;
}

export interface ServiceDetail extends ServiceListItem {
  body: string;
}

// --- Blog ---
export interface BlogListItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_path: string;
  cover_image_url: string;
  author_display_name: string;
  published_at: string;
  category: Category;
  updated_at: string;
}

export interface BlogDetail extends BlogListItem {
  body: string;
}

// --- Projects ---
export interface ProjectListItem {
  id: number;
  title: string;
  slug: string;
  summary: string;
  cover_image_path: string;
  cover_image_url: string;
  client_name: string;
  completed_on: string;
  category: Category;
  sort_order: number;
  updated_at: string;
}

export interface ProjectDetail extends ProjectListItem {
  body: string;
}

// --- FAQ ---
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
}

// --- Contact ---
export interface ContactCard {
  kind: string;
  title_label: string;
  line_primary: string;
  line_secondary: string;
  sort_order: number;
}

export interface ContactPage {
  profile: {
    intro_kicker: string;
    intro_headline: string;
    intro_body: string;
    map_embed_url: string;
  };
  cards: ContactCard[];
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  message: string;
  phone?: string;
  source_page?: string;
}

// --- Private (Login Sonrası) ---
export interface Policy {
  id: number;
  policy_number: string;
  type: string;
  status: string;
  start_date: string;
  end_date: string;
  premium: string;
}

export interface Quote {
  id: number;
  service_title: string;
  requested_at: string;
  status: string;
}

export interface Claim {
  id: number;
  policy_number: string;
  description: string;
  status: string;
  submitted_at: string;
}

export interface Payment {
  id: number;
  amount: string;
  payment_date: string;
  status: string;
  policy_number: string;
}

export interface Alert {
  id: number;
  message: string;
  is_read: boolean;
  created_at: string;
}
