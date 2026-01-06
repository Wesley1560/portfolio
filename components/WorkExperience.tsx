"use client";

import { useRef, useState, useEffect, MouseEvent, TouchEvent } from "react";

type WorkExperience = {
  yearStart: string;
  yearEnd: string;
  monthStart: string;
  monthEnd: string;
  workType: string;
  jobTitle: string;
  companyName: string;
  location: string;
  description: string;
  tags: string[];
};

export default function WorkExperience() {
  // Stubbed data - can be replaced with real data later
  const currentRole: WorkExperience[] = [
    {
      yearStart: "2024",
      yearEnd: "Present",
      monthStart: "January",
      monthEnd: "Present",
      workType: "Full-Time",
      jobTitle: "Software Engineer",
      companyName: "Tech Company",
      location: "Remote",
      description: "Building scalable web applications and contributing to open-source projects.",
      tags: ["React", "TypeScript", "Node.js", "AWS"],
    },
  ];

  const pastExperiences: WorkExperience[] = [
    {
      yearStart: "2023",
      yearEnd: "2024",
      monthStart: "June",
      monthEnd: "December",
      workType: "Graduation Internship",
      jobTitle: "Research Intern",
      companyName: "Research Lab",
      location: "Edmonton, AB",
      description: "Conducted research on privacy-preserving machine learning techniques and implemented proof-of-concept solutions.",
      tags: ["AI/ML", "Privacy-Preserving ML", "FHE", "Python"],
    },
    {
      yearStart: "2022",
      yearEnd: "2023",
      monthStart: "May",
      monthEnd: "August",
      workType: "Summer Internship",
      jobTitle: "Mechanical Engineering Intern",
      companyName: "Engineering Firm",
      location: "Calgary, AB",
      description: "Developed CAD models and performed structural analysis for various engineering projects.",
      tags: ["CAD", "FEA", "SolidWorks", "Engineering"],
    },
    {
      yearStart: "2021",
      yearEnd: "2022",
      monthStart: "September",
      monthEnd: "April",
      workType: "Co-op",
      jobTitle: "Field Engineer",
      companyName: "Construction Company",
      location: "Vancouver, BC",
      description: "Managed on-site operations and coordinated with multiple teams to ensure project completion.",
      tags: ["Project Management", "Field Work", "Construction"],
    },
  ];

  const [activeTab, setActiveTab] = useState<"current" | "past">("current");
  const activeData = activeTab === "current" ? currentRole : pastExperiences;

  // Carousel state
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(1);

  // Reset carousel when tab changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsTransitioning(true);
  }, [activeTab]);

  // Determine cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Calculate max index based on cards per view
  const maxIndex = Math.max(0, activeData.length - cardsPerView);

  // Calculate transform offset
  const getTransform = () => {
    const cardWidth = 100 / cardsPerView;
    const offset = currentIndex * cardWidth;
    return `translateX(-${offset}%)`;
  };

  // Handle bounded navigation (stops at ends)
  const navigate = (direction: "prev" | "next") => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (direction === "next") {
        // Stop at the last position
        return Math.min(prev + 1, maxIndex);
      } else {
        // Stop at the first position
        return Math.max(prev - 1, 0);
      }
    });
  };

  // Get active dot index (simple, no circular logic)
  const getActiveDotIndex = () => {
    return currentIndex;
  };

  const dragStartRef = useRef(0);
  const hasNavigatedRef = useRef(false);

  // Drag handlers
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setIsTransitioning(false);
    setStartX(e.pageX);
    dragStartRef.current = e.pageX;
    hasNavigatedRef.current = false;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current || hasNavigatedRef.current) return;
    e.preventDefault();
    const diff = dragStartRef.current - e.pageX;
    const cardWidth = containerRef.current.offsetWidth / cardsPerView;
    const threshold = cardWidth * 0.25;

    if (Math.abs(diff) > threshold) {
      hasNavigatedRef.current = true;
      if (diff > 0) {
        navigate("next");
      } else {
        navigate("prev");
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsTransitioning(true);
    hasNavigatedRef.current = false;
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setIsTransitioning(false);
    setStartX(e.touches[0].pageX);
    dragStartRef.current = e.touches[0].pageX;
    hasNavigatedRef.current = false;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current || hasNavigatedRef.current) return;
    const diff = dragStartRef.current - e.touches[0].pageX;
    const cardWidth = containerRef.current.offsetWidth / cardsPerView;
    const threshold = cardWidth * 0.25;

    if (Math.abs(diff) > threshold) {
      hasNavigatedRef.current = true;
      if (diff > 0) {
        navigate("next");
      } else {
        navigate("prev");
      }
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsTransitioning(true);
    hasNavigatedRef.current = false;
  };

  return (
    <section className="w-full bg-background py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Work <span className="bg-gradient-to-r from-[#c9b8a8] via-[#a89a8d] to-[#695336] bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-sm sm:text-base text-foreground/70 font-light">
            Professional journey through industry and research
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Toggle Buttons */}
          <div className="flex flex-col items-start">
            <div className="flex gap-3">
              <button
                onClick={() => setActiveTab("current")}
                className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === "current"
                    ? "bg-[#695336] text-white hover:bg-[#5a4630]"
                    : "bg-default-100 text-foreground/80 hover:bg-[#695336]/10"
                }`}
              >
                <span className="font-medium">
                  Current Role ({currentRole.length})
                </span>
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === "past"
                    ? "bg-[#695336] text-white hover:bg-[#5a4630]"
                    : "bg-default-100 text-foreground/80 hover:bg-[#695336]/10"
                }`}
              >
                <span className="font-medium">
                  Past Experiences ({pastExperiences.length})
                </span>
              </button>
            </div>
            {/* Divider Line */}
            <div className="mt-4 border-b border-default-300 w-full max-w-[600px]"></div>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            <div
              ref={containerRef}
              className="overflow-hidden relative mx-12 md:mx-16"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex min-h-[300px] sm:min-h-[350px]"
                style={{
                  transform: getTransform(),
                  transition: isTransitioning
                    ? "transform 0.3s ease-in-out"
                    : "none",
                }}
              >
                {activeData.map((experience, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-2 sm:px-3 flex"
                    style={{ width: `${100 / cardsPerView}%` }}
                  >
                    <div className="bg-content1 rounded-lg p-6 sm:p-8 border border-default-200 shadow-sm hover:shadow-md transition-all duration-200 w-full flex flex-col">
                      {/* Top Row */}
                      <div className="flex justify-between items-start mb-4 sm:mb-6">
                        <div className="flex items-center gap-2 text-sm sm:text-base text-foreground/70">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
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
                          <span>
                            {experience.yearStart} – {experience.yearEnd}
                          </span>
                        </div>
                        <span className="px-3 py-1 text-xs sm:text-sm bg-default-200 text-foreground/80 rounded-full font-medium">
                          {experience.workType}
                        </span>
                      </div>

                      {/* Main Content */}
                      <div className="mb-4 sm:mb-6">
                        <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-1 sm:mb-2">
                          {experience.jobTitle}
                        </h3>
                        <p className="text-base sm:text-lg text-foreground/80 mb-3 sm:mb-4">
                          {experience.companyName}
                        </p>

                        {/* Metadata Row */}
                        <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-foreground/70 mb-4 sm:mb-6">
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
                            <span>{experience.location}</span>
                          </div>
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
                            <span>
                              {experience.monthStart} {experience.yearStart} –{" "}
                              {experience.monthEnd} {experience.yearEnd}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-foreground/80 leading-relaxed pl-4 sm:pl-6 border-l-2 border-default-300">
                          {experience.description}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-default-200 my-4 sm:my-6"></div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {experience.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 text-xs bg-default-200 text-foreground/80 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow Buttons */}
            {activeData.length > 0 && (
              <>
                <button
                  onClick={() => navigate("prev")}
                  disabled={currentIndex === 0}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 bg-content1 rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 border border-default-200 ${
                    currentIndex === 0
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:shadow-xl cursor-pointer"
                  }`}
                  aria-label="Previous card"
                >
                  <svg
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      currentIndex === 0
                        ? "text-foreground/40"
                        : "text-foreground/80"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => navigate("next")}
                  disabled={currentIndex >= maxIndex}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 bg-content1 rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 border border-default-200 ${
                    currentIndex >= maxIndex
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:shadow-xl cursor-pointer"
                  }`}
                  aria-label="Next card"
                >
                  <svg
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      currentIndex >= maxIndex
                        ? "text-foreground/40"
                        : "text-foreground/80"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Pagination Dots */}
            {activeData.length > 0 && (
              <div className="flex justify-center gap-2 mt-8 sm:mt-10">
                {activeData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsTransitioning(true);
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      getActiveDotIndex() === index
                        ? "bg-foreground"
                        : "bg-default-300 hover:bg-default-400"
                    }`}
                    aria-label={`Go to card ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
