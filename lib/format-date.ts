import { lang } from 'blog.config';

export default function formatDate(date: Date | string) {
  const d = new Date(date);
  const res = d.toLocaleDateString(lang, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return lang.slice(0, 2).toLowerCase() === 'zh'
    ? res.replace('年', ' 年 ').replace('月', ' 月 ').replace('日', ' 日')
    : res;
}
