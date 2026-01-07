"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
  const [theme, setTheme] = useState<"light" | "dark">("dark");
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

  // Theme detection
  useEffect(() => {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.classList.contains("dark") ? "dark" : "light";
    setTheme(currentTheme);

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const newTheme = htmlElement.classList.contains("dark") ? "dark" : "light";
          setTheme(newTheme);
        }
      });
    });

    observer.observe(htmlElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    return () => observer.disconnect();
  }, []);

  // Icon mapping - skill name to icon filename
  const getIconPath = (skillName: string) => {
    const iconMap: Record<string, string> = {
      "Python": "python.png",
      "VBA for Excel": "python.png", // Using python icon as placeholder
      "HTML": "python.png", // Using python icon as placeholder
      "MATLAB": "MATLAB.png",
      "MathCAD": "MathCAD.png",
      "ROS": "python.png", // Using python icon as placeholder
      "JSON / MQL": "JSON.png",
      "Git": "GIT.png",
      "Leadership": "leadership.png",
      "Team Working": "team_working.png",
      "Intercompany Communication": "intercompany_communicaiton.png",
      "Project Management": "project_management.png",
      "Communication": "communication.png",
      "Time Management": "time_management.png",
      "Presenting": "presenting.png",
      "Technical Writing": "technical_writing.png",
      "Autodesk Inventor": "Autodesk_Inventor.png",
      "SolidWorks": "solidworks.png",
      "Onshape": "onshape.png",
      "ANSYS APDL": "Ansys.png",
      "Fusion 360": "fusion360.png",
      "LaTeX": "LaTeX.png",
    };

    const filename = iconMap[skillName];
    // Use dark logos for both themes to ensure visibility
    return filename ? `/dark_logos/${filename}` : null;
  };

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
              "Boeing 747-8 Fuel Placement FEA",
              "MECE 360 EV Transmission — Gear Selection Automation",
            ],
            experience: [
              "R&D Intern — Beyond Energy",
              "Field Engineer — PCL Construction",
            ],
            education: ["University of Alberta — BSc Mechanical Engineering"],
            extracurricular: [],
          },
        },
        {
          name: "VBA for Excel",
          icon: "📊",
          usage: {
            projects: ["MECE 360 EV Transmission — Gear Catalog"],
            experience: [
              "Mechanical Engineering Student — NCS Multistage",
              "R&D Intern — Beyond Energy",
            ],
            education: ["University of Alberta — BSc Mechanical Engineering"],
            extracurricular: ["Personal Investment Portfolio Tracker"],
          },
        },
        {
          name: "HTML",
          icon: "🌐",
          usage: {
            projects: ["Personal Portfolio Website"],
            experience: [],
            education: [],
            extracurricular: ["Custom Family-Feud Game"],
          },
        },
        {
          name: "MATLAB",
          icon: "🔬",
          usage: {
            projects: [],
            experience: ["Mechanical Engineering Student — NCS Multistage"],
            education: ["University of Alberta — BSc Mechanical Engineering"],
            extracurricular: [],
          },
        },
        {
          name: "MathCAD",
          icon: "📐",
          usage: {
            projects: [
              "VVC Multi-Sport Training Facility",
              "MECE 360 EV Transmission — Gear & Shaft Calculator",
            ],
            experience: [
              "Mechanical Engineering Student — NCS Multistage",
              "R&D Intern — Beyond Energy",
              "Mechanical Engineer — NEX Valve",
            ],
            education: ["University of Alberta — BSc Mechanical Engineering"],
            extracurricular: [],
          },
        },
        {
          name: "ROS",
          icon: "🤖",
          usage: {
            projects: ["Capstone Robotic Arm — Diagnostic Imaging System"],
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
            experience: ["R&D Intern — Beyond Energy"],
            education: [],
            extracurricular: [],
          },
        },
        {
          name: "Git",
          icon: "📦",
          usage: {
            projects: ["Personal Portfolio Website"],
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
              "Capstone Robotic Arm — Project Lead",
              "MECE 360 EV Transmission — Project Manager",
            ],
            experience: [
              "Mechanical Engineer — NEX Valve",
              "Field Engineer — PCL Construction",
              "R&D Intern — Beyond Energy",
            ],
            education: ["University of Alberta — BSc Mechanical Engineering"],
            extracurricular: [
              "Captain — UAlberta Track & Field",
              "Captain — Team Canada FISU Rhine-Ruhr",
            ],
          },
        },
        {
          name: "Team Working",
          icon: "🤝",
          usage: {
            projects: [
              "Capstone Robotic Arm",
              "MECE 360 EV Transmission",
              "DFM RC Car",
              "Boeing 747-8 Fuel Placement FEA",
            ],
            experience: [
              "R&D Mechanical Engineer Intern — Beyond Energy",
              "Field Engineer — PCL Construction",
              "Mechanical Engineering Student — NCS Multistage",
            ],
            education: ["University of Alberta — BSc Mechanical Engineering"],
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
            projects: ["Capstone Robotic Arm"],
            experience: [
              "Mechanical Engineer — NEX Valve",
              "R&D Mechanical Engineer Intern — Beyond Energy",
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
              "Capstone Robotic Arm",
              "VVC Multi-Sport Training Facility",
              "MECE 360 EV Transmission",
            ],
            experience: [
              "Mechanical Engineer — NEX Valve",
              "Field Engineer — PCL Construction",
              "R&D Mechanical Engineer Intern — Beyond Energy",
              "Mechanical Engineering Student — NCS Multistage",
            ],
            education: ["University of Alberta — BSc Mechanical Engineering"],
            extracurricular: [],
          },
        },
        {
          name: "Communication",
          icon: "📢",
          usage: {
            projects: [
              "Capstone Robotic Arm",
              "VVC Multi-Sport Training Facility",
              "MECE 360 EV Transmission",
            ],
            experience: [
              "Field Engineer — PCL Construction",
              "R&D Mechanical Engineer Intern — Beyond Energy",
              "Mechanical Engineering Student — NCS Multistage",
            ],
            education: ["University of Alberta — BSc Mechanical Engineering"],
            extracurricular: [
              "Captain — UAlberta Track & Field",
              "Captain — Team Canada FISU",
            ],
          },
        },
        {
          name: "Time Management",
          icon: "⏰",
          usage: {
            projects: [
              "Capstone Robotic Arm",
              "VVC Multi-Sport Training Facility",
              "MECE 360 EV Transmission",
            ],
            experience: [
              "Mechanical Engineer — NEX Valve",
              "Field Engineer — PCL Construction",
              "R&D Mechanical Engineer Intern — Beyond Energy",
              "Mechanical Engineering Student — NCS Multistage",
            ],
            education: ["University of Alberta — BSc Mechanical Engineering"],
            extracurricular: [
              "Captain — UAlberta Track & Field",
              "Captain — Team Canada FISU",
            ],
          },
        },
        {
          name: "Presenting",
          icon: "🎤",
          usage: {
            projects: [
              "Capstone Robotic Arm",
              "DFM RC Car",
              "Boeing 747-8 Fuel Placement FEA",
              "MECE 360 EV Transmission",
            ],
            experience: [
              "Mechanical Engineer — NEX Valve",
              "Field Engineer — PCL Construction",
              "R&D Intern — Beyond Energy",
              "Mechanical Engineering Student — NCS Multistage",
            ],
            education: ["University of Alberta — BSc Mechanical Engineering"],
            extracurricular: [
              "Captain — UAlberta Track & Field",
              "Captain — Team Canada FISU",
            ],
          },
        },
        {
          name: "Technical Writing",
          icon: "✍️",
          usage: {
            projects: [
              "Capstone Robotic Arm",
              "DFM RC Car",
              "Boeing 747-8 Fuel Placement FEA",
              "MECE 360 EV Transmission",
              "VVC Multi-Sport Training Facility",
            ],
            experience: [
              "Mechanical Engineer — NEX Valve",
              "Field Engineer — PCL Construction",
              "R&D Mechanical Engineer Intern — Beyond Energy",
              "Mechanical Engineering Student — NCS Multistage",
            ],
            education: ["University of Alberta — BSc Mechanical Engineering"],
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
            experience: ["R&D Mechanical Engineer Intern — Beyond Energy"],
            education: [],
            extracurricular: [],
          },
        },
        {
          name: "SolidWorks",
          icon: "⚙️",
          usage: {
            projects: [
              "Boeing 747-8 Fuel Placement FEA",
              "MECE 360 EV Transmission",
            ],
            experience: ["Mechanical Engineering Student — NCS Multistage"],
            education: ["University of Alberta — BSc Mechanical Engineering"],
            extracurricular: [],
          },
        },
        {
          name: "Onshape",
          icon: "📐",
          usage: {
            projects: [
              "Capstone Robotic Arm",
              "DFM RC Car",
              "Boeing 747-8 Fuel Placement FEA",
              "VVC Multi-Sport Training Facility",
            ],
            experience: ["Mechanical Engineer — NEX Valve"],
            education: ["University of Alberta — BSc Mechanical Engineering"],
            extracurricular: [],
          },
        },
        {
          name: "ANSYS APDL",
          icon: "🔬",
          usage: {
            projects: [
              "Boeing 747-8 Fuel Placement FEA",
              "Capstone Robotic Arm",
              "MECE 360 EV Transmission",
            ],
            experience: ["Mechanical Engineer — NEX Valve"],
            education: ["University of Alberta — BSc Mechanical Engineering"],
            extracurricular: [],
          },
        },
        {
          name: "Fusion 360",
          icon: "🎨",
          usage: {
            projects: ["Capstone Robotic Arm"],
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
              "Boeing 747-8 Fuel Placement FEA",
              "Capstone Robotic Arm",
              "VVC Multi-Sport Training Facility",
            ],
            experience: [],
            education: ["University of Alberta — BSc Mechanical Engineering"],
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
                          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-3 sm:mb-4 relative flex items-center justify-center">
                            {getIconPath(skill.name) ? (
                              <Image
                                src={getIconPath(skill.name)!}
                                alt={`${skill.name} icon`}
                                fill
                                className="object-contain"
                              />
                            ) : (
                              <div className="text-3xl sm:text-4xl md:text-5xl">
                                {skill.icon}
                              </div>
                            )}
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
