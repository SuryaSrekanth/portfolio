import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  JetBrains_Mono,
} from "next/font/google";
import { profile } from "@/content/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Absolute base for og:image and friends. Without it Next falls back to the
  // per-deployment URL, which changes on every deploy and breaks old share
  // cards.
  //
  // This must be a URL the public can reach. The team-scoped aliases
  // (portfolio-surya-9b93.vercel.app) sit behind Vercel Authentication and
  // serve a login page to social crawlers. Point this at a custom domain once
  // there is one.
  metadataBase: new URL("https://portfolio-three-nu-53jzivpt2h.vercel.app"),
  title: `${profile.name} - ${profile.role}`,
  description: profile.headline,
  openGraph: {
    title: `${profile.name} - ${profile.role}`,
    description: profile.headline,
    type: "website",
  },
};

/**
 * Runs before first paint so a dark-mode visitor never sees a white flash.
 * It has to be inline and blocking, which is the one good reason to reach
 * for dangerouslySetInnerHTML here.
 */
const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Next 16 stopped overriding scroll-behavior on navigation unless
      // this attribute is set.
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
