"use client";

import { useState, useEffect, useRef } from "react";

type TimelineEntry = {
  date: string;
  description: string;
  image: string; // Placeholder image path
};

export default function AthleticBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const entriesRef = useRef<(HTMLDivElement | null)[]>([]);

  const timelineEntries: TimelineEntry[] = [
    {
      date: "Present Day",
      description:
        "Pursuing elite bobsled competition while remaining active in high-performance athletics, aiming for Team Canada selection.",
      image: "/api/placeholder/400/300", // Placeholder - replace with actual images
    },
    {
      date: "August 2025",
      description: "National Champion at the Canada Summer Games.",
      image: "/api/placeholder/400/300",
    },
    {
      date: "July 2025",
      description:
        "Selected for Team Canada in track and field and served as team captain at the FISU Rhine-Ruhr World Games.",
      image: "/api/placeholder/400/300",
    },
    {
      date: "March 2025",
      description: "Silver medalist at the USports National Championships.",
      image: "/api/placeholder/400/300",
    },
    {
      date: "February 2024",
      description: "Gold medalist at the CanWest Championships.",
      image: "/api/placeholder/400/300",
    },
    {
      date: "2017–2020",
      description:
        "High school basketball captain and multi-time city and provincial champion in track and field.",
      image: "/api/placeholder/400/300",
    },
  ];

  useEffect(() => {
    const observers = entriesRef.current.map((entry, index) => {
      if (!entry) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActiveIndex(index);
            }
          });
        },
        {
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: "-20% 0px -20% 0px",
        }
      );

      observer.observe(entry);
      return observer;
    });

    return () => {
      observers.forEach((observer) => {
        if (observer) observer.disconnect();
      });
    };
  }, []);

  return (
    <section className="w-full bg-background py-16 sm:py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[#c9b8a8] via-[#a89a8d] to-[#695336] bg-clip-text text-transparent">Athletic</span> Background
          </h2>
          <p className="text-sm sm:text-base text-foreground/70 font-light">
            Competitive progression and leadership in high-performance sport
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line - Desktop */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-default-300 hidden md:block"></div>
          
          {/* Mobile Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-default-300 md:hidden"></div>

          {/* Timeline Entries */}
          <div className="space-y-24 sm:space-y-32 md:space-y-40">
            {timelineEntries.map((entry, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  ref={(el) => {
                    entriesRef.current[index] = el;
                  }}
                  className={`relative transition-all duration-700 ${
                    activeIndex === index
                      ? "opacity-100 scale-100"
                      : "opacity-50 scale-98"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 pl-8 md:pl-0">
                    {/* Date Label - Left side on desktop for even, right for odd */}
                    <div
                      className={`md:w-1/2 flex justify-start ${
                        isEven ? "md:justify-end" : "md:justify-start"
                      }`}
                    >
                      <div
                        className={`flex items-center gap-4 ${
                          isEven ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        {/* Timeline Dot */}
                        <div
                          className={`w-4 h-4 rounded-full border-4 transition-all duration-500 relative z-10 ${
                            activeIndex === index
                              ? "bg-foreground border-foreground scale-125"
                              : "bg-background border-default-300"
                          }`}
                        ></div>
                        <span
                          className={`text-sm sm:text-base font-medium transition-colors duration-300 ${
                            activeIndex === index
                              ? "text-foreground"
                              : "text-foreground/70"
                          }`}
                        >
                          {entry.date}
                        </span>
                      </div>
                    </div>

                    {/* Content (Image + Description) - Right side on desktop for even, left for odd */}
                    <div
                      className={`md:w-1/2 space-y-4 ${
                        isEven ? "md:order-first" : ""
                      }`}
                    >
                      {/* Image */}
                      <div
                        className={`relative overflow-hidden rounded-lg transition-all duration-700 ${
                          activeIndex === index
                            ? "opacity-100 translate-y-0 translate-x-0"
                            : isEven
                            ? "opacity-70 translate-y-4 -translate-x-4"
                            : "opacity-70 translate-y-4 translate-x-4"
                        }`}
                      >
                        <div className="aspect-[4/3] bg-default-200 relative">
                          <img
                            src={entry.image}
                            alt={entry.description}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to gradient if image fails to load
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                          {/* Placeholder gradient if image doesn't load */}
                          <div className="absolute inset-0 bg-gradient-to-br from-default-300 to-default-400 flex items-center justify-center">
                            <span className="text-foreground/60 text-sm">
                              {entry.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p
                        className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
                          activeIndex === index
                            ? "text-foreground"
                            : "text-foreground/80"
                        }`}
                      >
                        {entry.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
