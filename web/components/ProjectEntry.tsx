'use client';
import { useId, useState } from 'react';
import type { Project } from '@/data/site';
import Collapse from './Collapse';
import RichText from './RichText';

export default function ProjectEntry({ project: p }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  if (p.expanded) {
    return (
      <article className="entry">
        <h3>{p.name}</h3>
        <p className="stack">{p.stack}</p>
        <ul>
          {p.bullets.map((b) => (
            <li key={b}>
              <RichText text={b} />
            </li>
          ))}
        </ul>
      </article>
    );
  }

  const [lead, ...rest] = p.bullets;
  const hasMore = rest.length > 0 || !!p.repo;
  return (
    <article className="entry">
      <h3>{p.name}</h3>
      <p className="stack">{p.stack}</p>
      <p className="lead">
        <RichText text={lead} />
      </p>
      {hasMore && (
        <>
          <button
            type="button"
            className="toggle"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sign" aria-hidden="true">
              {open ? '−' : '+'}
            </span>
            {open ? 'Less detail' : 'More detail'}
          </button>
          <Collapse open={open} id={id}>
            <ul>
              {rest.map((b) => (
                <li key={b}>
                  <RichText text={b} />
                </li>
              ))}
            </ul>
            {p.repo && (
              <p className="repo">
                <a href={p.repo} target="_blank" rel="noopener noreferrer">
                  View repository
                </a>
              </p>
            )}
          </Collapse>
        </>
      )}
    </article>
  );
}
