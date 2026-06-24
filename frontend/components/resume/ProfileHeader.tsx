import Image from "next/image";
import type { Profile, Social } from "@/types/resume";
import { getStrapiMediaUrl } from "@/lib/strapi";

const PLATFORM_ICONS: Record<string, string> = {
  LinkedIn: "in",
  GitHub: "gh",
  Twitter: "tw",
  Instagram: "ig",
  YouTube: "yt",
  Facebook: "fb",
  Website: "www",
  Other: "→",
};

interface Props {
  profile: Profile;
  socials: Social[];
}

export default function ProfileHeader({ profile, socials }: Props) {
  const avatarUrl = profile.avatar
    ? getStrapiMediaUrl(profile.avatar.url)
    : null;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-start gap-8">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt={profile.fullName}
            width={112}
            height={112}
            className="rounded-full object-cover shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            {profile.fullName}
          </h1>
          <p className="mt-1 text-xl text-gray-500">{profile.title}</p>
          {profile.bio && (
            <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
              {profile.bio}
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            {profile.location && (
              <span>{profile.location}</span>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="text-blue-600 hover:underline"
              >
                {profile.email}
              </a>
            )}
            {profile.phone && <span>{profile.phone}</span>}
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {profile.website}
              </a>
            )}
          </div>
          {socials.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <span className="font-bold text-gray-400">
                    {PLATFORM_ICONS[s.platform] ?? "→"}
                  </span>
                  {s.handle ?? s.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
