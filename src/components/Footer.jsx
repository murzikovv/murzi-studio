import { Link } from 'react-router-dom';
import { site } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 md:py-14 bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid md:grid-cols-[2fr_1fr_1fr] gap-8 items-start">
        <div>
          <div className="font-display text-2xl tracking-[-0.02em]">{site.brand}</div>
          <p className="text-sm text-[var(--color-ink-dim)] max-w-[40ch] mt-3">
            ИИ-дизайн под ключ. Карточки, нейрофото, видео. © {new Date().getFullYear()} murzi.studio
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)] mb-3">навигация</div>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="#services" className="hover:text-[var(--color-accent)]">услуги</a></li>
            <li><a href="#work" className="hover:text-[var(--color-accent)]">работы</a></li>
            <li><a href="#pricing" className="hover:text-[var(--color-accent)]">цены</a></li>
            <li><a href="#process" className="hover:text-[var(--color-accent)]">процесс</a></li>
            <li><Link to="/brief" className="hover:text-[var(--color-accent)]">заполнить бриф</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)] mb-3">связь</div>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href={site.contacts.telegramUrl} target="_blank" rel="noreferrer" className="hover:text-[var(--color-accent)]">Telegram · {site.contacts.telegram}</a></li>
            <li><a href={site.contacts.channelUrl} target="_blank" rel="noreferrer" className="hover:text-[var(--color-accent)]">Канал · @murzi_design</a></li>
            <li><a href={site.contacts.waUrl} target="_blank" rel="noreferrer" className="hover:text-[var(--color-accent)]">WhatsApp</a></li>
            <li><a href={`tel:+${site.contacts.phoneRaw}`} className="hover:text-[var(--color-accent)]">{site.contacts.phone}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
