"use client";

import { useState, useEffect, useRef } from "react";

// Data structure for course performance
type CourseData = {
  name: string; // Short course code for x-axis
  grade: number; // 0-10 scale
  credits: number;
  period: string; // e.g., "Year 1, Semester 1"
  fullName: string; // Full course description for tooltip
};

type YearData = {
  year: number;
  courses: CourseData[];
};

// Academic transcript data - sourced from official transcript
const educationData: YearData[] = [
  {
    year: 1,
    courses: [
      // Fall 2020
      { name: "CHEM 103", grade: 8.5, credits: 4.3, period: "Year 1, Fall 2020", fullName: "CHEM 103: Intro University Chemistry I" },
      { name: "ENCMP 100", grade: 8.5, credits: 3.8, period: "Year 1, Fall 2020", fullName: "ENCMP 100: Computer Programming Engineers" },
      { name: "ENGG 100", grade: 9.6, credits: 1.1, period: "Year 1, Fall 2020", fullName: "ENGG 100: Success in Engineering" },
      { name: "ENGG 130", grade: 9.0, credits: 4.0, period: "Year 1, Fall 2020", fullName: "ENGG 130: Engineering Mechanics" },
      { name: "MATH 100", grade: 7.4, credits: 3.5, period: "Year 1, Fall 2020", fullName: "MATH 100: Calculus I" },
      { name: "PHYS 130", grade: 7.8, credits: 3.8, period: "Year 1, Fall 2020", fullName: "PHYS 130: Wave Motion, Optics and Sound" },
      // Winter 2021
      { name: "CHEM 105", grade: 7.4, credits: 3.8, period: "Year 1, Winter 2021", fullName: "CHEM 105: Intro University Chemistry II" },
      { name: "EN PH 131", grade: 7.4, credits: 4.3, period: "Year 1, Winter 2021", fullName: "EN PH 131: Mechanics" },
      { name: "ENGG 160", grade: 9.6, credits: 2.0, period: "Year 1, Winter 2021", fullName: "ENGG 160: Intro Eng Des Comm Profession" },
      { name: "ENGL 199", grade: 9.0, credits: 3.0, period: "Year 1, Winter 2021", fullName: "ENGL 199: Engl for Engineering Students" },
      { name: "MATH 101", grade: 8.5, credits: 3.5, period: "Year 1, Winter 2021", fullName: "MATH 101: Calculus II" },
      { name: "MATH 102", grade: 8.5, credits: 3.5, period: "Year 1, Winter 2021", fullName: "MATH 102: Applied Linear Algebra" },
      // Spring/Summer 2021
      { name: "STAT 235A", grade: 7.1, credits: 0.0, period: "Year 1, Spring/Summer 2021", fullName: "STAT 235A: Intro Stats for Engineering" },
      { name: "STAT 235B", grade: 7.1, credits: 3.8, period: "Year 1, Spring/Summer 2021", fullName: "STAT 235B: Intro Stats for Engineering" },
    ],
  },
  {
    year: 2,
    courses: [
      // Fall 2021
      { name: "CIV E 270", grade: 8.5, credits: 4.5, period: "Year 2, Fall 2021", fullName: "CIV E 270: Mechanics Deformable Bodies I" },
      { name: "ENGG 299", grade: 9.6, credits: 1.5, period: "Year 2, Fall 2021", fullName: "ENGG 299: Orientn Co-op Ed" },
      { name: "MATH 209", grade: 7.4, credits: 3.5, period: "Year 2, Fall 2021", fullName: "MATH 209: Calculus III" },
      { name: "MEC E 230", grade: 7.8, credits: 3.5, period: "Year 2, Fall 2021", fullName: "MEC E 230: Intro to Thermo-Fluid Sciences" },
      { name: "MEC E 260", grade: 6.8, credits: 3.5, period: "Year 2, Fall 2021", fullName: "MEC E 260: Mechanical Design I" },
      { name: "MEC E 265", grade: 7.1, credits: 3.5, period: "Year 2, Fall 2021", fullName: "MEC E 265: Engineering Graphics and CAD" },
      // Winter 2022
      { name: "CHE 243", grade: 7.4, credits: 3.5, period: "Year 2, Winter 2022", fullName: "CHE 243: Engineering Thermodynamics" },
      { name: "ECE 209", grade: 6.8, credits: 3.8, period: "Year 2, Winter 2022", fullName: "ECE 209: Fundamentals of Electrical Eng" },
      { name: "MAT E 202", grade: 7.8, credits: 3.5, period: "Year 2, Winter 2022", fullName: "MAT E 202: Materials Science II" },
      { name: "MATH 201", grade: 7.4, credits: 3.5, period: "Year 2, Winter 2022", fullName: "MATH 201: Differential Equations" },
      { name: "MEC E 200", grade: 9.5, credits: 2.0, period: "Year 2, Winter 2022", fullName: "MEC E 200: Intro Mechanical Engineering" },
      { name: "MEC E 250", grade: 9.0, credits: 3.5, period: "Year 2, Winter 2022", fullName: "MEC E 250: Engineering Mechanics II" },
      // Summer 2022
      { name: "WKEXP 901", grade: 9.6, credits: 0.5, period: "Year 2, Summer 2022", fullName: "WKEXP 901: Engineering Work Experience I" },
    ],
  },
  {
    year: 3,
    courses: [
      // Fall 2022
      { name: "ENG M 401", grade: 9.0, credits: 3.0, period: "Year 3, Fall 2022", fullName: "ENG M 401: Financial Mngm for Engineers" },
      { name: "WKEXP 902", grade: 9.6, credits: 0.5, period: "Year 3, Fall 2022", fullName: "WKEXP 902: Engineering Work Experience II" },
      // Winter 2023
      { name: "MATH 300", grade: 7.4, credits: 3.0, period: "Year 3, Winter 2023", fullName: "MATH 300: Advanced Boundary Value Prob I" },
      { name: "MEC E 300", grade: 8.5, credits: 3.5, period: "Year 3, Winter 2023", fullName: "MEC E 300: Mechanical Measurements" },
      { name: "MEC E 301", grade: 8.5, credits: 2.5, period: "Year 3, Winter 2023", fullName: "MEC E 301: Mechanical Engineering Lab I" },
      { name: "MEC E 331", grade: 8.5, credits: 3.5, period: "Year 3, Winter 2023", fullName: "MEC E 331: Fluid Mechanics I" },
      { name: "MEC E 371", grade: 8.5, credits: 3.5, period: "Year 3, Winter 2023", fullName: "MEC E 371: Heat Transfer" },
      { name: "MEC E 380", grade: 7.8, credits: 3.5, period: "Year 3, Winter 2023", fullName: "MEC E 380: Adv Strength of Materials I" },
      // Summer 2023
      { name: "WKEXP 903", grade: 9.6, credits: 0.5, period: "Year 3, Summer 2023", fullName: "WKEXP 903: Engineering Wrk Experience III" },
    ],
  },
  {
    year: 4,
    courses: [
      // Fall 2023
      { name: "WKEXP 904", grade: 9.6, credits: 0.5, period: "Year 4, Fall 2023", fullName: "WKEXP 904: Engineering Work Experience IV" },
      // Winter 2024
      { name: "ECON 101", grade: 8.5, credits: 3.0, period: "Year 4, Winter 2024", fullName: "ECON 101: Introduction to Microeconomics" },
      { name: "MEC E 340", grade: 8.5, credits: 3.5, period: "Year 4, Winter 2024", fullName: "MEC E 340: Applied Thermodynamics" },
      { name: "MEC E 360", grade: 9.5, credits: 3.8, period: "Year 4, Winter 2024", fullName: "MEC E 360: Mechanical Design II" },
      { name: "MEC E 362", grade: 6.8, credits: 3.8, period: "Year 4, Winter 2024", fullName: "MEC E 362: Mechanics of Machines" },
      { name: "MEC E 390", grade: 7.8, credits: 3.5, period: "Year 4, Winter 2024", fullName: "MEC E 390: Numerical Methods Mec Eng" },
      // Spring/Summer 2024
      { name: "ENGG 404A", grade: 8.5, credits: 0.0, period: "Year 4, Spring/Summer 2024", fullName: "ENGG 404A: Engg Safety and Risk Mgmt-Lead" },
      { name: "MEC E 403A", grade: 7.4, credits: 0.0, period: "Year 4, Spring/Summer 2024", fullName: "MEC E 403A: Mechanical Engineering Lab II" },
      { name: "MEC E 420A", grade: 7.4, credits: 0.0, period: "Year 4, Spring/Summer 2024", fullName: "MEC E 420A: Fdback Control Des Dynam Syst" },
      { name: "MEC E 430A", grade: 9.0, credits: 0.0, period: "Year 4, Spring/Summer 2024", fullName: "MEC E 430A: Fluid Mechanics II" },
      { name: "MEC E 463A", grade: 9.0, credits: 0.0, period: "Year 4, Spring/Summer 2024", fullName: "MEC E 463A: Thermo-Fluids Systems Design" },
      { name: "MEC E 537A", grade: 8.5, credits: 0.0, period: "Year 4, Spring/Summer 2024", fullName: "MEC E 537A: Aerodynamics" },
      { name: "ENGG 404B", grade: 8.5, credits: 3.8, period: "Year 4, Spring/Summer 2024", fullName: "ENGG 404B: Engg Safety and Risk Mgmt-Lead" },
      { name: "MEC E 403B", grade: 7.4, credits: 2.5, period: "Year 4, Spring/Summer 2024", fullName: "MEC E 403B: Mechanical Engineering Lab II" },
      { name: "MEC E 420B", grade: 7.4, credits: 3.8, period: "Year 4, Spring/Summer 2024", fullName: "MEC E 420B: Fdback Control Des Dynam Syst" },
      { name: "MEC E 430B", grade: 9.0, credits: 3.0, period: "Year 4, Spring/Summer 2024", fullName: "MEC E 430B: Fluid Mechanics II" },
      { name: "MEC E 463B", grade: 9.0, credits: 4.0, period: "Year 4, Spring/Summer 2024", fullName: "MEC E 463B: Thermo-Fluids Systems Design" },
      { name: "MEC E 537B", grade: 8.5, credits: 3.0, period: "Year 4, Spring/Summer 2024", fullName: "MEC E 537B: Aerodynamics" },
    ],
  },
  {
    year: 5,
    courses: [
      // Fall 2024
      { name: "SUST 201", grade: 7.8, credits: 3.0, period: "Year 5, Fall 2024", fullName: "SUST 201: Intro to Sustainability" },
      { name: "WKEXP 905", grade: 9.6, credits: 3.0, period: "Year 5, Fall 2024", fullName: "WKEXP 905: Engineering Work Experience V" },
      // Winter 2025
      { name: "ENGG 400", grade: 9.6, credits: 1.0, period: "Year 5, Winter 2025", fullName: "ENGG 400: Practice Engineering Profes" },
      { name: "MEC E 415", grade: 7.8, credits: 3.0, period: "Year 5, Winter 2025", fullName: "MEC E 415: Busting Myths with Analysis" },
      { name: "MEC E 451", grade: 7.4, credits: 3.5, period: "Year 5, Winter 2025", fullName: "MEC E 451: Vibrations and Sound" },
      { name: "MEC E 460", grade: 8.5, credits: 4.5, period: "Year 5, Winter 2025", fullName: "MEC E 460: Design Project" },
      { name: "MEC E 464", grade: 8.5, credits: 4.0, period: "Year 5, Winter 2025", fullName: "MEC E 464: Design for Manufacture" },
      { name: "MEC E 563", grade: 8.5, credits: 4.5, period: "Year 5, Winter 2025", fullName: "MEC E 563: Finite Element Method" },
    ],
  },
];

type TooltipData = {
  course: CourseData;
  x: number;
  y: number;
  transformX?: string;
  transformY?: string;
} | null;

export default function Education() {
  const [tooltip, setTooltip] = useState<TooltipData>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const [activeTab, setActiveTab] = useState<"capstone" | "performance">("capstone");

  // Animation trigger function
  const triggerGraphAnimation = () => {
    if (isAnimating) return; // Prevent multiple simultaneous animations
    
    setIsAnimating(true);
    setAnimationProgress(0);
    
    const duration = 1500; // 1.50 seconds
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      setAnimationProgress(easedProgress);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        animationRef.current = null;
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const renderGraph = (yearData: YearData, index: number) => {
    // Combine A/B course pairs - use B course grade and credits, remove A/B suffix from name
    const combineABCourses = (courses: CourseData[]): CourseData[] => {
      const combinedCourses: CourseData[] = [];
      const processedPairs = new Set<string>();

      courses.forEach(course => {
        // Check if this is part of an A/B pair
        const baseName = course.name.replace(/[AB]$/, '');

        if (course.name.endsWith('A')) {
          // Find the corresponding B course
          const bCourse = courses.find(c => c.name === baseName + 'B');
          if (bCourse) {
            // Use B course data with combined name (remove A/B suffix)
            combinedCourses.push({
              ...bCourse,
              name: baseName, // Remove A/B suffix
              fullName: bCourse.fullName.replace(/[AB]: /, ': ') // Remove A/B from tooltip
            });
            processedPairs.add(baseName);
          }
        } else if (course.name.endsWith('B')) {
          // Skip B courses that were already processed as part of A/B pairs
          if (!processedPairs.has(baseName)) {
            // B course without A counterpart - just remove B suffix
            combinedCourses.push({
              ...course,
              name: baseName,
              fullName: course.fullName.replace('B: ', ': ')
            });
          }
        } else {
          // Regular course without A/B
          combinedCourses.push(course);
        }
      });

      return combinedCourses;
    };

    const courses = combineABCourses(yearData.courses);
    const width = 1000; // Decreased from 1200 for less horizontal stretch
    const height = 400; // Increased from 350 for better vertical readability
    const padding = { top: 50, right: 80, bottom: 100, left: 70 };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    const maxGrade = 10;
    const labelAngle = -60; // Angle in degrees (upwards from left to right)

    // Calculate x positions
    const xStep = graphWidth / (courses.length - 1);
    const points = courses.map((course, i) => {
      const x = padding.left + i * xStep;
      const y =
        padding.top +
        graphHeight -
        (course.grade / maxGrade) * graphHeight;
      return { ...course, x, y };
    });

    // Create smooth Bezier curve path
    const createSmoothPath = (pathPoints: Array<{ x: number; y: number }>) => {
      if (pathPoints.length < 2) return "";
      
      let path = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
      
      for (let i = 0; i < pathPoints.length - 1; i++) {
        const current = pathPoints[i];
        const next = pathPoints[i + 1];
        const prev = i > 0 ? pathPoints[i - 1] : current;
        const afterNext = i < pathPoints.length - 2 ? pathPoints[i + 2] : next;
        
        // Calculate control points for smooth curve
        const cp1x = current.x + (next.x - prev.x) / 6;
        const cp1y = current.y + (next.y - prev.y) / 6;
        const cp2x = next.x - (afterNext.x - current.x) / 6;
        const cp2y = next.y - (afterNext.y - current.y) / 6;
        
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
      }
      
      return path;
    };

    const fullSmoothPath = createSmoothPath(points);
    
    // Calculate animation-based path and visible points
    const totalPathLength = points.length - 1;
    // Use Math.ceil to ensure smoother progression and prevent the last point from lagging
    const visiblePointIndex = Math.min(totalPathLength, Math.ceil(animationProgress * totalPathLength));
    const visiblePoints = isAnimating
      ? points.slice(0, visiblePointIndex + 1)
      : points;
    
    // Create animated path (only up to current progress)
    const animatedPath = isAnimating && visiblePoints.length > 1
      ? createSmoothPath(visiblePoints)
      : fullSmoothPath;
    
    // Calculate gradient opacity based on animation progress
    const gradientOpacity = isAnimating ? animationProgress : 1;
    
    // Create gradient path for area under curve (animated)
    const areaPath = animatedPath + ` L ${visiblePoints[visiblePoints.length - 1]?.x || points[0].x} ${padding.top + graphHeight} L ${points[0].x} ${padding.top + graphHeight} Z`;

    // Calculate text truncation based on available space
    const getTruncatedName = (name: string, maxLength: number = 20) => {
      if (name.length <= maxLength) return name;
      return name.substring(0, maxLength - 3) + "...";
    };

    return (
      <div key={index} className="mb-12 sm:mb-16">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 text-center">
          Year {yearData.year} - Q1 & Q2 Course Grades
        </h3>
        <div className="overflow-x-auto">
          <div className="w-full max-w-full">
            <svg
              width="100%"
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-auto"
            >
              {/* Gradient definition - light red gradient with animation */}
              <defs>
                <linearGradient
                  id={`gradient-${index}`}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="var(--brown-fill)" stopOpacity={0.25 * gradientOpacity} />
                  <stop offset="50%" stopColor="var(--brown-fill)" stopOpacity={0.15 * gradientOpacity} />
                  <stop offset="100%" stopColor="var(--brown-fill)" stopOpacity={0.05 * gradientOpacity} />
                </linearGradient>
              </defs>

              {/* Y-axis labels - only show 10, 6, 3, 0 */}
              {[10, 6, 3, 0].map((grade) => {
                const y =
                  padding.top + graphHeight - (grade / maxGrade) * graphHeight;
                return (
                  <g key={grade}>
                    <text
                      x={padding.left - 15}
                      y={y + 4}
                      textAnchor="end"
                      className="text-xs sm:text-sm fill-gray-600 dark:fill-gray-600 font-medium"
                    >
                      {grade}
                    </text>
                  </g>
                );
              })}

              {/* Vertical dotted guide lines from x-axis to data points */}
              {points.map((point, i) => (
                <line
                  key={`guide-${i}`}
                  x1={point.x}
                  y1={padding.top + graphHeight}
                  x2={point.x}
                  y2={point.y}
                  stroke="#d1d5db"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.5"
                />
              ))}

              {/* Area under curve */}
              <path
                d={areaPath}
                fill={`url(#gradient-${index})`}
              />

              {/* Smooth curved line - animated */}
              <path
                d={animatedPath}
                fill="none"
                stroke="var(--brown-fill)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points and labels - only show visible points during animation */}
              {visiblePoints.map((point, i) => {
                const truncatedName = getTruncatedName(point.name, 15);
                const labelY = height - padding.bottom + 25;
                const labelX = point.x;

                return (
                  <g key={i}>
                    {/* Data point - increased size for better visibility, animated opacity */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="7"
                      fill="var(--brown-fill)"
                      stroke="white"
                      strokeWidth="2.5"
                      className="cursor-pointer hover:r-9 transition-all"
                      style={{
                        opacity: isAnimating && i === visiblePoints.length - 1 
                          ? Math.min(1, (animationProgress * totalPathLength - i) * 2)
                          : 1
                      }}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pointX = rect.left + rect.width / 2;
                        const pointY = rect.top - 10;
                        
                        // Estimate tooltip dimensions (will be measured dynamically)
                        const tooltipWidth = 180; // Approximate width
                        const tooltipHeight = 100; // Approximate height
                        const viewportWidth = window.innerWidth;
                        const viewportHeight = window.innerHeight;
                        
                        // Calculate if tooltip would overflow on right
                        const wouldOverflowRight = pointX + tooltipWidth / 2 > viewportWidth - 20;
                        // Calculate if tooltip would overflow on left
                        const wouldOverflowLeft = pointX - tooltipWidth / 2 < 20;
                        
                        // Determine positioning
                        let finalX = pointX;
                        let transformX = "-50%"; // Center by default
                        
                        if (wouldOverflowRight && !wouldOverflowLeft) {
                          // Position to the left of the point
                          finalX = pointX - 10;
                          transformX = "-100%";
                        } else if (wouldOverflowLeft && !wouldOverflowRight) {
                          // Position to the right of the point
                          finalX = pointX + 10;
                          transformX = "0%";
                        }
                        
                        // Check vertical overflow
                        let finalY = pointY;
                        let transformY = "-100%"; // Above by default
                        
                        if (pointY - tooltipHeight < 20) {
                          // Position below if not enough space above
                          finalY = rect.bottom + 10;
                          transformY = "0%";
                        }
                        
                        setTooltip({
                          course: point,
                          x: finalX,
                          y: finalY,
                          transformX,
                          transformY,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />

                    {/* Course name label - angled upwards (60 degrees) */}
                    <text
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      transform={`rotate(${labelAngle} ${labelX} ${labelY})`}
                      className="text-xs fill-gray-700 dark:fill-gray-700"
                      style={{ dominantBaseline: "middle" }}
                    >
                      {truncatedName}
                    </text>
                  </g>
                );
              })}

              {/* Axes */}
              <line
                x1={padding.left}
                y1={padding.top + graphHeight}
                x2={width - padding.right}
                y2={padding.top + graphHeight}
                stroke="#374151"
                strokeWidth="2"
              />
              <line
                x1={padding.left}
                y1={padding.top}
                x2={padding.left}
                y2={padding.top + graphHeight}
                stroke="#374151"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full bg-background py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[#c9b8a8] via-[#a89a8d] to-[#695336] bg-clip-text text-transparent">Education</span>
          </h2>
          <p className="text-sm sm:text-base text-foreground/70 font-light">
            Solid foundation in Mechanical Engineering, with a focus in
            Aerodynamics
          </p>
        </div>

        {/* Education Card */}
        <div className="max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="bg-content1 rounded-lg p-6 sm:p-8 border border-default-200 shadow-sm">
            {/* Top Row */}
            <div className="flex items-center gap-2 text-sm sm:text-base text-foreground/70 mb-6">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#695336]"
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
              <span>Sep 2020 – Jun 2025</span>
            </div>

            {/* Degree Information */}
            <div className="mb-6">
              <div className="flex items-start gap-3 mb-2">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/80 mt-1"
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14v7"
                  />
                </svg>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
                    BSc. Mechanical Engineering (Co-op)
                  </h3>
                  <p className="text-base sm:text-lg text-foreground/80 mt-1">
                    University of Alberta
                  </p>
                </div>
              </div>
            </div>

            {/* Metadata Row */}
            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-foreground/70 mb-6">
              <div className="flex items-center gap-1.5">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Edmonton, Canada</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#695336]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>EGA: 3.6 / 4.0</span>
              </div>
            </div>

            {/* Achievements */}
            <div className="border-t border-gray-200 dark:border-gray-200 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5 text-[#695336]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <h4 className="text-sm sm:text-base font-semibold text-foreground">
                  Achievements
                </h4>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <span className="px-2.5 py-1 text-xs bg-[#695336]/10 text-[#695336] dark:bg-[#695336]/20 dark:text-[#d4c4b0] rounded-full font-medium">
                  3x Academic All-Canadian
                </span>
                <span className="px-2.5 py-1 text-xs bg-[#695336]/10 text-[#695336] dark:bg-[#695336]/20 dark:text-[#d4c4b0] rounded-full font-medium">
                  Graduated with Distinction
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setActiveTab("capstone")}
              className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === "capstone"
                  ? "bg-[#695336] text-white hover:bg-[#5a4630]"
                  : "bg-default-100 text-foreground/80 hover:bg-[#695336]/10"
              }`}
            >
              <span className="font-medium">Capstone Project</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("performance");
                // Trigger animation when switching to performance tab
                setTimeout(() => triggerGraphAnimation(), 100);
              }}
              className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === "performance"
                  ? "bg-[#695336] text-white hover:bg-[#5a4630]"
                  : "bg-default-100 text-foreground/80 hover:bg-[#695336]/10"
              }`}
            >
              <span className="font-medium">Course Performance</span>
            </button>
          </div>
          {/* Divider Line */}
          <div className="mt-4 border-b border-gray-300 dark:border-gray-300 w-full max-w-[600px]"></div>
        </div>

        {/* Capstone Project Card */}
        {activeTab === "capstone" && (
          <div className="max-w-2xl mx-auto mb-16 sm:mb-20">
            <div 
              className="bg-content1 rounded-lg p-6 sm:p-8 border border-default-200 shadow-sm hover:shadow-md transition-all duration-200"
            >
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
              Capstone Project
            </h3>
            
            {/* Header */}
            <h4 className="text-lg sm:text-xl font-medium text-foreground mb-1">
              Robotic Arm for Advanced Dataset Generation
            </h4>
            <p className="text-sm sm:text-base text-foreground/60 mb-4">
              Fabri Sciences Inc. — wound3.com
            </p>
            
            {/* Metadata row */}
            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-foreground/70 mb-4">
              <div className="flex items-center gap-1.5">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>January – April 2025</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#695336]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="font-medium">Grade: 9.6 / 10</span>
              </div>
            </div>
            
            {/* Project description */}
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-5 pl-4 border-l-2 border-[#695336]/30">
              Led a 6-person engineering team to design and prototype a 6-axis robotic arm with 3-axis gantry system for automated data collection. Successfully deployed in operational use for wound imaging research.
            </p>
            
            {/* Key Achievements */}
            <div className="mb-5">
              <h5 className="text-sm sm:text-base font-semibold text-foreground mb-3">
                Key Achievements
              </h5>
              <ul className="space-y-2 text-sm sm:text-base text-foreground/80">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-2.5 h-2.5 mt-2 flex-shrink-0"
                    fill="#695336"
                    viewBox="0 0 8 8"
                  >
                    <path d="M0 0L8 4L0 8Z" />
                  </svg>
                  <span>Designed 9-axis motion system (6-axis arm + 3-axis gantry) for precise positioning</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-2.5 h-2.5 mt-2 flex-shrink-0"
                    fill="#695336"
                    viewBox="0 0 8 8"
                  >
                    <path d="M0 0L8 4L0 8Z" />
                  </svg>
                  <span>Managed team of 6 engineers through full design-to-deployment lifecycle</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-2.5 h-2.5 mt-2 flex-shrink-0"
                    fill="#695336"
                    viewBox="0 0 8 8"
                  >
                    <path d="M0 0L8 4L0 8Z" />
                  </svg>
                  <span>Delivered operational prototype now in active use for medical imaging research</span>
                </li>
              </ul>
            </div>
            
            {/* Bold statement */}
            <p className="text-sm sm:text-base font-semibold text-foreground mb-5">
              Presented research findings to 110+ attendees at the University of Alberta Engineering Conference.
            </p>
            
            {/* Divider */}
            <div className="border-t border-default-200 mb-5"></div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <span className="px-2.5 py-1 text-xs bg-[#695336]/10 text-[#695336] dark:bg-[#695336]/20 dark:text-[#d4c4b0] rounded-full font-medium">
                Robotics
              </span>
              <span className="px-2.5 py-1 text-xs bg-[#695336]/10 text-[#695336] dark:bg-[#695336]/20 dark:text-[#d4c4b0] rounded-full font-medium">
                CAD / Onshape
              </span>
              <span className="px-2.5 py-1 text-xs bg-[#695336]/10 text-[#695336] dark:bg-[#695336]/20 dark:text-[#d4c4b0] rounded-full font-medium">
                FEA / ANSYS
              </span>
              <span className="px-2.5 py-1 text-xs bg-[#695336]/10 text-[#695336] dark:bg-[#695336]/20 dark:text-[#d4c4b0] rounded-full font-medium">
                ROS
              </span>
              <span className="px-2.5 py-1 text-xs bg-[#695336]/10 text-[#695336] dark:bg-[#695336]/20 dark:text-[#d4c4b0] rounded-full font-medium">
                Team Leadership
              </span>
              <span className="px-2.5 py-1 text-xs bg-[#695336]/10 text-[#695336] dark:bg-[#695336]/20 dark:text-[#d4c4b0] rounded-full font-medium">
                Prototyping
              </span>
            </div>

            {/* Project Link */}
            <div className="mt-5 pt-4 border-t border-default-200">
              <a
                href="https://wesleyeze.com/papers/capstone_paper.pdf"
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
        </div>
        )}

        {/* Course Performance Visualizations */}
        {activeTab === "performance" && (
          <div className="max-w-6xl mx-auto">
            {educationData.map((yearData, index) => renderGraph(yearData, index))}
          </div>
        )}
      </div>

      {/* Tooltip - dynamically positioned to avoid viewport overflow */}
      {tooltip && (
        <div
          className="fixed z-50 bg-foreground text-background text-xs sm:text-sm rounded-lg px-3 py-2 shadow-lg pointer-events-none whitespace-nowrap"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: `translate(${tooltip.transformX || "-50%"}, ${tooltip.transformY || "-100%"})`,
          }}
        >
          <div className="font-semibold mb-1">{tooltip.course.fullName}</div>
          <div className="text-background/80">
            Grade: {tooltip.course.grade.toFixed(1)} / 10
          </div>
          <div className="text-background/80">Credits: {tooltip.course.credits}</div>
          <div className="text-background/80">{tooltip.course.period}</div>
        </div>
      )}
    </section>
  );
}
