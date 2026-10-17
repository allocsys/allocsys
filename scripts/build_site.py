#!/usr/bin/env python3
"""
build_site.py

Renders ../index.html from data/site_data.json (content) plus
templates/site_head.html (meta tags) and templates/site.css (styles).
Edit the JSON for content, the CSS for looks, then run:

    python3 build_site.py

Standard library only. Keep data/resume_data.py (the PDF resume) in sync by hand.
"""
import json
from pathlib import Path

HERE = Path(__file__).parent
OUT = HERE.parent / "index.html"
D = json.loads((HERE / "data/site_data.json").read_text(encoding="utf-8"))
HEAD = (HERE / "templates/site_head.html").read_text(encoding="utf-8")
CSS = (HERE / "templates/site.css").read_text(encoding="utf-8")


def project(p):
    b = p["bullets"]
    # Entries whose bullets each carry their own links stay fully visible.
    if p.get("expanded"):
        body = "<ul class=\"all\">" + "".join(f"<li>{x}</li>" for x in b) + "</ul>"
        return (f'<article class="entry"><h3>{p["name"]}</h3>'
                f'<p class="stack">{p["stack"]}</p>{body}</article>')
    more = ""
    if len(b) > 1 or p.get("repo"):
        link = (f'<p class="repo"><a href="{p["repo"]}" target="_blank" rel="noopener">'
                f'View repository</a></p>') if p.get("repo") else ""
        items = "".join(f"<li>{x}</li>" for x in b[1:])
        more = f"<details><summary>More detail</summary><ul>{items}</ul>{link}</details>"
    return (f'<article class="entry"><h3>{p["name"]}</h3><p class="stack">{p["stack"]}</p>'
            f'<p class="lead">{b[0]}</p>{more}</article>')


def contribution(c):
    cls = "merged" if "merged" in c["status"].lower() else "open"
    link = (f'<p class="repo"><a href="{c["pr"]}" target="_blank" rel="noopener">'
            f'View pull request</a></p>') if c.get("pr") else ""
    items = "".join(f"<li>{x}</li>" for x in c["bullets"])
    return (f'<details class="oss"><summary><span class="oss-name">{c["name"]}</span>'
            f'<span class="oss-what">{c["what"]}</span>'
            f'<span class="oss-status {cls}">{c["status"]}</span></summary>'
            f'<ul>{items}</ul>{link}</details>')


langs = "".join(f'<span>{x}</span>' for x in D["languages"])
skills = "".join(f"<div><dt>{k}</dt><dd>{v}</dd></div>" for k, v in D["skills"])

page = HEAD + f'''<meta name="color-scheme" content="dark light">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
{CSS}</style>
</head>
<body>
<header class="hero">
  <div class="terminal">
    <div class="term-bar">
      <span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span>
      <span class="term-title">allocsys@allocsys: ~</span>
    </div>
    <div class="term-body">
      <p class="line l1"><span class="prompt">$</span>whoami</p>
      <h1 class="out name l1">allocsys</h1>
      <p class="line l2"><span class="prompt">$</span>cat role.txt</p>
      <p class="out role l2">Backend Developer — APIs, infra &amp; AI-agent tooling</p>
      <p class="line l3"><span class="prompt">$</span>cat languages.txt</p>
      <p class="out langs l3">{langs}</p>
      <p class="line l4"><span class="prompt">$</span>ls --contact</p>
      <p class="out flags l4">
        <a href="mailto:allocsys@gmail.com">--email</a>
        <a href="https://github.com/allocsys" target="_blank" rel="noopener">--github</a>
        <a href="resume.pdf" target="_blank" rel="noopener">--resume</a>
        <span class="avail"><span class="dot"></span>open to work</span>
      </p>
      <p class="line l5"><span class="prompt">$</span><span class="cursor">▌</span></p>
    </div>
  </div>
</header>
<div class="layout">
  <aside class="side">
    <a class="btn" href="resume.pdf" target="_blank" rel="noopener">Download resume (PDF)</a>
    <nav aria-label="Sections">
      <a href="#about">About</a><a href="#projects">Projects</a><a href="#open-source">Open source</a><a href="#skills">Skills</a><a href="#activity">Activity</a>
    </nav>
  </aside>
  <main>
    <section id="about"><h2><span class="prompt">$</span>cat about.txt</h2><p class="about">{D["about"]}</p></section>
    <section id="projects"><h2><span class="prompt">$</span>ls projects/</h2>{"".join(project(p) for p in D["projects"])}</section>
    <section id="open-source"><h2><span class="prompt">$</span>git log open-source/</h2><p class="note">Fixes to widely used infrastructure projects. Select a row for details.</p>{"".join(contribution(c) for c in D["contributions"])}</section>
    <section id="skills"><h2><span class="prompt">$</span>cat skills.txt</h2><dl class="skills">{skills}</dl></section>
    <section id="activity"><h2><span class="prompt">$</span>stats --activity</h2>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/allocsys/allocsys/main/github-metrics-dark.svg"/>
        <img class="metrics" src="https://raw.githubusercontent.com/allocsys/allocsys/main/github-metrics.svg" alt="GitHub activity metrics" />
      </picture>
      <p class="note">Aggregate stats across public and private repositories.</p>
    </section>
    <footer>Last updated {D["updated"]}. <a href="https://github.com/allocsys/allocsys">Source on GitHub</a></footer>
  </main>
</div>
</body>
</html>
'''
OUT.write_text(page, encoding="utf-8")
print(f"Saved {OUT}")
