import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, ExternalLink, ArrowUpRight, ChevronDown, Terminal, Menu, X } from "lucide-react";

const NAV_LINKS = ["About", "Projects", "Experience", "Contact"];

const SKILLS = [
  { category: "Languages", items: ["TypeScript", "Python", "Go", "Rust", "SQL"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "WebGL"] },
  { category: "Backend", items: ["Node.js", "PostgreSQL", "Redis", "GraphQL"] },
  { category: "Infrastructure", items: ["AWS", "Docker", "Kubernetes", "Terraform"] },
];

const PROJECTS = [
  {
    title: "Meridian",
    tag: "Open Source",
    year: "2024",
    description:
      "A distributed task queue built on top of Redis Streams. Handles 500k+ jobs/day with exactly-once delivery guarantees and real-time monitoring.",
    stack: ["Go", "Redis", "React", "PostgreSQL"],
    link: "#",
    featured: true,
  },
  {
    title: "Atlas Search",
    tag: "Side Project",
    year: "2024",
    description:
      "Vector-native semantic search engine for codebases. Indexes your repos locally and answers natural-language queries with precise file references.",
    stack: ["Python", "Rust", "FAISS", "Electron"],
    link: "#",
    featured: true,
  },
  {
    title: "Sieve",
    tag: "Work",
    year: "2023",
    description:
      "Real-time anomaly detection pipeline for financial transaction streams. Reduced false-positive rate by 62% over the legacy rule-based system.",
    stack: ["Python", "Kafka", "ClickHouse", "Grafana"],
    link: "#",
    featured: false,
  },
  {
    title: "Pulsar UI",
    tag: "Open Source",
    year: "2023",
    description:
      "Headless component library for data-heavy React dashboards. Ships with virtualized tables, sparklines, and a compact date range picker.",
    stack: ["TypeScript", "React", "Rollup"],
    link: "#",
    featured: false,
  },
  {
    title: "Nomad CLI",
    tag: "Side Project",
    year: "2022",
    description:
      "Terminal tool for managing multiple cloud environments from a single config. Context-switching, secret injection, and cost estimates in one place.",
    stack: ["Go", "AWS SDK", "GCP SDK"],
    link: "#",
    featured: false,
  },
  {
    title: "Logline",
    tag: "Work",
    year: "2022",
    description:
      "Structured logging framework with first-class OpenTelemetry support. Adopted across 8 microservices, cutting MTTR from 42 min to 11 min.",
    stack: ["TypeScript", "OpenTelemetry", "Datadog"],
    link: "#",
    featured: false,
  },
];

const EXPERIENCE = [
  {
    company: "Veritas Systems",
    role: "Senior Software Engineer",
    period: "2023 — Present",
    location: "San Francisco, CA",
    points: [
      "Led migration of monolithic Node.js backend to Go microservices, reducing p99 latency by 38%.",
      "Designed and shipped Sieve, a real-time anomaly detection pipeline processing 4M events/hour.",
      "Mentored 3 junior engineers and drove quarterly architecture reviews.",
    ],
  },
  {
    company: "Helix Cloud",
    role: "Software Engineer",
    period: "2021 — 2023",
    location: "Remote",
    points: [
      "Built the billing and metering infrastructure from scratch, handling 150+ enterprise customers.",
      "Reduced cold-start latency for serverless functions by 71% through custom runtime pooling.",
      "Shipped Logline, the internal structured logging framework now used company-wide.",
    ],
  },
  {
    company: "Aria Labs",
    role: "Software Engineer Intern",
    period: "Summer 2020",
    location: "New York, NY",
    points: [
      "Implemented a data ingestion pipeline in Python that processed 10GB/day of sensor telemetry.",
      "Built a React dashboard for real-time monitoring of IoT device fleets.",
    ],
  },
];

const TAG_COLORS: Record<string, string> = {
  "Open Source": "bg-accent/15 text-accent",
  "Side Project": "bg-secondary text-muted-foreground",
  Work: "bg-primary/8 text-foreground",
};

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(["about", "projects", "experience", "contact"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Figtree', sans-serif" }}>

      {/* ── Nav ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-mono text-sm tracking-widest uppercase text-foreground hover:text-accent transition-colors"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Alex Chen
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className={`text-sm transition-colors ${
                  active === link.toLowerCase()
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link}
              </button>
            ))}
            <a
              href="mailto:alex@example.com"
              className="text-sm px-4 py-2 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Hire me
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-background border-b border-border px-6 pb-6 pt-2 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-end pb-24 px-6 pt-32 max-w-5xl mx-auto"
      >
        <div className="mb-6 flex items-center gap-3">
          <span
            className="text-xs tracking-widest uppercase text-accent"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Available for work
          </span>
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        </div>

        <h1
          className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.92] tracking-tight mb-8"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          Software
          <br />
          <span className="text-accent">Engineer</span>
          <br />
          &amp; Builder
        </h1>

        <div className="grid md:grid-cols-2 gap-8 items-end">
          <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
            I build reliable backend systems and sharp product interfaces. Currently at{" "}
            <span className="text-foreground font-medium">Veritas Systems</span> in San Francisco,
            shipping infrastructure that doesn&apos;t page you at 3am.
          </p>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border px-4 py-2 transition-colors hover:border-foreground"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border px-4 py-2 transition-colors hover:border-foreground"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <button
              onClick={() => scrollTo("projects")}
              className="flex items-center gap-2 text-sm bg-primary text-primary-foreground px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              View Projects <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <button
          onClick={() => scrollTo("about")}
          className="mt-16 self-start flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          <ChevronDown size={14} className="animate-bounce" /> Scroll to explore
        </button>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-32 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <span
              className="text-xs tracking-widest uppercase text-muted-foreground"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              01 / About
            </span>
            <h2
              className="mt-4 text-4xl font-black leading-tight"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              The person behind the commits
            </h2>
          </div>

          <div className="space-y-12">
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                I&apos;m Alex Chen, a software engineer with 5+ years of experience designing and
                building systems that scale. My work lives at the intersection of backend
                infrastructure and developer tooling — I care deeply about the interfaces between
                systems and the humans who maintain them.
              </p>
              <p>
                Before Veritas, I studied Computer Science at UC Berkeley, where I spent too many
                nights in the systems lab and learned to love a well-placed abstraction. Outside of
                work I contribute to open source, write occasionally about distributed systems, and
                take on endurance cycling when screens become too much.
              </p>
            </div>

            {/* Skills grid */}
            <div>
              <h3
                className="text-xs tracking-widest uppercase text-muted-foreground mb-6"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Technical Stack
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {SKILLS.map((group) => (
                  <div key={group.category}>
                    <p
                      className="text-xs text-accent font-medium mb-3"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {group.category}
                    </p>
                    <ul className="space-y-1">
                      {group.items.map((item) => (
                        <li key={item} className="text-sm text-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-px border border-border">
              {[
                { n: "5+", label: "Years of exp." },
                { n: "40k+", label: "Lines open-sourced" },
                { n: "12", label: "Production systems" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card p-6">
                  <p
                    className="text-3xl font-black text-foreground"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    {stat.n}
                  </p>
                  <p
                    className="text-xs text-muted-foreground mt-1"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-border max-w-5xl mx-auto" />

      {/* ── Projects ── */}
      <section id="projects" className="py-32 px-6 max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <span
              className="text-xs tracking-widest uppercase text-muted-foreground"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              02 / Projects
            </span>
            <h2
              className="mt-4 text-4xl font-black leading-tight"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Things I&apos;ve built
            </h2>
          </div>
          <span
            className="text-xs text-muted-foreground hidden md:block"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {PROJECTS.length} projects
          </span>
        </div>

        {/* Featured row */}
        <div className="grid md:grid-cols-2 gap-px bg-border mb-px">
          {PROJECTS.filter((p) => p.featured).map((project) => (
            <ProjectCard key={project.title} project={project} featured />
          ))}
        </div>

        {/* Regular grid */}
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {PROJECTS.filter((p) => !p.featured).map((project) => (
            <ProjectCard key={project.title} project={project} featured={false} />
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-border max-w-5xl mx-auto" />

      {/* ── Experience ── */}
      <section id="experience" className="py-32 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16">
          <div>
            <span
              className="text-xs tracking-widest uppercase text-muted-foreground"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              03 / Experience
            </span>
            <h2
              className="mt-4 text-4xl font-black leading-tight"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Where I&apos;ve worked
            </h2>
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border px-4 py-2 transition-colors hover:border-foreground"
            >
              Full Résumé <ExternalLink size={14} />
            </a>
          </div>

          <div className="space-y-0">
            {EXPERIENCE.map((job, i) => (
              <div
                key={job.company}
                className={`py-10 ${i !== EXPERIENCE.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3
                      className="text-xl font-bold"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      {job.company}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-0.5">{job.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p
                      className="text-xs text-accent"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {job.period}
                    </p>
                    <p
                      className="text-xs text-muted-foreground mt-0.5"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {job.location}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {job.points.map((pt) => (
                    <li key={pt} className="text-sm text-muted-foreground flex gap-3 leading-relaxed">
                      <span className="text-accent mt-1 shrink-0">—</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-32 px-6 bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto">
          <span
            className="text-xs tracking-widest uppercase text-primary-foreground/40"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            04 / Contact
          </span>
          <h2
            className="mt-6 text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.9] tracking-tight mb-12"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            Let&apos;s build
            <br />
            something<span className="text-accent">.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-end">
            <p className="text-primary-foreground/60 leading-relaxed max-w-sm">
              I&apos;m open to senior/staff engineering roles, technical co-founder conversations,
              and interesting contract work. Best way to reach me is email.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:alex.chen@example.com"
                className="flex items-center justify-between w-full border border-primary-foreground/20 px-5 py-4 hover:border-accent hover:text-accent transition-colors group"
              >
                <span className="flex items-center gap-3 text-sm">
                  <Mail size={16} />
                  alex.chen@example.com
                </span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between w-full border border-primary-foreground/20 px-5 py-4 hover:border-accent hover:text-accent transition-colors group"
              >
                <span className="flex items-center gap-3 text-sm">
                  <Github size={16} />
                  github.com/alexchen
                </span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between w-full border border-primary-foreground/20 px-5 py-4 hover:border-accent hover:text-accent transition-colors group"
              >
                <span className="flex items-center gap-3 text-sm">
                  <Linkedin size={16} />
                  linkedin.com/in/alexchen
                </span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-primary-foreground/10 flex items-center justify-between">
            <span
              className="text-xs text-primary-foreground/30"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              © 2025 Alex Chen
            </span>
            <span
              className="text-xs text-primary-foreground/30 flex items-center gap-2"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <Terminal size={12} /> Built with React + TypeScript
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({
  project,
  featured,
}: {
  project: (typeof PROJECTS)[0];
  featured: boolean;
}) {
  return (
    <a
      href={project.link}
      className={`group bg-card block p-8 hover:bg-secondary transition-colors ${
        featured ? "min-h-[280px] flex flex-col justify-between" : ""
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <span
            className={`text-xs px-2 py-0.5 ${TAG_COLORS[project.tag] ?? "bg-secondary text-muted-foreground"}`}
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {project.tag}
          </span>
          <span
            className="text-xs text-muted-foreground"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {project.year}
          </span>
        </div>

        <h3
          className={`font-black leading-tight mb-3 ${featured ? "text-2xl" : "text-lg"}`}
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="text-xs text-muted-foreground/70"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {s}
            </span>
          ))}
        </div>
        <ArrowUpRight
          size={16}
          className="text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
        />
      </div>
    </a>
  );
}
