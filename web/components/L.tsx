import type { ReactNode } from 'react';

/** Renders both languages; CSS shows the one matching <html lang>. Server-safe. */
export default function L({ en, fa }: { en: ReactNode; fa: ReactNode }) {
  return (
    <>
      <span className="l-en">{en}</span>
      <span className="l-fa" lang="fa" dir="rtl">{fa}</span>
    </>
  );
}
