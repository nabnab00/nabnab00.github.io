import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ExternalLink, ArrowUpRight, ChevronDown, Terminal, Menu, X } from "lucide-react";

const NAV_LINKS = ["About", "Projects", "Experience", "Contact"];

const SKILLS = [
  { category: "Languages", items: ["Python", "Java", "C++", "C#", "C", "JavaScript", "Verilog", "VHDL"] },
  { category: "Web & Cloud", items: ["React", "Node.js", "Flask", "HTML/CSS", "Tailwind CSS", "Firebase"] },
  { category: "Data & AI", items: ["TensorFlow", "Scikit-Learn", "Machine Learning", "Data Pipelines", "Grid Search"] },
  { category: "Systems & Tools", items: ["SQL", "MongoDB", "Git", "Jira", "Embedded Systems", "NI CompactRIO"] },
];

const PROJECTS = [
  {
    title: "NETE Breathing Simulation Machine",
    tag: "Engineering Capstone",
    year: "2026",
    description:
      "Engineering an automated breathing machine control system for naval testing, improving hardware efficiency by 60%. Features a real-time frontend interface and data acquisition pipeline for 100% precise operational control.",
    stack: ["Python", "CompactRIO", "Linear Actuators", "Embedded Systems"],
    link: "#",
    featured: true,
  },
  {
    title: "Car-cycle ML Price Prediction",
    tag: "Machine Learning",
    year: "2026",
    description:
      "Engineered a machine learning data pipeline to clean and process 161,610 vehicle listings across 811 encoded features. Deployed an optimized Random Forest Regressor achieving a 0.94 R-squared score and low MAE of $2,067.61.",
    stack: ["Python", "Scikit-Learn", "Random Forest", "Data Pipeline"],
    link: "#",
    featured: true,
  },
  {
    title: "Shift Flow Scheduling App",
    tag: "Full Stack",
    year: "2026",
    description:
      "Full-stack scheduling application generating automated monthly schedules for 20+ workers in under a minute. Built manager dashboard tools using React for real-time shift adjustments, eliminating scheduling errors.",
    stack: ["React", "JavaScript", "MongoDB", "Node.js"],
    link: "#",
    featured: false,
  },
  {
    title: "Munch AI Nutrition & Smart Scale",
    tag: "IoT & Mobile",
    year: "2025",
    description:
      "Developed a nutrition tracking mobile app with a Java backend and real-time Firebase cloud sync for 100+ users. Engineered a Bluetooth ESP32 smart scale with ±0.01g precision, reducing meal entry time by 90%.",
    stack: ["Java", "Android XML", "ESP32", "Firebase"],
    link: "#",
    featured: false,
  },
  {
    title: "Brew & Renew POS System",
    tag: "Full Stack",
    year: "2024",
    description:
      "Full-stack inventory and POS web app featuring automated QR code generation and mobile scanning for 200+ items. Automated consignment accounting using Python and SQL to dynamically calculate vendor splits.",
    stack: ["React", "Flask", "PostgreSQL", "Python"],
    link: "#",
    featured: false,
  },
];

const EXPERIENCE = [
  {
    company: "Concordia University",
    role: "Bachelor of Engineering — Computer Engineering",
    period: "Expected May 2027",
    location: "Montreal, QC",
    points: [
      "Relevant Coursework: Data Structures and Algorithms, Computer Organization and Software, Digital System Design, Operating Systems.",
      "Developing hands-on expertise in full-stack architecture, embedded hardware controls, and real-time software systems.",
    ],
  },
  {
    company: "Keywords Studios",
    role: "Functional QA Tester & QA Intern",
    period: "June 2017 — Sept 2022",
    location: "Montreal, QC",
    points: [
      "Developed and executed 300+ comprehensive software test cases across mobile and desktop environments utilizing TestRail, improving overall test coverage and reducing post-release defects by 18%.",
      "Identified, documented, and triaged 500+ critical bugs using Jira, collaborating directly with development teams to propose targeted solutions that enhanced application performance and user experience.",
    ],
  },
];

const TAG_COLORS: Record<string, string> = {
  "Engineering Capstone": "bg-accent/15 text-accent",
  "Machine Learning": "bg-primary/15 text-primary font-semibold",
  "Full Stack": "bg-secondary text-muted-foreground",
  "IoT & Mobile": "bg-primary/8 text-foreground",
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
            Nabil Khan
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
              href="mailto:knabil8600@gmail.com"
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
            Available for full time positions
          </span>
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        </div>

        <h1
          className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.92] tracking-tight mb-8"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          Computer
          <br />
          <span className="text-accent">Engineering</span>
          <br />
          Student &amp; Dev
        </h1>

        <div className="grid md:grid-cols-2 gap-8 items-end">
          <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
            I build reliable automated systems, machine learning pipelines, and responsive web applications. Currently studying at{" "}
            <span className="text-foreground font-medium">Concordia University</span> in Montreal, shipping hardware-software integrations that solve real-world problems.
          </p>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <a
              href="https://github.com/nabnab00"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border px-4 py-2 transition-colors hover:border-foreground"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/nabil-khan00/"
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
              Engineering rigor meets clean software
            </h2>
          </div>

          <div className="space-y-12">
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                I&apos;m Nabil Khan, an engineering student at Concordia University (Class of 2027) with a deep interest in bridging the gap between hardware instrumentation and modern software engineering. Whether building automated test apparatuses or full-stack web dashboards, I focus on precision, efficiency, and reliability.
              </p>
              <p>
                Before getting into computer engineering, here's a little bit about me. I spent over five years working in software quality assurance at Keywords Studios. That experience instilled a rigorous mindset for finding edge cases, documenting complex software bugs, and collaborating directly with development teams in fast-paced environments.
              </p>
              <p>
                When I&apos;m not debugging code or designing digital systems, you can usually find me racing on the water with my dragonboat team, playing volleyball, hitting the gym, or testing out new recipes in the kitchen.
              </p>
            </div>

            {/* Skills grid */}
            <div>
              <h3
                className="text-xs tracking-widest uppercase text-muted-foreground mb-6"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Technical Stack &amp; Tools
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
                { n: "5+", label: "Years QA Exp." },
                { n: "500+", label: "Bugs Triaged" },
                { n: "2027", label: "Expected Grad." },
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
              Featured Applications &amp; Research
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
              03 / Experience &amp; Education
            </span>
            <h2
              className="mt-4 text-4xl font-black leading-tight"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              My background
            </h2>
            <a
              href="mailto:knabil8600@gmail.com?subject=Resume%20Request"
              className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border px-4 py-2 transition-colors hover:border-foreground"
            >
              CV <ExternalLink size={14} />
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
              I&apos;m currently seeking full time oppurtunites and collaborative software projects. Feel free to reach out via email or phone!
            </p>

            <div className="space-y-4">
              <a
                href="mailto:knabil8600@gmail.com"
                className="flex items-center justify-between w-full border border-primary-foreground/20 px-5 py-4 hover:border-accent hover:text-accent transition-colors group"
              >
                <span className="flex items-center gap-3 text-sm">
                  <Mail size={16} />
                  knabil8600@gmail.com
                </span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://github.com/nabnab00"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between w-full border border-primary-foreground/20 px-5 py-4 hover:border-accent hover:text-accent transition-colors group"
              >
                <span className="flex items-center gap-3 text-sm">
                  <Github size={16} />
                  github.com/nabnab00
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
                  LinkedIn Profile
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
              © 2026 Nabil Khan
            </span>
            <span
              className="text-xs text-primary-foreground/30 flex items-center gap-2"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <Terminal size={12} /> Built with React + TypeScript + Tailwind
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
