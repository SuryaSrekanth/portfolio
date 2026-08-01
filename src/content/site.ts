/**
 * Every word and link on the site comes from this file.
 *
 * Anything marked `draft: true` renders with a small "draft" chip so it's
 * obvious what still needs real content. Fill in the real details, flip
 * `draft` to false (or delete the key), and the chip disappears.
 */

export type ProjectKind = "web" | "mobile" | "ai";

export type Project = {
  slug: string;
  title: string;
  /** One line. What it does, in the user's words, not the system's. */
  summary: string;
  /** Two or three sentences. The problem, the build, the outcome. */
  detail: string;
  stack: string[];
  kind: ProjectKind;
  year: string;
  /** Optional. e.g. "Coursework", "Freelance", "Team of 3". Hidden when unset. */
  context?: string;
  /** Screenshot in /public. Falls back to an abstract panel when absent. */
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  /** Shows a "Live" pill and lets the card link out. */
  isLive?: boolean;
  /** Renders the draft chip. Remove once real content is in. */
  draft?: boolean;
};

export const profile = {
  name: "Surya Srekanth",
  shortName: "Surya",
  role: "Full-stack, mobile & AI developer",
  /** The hero headline. Keep it under about nine words. */
  headline: "I build AI-powered web and mobile products.",
  /** Sits under the headline. */
  subhead:
    "Currently, I'm transitioning my career into the technology sector. I'm learning something new every day. You can find me exploring emerging technologies and working on creative projects as a developer. I'm passionate about leveraging artificial intelligence to solve real-world problems and constantly seeking opportunities to expand my knowledge in this rapidly evolving field.",
  location: "Coimbatore, Tamil Nadu",
  email: "suryasrekanth@gmail.com",
  phone: "+91 93626 51864",
  links: {
    github: "https://github.com/SuryaSrekanth",
    linkedin: "https://www.linkedin.com/in/surya-srekanth",
    /** Lives in /public. Replace the file to update it. */
    resume: "/surya-srekanth-resume.pdf",
  },
  /** Filename the browser saves the resume as. */
  resumeFilename: "Surya-Srekanth-Resume.pdf",
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const projects: Project[] = [
  {
    slug: "yarn-defect-ai",
    title: "AI Yarn Defect Assistant",
    summary:
      "Turns raw yarn test counts into a plain-language diagnosis and a next action.",
    detail:
      "Lab technicians read thick places, thin places and neps off a Uster tester, then have to decide what caused them and who to tell. This takes those four numbers and returns the likely mechanical cause, the team to notify, and what to check next. Built from eight years of doing that call by hand.",
    stack: ["Python", "Streamlit", "Gemini API"],
    kind: "ai",
    year: "2026",
    liveUrl: "https://ai-yarn-defect-assistant.streamlit.app",
    image: "/projects/yarn-defect-assistant.png",
    isLive: true,
  },
  {
    slug: "resume-ai-bot",
    title: "Resume AI Bot",
    summary:
      "A chat assistant that reviews a resume and suggests what to fix first.",
    detail:
      "Upload a resume and ask it anything: what's weak, which skills to add for a given role, how to phrase an achievement. Streams answers back through the Gemini API with the resume held as context.",
    stack: ["Python", "Streamlit", "Gemini API"],
    kind: "ai",
    year: "2026",
    liveUrl: "https://resume-ai-bot.streamlit.app",
    image: "/projects/resume-ai-bot.png",
    isLive: true,
  },
  /*
   * Surya's full-stack and mobile projects go here.
   *
   * Copy the shape of an entry above. `kind: "web"` renders a browser frame,
   * `kind: "mobile"` renders a phone frame. Add `draft: true` while a card is
   * still being written and it shows a dashed "Draft" chip.
   */
];

export type SkillGroup = {
  label: string;
  /** Shown as a short qualifier under the group name. */
  note: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    note: "Interfaces, state and routing",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML"],
  },
  {
    label: "Backend",
    note: "APIs and application logic",
    items: ["FastAPI", "Node.js", "Express", "Python", "Java", "C"],
  },
  {
    label: "Data",
    note: "Schema design and queries",
    items: ["PostgreSQL", "MySQL"],
  },
  {
    label: "Mobile",
    note: "Cross-platform apps",
    items: ["React Native", "Expo"],
  },
  {
    label: "AI",
    note: "LLM-backed product features",
    items: ["Gemini API", "Streamlit", "Prompt design"],
  },
  {
    label: "Domain",
    note: "Where the unfair advantage is",
    items: ["Textile quality analysis", "Uster Classimat 5", "Defect diagnosis"],
  },
];

export type Role = {
  org: string;
  title: string;
  location: string;
  period: string;
  points: string[];
};

export const experience: Role[] = [
  {
    org: "SITRA",
    title: "Lab Technician",
    location: "Coimbatore, TN",
    period: "Feb 2020 - Present",
    points: [
      "Analyze 100+ yarn samples a week on Uster Classimat 5, identifying thick places, thin places, neps and contamination.",
      "Write the quality reports that production uses to decide whether a lot ships or gets reworked.",
      "Keep test data trustworthy through instrument calibration and strict adherence to lab protocol.",
    ],
  },
  {
    org: "STOLL India",
    title: "Assistant Technician",
    location: "Noida, UP",
    period: "Jul 2018 - Nov 2018",
    points: [
      "Assembled and serviced flat knitting machines on the production floor.",
      "Cut machine downtime 15-20% with a preventive maintenance routine.",
      "Wrote and modified knitting programs in M1+ to support new fabric designs.",
    ],
  },
];

export const education = [
  {
    school: "Bharathidasan University",
    qualification: "BSc Computer Science",
    detail: "In progress",
    period: "2025 - 2027",
  },
  {
    school: "PSG Polytechnic College",
    qualification: "Diploma in Textile Technology",
    detail: "CGPA 8.95",
    period: "2015 - 2018",
  },
];

export const contact = {
  heading: "Open to full-stack and mobile roles.",
  body: "Tell me what you are building and I will tell you honestly whether I am the right fit. Fastest way to reach me is WhatsApp.",
};

export const about = {
  /** Kept short on purpose. Two paragraphs is the ceiling here. */
  paragraphs: [
    "I spent eight years at SITRA reading yarn on an Uster Classimat, deciding whether a fault was a thick place, a nep or contamination, and telling a production floor what to change. It is measurement work: you learn quickly that a confident guess and a verified number are not the same thing.",
    "I now build software with that habit intact. The first thing I shipped was the tool I wanted on the bench, an assistant that turns four test numbers into a diagnosis. Since then I have moved outward into full-stack and mobile work, and I am finishing a BSc in Computer Science alongside it.",
  ],
};
