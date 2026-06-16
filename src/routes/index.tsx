import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  Download,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Facebook,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  Send,
  Loader2,
  MapPin,
  Phone,
  ChevronDown,
  GraduationCap,
  Target,
  Heart,
  Code2,
  Smile,
  User,
  BarChart3,
  Database,
  LineChart,
  PieChart,
  TrendingUp,
} from "lucide-react";
import { Toaster, toast } from "sonner";

import formalAsset from "@/assets/formal.png.asset.json";
import shyAsset from "@/assets/shy.png.asset.json";
import aboutAsset from "@/assets/about.jpg.asset.json";
import { skillCategories, projects, type Project, type Skill } from "@/lib/portfolio-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Khurt Pingoy — Aspiring Data Analyst Portfolio" },
      {
        name: "description",
        content:
          "4th year student and aspiring Data Analyst. Dashboards, SQL, Python and BI projects by Khurt Pingoy.",
      },
      { property: "og:title", content: "Khurt Pingoy — Data Analyst Portfolio" },
      {
        property: "og:description",
        content: "Aspiring Data Analyst turning raw data into insights through dashboards and reports.",
      },
    ],
  }),
  component: PortfolioPage,
});


const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

const SOCIAL_LINKS: { Icon: React.ComponentType<{ className?: string }>; href: string; label: string }[] = [
  { Icon: Github, href: "https://github.com/pingoykhurtr", label: "GitHub" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/pingoykhurtr/", label: "LinkedIn" },
  { Icon: Facebook, href: "https://www.facebook.com/khurt.820314", label: "Facebook" },
  { Icon: Mail, href: "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox", label: "Gmail" },
];


function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("kp-theme")) as
      | "dark"
      | "light"
      | null;
    const initial = saved ?? "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("kp-theme", next);
      return next;
    });
  };

  return { theme, toggle };
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

function PortfolioPage() {
  const { theme, toggle } = useTheme();
  const [navOpen, setNavOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--card)",
            color: "var(--card-foreground)",
            border: "1px solid var(--border)",
          },
        }}
      />

      {/* Scroll progress */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-primary to-primary-glow"
        style={{ scaleX }}
      />

      <Nav theme={theme} toggle={toggle} navOpen={navOpen} setNavOpen={setNavOpen} />

      <Hero onViewProjects={() => scrollToId("projects")} />

      <About onOpen={() => setAboutOpen(true)} />

      <Skills />

      <Projects onSelect={setActiveProject} />

      <Journey />

      <Contact />

      <Footer />

      <AboutModal open={aboutOpen} onOpenChange={setAboutOpen} />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------------- NAV ---------------- */

function Nav({
  theme,
  toggle,
  navOpen,
  setNavOpen,
}: {
  theme: "dark" | "light";
  toggle: () => void;
  navOpen: boolean;
  setNavOpen: (v: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const y = window.scrollY + 120;
      let current = "home";
      for (const l of NAV_LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= y) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 py-3 shadow-[var(--shadow-card)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToId("home")}
            className="font-display text-xl font-bold tracking-tight"
          >
            Kh<span className="text-primary">ur</span>t<span className="text-primary">.</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => {
              const isActive = active === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => scrollToId(l.id)}
                  className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                  <span
                    className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-primary transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/80 text-foreground transition-all hover:border-primary hover:text-primary"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Sun className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Moon className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/80 md:hidden"
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Menu"
            >
              {navOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass mt-3 overflow-hidden rounded-2xl p-2 md:hidden"
            >
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    scrollToId(l.id);
                    setNavOpen(false);
                  }}
                  className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-medium hover:bg-accent ${
                    active === l.id ? "text-primary" : ""
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */

function Hero({ onViewProjects }: { onViewProjects: () => void }) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-hero-glow pt-28"
    >
      {/* Background blobs + particles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div
          className="animate-blob absolute bottom-0 right-10 h-80 w-80 rounded-full bg-primary-glow/15 blur-3xl"
          style={{ animationDelay: "4s" }}
        />
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="animate-float absolute block rounded-full bg-primary/40"
            style={{
              width: `${4 + (i % 5)}px`,
              height: `${4 + (i % 5)}px`,
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
              animationDelay: `${(i % 6) * 0.7}s`,
              animationDuration: `${6 + (i % 5)}s`,
              opacity: 0.35,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:items-center">
        <motion.div {...fadeUp()}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Available for collaborations
          </div>
          <p className="font-mono text-sm text-muted-foreground">Hello, I'm</p>
          <h1 className="mt-2 font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Khurt <span className="text-gradient">Pingoy</span>
          </h1>
          <div className="mt-4 h-8 font-display text-xl text-muted-foreground sm:text-2xl">
            <TypeAnimation
              sequence={[
                "Aspiring Data Analyst",
                2000,
                "Data-Driven Problem Solver",
                2000,
                "Future Business Intelligence Specialist",
                2000,
                "Analytics Enthusiast",
                2000,
              ]}
              speed={50}
              repeat={Infinity}
              cursor
            />
          </div>
          <p className="mt-6 max-w-md text-base text-muted-foreground">
            I am a 4th-year student passionate about transforming raw data into meaningful
            insights. My goal is to become a Data Analyst who helps organizations make informed
            decisions through data visualization, reporting, and analytical thinking.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              asChild
              className="group rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
            >
              <a href="/cv.pdf" download>
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Download CV
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onViewProjects}
              className="group rounded-full border-primary/40 hover:border-primary hover:bg-primary/5"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="mt-10 flex gap-5">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-all hover:-translate-y-1 hover:text-primary"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

        </motion.div>

        <motion.div
          {...fadeUp(0.15)}
          className="group/profile relative mx-auto flex items-center justify-center"
        >
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/40 to-primary-glow/20 blur-3xl" />
          <div className="animate-float relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary to-primary-glow opacity-70 blur-2xl transition-opacity duration-500 group-hover/profile:opacity-100" />
            <div className="relative overflow-hidden rounded-[2rem] border-2 border-primary/60 shadow-[var(--shadow-glow)] transition-transform duration-500 group-hover/profile:scale-[1.04]">
              <div className="relative h-[420px] w-[340px] sm:h-[480px] sm:w-[380px]">
                <img
                  src={formalAsset.url}
                  alt="Khurt Pingoy"
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover/profile:opacity-0"
                />
                <img
                  src={shyAsset.url}
                  alt="Khurt Pingoy — shy"
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover/profile:opacity-100"
                />
              </div>
            </div>
            <div className="glass absolute -bottom-4 -left-6 rounded-2xl px-4 py-3 text-sm shadow-lg">
              <div className="font-mono text-xs text-muted-foreground">Currently</div>
              <div className="font-semibold">4th Year Student</div>
            </div>
            <div className="glass absolute -right-6 top-10 rounded-2xl px-4 py-3 text-sm shadow-lg">
              <div className="font-mono text-xs text-muted-foreground">Focus</div>
              <div className="font-semibold text-primary">Data Analytics</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll-down indicator */}
      <motion.button
        onClick={() => scrollToId("about")}
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground hover:text-primary md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-9 w-9 place-items-center rounded-full border border-primary/40 bg-primary/5"
        >
          <ChevronDown className="h-4 w-4 text-primary" />
        </motion.span>
      </motion.button>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */

function About({ onOpen }: { onOpen: () => void }) {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto grid max-w-6xl gap-16 px-4 md:grid-cols-2 md:items-center">
        <motion.div {...fadeUp()} className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/30 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-elevated)]">
            <img src={aboutAsset.url} alt="About Khurt" className="h-[520px] w-full object-cover" />
          </div>
          <div className="glass absolute -bottom-6 left-6 right-6 rounded-2xl p-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <Stat label="Projects" value="6+" />
              <Stat label="Year" value="4th" />
              <Stat label="Tools" value="11+" />
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.15)}>
          <div className="font-mono text-sm text-primary">— About me</div>
          <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            Turning data into <span className="text-gradient">decisions</span>
          </h2>
          <p className="mt-6 text-muted-foreground">
            I am currently developing my skills in data analysis, data visualization, database
            management, and business reporting. I enjoy exploring datasets, identifying trends,
            and converting information into actionable insights.
          </p>
          <p className="mt-4 text-muted-foreground">
            My long-term goal is to become a professional Data Analyst and contribute to
            data-driven decision making — bridging business questions and the numbers behind them.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
            <Info label="Name" value="Khurt Pingoy" />
            <Info label="Role" value="Aspiring Data Analyst" />
            <Info label="Email" value="pingoykhurtr@gmail.com" />
            <Info label="Status" value="Open to data roles" />
          </div>


          <Button
            onClick={onOpen}
            size="lg"
            className="mt-8 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-card)] transition-transform hover:scale-[1.03]"
          >
            More About Me
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold text-primary">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface/50 px-3 py-2">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="truncate font-medium">{value}</div>
    </div>
  );
}

function AboutModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(96vw,960px)] max-w-[960px] overflow-hidden border border-border bg-card p-0 text-foreground shadow-[var(--shadow-elevated)] sm:rounded-2xl">
        <div className="relative px-6 pb-6 pt-6 sm:px-8">
          <DialogHeader className="text-left">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              — Full bio
            </div>
            <DialogTitle className="mt-1 font-display text-2xl sm:text-3xl">
              More about <span className="text-gradient">Khurt Pingoy</span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              A quick window into who I am, what I study, and where I'm headed.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <AboutBlock
              Icon={User}
              title="Personal Profile"
              body="Khurt Rocaberte Pingoy — a 4th-year student based in the Philippines pursuing a career as a Data Analyst, turning raw data into clear insights."
            />
            <AboutBlock
              Icon={GraduationCap}
              title="Education"
              body={
                "• 4th Year — BS Information Systems\n• F. Bustamante NHS — Secondary\n• Sixto Babao Elementary — Primary"
              }
            />
            <AboutBlock
              Icon={Target}
              title="Career Goal"
              body="Become a professional Data Analyst — helping organizations make informed, data-driven decisions through dashboards and reporting."
            />
            <AboutBlock
              Icon={Code2}
              title="Technical Skills"
              body="Excel, Word, MySQL, Python, React.js, Node.js, HTML, CSS, JavaScript, Java, Figma — and I also make diagrams in draw.io."
            />
            <AboutBlock
              Icon={Heart}
              title="Interests"
              body="When I'm not diving into data or studying information systems, you can usually find me on the court playing basketball and badminton, or online playing computer games. I love things that require strategy and quick decision-making. I also highly value a good sleep cycle to keep my mind sharp and ready for the next challenge."
            />
            <AboutBlock
              Icon={Smile}
              title="Beyond Work"
              body="Outside of my technical projects, I'm usually staying active through sports like basketball and badminton. I have a deep appreciation for the strategy involved in gaming, which often mirrors the logic I use in data analysis. To stay at my best, I prioritize rest and recovery, ensuring I'm always ready for the next challenge."
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AboutBlock({
  Icon,
  title,
  body,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/60">
      <div className="mb-2 flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-primary/15 text-primary">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
          {title}
        </div>
      </div>
      <p className="whitespace-pre-line text-xs leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

/* ---------------- SKILLS ---------------- */

function Skills() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <section id="skills" className="relative py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Background blur overlay when any skill is hovered */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none fixed inset-0 z-30 bg-background/40 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      <div className="relative mx-auto max-w-6xl px-4">
        <motion.div {...fadeUp()} className="text-center">
          <div className="font-mono text-sm text-primary">— What I work with</div>
          <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Analytics, BI tools and the supporting tech I use to turn data into insights.
          </p>
        </motion.div>

        <div className="mt-16 space-y-16">
          {skillCategories.map((cat, idx) => (
            <motion.div key={cat.title} {...fadeUp(idx * 0.05)}>
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-bold">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground">{cat.subtitle}</p>
                </div>
                <div className="hidden h-px flex-1 translate-y-[-10px] bg-border sm:block" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cat.skills.map((s) => (
                  <SkillCard
                    key={s.name}
                    skill={s}
                    isHovered={hovered === s.name}
                    onHover={(v) => setHovered(v ? s.name : null)}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  skill,
  isHovered,
  onHover,
}: {
  skill: Skill;
  isHovered: boolean;
  onHover: (v: boolean) => void;
}) {
  return (
    <div
      className={`group relative transition-all duration-300 ${isHovered ? "z-40" : "z-0"}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="glass relative overflow-hidden rounded-2xl p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-[var(--shadow-glow)]">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative flex items-start justify-between">
          <div className="text-3xl">{skill.icon}</div>
          <Badge
            variant="outline"
            className="border-primary/40 bg-primary/10 text-[10px] uppercase tracking-wider text-primary"
          >
            {skill.level}
          </Badge>
        </div>
        <h4 className="mt-4 font-display text-lg font-semibold">{skill.name}</h4>
        <p className="mt-1 text-xs text-muted-foreground">{skill.short}</p>

        <div className="mt-4">
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-700"
              style={{ width: `${skill.progress}%` }}
            />
          </div>
          <div className="mt-1.5 flex justify-between font-mono text-[10px] text-muted-foreground">
            <span>Progress</span>
            <span>{skill.progress}%</span>
          </div>
        </div>
      </div>

      {/* Floating info popup */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2"
          >
            <div className="glass rounded-2xl border border-primary/40 bg-card/95 p-4 shadow-[var(--shadow-elevated)]">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-primary">{skill.name}</div>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
                  {skill.level}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{skill.detail}</p>
              <div className="mt-3 rounded-lg bg-surface/80 p-2 text-[11px]">
                <span className="font-mono text-primary">↳ </span>
                {skill.example}
              </div>
              {skill.projectsUsed.length > 0 && (
                <div className="mt-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Used in
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {skill.projectsUsed.map((p) => (
                      <span key={p} className="rounded-full border border-border bg-surface/60 px-2 py-0.5 text-[10px] text-muted-foreground">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                  Applications
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {skill.applications.map((a) => (
                    <span key={a} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


/* ---------------- PROJECTS ---------------- */

function Projects({ onSelect }: { onSelect: (p: Project) => void }) {
  return (
    <section id="projects" className="relative bg-surface/40 py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div {...fadeUp()} className="text-center">
          <div className="font-mono text-sm text-primary">— Selected analytics work</div>
          <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            Data <span className="text-gradient">Projects</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Dashboards, analyses and data projects. Hover for the insight, click for the full case.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 0.05} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  delay,
  onSelect,
}: {
  project: Project;
  delay: number;
  onSelect: (p: Project) => void;
}) {
  return (
    <motion.button
      {...fadeUp(delay)}
      onClick={() => onSelect(project)}
      className="group relative block overflow-hidden rounded-3xl border border-border bg-card text-left transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
    >
      <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-md"
        />
        <div className="absolute left-3 top-3 z-10">
          <Badge className="bg-background/80 text-foreground backdrop-blur">
            {project.category}
          </Badge>
        </div>
        <div className="absolute right-3 top-3 z-10 text-3xl drop-shadow-lg">
          {project.emoji}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-background/95 via-background/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">Objective</div>
          <p className="mt-0.5 line-clamp-2 text-xs text-foreground">{project.objective}</p>
          <div className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-primary">Key Insight</div>
          <p className="line-clamp-2 text-xs text-muted-foreground">{project.insights[0]}</p>
          <div className="mt-2 inline-flex items-center text-xs font-semibold text-primary">
            View full case <ArrowRight className="ml-1 h-3 w-3" />
          </div>
        </div>
      </div>


      <div className="p-5">
        <h3 className="font-display text-lg font-semibold transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-surface/60 px-2.5 py-0.5 text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="w-[min(96vw,1100px)] max-w-[1100px] overflow-hidden border border-border bg-card p-0 text-foreground shadow-[var(--shadow-elevated)] sm:rounded-2xl">
        {project && (
          <div className="grid gap-0 md:grid-cols-[1.05fr_1fr]">
            {/* Left: Image */}
            <div className="relative flex items-center justify-center bg-surface p-4 md:p-6">
              <div className="relative w-full overflow-hidden rounded-xl border border-border bg-background">
                <img
                  src={project.image}
                  alt={project.title}
                  className="block max-h-[55vh] w-full object-contain"
                />
              </div>
              <Badge className="absolute left-6 top-6 bg-background/90 text-foreground backdrop-blur">
                {project.category}
              </Badge>
            </div>

            {/* Right: Info */}
            <div className="relative flex flex-col gap-3 p-5 md:p-6">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                  {project.role} · {project.year}
                </div>
                <DialogTitle className="mt-1 font-display text-xl sm:text-2xl">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="mt-1.5 text-xs leading-relaxed">
                  {project.description}
                </DialogDescription>
              </div>

              <div>
                <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Tools Used
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="border-border bg-surface text-[11px] text-foreground"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Features
                  </div>
                  <ul className="space-y-0.5 text-[11.5px] text-foreground/90">
                    {project.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex gap-1.5">
                        <span className="text-primary">▸</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Challenges
                  </div>
                  <ul className="space-y-0.5 text-[11.5px] text-foreground/90">
                    <li className="flex gap-1.5">
                      <span className="text-primary">▸</span>
                      <span>Cleaning messy {project.dataset.split("(")[0].trim().toLowerCase()}</span>
                    </li>
                    <li className="flex gap-1.5">
                      <span className="text-primary">▸</span>
                      <span>Choosing the right visuals for the story</span>
                    </li>
                    <li className="flex gap-1.5">
                      <span className="text-primary">▸</span>
                      <span>Translating numbers into clear insights</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-surface p-3">
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  Learning Outcomes
                </div>
                <p className="text-[11.5px] leading-relaxed text-foreground/90">
                  {project.outcome} Strengthened skills in {project.tech.slice(0, 2).join(" & ")} and
                  data storytelling.
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}



/* ---------------- JOURNEY ---------------- */

const JOURNEY: { year: string; title: string; body: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { year: "2023", title: "Excel & Data Organization", body: "Started learning Excel — formulas, pivot tables and structuring messy data into something useful.", Icon: BarChart3 },
  { year: "2024", title: "SQL & Database Fundamentals", body: "Picked up SQL and relational basics: SELECT, JOINs, GROUP BY and schema design.", Icon: Database },
  { year: "2025", title: "Web Systems & DB Projects", body: "Built systems backed by MySQL and explored reporting flows end-to-end.", Icon: LineChart },
  { year: "2026", title: "Power BI, Python & Visualization", body: "Learning Power BI, Python (Pandas) and data visualization storytelling.", Icon: PieChart },
  { year: "Future", title: "Professional Data Analyst", body: "Become a professional Data Analyst contributing to data-driven decision making.", Icon: TrendingUp },
];

function Journey() {
  return (
    <section id="journey" className="relative bg-surface/40 py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4">
        <motion.div {...fadeUp()} className="text-center">
          <div className="font-mono text-sm text-primary">— My path</div>
          <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            Data Analytics <span className="text-gradient">Journey</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            From spreadsheets to dashboards — the steps I'm taking toward becoming a Data Analyst.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-10">
            {JOURNEY.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  {...fadeUp(i * 0.05)}
                  className="relative grid gap-4 md:grid-cols-2 md:items-center"
                >
                  <div className={`pl-12 md:pl-0 ${left ? "md:pr-10 md:text-right" : "md:order-2 md:pl-10"}`}>
                    <div className="glass inline-block rounded-2xl border border-primary/25 p-5 text-left shadow-[var(--shadow-card)]">
                      <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{item.year}</div>
                      <div className="mt-1 font-display text-lg font-semibold">{item.title}</div>
                      <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
                    </div>
                  </div>
                  <div className="hidden md:block" />
                  <div className="absolute left-4 top-3 -translate-x-1/2 md:left-1/2">
                    <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-primary bg-background text-primary shadow-[var(--shadow-glow)]">
                      <item.Icon className="h-4 w-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats counters */}
        <motion.div {...fadeUp(0.1)} className="mt-20 grid gap-4 sm:grid-cols-4">
          <CounterCard value="6+" label="Data Projects" Icon={BarChart3} />
          <CounterCard value="5+" label="Tools Mastered" Icon={Database} />
          <CounterCard value="3+" label="Years Learning" Icon={LineChart} />
          <CounterCard value="100%" label="Data-Driven" Icon={TrendingUp} />
        </motion.div>
      </div>
    </section>
  );
}

function CounterCard({ value, label, Icon }: { value: string; label: string; Icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="glass rounded-2xl border border-primary/20 p-5 text-center transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]">
      <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="font-display text-3xl font-bold text-gradient">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

/* ---------------- CONTACT ---------------- */

function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("That email looks off — double-check it?");
      return;
    }
    setLoading(true);
    // Simulated send. Wire to EmailJS / FormSubmit when keys are added.
    await new Promise((r) => setTimeout(r, 1100));
    setLoading(false);
    toast.success("Message sent! I'll get back to you soon.", {
      description: `Thanks, ${form.name} — heading to pingoykhurtr@gmail.com.`,
    });
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div {...fadeUp()} className="text-center">
          <div className="font-mono text-sm text-primary">— Let's talk</div>
          <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            Let's Work With <span className="text-gradient">Data Together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            I'm always interested in opportunities involving data analytics, reporting, business
            intelligence, and data-driven decision making.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:items-start">
          <motion.div {...fadeUp()} className="space-y-4">
            <ContactRow
              Icon={Mail}
              label="Email"
              value="pingoykhurtr@gmail.com"
              href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
            />
            <ContactRow Icon={Phone} label="Phone" value="0967 823 2914" href="tel:+639678232914" />
            <ContactRow Icon={MapPin} label="Location" value="Philippines" />

            <div className="glass mt-6 rounded-2xl p-5">
              <div className="text-sm font-semibold">Find me online</div>
              <div className="mt-3 flex gap-3">
                {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>


          <motion.form
            {...fadeUp(0.1)}
            onSubmit={onSubmit}
            className="glass space-y-3 rounded-3xl p-6 shadow-[var(--shadow-card)]"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-12 rounded-xl bg-background/60"
              />
              <Input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-12 rounded-xl bg-background/60"
              />
            </div>
            <Input
              type="tel"
              placeholder="Phone number (optional)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="h-12 rounded-xl bg-background/60"
            />
            <Textarea
              placeholder="Tell me about your idea…"
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="resize-none rounded-xl bg-background/60"
            />
            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.01]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  Icon,
  label,
  value,
  href,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </>
  );
  const className =
    "flex items-center gap-4 rounded-2xl border border-border bg-surface/50 p-4 transition-colors hover:border-primary/40";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }
  return <div className={className}>{inner}</div>;
}


/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row">
        <div>
          © {new Date().getFullYear()} Khurt Pingoy. Crafted with care.
        </div>
        <div className="font-mono text-xs">Turning data into decisions.</div>
      </div>
    </footer>
  );
}
