#!/usr/bin/env python3
"""
generate_application_pdf.py

Generates a one-page application/cover-letter PDF from the plain-text CONFIG
block below, rendered via templates/cover_letter.html.j2 + templates/style.css
(Jinja2 + WeasyPrint) instead of hand-placed reportlab canvas coordinates.

Note on fillable fields: the previous version used reportlab AcroForm text
fields so the PDF itself was editable after generation. This version renders
static, already-filled fields instead -- simpler, and matches how this script
is actually used (you edit CONFIG below, then regenerate). If you need a
PDF that's still editable by someone else after you send it, that's a
different feature (real AcroForm output) -- ask and it can be added back
on top of this template using pypdf/pdf-lib, layered over the rendered PDF.

Usage:
    pip install weasyprint jinja2
    python3 generate_application_pdf.py

Edit the CONFIG block below for a new application. No personal info is
hardcoded here on purpose -- fill in your own before generating.
"""

from pathlib import Path
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML

# ----------------------------- CONFIG ------------------------------------
OUT = "application.pdf"

HEADER_TITLE = "Application — [Role Title]"
SUBJECT_LINE = "Subject: Application — [Role Title]"

NAME_VALUE = ""        # e.g. "Jane Doe"
CONTACT_VALUE = ""     # e.g. "jane@example.com"
LINKS_VALUE = ""       # e.g. "github.com/yourorg/profile"

BODY_INTRO = (
    "I'm applying for the [Role Title] role. [One or two sentences on your "
    "relevant focus/approach, tailored to the listing.]"
)

PORTFOLIO_NAME = "Portfolio: [project-name]"
PORTFOLIO_LINK = "(github.com/yourorg/your-repo)"

BULLETS = [
    "[Highlight 1 -- tie directly to a required skill in the listing]",
    "[Highlight 2]",
    "[Highlight 3]",
]

BODY_MID = (
    "[Paragraph describing what's in the repo / why it's reviewable -- docs, "
    "demo mode, deploy configs, etc.]"
)

BODY_SKILLS_MATCH = (
    "This directly reflects the skills in your listing: [list them, mirroring "
    "the posting's own language where honest]."
)

BODY_CLOSING = (
    "I'd welcome the chance to [discuss / walk through requirements], as you "
    "outlined."
)

ESTIMATE_VALUE = ""  # e.g. "$50-80/hour depending on scope, or a phased fixed-price quote"

SIGNOFF_NAME = ""     # leave blank to keep the signature line blank
SIGNOFF_CONTACT = ""
# ---------------------------------------------------------------------------

HERE = Path(__file__).parent
TEMPLATES = HERE / "templates"


def main():
    env = Environment(loader=FileSystemLoader(TEMPLATES))
    template = env.get_template("cover_letter.html.j2")
    html = template.render(
        header_title=HEADER_TITLE,
        subject_line=SUBJECT_LINE,
        name_value=NAME_VALUE,
        contact_value=CONTACT_VALUE,
        links_value=LINKS_VALUE,
        body_intro=BODY_INTRO,
        portfolio_name=PORTFOLIO_NAME,
        portfolio_link=PORTFOLIO_LINK,
        bullets=BULLETS,
        body_mid=BODY_MID,
        body_skills_match=BODY_SKILLS_MATCH,
        body_closing=BODY_CLOSING,
        estimate_value=ESTIMATE_VALUE,
        signoff_name=SIGNOFF_NAME,
        signoff_contact=SIGNOFF_CONTACT,
    )

    HTML(string=html, base_url=str(TEMPLATES)).write_pdf(OUT)
    print(f"Saved {OUT}")


if __name__ == "__main__":
    main()
