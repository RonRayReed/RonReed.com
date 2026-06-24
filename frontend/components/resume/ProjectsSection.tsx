import Image from "next/image";
import type { Project } from "@/types/resume";
import { getStrapiMediaUrl } from "@/lib/strapi";

interface Props {
  projects: Project[];
}

export default function ProjectsSection({ projects }: Props) {
  if (projects.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-widest mb-6">
        Projects
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => {
          const imageUrl = project.image
            ? getStrapiMediaUrl(project.image.url)
            : null;
          return (
            <div
              key={project.id}
              className="rounded-xl border border-gray-200 overflow-hidden flex flex-col"
            >
              {imageUrl && (
                <div className="relative w-full h-40 bg-gray-100">
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900">{project.title}</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed flex-1">
                  {project.description}
                </p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex gap-3 text-sm">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Live →
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:underline"
                    >
                      Code →
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
