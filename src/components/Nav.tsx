import Link from "next/link";
import { nav, profile } from "@/content/site";
import ThemeToggle from "./ThemeToggle";

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

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/80 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href="#top"
          className="font-display text-[0.95rem] font-semibold tracking-tight"
        >
          {profile.shortName}
          <span className="text-violet">.</span>
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-1 sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-muted transition-colors hover:bg-sunk hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.links.resume}
            // `download` saves the file instead of opening the browser's PDF
            // viewer. The value sets the saved filename.
            download={profile.resumeFilename}
            className="hidden items-center gap-1.5 rounded-full border border-line px-4 py-1.5 text-sm text-ink transition-colors hover:bg-sunk sm:inline-flex"
          >
            Resume
            <DownloadIcon className="size-3.5 text-muted" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
