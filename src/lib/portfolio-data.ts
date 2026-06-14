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
    title: "Student Performance Dashboard",
    category: "Education Analytics",
    description: "Analyze student performance trends and visualize academic results across subjects and terms.",
    tech: ["Excel", "Power BI"],
    features: ["Grade trend analysis", "Subject comparison", "Term-over-term KPIs"],
    role: "Data Analyst",
    year: "2025",
    gradient: "from-emerald-500/30 to-lime-500/20",
    emoji: "🎓",
    image: project1.url,
    objective: "Identify performance trends and at-risk subjects across academic terms.",
    dataset: "Student grades CSV (subject, term, score, section)",
    insights: ["Math scores dipped in Q3", "Top 20% of students drive section averages", "Attendance correlates with score gains"],
    outcome: "An interactive dashboard highlighting weak subjects and improvement opportunities.",
  },
  {
    title: "Sales Analytics Dashboard",
    category: "Business Intelligence",
    description: "Identify top-performing products and sales patterns across regions and months.",
    tech: ["Power BI", "Excel"],
    features: ["Top product ranking", "Regional breakdown", "Monthly trend charts"],
    role: "BI Analyst",
    year: "2025",
    gradient: "from-green-500/30 to-teal-500/20",
    emoji: "💹",
    image: project2.url,
    objective: "Surface top products and seasonal sales patterns for decision making.",
    dataset: "Retail sales transactions (product, region, date, revenue)",
    insights: ["3 products generate 60% of revenue", "Sales spike in Q4", "Region A underperforms vs peers"],
    outcome: "A BI dashboard guiding inventory and regional focus decisions.",
  },
  {
    title: "Customer Insights Analysis",
    category: "Customer Analytics",
    description: "Analyze customer behavior and purchasing trends to uncover segments and patterns.",
    tech: ["Python", "Pandas"],
    features: ["Customer segmentation", "Purchase frequency analysis", "RFM-style breakdown"],
    role: "Data Analyst",
    year: "2026",
    gradient: "from-cyan-500/30 to-emerald-500/20",
    emoji: "👥",
    image: project3.url,
    objective: "Group customers by behavior to inform marketing focus.",
    dataset: "Customer purchases CSV (id, date, amount, category)",
    insights: ["Repeat buyers spend 2.4× more", "Weekend purchases dominate", "One segment is highly loyal but small"],
    outcome: "Clear customer segments with recommendations for targeted offers.",
  },
  {
    title: "Agricultural Monitoring Analytics",
    category: "Operations Analytics",
    description: "Analyze agricultural training and farmer monitoring data to track participation and outcomes.",
    tech: ["MySQL", "Excel"],
    features: ["Training participation", "Farmer demographics", "Yield tracking"],
    role: "Data Analyst",
    year: "2025",
    gradient: "from-lime-500/30 to-green-600/20",
    emoji: "🌾",
    image: project5.url,
    objective: "Track farmer training programs and identify low-participation regions.",
    dataset: "Farmer & training records in MySQL",
    insights: ["Participation drops in remote sitios", "Trained farmers report higher yields", "Follow-ups boost engagement"],
    outcome: "Reports highlighting where additional outreach is needed.",
  },
  {
    title: "Business Performance Dashboard",
    category: "Executive Reporting",
    description: "Visualize KPIs and business metrics in one interactive dashboard for leadership.",
    tech: ["Power BI"],
    features: ["KPI cards", "Trend lines", "Goal vs actual"],
    role: "BI Analyst",
    year: "2026",
    gradient: "from-orange-500/30 to-amber-500/20",
    emoji: "📊",
    image: project4.url,
    objective: "Give leadership a one-glance view of business health.",
    dataset: "Aggregated KPI data (revenue, costs, growth %)",
    insights: ["Growth steady but margin slipping", "Two KPIs missing target", "Cost spike in one department"],
    outcome: "An executive-style dashboard ready for monthly review.",
  },
  {
    title: "Data Cleaning Project",
    category: "Data Engineering",
    description: "Transform messy datasets into structured, analysis-ready information using Python and Excel.",
    tech: ["Python", "Excel"],
    features: ["Null handling", "Type normalization", "Duplicate removal"],
    role: "Data Analyst",
    year: "2026",
    gradient: "from-rose-500/30 to-red-500/20",
    emoji: "🧹",
    image: project6.url,
    objective: "Turn a noisy raw export into a clean, trustworthy dataset.",
    dataset: "Mixed CSV exports with nulls, duplicates and inconsistent types",
    insights: ["~18% of rows had quality issues", "Date formats were inconsistent", "Several duplicate customers"],
    outcome: "A clean, documented dataset ready for analysis and dashboards.",
  },
];
