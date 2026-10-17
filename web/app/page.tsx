import { about, contributions, languages, projects, skills, updated } from '@/data/site';
import Activity from '@/components/Activity';
import Header from '@/components/Header';
import IndexRow from '@/components/IndexRow';
import { CountUp, ScrubText, Spinner } from '@/components/Motion';
import RichText from '@/components/RichText';

const RESUME = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/resume.pdf`;
const EMAIL = 'allocsys@gmail.com';
const TICKER = ['MCP servers', 'TypeScript', 'Cloudflare Workers', 'Python', 'Go', 'Rust', 'n8n', 'LangChain', 'SQL', 'Bash'];
const num = (i: number) => String(i + 1).padStart(2, '0');

function Head({ n, title }: { n: string; title: string }) {
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
                <i className="dot" /> Open to work
              </p>
            </div>
            <Spinner />
          </div>
          <h1 className="display">
            <span className="line"><span style={{ '--i': 0 } as React.CSSProperties}>I build the</span></span>
            <span className="line"><span className="serif" style={{ '--i': 1 } as React.CSSProperties}>infrastructure</span></span>
            <span className="line"><span style={{ '--i': 2 } as React.CSSProperties}>AI agents</span></span>
            <span className="line"><span style={{ '--i': 3 } as React.CSSProperties}>run on.</span></span>
          </h1>
          <div className="hero-foot">
            <p className="sub">
              MCP servers, agentic automation and open-source fixes across JavaScript, Python, Go and Rust.
            </p>
            <div className="ctas">
              <a className="btn solid" href={`mailto:${EMAIL}`}>Email ↗</a>
              <a className="btn" href="https://github.com/allocsys" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a className="btn" href={RESUME} target="_blank" rel="noopener noreferrer">Résumé ↓</a>
            </div>
          </div>
        </section>

        <div className="band">
          <Band />
          <Band reverse outline />
        </div>

        <div className="wrap">
          <section id="about">
            <Head n="01" title="About" />
            <ScrubText className="about" text={about} />
            <dl className="stats">
              {[
                [projects.length, 'Projects shipped'],
                [contributions.length, 'Open-source repos'],
                [languages.length, 'Languages'],
              ].map(([v, l]) => (
                <div key={l} className="reveal">
                  <dt className="stat-n"><CountUp to={v as number} /></dt>
                  <dd className="mono">{l}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="projects">
            <Head n="02" title="Work" />
            {projects.map((p, i) => (
              <IndexRow key={p.name} index={num(i)} title={p.name} meta={p.stack} defaultOpen={p.expanded}>
                <ul>
                  {p.bullets.map((b) => (
                    <li key={b}><RichText text={b} /></li>
                  ))}
                </ul>
                {p.repo && (
                  <p className="more"><a href={p.repo} target="_blank" rel="noopener noreferrer">View repository ↗</a></p>
                )}
              </IndexRow>
            ))}
          </section>

          <section id="open-source">
            <Head n="03" title="Open source" />
            <p className="lede reveal">Fixes to widely used infrastructure projects. Select a row for details.</p>
            {contributions.map((c, i) => (
              <IndexRow key={c.name} index={num(i)} title={c.name} meta={c.what} tag={c.status} merged={c.merged}>
                <ul>
                  {c.bullets.map((b) => (
                    <li key={b}><RichText text={b} /></li>
                  ))}
                </ul>
                {c.pr && (
                  <p className="more"><a href={c.pr} target="_blank" rel="noopener noreferrer">View pull request ↗</a></p>
                )}
              </IndexRow>
            ))}
          </section>

          <section id="skills">
            <Head n="04" title="Skills" />
            <dl className="skills">
              {skills.map(([k, v]) => (
                <div key={k} className="reveal">
                  <dt className="mono">{k}</dt>
                  <dd>
                    <ul>
                      {v.split(', ').map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="activity">
            <Head n="05" title="Activity" />
            <Activity />
          </section>

          <section id="contact">
            <Head n="06" title="Contact" />
            <a className="mega reveal" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p className="ctas">
              <a className="btn" href="https://github.com/allocsys" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a className="btn" href={RESUME} target="_blank" rel="noopener noreferrer">Résumé ↓</a>
            </p>
          </section>
        </div>
      </main>
      <footer className="foot">
        <p className="mono">
          <span>$</span> <i className="caret" />
        </p>
        <p>
          Last updated {updated}.{' '}
          <a href="https://github.com/allocsys/allocsys" target="_blank" rel="noopener noreferrer">Source on GitHub</a>
        </p>
      </footer>
    </>
  );
}
