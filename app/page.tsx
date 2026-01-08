import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import WhyHireMe from "@/components/WhyHireMe";
import Snapshots from "@/components/Snapshots";
import WorkExperience from "@/components/WorkExperience";
import Education from "@/components/Education";
import FeaturedProjects from "@/components/FeaturedProjects";
import AthleticBackground from "@/components/AthleticBackground";
import SkillsTechnology from "@/components/SkillsTechnology";
import GetInTouch from "@/components/GetInTouch";
import { portfolioContent } from "@/lib/content";

export default function Home() {
  const professionalSummary = portfolioContent.professionalSummary.join(" ");

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      <Hero professionalSummary={professionalSummary} />
      <WhyHireMe />
      <Snapshots />
      <div id="work-experience">
        <WorkExperience />
      </div>
      <div id="education">
        <Education />
      </div>
      <div id="projects">
        <FeaturedProjects />
      </div>
      <div id="athletic-background">
        <AthleticBackground />
      </div>
      <div id="skills-technology">
        <SkillsTechnology />
      </div>
      <div id="get-in-touch">
        <GetInTouch />
      </div>
    </main>
  );
}

// Ensure static generation
export const dynamic = 'force-static';
