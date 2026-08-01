import Image from "next/image";
import EvennessTrace from "./EvennessTrace";

/**
 * Device frames for project cards.
 *
 * With a screenshot, the frame shows the real app. Without one, it falls back
 * to a composed abstract panel rather than a grey skeleton: a skeleton reads
 * as "still loading", a composed panel reads as a choice.
 */

type ScreenProps = {
  label: string;
  image?: string;
  /** Tells the browser how wide the image renders, so it picks the right file. */
  sizes: string;
};

function Screen({ label, image, sizes }: ScreenProps) {
  if (image) {
    return (
      <Image
        src={image}
        alt={`Screenshot of ${label}`}
        fill
        sizes={sizes}
        // group/media is the link wrapping the card's media, when there is
        // a live URL to link to. Inert otherwise.
        className="object-cover object-top transition-transform duration-500 group-hover/media:scale-[1.03]"
      />
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col justify-end overflow-hidden bg-linear-to-br from-indigo/12 via-violet/8 to-transparent">
      <EvennessTrace
        variant="divider"
        className="absolute inset-x-0 top-1/2 h-16 w-full -translate-y-1/2 opacity-70"
      />
      <p className="eyebrow relative m-3">{label}</p>
    </div>
  );
}

export function BrowserFrame({
  url,
  label,
  image,
}: {
  url?: string;
  label: string;
  image?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 border-b border-line bg-sunk px-3 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
        </span>
        <span className="ml-1 min-w-0 truncate rounded-md bg-surface px-2.5 py-1 font-mono text-[0.6875rem] text-muted">
          {url ? url.replace(/^https?:\/\//, "") : "localhost:3000"}
        </span>
      </div>
      <div className="relative aspect-16/10">
        <Screen
          label={label}
          image={image}
          sizes="(min-width: 768px) 36rem, 100vw"
        />
      </div>
    </div>
  );
}

export function PhoneFrame({
  label,
  image,
}: {
  label: string;
  image?: string;
}) {
  return (
    <div className="mx-auto w-[52%] max-w-[190px]">
      <div className="overflow-hidden rounded-[1.75rem] border-[6px] border-ink/85 bg-surface shadow-[var(--shadow-card)]">
        <div className="relative aspect-9/19">
          {/* Notch */}
          <span
            className="absolute top-2 left-1/2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-ink/85"
            aria-hidden="true"
          />
          <Screen label={label} image={image} sizes="190px" />
        </div>
      </div>
    </div>
  );
}
