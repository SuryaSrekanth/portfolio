import { about, education, experience } from "@/content/site";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <p className="eyebrow">About</p>
          <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(1.9rem,4.5vw,3rem)] leading-tight font-semibold tracking-[-0.02em]">
            From the test bench to the codebase.
          </h2>
          <div className="mt-7 space-y-5">
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-[1.0625rem] leading-relaxed text-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Experience</p>
          <ol className="mt-5 space-y-8">
            {experience.map((role) => (
              <li
                key={role.org}
                className="border-l-2 border-line pl-5 transition-colors hover:border-violet"
              >
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {role.title}
                  </h3>
                  <span className="text-muted">{role.org}</span>
                </div>
                <p className="mt-1 font-mono text-xs text-muted">
                  {role.period} · {role.location}
                </p>
                <ul className="mt-3 space-y-2">
                  {role.points.map((point) => (
                    <li
                      key={point.slice(0, 24)}
                      className="text-sm leading-relaxed text-muted"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <p className="eyebrow mt-10">Education</p>
          <ul className="mt-5 space-y-4">
            {education.map((entry) => (
              <li
                key={entry.school}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line pb-4"
              >
                <div>
                  <p className="font-medium">{entry.qualification}</p>
                  <p className="text-sm text-muted">{entry.school}</p>
                </div>
                <p className="font-mono text-xs text-muted">
                  {entry.period} · {entry.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
