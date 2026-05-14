import { useEffect, useState } from 'react';

const KEY = 'murzi-brief-draft-v1';

const empty = {
  serviceType: '',
  deadline: '',
  budget: '',
  company: '',
  niche: '',
  productLink: '',
  description: '',
  details: [],
  references: '',
  name: '',
  channel: 'telegram',
  contact: '',
};

export function useBriefStore() {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? { ...empty, ...JSON.parse(raw) } : empty;
    } catch { return empty; }
  });

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
  }, [data]);

  const set = (patch) => setData((d) => ({ ...d, ...patch }));
  const reset = () => { setData(empty); try { localStorage.removeItem(KEY); } catch {} };
  const toggleDetail = (item) => setData((d) => ({
    ...d,
    details: d.details.includes(item) ? d.details.filter((x) => x !== item) : [...d.details, item],
  }));

  return { data, set, reset, toggleDetail };
}
