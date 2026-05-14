import { site } from '../data/site.js';

export default function Marquee() {
  const items = [...site.marquee, ...site.marquee];
  return (
    <div className="border-y border-white/10 py-6 overflow-hidden bg-[var(--color-bg-2)]">
      <div className="scroll-marquee">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-12 text-2xl md:text-3xl font-display tracking-tight text-[var(--color-ink-dim)]">
            <span className="hover:text-[var(--color-ink)] transition-colors">{it}</span>
            <span className="text-[var(--color-accent)] text-3xl leading-none">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
