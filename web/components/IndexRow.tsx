'use client';
import { useId, useState } from 'react';
import Collapse from './Collapse';

export default function IndexRow({
  index,
  title,
  meta,
  tag,
  merged,
  defaultOpen = false,
  children,
}: {
  index: string;
  title: string;
  meta: string;
  tag?: string;
  merged?: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <article className="row reveal" data-open={open}>
      <h3>
        <button type="button" className="row-btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
          <span className="row-num mono">{index}</span>
          <span className="row-title">{title}</span>
          <span className="row-meta">{meta}</span>
          {tag && <span className={`row-tag mono${merged ? ' is-merged' : ''}`}>{tag}</span>}
          <span className="row-icon" aria-hidden="true" />
        </button>
      </h3>
      <Collapse open={open} id={id}>
        <div className="row-body">{children}</div>
      </Collapse>
    </article>
  );
}
