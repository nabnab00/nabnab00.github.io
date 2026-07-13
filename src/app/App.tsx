import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ExternalLink, ArrowUpRight, ChevronDown, Terminal, Menu, X } from "lucide-react";

const NAV_LINKS = ["About", "Projects", "Experience", "Contact"];

const SKILLS = [
  { 
    category: "Languages", 
    items: ["Python", "Java", "C/C++", "C#", "JavaScript", "TypeScript", "Go", "Rust", "SQL", "HTML/CSS", "MATLAB"] 
  },
  { 
    category: "Frameworks & Web", 
    items: ["React", "Next.js", "Node.js", "Flask", "Tailwind CSS", "REST APIs", "GraphQL", "Android XML"] 
  },
  { 
    category: "Data Science & ML", 
    items: ["TensorFlow", "PyTorch", "Scikit-Learn", "Pandas", "NumPy"] 
  },
  { 
    category: "Databases & Cloud", 
    items: ["PostgreSQL", "MongoDB", "Firebase", "AWS"] 
  },
  { 
    category: "Hardware & Systems", 
    items: ["Embedded Systems", "NI CompactRIO", "Verilog", "VHDL"] 
  }
];

const COURSES = [
  {
    category: "Core Software & AI",
    items: ["Data Structures and Algorithms", "Operating Systems", "Applied Machine Learning", "Artificial Intelligence", "Computer Graphics"]
  },
  {
    category: "Hardware & Systems Engineering",
    items: ["Computer Architecture and Design", "Digital System Design", "Computer Organization and Software", "Fundamentals of Control Systems", "Time Signals and Systems"]
  }
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
    link: "https://github.com/hanishPagadala/Applied-Machine-Learning-Used-Car-Price-Prediction",
    featured: true,
  },
  {
    title: "Shift Flow Scheduling App",
    tag: "Full Stack",
    year: "2026",
    description:
      "Full-stack scheduling application generating automated monthly schedules for 20+ workers in under a minute. Built manager dashboard tools using React for real-time shift adjustments, reducing scheduling errors by 90%, improving workforce coordination efficiency.",
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
    link: "https://github.com/nabnab00/COEN-390-Munch-Ai-Mini-Capstone",
    featured: false,
  },
  {
    title: "Brew & Renew POS System",
    tag: "Full Stack",
    year: "2024",
    description:
      "Full-stack inventory and POS web app featuring automated QR code generation and mobile scanning for 200+ items. Automated consignment accounting using Python and SQL to dynamically calculate vendor profit splits, eliminating manual accounting errors by 85%.",
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
    role: "QA Intern & QA Analyst",
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
        className="relative min-h-screen flex flex-col justify-center pb-24 px-6 pt-32 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          // Links to your uploaded line-art background in the public folder
          backgroundImage: "url('/hero-bg.png')",
        }}
      >
        {/* Optional subtle overlay to ensure text remains 100% readable over the detailed line art */}
        <div className="absolute inset-0 bg-background/40 pointer-events-none" />

        {/* Content Wrapper (Z-index ensures content sits above the background image) */}
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          
          {/* Top Status Pill */}
          <div className="mb-8 flex items-center gap-3 animate-fade-in">
            <span
              className="text-xs tracking-widest uppercase text-accent font-semibold px-3 py-1 bg-accent/10 rounded-full border border-accent/20 bg-background/80 backdrop-blur-sm"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Available for full-time roles
            </span>
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          </div>

          {/* Main Scrapbook Grid */}
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-center">
            
            {/* Left Column: Big Intro & Social Badges (Fades in immediately) */}
            <div className="space-y-8 animate-fade-in">
              <h1
                className="text-[clamp(3rem,6vw,5.5rem)] font-black leading-[0.9] tracking-tight text-foreground"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Hi, i'm{" "}
                <br />
                <span className="text-accent">
                  Nabil Khan.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-md font-normal">
                a computer engineering student interested in hardware and software design.
              </p>

              {/* Stamped Style Social Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="https://github.com/nabnab00"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-medium bg-card/90 backdrop-blur-sm text-foreground border-2 border-border px-5 py-3 rounded-full shadow-sm hover:border-foreground hover:-translate-y-0.5 transition-all"
                >
                  <Github size={18} /> github
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-medium bg-card/90 backdrop-blur-sm text-foreground border-2 border-border px-5 py-3 rounded-full shadow-sm hover:border-foreground hover:-translate-y-0.5 transition-all"
                >
                  <Linkedin size={18} /> linkedin
                </a>
                <button
                  onClick={() => scrollTo("projects")}
                  className="flex items-center gap-2 text-sm font-medium bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-md hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5 transition-all"
                >
                  view projects <ArrowUpRight size={18} />
                </button>
              </div>
            </div>

            {/* Right Column: The Vintage Postcard Card (Fades in with a 0.3s delay for a layered effect!) */}
            <div className="relative flex justify-center lg:justify-end pt-6 lg:pt-0 animate-fade-in-delayed">
              
              {/* Background decorative rotated tilt */}
              <div className="absolute inset-0 bg-secondary/90 border border-border rounded-2xl -rotate-2 scale-[0.98] transition-transform duration-500 hover:rotate-0" />

              {/* Main Postcard Body */}
              <div className="relative bg-card/95 backdrop-blur-sm border-2 border-border rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-xl grid sm:grid-cols-[1.2fr_1fr] gap-6 items-center rotate-1 hover:rotate-0 transition-transform duration-300">
                
                {/* Left Side of Postcard: Typed Details */}
                <div className="space-y-4 text-sm border-b sm:border-b-0 sm:border-r border-border/60 pb-6 sm:pb-0 sm:pr-6">
                  <div className="border-b border-border/40 pb-3">
                    <h3 
                      className="font-black tracking-widest text-base uppercase text-foreground"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      POST CARD
                    </h3>
                    <p className="text-xs text-muted-foreground italic mt-0.5">
                      from Nabil Khan
                    </p>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-muted-foreground block">
                        Based in:
                      </span>
                      <span className="font-medium text-foreground">
                        Montreal, Canada
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono uppercase text-muted-foreground block">
                        Currently:
                      </span>
                      <span className="font-medium text-foreground">
                        B.Eng at Concordia University
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono uppercase text-muted-foreground block">
                        Specialties:
                      </span>
                      <span className="font-medium text-foreground text-xs leading-relaxed block mt-0.5">
                        ★ Hardware &amp; Embedded Systems
                        <br />
                        ★ Full-Stack Web Development
                        <br />
                        ★ Machine Learning Pipelines
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side of Postcard: Photo Stamp */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-44 h-56 sm:w-48 sm:h-64 bg-muted rounded-lg overflow-hidden border border-border shadow-inner group">
                    <img
                      src="/profile.jpg"
                      alt="Nabil Khan"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full border border-white/40 flex items-center justify-center pointer-events-none opacity-70">
                      <span className="text-[7px] text-white font-mono uppercase">MTL</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground mt-2 tracking-widest uppercase">
                    Class of 2027
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* Scroll Down Button */}
          <button
            onClick={() => scrollTo("about")}
            className="mt-16 self-start flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors animate-fade-in-delayed"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <ChevronDown size={14} className="animate-bounce" /> scroll to explore
          </button>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-border max-w-5xl mx-auto" />

      {/* ── About ── */}
      <section id="about" className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_2.2fr] gap-16 items-start">
          
          {/* Left Column: Section Header */}
          <div>
            <span
              className="text-xs tracking-widest uppercase text-muted-foreground"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              01 / About
            </span>
            <h2
              className="mt-4 text-4xl font-black leading-tight text-foreground"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              Engineering rigor meets clean software
            </h2>
          </div>

          {/* Right Column: Bio, Skills, Coursework & Stats */}
          <div className="space-y-16">
            
            {/* Bio Paragraphs */}
            <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
              <p>
                I&apos;m Nabil Khan, an engineering student at Concordia University (Class of 2027) with a deep interest in bridging the gap between hardware instrumentation and modern software engineering. Whether building automated test apparatuses or full-stack web dashboards, I focus on precision, efficiency, and reliability.
              </p>
              <p>
                Before diving deeply into computer engineering, I spent over five years working in QA at Keywords Studios. That experience instilled a rigorous mindset for finding edge cases, documenting complex software bugs, and collaborating directly with development teams in fast-paced environments.
              </p>
            </div>

            {/* Showcase 1: Languages & Technical Skills */}
            <div className="space-y-6 pt-4 border-t border-border/60">
              <div className="flex items-center justify-between">
                <h3
                  className="text-xs tracking-widest uppercase text-accent font-semibold"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  // Languages &amp; Technical Skills
                </h3>
                <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
                  Hover to explore stack
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {SKILLS.map((group) => (
                  <div 
                    key={group.category}
                    className="bg-card/50 border border-border/80 rounded-xl p-5 hover:border-foreground/30 hover:bg-card transition-all duration-300 shadow-sm"
                  >
                    <p
                      className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold mb-3 pb-2 border-b border-border/40"
                    >
                      {group.category}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary/80 text-foreground/90 border border-border/40 hover:bg-accent/15 hover:text-accent hover:border-accent/30 transition-colors cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Showcase 2: Relevant Engineering Coursework */}
            <div className="space-y-6 pt-4 border-t border-border/60">
              <h3
                className="text-xs tracking-widest uppercase text-accent font-semibold"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                // Relevant Engineering Coursework
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                {COURSES.map((group) => (
                  <div key={group.category} className="space-y-3">
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      {group.category}
                    </p>
                    <ul className="space-y-2 border-l-2 border-accent/40 pl-4 py-1">
                      {group.items.map((course) => (
                        <li 
                          key={course} 
                          className="text-sm font-medium text-foreground/90 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-px border border-border rounded-xl overflow-hidden bg-border pt-4">
              {[
                { n: "5+", label: "Years QA Exp." },
                { n: "500+", label: "Bugs Triaged" },
                { n: "2027", label: "Expected Grad." },
              ].map((stat) => (
                <div key={stat.label} className="bg-card p-6 text-center sm:text-left">
                  <p
                    className="text-2xl sm:text-3xl font-black text-foreground"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    {stat.n}
                  </p>
                  <p
                    className="text-[11px] sm:text-xs text-muted-foreground mt-1"
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
              Background
            </h2>
            <a
              href="/Nabil_Khan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border px-4 py-2 transition-colors hover:border-foreground"
            >
              View CV <ExternalLink size={14} />
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
    <div
      className={`group relative block p-8 bg-card/70 hover:bg-white hover:shadow-xl hover:shadow-accent/10 hover:z-10 hover:-translate-y-1 transition-all duration-300 ${
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

      {/* Footer: Displays the tech stack without any clickable link arrow */}
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
      </div>
    </div>
  );
}
