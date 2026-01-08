export default function TechStack() {
  const techCategories = [
    {
      category: "Robotics",
      skills: ["ROS2", "MoveIt2"]
    },
    {
      category: "Analysis",
      skills: ["ANSYS", "APDL", "FEA"]
    },
    {
      category: "CAD",
      skills: ["SolidWorks", "Onshape", "Fusion 360"]
    },
    {
      category: "Programming",
      skills: ["Python", "MATLAB", "VBA"]
    },
    {
      category: "Tooling",
      skills: ["Git", "AWS"]
    }
  ];

  return (
    <section className="w-full bg-background py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Tech <span className="bg-gradient-to-r from-[#c9b8a8] via-[#a89a8d] to-[#695336] bg-clip-text text-transparent">Stack</span>
          </h2>
          <p className="text-sm sm:text-base text-foreground/70 font-light">
            Core technologies and tools
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {techCategories.map((category, index) => (
            <div
              key={index}
              className="bg-content1 rounded-lg p-4 sm:p-6 border border-default-200 shadow-sm"
            >
              {/* Category Header */}
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3 text-center">
                {category.category}
              </h3>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2 justify-center">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2.5 py-1 text-xs bg-[#695336]/10 text-[#695336] dark:bg-[#695336]/20 dark:text-[#d4c4b0] rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}