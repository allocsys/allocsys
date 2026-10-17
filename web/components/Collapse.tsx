'use client';
import { motion } from 'motion/react';

// Content stays in the HTML (crawlable); when closed it is height 0 and inert (not focusable).
export default function Collapse({
  open,
  id,
  children,
}: {
  open: boolean;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      id={id}
      initial={false}
      animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
      style={{ overflow: 'hidden' }}
      inert={!open}
    >
      {children}
    </motion.div>
  );
}
