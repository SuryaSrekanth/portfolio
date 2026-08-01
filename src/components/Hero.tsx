import { profile } from "@/content/site";
import EvennessTrace from "./EvennessTrace";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-20 pb-0 sm:pt-28">
      <div className="shell">
        <p
          className="eyebrow rise"
          style={{ animationDelay: "0.05s" }}
        >
          {profile.location}
        </p>

        <h1
          className="rise mt-5 max-w-[18ch] font-display text-[clamp(2.6rem,7.5vw,5rem)] leading-[1.02] font-semibold tracking-[-0.03em]"
          style={{ animationDelay: "0.12s" }}
        >
          I build <span className="gradient-text">AI-powered</span> web and
          mobile products.
        </h1>

        <p
          className="rise mt-7 max-w-[58ch] text-[1.0625rem] leading-relaxed text-muted sm:text-lg"
          style={{ animationDelay: "0.2s" }}
        >
          {profile.subhead}
        </p>

        <div
          className="rise mt-9 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "0.28s" }}
        >
          <a
            href="#work"
            className="rounded-full bg-linear-to-r from-indigo to-violet px-6 py-3 text-sm font-medium text-on-accent shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
          >
            See the work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-sunk"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* The signature. Full-bleed so it reads as an instrument readout
          running under the page rather than a picture placed on it. */}
      <div className="relative mt-16 sm:mt-24">
        <EvennessTrace variant="hero" className="h-28 w-full sm:h-36" />
        <div className="shell mt-3 flex items-center justify-between">
          <p className="eyebrow">Yarn evenness trace</p>
          <p className="eyebrow flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-signal" />
            4 faults marked
          </p>
        </div>
      </div>
    </section>
  );
}
