import { portfolioContent } from "@/lib/content";

export default function Skills() {
  const { skills } = portfolioContent;

  return (
    <section className="space-y-3">
      <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">Core Skills</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        <div>
          <h3 className="font-semibold mb-3 text-base text-white">Technical</h3>
          <ul className="space-y-1.5 text-sm leading-relaxed text-gray-300">
            {skills.technical.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-base text-white">Tools / Frameworks</h3>
          <ul className="space-y-1.5 text-sm leading-relaxed text-gray-300">
            {skills.toolsFrameworks.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-base text-white">Non-Technical</h3>
          <ul className="space-y-1.5 text-sm leading-relaxed text-gray-300">
            {skills.nonTechnical.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
