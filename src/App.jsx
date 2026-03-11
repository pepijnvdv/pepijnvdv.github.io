import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

export default function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || coarsePointer) {
      return undefined;
    }

    const body = document.body;
    body.classList.add("custom-cursor");

    const cursor = document.createElement("div");
    cursor.className = "cursor-dot";
    body.appendChild(cursor);

    const trailCount = 6;
    const trails = Array.from({ length: trailCount }, () => {
      const el = document.createElement("div");
      el.className = "cursor-trail";
      body.appendChild(el);
      return { el, x: 0, y: 0 };
    });

    trails.forEach((trail, index) => {
      const falloff = 1 - index / trailCount;
      const size = 4 + falloff * 4;
      trail.el.style.width = `${size}px`;
      trail.el.style.height = `${size}px`;
      trail.el.style.opacity = `${0.4 * falloff}`;
    });

    let mouseX = 0;
    let mouseY = 0;
    let rafId = 0;

    const handleMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const animate = () => {
      let x = mouseX;
      let y = mouseY;
      trails.forEach((trail) => {
        trail.x += (x - trail.x) * 0.35;
        trail.y += (y - trail.y) * 0.35;
        trail.el.style.transform = `translate(${trail.x}px, ${trail.y}px)`;
        x = trail.x;
        y = trail.y;
      });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
      cursor.remove();
      trails.forEach((trail) => trail.el.remove());
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-(--bg) text-(--text)">
      <Header />

      <main className="flex-1 container mx-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
