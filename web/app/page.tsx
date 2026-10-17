import { about, contributions, projects, skills, updated } from '@/data/site';
import OssRow from '@/components/OssRow';
import ProjectEntry from '@/components/ProjectEntry';
import PromptHeading from '@/components/PromptHeading';
import SideNav from '@/components/SideNav';
import TerminalHero from '@/components/TerminalHero';

const METRICS = 'https://raw.githubusercontent.com/allocsys/allocsys/main/github-metrics';

export default function Page() {
  return (
    <>
      <TerminalHero />
      <div className="layout">
        <SideNav />
        <main>
          <section id="about">
            <PromptHeading>cat about.txt</PromptHeading>
            <p className="about">{about}</p>
          </section>

          <section id="projects">
            <PromptHeading>ls projects/</PromptHeading>
            {projects.map((p) => (
              <ProjectEntry key={p.name} project={p} />
            ))}
          </section>

          <section id="open-source">
            <PromptHeading>git log open-source/</PromptHeading>
            <p className="note">Fixes to widely used infrastructure projects. Select a row for details.</p>
            {contributions.map((c) => (
              <OssRow key={c.name} item={c} />
            ))}
          </section>

          <section id="skills">
            <PromptHeading>cat skills.txt</PromptHeading>
            <dl className="skills">
              {skills.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="activity">
            <PromptHeading>stats --activity</PromptHeading>
            <picture>
              <source media="(prefers-color-scheme: dark)" srcSet={`${METRICS}-dark.svg`} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="metrics" src={`${METRICS}.svg`} alt="GitHub activity metrics" loading="lazy" />
            </picture>
            <p className="note">Aggregate stats across public and private repositories.</p>
          </section>

          <footer>
            Last updated {updated}.{' '}
            <a href="https://github.com/allocsys/allocsys" target="_blank" rel="noopener noreferrer">
              Source on GitHub
            </a>
          </footer>
        </main>
      </div>
    </>
  );
}
