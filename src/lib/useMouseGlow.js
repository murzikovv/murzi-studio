import { useCallback } from 'react';

// Один обработчик на множество карточек: ставит CSS-переменные --mx/--my,
// чтобы свечение в .capsule-card::before следовало за курсором.
// Цвет свечения берётся из --glow на самой карточке.
export function useMouseGlow() {
  return useCallback((e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  }, []);
}
