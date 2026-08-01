import { contact, profile } from "@/content/site";

function DownloadIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 2.5v7.5M4.75 7.25 8 10.5l3.25-3.25M2.75 12.75h10.5" />
    </svg>
  );
}

/**
 * wa.me wants digits only: country code first, no plus sign, no spaces.
 * Stripping every non-digit from the displayed number keeps the two in sync,
 * so editing profile.phone updates the chat link too.
 */
const whatsappNumber = profile.phone.replace(/\D/g, "");

const CHANNELS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  {
    label: "WhatsApp",
    value: profile.phone,
    href: `https://wa.me/${whatsappNumber}`,
  },
  { label: "GitHub", value: "View profile", href: profile.links.github },
  { label: "LinkedIn", value: "View profile", href: profile.links.linkedin },
];

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="shell">
        <div className="rounded-3xl border border-line bg-linear-to-br from-indigo/10 via-violet/6 to-transparent p-8 sm:p-14">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 max-w-[18ch] font-display text-[clamp(1.9rem,4.5vw,3rem)] leading-tight font-semibold tracking-[-0.02em]">
            {contact.heading}
          </h2>
          <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted">
            {contact.body}
          </p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((channel) => (
              <div key={channel.label}>
                <dt className="eyebrow">{channel.label}</dt>
                <dd className="mt-1.5">
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                    className="text-[0.9375rem] break-words text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-violet"
                  >
                    {channel.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-linear-to-r from-indigo to-violet px-6 py-3 text-sm font-medium text-on-accent shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
            >
              Send an email
            </a>
            <a
              href={profile.links.resume}
              download={profile.resumeFilename}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-sunk"
            >
              Download resume
              <DownloadIcon className="size-4 text-muted" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
