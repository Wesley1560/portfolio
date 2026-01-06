import { portfolioContent } from "@/lib/content";

export default function Contact() {
  const { basicInfo } = portfolioContent;

  return (
    <footer className="border-t border-gray-800 pt-6 sm:pt-8 mt-12 sm:mt-16">
      <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm">
        <a href={`mailto:${basicInfo.email}`} className="font-medium underline underline-offset-4 text-gray-300">
          {basicInfo.email}
        </a>
        {basicInfo.links.github && (
          <a href={basicInfo.links.github} className="font-medium underline underline-offset-4 text-gray-300">
            GitHub
          </a>
        )}
      </div>
    </footer>
  );
}
