"use client";

import { useState, useEffect, useRef } from "react";

type SkillUsage = {
  projects: string[];
  experience: string[];
  education: string[];
  extracurricular: string[];
};

type Skill = {
  name: string;
  icon: string; // Icon reference or emoji
  usage: SkillUsage;
};

type SkillSection = {
  title: string;
  skills: Skill[];
};

type FilterType = "all" | "education" | "projects" | "experience" | "extracurricular";

export default function SkillsTechnology() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [expandedSkill, setExpandedSkill] = useState<Skill | null>(null);
  const [overlayPosition, setOverlayPosition] = useState<{
    x: number;
    y: number;
    position: "above" | "below";
    cardCenterX: number;
    cardTop: number;
    cardBottom: number;
    bubbleWidth: number;
  } | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Skills data organized by fixed sections
  const skillSections: SkillSection[] = [
    {
      title: "Languages",
      skills: [
        {
          name: "Python",
          icon: "🐍",
          usage: {
            projects: [
              "FEA analysis of Boeing 747-8 fuel placement optimization",
              "Automation of gear selection for MECE 360 (heavy-duty EV transmission)",
            ],
            experience: [
              "Automated well data migration and patent tracking at Beyond Energy",
              "Automation of daily site workflows at PCL Construction",
            ],
            education: ["University of Alberta, BSc Mechanical Engineering"],
            extracurricular: [],
          },
        },
        {
          name: "VBA for Excel",
          icon: "📊",
          usage: {
            projects: ["Gear catalog generation (MECE 360)"],
            experience: [
              "Excel calculator for regulator selection at NCS Multistage",
              "Finance & assets tracker at Beyond Energy",
            ],
            education: ["University of Alberta, BSc Mechanical Engineering"],
            extracurricular: ["Personal investment portfolio tracker"],
          },
        },
        {
          name: "HTML",
          icon: "🌐",
          usage: {
            projects: ["Personal portfolio website"],
            experience: [],
            education: [],
            extracurricular: ["Custom family-feud game"],
          },
        },
        {
          name: "MATLAB",
          icon: "🔬",
          usage: {
            projects: [],
            experience: ["Multi-stage pipe deflection calculator at NCS Multistage"],
            education: ["University of Alberta, BSc Mechanical Engineering"],
            extracurricular: [],
          },
        },
        {
          name: "MathCAD",
          icon: "📐",
          usage: {
            projects: [
              "VVC throwing & hockey center multi-sport training facility",
              "Gear and shaft determination calculator for MECE 360",
            ],
            experience: [
              "Regulator selection automation at NCS Multistage",
              "Back pressure determinant at Beyond Energy",
              "Line blind size variance calculations at NEX Valve",
            ],
            education: ["University of Alberta, BSc Mechanical Engineering"],
            extracurricular: [],
          },
        },
        {
          name: "ROS",
          icon: "🤖",
          usage: {
            projects: ["Capstone project — robotic system for diagnostic imaging"],
            experience: [],
            education: [],
            extracurricular: [],
          },
        },
        {
          name: "JSON / MQL",
          icon: "📋",
          usage: {
            projects: [],
            experience: ["Database management involving TIA Portal at Beyond Energy"],
            education: [],
            extracurricular: [],
          },
        },
        {
          name: "Git",
          icon: "📦",
          usage: {
            projects: ["Building personal portfolio"],
            experience: [],
            education: [],
            extracurricular: [],
          },
        },
      ],
    },
    {
      title: "Soft Skills",
      skills: [
        {
          name: "Leadership",
          icon: "👥",
          usage: {
            projects: [
              "Capstone project lead",
              "MECE E360 project manager",
            ],
            experience: [
              "Lead mechanical engineer at NEX Valve",
              "Improved field documentation at PCL",
              "Engineered flow loop with AI choke control at Beyond Energy",
            ],
            education: ["University of Alberta, BSc Mechanical Engineering"],
            extracurricular: [
              "UAlberta Track & Field captain",
              "Team Canada FISU Rhine-Ruhr captain",
            ],
          },
        },
        {
          name: "Team Working",
          icon: "🤝",
          usage: {
            projects: [
              "Capstone",
              "MECE 360 heavy-duty EV",
              "DFM RC car",
              "Aircraft wing fuel placement FEA",
            ],
            experience: [
              "Cross-functional collaboration at Beyond Energy, PCL, NCS Multistage",
            ],
            education: ["University of Alberta, BSc Mechanical Engineering"],
            extracurricular: [
              "Team Canada FISU",
              "UAlberta Track & Field",
            ],
          },
        },
        {
          name: "Intercompany Communication",
          icon: "💬",
          usage: {
            projects: ["Capstone robotic arm"],
            experience: [
              "Lead mechanical engineer at NEX Valve",
              "R&D intern at Beyond Energy",
            ],
            education: [],
            extracurricular: [
              "Team Canada FISU",
              "UAlberta Track & Field",
            ],
          },
        },
        {
          name: "Project Management",
          icon: "📋",
          usage: {
            projects: [
              "Capstone robotic arm",
              "VVC facility",
              "MECE 360 transmission",
            ],
            experience: [
              "Mechanical Engineer roles across NEX Valve, PCL, Beyond Energy, NCS Multistage",
            ],
            education: ["University of Alberta, BSc Mechanical Engineering"],
            extracurricular: [],
          },
        },
        {
          name: "Communication",
          icon: "📢",
          usage: {
            projects: [
              "Capstone",
              "VVC facility",
              "MECE 360 transmission",
            ],
            experience: [
              "Field Engineer at PCL",
              "R&D at Beyond Energy",
              "Mechanical engineering student roles at NCS Multistage",
            ],
            education: ["University of Alberta, BSc Mechanical Engineering"],
            extracurricular: ["Team captain roles"],
          },
        },
        {
          name: "Time Management",
          icon: "⏰",
          usage: {
            projects: [
              "Capstone",
              "VVC facility",
              "MECE 360 transmission",
            ],
            experience: [
              "Engineering roles at NEX Valve, PCL, Beyond Energy, NCS Multistage",
            ],
            education: ["University of Alberta, BSc Mechanical Engineering"],
            extracurricular: ["Team captain roles"],
          },
        },
        {
          name: "Presenting",
          icon: "🎤",
          usage: {
            projects: [
              "Capstone",
              "DFM RC car",
              "Aircraft wing fuel placement",
              "MECE 360 transmission",
            ],
            experience: [
              "Engineering roles at NEX Valve, PCL, Beyond Energy, NCS Multistage",
            ],
            education: ["University of Alberta, BSc Mechanical Engineering"],
            extracurricular: ["Team captain roles"],
          },
        },
        {
          name: "Technical Writing",
          icon: "✍️",
          usage: {
            projects: [
              "Capstone",
              "DFM RC car",
              "Aircraft wing fuel placement",
              "MECE 360 transmission",
              "VVC facility",
            ],
            experience: ["Engineering and R&D documentation roles"],
            education: ["University of Alberta, BSc Mechanical Engineering"],
            extracurricular: [],
          },
        },
      ],
    },
    {
      title: "Design Tools",
      skills: [
        {
          name: "Autodesk Inventor",
          icon: "🔧",
          usage: {
            projects: [],
            experience: ["R&D Mechanical Engineer at Beyond Energy"],
            education: [],
            extracurricular: [],
          },
        },
        {
          name: "SolidWorks",
          icon: "⚙️",
          usage: {
            projects: [
              "Aircraft wing fuel placement",
              "MECE 360 transmission",
            ],
            experience: ["Mechanical engineering student work at NCS Multistage"],
            education: ["University of Alberta, BSc Mechanical Engineering"],
            extracurricular: [],
          },
        },
        {
          name: "Onshape",
          icon: "📐",
          usage: {
            projects: [
              "Capstone robotic arm",
              "DFM RC car",
              "Aircraft wing fuel placement",
              "VVC facility",
            ],
            experience: ["Mechanical Engineer at NEX Valve"],
            education: ["University of Alberta, BSc Mechanical Engineering"],
            extracurricular: [],
          },
        },
        {
          name: "ANSYS APDL",
          icon: "🔬",
          usage: {
            projects: [
              "Aircraft wing fuel placement",
              "Capstone robotic arm",
              "MECE 360 transmission",
            ],
            experience: ["Mechanical Engineer at NEX Valve"],
            education: ["University of Alberta, BSc Mechanical Engineering"],
            extracurricular: [],
          },
        },
        {
          name: "Fusion 360",
          icon: "🎨",
          usage: {
            projects: ["Capstone robotic arm"],
            experience: [],
            education: [],
            extracurricular: [],
          },
        },
      ],
    },
    {
      title: "Education / Project Tooling",
      skills: [
        {
          name: "LaTeX",
          icon: "📝",
          usage: {
            projects: [
              "Aircraft wing fuel placement",
              "Capstone robotic arm",
              "VVC facility",
            ],
            experience: [],
            education: ["University of Alberta, BSc Mechanical Engineering"],
            extracurricular: [],
          },
        },
      ],
    },
  ];

  // Filter skills within a section based on active filter
  const getFilteredSkills = (skills: Skill[]): Skill[] => {
    if (activeFilter === "all") return skills;

    return skills.filter((skill) => {
      const usage = skill.usage[activeFilter];
      return usage && usage.length > 0;
    });
  };

  // Get total usage count for a skill
  const getUsageCount = (skill: Skill): number => {
    return (
      skill.usage.projects.length +
      skill.usage.experience.length +
      skill.usage.education.length +
      skill.usage.extracurricular.length
    );
  };

  // Handle card click
  const handleCardClick = (skill: Skill, event: React.MouseEvent<HTMLButtonElement>) => {
    if (expandedSkill?.name === skill.name) {
      setExpandedSkill(null);
      setOverlayPosition(null);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const cardCenterY = rect.top + rect.height / 2;
      const isInTopHalf = cardCenterY < viewportHeight / 2;
      
      // Get original card size (cards are scaled to 0.8x, so divide by 0.8)
      const originalCardWidth = rect.width / 0.8;
      // Bubble width = 1.5x original card width for snugger fit
      // Minimum 280px, maximum 450px to fit content without excessive space
      const bubbleWidth = Math.max(280, Math.min(originalCardWidth * 1.5, 450));
      
      const cardCenterX = rect.left + rect.width / 2;
      
      // Calculate X position (center on card, but keep within viewport)
      let bubbleX = cardCenterX - bubbleWidth / 2;
      bubbleX = Math.max(16, Math.min(bubbleX, window.innerWidth - bubbleWidth - 16));
      
      // Calculate Y position - bubble height will auto-adjust based on content
      let bubbleY: number;
      const gap = 6; // Small gap between card and bubble (few pixels)
      if (isInTopHalf) {
        // Position below the card
        bubbleY = rect.bottom + gap;
      } else {
        // Position above the card - start with a reasonable estimate
        // The useEffect will fine-tune after content renders
        const estimatedBubbleHeight = 200; // Reasonable estimate
        bubbleY = rect.top - estimatedBubbleHeight - gap;
      }
      
      // Ensure bubble stays within viewport
      bubbleY = Math.max(16, bubbleY);
      
      setOverlayPosition({
        x: bubbleX,
        y: bubbleY,
        position: isInTopHalf ? "below" : "above",
        cardCenterX: cardCenterX,
        cardTop: rect.top,
        cardBottom: rect.bottom,
        bubbleWidth: bubbleWidth,
      });
      setExpandedSkill(skill);
    }
  };

  // Adjust bubble position after render (especially for "above" positioning)
  useEffect(() => {
    if (expandedSkill && overlayPosition && overlayRef.current) {
      // Use requestAnimationFrame to measure after render
      requestAnimationFrame(() => {
        if (!overlayRef.current || !overlayPosition) return;
        
        const bubble = overlayRef.current;
        const bubbleRect = bubble.getBoundingClientRect();
        
        // If bubble is positioned above, ensure it's properly positioned
        if (overlayPosition.position === "above") {
          const gap = 6;
          const idealY = overlayPosition.cardTop - bubbleRect.height - gap;
          // Only adjust if it would be better positioned
          if (idealY >= 16 && Math.abs(idealY - overlayPosition.y) > 10) {
            setOverlayPosition(prev => prev ? {
              ...prev,
              y: idealY,
            } : null);
          }
        }
        
        // Ensure bubble doesn't go below viewport
        if (bubbleRect.bottom > window.innerHeight - 16) {
          const newY = window.innerHeight - bubbleRect.height - 16;
          if (newY >= 16 && overlayPosition) {
            setOverlayPosition(prev => prev ? {
              ...prev,
              y: newY,
            } : null);
          }
        }
      });
    }
  }, [expandedSkill]);

  // Handle click outside overlay and scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node) &&
        expandedSkill
      ) {
        setExpandedSkill(null);
        setOverlayPosition(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && expandedSkill) {
        setExpandedSkill(null);
        setOverlayPosition(null);
      }
    };

    const handleScroll = () => {
      if (expandedSkill) {
        setExpandedSkill(null);
        setOverlayPosition(null);
      }
    };

    if (expandedSkill) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      window.addEventListener("scroll", handleScroll, true);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [expandedSkill]);

  return (
    <section className="w-full bg-background py-16 sm:py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Skills & <span className="bg-gradient-to-r from-[#c9b8a8] via-[#a89a8d] to-[#695336] bg-clip-text text-transparent">Technology</span>
          </h2>
          <p className="text-sm sm:text-base text-foreground/70 font-light">
            Click any skill to see where I've used it
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 sm:mb-16">
          {[
            { id: "all" as FilterType, label: "All", icon: null },
            {
              id: "education" as FilterType,
              label: "Education",
              icon: (
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
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
              ),
            },
            {
              id: "projects" as FilterType,
              label: "Projects",
              icon: (
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
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              ),
            },
            {
              id: "experience" as FilterType,
              label: "Experience",
              icon: (
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
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              ),
            },
            {
              id: "extracurricular" as FilterType,
              label: "Extracurricular",
              icon: (
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              ),
            },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id);
                setExpandedSkill(null); // Close overlay when filtering
                setOverlayPosition(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                activeFilter === filter.id
                  ? "bg-[#695336] text-white hover:bg-[#5a4630]"
                  : "bg-default-100 text-foreground/80 hover:bg-[#695336]/10"
              }`}
            >
              {filter.icon && <span>{filter.icon}</span>}
              <span className="font-medium text-sm sm:text-base">
                {filter.label}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Sections with Grouping */}
        <div className="relative">
          <div>
            {skillSections.map((section, sectionIndex) => {
              const filteredSkills = getFilteredSkills(section.skills);
              
              // Hide section if no skills match the filter
              if (filteredSkills.length === 0) {
                return null;
              }
              
              return (
                <div key={sectionIndex} className="mb-12 sm:mb-16">
                  {/* Section Header */}
                  <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-6 sm:mb-8">
                    {section.title}
                  </h3>

                  {/* Skills Grid for this Section */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 sm:gap-6">
                    {filteredSkills.map((skill, skillIndex) => {
                      const usageCount = getUsageCount(skill);
                      const skillKey = `${sectionIndex}-${skillIndex}`;
                      return (
                        <button
                          key={skillKey}
                          ref={(el) => {
                            if (el) cardRefs.current.set(skillKey, el);
                          }}
                          onClick={(e) => handleCardClick(skill, e)}
                          className="aspect-square bg-content1 rounded-lg p-4 sm:p-6 border border-default-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center relative group cursor-pointer origin-center"
                          style={{ transform: 'scale(0.8)' }}
                        >
                          {/* Usage Count - Top Left */}
                          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                            <span className="text-sm sm:text-base font-semibold text-foreground bg-default-200 px-2 py-1 rounded">
                              {usageCount}
                            </span>
                          </div>

                          {/* Icon - Center Top */}
                          <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
                            {skill.icon}
                          </div>

                          {/* Skill Name */}
                          <div className="text-sm sm:text-base font-medium text-foreground text-center">
                            {skill.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pop-out Bubble - Positioned relative to clicked card */}
          {expandedSkill && overlayPosition && (
            <div
              ref={overlayRef}
              className="fixed z-50 animate-zoom-in"
              style={{
                left: `${overlayPosition.x}px`,
                top: `${overlayPosition.y}px`,
                width: `${overlayPosition.bubbleWidth}px`,
              }}
            >
              {/* Bubble Card */}
              <div
                className="bg-content1 rounded-lg shadow-2xl max-h-[70vh] overflow-y-auto p-2.5 sm:p-3 border border-default-200"
                style={{
                  width: `${overlayPosition.bubbleWidth}px`,
                  maxWidth: `${overlayPosition.bubbleWidth}px`,
                }}
              >
                {/* Title */}
                <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-2.5">
                  {expandedSkill.name} – Related Content
                </h3>

                {/* Content Sections */}
                <div className="space-y-2 sm:space-y-2.5">
                  {/* Projects */}
                  {expandedSkill.usage.projects.length > 0 && (
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5 uppercase">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          />
                        </svg>
                        Projects ({expandedSkill.usage.projects.length})
                      </h4>
                      <ul className="space-y-0.5 pl-3 sm:pl-4">
                        {expandedSkill.usage.projects.map((project, idx) => (
                          <li
                            key={idx}
                            className="text-[10px] sm:text-[11px] text-foreground/80 flex items-start gap-1.5"
                          >
                            <span className="text-foreground/50 mt-0.5">•</span>
                            <span>{project}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Work Experience */}
                  {expandedSkill.usage.experience.length > 0 && (
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5 uppercase">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Work Experience ({expandedSkill.usage.experience.length})
                      </h4>
                      <ul className="space-y-0.5 pl-3 sm:pl-4">
                        {expandedSkill.usage.experience.map((exp, idx) => (
                          <li
                            key={idx}
                            className="text-[10px] sm:text-[11px] text-foreground/80 flex items-start gap-1.5"
                          >
                            <span className="text-foreground/50 mt-0.5">•</span>
                            <span>{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Education */}
                  {expandedSkill.usage.education.length > 0 && (
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5 uppercase">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 14l9-5-9-5-9 5 9 5z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                          />
                        </svg>
                        Education ({expandedSkill.usage.education.length})
                      </h4>
                      <ul className="space-y-0.5 pl-3 sm:pl-4">
                        {expandedSkill.usage.education.map((edu, idx) => (
                          <li
                            key={idx}
                            className="text-[10px] sm:text-[11px] text-foreground/80 flex items-start gap-1.5"
                          >
                            <span className="text-foreground/50 mt-0.5">•</span>
                            <span>{edu}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Extracurricular */}
                  {expandedSkill.usage.extracurricular.length > 0 && (
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5 uppercase">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                        Extracurricular ({expandedSkill.usage.extracurricular.length})
                      </h4>
                      <ul className="space-y-0.5 pl-3 sm:pl-4">
                        {expandedSkill.usage.extracurricular.map((extra, idx) => (
                          <li
                            key={idx}
                            className="text-[10px] sm:text-[11px] text-foreground/80 flex items-start gap-1.5"
                          >
                            <span className="text-foreground/50 mt-0.5">•</span>
                            <span>{extra}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
