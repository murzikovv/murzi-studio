import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { site } from '../data/site.js';

const links = [
  { href: '#services', label: 'услуги' },
  { href: '#work', label: 'работы' },
  { href: '#showreel', label: 'видео' },
  { href: '#approach', label: 'подход' },
  { href: '#pricing', label: 'цены' },
  { href: '#contact', label: 'контакты' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]"
        style={{ scaleX: progress, background: 'linear-gradient(90deg, var(--color-accent), var(--color-pink))' }}
      />

      <header
        className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 transition-all duration-300
        ${scrolled ? 'w-[min(960px,94vw)]' : 'w-[min(1100px,96vw)]'}`}
      >
        <nav className={`glass flex items-center justify-between rounded-full pl-4 pr-2 py-2.5
          ${scrolled ? 'shadow-[0_18px_50px_-20px_rgba(0,0,0,.7)]' : ''}`}>
          <a href="#top" className="flex items-center gap-2 px-2 py-1" onClick={() => setOpen(false)}>
            <span className="font-display text-[1.05rem] font-semibold tracking-tight">{site.brand}</span>
            <span className="hidden sm:inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)]" />
          </a>

          <ul className="hidden md:flex items-center gap-1 text-sm text-[var(--color-ink-dim)]">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="relative px-3 py-2 rounded-full hover:text-[var(--color-ink)] transition-colors group">
                  <span>{l.label}</span>
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-[var(--color-ink)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link to="/brief"
               className="btn-ghost !py-2 !px-4 !text-sm hidden md:inline-flex">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 4h9a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8l5-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 4v4H4M9 13h7M9 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              бриф
            </Link>

            <a href={site.contacts.telegramUrl} target="_blank" rel="noreferrer"
               className="btn-primary !py-2 !px-4 !text-sm hidden sm:inline-flex">
              написать
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="меню"
              aria-expanded={open}
              className="md:hidden relative h-10 w-10 rounded-full border border-white/15 grid place-items-center"
            >
              <span className={`block w-4 h-px bg-white absolute transition-transform ${open ? 'rotate-45' : '-translate-y-1'}`} />
              <span className={`block w-4 h-px bg-white absolute transition-transform ${open ? '-rotate-45' : 'translate-y-1'}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur-xl pt-24 px-6"
            onClick={() => setOpen(false)}
          >
            <motion.ul
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex flex-col gap-3 text-3xl font-display tracking-tight"
            >
              {links.map((l, i) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-3 border-b border-white/8">
                    <span className="text-[var(--color-ink-dim)] text-xs font-mono mr-3">0{i + 1}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </motion.ul>

            <div className="mt-10 flex flex-col gap-3">
              <a href={site.contacts.telegramUrl} target="_blank" rel="noreferrer" className="btn-primary !w-full !justify-center">
                написать в Telegram
              </a>
              <Link to="/brief" onClick={() => setOpen(false)} className="btn-ghost !w-full !justify-center">
                заполнить бриф
              </Link>
              <a href={site.contacts.channelUrl} target="_blank" rel="noreferrer" className="btn-ghost !w-full !justify-center">
                канал @murzi_design
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
