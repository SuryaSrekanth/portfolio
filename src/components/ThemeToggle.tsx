"use client";

/**
 * No React state here on purpose.
 *
 * The theme already lives in one place: the `dark` class on <html>, set
 * before first paint by the inline script in the root layout. Mirroring it
 * into component state would mean reading the DOM in an effect, which
 * triggers a second render and cannot be done during SSR anyway. Instead the
 * click handler writes the class, and CSS decides which icon shows.
 */
export default function ThemeToggle() {
  function toggle() {
    const nowDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", nowDark ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="grid size-9 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:text-ink"
    >
      <span className="relative block size-4">
        <SunIcon className="absolute inset-0 scale-100 opacity-100 transition-all duration-300 dark:scale-50 dark:opacity-0" />
        <MoonIcon className="absolute inset-0 scale-50 opacity-0 transition-all duration-300 dark:scale-100 dark:opacity-100" />
      </span>
    </button>
  );
}

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  );
}

function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
    </svg>
  );
}
