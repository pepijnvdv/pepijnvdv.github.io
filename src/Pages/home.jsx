import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../SiteConfig";
import ProjectCard from "../Components/ProjectCard";
import projectData from "../data/projectdata.json";

const themePresets = [
  {
    id: "studio",
    name: "Studio",
    vars: {
      bg: "#f4f6f9",
      surface: "#ffffff",
      text: "#0f172a",
      muted: "#6b7280",
      accent: "#2563eb",
      "accent-rgb": "37 99 235",
      "accent-hover": "#1d4ed8",
      "accent-text": "#ffffff",
      bordercolor: "#e5e7eb",
    },
  },
  {
    id: "slate",
    name: "Slate",
    vars: {
      bg: "#f7f7fb",
      surface: "#ffffff",
      text: "#111827",
      muted: "#6b7280",
      accent: "#0f766e",
      "accent-rgb": "15 118 110",
      "accent-hover": "#0d5f59",
      "accent-text": "#ffffff",
      bordercolor: "#e6e7eb",
    },
  },
  {
    id: "sand",
    name: "Sand",
    vars: {
      bg: "#f7f2ea",
      surface: "#ffffff",
      text: "#1f2937",
      muted: "#6b7280",
      accent: "#b45309",
      "accent-rgb": "180 83 9",
      "accent-hover": "#92400e",
      "accent-text": "#ffffff",
      bordercolor: "#e7dfd3",
    },
  },
  {
    id: "ink",
    name: "Ink",
    vars: {
      bg: "#f2f4f8",
      surface: "#ffffff",
      text: "#0b1220",
      muted: "#667085",
      accent: "#7c3aed",
      "accent-rgb": "124 58 237",
      "accent-hover": "#6d28d9",
      "accent-text": "#ffffff",
      bordercolor: "#e5e7eb",
    },
  },
];

function shadeHex(hex, amount) {
  const raw = hex.replace("#", "");
  const full = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  if (full.length !== 6) return hex;
  const num = parseInt(full, 16);
  const r = Math.min(255, Math.max(0, Math.round(((num >> 16) & 255) * (1 + amount))));
  const g = Math.min(255, Math.max(0, Math.round(((num >> 8) & 255) * (1 + amount))));
  const b = Math.min(255, Math.max(0, Math.round((num & 255) * (1 + amount))));
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

function hexToRgb(hex) {
  const raw = hex.replace("#", "");
  const full = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  if (full.length !== 6) return null;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function applyTheme(vars) {
  const root = document.documentElement;
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}

function applyAccent(hex) {
  const root = document.documentElement;
  const rgb = hexToRgb(hex);
  root.style.setProperty("--accent", hex);
  root.style.setProperty("--accent-hover", shadeHex(hex, -0.12));
  root.style.setProperty("--accent-text", "#ffffff");
  if (rgb) {
    root.style.setProperty("--accent-rgb", `${rgb[0]} ${rgb[1]} ${rgb[2]}`);
  }
}

export default function Home() {
  const projects = projectData.projects;
  const [activeTheme, setActiveTheme] = useState(themePresets[0].id);
  const [accent, setAccent] = useState(themePresets[0].vars.accent);
  const nameLetters = useMemo(() => Array.from(siteConfig.name || ""), []);

  useEffect(() => {
    const savedPreset = localStorage.getItem("themePreset");
    const savedAccent = localStorage.getItem("themeAccent");
    const preset = themePresets.find((item) => item.id === savedPreset) || themePresets[0];
    applyTheme(preset.vars);
    setActiveTheme(preset.id);
    setAccent(savedAccent || preset.vars.accent);
    if (savedAccent) applyAccent(savedAccent);
  }, []);

  const handlePreset = (preset) => {
    applyTheme(preset.vars);
    setActiveTheme(preset.id);
    setAccent(preset.vars.accent);
    localStorage.setItem("themePreset", preset.id);
    localStorage.setItem("themeAccent", preset.vars.accent);
  };

  const handleAccentChange = (value) => {
    setAccent(value);
    applyAccent(value);
    localStorage.setItem("themeAccent", value);
  };

  return (
    <div>
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute -top-28 right-8 h-72 w-72 rounded-full bg-(--accent) opacity-10 blur-3xl" />
        <div className="absolute -bottom-24 left-6 h-72 w-72 rounded-full bg-(--accent) opacity-10 blur-3xl" />

        <div className="container mx-auto grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <h1
              className="mt-6 text-5xl font-semibold text-(--text) leading-tight about-name-letters"
              aria-label={siteConfig.name}
            >
              {nameLetters.map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  className="about-name-letter"
                  style={{ "--delay": `${120 + index * 45}ms` }}
                  aria-hidden="true"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
            <p className="mt-3 text-2xl text-(--accent) font-semibold">{siteConfig.role}</p>
            <p className="mt-5 text-lg text-(--muted) max-w-xl">{siteConfig.tagline}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg bg-(--accent) px-6 py-3 text-(--accent-text) font-semibold hover:bg-(--accent-hover) transition-colors"
              >
                View projects
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-(--bordercolor) px-6 py-3 text-(--text) font-semibold hover:border-(--accent) transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { label: "Projects", value: projects.length },
                { label: "Focus", value: "XR + Games" },
                { label: "Based in", value: "NL" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-(--bordercolor) bg-(--surface) px-4 py-3 text-left"
                >
                  <p className="text-sm text-(--muted)">{item.label}</p>
                  <p className="text-lg font-semibold text-(--text)">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-2xl border border-(--bordercolor) bg-(--surface) p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-(--text)">Theme Lab</h2>
                <span className="text-xs text-(--muted)">Try a new palette</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {themePresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handlePreset(preset)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors ${activeTheme === preset.id
                        ? "border-(--accent) text-(--accent)"
                        : "border-(--bordercolor) text-(--muted) hover:text-(--text)"
                      }`}
                  >
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: preset.vars.accent }}
                    />
                    {preset.name}
                  </button>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3">
                <label className="text-sm text-(--muted)" htmlFor="accent-picker">
                  Custom accent
                </label>
                <input
                  id="accent-picker"
                  type="color"
                  value={accent}
                  onChange={(event) => handleAccentChange(event.target.value)}
                  className="h-8 w-12 cursor-pointer rounded border border-(--bordercolor) bg-transparent"
                />
                <span className="text-sm text-(--muted)">{accent.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-(--text)">Selected projects</h2>
              <p className="text-(--muted)">A quick look at recent work and experiments.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
