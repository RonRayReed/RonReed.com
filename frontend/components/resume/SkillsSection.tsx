import type { Skill, SkillCategory } from "@/types/resume";

const CATEGORY_ORDER: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Mobile",
  "Design",
  "Tools",
  "Other",
];

function groupByCategory(skills: Skill[]): Map<SkillCategory, Skill[]> {
  const map = new Map<SkillCategory, Skill[]>();
  for (const skill of skills) {
    const existing = map.get(skill.category) ?? [];
    existing.push(skill);
    map.set(skill.category, existing);
  }
  return map;
}

interface Props {
  skills: Skill[];
}

export default function SkillsSection({ skills }: Props) {
  if (skills.length === 0) return null;

  const grouped = groupByCategory(skills);
  const orderedCategories = CATEGORY_ORDER.filter((c) => grouped.has(c));

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-widest mb-6">
        Skills
      </h2>
      <div className="space-y-4">
        {orderedCategories.map((category) => {
          const categorySkills = grouped.get(category)!;
          return (
            <div key={category} className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <div className="sm:w-36 shrink-0 text-sm font-medium text-gray-500">
                {category}
              </div>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <span
                    key={skill.id}
                    className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-700"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
