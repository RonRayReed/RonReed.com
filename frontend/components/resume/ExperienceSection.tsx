import type { Experience } from "@/types/resume";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function DateRange({ exp }: { exp: Experience }) {
  const start = formatDate(exp.startDate);
  const end = exp.isCurrent ? "Present" : exp.endDate ? formatDate(exp.endDate) : "";
  return (
    <span className="text-sm text-gray-500 whitespace-nowrap">
      {start} – {end}
    </span>
  );
}

interface Props {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: Props) {
  if (experiences.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-widest mb-6">
        Experience
      </h2>
      <div className="space-y-8">
        {experiences.map((exp) => (
          <div key={exp.id} className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <div className="sm:w-36 shrink-0 pt-0.5">
              <DateRange exp={exp} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                <span className="text-gray-500">·</span>
                <span className="text-gray-600">{exp.company}</span>
                {exp.location && (
                  <span className="text-sm text-gray-400">{exp.location}</span>
                )}
              </div>
              {exp.description && (
                <div
                  className="mt-2 text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              )}
              {exp.skills && exp.skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
