export type Skill = {
  name: string;
  icon: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  short: string;
  detail: string;
  example: string;
};

export type SkillCategory = {
  title: string;
  subtitle: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Software Engineering Core",
    subtitle: "Languages & frameworks I build with",
    skills: [
      { name: "Java", icon: "☕", level: "Intermediate", progress: 70, short: "OOP fundamentals & desktop apps", detail: "Object-oriented programming, Swing UI, file I/O, and clean code structure.", example: "Built a Tic Tac Toe game and graphics project using Java Swing." },
      { name: "HTML", icon: "🌐", level: "Advanced", progress: 90, short: "Semantic markup & accessibility", detail: "Writing clean, semantic HTML5 with accessibility in mind.", example: "Used to scaffold every project including this portfolio." },
      { name: "CSS", icon: "🎨", level: "Advanced", progress: 85, short: "Modern layouts & animations", detail: "Flexbox, Grid, custom properties, transitions, and responsive design.", example: "Designed the layout system you're looking at right now." },
      { name: "JavaScript", icon: "✨", level: "Intermediate", progress: 65, short: "Interactivity & DOM", detail: "Vanilla JS for DOM manipulation, async/await, and ES modules.", example: "Form validation and dynamic UI on small web apps." },
      { name: "Python", icon: "🐍", level: "Beginner", progress: 40, short: "Scripting & automation", detail: "Basics of syntax, control flow, and small automation scripts.", example: "Practice exercises and beginner data scripts." },
      { name: "React JS", icon: "⚛️", level: "Beginner", progress: 35, short: "Component-based UI", detail: "Learning hooks, props, and component composition.", example: "Following along React tutorials and small demos." },
      { name: "Node JS", icon: "🟢", level: "Beginner", progress: 30, short: "Server-side JavaScript", detail: "Exploring Express, REST APIs, and npm packages.", example: "Built a tiny REST endpoint as a learning exercise." },
      { name: "MySQL", icon: "🗄️", level: "Beginner", progress: 45, short: "Relational databases", detail: "Schema design, joins, and basic CRUD queries.", example: "Used in a Water Billing System course project." },
    ],
  },
  {
    title: "Design & Process",
    subtitle: "Where I shape ideas before code",
    skills: [
      { name: "Figma", icon: "🎯", level: "Intermediate", progress: 70, short: "UI/UX design & prototyping", detail: "Wireframes, components, auto-layout, and clickable prototypes.", example: "Designed the Burger Mobile UI and fitness landing page mocks." },
      { name: "Canva", icon: "🖼️", level: "Advanced", progress: 80, short: "Graphics & social assets", detail: "Quick visual content for school, social, and personal branding.", example: "Posters, presentations, and resume layouts." },
      { name: "Draw.io", icon: "📐", level: "Intermediate", progress: 65, short: "Diagrams & flowcharts", detail: "Flowcharts, ER diagrams, and system architecture sketches.", example: "ER diagrams for school database projects." },
    ],
  },
  {
    title: "Business Tools & Operations",
    subtitle: "Day-to-day productivity stack",
    skills: [
      { name: "Microsoft Word", icon: "📄", level: "Advanced", progress: 90, short: "Documents & reports", detail: "Formatting, references, and academic-style documents.", example: "Used for all my coursework and proposals." },
      { name: "Microsoft Excel", icon: "📊", level: "Intermediate", progress: 70, short: "Spreadsheets & formulas", detail: "Formulas, charts, pivot tables, and conditional formatting.", example: "Class grade tracking and small budgets." },
    ],
  },
];

import project1 from "@/assets/project-1.png.asset.json";
import project2 from "@/assets/project-2.png.asset.json";
import project3 from "@/assets/project-3.png.asset.json";
import project4 from "@/assets/project-4.png.asset.json";
import project5 from "@/assets/project-5.png.asset.json";
import project6 from "@/assets/project-6.png.asset.json";

export type Project = {
  title: string;
  category: string;
  description: string;
  tech: string[];
  features: string[];
  role: string;
  year: string;
  gradient: string;
  emoji: string;
  image: string;
};

export const projects: Project[] = [
  {
    title: "Tic Tac Toe — Java",
    category: "Desktop Game",
    description: "A two-player Tic Tac Toe game built with Java Swing, featuring a clean UI and win-detection logic.",
    tech: ["Java", "Swing", "OOP"],
    features: ["Two-player mode", "Win/draw detection", "Reset & score tracking"],
    role: "Sole Developer",
    year: "2024",
    gradient: "from-emerald-500/30 to-lime-500/20",
    emoji: "⭕",
    image: project1.url,
  },
  {
    title: "Java Graphics Project",
    category: "Graphics / Animation",
    description: "An exploration of Java 2D graphics APIs — shapes, transformations, and basic animation loops.",
    tech: ["Java", "AWT", "Graphics2D"],
    features: ["Custom shapes", "Animation timer", "Color & gradients"],
    role: "Sole Developer",
    year: "2024",
    gradient: "from-green-500/30 to-teal-500/20",
    emoji: "🎨",
    image: project2.url,
  },
  {
    title: "Water Billing System",
    category: "Database App",
    description: "A console-based billing system with MySQL persistence to compute monthly water usage and invoices.",
    tech: ["Java", "MySQL", "JDBC"],
    features: ["Customer CRUD", "Bill computation", "Monthly reports"],
    role: "Lead Developer",
    year: "2025",
    gradient: "from-cyan-500/30 to-emerald-500/20",
    emoji: "💧",
    image: project3.url,
  },
  {
    title: "Burger Mobile UI",
    category: "UI/UX Design",
    description: "A Figma prototype for a burger ordering app with cart flow, menu screens, and checkout.",
    tech: ["Figma", "Prototyping"],
    features: ["Menu browsing", "Cart flow", "Checkout screens"],
    role: "Designer",
    year: "2025",
    gradient: "from-orange-500/30 to-amber-500/20",
    emoji: "🍔",
    image: project4.url,
  },
  {
    title: "ACTMS — Agricultural Monitoring",
    category: "Capstone Concept",
    description: "Agricultural Crop Tracking & Monitoring System concept with dashboards for field data and yield.",
    tech: ["Figma", "Concept", "Research"],
    features: ["Crop dashboards", "Field data entry", "Yield reports"],
    role: "Co-Designer",
    year: "2025",
    gradient: "from-lime-500/30 to-green-600/20",
    emoji: "🌾",
    image: project5.url,
  },
  {
    title: "Fitness Landing Page",
    category: "Web Design",
    description: "A responsive landing page concept for a fitness brand, built with HTML and CSS.",
    tech: ["HTML", "CSS", "Responsive"],
    features: ["Hero section", "Programs grid", "Mobile-first layout"],
    role: "Front-End",
    year: "2025",
    gradient: "from-rose-500/30 to-red-500/20",
    emoji: "💪",
  },
];
