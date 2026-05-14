import { motion } from 'framer-motion';
import { site } from '../data/site.js';

function ServiceCard({ s, i }) {
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      onMouseMove={handleMove}
      className="capsule-card cursor-grow border border-white/8 bg-[var(--color-bg-2)] p-6 md:p-7 flex flex-col gap-5 min-h-[360px]"
      style={{ borderColor: `color-mix(in oklab, ${s.color} 20%, rgba(255,255,255,0.06))` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-mono px-2.5 py-1 rounded-full"
          style={{ background: `${s.color}1a`, color: s.color, border: `1px solid ${s.color}40` }}
        >
          <span className="h-1 w-1 rounded-full" style={{ background: s.color }} />
          {s.tag}
        </span>
        <span className="text-xs font-mono text-[var(--color-ink-dim)]">0{i + 1}</span>
      </div>

      <h3 className="font-display text-[1.35rem] md:text-[1.4rem] lg:text-[1.5rem] leading-[1.1] tracking-[-0.02em] break-words hyphens-auto">
        {s.title}
      </h3>

      <p className="text-[15px] text-[var(--color-ink-dim)] leading-relaxed">{s.blurb}</p>

      <ul className="mt-auto flex flex-col gap-1.5 text-sm">
        {s.bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-[var(--color-ink-dim)]">
            <span className="h-1 w-1 rounded-full" style={{ background: s.color }} />
            {b}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between pt-4 border-t border-white/8">
        <span className="font-mono text-sm" style={{ color: s.color }}>{s.price}</span>
        <a href={site.contacts.telegramUrl} target="_blank" rel="noreferrer"
          className="text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
          обсудить →
        </a>
      </div>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-20 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-16 items-end mb-14 md:mb-20">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)] mb-4">
              · услуги
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-[-0.03em] max-w-[16ch]">
              Не «сделаю красиво», а <span className="italic font-light text-[var(--color-accent)]">продам</span> ваш товар
            </h2>
          </div>
          <p className="text-[var(--color-ink-dim)] max-w-[44ch] text-base md:text-lg justify-self-end">
            8 направлений, каждое — закрытая задача. Берусь не за всё подряд: только то, в чём за 500+ заказов наработана рука.
          </p>
        </div>

        <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {site.services.map((s, i) => <ServiceCard key={s.id} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
