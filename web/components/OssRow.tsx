'use client';
import { useId, useState } from 'react';
import type { Contribution } from '@/data/site';
import Collapse from './Collapse';
import RichText from './RichText';

export default function OssRow({ item: c }: { item: Contribution }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="oss" data-open={open}>
      <h3>
        <button
          type="button"
          className="oss-btn"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="oss-name">{c.name}</span>
          <span className="oss-what">{c.what}</span>
          <span className={`oss-status ${c.merged ? 'merged' : 'open'}`}>{c.status}</span>
        </button>
      </h3>
      <Collapse open={open} id={id}>
        <ul>
          {c.bullets.map((b) => (
            <li key={b}>
              <RichText text={b} />
            </li>
          ))}
        </ul>
        {c.pr && (
          <p className="repo">
            <a href={c.pr} target="_blank" rel="noopener noreferrer">
              View pull request
            </a>
          </p>
        )}
      </Collapse>
    </div>
  );
}
