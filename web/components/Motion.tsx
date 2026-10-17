'use client';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';

// Burst shape, rounded so server and client markup match exactly.
const STAR = Array.from({ length: 24 }, (_, i) => {
  const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
  const r = i % 2 ? 34 : 50;
  return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
}).join(' ');

/** Accent burst that turns as the page scrolls. */
export function Spinner() {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 2400], [0, 540]);
  return (
    <motion.svg className="spinner" viewBox="0 0 100 100" aria-hidden="true" style={{ rotate }}>
      <polygon points={STAR} fill="currentColor" />
    </motion.svg>
  );
}

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const o = useTransform(p, [i / n, (i + 1) / n], [0.2, 1]);
  return (
    <>
      <motion.span style={{ opacity: o }}>{w}</motion.span>{' '}
    </>
  );
}

/** Paragraph whose words light up one by one while scrolling. */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />)}
    </p>
  );
}

/** Counts up from 0 when scrolled into view. Markup already holds the final value. */
export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1200);
        el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      el.textContent = '0';
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return <span ref={ref}>{to}</span>;
}
