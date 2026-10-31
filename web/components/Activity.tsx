import activity from '@/data/activity.json';
import { CountUp } from './Motion';
import L from './L';

const fmt = (n: number) => n.toLocaleString('en-US');

export default function Activity() {
  const { stats, days, total, updated } = activity as {
    stats: Record<string, number>;
    days: { d: string; l: number; c: number }[];
    total?: number;
    updated?: string;
  };
  const cards: [number, string, string][] = [
    [stats.commits, 'Commits', 'کامیت‌ها'],
    [stats.pullRequests, 'Pull requests opened', 'درخواست‌های ادغام بازشده'],
    [stats.repos, 'Repos contributed to', 'مخازن مشارکت‌شده'],
    [stats.streak, 'Day streak', 'روزهای پیاپی'],
  ];
  return (
    <>
      <dl className="act-stats">
        {cards.map(([v, l, f]) => (
          <div key={l} className="reveal">
            <dt className="stat-n"><CountUp to={v} /></dt>
            <dd className="mono"><L en={l} fa={f} /></dd>
          </div>
        ))}
      </dl>
      <figure className="cal reveal">
        <div className="cal-grid" role="img" aria-label={`${fmt(total ?? 0)} contributions in the last year`}>
          {days.map((x) => (
            <i key={x.d} data-l={x.l} title={`${x.c} on ${x.d}`} />
          ))}
        </div>
        <figcaption className="mono">
          <span><L en={`${fmt(total ?? 0)} contributions in the last year`} fa={`${fmt(total ?? 0)} مشارکت در یک سال گذشته`} /></span>
          <span><L en={`Best day ${stats.bestDay} · avg ~${Math.round(stats.perDay)}/day`} fa={`بهترین روز ${stats.bestDay} · میانگین ~${Math.round(stats.perDay)} در روز`} /></span>
        </figcaption>
      </figure>
      <p className="lede">
        <L
          en={`Aggregate stats across public and private repositories${updated ? `. Updated ${updated}.` : '.'}`}
          fa={`آمار تجمیعی مخازن عمومی و خصوصی${updated ? `. به‌روزرسانی: ${updated}.` : '.'}`}
        />
      </p>
    </>
  );
}
