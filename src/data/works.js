// Авто-загрузка всех файлов из src/portfolio/<категория>/
// Просто кидаешь файл в нужную папку — он сам появится на сайте.
// Видео: .mp4 / .webm. Картинки: .png .jpg .jpeg .webp .avif

const categoryMap = {
  marketplace: { label: "Карточка WB",  order: 1 },
  sku:         { label: "Линейка SKU",  order: 2 },
  neurophoto:  { label: "Нейрофото",    order: 3 },
  video:       { label: "Видео",        order: 4 },
  case:        { label: "Кейс",         order: 5 },
  social:      { label: "Соцсети",      order: 6 },
  brand:       { label: "Бренд",        order: 7 },
  visual:      { label: "Визуал",       order: 8 },
  slide:       { label: "Слайд",        order: 9 },
};

const modules = import.meta.glob(
  '../portfolio/**/*.{png,jpg,jpeg,webp,avif,mp4,webm}',
  { eager: true, query: '?url', import: 'default' }
);

function prettifyTitle(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const isVideo = (name) => /\.(mp4|webm)$/i.test(name);

export const works = Object.entries(modules)
  .map(([path, url]) => {
    const parts = path.split('/');
    const file = parts[parts.length - 1];
    const folder = parts[parts.length - 2];
    const meta = categoryMap[folder];
    if (!meta) return null;
    return {
      id: path,
      src: url,
      type: isVideo(file) ? 'video' : 'image',
      title: prettifyTitle(file),
      category: meta.label,
      categoryKey: folder,
      _order: meta.order,
    };
  })
  .filter(Boolean)
  .sort((a, b) => a._order - b._order || a.title.localeCompare(b.title, 'ru'));

export const categories = [
  'Все',
  ...Object.values(categoryMap)
    .sort((a, b) => a.order - b.order)
    .map((c) => c.label),
];
