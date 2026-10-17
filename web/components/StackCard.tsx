'use client';
import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import Collapse from './Collapse';

/** Project card that sticks near the top and gets covered by the next one as you scroll. */
export default function StackCard({
  index,
  slot,
  title,
  meta,
  lead,
  more,
  link,
  defaultOpen = false,
}: {
  index: string;
  slot: number;
  title: string;
  meta: string;
  lead: ReactNode;
  more?: ReactNode;
  link?: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <article className="card" data-open={open} style={{ '--i': slot } as CSSProperties}>
      <p className="card-top mono">{index}</p>
      <h3 className="card-title">{title}</h3>
      <p className="card-meta">{meta}</p>
      <div className="card-lead">{lead}</div>
      {more && (
        <>
          <Collapse open={open} id={id}>
            <div className="card-more">{more}</div>
          </Collapse>
          <button type="button" className="card-toggle mono" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
            {open ? 'Less −' : 'Details +'}
          </button>
        </>
      )}
      {link}
    </article>
  );
}
