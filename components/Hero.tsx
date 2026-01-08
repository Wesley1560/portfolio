"use client";

import { useState, useEffect } from "react";

interface HeroProps {
  professionalSummary: string;
}

export default function Hero({ professionalSummary }: HeroProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const phrases = [
    "National Level Athlete",
    "Problem Solver",
    "Mechanical Engineer",
    "Competitor",
  ];

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const deletingSpeed = 30;

    if (!isDeleting && displayText === currentPhrase) {
      // Wait before deleting
      setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      // Move to next phrase
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    } else if (isDeleting) {
      // Delete character
      setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
      }, deletingSpeed);
    } else {
      // Type character
      setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
      }, typingSpeed);
    }
  }, [displayText, isDeleting, currentIndex, phrases]);

  const handleScrollDown = () => {
    const snapshotsSection = document.getElementById("snapshots");
    if (snapshotsSection) {
      snapshotsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Highlight key words in professional summary
  const highlightKeywords = (text: string) => {
    const keywords = [
      "mechanical engineer",
      "FEA-driven",
      "production-ready",
    ];

    // Sort by length (longest first) to avoid partial matches
    const sortedKeywords = keywords.sort((a, b) => b.length - a.length);

    let highlightedText = text;
    sortedKeywords.forEach((keyword) => {
      // Escape special regex characters
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escapedKeyword}\\b`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        (match) => `<span class="text-[#695336] dark:text-[#d4c4b0] font-medium">${match}</span>`
      );
    });

    return highlightedText;
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-start bg-white dark:bg-black relative pt-28 sm:pt-32 md:pt-36 lg:pt-44 xl:pt-40 pb-8 sm:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col items-center min-h-screen">
        {/* Top Section - Comfortable spacing */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6 text-center">
          {/* Stacked Greeting - Bold with Gradient - Responsive sizing */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Hello,
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-7xl font-bold bg-gradient-to-r from-[#c9b8a8] via-[#a89a8d] to-[#695336] bg-clip-text text-transparent leading-[1.4] pb-2 sm:pb-3">
              I'm Wesley
            </h1>
          </div>

          {/* Typing Effect - Directly below greeting */}
          <div className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-18 flex items-center justify-center">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light text-gray-700 dark:text-gray-300">
              {displayText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          {/* Professional Summary - Wider max-width for readability */}
          <p
            className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{
              __html: highlightKeywords("DEBUG: HERO TEXT SOURCE CONFIRMED"),
            }}
          />
        </div>

        {/* Seeking Employment - One line of space after summary */}
        <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-green-600 dark:text-green-400 font-medium mt-4 sm:mt-5 md:mt-6">
          Seeking full-time employment
        </p>

        {/* Scroll Down - 3 lines below seeking employment */}
        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col items-center gap-2">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light">
            Scroll down
          </p>
          <button
            onClick={handleScrollDown}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:translate-y-1"
            aria-label="Scroll down"
          >
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
