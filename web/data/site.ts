// Content for the portfolio. Inline markup: `code` and [text](url).

export type Project = { name: string; stack: string; bullets: string[]; repo: string | null; expanded?: boolean };
export type Contribution = { name: string; what: string; status: string; merged: boolean; bullets: string[]; pr: string | null };

export const about = "Backend-focused developer who builds the infrastructure layer AI agents actually run on — auth, rate limiting, multi-service integrations — rather than just wiring prompts together. Comfortable owning a project end-to-end: designing the API surface, hardening it (timing-safe auth, IP allowlisting, proxy-aware rate limiting), and documenting the reasoning so someone else can maintain it. Recent focus: Model Context Protocol (MCP) servers and agentic workflow automation (n8n + LangChain), plus root-causing bugs in real-world open-source infrastructure across JavaScript, Python, Go, and Rust codebases. Ships full-stack TypeScript apps on Cloudflare Workers.";

export const languages = ["JavaScript", "TypeScript", "Python", "Go", "Rust", "SQL", "Bash"];

export const updated = "October 17, 2026";

export const projects: Project[] = [
  {
    "name": "madmcp",
    "stack": "MCP server — ~50 tools across 8 connectors: GitHub, Cloudflare, Notion, Mem0, Exa & Gemini",
    "bullets": [
      "Built and deployed an MCP server exposing ~50 tools across 8 connectors (GitHub, Cloudflare D1/KV/R2/Workers, Notion, Mem0, generic fetch, Exa, Gemini) to any MCP-compatible AI client.",
      "Designed a delegation-first architecture: one tool hands an open-ended, multi-step investigation to a second model that runs its own tool loop server-side, with Redis-backed checkpointing so a rate-limited run resumes from its last step instead of restarting.",
      "Separated tools that touch untrusted external content (web research, fetch) from those that touch internal systems (GitHub, Cloudflare, Notion), so external data can’t reach credentials.",
      "Designed the auth layer: timing-safe key comparison, IP allowlisting scoped to Claude’s connector range, and per-route rate limiting, ordered so a leaked key alone can’t get in. Handled proxy-hop IP trust, large-push body limits, and per-connector token failure; PR-based workflow with GitHub Actions CI, vitest and supertest."
    ],
    "repo": "https://github.com/allocsys/madmcp"
  },
  {
    "name": "proetsy",
    "stack": "Node.js · React · SQLite · Electron · Playwright",
    "bullets": [
      "Built a local-first pipeline that turns artwork into ready-to-paste Etsy listings and mockups: optional image analysis, listing generation, PSD-template mockups, and a human-in-the-loop review step (publishing stays manual by design).",
      "Built an LLM provider layer with Gemini primary and Claude fallback, key store, queue and rate limits, plus an embedding-based taste filter in pure JS/WASM (runs on Termux).",
      "Tested every module (unit, idempotency, route-level integration) and added Playwright E2E against a deterministic fixture LLM; shipped a CI-verified Electron Windows installer."
    ],
    "repo": "https://github.com/allocsys/proetsy"
  },
  {
    "name": "news-market-ai",
    "stack": "Cloudflare Workers · D1 · KV · Gemini · Next.js",
    "bullets": [
      "Built a news-to-trade-signal pipeline: ingestion from free sources and custom scrapers, multi-agent LLM analysis, and signal generation, designed around free-tier Worker limits.",
      "Wrote a point-in-time backtester and documented rollout gates (backtest → paper → micro-live); live trading is deliberately off.",
      "Built a multi-key Gemini model-cascade client with KV cooldown state, and a mobile-friendly Next.js 16 ops dashboard served as a Worker with login and a session-gated API."
    ],
    "repo": "https://github.com/allocsys/news-market-ai"
  },
  {
    "name": "ai-campaign-builder",
    "stack": "TypeScript · React · Cloudflare Workers · D1",
    "bullets": [
      "Built a monorepo where a business owner states a goal and an AI agent generates a loyalty or gamification campaign. Apps: owner dashboard, customer app, staff POS, review console, public microsites, and a backend API.",
      "Shared api-client, UI-kit and campaign-editor packages; JWT auth, D1 migrations, Vitest tests, and CI deploys that provision D1 and KV automatically."
    ],
    "repo": "https://github.com/allocsys/ai-campaign-builder"
  },
  {
    "name": "peakplast",
    "stack": "Cloudflare Workers · Telegram · Gemini · Zarinpal",
    "bullets": [
      "Built and run a production Telegram ordering bot: Gemini voice-order extraction with multi-key fallback, Zarinpal payment links and verification, an admin panel, and a REST API.",
      "Handled concurrency and abuse (per-chat locking, voice flood limits, address de-duplication). Planning and executing a safe split of the ~7,000-line single-file Worker into ES modules, one verified, deployable step at a time."
    ],
    "repo": "https://github.com/allocsys/peakplast"
  },
  {
    "name": "clothes-shop",
    "stack": "Next.js · TypeScript · Tailwind CSS · RTL",
    "bullets": [
      "Built the front-end of a Persian (right-to-left) online clothing shop: home, shop, product, cart, account and content pages, with a mobile tab bar and configurable site, theme and product data. Backend, checkout and payments are planned next."
    ],
    "repo": "https://github.com/allocsys/clothes-shop"
  },
  {
    "name": "Agentic Email Triage & Ops Automation",
    "stack": "n8n workflow — LLM agent with RAG and CRM/Sheets/LINE routing",
    "bullets": [
      "Designed an n8n workflow where an AI agent classifies inbound email across Gmail, Telegram and WhatsApp, answers from a RAG knowledge base, and drafts replies only for non-urgent cases.",
      "Put the safety boundary in the system prompt: escalation-worthy emails are flagged for a human and never auto-replied to. Used an OpenAI → Gemini → Claude fallback chain and forced JSON output so Sheets, CRM and LINE nodes route deterministically; tested on 6 scenarios."
    ],
    "repo": "https://github.com/allocsys/n8n-agentic-ops"
  },
  {
    "name": "Developer tools (Termux / Android)",
    "stack": "Bash · Node.js · Playwright · Android",
    "bullets": [
      "[cf-manager](https://github.com/allocsys/cfmanager): menu-driven Cloudflare admin panel in one bash script: Workers deploy/rollback, KV/D1/R2/Hyperdrive, OAuth2 + PKCE with multi-account switching, GitHub sync.",
      "[logger](https://github.com/allocsys/logger) (DOM mapper): maps a live DOM, network traffic and replayable actions via remote Browserless.io, working around Playwright’s lack of Android support.",
      "[ezgit](https://github.com/allocsys/ezgit) (Git helper that redacts secrets before diffs reach an LLM) and [openhands-android-client](https://github.com/allocsys/openhands-android-client) (native client for OpenHands coding agents)."
    ],
    "repo": null,
    "expanded": true
  }
];

export const contributions: Contribution[] = [
  {
    "name": "grafana/alloy",
    "what": "Stop a legacy Promtail positions file read-error from silently re-ingesting an entire log stream",
    "status": "PR #6750 · merged",
    "merged": true,
    "bullets": [
      "Root-caused a silent-failure bug in `loki.source.file` / `loki.source.journal`: when a legacy Promtail positions file existed but couldn't be read (e.g. a permissions error), the reader returned `nil` — indistinguishable from \"file doesn't exist\" — so the component silently re-tailed and re-ingested every log from the beginning instead of failing loudly.",
      "Changed the reader to return `(*LegacyFile, error)` so a genuine I/O error now propagates up as a loud failure at component construction, while still correctly treating a missing file as non-fatal and malformed YAML as non-fatal."
    ],
    "pr": "https://github.com/grafana/alloy/pull/6750"
  },
  {
    "name": "cloudflare/workers-sdk",
    "what": "Windows path-encoding crash and local Images binding parity",
    "status": "2 PRs · 1 merged, 1 open",
    "merged": true,
    "bullets": [
      "Root-caused a Windows-only crash from non-ASCII paths (Latin-1 header violation) across 5 call sites, verified with a Windows CI run against a real `開発`-path repro. ([PR #14713](https://github.com/cloudflare/workers-sdk/pull/14713) · merged)",
      "Fixed local Images binding transform parity (`fit`/`gravity`/`background`) with production. Open and in review. ([PR #14810](https://github.com/cloudflare/workers-sdk/pull/14810) · open)"
    ],
    "pr": null
  },
  {
    "name": "transact-rs/sqlx",
    "what": "Make the Any driver emit $N placeholders on Postgres (issue #3000)",
    "status": "PR #4351 · open",
    "merged": false,
    "bullets": [
      "Fixed the Any driver emitting `?` placeholders on Postgres by adding a SQL-aware rewrite to `$N` that skips string literals, quoted identifiers, dollar-quoted strings, and comments, applied on the Postgres path only so MySQL and SQLite are unaffected. CI passes on the fork."
    ],
    "pr": "https://github.com/transact-rs/sqlx/pull/4351"
  },
  {
    "name": "release-plz/release-plz",
    "what": "Skip a slower, occasionally-failing cargo metadata call when a faster path is already safe",
    "status": "PR #2954 · open",
    "merged": false,
    "bullets": [
      "Found that the package-file comparison logic only took the fast, direct disk-listing path when two separate conditions both held, so registry-extracted packages unnecessarily fell back to a slower `cargo package --list` call.",
      "Relaxed the condition to trigger the fast path whenever a `Cargo.toml.orig` / `.orig.orig` marker is present, while still correctly excluding `.git`, `.cargo-ok`, and `Cargo.lock` from the comparison."
    ],
    "pr": "https://github.com/release-plz/release-plz/pull/2954"
  },
  {
    "name": "anthropics/skills",
    "what": "Parser correctness, a safety-check gap, and dependency/compatibility fixes across the pdf, xlsx, docx & skill-creator skills",
    "status": "4 PRs · open",
    "merged": false,
    "bullets": [
      "Fixed a PDF form-field parser that assumed every choice-field `/Opt` entry was an `[export_value, display_text]` pair per spec — a bare single-character string (e.g. `\"Red\"`) got silently split into `value=\"R\", text=\"e\"`, or crashed outright. ([PR #1474](https://github.com/anthropics/skills/pull/1474))",
      "Fixed a case-sensitivity gap in the xlsx skill's external-link safety check: the regex meant to catch cached external links before recalculation missed case-mismatched formula references entirely, since it wasn't compiled with `IGNORECASE`. ([PR #1471](https://github.com/anthropics/skills/pull/1471))",
      "Fixed a Python 3.9 import crash in the docx skill (an eager PEP 604 union annotation evaluated at import time) and documented the actual Python 3.10+ / `defusedxml` requirement instead of leaving it undeclared. ([PR #1473](https://github.com/anthropics/skills/pull/1473))",
      "Declared a missing PyYAML dependency for the skill-creator validator script, which failed with `ModuleNotFoundError` on a clean environment. ([PR #1472](https://github.com/anthropics/skills/pull/1472))"
    ],
    "pr": null
  }
];

export const skills: [string, string][] = [
  [
    "Languages",
    "JavaScript / TypeScript, Node.js, Python, SQL, Bash, Go, Rust"
  ],
  [
    "Backend & APIs",
    "Express, REST API design, OAuth2, Rate limiting, IP allowlisting, JWT / PKCE, Webhooks, React / Next.js, Tailwind, Electron"
  ],
  [
    "AI / Agent Tooling",
    "Model Context Protocol (MCP), LangChain, RAG / Vector DBs (Qdrant), n8n, Multi-provider LLM fallback, Structured output, Prompt design"
  ],
  [
    "Infrastructure & Tools",
    "Git, Cloudflare (D1, KV, R2, Workers, Hyperdrive), Redis, SQLite, Render / Vercel, CI (GitHub Actions), Vitest / Playwright, Termux / Android"
  ]
];
