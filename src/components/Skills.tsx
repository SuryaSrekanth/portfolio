import { skillGroups } from "@/content/site";

export default function Skills() {
  return (
    <section id="skills" className="section bg-sunk/60">
      <div className="shell">
        <p className="eyebrow">Toolkit</p>
        <h2 className="mt-3 max-w-[22ch] font-display text-[clamp(1.9rem,4.5vw,3rem)] leading-tight font-semibold tracking-[-0.02em]">
          What I reach for.
        </h2>

        <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="font-display text-base font-semibold tracking-tight">
                {group.label}
              </h3>
              <p className="mt-1 text-sm text-muted">{group.note}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-surface px-2.5 py-1.5 font-mono text-xs text-ink/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
