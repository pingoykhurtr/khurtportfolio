export type Skill = {
  name: string;
  icon: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  short: string;
  detail: string;
  example: string;
  projectsUsed: string[];
  applications: string[];
};

export type SkillCategory = {
  title: string;
  subtitle: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Data Analytics Core",
    subtitle: "Foundational analytics skills I'm building",
    skills: [
      { name: "Excel", icon: "📊", level: "Advanced", progress: 85, short: "Spreadsheets, formulas & pivots", detail: "Formulas, pivot tables, charts, lookups, conditional formatting and dashboards.", example: "Built grade trackers and small KPI dashboards.", projectsUsed: ["Student Performance Dashboard", "Sales Analytics Dashboard"], applications: ["Reporting", "Data cleaning", "KPI tracking"] },
      { name: "SQL", icon: "🧮", level: "Intermediate", progress: 70, short: "Query & analyze data", detail: "SELECT, JOINs, GROUP BY, aggregations, subqueries and basic schema design.", example: "Queried a Water Billing MySQL schema for monthly usage reports.", projectsUsed: ["Agricultural Monitoring Analytics", "Water Billing System"], applications: ["Reporting", "Data extraction", "Business analysis"] },
      { name: "Python", icon: "🐍", level: "Beginner", progress: 45, short: "Pandas & data scripts", detail: "Pandas, NumPy basics, data cleaning, EDA and simple visualizations.", example: "Cleaned messy CSV datasets into analysis-ready tables.", projectsUsed: ["Customer Insights Analysis", "Data Cleaning Project"], applications: ["EDA", "Automation", "Data wrangling"] },
      { name: "Statistics", icon: "📈", level: "Beginner", progress: 50, short: "Descriptive & inferential basics", detail: "Mean, median, distributions, correlation and basic hypothesis testing.", example: "Used descriptive stats to summarize student performance.", projectsUsed: ["Student Performance Dashboard"], applications: ["Insights", "Trend analysis"] },
      { name: "Data Cleaning", icon: "🧹", level: "Intermediate", progress: 65, short: "From messy to tidy", detail: "Handling nulls, duplicates, type fixes, standardization and validation.", example: "Reshaped raw exports into structured tables for dashboards.", projectsUsed: ["Data Cleaning Project", "Customer Insights Analysis"], applications: ["Preprocessing", "ETL", "Reporting"] },
      { name: "Data Visualization", icon: "📉", level: "Intermediate", progress: 70, short: "Charts that tell a story", detail: "Choosing the right chart, color, layout and narrative for insights.", example: "Designed KPI cards and trend charts in Power BI / Excel.", projectsUsed: ["Business Performance Dashboard", "Sales Analytics Dashboard"], applications: ["Dashboards", "Reports", "Storytelling"] },
    ],
  },
  {
    title: "Data Tools",
    subtitle: "Platforms I use to analyze and visualize",
    skills: [
      { name: "Power BI", icon: "⚡", level: "Beginner", progress: 55, short: "Interactive dashboards", detail: "Data modeling, DAX basics, visuals and interactive report pages.", example: "Built a sales & KPI dashboard prototype.", projectsUsed: ["Sales Analytics Dashboard", "Business Performance Dashboard"], applications: ["BI dashboards", "Executive reports"] },
      { name: "Tableau", icon: "📊", level: "Beginner", progress: 40, short: "Visual analytics", detail: "Building worksheets, dashboards and exploratory views.", example: "Practicing with sample superstore datasets.", projectsUsed: ["Sales Analytics Dashboard"], applications: ["Exploration", "Dashboards"] },
      { name: "Excel", icon: "📗", level: "Advanced", progress: 85, short: "The analyst's swiss knife", detail: "Pivots, Power Query basics, formulas and lightweight modeling.", example: "Cleaned and modeled school datasets end-to-end.", projectsUsed: ["Student Performance Dashboard", "Data Cleaning Project"], applications: ["Quick analysis", "Reporting"] },
      { name: "MySQL", icon: "🗄️", level: "Intermediate", progress: 60, short: "Relational databases", detail: "Schema design, joins, indexes and CRUD for analytical queries.", example: "Built and queried a water billing schema.", projectsUsed: ["Agricultural Monitoring Analytics", "Water Billing System"], applications: ["Data storage", "Reporting queries"] },
      { name: "Google Sheets", icon: "📑", level: "Advanced", progress: 80, short: "Collaborative spreadsheets", detail: "Formulas, QUERY function, charts and shared dashboards.", example: "Lightweight trackers shared with classmates.", projectsUsed: ["Student Performance Dashboard"], applications: ["Collaboration", "Quick dashboards"] },
    ],
  },
  {
    title: "Supporting Technical Skills",
    subtitle: "Web & programming foundations that support my analytics work",
    skills: [
      { name: "HTML", icon: "🌐", level: "Advanced", progress: 90, short: "Semantic markup", detail: "Clean, semantic HTML5 used for portfolios and report pages.", example: "Used across every web project including this portfolio.", projectsUsed: ["Fitness Landing Page"], applications: ["Web reports", "Portfolios"] },
      { name: "CSS", icon: "🎨", level: "Advanced", progress: 85, short: "Layouts & styling", detail: "Flexbox, Grid, responsive design and design tokens.", example: "Designed the layout you're looking at.", projectsUsed: ["Fitness Landing Page"], applications: ["UI styling", "Report design"] },
      { name: "JavaScript", icon: "✨", level: "Intermediate", progress: 60, short: "Interactivity & DOM", detail: "Vanilla JS, ES modules and basic async patterns.", example: "Form validation and small interactive demos.", projectsUsed: ["Fitness Landing Page"], applications: ["Interactivity", "Web tooling"] },
      { name: "Java", icon: "☕", level: "Intermediate", progress: 65, short: "OOP & desktop apps", detail: "Object-oriented programming and small desktop applications.", example: "Built Tic Tac Toe and a Java graphics project.", projectsUsed: ["Water Billing System"], applications: ["Backend logic", "School projects"] },
      { name: "React", icon: "⚛️", level: "Beginner", progress: 35, short: "Component UIs", detail: "Learning hooks, components and state management.", example: "Following tutorials and small demos.", projectsUsed: [], applications: ["Web apps", "Dashboards"] },
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
  objective: string;
  dataset: string;
  insights: string[];
  outcome: string;
};

export const projects: Project[] = [
  {
    title: "Tic Tac Toe Game",
    category: "Java Desktop Game",
    description: "A classic Tic Tac Toe game built entirely in Java with a clean two-player interface.",
    tech: ["Java"],
    features: ["Two-player mode", "Win/draw detection", "Reset functionality"],
    role: "Developer",
    year: "2025",
    gradient: "from-emerald-500/30 to-lime-500/20",
    emoji: "❌⭕",
    image: project1.url,
    objective: "Practice Java fundamentals and game logic by building a complete Tic Tac Toe game.",
    dataset: "N/A — game state managed in memory",
    insights: ["Reinforced 2D array handling", "Strengthened condition logic", "Improved UI event handling in Java"],
    outcome: "A fully working Tic Tac Toe game built purely with Java.",
  },
  {
    title: "Snake Game",
    category: "Java Desktop Game",
    description: "A classic Snake game implemented in Java featuring smooth controls and score tracking.",
    tech: ["Java"],
    features: ["Real-time movement", "Score tracking", "Game over detection"],
    role: "Developer",
    year: "2025",
    gradient: "from-green-500/30 to-teal-500/20",
    emoji: "🐍",
    image: project2.url,
    objective: "Build a real-time Snake game to practice Java graphics and game loops.",
    dataset: "N/A — runtime game state only",
    insights: ["Practiced Java Swing rendering", "Learned game loop timing", "Handled collision detection"],
    outcome: "A complete, playable Snake game built entirely in Java.",
  },
  {
    title: "Water Billing Consumption — Bongbong, Panacan, Davao City",
    category: "Java Desktop Application",
    description: "A water billing consumption system for Bongbong, Panacan, Davao City, built fully in Java.",
    tech: ["Java"],
    features: ["Consumer records", "Monthly billing computation", "Consumption tracking"],
    role: "Developer",
    year: "2025",
    gradient: "from-cyan-500/30 to-emerald-500/20",
    emoji: "💧",
    image: project3.url,
    objective: "Provide a simple way to record and compute water billing for a local community.",
    dataset: "Local consumer & meter reading records",
    insights: ["Modeled billing rules in Java", "Practiced OOP for real-world data", "Improved input validation"],
    outcome: "A working water billing app tailored to the Bongbong community in Panacan, Davao City.",
  },
  {
    title: "Agricultural Monitoring Analytics",
    category: "UI/UX Design",
    description: "A Figma-designed concept for monitoring agricultural training and farmer engagement.",
    tech: ["Figma"],
    features: ["Dashboard mockups", "User flow", "Visual hierarchy"],
    role: "UI/UX Designer",
    year: "2025",
    gradient: "from-lime-500/30 to-green-600/20",
    emoji: "🌾",
    image: project5.url,
    objective: "Design a clean monitoring interface concept in Figma for agricultural data.",
    dataset: "Conceptual — design-only project",
    insights: ["Practiced layout & spacing", "Refined design tokens", "Built reusable components"],
    outcome: "A polished Figma design prototype ready for handoff.",
  },
  {
    title: "Business Performance Dashboard",
    category: "UI/UX Design",
    description: "A Figma-only design concept for a clean, executive-style business performance dashboard.",
    tech: ["Figma"],
    features: ["KPI card layouts", "Chart placements", "Responsive structure"],
    role: "UI/UX Designer",
    year: "2026",
    gradient: "from-orange-500/30 to-amber-500/20",
    emoji: "📊",
    image: project4.url,
    objective: "Explore a modern, minimal dashboard layout in Figma.",
    dataset: "Conceptual — design-only project",
    insights: ["Iterated on KPI hierarchy", "Refined typography scale", "Improved visual balance"],
    outcome: "A clean Figma dashboard concept ready for development.",
  },
  {
    title: "SpringAthlete Fitness Gym",
    category: "Web Project",
    description: "A fitness gym landing site for SpringAthlete, built with HTML, CSS and JavaScript only.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: ["Responsive layout", "Interactive sections", "Modern landing design"],
    role: "Front-End Developer",
    year: "2026",
    gradient: "from-rose-500/30 to-red-500/20",
    emoji: "🏋️",
    image: project6.url,
    objective: "Build a clean, responsive gym website using only HTML, CSS and JavaScript.",
    dataset: "N/A — static content site",
    insights: ["Practiced responsive design", "Improved CSS structure", "Added lightweight JS interactions"],
    outcome: "A polished SpringAthlete Fitness Gym landing site built fully with HTML, CSS and JavaScript.",
  },
];
