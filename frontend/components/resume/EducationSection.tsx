import type { Education } from "@/types/resume";

function formatYear(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").getFullYear().toString();
}

interface Props {
  education: Education[];
}

export default function EducationSection({ education }: Props) {
  if (education.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-widest mb-6">
        Education
      </h2>
      <div className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <div className="sm:w-36 shrink-0 pt-0.5 text-sm text-gray-500">
              {formatYear(edu.startDate)}
              {edu.endDate && ` – ${formatYear(edu.endDate)}`}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="font-semibold text-gray-900">
                  {edu.degree}
                  {edu.field ? `, ${edu.field}` : ""}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">{edu.institution}</p>
              {edu.location && (
                <p className="text-gray-400 text-sm">{edu.location}</p>
              )}
              {edu.description && (
                <p className="mt-1 text-gray-600 text-sm leading-relaxed">
                  {edu.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
