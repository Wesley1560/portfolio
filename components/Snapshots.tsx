"use client";

import { useState, useRef, useEffect } from "react";

export default function Snapshots() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  const [isBelow66Percent, setIsBelow66Percent] = useState(false);

  // Check if arrows should be shown (when content overflows AND below 66% breakpoint)
  const checkArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      // Only show arrows when below 66% breakpoint AND content overflows
      setShowArrows(isBelow66Percent && scrollWidth > clientWidth);
    }
  };

  // Check viewport width and determine if we're below 66% of typical desktop (1280px = 844px breakpoint)
  const checkViewport = () => {
    const viewportWidth = window.innerWidth;
    // 66% of 1280px (typical desktop) = 844px
    // Using 850px as the breakpoint for cleaner transition
    const below66 = viewportWidth < 850;
    setIsBelow66Percent(below66);
    
    // Check arrows after state update
    setTimeout(() => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowArrows(below66 && scrollWidth > clientWidth);
      }
    }, 0);
  };

  // Check on mount and resize
  useEffect(() => {
    // Check after a brief delay to ensure DOM is ready
    const timer = setTimeout(() => {
      checkViewport();
    }, 100);
    
    window.addEventListener("resize", checkViewport);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkViewport);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.5; // Scroll by 50% (2 cards)
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const cards = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      number: "5",
      subheader: "MecE Internships",
      subtext: "Industry experience",
      sectionId: "work-experience",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      number: "6",
      subheader: "Personal Projects",
      subtext: "Built",
      sectionId: "projects",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      number: "5x",
      subheader: "National Medalist",
      subtext: "3x Champion, 2x Runner-up",
      sectionId: "athletic-background",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      number: "2",
      subheader: "National Team Captain Selections",
      subtext: "Team Canada FISU World Games Captain",
      sectionId: "athletic-background",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v9M12 14l-9-5M12 14l9-5M12 9V4" />
        </svg>
      ),
      number: "3x",
      subheader: "Academic All-Canadian",
      subtext: "Putting the student in student-athlete",
      sectionId: "education",
    },
  ];

  return (
    <section
      id="snapshots"
      className="w-full bg-background py-16 sm:py-20 md:py-24 overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2">
            By The <span className="bg-gradient-to-r from-[#c9b8a8] via-[#a89a8d] to-[#695336] bg-clip-text text-transparent">Numbers</span>
          </h2>
          <p className="text-sm sm:text-base text-foreground/70 font-light">
            A snapshot of my achievements
          </p>
        </div>

        {/* Single horizontal line with navigation arrows */}
        <div className="relative overflow-visible">
          {/* Left Arrow - Show when content overflows */}
          {showArrows && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-20 bg-content1 rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-default-200"
              aria-label="Scroll left"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-foreground/80"
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
          )}

          {/* Scrollable Container - Single horizontal line */}
          <div
            ref={scrollContainerRef}
            className={`scrollbar-hide ${isBelow66Percent ? "overflow-x-auto" : "overflow-x-hidden"}`}
            onScroll={checkArrows}
            style={{ overflowY: "visible" }}
          >
            <div className={`flex gap-4 sm:gap-6 ${!isBelow66Percent ? "w-full" : ""}`}>
              {cards.map((card, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(card.sectionId)}
                  style={
                    isBelow66Percent
                      ? {
                          minWidth: "calc(50% - 0.5rem)",
                          width: "calc(50% - 0.5rem)",
                        }
                      : {
                          flex: "1 1 0%",
                          minWidth: 0,
                        }
                  }
                  className="bg-content1 rounded-lg p-5 sm:p-6 border border-default-200 shadow-sm hover:shadow-lg hover:border-foreground/30 hover:-translate-y-1 transition-all duration-200 text-left flex-shrink-0 flex flex-col group cursor-pointer relative z-10 hover:z-20 min-h-[200px]"
                >
                  {/* Top-left Icon */}
                  <div className="text-[#695336] group-hover:text-[#5a4630] transition-colors duration-200 mb-3">
                    {card.icon}
                  </div>

                  {/* Big Number */}
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2 group-hover:text-foreground/90 transition-colors duration-200">
                    {card.number}
                  </div>

                  {/* Subheader */}
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-foreground/90 transition-colors duration-200">
                    {card.subheader}
                  </h3>

                  {/* Greyed Subtext */}
                  <p className="text-xs sm:text-sm text-foreground/60 group-hover:text-foreground/70 transition-colors duration-200 mt-auto">
                    {card.subtext}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Arrow - Show when content overflows */}
          {showArrows && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-20 bg-content1 rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-default-200"
              aria-label="Scroll right"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-foreground/80"
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
          )}
        </div>
      </div>
    </section>
  );
}
