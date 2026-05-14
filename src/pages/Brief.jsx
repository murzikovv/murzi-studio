import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBriefStore } from '../lib/useBriefStore.js';
import { buildBriefMessage } from '../lib/buildBriefMessage.js';
import {
  serviceTypes, deadlineOptions, budgetOptions, channelOptions, detailHints,
} from '../data/brief.js';
import { useMouseGlow } from '../lib/useMouseGlow.js';
import { site } from '../data/site.js';

const STEPS = [
  { id: 'intro',    title: 'Бриф',                         hint: '~2 минуты' },
  { id: 'type',     title: 'Что делаем?',                  hint: 'выберите 1' },
  { id: 'when',     title: 'Срок и бюджет',                hint: 'два ответа' },
  { id: 'project',  title: 'О проекте',                    hint: 'коротко' },
  { id: 'details',  title: 'Детали задачи',                hint: 'опишите подробнее' },
  { id: 'refs',     title: 'Референсы',                    hint: 'необязательно' },
  { id: 'contact',  title: 'Куда отвечать?',               hint: 'почти готово' },
  { id: 'done',     title: 'Готово!',                      hint: 'проверьте и отправьте' },
];

export default function Brief() {
  const { data, set, reset, toggleDetail } = useBriefStore();
  const [step, setStep] = useState(0);

  const totalSteps = STEPS.length;
  const progress = step / (totalSteps - 1);

  // блокируем переход дальше пока обязательные поля не заполнены
  const canGoNext = useMemo(() => {
    switch (STEPS[step].id) {
      case 'intro':   return true;
      case 'type':    return !!data.serviceType;
      case 'when':    return !!data.deadline && !!data.budget;
      case 'project': return data.company.trim().length > 0;
      case 'details': return data.description.trim().length >= 10;
      case 'refs':    return true;
      case 'contact': return data.name.trim().length > 0 && data.contact.trim().length > 0;
      default:        return true;
    }
  }, [step, data]);

  const next = () => canGoNext && setStep((s) => Math.min(s + 1, totalSteps - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  // Enter → next (кроме textarea)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' && !e.shiftKey && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault(); next();
      }
      if (e.key === 'Escape') back();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, back]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)] flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-[var(--color-bg)]/85 border-b border-white/8">
        <div className="mx-auto max-w-[1100px] px-5 md:px-8 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="font-display text-base md:text-lg tracking-tight">murzi.studio</span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[var(--color-ink-dim)] hidden sm:inline">бриф</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-[var(--color-ink-dim)] tabular-nums">
              {Math.min(step + 1, totalSteps)} <span className="opacity-50">/ {totalSteps}</span>
            </span>
            <Link to="/" className="text-xs text-[var(--color-ink-dim)] hover:text-white transition">
              ← на главную
            </Link>
          </div>
        </div>

        {/* progress */}
        <div className="h-[2px] bg-white/8">
          <motion.div
            className="h-full origin-left"
            style={{ background: 'linear-gradient(90deg, var(--color-accent), var(--color-pink))' }}
            initial={false}
            animate={{ scaleX: progress }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          />
        </div>
      </header>

      {/* Step body */}
      <main className="flex-1 mx-auto w-full max-w-[1100px] px-5 md:px-8 py-10 md:py-16 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.section
            key={STEPS[step].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex-1 flex flex-col"
          >
            <StepHeader title={STEPS[step].title} hint={STEPS[step].hint} step={step} total={totalSteps} />
            <div className="mt-8 md:mt-10 flex-1">
              {renderStep(STEPS[step].id, { data, set, toggleDetail, reset, goTo: setStep })}
            </div>
          </motion.section>
        </AnimatePresence>

        {/* Footer nav (скрыт на финальном экране — там свои кнопки) */}
        {STEPS[step].id !== 'done' && (
          <div className="mt-10 md:mt-14 flex items-center justify-between gap-4 sticky bottom-4">
            <button
              onClick={back}
              disabled={step === 0}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-sm hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5m0 0 5-5m-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              назад
            </button>

            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--color-ink-dim)] hidden sm:block">
              {canGoNext ? 'Enter ↵ — дальше' : 'заполните поля чтобы продолжить'}
            </div>

            <button
              onClick={next}
              disabled={!canGoNext}
              className="btn-primary !py-3 !px-5 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {STEPS[step].id === 'contact' ? 'к финалу' : 'дальше'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function StepHeader({ title, hint, step, total }) {
  return (
    <div>
      <div className="flex items-center gap-3 text-[11px] uppercase font-mono tracking-[0.25em] text-[var(--color-ink-dim)]">
        <span>шаг {String(step + 1).padStart(2, '0')}</span>
        <span className="h-px w-8 bg-[var(--color-ink-dim)]/40" />
        <span>{hint}</span>
      </div>
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-[-0.03em] mt-4">
        {title}
      </h1>
    </div>
  );
}

/* ─── steps ─── */

function renderStep(id, ctx) {
  switch (id) {
    case 'intro':   return <IntroStep {...ctx} />;
    case 'type':    return <TypeStep {...ctx} />;
    case 'when':    return <WhenStep {...ctx} />;
    case 'project': return <ProjectStep {...ctx} />;
    case 'details': return <DetailsStep {...ctx} />;
    case 'refs':    return <RefsStep {...ctx} />;
    case 'contact': return <ContactStep {...ctx} />;
    case 'done':    return <DoneStep {...ctx} />;
    default:        return null;
  }
}

function IntroStep({ goTo }) {
  return (
    <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end">
      <div>
        <p className="text-lg md:text-xl text-[var(--color-ink-dim)] leading-relaxed max-w-[58ch]">
          7 коротких шагов. На выходе соберу вашу задачу в структурированный текст и отправлю в Telegram одной кнопкой —
          без созвонов и заполнения 40 полей. Можно вернуться и дописать в любой момент: прогресс сохраняется автоматически.
        </p>
        <ul className="mt-8 grid sm:grid-cols-3 gap-4 text-sm text-[var(--color-ink-dim)]">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            <span>~2 минуты на всё</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            <span>прогресс не теряется</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            <span>отправка в один клик</span>
          </li>
        </ul>
      </div>
      <button onClick={() => goTo(1)} className="btn-primary !text-base !py-4 !px-7 self-end">
        начать бриф
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
}

function TypeStep({ data, set }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {serviceTypes.map((s) => (
        <OptionCard
          key={s.id}
          active={data.serviceType === s.id}
          color={s.color}
          onClick={() => set({ serviceType: s.id, details: [] })}
          title={s.title}
          sub={s.sub}
          icon={s.icon}
        />
      ))}
    </div>
  );
}

function WhenStep({ data, set }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
      <div>
        <SubTitle>Срок</SubTitle>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {deadlineOptions.map((o) => (
            <SmallOption key={o.id} label={o.label} sub={o.sub}
              active={data.deadline === o.id} color="#d6ff3a"
              onClick={() => set({ deadline: o.id })}
            />
          ))}
        </div>
      </div>

      <div>
        <SubTitle>Бюджет</SubTitle>
        <div className="mt-4 grid grid-cols-1 gap-3">
          {budgetOptions.map((o) => (
            <SmallOption key={o.id} label={o.label} sub={o.sub}
              active={data.budget === o.id} color="#ff5e3a"
              onClick={() => set({ budget: o.id })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectStep({ data, set }) {
  return (
    <div className="grid md:grid-cols-2 gap-5 md:gap-7 max-w-[800px]">
      <Field label="Бренд / название проекта *" required
        value={data.company} onChange={(v) => set({ company: v })}
        placeholder="например, NTSauto" />
      <Field label="Ниша / категория"
        value={data.niche} onChange={(v) => set({ niche: v })}
        placeholder="автоаксессуары / красота / для дома…" />
      <div className="md:col-span-2">
        <Field label="Ссылка на товар или сайт (если есть)"
          value={data.productLink} onChange={(v) => set({ productLink: v })}
          placeholder="https://wildberries.ru/…" />
      </div>
    </div>
  );
}

function DetailsStep({ data, set, toggleDetail }) {
  const hints = detailHints[data.serviceType] || [];
  return (
    <div className="grid md:grid-cols-[1fr_320px] gap-7 md:gap-10 items-start">
      <div>
        <SubTitle>Опишите задачу — что нужно, для кого, какие приоритеты</SubTitle>
        <textarea
          value={data.description}
          onChange={(e) => set({ description: e.target.value })}
          placeholder="Например: нужна линейка из 3 SKU автомобильных зарядок. Хотим дерзкий технологичный стиль с зелёными акцентами, как у топа в категории. Главная фишка — быстрая зарядка 65W, нужно её выделить на главном."
          rows={9}
          className="mt-4 w-full rounded-2xl border border-white/10 bg-[var(--color-bg-2)] px-5 py-4 text-base leading-relaxed
            focus:outline-none focus:border-[var(--color-accent)]/60 transition resize-none"
        />
        <div className="mt-2 text-xs font-mono text-[var(--color-ink-dim)] flex items-center justify-between">
          <span>минимум 10 символов</span>
          <span>{data.description.length}</span>
        </div>
      </div>

      {hints.length > 0 && (
        <div className="rounded-2xl border border-white/8 bg-[var(--color-bg-2)] p-5">
          <SubTitle>Уточнения</SubTitle>
          <p className="text-xs text-[var(--color-ink-dim)] mt-1 mb-4">отметьте что подходит — необязательно</p>
          <div className="flex flex-wrap gap-2">
            {hints.map((h) => {
              const active = data.details.includes(h);
              return (
                <button
                  key={h}
                  type="button"
                  onClick={() => toggleDetail(h)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition
                    ${active
                      ? 'bg-[var(--color-accent)] text-black border-[var(--color-accent)]'
                      : 'border-white/15 text-[var(--color-ink-dim)] hover:text-white hover:border-white/40'}`}
                >
                  {h}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function RefsStep({ data, set }) {
  return (
    <div className="max-w-[700px]">
      <SubTitle>Ссылки на референсы, конкурентов или то что нравится</SubTitle>
      <p className="text-sm text-[var(--color-ink-dim)] mt-2 mb-4 max-w-[60ch]">
        Можно одну на строку. Что угодно: карточки конкурентов, Pinterest, Behance, ваши прошлые материалы. Если нет — пропустите.
      </p>
      <textarea
        value={data.references}
        onChange={(e) => set({ references: e.target.value })}
        placeholder={'https://wildberries.ru/...\nhttps://pinterest.com/...\nстиль как у бренда X'}
        rows={8}
        className="w-full rounded-2xl border border-white/10 bg-[var(--color-bg-2)] px-5 py-4 text-base leading-relaxed
          focus:outline-none focus:border-[var(--color-accent)]/60 transition resize-none font-mono text-sm"
      />
    </div>
  );
}

function ContactStep({ data, set }) {
  return (
    <div className="grid md:grid-cols-2 gap-5 md:gap-7 max-w-[800px]">
      <Field label="Как к вам обращаться? *" required
        value={data.name} onChange={(v) => set({ name: v })}
        placeholder="Имя или название компании" />
      <div>
        <label className="block text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-ink-dim)] mb-3">
          Удобный канал для ответа *
        </label>
        <div className="flex gap-2 flex-wrap">
          {channelOptions.map((c) => (
            <button
              key={c.id} type="button"
              onClick={() => set({ channel: c.id })}
              className={`px-3.5 py-2 rounded-full border text-sm transition
                ${data.channel === c.id
                  ? 'bg-[var(--color-accent)] text-black border-[var(--color-accent)]'
                  : 'border-white/15 text-[var(--color-ink-dim)] hover:text-white hover:border-white/40'}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div className="md:col-span-2">
        <Field
          label={`Контакт (${channelOptions.find((c) => c.id === data.channel)?.label || 'контакт'}) *`}
          required
          value={data.contact} onChange={(v) => set({ contact: v })}
          placeholder={channelOptions.find((c) => c.id === data.channel)?.placeholder || ''} />
      </div>
    </div>
  );
}

function DoneStep({ data, reset, goTo }) {
  const [copied, setCopied] = useState(false);
  const message = useMemo(() => buildBriefMessage(data), [data]);

  const tgUrl = `https://t.me/${site.contacts.telegram.replace(/^@/, '')}?text=${encodeURIComponent(message)}`;

  const copy = async () => {
    try { await navigator.clipboard.writeText(message); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  };

  const download = () => {
    const blob = new Blob([message], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `murzi-brief-${(data.company || 'noname').toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
  };

  return (
    <div className="grid md:grid-cols-[1fr_360px] gap-6 md:gap-8 items-start">
      <div>
        <p className="text-lg text-[var(--color-ink-dim)] leading-relaxed max-w-[60ch]">
          Бриф собран. Проверьте текст справа и отправьте одной кнопкой — откроется Telegram с уже готовым сообщением.
          Если предпочитаете другой способ — скопируйте текст или скачайте файлом.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href={tgUrl}
            target="_blank" rel="noreferrer"
            className="btn-primary !w-full !justify-center !text-base !py-4"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4 2 11l7 2 9-7-7 9 2 7 9-18z"/></svg>
            отправить в Telegram
          </a>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={copy} className="btn-ghost !w-full !justify-center">
              {copied ? '✓ скопировано' : 'скопировать'}
            </button>
            <button onClick={download} className="btn-ghost !w-full !justify-center">
              скачать .txt
            </button>
          </div>
          <button
            onClick={() => { if (confirm('Очистить бриф и начать заново?')) { reset(); goTo(0); } }}
            className="text-xs font-mono text-[var(--color-ink-dim)] hover:text-white mt-4 underline underline-offset-4 self-start"
          >
            начать заново
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[var(--color-bg-2)] p-5 md:p-6 sticky top-28">
        <div className="text-[10px] uppercase font-mono tracking-[0.25em] text-[var(--color-accent)] mb-3">
          превью сообщения
        </div>
        <pre className="text-[12px] md:text-[13px] leading-[1.55] whitespace-pre-wrap break-words font-mono text-[var(--color-ink-dim)] max-h-[60vh] overflow-y-auto no-scrollbar">
{message}
        </pre>
      </div>
    </div>
  );
}

/* ─── shared bits ─── */

function SubTitle({ children }) {
  return <div className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-ink-dim)]">{children}</div>;
}

function Field({ label, required, value, onChange, placeholder, type = 'text' }) {
  return (
    <label className="block">
      <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-ink-dim)] mb-3">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-[var(--color-bg-2)] px-4 py-3 text-base
          focus:outline-none focus:border-[var(--color-accent)]/60 transition placeholder:text-[var(--color-ink-dim)]/50"
      />
    </label>
  );
}

function OptionCard({ active, color, onClick, title, sub, icon }) {
  const onMove = useMouseGlow();
  return (
    <button
      type="button" onClick={onClick} onMouseMove={onMove}
      className={`capsule-card text-left p-5 md:p-6 border bg-[var(--color-bg-2)] flex flex-col gap-3 min-h-[160px] transition
        ${active ? 'border-2' : 'border border-white/10'}`}
      style={{
        '--glow': color,
        borderColor: active ? color : undefined,
        background: active
          ? `linear-gradient(180deg, color-mix(in oklab, ${color} 14%, var(--color-bg-2)), var(--color-bg-2))`
          : undefined,
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-3xl leading-none">{icon}</span>
        <span
          className={`h-5 w-5 rounded-full border grid place-items-center transition
            ${active ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-black' : 'border-white/20'}`}
        >
          {active && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </span>
      </div>
      <div>
        <div className="font-display text-lg md:text-xl leading-tight tracking-[-0.02em]">{title}</div>
        <div className="text-xs md:text-sm text-[var(--color-ink-dim)] mt-1.5 leading-snug">{sub}</div>
      </div>
    </button>
  );
}

function SmallOption({ active, color, onClick, label, sub }) {
  const onMove = useMouseGlow();
  return (
    <button
      type="button" onClick={onClick} onMouseMove={onMove}
      className={`capsule-card text-left p-4 md:p-5 border bg-[var(--color-bg-2)] flex items-center justify-between gap-3 transition
        ${active ? 'border-2' : 'border border-white/10'}`}
      style={{
        '--glow': color,
        borderColor: active ? color : undefined,
      }}
    >
      <div>
        <div className="font-display text-base md:text-lg leading-tight">{label}</div>
        {sub && <div className="text-xs text-[var(--color-ink-dim)] mt-1">{sub}</div>}
      </div>
      <span
        className={`h-5 w-5 shrink-0 rounded-full border grid place-items-center
          ${active ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-black' : 'border-white/20'}`}
      >
        {active && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </span>
    </button>
  );
}
