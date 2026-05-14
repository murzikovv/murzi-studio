import { serviceTypes, deadlineOptions, budgetOptions, channelOptions } from '../data/brief.js';

const find = (list, id) => list.find((x) => x.id === id);

export function buildBriefMessage(d) {
  const lines = [];
  lines.push('🎯 НОВЫЙ БРИФ — murzi.studio');
  lines.push('━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  if (d.serviceType) {
    const s = find(serviceTypes, d.serviceType);
    lines.push(`📦 Задача: ${s ? `${s.icon} ${s.title}` : d.serviceType}`);
  }
  if (d.deadline) {
    const x = find(deadlineOptions, d.deadline);
    lines.push(`⏱  Срок: ${x ? `${x.label} (${x.sub})` : d.deadline}`);
  }
  if (d.budget) {
    const x = find(budgetOptions, d.budget);
    lines.push(`💸 Бюджет: ${x ? x.label : d.budget}`);
  }

  if (d.company || d.niche || d.productLink) {
    lines.push('');
    lines.push('— О ПРОЕКТЕ —');
    if (d.company)     lines.push(`Бренд: ${d.company}`);
    if (d.niche)       lines.push(`Ниша: ${d.niche}`);
    if (d.productLink) lines.push(`Ссылка: ${d.productLink}`);
  }

  if (d.description || (d.details && d.details.length)) {
    lines.push('');
    lines.push('— ДЕТАЛИ —');
    if (d.description) lines.push(d.description);
    if (d.details && d.details.length) {
      lines.push('');
      lines.push('Что нужно: ' + d.details.map((x) => `• ${x}`).join('  '));
    }
  }

  if (d.references) {
    lines.push('');
    lines.push('— РЕФЕРЕНСЫ —');
    lines.push(d.references);
  }

  lines.push('');
  lines.push('— КОНТАКТ —');
  if (d.name) lines.push(`Имя: ${d.name}`);
  if (d.contact) {
    const ch = find(channelOptions, d.channel);
    lines.push(`${ch ? ch.label : d.channel}: ${d.contact}`);
  }

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━');
  lines.push('Отправлено через бриф на сайте murzi.studio');

  return lines.join('\n');
}
