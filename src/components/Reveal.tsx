"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Tag = "div" | "section" | "h2" | "p" | "li" | "span";

/**
 * Fait apparaître son contenu (fondu + légère montée) quand il entre dans
 * le viewport. Une seule fois : l'animation ne se rejoue pas au re-scroll.
 */
export function Reveal({
  as = "div",
  className = "",
  delay = 0,
  children,
}: {
  as?: Tag;
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={(el: HTMLElement | null) => {
        ref.current = el;
      }}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
