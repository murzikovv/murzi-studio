import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '../data/site.js';

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-20 md:py-36">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)] mb-4">· FAQ</div>
        <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.03em] mb-12 max-w-[18ch]">
          Что обычно спрашивают
        </h2>

        <div className="flex flex-col">
          {site.faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-t border-white/10 last:border-b">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left cursor-grow"
                >
                  <span className="font-display text-xl md:text-2xl tracking-tight">{f.q}</span>
                  <span className={`h-9 w-9 shrink-0 rounded-full border border-white/20 grid place-items-center transition-transform ${isOpen ? 'rotate-45 bg-[var(--color-accent)] text-black border-[var(--color-accent)]' : ''}`}>
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-16 text-[var(--color-ink-dim)] max-w-[60ch]">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
