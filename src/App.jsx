import { useState, useEffect, useRef } from "react";
import {
  Zap,
  PenLine,
  SmilePlus,
  Mail,
  ArrowRight,
  Home,
  Code2,
  Brain,
  Database,
  Globe,
  Lock,
  Server,
  Palette,
  Terminal,
  Layers,
  Cpu,
  Sparkles,
  WeightTildeIcon,
} from "lucide-react";

const LinkedinIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   THEME
   ═══════════════════════════════════════════════════════════════ */
const T = {
  bg: "#111113",
  sidebar: "#1a1a1e",
  card: "#1e1e23",
  cardBorder: "rgba(255,255,255,0.07)",
  cardBorderHover: "rgba(255,255,255,0.14)",
  text: "#e8e6e1",
  muted: "#807e78",
  subtle: "#4a4945",
  font: "'DM Sans', sans-serif",
  serif: "'Instrument Serif', Georgia, serif",
};

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
const SIDEBAR_ICONS = [
  { key: "home", icon: Home },
  { key: "work", icon: Zap },
  { key: "blog", icon: SmilePlus },
  { key: "about", icon: PenLine },
  { key: "contact", icon: Mail },
];

const PROJECTS = [
  {
    title: "Sisinflab Platform",
    type: "Web Platform",
    desc: "Multilingual web platform for the Sisinflab research group at Politecnico di Bari. Unified frontend with Strapi CMS, JWT authentication and full internationalization.",
    tags: ["Next.js 16", "React 19", "TypeScript", "JWT", "i18n"],
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  },
  {
    title: "snkrsVault V1",
    type: "E-Commerce",
    desc: "Full-stack MERN e-commerce for sneakers with size-based stock management, dynamic cart, order system and admin panel.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Tailwind"],
    gradient: "linear-gradient(135deg, #ec4899, #f97316)",
  },
  {
    title: "AI Engineering Path",
    type: "Learning & Research",
    desc: "Self-directed AI/ML learning path: fast.ai, DeepLearning.AI, Hugging Face NLP, Made With ML. Focus on RAG and LangChain.",
    tags: ["ML", "NLP", "RAG"],
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
  },
];

const LEARNING = [
  {
    title: "Anthropic — Advanced Claude Usage",
    status: "In corso",
    desc: "Official Anthropic course on Claude: advanced prompt engineering, tool use, computer use, context management and app integration. Focus on Claude as an engine for AI agents and RAG pipelines.",
    tags: ["Claude API", "Prompt Engineering", "Tool Use", "AI Agents", "RAG"],
  },
  // aggiungi altri corsi qui facilmente
];

const SKILLS = [
  { icon: <Code2 size={20} />, name: "React" },
  { icon: <Layers size={20} />, name: "Next.js" },
  { icon: <Terminal size={20} />, name: "TypeScript" },
  { icon: <Server size={20} />, name: "Node.js" },
  { icon: <Database size={20} />, name: "MongoDB" },
  { icon: <Palette size={20} />, name: "Tailwind" },
  { icon: <Brain size={20} />, name: "bcrypt" },
  { icon: <Cpu size={20} />, name: "AI / ML" },
  { icon: <Globe size={20} />, name: "REST APIs" },
  { icon: <Lock size={20} />, name: "JWT Auth" },
  { icon: <Sparkles size={20} />, name: "Framer Motion" },
  { icon: <Globe size={20} />, name: "next-intl" },
];

const SERVICES = [
  {
    title: "Frontend Development",
    desc: "Modern web applications with React, Next.js and TypeScript. Responsive, performant and accessible UIs.",
  },
  {
    title: "Full-Stack Development",
    desc: "End-to-end solutions with Node.js, Express and MongoDB. REST APIs, JWT authentication, headless CMS.",
  },
  {
    title: "AI Integration",
    desc: "Studying AI models: RAG pipelines, custom chatbots, NLP and intelligent automation.",
  },
];
/* ═══════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════ */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold, rootMargin: "0px 0px -30px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function Reveal({ children, delay = 0 }) {
  const [ref, vis] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SIDEBAR — pill-shaped, vertically centered on left
   ═══════════════════════════════════════════════════════════════ */
function Sidebar({ page, setPage }) {
  return (
    <nav
      className="sidebar-desktop"
      style={{
        position: "fixed",
        left: 16,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 200,
        background: T.sidebar,
        borderRadius: 20,
        border: `1px solid ${T.cardBorder}`,
        padding: "0.55rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.2rem",
      }}
    >
      {SIDEBAR_ICONS.map((item) => {
        const Icon = item.icon;
        const active = page === item.key;
        return (
          <button
            key={item.key}
            onClick={() => {
              setPage(item.key);
              window.scrollTo(0, 0);
            }}
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              border: "none",
              background: active ? "rgba(255,255,255,0.08)" : "transparent",
              color: active ? T.text : T.subtle,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.color = T.muted;
            }}
            onMouseLeave={(e) => {
              if (!active)
                e.currentTarget.style.color = active ? T.text : T.subtle;
            }}
          >
            <Icon size={18} strokeWidth={active ? 2 : 1.5} />
          </button>
        );
      })}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE BOTTOM BAR
   ═══════════════════════════════════════════════════════════════ */
function MobileBar({ page, setPage }) {
  return (
    <div
      className="mobile-bar"
      style={{
        position: "fixed",
        bottom: 16, // ← staccata dal bordo come la sidebar (left: 16)
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 200,
        background: T.sidebar,
        borderRadius: 20, // ← stesso border radius pill
        border: `1px solid ${T.cardBorder}`,
        padding: "0.55rem", // ← stesso padding
        display: "none",
        flexDirection: "row", // ← orizzontale invece di verticale
        gap: "0.2rem", // ← stesso gap
      }}
    >
      {SIDEBAR_ICONS.map((item) => {
        const Icon = item.icon;
        const active = page === item.key;
        return (
          <button
            key={item.key}
            onClick={() => {
              setPage(item.key);
              window.scrollTo(0, 0);
            }}
            style={{
              width: 38, // ← identico alla sidebar
              height: 38,
              borderRadius: 12,
              border: "none",
              background: active ? "rgba(255,255,255,0.08)" : "transparent",
              color: active ? T.text : T.subtle,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.color = T.muted;
            }}
            onMouseLeave={(e) => {
              if (!active)
                e.currentTarget.style.color = active ? T.text : T.subtle;
            }}
          >
            <Icon size={18} strokeWidth={active ? 2 : 1.5} />
          </button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME — exact replica of screenshot
   ═══════════════════════════════════════════════════════════════ */
function HomePage({ setPage }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.1rem 2rem 4rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 640,
          width: "100%",
        }}
      >
        {/* Avatar emoji.png */}
        <Reveal>
          <div
            style={{
              width: 370,
              height: 370,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
              overflow: "hidden",
            }}
          >
            <img
              src="/emoji.png"
              alt="avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Reveal>

        {/* Line 1: "Hey, I'm Mick." */}
        <Reveal delay={60}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.35rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: T.serif,
                fontSize: "clamp(2.5rem, 5.5vw, 3.6rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: T.text,
                lineHeight: 1.15,
              }}
            >
              Hey, I'm Mick.
            </span>
          </div>
        </Reveal>

        {/* Line 2: "How can I help you?" */}
        <Reveal delay={80}>
          <h2
            style={{
              fontFamily: T.serif,
              fontSize: "clamp(2.5rem, 5.5vw, 3.6rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: T.text,
              textAlign: "center",
              lineHeight: 1.15,
              marginBottom: "2.8rem",
            }}
          >
            How can I help you?
          </h2>
        </Reveal>

        {/* Option cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.55rem",
            width: "100%",
          }}
        >
          {[
            {
              letter: "A",
              text: "I heard you build great web apps & platforms!",
              target: "work",
            },
            {
              letter: "B",
              text: "I'd like to read about tech & development!",
              target: "blog",
            },
            { letter: "C", text: "Mick, who?!", target: "about" },
          ].map((opt, i) => (
            <Reveal key={opt.letter} delay={220 + i * 90}>
              <OptionCard
                {...opt}
                onClick={() => {
                  setPage(opt.target);
                  window.scrollTo(0, 0);
                }}
              />
            </Reveal>
          ))}
        </div>

        {/* Never Mind – Just Say Hi */}
        <Reveal delay={560}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              marginTop: "1.8rem",
            }}
          >
            <span
              style={{
                fontFamily: T.font,
                fontSize: "0.85rem",
                color: T.muted,
              }}
            >
              Never Mind –
            </span>
            <button
              onClick={() => {
                setPage("contact");
                window.scrollTo(0, 0);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: T.font,
                fontSize: "0.85rem",
                fontWeight: 500,
                color: T.text,
                textDecoration: "underline",
                textDecorationColor: "rgba(255,255,255,0.3)",
                textUnderlineOffset: "3px",
                padding: 0,
              }}
            >
              Just Say Hi
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function OptionCard({ letter, text, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1.05rem 1.3rem",
        background: T.card,
        border: `1px solid ${h ? T.cardBorderHover : T.cardBorder}`,
        borderRadius: 14,
        cursor: "pointer",
        transition: "all 0.25s ease",
        width: "100%",
        textAlign: "left",
      }}
    >
      <span
        style={{
          fontFamily: T.font,
          fontSize: "0.76rem",
          fontWeight: 500,
          color: T.muted,
          flexShrink: 0,
        }}
      >
        {letter}
      </span>
      <span
        style={{
          fontFamily: T.font,
          fontSize: "0.9rem",
          fontWeight: 400,
          color: T.text,
          flex: 1,
        }}
      >
        {text}
      </span>
      <ArrowRight
        size={15}
        color={T.muted}
        style={{
          opacity: h ? 0.7 : 0.25,
          transition: "opacity 0.2s",
          flexShrink: 0,
        }}
      />
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WORK PAGE
   ═══════════════════════════════════════════════════════════════ */
function WorkPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "5rem 5rem 4rem",
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      <Reveal>
        <h1
          style={{
            fontFamily: T.serif,
            fontSize: "clamp(3.5rem, 9vw, 6rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: T.text,
            marginBottom: "3rem",
          }}
        >
          Folio
        </h1>
      </Reveal>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {PROJECTS.map((p, i) => (
          <Reveal key={i} delay={i * 130}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.1fr",
        borderRadius: 18,
        overflow: "hidden",
        background: T.card,
        border: `1px solid ${h ? T.cardBorderHover : T.cardBorder}`,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: h ? "translateY(-3px)" : "none",
      }}
    >
      <div
        style={{
          minHeight: 250,
          background: project.gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: T.serif,
            fontSize: "3rem",
            fontWeight: 400,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.18)",
          }}
        >
          {project.title.split(" ")[0]}
        </span>
      </div>
      <div
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: T.font,
            fontSize: "0.7rem",
            fontWeight: 500,
            color: T.muted,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.4rem",
          }}
        >
          {project.type}
        </span>
        <h3
          style={{
            fontFamily: T.serif,
            fontSize: "1.7rem",
            fontWeight: 400,
            fontStyle: "italic",
            color: T.text,
            marginBottom: "0.7rem",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: T.font,
            fontSize: "0.85rem",
            color: T.muted,
            lineHeight: 1.7,
            marginBottom: "1.1rem",
          }}
        >
          {project.desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {project.tags.map((t, i) => (
            <span
              key={i}
              style={{
                fontFamily: T.font,
                fontSize: "0.67rem",
                fontWeight: 600,
                padding: "0.2rem 0.55rem",
                borderRadius: 50,
                background: "rgba(255,255,255,0.06)",
                color: T.text,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT PAGE
   ═══════════════════════════════════════════════════════════════ */
function AboutPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: isMobile ? "3rem 1.5rem 4rem" : "5rem 5rem 4rem",
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      <Reveal>
        <h1
          style={{
            fontFamily: T.serif,
            fontSize: "clamp(3.5rem, 9vw, 6rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: T.text,
            marginBottom: "3rem",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Meet Mick
        </h1>
      </Reveal>

      {/* Avatar + Bio — stack verticale su mobile */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "220px 1fr",
          gap: isMobile ? "1.5rem" : "3rem",
          alignItems: "start",
          marginBottom: "3rem",
          justifyItems: isMobile ? "center" : "start",
        }}
      >
        <Reveal>
          <div
            style={{
              width: 250,
              height: 250,
              borderRadius: 20,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "2rem",
            }}
          >
            <img
              src="/emoji2.png"
              alt="avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ textAlign: isMobile ? "center" : "left" }}>
            <h2
              style={{
                fontFamily: T.serif,
                fontSize: "1.4rem",
                fontWeight: 400,
                fontStyle: "italic",
                color: T.text,
                lineHeight: 1.55,
                marginBottom: "1.2rem",
              }}
            >
              Computer Engineer & AI Enthusiast graduated from Politecnico di
              Bari, with a focus on modern web applications and artificial
              intelligence.
            </h2>
            <p
              style={{
                fontFamily: T.font,
                fontSize: "0.92rem",
                color: T.muted,
                lineHeight: 1.8,
              }}
            >
              My journey spans from frontend with React and Next.js, to backend
              with Node.js and Express, all the way to exploring the AI/ML
              world. I built the multilingual Sisinflab platform as my thesis
              project, and a full-stack e-commerce with snkrsVault.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div
          style={{
            display: "flex",
            gap: "3rem",
            marginBottom: "4rem",
            padding: "2rem 0",
            borderTop: `1px solid ${T.cardBorder}`,
            borderBottom: `1px solid ${T.cardBorder}`,
          }}
        >
          {[
            { value: "101/110", label: "Degree PoliBa" },
            { value: "1+", label: "Years of Coding" },
            { value: "2+", label: "Projects" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", flex: 1 }}>
              <span
                style={{
                  fontFamily: T.serif,
                  fontSize: "2.5rem",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: T.text,
                }}
              >
                {s.value}
              </span>
              <p
                style={{
                  fontFamily: T.font,
                  fontSize: "0.78rem",
                  color: T.muted,
                  marginTop: "0.3rem",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <h2
          style={{
            fontFamily: T.serif,
            fontSize: "2rem",
            fontWeight: 400,
            fontStyle: "italic",
            color: T.text,
            marginBottom: "1.2rem",
          }}
        >
          Tech Stack
        </h2>
      </Reveal>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(115px, 1fr))",
          gap: "0.6rem",
          marginBottom: "4rem",
        }}
      >
        {SKILLS.map((s, i) => (
          <Reveal key={i} delay={i * 35}>
            <SkillChip {...s} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h2
          style={{
            fontFamily: T.serif,
            fontSize: "2rem",
            fontWeight: 400,
            fontStyle: "italic",
            color: T.text,
            marginBottom: "1.2rem",
          }}
        >
          On Demand Services
        </h2>
      </Reveal>
      {SERVICES.map((s, i) => (
        <Reveal key={i} delay={i * 60}>
          <ServiceRow {...s} />
        </Reveal>
      ))}
    </div>
  );
}

function SkillChip({ icon, name }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: T.card,
        border: `1px solid ${h ? T.cardBorderHover : T.cardBorder}`,
        borderRadius: 12,
        padding: "0.85rem 0.5rem",
        textAlign: "center",
        cursor: "default",
        transition: "all 0.25s ease",
        transform: h ? "translateY(-2px)" : "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.3rem",
      }}
    >
      <span style={{ color: h ? T.text : T.muted, transition: "color 0.25s" }}>
        {icon}
      </span>
      <span
        style={{
          fontFamily: T.font,
          fontSize: "0.76rem",
          fontWeight: 500,
          color: T.text,
        }}
      >
        {name}
      </span>
    </div>
  );
}

function ServiceRow({ title, desc }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        padding: "1.3rem 0",
        borderBottom: `1px solid ${T.cardBorder}`,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            fontFamily: T.serif,
            fontSize: "1.2rem",
            fontWeight: 400,
            fontStyle: "italic",
            color: T.text,
          }}
        >
          {title}
        </h3>
        <span
          style={{
            fontFamily: T.font,
            fontSize: "1.2rem",
            color: T.muted,
            transition: "transform 0.3s",
            transform: open ? "rotate(45deg)" : "rotate(0)",
          }}
        >
          +
        </span>
      </div>
      <div
        style={{
          maxHeight: open ? 140 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <p
          style={{
            fontFamily: T.font,
            fontSize: "0.88rem",
            color: T.muted,
            lineHeight: 1.7,
            paddingTop: "0.7rem",
            maxWidth: 500,
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT PAGE
   ═══════════════════════════════════════════════════════════════ */
function ContactPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "4rem 2rem",
      }}
    >
      <Reveal>
        <h1
          style={{
            fontFamily: T.serif,
            fontSize: "clamp(3rem, 8vw, 5rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: T.text,
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          The Stage is Yours
        </h1>
      </Reveal>
      <Reveal delay={100}>
        <p
          style={{
            fontFamily: T.font,
            fontSize: "0.98rem",
            color: T.muted,
            textAlign: "center",
            maxWidth: 400,
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          Always looking for new collaborations and interesting projects. Need a
          hand? I've got two!
        </p>
      </Reveal>
      <Reveal delay={200}>
        <div
          style={{
            background: T.card,
            border: `1px solid ${T.cardBorder}`,
            borderRadius: 22,
            padding: "1.5rem 3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.7rem",
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              overflow: "hidden",
              marginBottom: "0.2rem",
            }}
          >
            <img
              src="emoji3.png"
              alt="avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <h2
            style={{
              fontFamily: T.serif,
              fontSize: "1.5rem",
              fontWeight: 400,
              fontStyle: "italic",
              color: T.text,
            }}
          >
            Mick
          </h2>
          <p style={{ fontFamily: T.font, fontSize: "0.8rem", color: T.muted }}>
            Computer Engineer & AI Enthusiast
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginTop: "0.7rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              {
                icon: <Mail size={13} />,
                label: "Drop an E-Mail",
                href: "mailto:mastromauromichele1@gmail.com",
              },
              {
                icon: <LinkedinIcon size={13} />,
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/michele-mastromauro-620903403/",
              },
            ].map((l, i) => (
              <ContactBtn key={i} {...l} />
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function ContactBtn({ icon, label, href }) {
  const [h, setH] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        padding: "0.5rem 1rem",
        background: h ? "rgba(255,255,255,0.04)" : "transparent",
        border: `1px solid ${h ? T.cardBorderHover : T.cardBorder}`,
        borderRadius: 50,
        color: T.text,
        textDecoration: "none",
        fontFamily: T.font,
        fontSize: "0.76rem",
        fontWeight: 500,
        transition: "all 0.2s ease",
      }}
    >
      <span style={{ color: T.muted }}>{icon}</span>
      {label}
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BLOG PAGE (placeholder)
   ═══════════════════════════════════════════════════════════════ */
function BlogPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "5rem 5rem 4rem",
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      <Reveal>
        <h1
          style={{
            fontFamily: T.serif,
            fontSize: "clamp(3.5rem, 9vw, 6rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: T.text,
            marginBottom: "0.5rem",
          }}
        >
          Currently Learning
        </h1>
      </Reveal>
      <Reveal delay={60}>
        <p
          style={{
            fontFamily: T.font,
            fontSize: "0.92rem",
            color: T.muted,
            marginBottom: "3rem",
            lineHeight: 1.7,
          }}
        >
          Things I'm studying, exploring and building right now.
        </p>
      </Reveal>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {LEARNING.map((item, i) => (
          <Reveal key={i} delay={120 + i * 80}>
            <div
              style={{
                background: T.card,
                border: `1px solid ${T.cardBorder}`,
                borderRadius: 18,
                padding: "1.8rem 2rem",
                display: "flex",
                gap: "1.5rem",
                alignItems: "flex-start",
              }}
            >
              {/* Status dot */}
              <div
                style={{
                  marginTop: "0.35rem",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: item.status === "In corso" ? "#22c55e" : T.muted,
                  flexShrink: 0,
                  boxShadow:
                    item.status === "In corso"
                      ? "0 0 8px rgba(34,197,94,0.6)"
                      : "none",
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    marginBottom: "0.4rem",
                    flexWrap: "wrap",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: T.serif,
                      fontSize: "1.25rem",
                      fontWeight: 400,
                      fontStyle: "italic",
                      color: T.text,
                    }}
                  >
                    {item.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: T.font,
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      padding: "0.15rem 0.5rem",
                      borderRadius: 50,
                      background:
                        item.status === "In corso"
                          ? "rgba(34,197,94,0.1)"
                          : "rgba(255,255,255,0.06)",
                      color: item.status === "In corso" ? "#22c55e" : T.muted,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {item.status}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: T.font,
                    fontSize: "0.87rem",
                    color: T.muted,
                    lineHeight: 1.75,
                    marginBottom: "1rem",
                  }}
                >
                  {item.desc}
                </p>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}
                >
                  {item.tags.map((tag, j) => (
                    <span
                      key={j}
                      style={{
                        fontFamily: T.font,
                        fontSize: "0.67rem",
                        fontWeight: 600,
                        padding: "0.2rem 0.55rem",
                        borderRadius: 50,
                        background: "rgba(255,255,255,0.06)",
                        color: T.text,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <p
          style={{
            fontFamily: T.font,
            fontSize: "0.8rem",
            color: T.subtle,
            marginTop: "2.5rem",
            textAlign: "center",
          }}
        >
          More content coming soon — notes, articles and case studies.
        </p>
      </Reveal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES
   ═══════════════════════════════════════════════════════════════ */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Instrument+Serif:ital@0;1&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { background: ${T.bg}; color: ${T.text}; font-family: ${T.font}; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
      ::selection { background: rgba(99,102,241,0.2); }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 10px; }
      @media (max-width: 768px) {
        .sidebar-desktop { display: none !important; }
        .mobile-bar { display: flex !important; }
      }
      @media (min-width: 769px) {
        .mobile-bar { display: none !important; }
      }
    `}</style>
  );
}

/* ═══════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "work":
        return <WorkPage />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "blog":
        return <BlogPage />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      <Sidebar page={page} setPage={setPage} />
      <MobileBar page={page} setPage={setPage} />
      <main>{renderPage()}</main>
    </>
  );
}
