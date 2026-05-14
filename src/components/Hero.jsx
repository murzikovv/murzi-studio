import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroScene from './HeroScene.jsx';
import { site } from '../data/site.js';
import { useCounter } from '../lib/useCounter.js';

const word = {
  hidden: { y: '110%' },
  show: (i) => ({ y: 0, transition: { duration: 0.85, delay: 0.08 * i, ease: [0.2, 0.8, 0.2, 1] } }),
};

function StatItem({ stat }) {
  const [val, ref] = useCounter(stat.value, { duration: 1600 });
  return (
    <div ref={ref} className="flex flex-col gap-1 min-w-[150px]">
      <div className="font-display text-3xl md:text-4xl">
        {val}
        <span className="text-[var(--color-accent)]">{stat.suffix}</span>
      </div>
      <div className="text-sm text-[var(--color-ink-dim)]">{stat.label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-90">
        <HeroScene />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--color-bg)_70%)] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-[0.2em] uppercase font-mono text-[var(--color-ink-dim)] border border-white/10 rounded-full px-3 py-1.5 mb-6 md:mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          {site.hero.eyebrow}
        </motion.div>

        <h1 className="font-display text-[16vw] md:text-[10vw] lg:text-[8.5vw] leading-[0.92] font-semibold tracking-[-0.04em]">
          {site.hero.lines.map((line, i) => (
            <div key={line.text} className="overflow-hidden block">
              <motion.div
                initial="hidden" animate="show" variants={word} custom={i}
                className={[
                  line.italic ? 'italic font-light text-stroke' : '',
                  line.muted ? 'text-[var(--color-ink-dim)]' : '',
                ].join(' ')}
              >
                {line.text}
              </motion.div>
            </div>
          ))}
        </h1>

        <div className="grid md:grid-cols-[1fr_minmax(280px,420px)] gap-8 md:gap-10 mt-10 md:mt-16 items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-base md:text-lg text-[var(--color-ink-dim)] max-w-[60ch] leading-relaxed"
          >
            {site.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#work" className="btn-primary">
              посмотреть работы
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M7 7h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <Link to="/brief" className="btn-ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 4h9a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8l5-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 4v4H4M9 13h7M9 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              заполнить бриф
            </Link>
          </motion.div>
        </div>

        <div className="mt-14 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-7 md:gap-y-8 border-t border-white/10 pt-8 md:pt-10">
          {site.hero.stats.map((s) => <StatItem key={s.label} stat={s} />)}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[var(--color-ink-dim)]">
        <span className="h-px w-10 bg-[var(--color-ink-dim)]" />
        scroll
      </div>
    </section>
  );
}
