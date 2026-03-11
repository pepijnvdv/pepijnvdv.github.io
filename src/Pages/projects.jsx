import { Link } from "react-router-dom";
import projectData from "../data/projectdata.json";
import { siteConfig } from "../SiteConfig";

const projects = projectData.projects;

export default function Projects() {
  return (
    <div className="py-12 px-4">
      <div className="container mx-auto">
        <div className="grid gap-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-(--muted)">Projects</p>
            <h1 className="mt-4 text-4xl font-semibold text-(--text)">
              Selected XR work by {siteConfig.name}
            </h1>
            <p className="mt-4 text-lg text-(--muted) max-w-2xl">
              A curated list of experiments, prototypes, and production-ready builds. Each project
              includes a short breakdown of goals, tools, and outcomes.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-8">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group grid gap-6 rounded-2xl border border-(--bordercolor) bg-(--surface) p-6 shadow-sm transition-all hover:border-(--accent) lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
            >
              <div
                className={`relative overflow-hidden rounded-xl ${index % 2 ? "lg:order-2" : ""}`}
              >
                <div className="absolute inset-0 bg-(--accent) opacity-0 transition-opacity group-hover:opacity-10" />
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className={`${index % 2 ? "lg:order-1" : ""}`}>
                <p className="text-xs uppercase tracking-[0.25em] text-(--muted)">Case study</p>
                <h2 className="mt-3 text-2xl font-semibold text-(--text) group-hover:text-(--accent) transition-colors">
                  {project.title}
                </h2>
                <p className="mt-3 text-(--muted)">{project.tagline}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 grid gap-3 text-sm text-(--muted) sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em]">Role</p>
                    <p className="mt-1 font-semibold text-(--text)">{project.projectRole}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em]">Timeline</p>
                    <p className="mt-1 font-semibold text-(--text)">{project.timeline}</p>
                  </div>
                </div>
                <div className="mt-6 inline-flex items-center text-sm font-semibold text-(--accent)">
                  View project
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

