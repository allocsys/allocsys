'use client';
import { useEffect, useState } from 'react';

const ITEMS = [
  ['about', 'About'],
  ['projects', 'Projects'],
  ['open-source', 'Open source'],
  ['skills', 'Skills'],
  ['activity', 'Activity'],
] as const;

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function SideNav() {
  const [active, setActive] = useState<string>(ITEMS[0][0]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let current: string = ITEMS[0][0];
      for (const [id] of ITEMS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = ITEMS[ITEMS.length - 1][0];
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <aside className="side">
      <a className="btn" href={`${BASE}/resume.pdf`} target="_blank" rel="noopener noreferrer">
        Download resume (PDF)
      </a>
      <nav aria-label="Sections">
        {ITEMS.map(([id, label]) => (
          <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined}>
            <span className="chev" aria-hidden="true">
              ›
            </span>
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
