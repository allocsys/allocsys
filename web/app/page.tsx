import { about, contributions, languages, projects, skills, updated } from '@/data/site';
import Activity from '@/components/Activity';
import Header from '@/components/Header';
import IndexRow from '@/components/IndexRow';
import { CountUp, Drift, ScrollWords, ScrubText, Spinner } from '@/components/Motion';
import PinnedSkills from '@/components/PinnedSkills';
import StackCard from '@/components/StackCard';
import RichText from '@/components/RichText';
import L from '@/components/L';
import { aboutFa } from '@/data/site.fa';
import { contributionsFa, projectsFa, skillsFa } from '@/data/content.fa';

const RESUME = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/resume.pdf`;
const RESUME_FA = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/resume-fa.pdf`;
const VISUAL = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/showcase/`;
const EMAIL = 'allocsys@gmail.com';
const TICKER = ['MCP servers', 'TypeScript', 'Cloudflare Workers', 'Python', 'Go', 'Rust', 'n8n', 'LangChain', 'SQL', 'Bash'];
const num = (i: number) => String(i + 1).padStart(2, '0');

function Head({ n, title }: { n: string; title: React.ReactNode }) {
  return (
    <header className="sec-head reveal">
      <span className="mono">{n}</span>
      <h2>{title}</h2>
    </header>
  );
}

function Band({ reverse, outline }: { reverse?: boolean; outline?: boolean }) {
  return (
    <div className={`band-row${outline ? ' outline' : ''}`} aria-hidden="true">
      <div className="track" style={reverse ? { animationDirection: 'reverse' } : undefined}>
        {[0, 1].map((k) => (
          <ul key={k}>
            {TICKER.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Header />
      <main id="top">
        <section className="hero">
          <div className="hero-top">
            <div>
              <p className="term mono">
                <span>$ whoami</span>
                <br />
                <span className="typed" style={{ '--n': 28 } as React.CSSProperties}>
                  allocsys · backend developer
                </span>
                <i className="caret" />
              </p>
              <p className="pill mono">
                <i className="dot" /> <L en="Open to work" fa="آماده همکاری" />
              </p>
            </div>
            <Spinner />
          </div>
          <h1 className="display l-en">
            <span className="line"><span style={{ '--i': 0 } as React.CSSProperties}>I build the</span></span>
            <span className="line"><span className="serif" style={{ '--i': 1 } as React.CSSProperties}>infrastructure</span></span>
            <span className="line"><span style={{ '--i': 2 } as React.CSSProperties}>AI agents</span></span>
            <span className="line"><span style={{ '--i': 3 } as React.CSSProperties}>run on.</span></span>
          </h1>
          <h1 className="display l-fa" lang="fa" dir="rtl">
            <span className="line"><span style={{ '--i': 0 } as React.CSSProperties}>من زیرساخت</span></span>
            <span className="line"><span style={{ '--i': 1 } as React.CSSProperties}>عامل‌های هوش</span></span>
            <span className="line"><span style={{ '--i': 2 } as React.CSSProperties}>مصنوعی را</span></span>
            <span className="line"><span style={{ '--i': 3 } as React.CSSProperties}>می‌سازم.</span></span>
          </h1>
          <div className="hero-foot">
            <p className="sub">
              <L
                en="MCP servers, agentic automation and open-source fixes across JavaScript, Python, Go and Rust."
                fa="سرورهای MCP، اتوماسیون عاملی و رفع باگ‌های متن‌باز در JavaScript، Python، Go و Rust."
              />
            </p>
            <div className="ctas">
              <a className="btn solid" href={`mailto:${EMAIL}`}><L en="Email ↗" fa="ایمیل ↗" /></a>
              <a className="btn" href="https://github.com/allocsys" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <L en={<a className="btn" href={RESUME} target="_blank" rel="noopener noreferrer">Résumé ↓</a>} fa={<a className="btn" href={RESUME_FA} target="_blank" rel="noopener noreferrer">رزومه ↓</a>} />
              <a className="btn" href={VISUAL} target="_blank" rel="noopener noreferrer"><L en="Visual Résumé ↗" fa="رزومه تصویری ↗" /></a>
            </div>
          </div>
        </section>

        <div className="band">
          <Band />
          <Band reverse outline />
        </div>

        <div className="wrap">
          <section id="about">
            <Head n="01" title={<L en="About" fa="درباره من" />} />
            <ScrubText className="about l-en" text={about} />
            <ScrubText className="about l-fa" text={aboutFa} />
            <dl className="stats">
              {[
                [projects.length, 'Projects shipped', 'پروژه عرضه‌شده'],
                [contributions.length, 'Open-source repos', 'مخزن متن‌باز'],
                [languages.length, 'Languages', 'زبان برنامه‌نویسی'],
              ].map(([v, l, f], i) => (
                <Drift key={l} from={10 + i * 30} to={-10 - i * 30}>
                  <dt className="stat-n"><CountUp to={v as number} /></dt>
                  <dd className="mono"><L en={l} fa={f} /></dd>
                </Drift>
              ))}
            </dl>
          </section>
        </div>

        <ScrollWords top="MCP servers · AI agents · automation" bottom="Open source · TypeScript · Go · Rust" />

        <div className="wrap">
          <section id="projects">
            <Head n="02" title={<L en="Work" fa="پروژه‌ها" />} />
            <div className="stack">
              {projects.map((p, i) => (
                <StackCard
                  key={p.name}
                  slot={i}
                  index={num(i)}
                  title={p.name}
                  meta={<L en={p.stack} fa={projectsFa[p.name]?.stack ?? p.stack} />}
                  defaultOpen={p.expanded}
                  lead={<L en={<RichText text={p.bullets[0]} />} fa={<RichText text={projectsFa[p.name]?.bullets[0] ?? p.bullets[0]} />} />}
                  more={
                    p.bullets.length > 1 ? (
                      <>
                        <ul className="l-en">
                          {p.bullets.slice(1).map((b) => (
                            <li key={b}><RichText text={b} /></li>
                          ))}
                        </ul>
                        <ul className="l-fa" lang="fa" dir="rtl">
                          {p.bullets.slice(1).map((b, k) => (
                            <li key={b}><RichText text={projectsFa[p.name]?.bullets[k + 1] ?? b} /></li>
                          ))}
                        </ul>
                      </>
                    ) : undefined
                  }
                  link={
                    p.repo ? (
                      <p className="more"><a href={p.repo} target="_blank" rel="noopener noreferrer"><L en="View repository ↗" fa="مشاهده مخزن ↗" /></a></p>
                    ) : undefined
                  }
                />
              ))}
            </div>
          </section>

          <section id="skills">
            <Head n="03" title={<L en="Skills" fa="مهارت‌ها" />} />
            <PinnedSkills items={skills} titlesFa={skillsFa} />
          </section>

          <section id="open-source">
            <Head n="04" title={<L en="Open source" fa="متن‌باز" />} />
            <p className="lede reveal"><L en="Fixes to widely used infrastructure projects. Select a row for details." fa="رفع باگ در پروژه‌های زیرساختی پرکاربرد. برای دیدن جزئیات، یک ردیف را انتخاب کنید." /></p>
            {contributions.map((c, i) => (
              <IndexRow key={c.name} index={num(i)} title={c.name} meta={<L en={c.what} fa={contributionsFa[c.name]?.what ?? c.what} />} tag={<L en={c.status} fa={contributionsFa[c.name]?.status ?? c.status} />} merged={c.merged}>
                <ul className="l-en">
                  {c.bullets.map((b) => (
                    <li key={b}><RichText text={b} /></li>
                  ))}
                </ul>
                <ul className="l-fa" lang="fa" dir="rtl">
                  {c.bullets.map((b, k) => (
                    <li key={b}><RichText text={contributionsFa[c.name]?.bullets[k] ?? b} /></li>
                  ))}
                </ul>
                {c.pr && (
                  <p className="more"><a href={c.pr} target="_blank" rel="noopener noreferrer"><L en="View pull request ↗" fa="مشاهده درخواست ادغام ↗" /></a></p>
                )}
              </IndexRow>
            ))}
          </section>

          <section id="activity">
            <Head n="05" title={<L en="Activity" fa="فعالیت" />} />
            <Activity />
          </section>

          <section id="contact">
            <Head n="06" title={<L en="Contact" fa="تماس" />} />
            <a className="mega reveal" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p className="ctas">
              <a className="btn" href="https://github.com/allocsys" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <L en={<a className="btn" href={RESUME} target="_blank" rel="noopener noreferrer">Résumé ↓</a>} fa={<a className="btn" href={RESUME_FA} target="_blank" rel="noopener noreferrer">رزومه ↓</a>} />
              <a className="btn" href={VISUAL} target="_blank" rel="noopener noreferrer"><L en="Visual Résumé ↗" fa="رزومه تصویری ↗" /></a>
            </p>
          </section>
        </div>
      </main>
      <footer className="foot">
        <p className="mono">
          <span>$</span> <i className="caret" />
        </p>
        <p>
          <L en={`Last updated ${updated}.`} fa={`آخرین به‌روزرسانی: ${updated}.`} />{' '}
          <a href="https://github.com/allocsys/allocsys" target="_blank" rel="noopener noreferrer"><L en="Source on GitHub" fa="کد منبع در GitHub" /></a>
        </p>
      </footer>
    </>
  );
}
