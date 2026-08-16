#!/usr/bin/env python3
"""
generate_resume.py

Renders resume.pdf from an HTML/CSS template (templates/resume.html.j2 +
templates/style.css) using Jinja2 + WeasyPrint, instead of hand-placing text
with reportlab's canvas.

Content lives in data/resume_data.py, separate from layout -- edit the data
file for a content change, edit templates/style.css for a look change.

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


def main():
    from data.resume_data import RESUME

    env = Environment(loader=FileSystemLoader(TEMPLATES))
    template = env.get_template("resume.html.j2")
    html = template.render(**RESUME)

    HTML(string=html, base_url=str(TEMPLATES)).write_pdf(OUT)
    print(f"Saved {OUT}")


if __name__ == "__main__":
    main()
