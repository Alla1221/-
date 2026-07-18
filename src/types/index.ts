export type ProjectCategory =
  | "identity"
  | "social"
  | "motion"
  | "stores"
  | "ads";

export interface Project {
  id: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: string;
  cover: string;
  before?: string;
  after?: string;
  description: string;
  tags: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  cover: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
}
