import { Fragment } from 'react';

// Tiny inline markup used in data/site.ts: `code` and [text](url).
const TOKEN = /(`[^`]+`)|(\[[^\]]+\]\([^)\s]+\))/g;

export default function RichText({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    const tok = m[0];
    if (tok.startsWith('`')) {
      out.push(<code key={i}>{tok.slice(1, -1)}</code>);
    } else {
      const close = tok.indexOf('](');
      out.push(
        <a key={i} href={tok.slice(close + 2, -1)} target="_blank" rel="noopener noreferrer">
          {tok.slice(1, close)}
        </a>,
      );
    }
    last = i + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return (
    <>
      {out.map((n, k) => (
        <Fragment key={k}>{n}</Fragment>
      ))}
    </>
  );
}
