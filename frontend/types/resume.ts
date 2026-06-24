export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number | null;
  height: number | null;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

export interface Profile {
  id: number;
  documentId: string;
  fullName: string;
  title: string;
  bio: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  website: string | null;
  avatar: StrapiMedia | null;
}

export interface Experience {
  id: number;
  documentId: string;
  role: string;
  company: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
  skills: string[] | null;
  sortOrder: number;
}

export interface Education {
  id: number;
  documentId: string;
  institution: string;
  degree: string;
  field: string | null;
  location: string | null;
  startDate: string;
  endDate: string | null;
  description: string | null;
  sortOrder: number;
}

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "Mobile"
  | "Design"
  | "Tools"
  | "Other";

export interface Skill {
  id: number;
  documentId: string;
  name: string;
  category: SkillCategory;
  level: number | null;
  sortOrder: number;
}

export interface Project {
  id: number;
  documentId: string;
  title: string;
  description: string;
  technologies: string[] | null;
  liveUrl: string | null;
  repoUrl: string | null;
  featured: boolean;
  image: StrapiMedia | null;
  sortOrder: number;
}

export type SocialPlatform =
  | "LinkedIn"
  | "GitHub"
  | "Twitter"
  | "Instagram"
  | "YouTube"
  | "Facebook"
  | "Website"
  | "Other";

export interface Social {
  id: number;
  documentId: string;
  platform: SocialPlatform;
  url: string;
  handle: string | null;
  sortOrder: number;
}
