import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { works, categories } from '../data/works.js';
import WorkModal from './WorkModal.jsx';

function WorkTile({ w, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(w)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className="cursor-grow group relative overflow-hidden rounded-2xl bg-[var(--color-bg-2)] border border-white/8 text-left flex flex-col"
    >
      <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-[var(--color-bg)] to-[var(--color-bg-2)] flex items-center justify-center p-3 overflow-hidden">
        {w.type === 'video' ? (
          <video
            src={w.src} muted autoPlay loop playsInline
            className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <img
            src={w.src} alt={w.title} loading="lazy"
            className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      <div className="p-3.5 md:p-4 flex items-center justify-between gap-2 border-t border-white/5">
        <div className="min-w-0">
          <div className="text-[9px] uppercase tracking-[0.25em] font-mono text-[var(--color-accent)] mb-1 truncate">
            {w.category}
          </div>
          <div className="text-[13px] md:text-sm font-medium leading-snug truncate">{w.title}</div>
        </div>
        <div className="h-8 w-8 shrink-0 rounded-full border border-white/20 grid place-items-center group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] group-hover:text-black transition">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M7 7h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </motion.button>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState('Все');
  const [open, setOpen] = useState(null);

  const filtered = useMemo(() =>
    active === 'Все' ? works : works.filter((w) => w.category === active),
    [active]
  );

  return (
    <section id="work" className="relative py-20 md:py-36 bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid md:grid-cols-[auto_1fr] items-end gap-6 mb-10 md:mb-14">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)] mb-4">
              · работы
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-[-0.03em]">
              <span className="text-[var(--color-accent)]">{works.length}</span> работ <span className="italic font-light">·</span> часть из 500+
            </h2>
          </div>
          <p className="text-[var(--color-ink-dim)] max-w-[42ch] md:justify-self-end text-sm md:text-base">
            Каждая плитка кликабельна — открывается полный кадр или ролик. Фильтр по категории — рядом.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap mb-8 md:mb-10 overflow-x-auto no-scrollbar -mx-5 px-5 md:mx-0 md:px-0">
          {categories.map((c) => {
            const count = c === 'Все' ? works.length : works.filter((w) => w.category === c).length;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`shrink-0 px-3.5 md:px-4 py-2 rounded-full border text-sm transition cursor-grow inline-flex items-center gap-2
                  ${active === c
                    ? 'bg-[var(--color-accent)] text-black border-[var(--color-accent)]'
                    : 'border-white/15 text-[var(--color-ink-dim)] hover:text-white hover:border-white/40'
                  }`}
              >
                <span>{c}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${active === c ? 'bg-black/15' : 'bg-white/8'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-3 md:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((w) => <WorkTile key={w.id} w={w} onOpen={setOpen} />)}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--color-ink-dim)]">
            В этой категории пока нет работ. Скоро добавлю.
          </div>
        )}
      </div>

      <WorkModal work={open} onClose={() => setOpen(null)} />
    </section>
  );
}
