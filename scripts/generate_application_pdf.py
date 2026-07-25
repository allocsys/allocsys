#!/usr/bin/env python3
"""
generate_application_pdf.py

Generates a one-page, fillable (AcroForm) PDF cover letter/application from
plain-text config below. Fields (name, contact, portfolio link, rate) are
real PDF form fields the recipient -- or you -- can click into and edit in
any PDF reader (Preview, Acrobat, Chrome), no re-typing the letter required.

Usage:
    pip install reportlab
    python3 generate_application_pdf.py

Edit the CONFIG block below for a new application. No personal info is
hardcoded here on purpose -- fill in your own before generating.
"""

import textwrap
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor

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

SIGNOFF_NAME = ""     # leave blank to keep the signature line blank/fillable
SIGNOFF_CONTACT = ""
# ---------------------------------------------------------------------------

WIDTH, HEIGHT = letter
LEFT = 72
RIGHT = WIDTH - 72
TOP = HEIGHT - 72

DARK = HexColor("#1a1a1a")
GRAY = HexColor("#555555")
ACCENT = HexColor("#2b5fa8")
FIELD_BG = HexColor("#f2f6fb")
FIELD_BORDER = HexColor("#a9c2e0")

c = canvas.Canvas(OUT, pagesize=letter)
form = c.acroForm
y = TOP


def wrap_draw(text, x, y, font="Helvetica", size=10.5, leading=14.5, width=RIGHT - LEFT, color=DARK):
    c.setFont(font, size)
    c.setFillColor(color)
    max_chars = int(width / (size * 0.52))
    lines = textwrap.wrap(text, max_chars)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def field(name, x, y, w, h=16, value="", tooltip="", multiline=False):
    form.textfield(
        name=name,
        tooltip=tooltip,
        x=x, y=y, width=w, height=h,
        borderStyle="underlined",
        borderColor=FIELD_BORDER,
        fillColor=FIELD_BG,
        textColor=DARK,
        fontSize=10,
        value=value,
        forceBorder=True,
        fieldFlags="multiline" if multiline else "doNotScroll",
    )


# ---- Header ----
c.setFont("Helvetica-Bold", 16)
c.setFillColor(DARK)
c.drawString(LEFT, y, HEADER_TITLE)
y -= 26

# Name / contact / links as fillable fields, top of letter
c.setFont("Helvetica", 9.5)
c.setFillColor(GRAY)
c.drawString(LEFT, y, "Name:")
field("name", LEFT + 42, y - 4, 160, value=NAME_VALUE)
c.drawString(LEFT + 220, y, "Email / Phone:")
field("contact", LEFT + 310, y - 4, 172, value=CONTACT_VALUE)
y -= 24
c.drawString(LEFT, y, "LinkedIn / Portfolio:")
field("links", LEFT + 118, y - 4, 364, value=LINKS_VALUE)
y -= 30

c.setStrokeColor(HexColor("#dddddd"))
c.line(LEFT, y, RIGHT, y)
y -= 22

# ---- Subject ----
c.setFont("Helvetica-Bold", 11)
c.setFillColor(ACCENT)
c.drawString(LEFT, y, SUBJECT_LINE)
y -= 22

# ---- Body ----
y = wrap_draw(BODY_INTRO, LEFT, y)
y -= 8

c.setFont("Helvetica-Bold", 11)
c.setFillColor(DARK)
c.drawString(LEFT, y, PORTFOLIO_NAME)
c.setFont("Helvetica-Oblique", 9.5)
c.setFillColor(GRAY)
c.drawString(LEFT + 12 + c.stringWidth(PORTFOLIO_NAME, "Helvetica-Bold", 11), y, PORTFOLIO_LINK)
y -= 18

for b in BULLETS:
    c.setFont("Helvetica", 10.5)
    c.setFillColor(DARK)
    c.drawString(LEFT + 12, y, "\u2022")
    y = wrap_draw(b, LEFT + 24, y, width=RIGHT - LEFT - 24)
    y -= 4
y -= 4

y = wrap_draw(BODY_MID, LEFT, y)
y -= 8

y = wrap_draw(BODY_SKILLS_MATCH, LEFT, y)
y -= 8

y = wrap_draw(BODY_CLOSING, LEFT, y)
y -= 14

# ---- Rate field ----
c.setFont("Helvetica-Bold", 10.5)
c.setFillColor(DARK)
c.drawString(LEFT, y, "Rough estimate:")
y -= 18
field("estimate", LEFT, y - 30, RIGHT - LEFT, h=34, multiline=True, value=ESTIMATE_VALUE)
y -= 40

# ---- Closing ----
c.setFont("Helvetica", 10.5)
c.setFillColor(DARK)
c.drawString(LEFT, y, "Best,")
y -= 16
if SIGNOFF_NAME:
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(LEFT, y, SIGNOFF_NAME)
    y -= 15
if SIGNOFF_CONTACT:
    c.setFont("Helvetica", 10.5)
    c.setFillColor(GRAY)
    c.drawString(LEFT, y, SIGNOFF_CONTACT)
    y -= 15

c.showPage()
c.save()
print(f"Saved {OUT}")
