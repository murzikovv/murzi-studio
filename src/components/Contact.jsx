import { motion } from 'framer-motion';
import { site } from '../data/site.js';

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-[16vw] md:text-[10vw] leading-[0.9] tracking-[-0.04em]"
        >
          Поговорим? <span className="italic font-light text-[var(--color-accent)]">→</span>
        </motion.h2>

        <div className="mt-10 md:mt-12 grid sm:grid-cols-2 gap-4 md:gap-6">
          <a href={site.contacts.telegramUrl} target="_blank" rel="noreferrer"
             className="capsule-card cursor-grow group p-8 md:p-10 border border-white/10 bg-[var(--color-bg-2)] flex flex-col gap-4 min-h-[260px]">
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)]">Личное сообщение</div>
            <div className="font-display text-4xl md:text-5xl tracking-[-0.03em]">Telegram</div>
            <div className="text-2xl text-[var(--color-accent)] mt-auto group-hover:translate-x-1 transition-transform">
              {site.contacts.telegram} →
            </div>
          </a>

          <a href={site.contacts.channelUrl} target="_blank" rel="noreferrer"
             className="capsule-card cursor-grow group p-8 md:p-10 border border-white/10 bg-[var(--color-bg-2)] flex flex-col gap-4 min-h-[260px]">
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)]">Свежие работы</div>
            <div className="font-display text-4xl md:text-5xl tracking-[-0.03em]">TG-канал</div>
            <div className="text-2xl text-[var(--color-accent)] mt-auto group-hover:translate-x-1 transition-transform">
              @murzi_design →
            </div>
          </a>

          <a href={site.contacts.waUrl} target="_blank" rel="noreferrer"
             className="capsule-card cursor-grow group p-8 md:p-10 border border-white/10 bg-[var(--color-bg-2)] flex flex-col gap-4 min-h-[200px]">
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)]">Если удобнее</div>
            <div className="font-display text-3xl md:text-4xl tracking-[-0.03em]">WhatsApp</div>
            <div className="text-xl text-[var(--color-accent)] mt-auto group-hover:translate-x-1 transition-transform">
              {site.contacts.phone} →
            </div>
          </a>

          <a href={`tel:+${site.contacts.phoneRaw}`}
             className="capsule-card cursor-grow group p-8 md:p-10 border border-white/10 bg-[var(--color-bg-2)] flex flex-col gap-4 min-h-[200px]">
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)]">Голосом</div>
            <div className="font-display text-3xl md:text-4xl tracking-[-0.03em]">Звонок</div>
            <div className="text-xl text-[var(--color-accent)] mt-auto group-hover:translate-x-1 transition-transform">
              {site.contacts.phone} →
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
