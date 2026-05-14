import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { site } from '../data/site.js';

function Tier({ t, color, i }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateX(${py * -5}deg) rotateY(${px * 7}deg) translateZ(0)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = 'perspective(1100px) rotateX(0) rotateY(0)'; };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      onMouseMove={onMove} onMouseLeave={reset}
      ref={ref}
      className={`tilt-card capsule-card relative p-6 md:p-8 flex flex-col gap-5 min-h-[460px]
        ${t.popular ? 'border-2' : 'border border-white/10'}`}
      style={{
        background: t.popular
          ? `linear-gradient(180deg, color-mix(in oklab, ${color} 16%, var(--color-bg-2)), var(--color-bg-2))`
          : 'var(--color-bg-2)',
        borderColor: t.popular ? color : undefined,
      }}
    >
      {t.popular && (
        <div className="absolute -top-3 left-6">
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono px-3 py-1 rounded-full"
            style={{ background: color, color: '#0a0a0f' }}>
            ⚡ выбор большинства
          </span>
        </div>
      )}

      <div>
        <div className="text-sm uppercase tracking-[0.2em] font-mono mb-3" style={{ color }}>{t.name}</div>
        <div className="font-display text-[2rem] md:text-[2.4rem] lg:text-[2.8rem] tracking-[-0.04em] whitespace-nowrap leading-[1]">{t.price}</div>
        <div className="text-sm text-[var(--color-ink-dim)] mt-2">{t.sub}</div>
      </div>

      <div className="divider-line" />

      <ul className="flex flex-col gap-2.5 text-sm">
        {t.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
            <span className="text-[var(--color-ink-dim)]">{f}</span>
          </li>
        ))}
      </ul>

      <a href={site.contacts.telegramUrl} target="_blank" rel="noreferrer"
         className={`mt-auto inline-flex items-center justify-center gap-2 py-3 rounded-full transition
          ${t.popular ? 'btn-primary !w-full' : 'border border-white/20 hover:bg-white/8'}`}
      >
        {t.cta}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </a>
    </motion.div>
  );
}

export default function Pricing() {
  const tabs = site.pricingTabs;
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active);

  return (
    <section id="pricing" className="relative py-20 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid md:grid-cols-[auto_1fr] items-end gap-6 mb-10 md:mb-14">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)] mb-4">· цены</div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-[-0.03em] max-w-[14ch]">
              Выберите задачу — <span className="italic font-light text-[var(--color-accent)]">увидите цену</span>
            </h2>
          </div>
          <p className="text-[var(--color-ink-dim)] max-w-[42ch] md:justify-self-end text-sm md:text-base">
            3 направления, в каждом — три тарифа от базового до пакетного. Самозанятый, чек по «Мой налог».
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          className="relative flex gap-2 mb-6 md:mb-8 overflow-x-auto no-scrollbar -mx-5 px-5 md:mx-0 md:px-0"
        >
          {tabs.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(t.id)}
                className={`shrink-0 cursor-grow relative px-4 md:px-5 py-3 md:py-4 rounded-2xl border text-left transition flex flex-col gap-0.5 min-w-[180px] md:min-w-[220px]
                  ${isActive
                    ? 'border-transparent text-black'
                    : 'border-white/10 hover:border-white/30 text-[var(--color-ink)]'
                  }`}
                style={{
                  background: isActive ? t.color : 'transparent',
                  boxShadow: isActive ? `0 12px 40px -16px ${t.color}` : 'none',
                }}
              >
                <span className="font-display text-base md:text-lg tracking-tight leading-tight">{t.label}</span>
                <span className={`text-[11px] font-mono uppercase tracking-[0.2em] ${isActive ? 'text-black/70' : 'text-[var(--color-ink-dim)]'}`}>
                  {t.hint}
                </span>
              </button>
            );
          })}
        </div>

        {/* Description for active task */}
        <div className="mb-8 md:mb-10 max-w-[80ch]">
          <p className="text-[var(--color-ink-dim)] text-sm md:text-base leading-relaxed">
            {tab.taskDesc}
          </p>
        </div>

        {/* Tiers */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="grid gap-5 md:grid-cols-3"
          >
            {tab.tiers.map((t, i) => <Tier key={`${tab.id}-${t.name}`} t={t} color={tab.color} i={i} />)}
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-sm text-[var(--color-ink-dim)] mt-10">
          Не нашли свой формат? <a href={site.contacts.telegramUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 text-white">Обсудим под задачу →</a>
        </p>
      </div>
    </section>
  );
}
