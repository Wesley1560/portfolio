"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setMounted(true);
    // Get initial theme from html element
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.classList.contains("dark") ? "dark" : "light";
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    const htmlElement = document.documentElement;
    if (newTheme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { label: "Work Experience", id: "work-experience" },
    { label: "Education", id: "education" },
    { label: "Projects", id: "projects" },
    { label: "Skills & Technology", id: "skills-technology" },
    { label: "Get In Touch", id: "get-in-touch" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 relative flex items-center justify-center">
              <Image
                src={theme === "dark" ? "/website_logo/wesley_eze_monogram_logo_light.png" : "/website_logo/wesley_eze_monogram_logo_dark.png"}
                alt="Wesley Eze Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Navigation Buttons - Centered */}
          <div className="flex-1 flex items-center justify-center">
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
            {/* Mobile menu - simplified */}
            <div className="md:hidden flex items-center gap-2">
              {navItems.slice(0, 3).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {item.label.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Resume & Theme Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Resume Download */}
            <a
              href="/papers/Wesley_Eze_Resume.pdf"
              download="Wesley_Eze_Resume.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
            >
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Resume
            </a>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
