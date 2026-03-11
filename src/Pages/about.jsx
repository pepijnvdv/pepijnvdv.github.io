import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../SiteConfig";

export default function About() {
  const paragraphs = useMemo(
    () =>
      siteConfig.aboutLong
        .split("\n\n")
        .map((item) => item.trim())
        .filter(Boolean),
    []
  );

  const sections = useMemo(
    () => [
      { id: "intro", title: "Intro", subtitle: "Wie ik ben en waar ik energie van krijg." },
      { id: "story", title: "Mijn verhaal", subtitle: "Een korte versie van mijn reis." },
      { id: "profile", title: "Profiel", subtitle: "Werkstijl, focus en contact." },
      { id: "skills", title: "Skills", subtitle: "Soft skills en tooling die ik inzet." },
    ],
    []
  );

  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".about-exhibit[data-reveal]").forEach((section) => {
      revealObserver.observe(section);
    });

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) navObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
      navObserver.disconnect();
    };
  }, [sections]);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <section className="about-hero-art">
        <div className="about-hero-overlay">
          <p className="about-hero-label">About</p>
          <h1 className="about-hero-title">{siteConfig.name}</h1>
          <p className="about-hero-subtitle">{siteConfig.tagline}</p>
        </div>
        <div className="about-hero-cards" aria-hidden="true">
          <div className="hero-card hero-card-primary">
            <div className="hero-card-art" />
            <div className="hero-card-meta">
              <p className="hero-card-track">XR Interaction</p>
              <p className="hero-card-artist">Spatial UI • Real-time feedback</p>
            </div>
            <div className="hero-card-progress">
              <span className="hero-card-progress-bar" />
            </div>
            <div className="hero-card-controls">
              <span className="hero-icon" />
              <span className="hero-icon hero-icon-play" />
              <span className="hero-icon" />
            </div>
          </div>
          <div className="hero-card hero-card-secondary">
            <div className="hero-card-art hero-card-art-alt" />
            <div className="hero-card-meta">
              <p className="hero-card-track">Prototype Lab</p>
              <p className="hero-card-artist">Rapid iterations</p>
            </div>
            <div className="hero-card-progress">
              <span className="hero-card-progress-bar hero-card-progress-bar-alt" />
            </div>
          </div>
        </div>
        <div className="about-hero-fade" aria-hidden="true" />
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="about-gallery">
          <section id="intro" className="about-exhibit" data-reveal>
            <div className="about-label">
              <div>
                <h2>{sections[0].title}</h2>
                <p>{sections[0].subtitle}</p>
              </div>
              <span className="tag">Studio</span>
            </div>
            <div className="about-plaque">
              <h1 className="animate-in">{siteConfig.role}</h1>
              <h3>XR • Games • Immersive Interaction</h3>
              <p>{paragraphs[0]}</p>
              <div className="about-cta">
                <Link to="/contact" className="about-cta-primary">
                  Werk samen
                </Link>
                <a
                  href={siteConfig.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-cta-secondary"
                >
                  Download CV
                </a>
              </div>
            </div>
          </section>

          <section id="story" className="about-exhibit" data-reveal>
            <div className="about-label">
              <div>
                <h2>{sections[1].title}</h2>
                <p>{sections[1].subtitle}</p>
              </div>
              <span className="tag">Journey</span>
            </div>
            <div className="about-grid">
              {paragraphs.slice(1).map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </section>

          <section id="profile" className="about-exhibit" data-reveal>
            <div className="about-label">
              <div>
                <h2>{sections[2].title}</h2>
                <p>{sections[2].subtitle}</p>
              </div>
              <span className="tag">Profile</span>
            </div>
            <div className="about-plaque">
              <div className="about-profile">
                <div className="about-photo">
                  <img src={siteConfig.aboutImage} alt={siteConfig.name} />
                </div>
                <div>
                  <p className="about-name">{siteConfig.name}</p>
                  <p className="about-role">{siteConfig.role}</p>
                  <a
                    className="about-download"
                    href={siteConfig.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download CV
                  </a>
                </div>
              </div>
              <div className="about-contact">
                <span>{siteConfig.socials.email}</span>
                <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href={siteConfig.socials.itch} target="_blank" rel="noopener noreferrer">
                  Itch.io
                </a>
              </div>
            </div>
          </section>

          <section id="skills" className="about-exhibit" data-reveal>
            <div className="about-label">
              <div>
                <h2>{sections[3].title}</h2>
                <p>{sections[3].subtitle}</p>
              </div>
              <span className="tag">Skillset</span>
            </div>
            <div className="about-skills">
              <div>
                <h3>Soft skills</h3>
                <ul>
                  {siteConfig.softSkills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Hard skills</h3>
                <ul>
                  {siteConfig.hardSkills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="about-minimap" aria-label="Section navigation">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => handleScroll(section.id)}
            aria-current={activeId === section.id}
            aria-label={section.title}
          />
        ))}
      </div>
    </div>
  );
}
