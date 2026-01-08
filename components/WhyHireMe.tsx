export default function WhyHireMe() {
  const highlights = [
    {
      title: "Robotics & Automation",
      description: "9-axis diagnostic imaging system delivering a 6,667% increase in daily imaging throughput.",
      metric: "6,667% throughput increase"
    },
    {
      title: "Structural Analysis & FEA",
      description: "Aircraft wing fuel placement optimization achieving 20% stress reduction validated against industry standards.",
      metric: "20% stress reduction"
    },
    {
      title: "Project Leadership",
      description: "Led multi-disciplinary engineering teams delivering client-approved systems under budget and ahead of schedule.",
      metric: "Under budget & ahead of schedule"
    }
  ];

  return (
    <section className="w-full bg-background py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Why You Should <span className="bg-gradient-to-r from-[#c9b8a8] via-[#a89a8d] to-[#695336] bg-clip-text text-transparent">Hire Me</span>
          </h2>
        </div>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-content1 rounded-lg p-6 sm:p-8 border border-default-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Header */}
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3">
                {highlight.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-4">
                {highlight.description}
              </p>

              {/* Metric Badge */}
              <div className="inline-block px-3 py-1 bg-[#695336]/10 text-[#695336] dark:bg-[#695336]/20 dark:text-[#d4c4b0] rounded-full text-sm font-medium">
                {highlight.metric}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}