import { profile } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="shell flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted">
          {profile.name} · {profile.location}
        </p>
        <p className="font-mono text-xs text-muted">
          Built with Next.js and Tailwind
        </p>
      </div>
    </footer>
  );
}
