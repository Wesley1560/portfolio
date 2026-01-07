"use client";

import { useState } from "react";

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    try {
      const form = e.currentTarget;
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        // Hide success message after 3 seconds
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-background py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header & Subheader */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Get In <span className="bg-gradient-to-r from-[#c9b8a8] via-[#a89a8d] to-[#695336] bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-sm sm:text-base text-foreground/70 font-light">
            Have a question or want to work together? I'd love to hear from you.
          </p>
        </div>

        {/* Two-column layout on larger screens */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* Left Column - Form Box */}
            <div className="flex-1 lg:max-w-2xl">
              <div className="bg-content1 rounded-lg p-6 sm:p-8 md:p-10 border border-default-200 shadow-sm">
            <form 
              action="https://formspree.io/f/xlgdqdkn" 
              method="POST"
              onSubmit={handleSubmit} 
              className="space-y-4 sm:space-y-5"
            >
              {/* Hidden inputs for Formspree configuration */}
              <input type="hidden" name="_subject" value="Portfolio Message – New Submission" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="_gotcha" style={{ display: "none" }} />
              {/* Name - Required */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm sm:text-base font-medium text-foreground mb-1.5"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 sm:py-3 border border-default-300 rounded-lg bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all"
                />
              </div>

              {/* Email - Required */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm sm:text-base font-medium text-foreground mb-1.5"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 sm:py-3 border border-default-300 rounded-lg bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all"
                />
              </div>

              {/* Phone - Optional */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm sm:text-base font-medium text-foreground mb-1.5"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone number (optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 sm:py-3 border border-default-300 rounded-lg bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all"
                />
              </div>

              {/* Subject - Required */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm sm:text-base font-medium text-foreground mb-1.5"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 sm:py-3 border border-default-300 rounded-lg bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all"
                />
              </div>

              {/* Message - Required */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm sm:text-base font-medium text-foreground mb-1.5"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 sm:py-3 border border-default-300 rounded-lg bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all resize-y"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#695336] text-white px-6 py-3 sm:py-3.5 rounded-lg font-medium text-sm sm:text-base hover:bg-[#5a4630] disabled:bg-[#695336]/50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                {!isSubmitting && (
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>

              {/* Success Message - Inline below button */}
              {submitSuccess && (
                <div className="flex items-center gap-2 justify-center mt-3">
                  <svg
                    className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm sm:text-base text-green-600 dark:text-green-400 font-medium">
                    Message received; will get back to you soon!
                  </p>
                </div>
              )}

              {/* Error Message - Inline below button */}
              {submitError && (
                <div className="flex items-center gap-2 justify-center mt-3">
                  <svg
                    className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm sm:text-base text-red-600 dark:text-red-400 font-medium">
                    Something went wrong. Please try again.
                  </p>
                </div>
              )}
            </form>
              </div>
            </div>

            {/* Right Column - Contact Info & Social Links */}
            <div className="lg:w-80 xl:w-96 flex flex-col gap-8 lg:gap-10">
              {/* Contact Info Box */}
              <div className="bg-content1 rounded-lg p-6 sm:p-8 border border-default-200 shadow-sm">
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Email Icon */}
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              {/* Email Text */}
              <div className="flex-1">
                <p className="text-sm sm:text-base font-medium text-foreground mb-0.5">
                  Email
                </p>
                <a
                  href="mailto:wesley1560@gmail.com"
                  className="text-xs sm:text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  wesley1560@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Connect With Me Box */}
          <div className="bg-content1 rounded-lg p-6 sm:p-8 border border-default-200 shadow-sm">
            <h3 className="text-base sm:text-lg font-medium text-foreground mb-4 sm:mb-5">
              Connect With Me
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              {/* Instagram Button */}
              <a
                href="https://www.instagram.com/ezewesley/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-0 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 bg-background border border-default-300 rounded-lg text-foreground font-medium text-sm sm:text-base hover:bg-default-100 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="hidden md:inline">Instagram</span>
              </a>

              {/* LinkedIn Button */}
              <a
                href="https://www.linkedin.com/in/wesleyeze/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-0 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 bg-background border border-default-300 rounded-lg text-foreground font-medium text-sm sm:text-base hover:bg-default-100 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="hidden md:inline">LinkedIn</span>
              </a>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
