import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function WorkModal({ work, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = work ? 'hidden' : '';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [work, onClose]);

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            className="relative max-w-[1100px] w-full max-h-[90vh] overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-bg-2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 h-10 w-10 rounded-full bg-black/60 border border-white/15 text-white grid place-items-center hover:bg-black"
              aria-label="закрыть"
            >
              ✕
            </button>
            <div className="grid md:grid-cols-[1fr_320px]">
              <div className="bg-black flex items-center justify-center max-h-[90vh] overflow-hidden">
                {work.type === 'video' ? (
                  <video src={work.src} controls autoPlay loop className="max-h-[90vh] w-full object-contain" />
                ) : (
                  <img src={work.src} alt={work.title} className="max-h-[90vh] w-full object-contain" />
                )}
              </div>
              <div className="p-6 md:p-8 flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[var(--color-accent)]">
                  {work.category}
                </span>
                <h3 className="font-display text-2xl tracking-tight">{work.title}</h3>
                <p className="text-sm text-[var(--color-ink-dim)] leading-relaxed">
                  Один из 500+ закрытых проектов. Похожая задача? Напишите — соберу под ваш товар.
                </p>
                <a href="https://t.me/murzi_lzt" target="_blank" rel="noreferrer" className="btn-primary mt-auto !justify-center">
                  заказать похожее
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
