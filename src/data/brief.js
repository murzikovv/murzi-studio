// Конфигурация брифа: типы услуг, опции сроков/бюджетов, чеклисты на финальном шаге.

export const serviceTypes = [
  {
    id: 'marketplace',
    icon: '🛍️',
    title: 'Карточка / линейка для маркетплейса',
    sub: 'WB, Ozon, Я.Маркет — главный + инфо-слайды',
    color: '#d6ff3a',
  },
  {
    id: 'neurophoto',
    icon: '📸',
    title: 'Нейрофотосессия',
    sub: 'товара или человека — студийные кадры из обычных фото',
    color: '#ff5e3a',
  },
  {
    id: 'video',
    icon: '🎥',
    title: 'Рекламное видео',
    sub: 'ролик на ИИ — сценарий, голос, музыка, монтаж под ключ',
    color: '#38e8ff',
  },
  {
    id: 'motion',
    icon: '🎞️',
    title: 'Анимированная инфографика',
    sub: 'видео-витрина WB, Reels, сторис',
    color: '#5cf6c2',
  },
  {
    id: 'influencer',
    icon: '🤖',
    title: 'Виртуальный ИИ-инфлюенсер',
    sub: 'персонаж + контент-план + посты',
    color: '#ff3ad6',
  },
  {
    id: 'retouch',
    icon: '✨',
    title: 'Ретушь и цветокор',
    sub: 'обработка серии фото — кожа, цвет, дефекты',
    color: '#ffffff',
  },
  {
    id: 'custom',
    icon: '🤝',
    title: 'Что-то другое / гибрид',
    sub: 'опишу подробнее на следующих шагах',
    color: '#a1a1aa',
  },
];

export const deadlineOptions = [
  { id: 'urgent',  label: 'Срочно', sub: '24–72 часа' },
  { id: 'week',    label: '1 неделя', sub: 'комфортный срок' },
  { id: 'month',   label: '2–4 недели', sub: 'без спешки' },
  { id: 'flex',    label: 'Гибко',     sub: 'как получится' },
];

export const budgetOptions = [
  { id: 'small',  label: 'до 5 000 ₽',         sub: 'разовая задача' },
  { id: 'mid',    label: '5 000 – 15 000 ₽',   sub: 'один товар или сессия' },
  { id: 'large',  label: '15 000 – 50 000 ₽',  sub: 'линейка / ролик' },
  { id: 'xl',     label: '50 000 ₽+',          sub: 'кампания / бренд' },
  { id: 'discuss', label: 'Обсудить',          sub: 'считаем под объём' },
];

export const channelOptions = [
  { id: 'telegram', label: 'Telegram', placeholder: '@username' },
  { id: 'whatsapp', label: 'WhatsApp', placeholder: '+7 XXX XXX-XX-XX' },
  { id: 'phone',    label: 'Звонок',   placeholder: '+7 XXX XXX-XX-XX' },
  { id: 'email',    label: 'Email',    placeholder: 'you@example.com' },
];

// Какие чеклисты-уточнения показать на шаге «Детали» под выбранный тип задачи.
export const detailHints = {
  marketplace: ['1 товар', 'Линейка SKU (>1 товара)', 'Обложка', 'Инфо-слайды', 'Адаптация под видео-витрину'],
  neurophoto:  ['Товар (предметка)', 'Портреты человека', 'Интерьерные сцены', 'Lifestyle с моделью', 'Hi-Res апскейл'],
  video:       ['Reels 9:16', 'Полный 16:9', 'TV-формат', 'Нужен сценарий', 'Нужна оригинальная музыка', 'Нужна ИИ-озвучка'],
  motion:      ['Анимация существующей карточки', 'Новая с нуля', 'Сторис', 'Reels', 'Видео-витрина WB'],
  influencer:  ['Создание персонажа', 'Lookbook', 'Контент-план', 'Посты ежедневно', 'Reels-видео'],
  retouch:     ['Ретушь кожи', 'Цветокор серии', 'Удаление дефектов', 'Замена фона', 'Hi-Res апскейл'],
  custom:      [],
};
