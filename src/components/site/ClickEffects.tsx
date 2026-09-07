import { useEffect } from "react";

/** Spawns a short red ripple wherever the user clicks. */
export function ClickEffects() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const span = document.createElement("span");
      span.className = "click-ripple";
      span.style.left = `${e.clientX}px`;
      span.style.top = `${e.clientY}px`;
      document.body.appendChild(span);
      window.setTimeout(() => span.remove(), 620);
    };
    window.addEventListener("pointerdown", onClick);
    return () => window.removeEventListener("pointerdown", onClick);
  }, []);

  return null;
}

/** Thin red bar at the top that tracks scroll progress. */
export function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.transform = `scaleX(${pct / 100})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
      <div
        id="scroll-progress"
        className="h-full origin-left scale-x-0 bg-primary transition-transform duration-150"
      />
    </div>
  );
}
