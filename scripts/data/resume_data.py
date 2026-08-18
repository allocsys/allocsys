"""
Structured content for resume.pdf. Edit this file to update the resume --
layout/styling lives in templates/resume.html.j2 and templates/style.css,
not here.
"""

RESUME = {
    "name": "allocsys",
    "role": "Backend Developer — APIs, Infra & AI-Agent Tooling",
    "email": "allocsys@gmail.com",
    "github": "github.com/allocsys",
    "site": "allocsys.github.io/profile",
    "summary": (
        "Backend-focused developer who builds the infrastructure layer AI agents "
        "actually run on — auth, rate limiting, multi-service integrations — "
        "rather than just wiring prompts together. Comfortable owning a project "
        "end-to-end: designing the API surface, hardening it (timing-safe auth, "
        "IP allowlisting, proxy-aware rate limiting), and documenting the "
        "reasoning so someone else can maintain it. Recent focus: Model Context "
        "Protocol (MCP) servers and agentic workflow automation (n8n + "
        "LangChain), plus root-causing bugs in real-world open-source "
        "infrastructure."
    ),
    "projects": [
        {
            "name": "madmcp",
            "stack": "Node.js / Express · MCP server",
            "bullets": [
                "Built and deployed a single MCP server exposing ~50 tools across 5 "
                "backends (GitHub, Cloudflare D1/KV/R2/Workers, Notion, Mem0, "
                "generic fetch) to any MCP-compatible AI client.",
                "Designed the auth layer: timing-safe shared-key comparison, IP "
                "allowlisting scoped to Claude's published connector range, and "
                "per-route rate limiting, applied in the correct order so a "
                "leaked key alone can't reach the server.",
                "Handled real deployment edge cases (proxy-hop-aware client IP "
                "trust, raised body limits for large file pushes, graceful "
                "per-connector token failure) and shipped one-click deploy "
                "configs for Render and Vercel.",
            ],
        },
        {
            "name": "Agentic Email Triage & Ops Automation",
            "stack": "n8n · LangChain · RAG",
            "bullets": [
                "Designed an n8n workflow where an AI agent classifies inbound "
                "support email, grounds answers in a RAG-searched knowledge "
                "base, and drafts replies only for non-urgent cases.",
                "Built a safety boundary directly into the system prompt: "
                "escalation-worthy emails are flagged for a human and never "
                "auto-replied to — the boundary lives before generation, not as "
                "a filter after.",
                "Forced structured JSON output so downstream nodes (Sheets, "
                "CRM, LINE) route deterministically instead of parsing free "
                "text; tested against 6 representative scenarios.",
            ],
        },
        {
            "name": "cf-manager",
            "stack": "Bash · Cloudflare API v4 · Termux",
            "bullets": [
                "Built a self-contained bash script giving Cloudflare a full "
                "menu-driven admin panel (Workers deploy/rollback, "
                "KV/D1/R2/Hyperdrive) usable entirely from a phone terminal.",
                "Implemented OAuth2 + PKCE login with multi-account switching, "
                "one-tap rollback via local deploy backups, and a GitHub sync "
                "step that pushes a worker's source to a linked repo on "
                "deploy.",
            ],
        },
        {
            "name": "domap",
            "stack": "Node.js · Playwright · Browserless.io",
            "bullets": [
                "Built a headless-Chromium tool that walks a page's live DOM "
                "into a structured, selector-annotated tree, logs full network "
                "traffic, and replays recorded actions in a fresh session.",
                "Worked around Android's lack of native Playwright browser "
                "support by connecting to a remote Browserless.io session "
                "instead of a locally-launched binary.",
            ],
        },
    ],
    "contributions": [
        {
            "repo": "drizzle-team/drizzle-orm",
            "status": "3 PRs · closed, not merged",
            "bullets": [
                "Fixed a node-postgres connection-pool leak on a rejected "
                "BEGIN, a TypeScript inference bug in createSchemaFactory, and "
                "added schema validation for 6 Gel-only column types across "
                "all four schema-integration packages.",
                "All three PRs were closed unmerged; the connection-pool fix's "
                "underlying issue remains open, with an equivalent fix from "
                "another contributor pending review.",
            ],
        },
        {
            "repo": "cloudflare/workers-sdk",
            "status": "4 PRs · 1 merged, 2 closed, 1 open",
            "bullets": [
                "Root-caused a Windows-only crash from non-ASCII paths "
                "(Latin-1 header violation) across 5 call sites — merged.",
                "Fixed a false infinite-redirect-loop deploy warning — closed, "
                "not merged.",
                "Fixed local Images binding transform parity (fit/gravity/"
                "background) — original PR closed after an accidental fork "
                "deletion mid-review; restored and continued in a follow-up "
                "PR, currently open and in review.",
            ],
        },
        {
            "repo": "urllib3/urllib3",
            "status": "PR #5121 · closed (superseded)",
            "bullets": [
                "Replaced a deprecated pyOpenSSL X.509 API call with the "
                "cryptography library equivalent, with new tests for both a "
                "present and missing commonName.",
            ],
        },
    ],
    "skills": [
        ("Languages", "JavaScript / TypeScript, Node.js, Python, SQL"),
        ("Backend & APIs", "Express, REST API design, OAuth2, Rate limiting, "
                            "IP allowlisting, Webhooks"),
        ("AI / Agent Tooling", "Model Context Protocol (MCP), LangChain, "
                                "RAG / Vector DBs (Qdrant), n8n, Prompt design"),
        ("Infrastructure", "Git, Cloudflare (D1, KV, R2, Workers), "
                            "Render / Vercel, GitHub Actions CI"),
    ],
}
