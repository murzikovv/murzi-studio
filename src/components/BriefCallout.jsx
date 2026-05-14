import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BriefCallout() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 p-8 md:p-14
            bg-[linear-gradient(135deg,rgba(214,255,58,0.10),rgba(255,58,214,0.06)_60%,transparent)]"
        >
          {/* Decorative glow blobs */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--color-accent)]/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-24 h-64 w-64 rounded-full bg-[var(--color-pink)]/15 blur-3xl pointer-events-none" />

          <div className="relative grid md:grid-cols-[1fr_auto] items-center gap-8 md:gap-12">
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] font-mono text-[var(--color-accent)] mb-3">
                · короткий путь
              </div>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[0.95] tracking-[-0.03em] max-w-[20ch]">
                Не любите писать в&nbsp;Telegram? <span className="italic font-light text-[var(--color-accent)]">Заполните бриф</span>
              </h3>
              <p className="text-[var(--color-ink-dim)] mt-4 max-w-[58ch] text-sm md:text-base leading-relaxed">
                7 коротких шагов, ~2 минуты. На выходе соберу вашу задачу в структурированный текст —
                и вы отправите его одной кнопкой. Без созвонов, без 40 полей, прогресс сохраняется.
              </p>
            </div>

            <Link to="/brief" className="btn-primary !py-4 !px-7 !text-base self-start md:self-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 4h9a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8l5-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 4v4H4M9 13h7M9 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              открыть бриф
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
