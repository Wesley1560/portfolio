type Project = {
  year: number;
  month: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
};

export default function FeaturedProjects() {
  // Placeholder data - can be replaced with real data later
  const projects: Project[] = [
    {
      year: 2024,
      month: "March",
      title: "Real-time Collaborative Whiteboard",
      description: "A web-based collaborative whiteboard application with real-time synchronization, allowing multiple users to draw and interact simultaneously.",
      tags: ["React", "WebSockets", "Canvas API", "TypeScript"],
      link: "https://example.com/project1",
    },
    {
      year: 2024,
      month: "January",
      title: "Personal Finance Tracker",
      description: "A comprehensive budgeting application with expense categorization, goal tracking, and data visualization.",
      tags: ["Next.js", "Prisma", "PostgreSQL", "Chart.js"],
      link: "https://example.com/project2",
    },
    {
      year: 2023,
      month: "November",
      title: "AI-Powered Recipe Generator",
      description: "Machine learning application that generates personalized recipes based on available ingredients and dietary preferences.",
      tags: ["Python", "TensorFlow", "Flask", "OpenAI API"],
      link: "https://example.com/project3",
    },
    {
      year: 2023,
      month: "August",
      title: "Task Management CLI Tool",
      description: "A command-line interface for managing tasks with features like priority levels, due dates, and project organization.",
      tags: ["Node.js", "CLI", "SQLite", "Inquirer"],
      link: "https://example.com/project4",
    },
    {
      year: 2023,
      month: "May",
      title: "Weather Dashboard Widget",
      description: "A beautiful weather dashboard widget with location-based forecasts, interactive maps, and detailed meteorological data visualization.",
      tags: ["Vue.js", "Weather API", "D3.js", "PWA"],
      link: "https://example.com/project5",
    },
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
              {/* Top Left: Hammer Icon + Year */}
              <div className="flex items-center gap-2 mb-4">
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
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
                <span className="text-sm text-foreground/70 font-medium">
                  {project.year}
                </span>
              </div>

              {/* Project Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3">
                {project.title}
              </h3>

              {/* Calendar Icon + Month Year */}
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
                <span>{project.month} {project.year}</span>
              </div>

              {/* Project Description */}
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-6 flex-grow line-clamp-3">
                {project.description}
              </p>

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

                {/* View Project Link */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-foreground font-medium transition-colors duration-200"
                >
                  <span>View Project</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
