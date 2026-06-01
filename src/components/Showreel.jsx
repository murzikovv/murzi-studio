import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { works } from '../data/works.js';

const videos = works.filter((w) => w.categoryKey === 'video').slice(0, 3);

function SoundIcon({ on }) {
  return on ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="currentColor" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8 8 0 0 1 0 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="currentColor" />
      <path d="m17 9 4 6M21 9l-4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ShowreelCard({ v, i }) {
  const ref = useRef(null);
  const [sound, setSound] = useState(false);

  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = sound;            // если звук был включён — глушим
    if (!sound) el.play();
    setSound(!sound);
  };

  return (
    <motion.button
      type="button"
      onClick={toggleSound}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      className="cursor-grow group relative overflow-hidden rounded-2xl border border-white/8 bg-[var(--color-bg-2)] aspect-[4/5]"
    >
      <video
        ref={ref}
        src={v.src}
        muted
        autoPlay
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
        <span className="text-[13px] md:text-sm font-medium truncate drop-shadow">{v.title}</span>
        <span className="h-9 w-9 shrink-0 rounded-full bg-black/50 backdrop-blur-md border border-white/20 grid place-items-center group-hover:bg-[var(--color-accent)] group-hover:text-black group-hover:border-[var(--color-accent)] transition">
          <SoundIcon on={sound} />
        </span>
      </div>
    </motion.button>
  );
}

export default function Showreel() {
  if (!videos.length) return null;
  return (
    <section id="showreel" className="relative py-20 md:py-36 bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid md:grid-cols-[auto_1fr] items-end gap-6 mb-10 md:mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)] mb-4">
              · showreel
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-[-0.03em] max-w-[18ch]">
              Видео, которое <span className="italic font-light text-[var(--color-accent)]">двигается</span>
            </h2>
          </div>
          <p className="text-[var(--color-ink-dim)] max-w-[42ch] md:justify-self-end text-sm md:text-base">
            Рекламные ролики на нейросетях — сценарий, сцены, ИИ-голос, музыка и монтаж под ключ. Звук — по клику.
          </p>
        </div>

        <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, i) => <ShowreelCard key={v.id} v={v} i={i} />)}
        </div>
      </div>
    </section>
  );
}
