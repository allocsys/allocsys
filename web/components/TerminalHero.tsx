'use client';
import { useEffect, useState } from 'react';
import { languages } from '@/data/site';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const CMDS = ['whoami', 'cat role.txt', 'cat languages.txt', 'ls --contact'];
const ALL = CMDS.length + 1; // command lines + the final empty prompt

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function Cmd({ i, text, typing, chars, shown }: { i: number; text: string; typing: number; chars: number; shown: number }) {
  const t = typing === i ? text.slice(0, chars) : text;
  return (
    <p className="line tline" data-show={i < shown}>
      <span className="prompt" aria-hidden="true">$</span>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{t}</span>
      {typing === i && <span className="cursor solid" aria-hidden="true">▌</span>}
    </p>
  );
}

export default function TerminalHero() {
  // Defaults show everything, so the server HTML is complete (no-JS, reduced motion, crawlers).
  const [shown, setShown] = useState(ALL);
  const [outs, setOuts] = useState(CMDS.length);
  const [typing, setTyping] = useState(-1);
  const [chars, setChars] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.anim !== 'on') return;
    let dead = false;
    (async () => {
      setShown(0);
      setOuts(0);
      setStarted(true);
      await sleep(450);
      for (let i = 0; i < CMDS.length; i++) {
        if (dead) return;
        setShown(i + 1);
        setTyping(i);
        setChars(0);
        await sleep(160);
        for (let c = 1; c <= CMDS[i].length; c++) {
          if (dead) return;
          setChars(c);
          await sleep(32 + Math.random() * 38);
        }
        await sleep(240);
        if (dead) return;
        setTyping(-1);
        setOuts(i + 1);
        await sleep(i === 0 ? 520 : 420);
      }
      if (!dead) setShown(ALL);
    })();
    return () => {
      dead = true;
    };
  }, []);

  const p = { typing, chars, shown };
  return (
    <header className="hero">
      <div className="terminal" data-started={started}>
        <div className="term-bar">
          <span className="dot-r" />
          <span className="dot-y" />
          <span className="dot-g" />
          <span className="term-title">allocsys@allocsys: ~</span>
        </div>
        <div className="term-body">
          <Cmd i={0} text={CMDS[0]} {...p} />
          <h1 className="out name tline" data-show={outs > 0}>
            allocsys
          </h1>

          <Cmd i={1} text={CMDS[1]} {...p} />
          <p className="out role tline" data-show={outs > 1}>
            Backend Developer — APIs, infra &amp; AI-agent tooling
          </p>

          <Cmd i={2} text={CMDS[2]} {...p} />
          <p className="out langs tline" data-show={outs > 2}>
            {languages.map((l, k) => (
              <span key={l} style={{ transitionDelay: `${k * 55}ms` }}>
                {l}
              </span>
            ))}
          </p>

          <Cmd i={3} text={CMDS[3]} {...p} />
          <p className="out flags tline" data-show={outs > 3}>
            <a href="mailto:allocsys@gmail.com">--email</a>
            <a href="https://github.com/allocsys" target="_blank" rel="noopener noreferrer">
              --github
            </a>
            <a href={`${BASE}/resume.pdf`} target="_blank" rel="noopener noreferrer">
              --resume
            </a>
            <span className="avail">
              <span className="dot" />
              open to work
            </span>
          </p>

          <p className="line tline" data-show={shown > CMDS.length} aria-hidden="true">
            <span className="prompt">$</span>
            <span className="cursor">▌</span>
          </p>
        </div>
      </div>
    </header>
  );
}
