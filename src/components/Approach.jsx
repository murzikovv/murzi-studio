import { motion } from 'framer-motion';
import { site } from '../data/site.js';

export default function Approach() {
  return (
    <section id="approach" className="relative py-20 md:py-36 bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid md:grid-cols-[auto_1fr] items-end gap-6 mb-10 md:mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)] mb-4">
              · подход
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-[-0.03em] max-w-[16ch]">
              Не «красиво», а <span className="italic font-light text-[var(--color-accent)]">продаёт</span>
            </h2>
          </div>
          <p className="text-[var(--color-ink-dim)] max-w-[44ch] md:justify-self-end text-sm md:text-base">
            Карточка — это не картинка, а воронка. Вот как я думаю над каждой, прежде чем что-то рисовать.
          </p>
        </div>

        <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.approach.map((a, i) => (
            <motion.div
              key={a.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative p-6 md:p-7 rounded-2xl border border-white/8 bg-[var(--color-bg-2)] flex flex-col gap-3 overflow-hidden"
            >
              <div className="font-mono text-sm text-[var(--color-accent)]">{a.n}</div>
              <div className="font-display text-xl md:text-2xl tracking-tight leading-tight">{a.title}</div>
              <p className="text-sm text-[var(--color-ink-dim)] leading-relaxed">{a.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
