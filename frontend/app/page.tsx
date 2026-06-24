import {
  getProfile,
  getExperiences,
  getEducation,
  getSkills,
  getProjects,
  getSocials,
} from "@/lib/strapi";
import ProfileHeader from "@/components/resume/ProfileHeader";
import ExperienceSection from "@/components/resume/ExperienceSection";
import EducationSection from "@/components/resume/EducationSection";
import SkillsSection from "@/components/resume/SkillsSection";
import ProjectsSection from "@/components/resume/ProjectsSection";

export default async function ResumePage() {
  const [profile, experiences, education, skills, projects, socials] =
    await Promise.all([
      getProfile(),
      getExperiences(),
      getEducation(),
      getSkills(),
      getProjects(),
      getSocials(),
    ]);

  if (!profile) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Ron Reed
          </h1>
          <p className="mt-3 text-gray-500">
            This site is powered by Strapi CMS. Start the backend and add your
            profile to get started.
          </p>
          <p className="mt-2 text-sm text-gray-400 font-mono">
            cd backend && npm run develop
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader profile={profile} socials={socials} />
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        <ExperienceSection experiences={experiences} />
        <EducationSection education={education} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
      </main>
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
        {profile.fullName}
      </footer>
    </div>
  );
}
