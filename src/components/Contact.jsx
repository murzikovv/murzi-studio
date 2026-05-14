import { motion } from 'framer-motion';
import { site } from '../data/site.js';
import { useMouseGlow } from '../lib/useMouseGlow.js';

const TelegramIcon = (p) => (
  <svg viewBox="0 0 64 64" fill="none" {...p}>
    <defs>
      <linearGradient id="tg-grad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#38e8ff" />
        <stop offset="1" stopColor="#1c8eff" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="32" fill="url(#tg-grad)" />
    <path d="M14.5 32.7 47.2 19.4c1.5-.6 2.9.4 2.4 2.7l-5.6 26.4c-.4 1.8-1.5 2.3-3 1.4l-8.3-6.1-4 3.9c-.5.5-.9.9-1.8.9l.6-9 16.4-14.8c.7-.6-.2-1-1.1-.4L23 33.7l-8.7-2.7c-1.9-.6-1.9-1.9.2-2.7Z" fill="#fff"/>
  </svg>
);

const ChannelIcon = (p) => (
  <svg viewBox="0 0 64 64" fill="none" {...p}>
    <defs>
      <linearGradient id="ch-grad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#d6ff3a" />
        <stop offset="1" stopColor="#92e016" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="60" height="60" rx="18" fill="url(#ch-grad)" />
    <path d="M18 26v12c0 1.7 1.3 3 3 3h6l8 7c1.3 1.1 3.3.2 3.3-1.5V19.5c0-1.7-2-2.6-3.3-1.5l-8 7h-6c-1.7 0-3 1.3-3 3Z" fill="#0a0a0f"/>
    <path d="M44 23a10 10 0 0 1 0 18M48 18a16 16 0 0 1 0 28" stroke="#0a0a0f" strokeWidth="3" strokeLinecap="round" fill="none"/>
  </svg>
);

const WhatsAppIcon = (p) => (
  <svg viewBox="0 0 64 64" fill="none" {...p}>
    <defs>
      <linearGradient id="wa-grad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#5ef38c" />
        <stop offset="1" stopColor="#1ca84d" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="32" fill="url(#wa-grad)" />
    <path d="M32.1 14C22 14 13.7 22.2 13.7 32.3c0 3.5 1 6.9 2.8 9.8L13 51l9.2-3.4c2.8 1.5 6 2.4 9.4 2.4h.1c10 0 18.3-8.2 18.3-18.3 0-4.9-1.9-9.5-5.4-13C41.6 16 37 14 32.1 14Zm10.7 26c-.5 1.3-2.6 2.5-3.7 2.6-1 .1-2.2.2-3.6-.2-.8-.3-1.9-.6-3.3-1.3-5.9-2.6-9.7-8.5-10-9-.3-.4-2.4-3.1-2.4-6 0-2.8 1.5-4.2 2-4.8.5-.6 1.1-.7 1.5-.7l1.1.1c.4 0 .9-.2 1.4 1.1.5 1.3 1.8 4.4 2 4.8.2.4.3.8.1 1.3-.2.4-.3.7-.7 1.1l-1 1.2c-.3.4-.7.8-.3 1.5.4.7 1.7 2.8 3.6 4.5 2.5 2.2 4.6 2.9 5.3 3.2.7.4 1.1.3 1.5-.2.4-.5 1.7-2 2.2-2.7.5-.7 1-.6 1.6-.4.7.2 4.3 2 5 2.4.7.4 1.2.5 1.4.8.2.4.2 2-.4 3.3Z" fill="#fff"/>
  </svg>
);

const PhoneIcon = (p) => (
  <svg viewBox="0 0 64 64" fill="none" {...p}>
    <defs>
      <linearGradient id="ph-grad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#ff8a3a" />
        <stop offset="1" stopColor="#ff3a5e" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="60" height="60" rx="18" fill="url(#ph-grad)" />
    <path d="M22 17c-1.7 0-3.2 1-3.9 2.5-2 4-1.4 9.4 1.4 14.7 4 7.5 11.6 13 17.6 14.4 3 .7 5.7.4 7.4-1.8l1.7-2.2c1.3-1.7.9-4.1-.9-5.3l-4.5-3a4 4 0 0 0-4.7.3l-1.6 1.4c-.5.4-1.2.5-1.7.1-3.1-1.9-6-4.9-7.6-7.7-.3-.5-.2-1.2.2-1.6l1.6-1.5a4 4 0 0 0 .9-4.6L25 19.4A4 4 0 0 0 22 17Z" fill="#fff"/>
  </svg>
);

const cards = [
  {
    href: site.contacts.telegramUrl,
    eyebrow: 'личное сообщение',
    title: 'Telegram',
    handle: site.contacts.telegram,
    color: '#38e8ff',
    Icon: TelegramIcon,
    big: true,
  },
  {
    href: site.contacts.channelUrl,
    eyebrow: 'свежие работы',
    title: 'TG-канал',
    handle: '@murzi_design',
    color: '#d6ff3a',
    Icon: ChannelIcon,
    big: true,
  },
  {
    href: site.contacts.waUrl,
    eyebrow: 'если удобнее',
    title: 'WhatsApp',
    handle: site.contacts.phone,
    color: '#25d366',
    Icon: WhatsAppIcon,
  },
  {
    href: `tel:+${site.contacts.phoneRaw}`,
    eyebrow: 'голосом',
    title: 'Звонок',
    handle: site.contacts.phone,
    color: '#ff5e3a',
    Icon: PhoneIcon,
  },
];

function ContactCard({ c, i }) {
  const onMove = useMouseGlow();
  const { Icon } = c;

  return (
    <motion.a
      href={c.href}
      target={c.href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      className={`capsule-card cursor-grow group border bg-[var(--color-bg-2)] p-6 md:p-8 flex flex-col justify-between gap-6 ${c.big ? 'min-h-[280px]' : 'min-h-[220px]'}`}
      style={{
        '--glow': c.color,
        borderColor: `color-mix(in oklab, ${c.color} 18%, rgba(255,255,255,0.08))`,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)] mb-3">
            {c.eyebrow}
          </div>
          <div className={`font-display tracking-[-0.03em] ${c.big ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'}`}>
            {c.title}
          </div>
        </div>
        <Icon
          className={`shrink-0 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110 drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] ${c.big ? 'w-16 h-16 md:w-20 md:h-20' : 'w-14 h-14 md:w-16 md:h-16'}`}
        />
      </div>

      <div className="flex items-end justify-between gap-4">
        <span className="text-lg md:text-xl font-mono group-hover:translate-x-1 transition-transform" style={{ color: c.color }}>
          {c.handle}
        </span>
        <span
          className="h-10 w-10 shrink-0 rounded-full grid place-items-center transition-all duration-300 group-hover:scale-110"
          style={{
            background: `color-mix(in oklab, ${c.color} 20%, transparent)`,
            border: `1px solid color-mix(in oklab, ${c.color} 50%, transparent)`,
            color: c.color,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M7 17 17 7M7 7h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </motion.a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 relative">
        <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)] mb-4">
          · контакты
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-[14vw] md:text-[10vw] leading-[0.9] tracking-[-0.04em]"
        >
          Поговорим? <span className="italic font-light text-[var(--color-accent)]">→</span>
        </motion.h2>

        <p className="text-[var(--color-ink-dim)] max-w-[60ch] mt-6 md:mt-8 text-base md:text-lg">
          Самый быстрый ответ — в Telegram. Обычно отвечаю в течение часа.
        </p>

        <div className="mt-10 md:mt-14 grid sm:grid-cols-2 gap-4 md:gap-5">
          {cards.map((c, i) => <ContactCard key={c.title} c={c} i={i} />)}
        </div>
      </div>
    </section>
  );
}
