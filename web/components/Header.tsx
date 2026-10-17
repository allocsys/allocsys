'use client';
import { useEffect, useState } from 'react';

const LINKS = [
  ['about', 'About'],
  ['projects', 'Work'],
  ['skills', 'Skills'],
  ['open-source', 'Open source'],
  ['activity', 'Activity'],
  ['contact', 'Contact'],
] as const;

export default function Header() {
  const [active, setActive] = useState('');
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    LINKS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? 'hidden' : '';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    addEventListener('keydown', esc);
    return () => removeEventListener('keydown', esc);
  }, [menu]);

  const toggleTheme = () => {
    const d = document.documentElement;
    const next = d.dataset.theme === 'dark' ? 'light' : 'dark';
    d.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
  };

  return (
    <>
      <header className="hdr">
        <a className="brand" href="#top" onClick={() => setMenu(false)}>
          allocsys<i />
        </a>
        <nav className="nav" aria-label="Sections">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={active === id}>
              {label}
            </a>
          ))}
        </nav>
        <div className="hdr-actions">
          <button type="button" className="icon-btn" onClick={toggleTheme} aria-label="Toggle color theme">
            <svg className="i-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
            <svg className="i-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
            </svg>
          </button>
          <button type="button" className="icon-btn menu-btn" aria-expanded={menu} aria-controls="menu" aria-label="Menu" onClick={() => setMenu((v) => !v)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {menu ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </header>
      {menu && (
        <nav id="menu" className="menu" aria-label="Menu">
          {LINKS.map(([id, label], i) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              <span className="mono">0{i + 1}</span>
              {label}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
