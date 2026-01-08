type Project = {
  title: string;
  dateRange?: string;
  overview: string;
  bullets: string[];
  tags: string[];
  link?: {
    url: string;
    label: string;
    icon?: 'github' | 'paper' | 'youtube';
  };
};

export default function FeaturedProjects() {
  const projects: Project[] = [
    {
      title: "Personal Portfolio Website",
      dateRange: "2026",
      overview: "Modern, responsive portfolio website showcasing engineering and software development expertise.",
      bullets: [
        "Built with Next.js, TypeScript, and Tailwind CSS for optimal performance and accessibility",
        "Implemented automated deployment pipelines with Vercel and comprehensive version control"
      ],
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Git"],
      link: {
        url: "https://github.com/Wesley1560/portfolio",
        label: "View on GitHub",
        icon: "github"
      }
    },
    {
      title: "MEC E 360 – Heavy Duty EV Transmission",
      dateRange: "Apr 2024 – Aug 2024",
      overview: "Led cross-functional team in designing and validating heavy-duty electric vehicle transmission system.",
      bullets: [
        "Managed project timeline and deliverables for 8-person engineering team",
        "Conducted FEA analysis and hand calculations to validate gear design against AGMA standards",
        "Automated gear selection process, reducing design iteration time by 60%"
      ],
      tags: ["Project Management", "FEA", "AGMA Standards", "Gear Design", "Automation"],
      link: {
        url: "https://youtu.be/AnqY57Zkp20",
        label: "Watch Video",
        icon: "youtube"
      }
    },
    {
      title: "MEC E 464 – Design for Manufacturing RC Car",
      dateRange: "Jan 2025 – Apr 2025",
      overview: "Comprehensive design-for-manufacturing analysis optimizing RC car performance through multi-process fabrication.",
      bullets: [
        "Implemented GD&T and statistical tolerance analysis to minimize manufacturing defects",
        "Conducted trade-off analysis between manufacturing cost and performance requirements",
        "Achieved 25% improvement in vehicle stability through optimized component design"
      ],
      tags: ["DFM", "GD&T", "Tolerance Analysis", "CNC Machining", "Performance Optimization"]
    },
    {
      title: "VVC Multi-Sport Training Facility",
      dateRange: "Jul 2025 – Present",
      overview: "Designed and validated multi-purpose athletic training facility meeting international safety standards.",
      bullets: [
        "Optimized spatial layout for hockey, throwing, and multi-sport training requirements",
        "Conducted structural analysis and safety validation per CSA and ASTM standards",
        "Delivered client-approved design achieving all performance and safety specifications"
      ],
      tags: ["Facility Design", "Safety Engineering", "CSA Standards", "Structural Analysis", "Client Delivery"],
      link: {
        url: "https://wesleyeze.com/papers/vvc_paper.pdf",
        label: "View Project Paper",
        icon: "paper"
      }
    },
    {
      title: "MEC E 563 – Aircraft Wing Fuel Placement FEA",
      dateRange: "Jan 2025 – Apr 2025",
      overview: "Advanced finite element analysis of aircraft wing fuel placement optimizing structural integrity and weight.",
      bullets: [
        "Performed comprehensive FEA simulation reducing peak stress concentrations by 35%",
        "Validated analytical models against Boeing 747-8 structural requirements",
        "Optimized fuel tank positioning for minimal weight penalty and maximum safety margins"
      ],
      tags: ["FEA", "ANSYS", "Aircraft Structures", "Stress Analysis", "Boeing Standards"],
      link: {
        url: "https://wesleyeze.com/papers/563_paper.pdf",
        label: "View Project Paper",
        icon: "paper"
      }
    }
  ];

  return (
    <section className="w-full bg-background py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Featured <span className="bg-gradient-to-r from-[#c9b8a8] via-[#a89a8d] to-[#695336] bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-sm sm:text-base text-foreground/70 font-light">
            Things I've built in my spare time
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-content1 rounded-lg p-5 sm:p-6 border border-default-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              {/* Project Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3">
                {project.title}
              </h3>

              {/* Date Range */}
              {project.dateRange && (
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-foreground/70 mb-4">
                  <svg
                    className="w-4 h-4 text-[#695336]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{project.dateRange}</span>
                </div>
              )}

              {/* Project Overview */}
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-4">
                {project.overview}
              </p>

              {/* Bullet Points */}
              <ul className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-6 flex-grow space-y-2">
                {project.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="flex items-start gap-2">
                    <span className="text-[#695336] mt-1.5 flex-shrink-0">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="mt-auto">
                {/* Divider */}
                <div className="border-t border-default-200 mb-4"></div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2.5 py-1 text-xs bg-default-100 text-foreground/80 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Link */}
                {project.link && (
                  <a
                    href={project.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-foreground font-medium transition-colors duration-200"
                  >
                    {project.link.icon === 'github' && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )}
                    {project.link.icon === 'youtube' && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a2.997 2.997 0 0 0-2.11-2.11C19.568 3.5 12 3.5 12 3.5s-7.568 0-9.388.576A2.997 2.997 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.997 2.997 0 0 0 2.11 2.11c1.82.576 9.388.576 9.388.576s7.568 0 9.388-.576a2.997 2.997 0 0 0 2.11-2.11C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.75 15.02V8.98l6.5 3.02-6.5 3.02z"/>
                      </svg>
                    )}
                    {project.link.icon === 'paper' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    )}
                    <span>{project.link.label}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
