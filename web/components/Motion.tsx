'use client';
import { useEffect, useRef, type ReactNode } from 'react';
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
  const y = useTransform(scrollY, [0, 900], [0, 220]);
  return (
    <motion.svg className="spinner" viewBox="0 0 100 100" aria-hidden="true" style={{ rotate, y }}>
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

/** Parallax: drifts vertically at its own pace while its box crosses the screen. */
export function Drift({ children, from = 40, to = -40, className }: { children: ReactNode; from?: number; to?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

/** Giant words that slide sideways, in opposite directions, as the page scrolls past. */
export function ScrollWords({ top, bottom }: { top: string; bottom: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const a = useTransform(scrollYProgress, [0, 1], ['0%', '-45%']);
  const b = useTransform(scrollYProgress, [0, 1], ['-45%', '0%']);
  const rep = (t: string) => `${t} ✺ `.repeat(3);
  return (
    <div ref={ref} className="words" aria-hidden="true">
      <motion.div className="words-row" style={{ x: a }}>{rep(top)}</motion.div>
      <motion.div className="words-row alt" style={{ x: b }}>{rep(bottom)}</motion.div>
    </div>
  );
}
