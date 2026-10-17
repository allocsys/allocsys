// Builds data/activity.json for the Activity section.
//  - headline stats: parsed from ../github-metrics.svg (the bot-generated card, includes private activity)
//  - contribution calendar: GitHub's public contributions endpoint
// Each part is optional: if one fails, the previous value in data/activity.json is kept.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const OUT = new URL('../data/activity.json', import.meta.url);
const SVG = new URL('../../github-metrics.svg', import.meta.url);
const USER = 'allocsys';
const data = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : { stats: {}, days: [] };

try {
  const text = readFileSync(SVG, 'utf8')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, '\n')
    .replace(/\s+/g, ' ');
  const num = (re) => {
    const m = text.match(re);
    return m ? Number(m[1].replace(/,/g, '')) : undefined;
  };
  const stats = {
    commits: num(/(\d[\d,]*) Commits/),
    pullRequests: num(/(\d[\d,]*) Pull requests opened/),
    repos: num(/Contributed to (\d[\d,]*) repositories/),
    streak: num(/Current streak (\d[\d,]*) days/),
    bestStreak: num(/Best streak (\d[\d,]*) days/),
    bestDay: num(/Highest in a day at (\d[\d,]*)/),
    perDay: num(/Average per day at ~([\d.]+)/),
  };
  const updated = text.match(/Last updated (\d{1,2} \w{3} \d{4})/)?.[1];
  for (const [k, v] of Object.entries(stats)) if (Number.isFinite(v)) data.stats[k] = v;
  if (updated) data.updated = updated;
} catch (e) {
  console.warn('activity: could not read metrics svg, keeping previous stats:', e.message);
}

try {
  const res = await fetch(`https://github.com/users/${USER}/contributions`, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const counts = new Map();
  for (const m of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>\s*(No|\d[\d,]*) contributions? on/g)) {
    counts.set(m[1], m[2] === 'No' ? 0 : Number(m[2].replace(/,/g, '')));
  }
  const days = [];
  for (const m of html.matchAll(/<td\b[^>]*>/g)) {
    const tag = m[0];
    const date = tag.match(/data-date="([^"]+)"/)?.[1];
    const level = tag.match(/data-level="(\d)"/)?.[1];
    const id = tag.match(/\bid="([^"]+)"/)?.[1];
    if (date && level !== undefined && id) days.push({ d: date, l: Number(level), c: counts.get(id) ?? 0 });
  }
  days.sort((a, b) => (a.d < b.d ? -1 : 1));
  if (days.length < 300) throw new Error(`only ${days.length} days parsed`);
  data.days = days;
  data.total = days.reduce((s, x) => s + x.c, 0);
} catch (e) {
  console.warn('activity: could not refresh calendar, keeping previous:', e.message);
}

writeFileSync(OUT, JSON.stringify(data) + '\n');
console.log(`activity: ${data.days.length} days, stats ${JSON.stringify(data.stats)}`);
