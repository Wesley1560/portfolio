import { portfolioContent } from "@/lib/content";

export default function Summary() {
  const { professionalSummary } = portfolioContent;

  return (
    <section className="space-y-3">
      <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">Professional Summary</h2>
      <p className="text-sm sm:text-base leading-relaxed text-gray-300">
        {professionalSummary.join(' ')}
      </p>
    </section>
  );
}
