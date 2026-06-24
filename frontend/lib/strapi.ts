import type {
  Profile,
  Experience,
  Education,
  Skill,
  Project,
  Social,
} from "@/types/resume";

// STRAPI_API_URL is used server-side for API calls (allows Docker internal networking).
// Falls back to NEXT_PUBLIC_STRAPI_URL which works for plain local (non-Docker) dev.
const STRAPI_URL =
  process.env.STRAPI_API_URL ??
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "http://localhost:1337";

async function strapiGet<T>(path: string): Promise<T | null> {
  const url = `${STRAPI_URL}/api${path}`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as T;
  } catch {
    return null;
  }
}

export async function getProfile(): Promise<Profile | null> {
  return strapiGet<Profile>("/profile?populate=avatar");
}

export async function getExperiences(): Promise<Experience[]> {
  const data = await strapiGet<Experience[]>(
    "/experiences?sort=sortOrder:asc,startDate:desc&pagination[pageSize]=100"
  );
  return data ?? [];
}

export async function getEducation(): Promise<Education[]> {
  const data = await strapiGet<Education[]>(
    "/educations?sort=sortOrder:asc,startDate:desc&pagination[pageSize]=100"
  );
  return data ?? [];
}

export async function getSkills(): Promise<Skill[]> {
  const data = await strapiGet<Skill[]>(
    "/skills?sort=category:asc,sortOrder:asc&pagination[pageSize]=100"
  );
  return data ?? [];
}

export async function getProjects(): Promise<Project[]> {
  const data = await strapiGet<Project[]>(
    "/projects?sort=sortOrder:asc&populate=image&pagination[pageSize]=100"
  );
  return data ?? [];
}

export async function getSocials(): Promise<Social[]> {
  const data = await strapiGet<Social[]>(
    "/socials?sort=sortOrder:asc&pagination[pageSize]=100"
  );
  return data ?? [];
}

export function getStrapiMediaUrl(url: string): string {
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}
