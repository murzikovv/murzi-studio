import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { site } from '../data/site.js';

const FUNNEL_W = [100, 82, 64, 48, 34];

export default function Approach() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 55%'],
  });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const n = site.approach.length;
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0.02, 1]);

  const onGlow = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section id="approach" ref={ref} className="relative py-20 md:py-40 bg-[var(--color-bg)] overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[460px] w-[460px] rounded-full bg-[var(--color-accent)]/10 blur-[130px]" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20">

          {/* LEFT — sticky intro + funnel */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)] mb-4">
              · подход
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-[-0.03em] mb-5">
              Не «красиво»,<br />а <span className="italic font-light text-[var(--color-accent)]">продаёт</span>
            </h2>
            <p className="text-[var(--color-ink-dim)] max-w-[40ch] text-sm md:text-base mb-10">
              Карточка — это не картинка, а воронка. Пять шагов, по которым я веду покупателя к «беру».
            </p>

            {/* funnel visualization */}
            <div className="flex flex-col items-center gap-2 w-full max-w-[340px]">
              {FUNNEL_W.map((w, i) => {
                const on = active === i;
                return (
                  <motion.div
                    key={i}
                    style={{ width: `${w}%` }}
                    animate={{ opacity: on ? 1 : 0.3 }}
                    transition={{ duration: 0.4 }}
                    className="h-10"
                  >
                    <div
                      className={`h-full rounded-lg flex items-center justify-center text-[11px] font-mono border transition-all duration-300
                        ${on
                          ? 'bg-[var(--color-accent)] text-black border-[var(--color-accent)] shadow-[0_0_34px_-6px_var(--color-accent)]'
                          : 'border-white/10 text-[var(--color-ink-dim)]'}`}
                    >
                      {site.approach[i].n}
                    </div>
                  </motion.div>
                );
              })}
              <div className="text-[11px] font-mono text-[var(--color-ink-dim)] mt-3 tracking-wide">
                взгляд → выгода → покупка
              </div>
            </div>
          </div>

          {/* RIGHT — scroll timeline */}
          <div className="relative pl-2">
            {/* rail track */}
            <div className="absolute left-[18px] md:left-[22px] top-3 bottom-3 w-px bg-white/10" />
            <motion.div
              style={{ scaleY: railScale }}
              className="absolute left-[18px] md:left-[22px] top-3 bottom-3 w-px origin-top bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent)] to-[var(--color-accent)]/30"
            />

            <div className="flex flex-col gap-5 md:gap-7">
              {site.approach.map((a, i) => {
                const on = active === i;
                return (
                  <motion.div
                    key={a.n}
                    onMouseMove={onGlow}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
                    animate={{ scale: on ? 1 : 0.985 }}
                    className="capsule-card group relative pl-12 md:pl-16 pr-5 md:pr-7 py-5 md:py-6"
                    style={{
                      '--glow': 'var(--color-accent)',
                      borderRadius: '20px',
                      background: on ? 'var(--color-bg-2)' : 'rgba(255,255,255,0.015)',
                      border: `1px solid ${on ? 'rgba(214,255,58,0.28)' : 'rgba(255,255,255,0.06)'}`,
                    }}
                  >
                    {/* node on rail */}
                    <span
                      className={`absolute left-[9px] md:left-[13px] top-6 h-4 w-4 rounded-full border-2 transition-all duration-300
                        ${active >= i
                          ? 'bg-[var(--color-accent)] border-[var(--color-accent)] shadow-[0_0_16px_-2px_var(--color-accent)]'
                          : 'bg-[var(--color-bg)] border-white/25'}`}
                    />
                    <div className="flex items-baseline gap-3 md:gap-4">
                      <span className="font-display text-3xl md:text-5xl text-stroke select-none leading-none shrink-0">
                        {a.n}
                      </span>
                      <h3 className="font-display text-lg md:text-2xl tracking-tight leading-tight">
                        {a.title}
                      </h3>
                    </div>
                    <p className="text-sm md:text-[15px] text-[var(--color-ink-dim)] leading-relaxed mt-3 md:pl-[4.4rem]">
                      {a.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
