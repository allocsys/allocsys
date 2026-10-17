'use client';
import { useEffect, useRef, useState } from 'react';

/** Left side stays pinned and swaps its title while the skill groups scroll past. */
export default function PinnedSkills({ items }: { items: [string, string][] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number(e.target.getAttribute('data-i')));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  const two = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="pin">
      <div className="pin-side" aria-hidden="true">
        <span className="pin-count mono">
          {two(active + 1)} / {two(items.length)}
        </span>
        <span key={active} className="pin-title">{items[active][0]}</span>
        <span className="pin-dots">
          {items.map(([k], i) => (
            <i key={k} data-on={i === active} />
          ))}
        </span>
      </div>
      <ol className="pin-steps">
        {items.map(([k, v], i) => (
          <li key={k} className="step" data-i={i} data-on={i === active} ref={(el) => { refs.current[i] = el; }}>
            <h3 className="mono step-k">{k}</h3>
            <ul className="chips">
              {v.split(', ').map((s, c) => (
                <li key={s} style={{ ['--c' as string]: c }}>
                  {s}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
