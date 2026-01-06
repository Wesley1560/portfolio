import { portfolioContent } from "@/lib/content";

export default function Achievements() {
  const { achievements } = portfolioContent;

  return (
    <section className="space-y-3">
      <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">Achievements</h2>
      <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm leading-relaxed text-gray-300 list-disc list-inside">
        {achievements.map((achievement, index) => (
          <li key={index}>{achievement}</li>
        ))}
      </ul>
    </section>
  );
}
