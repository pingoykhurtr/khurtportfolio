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
} from "lucide-react";
import { Toaster, toast } from "sonner";

import profileAsset from "@/assets/profile.jpg.asset.json";
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
      { title: "Khurt Pingoy — Software Engineering Portfolio" },
      {
        name: "description",
        content:
          "4th year software engineering student. Java, web development, and UI/UX design projects by Khurt Pingoy.",
      },
      { property: "og:title", content: "Khurt Pingoy — Portfolio" },
      {
        property: "og:description",
        content: "Software engineering student building Java apps, websites, and UI/UX prototypes.",
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
  { id: "contact", label: "Contact" },
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
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
            scrolled ? "glass shadow-lg" : "bg-transparent"
          }`}
        >
          <button
            onClick={() => scrollToId("home")}
            className="font-display text-xl font-bold tracking-tight"
          >
            Kh<span className="text-primary">ur</span>t<span className="text-primary">.</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-foreground transition-all hover:border-primary hover:text-primary"
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
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface md:hidden"
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
              className="glass mt-2 overflow-hidden rounded-2xl p-2 md:hidden"
            >
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    scrollToId(l.id);
                    setNavOpen(false);
                  }}
                  className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium hover:bg-accent"
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
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div
          className="animate-blob absolute bottom-0 right-10 h-80 w-80 rounded-full bg-primary-glow/15 blur-3xl"
          style={{ animationDelay: "4s" }}
        />
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
                "Software Engineering Student",
                2000,
                "Future Full Stack Developer",
                2000,
                "UI/UX Enthusiast",
                2000,
                "Problem Solver",
                2000,
              ]}
              speed={50}
              repeat={Infinity}
              cursor
            />
          </div>
          <p className="mt-6 max-w-md text-base text-muted-foreground">
            4th year student building Java apps, responsive websites, and UI/UX prototypes —
            still exploring, always learning.
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
            {[
              { Icon: Github, href: "#" },
              { Icon: Linkedin, href: "#" },
              { Icon: Facebook, href: "#" },
              { Icon: Mail, href: "mailto:pingoykhurtr@gmail.com" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="text-muted-foreground transition-all hover:-translate-y-1 hover:text-primary"
                aria-label="social"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...fadeUp(0.15)}
          className="relative mx-auto flex items-center justify-center"
        >
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/40 to-primary-glow/20 blur-3xl" />
          <div className="animate-float relative">
            <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-primary to-primary-glow opacity-70 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border-2 border-primary/60 shadow-[var(--shadow-glow)] transition-transform duration-500 hover:scale-105">
              <img
                src={profileAsset.url}
                alt="Khurt Pingoy"
                className="h-[420px] w-[340px] object-cover sm:h-[480px] sm:w-[380px]"
              />
            </div>
            <div className="glass absolute -bottom-4 -left-6 rounded-2xl px-4 py-3 text-sm shadow-lg">
              <div className="font-mono text-xs text-muted-foreground">Currently</div>
              <div className="font-semibold">4th Year Student</div>
            </div>
            <div className="glass absolute -right-6 top-10 rounded-2xl px-4 py-3 text-sm shadow-lg">
              <div className="font-mono text-xs text-muted-foreground">Focus</div>
              <div className="font-semibold text-primary">Software Eng.</div>
            </div>
          </div>
        </motion.div>
      </div>
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
              <Stat label="Skills" value="13+" />
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.15)}>
          <div className="font-mono text-sm text-primary">— About me</div>
          <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            Curious learner, <span className="text-gradient">future engineer</span>
          </h2>
          <p className="mt-6 text-muted-foreground">
            I'm still figuring out what I want to become — but right now I'm focused on the
            fundamentals of software engineering and design. I practice in Figma for UI/UX work and
            study Java, HTML, CSS, and JavaScript to build my coding foundation.
          </p>
          <p className="mt-4 text-muted-foreground">
            Each small step matters. Every project, course, and late-night debug session brings me
            closer to the path that fits me best.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
            <Info label="Name" value="Khurt Pingoy" />
            <Info label="Year" value="4th Year Student" />
            <Info label="Email" value="pingoykhurtr@gmail.com" />
            <Info label="Status" value="Open to projects" />
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
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto border-primary/20 bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl">
            More about <span className="text-gradient">Khurt</span>
          </DialogTitle>
          <DialogDescription>The deeper version of the bio.</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-5 text-sm">
          <AboutBlock title="Full Name" body="Khurt Rocaberte Pingoy" />
          <AboutBlock
            title="Education"
            body={
              "• 4th Year — BS in Information Systems (Post-Secondary)\n" +
              "• Secondary Education — F. Bustamante NHS\n" +
              "• Primary Education — Sixto Babao Elementary School"
            }
          />
          <AboutBlock
            title="Goals"
            body="For now, I want to be better and I'm still willing to figure out what I want to become — but right now I'm focused on the fundamentals of software engineering and design. I practice in Figma for UI/UX work and study Java, HTML, CSS, and JavaScript to build my coding foundation."
          />
          <AboutBlock
            title="Interests"
            body="Web development, mobile UI design, productivity tools, and learning new languages/frameworks through small side projects."
          />
          <AboutBlock
            title="Programming Journey"
            body="Started with HTML & CSS for school projects, fell in love with the logic side through Java, and now I'm expanding into JavaScript, React, and Node."
          />
        </div>

      </DialogContent>
    </Dialog>
  );
}

function AboutBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-4">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
        {title}
      </div>
      <p className="whitespace-pre-line text-muted-foreground">{body}</p>

    </div>
  );
}

/* ---------------- SKILLS ---------------- */

function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-4">
        <motion.div {...fadeUp()} className="text-center">
          <div className="font-mono text-sm text-primary">— What I work with</div>
          <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            A mix of code, design, and the everyday tools that keep things shipping.
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
                  <SkillCard key={s.name} skill={s} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="group relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="glass relative overflow-hidden rounded-2xl p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-[var(--shadow-card)]">
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
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute left-1/2 top-full z-30 mt-3 w-72 -translate-x-1/2"
          >
            <div className="glass rounded-2xl border-primary/30 p-4 shadow-[var(--shadow-elevated)]">
              <div className="text-sm font-semibold text-primary">{skill.name}</div>
              <p className="mt-1 text-xs text-muted-foreground">{skill.detail}</p>
              <div className="mt-3 rounded-lg bg-surface/80 p-2 text-[11px]">
                <span className="font-mono text-primary">↳ </span>
                {skill.example}
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
          <div className="font-mono text-sm text-primary">— Selected work</div>
          <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            Latest <span className="text-gradient">Projects</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            School projects, prototypes, and personal experiments. Hover for the story.
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="absolute inset-0 grid place-items-center text-7xl transition-transform duration-700 group-hover:scale-110">
          {project.emoji}
        </div>
        <div className="absolute left-3 top-3">
          <Badge className="bg-background/80 text-foreground backdrop-blur">
            {project.category}
          </Badge>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/95 via-background/70 to-transparent p-5 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <p className="line-clamp-3 text-xs text-muted-foreground">{project.description}</p>
          <div className="mt-3 inline-flex items-center text-sm font-semibold text-primary">
            View details <ArrowRight className="ml-1 h-3.5 w-3.5" />
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
      <DialogContent className="max-w-2xl border-primary/20 bg-card">
        {project && (
          <>
            <div
              className={`relative -mx-6 -mt-6 mb-2 grid h-40 place-items-center overflow-hidden rounded-t-lg bg-gradient-to-br ${project.gradient}`}
            >
              <div className="text-7xl">{project.emoji}</div>
              <Badge className="absolute left-4 top-4 bg-background/80 text-foreground backdrop-blur">
                {project.category}
              </Badge>
            </div>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">{project.title}</DialogTitle>
              <DialogDescription>{project.description}</DialogDescription>
            </DialogHeader>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <ProjectField label="My Role" value={project.role} />
              <ProjectField label="Year" value={project.year} />
            </div>
            <div className="mt-2">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                Technologies
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge key={t} variant="outline" className="border-primary/40">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-2">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                Key Features
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-primary">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ProjectField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
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
            Contact <span className="text-gradient">Me</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Open to collaborations, feedback, and opportunities to grow.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:items-start">
          <motion.div {...fadeUp()} className="space-y-4">
            <ContactRow Icon={Mail} label="Email" value="pingoykhurtr@gmail.com" />
            <ContactRow Icon={Phone} label="Phone" value="Available on request" />
            <ContactRow Icon={MapPin} label="Location" value="Philippines" />

            <div className="glass mt-6 rounded-2xl p-5">
              <div className="text-sm font-semibold">Find me online</div>
              <div className="mt-3 flex gap-3">
                {[
                  { Icon: Github, label: "GitHub" },
                  { Icon: Linkedin, label: "LinkedIn" },
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Mail, label: "Gmail" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
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
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface/50 p-4 transition-colors hover:border-primary/40">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row">
        <div>
          © {new Date().getFullYear()} Khurt Pingoy. Crafted with care.
        </div>
        <div className="font-mono text-xs">Built with HTML in spirit, React in practice.</div>
      </div>
    </footer>
  );
}
