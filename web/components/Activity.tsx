import activity from '@/data/activity.json';
import { CountUp } from './Motion';

const fmt = (n: number) => n.toLocaleString('en-US');

export default function Activity() {
  const { stats, days, total, updated } = activity as {
    stats: Record<string, number>;
    days: { d: string; l: number; c: number }[];
    total?: number;
    updated?: string;
  };
  const cards: [number, string][] = [
    [stats.commits, 'Commits'],
    [stats.pullRequests, 'Pull requests opened'],
    [stats.repos, 'Repos contributed to'],
    [stats.streak, 'Day streak'],
  ];
  return (
    <>
      <dl className="act-stats">
        {cards.map(([v, l]) => (
          <div key={l} className="reveal">
            <dt className="stat-n"><CountUp to={v} /></dt>
            <dd className="mono">{l}</dd>
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
          <span>{fmt(total ?? 0)} contributions in the last year</span>
          <span>Best day {stats.bestDay} · avg ~{Math.round(stats.perDay)}/day</span>
        </figcaption>
      </figure>
      <p className="lede">
        Aggregate stats across public and private repositories{updated ? `. Updated ${updated}.` : '.'}
      </p>
    </>
  );
}
