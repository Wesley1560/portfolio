import { Link } from "@nextui-org/react";
import { portfolioContent } from "@/lib/content";

export default function Projects() {
  const { projects } = portfolioContent;
  return (
    <section className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-foreground">Projects</h2>
      <div className="space-y-12 sm:space-y-16">
        {projects.map((project, idx) => (
          <div key={idx} className="space-y-3 sm:space-y-4 border-t border-default-200 pt-4 sm:pt-6">
            <div>
              <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap mb-1">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">{project.name}</h3>
                {project.link && (
                  <Link href={project.link} isExternal className="text-xs sm:text-sm font-medium underline underline-offset-4 text-foreground/70">
                    View
                  </Link>
                )}
              </div>
              <p className="text-xs sm:text-sm text-foreground/60">
                {project.timeframe} • {project.role}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide text-foreground">Problem</h4>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm leading-relaxed text-foreground/80">
                <li>{project.problem}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide text-foreground">What I Did</h4>
              <ul className="list-disc list-inside space-y-1 sm:space-y-1.5 text-xs sm:text-sm leading-relaxed text-foreground/80">
                {(project.whatIDid || []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide text-foreground">Outcome</h4>
              <ul className="list-disc list-inside space-y-1 sm:space-y-1.5 text-xs sm:text-sm leading-relaxed text-foreground/80">
                {(project.outcome || []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide text-foreground">Tech Used</h4>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm leading-relaxed text-foreground/80">
                {(project.techUsed || []).map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
