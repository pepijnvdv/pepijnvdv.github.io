import { siteConfig } from "../SiteConfig";
import { GitHub, LinkedIn, Itch, Envelope } from "../Components/icons/icons.jsx";

const socialLinks = [
  { name: "GitHub", url: siteConfig.socials.github, icon: GitHub },
  { name: "LinkedIn", url: siteConfig.socials.linkedin, icon: LinkedIn },
  { name: "Itch.io", url: siteConfig.socials.itch, icon: Itch },
];

export default function Contact() {
  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="about-label">
          <div>
            <h2>Contact</h2>
            <p>Laat van je horen. Ik reageer meestal binnen 48 uur.</p>
          </div>
          <span className="tag">Let’s talk</span>
        </div>

        <div className="about-gallery">
          <section className="about-exhibit revealed">
            <div className="about-plaque">
              <h1>Direct contact</h1>
              <h3>Voor nieuwe projecten, samenwerking of vragen.</h3>
              <div className="about-cta">
                <a
                  href={`mailto:${siteConfig.socials.email}`}
                  className="about-cta-primary"
                >
                  <Envelope className="w-5 h-5" />
                  {siteConfig.socials.email}
                </a>
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

          <section className="about-exhibit revealed">
            <div className="about-label">
              <div>
                <h2>Online</h2>
                <p>Volg mijn werk en prototypes.</p>
              </div>
            </div>
            <div className="about-grid">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-plaque"
                  >
                    <div className="about-cta">
                      <span className="about-cta-secondary">
                        <Icon className="w-5 h-5" />
                        {social.name}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
