import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { works } from '../data/works.js';

const videos = works.filter((w) => w.categoryKey === 'video').slice(0, 3);
const STEPS = ['сценарий', 'раскадровка', 'ИИ-видео', 'ИИ-голос', 'музыка', 'монтаж'];

function SoundIcon({ on }) {
  return on ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="currentColor" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8 8 0 0 1 0 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="currentColor" />
      <path d="m17 9 4 6M21 9l-4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Showreel() {
  const [active, setActive] = useState(0);
  const [sound, setSound] = useState(false);
  const mainRef = useRef(null);

  if (!videos.length) return null;
  const cur = videos[active];

  const toggleSound = () => {
    const el = mainRef.current;
    if (!el) return;
    el.muted = sound;        // если звук был включён — глушим
    if (!sound) el.play();
    setSound(!sound);
  };
  const pick = (i) => { setActive(i); setSound(false); };

  return (
    <section id="showreel" className="relative py-20 md:py-36 bg-[var(--color-bg-2)] border-y border-white/5 overflow-hidden">
      <div className="pointer-events-none absolute right-[-12%] top-0 h-[520px] w-[520px] rounded-full bg-[var(--color-cyan)]/8 blur-[140px]" />
      <div className="pointer-events-none absolute left-[-10%] bottom-0 h-[420px] w-[420px] rounded-full bg-[var(--color-accent)]/8 blur-[130px]" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 relative">
        {/* header */}
        <div className="grid md:grid-cols-[auto_1fr] items-end gap-6 mb-8 md:mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)] mb-4">
              · showreel
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-[-0.03em]">
              Видео, которое <span className="italic font-light text-[var(--color-accent)]">двигается</span>
            </h2>
          </div>
          <p className="text-[var(--color-ink-dim)] max-w-[40ch] md:justify-self-end text-sm md:text-base">
            Рекламные ролики целиком на нейросетях. Выбирай ролик справа — звук включается по клику.
          </p>
        </div>

        {/* production steps */}
        <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
          {STEPS.map((s, i) => (
            <span key={s} className="text-[11px] font-mono px-3 py-1.5 rounded-full border border-white/10 text-[var(--color-ink-dim)]">
              <span className="text-[var(--color-accent)]">{String(i + 1).padStart(2, '0')}</span> {s}
            </span>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_330px] gap-5 md:gap-8 items-start">
          {/* MAIN player */}
          <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none lg:justify-self-center">
            <div className="relative rounded-[26px] p-[1.5px] bg-gradient-to-b from-[var(--color-accent)]/50 via-white/10 to-transparent">
              <div className="relative rounded-[25px] overflow-hidden bg-black aspect-[4/5]">
                <AnimatePresence mode="wait">
                  <motion.video
                    key={cur.id}
                    ref={mainRef}
                    src={cur.src}
                    muted autoPlay loop playsInline
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                {/* top label */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/80">
                    {String(active + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}
                  </span>
                </div>

                {/* bottom bar */}
                <div className="absolute bottom-0 inset-x-0 p-4 md:p-5 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-[0.2em] text-[var(--color-accent)] mb-1">
                      рекламный ролик
                    </div>
                    <div className="font-display text-lg md:text-xl tracking-tight drop-shadow">{cur.title}</div>
                  </div>
                  <button
                    type="button"
                    onClick={toggleSound}
                    className="cursor-grow shrink-0 h-12 w-12 rounded-full bg-black/55 backdrop-blur-md border border-white/25 grid place-items-center hover:bg-[var(--color-accent)] hover:text-black hover:border-[var(--color-accent)] transition"
                    aria-label={sound ? 'выключить звук' : 'включить звук'}
                  >
                    <SoundIcon on={sound} />
                  </button>
                </div>

                {/* muted hint */}
                {!sound && (
                  <button
                    type="button"
                    onClick={toggleSound}
                    className="cursor-grow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-xs font-mono text-white/90 hover:border-[var(--color-accent)] transition"
                  >
                    ▶ смотреть со звуком
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* PLAYLIST */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible no-scrollbar -mx-5 px-5 lg:mx-0 lg:px-0">
            {videos.map((v, i) => {
              const on = i === active;
              return (
                <motion.button
                  key={v.id}
                  type="button"
                  onClick={() => pick(i)}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className={`cursor-grow group relative shrink-0 w-[150px] lg:w-full rounded-2xl overflow-hidden border transition
                    ${on ? 'border-[var(--color-accent)]/70 shadow-[0_0_30px_-10px_var(--color-accent)]' : 'border-white/10 hover:border-white/30'}`}
                >
                  <div className="relative aspect-[4/5] lg:aspect-[16/10] bg-black">
                    <video src={v.src} muted autoPlay loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    {on && (
                      <span className="absolute top-2 left-2 text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-[var(--color-accent)] text-black">
                        играет
                      </span>
                    )}
                    <div className="absolute bottom-2 left-2.5 right-2.5 text-[11px] font-medium truncate text-white/90">
                      {v.title}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
