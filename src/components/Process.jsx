import { motion } from 'framer-motion';
import { site } from '../data/site.js';

export default function Process() {
  return (
    <section id="process" className="relative py-20 md:py-36 bg-[var(--color-bg-2)] border-y border-white/5">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid md:grid-cols-[auto_1fr] items-end gap-6 mb-10 md:mb-20">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)] mb-4">
              · процесс
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-[-0.03em] max-w-[16ch]">
              4 шага. <span className="italic font-light text-[var(--color-accent)]">Без</span> «созвонов на час»
            </h2>
          </div>
          <p className="text-[var(--color-ink-dim)] max-w-[42ch] md:justify-self-end text-sm md:text-base">
            Я не люблю звонки. Всё в Telegram, голосовыми если нужно. Так быстрее и для вас и для меня.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {site.process.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative p-6 rounded-2xl border border-white/8 bg-[var(--color-bg)] flex flex-col gap-3 min-h-[220px] overflow-hidden"
            >
              <div className="font-display text-[5rem] leading-none text-stroke select-none absolute -top-3 right-2 opacity-60">
                {p.step}
              </div>
              <div className="font-display text-2xl tracking-tight">{p.title}</div>
              <p className="text-sm text-[var(--color-ink-dim)] leading-relaxed mt-auto">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
