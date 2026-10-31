#!/usr/bin/env python3
"""
generate_resume.py

Renders resume.pdf (English) and resume-fa.pdf (Persian, RTL) from HTML/CSS
templates (templates/resume.html.j2, templates/resume_fa.html.j2 +
templates/style.css, templates/style_fa.css) using Jinja2 + WeasyPrint,
instead of hand-placing text with reportlab's canvas.

Content lives in data/resume_data.py (English) and data/resume_data_fa.py
(Persian), separate from layout -- edit the data files for a content change,
edit the CSS for a look change.

Usage:
    pip install weasyprint jinja2
    python3 generate_resume.py
"""

from pathlib import Path
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML

HERE = Path(__file__).parent
TEMPLATES = HERE / "templates"
OUT = HERE.parent / "resume.pdf"  # repo root, matching the existing file
OUT_FA = HERE.parent / "resume-fa.pdf"


def main():
    from data.resume_data import RESUME

    env = Environment(loader=FileSystemLoader(TEMPLATES))
    template = env.get_template("resume.html.j2")
    html = template.render(**RESUME)

    HTML(string=html, base_url=str(TEMPLATES)).write_pdf(OUT)
    print(f"Saved {OUT}")

    from data.resume_data_fa import RESUME_FA

    html_fa = env.get_template("resume_fa.html.j2").render(**RESUME_FA)
    HTML(string=html_fa, base_url=str(TEMPLATES)).write_pdf(OUT_FA)
    print(f"Saved {OUT_FA}")


if __name__ == "__main__":
    main()
