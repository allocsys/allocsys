"""
Persian (RTL) content for resume-fa.pdf. Same shape as resume_data.py plus a
"labels" block for section headings and the page footer. Technical terms,
product names and repo names stay in English on purpose.
"""

RESUME_FA = {
    "labels": {
        "title": "رزومه",
        "summary": "خلاصه",
        "projects": "پروژه‌ها",
        "contributions": "مشارکت‌های متن‌باز",
        "skills": "مهارت‌ها",
        "footer": "allocsys · رزومه · صفحهٔ ",
    },
    "name": "allocsys",
    "role": "توسعه‌دهندهٔ بک‌اند — API، زیرساخت و ابزارهای عامل‌های هوش مصنوعی",
    "email": "allocsys@gmail.com",
    "github": "github.com/allocsys",
    "site": "allocsys.github.io/allocsys",
    "summary": (
        "من توسعه‌دهندهٔ بک‌اندی هستم که لایهٔ زیرساختی را می‌سازم که "
        "عامل‌های هوش مصنوعی واقعاً روی آن اجرا می‌شوند — احراز هویت، "
        "محدودسازی نرخ و یکپارچه‌سازی چندسرویسی — نه اینکه فقط پرامپت‌ها را به "
        "هم وصل کنم. می‌توانم مالکیت یک پروژه را از ابتدا تا انتها بر عهده "
        "بگیرم: طراحی سطح API، مستحکم‌سازی آن (احراز هویت ایمن در برابر حملهٔ "
        "زمانی، فهرست مجاز IP و محدودسازی نرخ با درنظرگرفتن پروکسی) و "
        "مستندسازی استدلال‌ها تا دیگری بتواند آن را نگهداری کند. تمرکز اخیرم: "
        "سرورهای Model Context Protocol (MCP) و اتوماسیون گردش‌کار عاملی "
        "(n8n + LangChain)، و همچنین ریشه‌یابی باگ در زیرساخت‌های متن‌باز "
        "واقعی در کدبیس‌های JavaScript، Python، Go و Rust. اپلیکیشن‌های "
        "فول‌استک TypeScript را روی Cloudflare Workers عرضه می‌کنم."
    ),
    "projects": [
        {
            "name": "madmcp",
            "stack": "Node.js / Express · MCP server · Redis",
            "bullets": [
                "یک سرور MCP ساختم و مستقر کردم که حدود ۵۰ ابزار را در ۸ "
                "اتصال‌دهنده (GitHub، Cloudflare D1/KV/R2/Workers، Notion، "
                "Mem0، fetch عمومی، Exa و Gemini) در اختیار هر کلاینت هوش "
                "مصنوعی سازگار با MCP قرار می‌دهد.",
                "معماری «واگذاری‌محور» طراحی کردم: یک ابزار، بررسی باز و "
                "چندمرحله‌ای را به مدل دومی می‌سپارد که حلقهٔ ابزار خودش را "
                "سمت سرور اجرا می‌کند، و با checkpoint مبتنی بر Redis، اجرایی "
                "که به محدودیت نرخ خورده از آخرین گام ادامه می‌دهد و از اول "
                "شروع نمی‌شود.",
                "ابزارهایی که با محتوای خارجی نامطمئن سروکار دارند (پژوهش وب، "
                "fetch) را از ابزارهای سیستم‌های داخلی (GitHub، Cloudflare، "
                "Notion) جدا کردم تا داده‌های خارجی هرگز به اعتبارنامه‌ها "
                "دسترسی پیدا نکنند.",
                "لایهٔ احراز هویت را طراحی کردم: مقایسهٔ کلید ایمن در برابر "
                "حملهٔ زمانی، فهرست مجاز IP محدود به بازهٔ اتصال‌دهندهٔ Claude و "
                "محدودسازی نرخ برای هر مسیر، با ترتیبی که نشت یک کلید "
                "به‌تنهایی برای ورود کافی نباشد. اعتماد به IP در پروکسی‌های "
                "میانی، محدودیت حجم بدنه در push‌های بزرگ و خرابی توکن هر "
                "اتصال‌دهنده را مدیریت کردم؛ گردش‌کار مبتنی بر PR با CI در "
                "GitHub Actions، vitest و supertest.",
            ],
        },
        {
            "name": "proetsy",
            "stack": "Node.js · React · SQLite · Electron · Playwright",
            "bullets": [
                "پایپ‌لاینی محلی‌محوری ساختم که آثار هنری را به لیستینگ‌های "
                "آمادهٔ Etsy و موکاپ تبدیل می‌کند: تحلیل اختیاری تصویر، تولید "
                "لیستینگ، موکاپ از قالب‌های PSD و مرحلهٔ بازبینی انسانی "
                "(انتشار عمداً دستی می‌ماند).",
                "لایهٔ ارائه‌دهندهٔ LLM ساختم با Gemini به‌عنوان اصلی و Claude "
                "به‌عنوان جایگزین، مخزن کلید، صف و محدودیت نرخ، به‌علاوهٔ "
                "فیلتر سلیقهٔ مبتنی بر embedding با JS/WASM خالص (قابل اجرا "
                "روی Termux).",
                "هر ماژول را تست کردم (واحد، idempotency، یکپارچگی در سطح "
                "مسیر) و E2E با Playwright روی یک LLM ساختگیِ قطعی افزودم؛ "
                "نصب‌کنندهٔ Electron برای ویندوز را با تأیید CI عرضه کردم.",
            ],
        },
        {
            "name": "news-market-ai",
            "stack": "Cloudflare Workers · D1 · KV · Gemini · Next.js",
            "bullets": [
                "یک پایپ‌لاین تبدیل خبر به سیگنال معاملاتی ساختم: دریافت از منابع "
                "رایگان و اسکرپرهای سفارشی، تحلیل چندعاملی با LLM و تولید "
                "سیگنال، متناسب با محدودیت‌های سطح رایگان Workerها.",
                "بک‌تستر «نقطه‌ای در زمان» نوشتم و دروازه‌های استقرار را مستند "
                "کردم (بک‌تست ← معاملهٔ کاغذی ← زندهٔ خُرد)؛ معاملهٔ زنده "
                "عمداً خاموش است.",
                "کلاینت آبشاری مدل Gemini با چند کلید و وضعیت cooldown در KV "
                "ساختم، و داشبورد عملیاتی Next.js 16 سازگار با موبایل که "
                "به‌صورت Worker با ورود و API محافظت‌شده با نشست ارائه می‌شود.",
            ],
        },
        {
            "name": "ai-campaign-builder",
            "stack": "TypeScript · React · Cloudflare Workers · D1",
            "bullets": [
                "مونوریپویی ساختم که در آن صاحب کسب‌وکار هدفش را می‌گوید و یک "
                "عامل هوش مصنوعی کمپین وفاداری یا بازی‌وارسازی تولید می‌کند. "
                "اپ‌ها: داشبورد مالک، اپ مشتری، POS کارکنان، کنسول بازبینی، "
                "میکروسایت‌های عمومی و API بک‌اند.",
                "پکیج‌های مشترک api-client، UI-kit و campaign-editor؛ احراز "
                "هویت JWT، مایگریشن‌های D1، تست‌های Vitest و استقرار CI که D1 "
                "و KV را خودکار آماده می‌کند.",
            ],
        },
        {
            "name": "peakplast",
            "stack": "Cloudflare Workers · Telegram · Gemini · Zarinpal",
            "bullets": [
                "یک ربات سفارش تلگرامی را در محیط تولید ساخته‌ام و اجرا "
                "می‌کنم: استخراج سفارش صوتی با Gemini و جایگزینی چندکلیدی، "
                "لینک پرداخت و تأیید زرین‌پال، پنل مدیریت و REST API.",
                "همزمانی و سوءاستفاده را مدیریت کردم (قفل هر چت، محدودیت "
                "سیل پیام). در حال تقسیم Worker تک‌فایلِ حدود ۷٬۰۰۰ خطی به "
                "ماژول‌های ES هستم، هر بار با یک گام تأییدشده و قابل استقرار.",
            ],
        },
        {
            "name": "clothes-shop",
            "stack": "Next.js · TypeScript · Tailwind CSS · RTL",
            "bullets": [
                "فرانت‌اند یک فروشگاه آنلاین پوشاک فارسی (راست‌به‌چپ) را "
                "ساختم: صفحات خانه، فروشگاه، محصول، سبد خرید و حساب کاربری، با "
                "نوار تب موبایل. بک‌اند و پرداخت در مرحلهٔ بعد برنامه‌ریزی "
                "شده‌اند.",
            ],
        },
        {
            "name": "Agentic Email Triage & Ops Automation",
            "stack": "n8n · LangChain · RAG",
            "bullets": [
                "ورک‌فلوی n8n طراحی کردم که در آن عامل هوش مصنوعی ایمیل‌های "
                "ورودی را در Gmail، تلگرام و واتس‌اپ دسته‌بندی می‌کند، از "
                "پایگاه دانش RAG پاسخ می‌دهد و فقط برای موارد غیرفوری "
                "پیش‌نویس پاسخ می‌نویسد.",
                "مرز ایمنی را در پرامپت سیستم گذاشتم: ایمیل‌های نیازمند ارجاع "
                "برای انسان علامت می‌خورند و هرگز پاسخ خودکار نمی‌گیرند. "
                "زنجیرهٔ جایگزین OpenAI ← Gemini ← Claude و خروجی JSON اجباری "
                "را به‌کار بردم تا نودهای Sheets، CRM و LINE به‌صورت قطعی "
                "مسیریابی کنند؛ روی ۶ سناریو تست شد.",
            ],
        },
        {
            "name": "Developer tools (Termux / Android)",
            "stack": "Bash · Node.js · Playwright · Android",
            "bullets": [
                "cf-manager: پنل مدیریت منوی‌محور Cloudflare در یک اسکریپت "
                "bash: استقرار/بازگشت Workers، KV/D1/R2/Hyperdrive، OAuth2 + "
                "PKCE با جابه‌جایی چندحسابی، همگام‌سازی با GitHub.",
                "logger (نقشه‌بردار DOM): DOM زنده، ترافیک شبکه و کنش‌های قابل "
                "بازپخش را از راه Browserless.io نگاشت می‌کند و محدودیت "
                "Playwright در پشتیبانی از اندروید را دور می‌زند.",
                "ezgit (دستیار Git که پیش از رسیدن diff به LLM رازها را پنهان "
                "می‌کند) و openhands-android-client (کلاینت بومی برای "
                "عامل‌های کدنویسی OpenHands).",
            ],
        },
    ],
    "contributions": [
        {
            "repo": "grafana/alloy",
            "status": "Go · PR #6750 · ادغام‌شده",
            "bullets": [
                "ریشهٔ یک خطای بی‌صدا در loki.source.file / "
                "loki.source.journal را پیدا کردم: فایل positions قدیمی "
                "Promtail که خوانده نمی‌شد از فایلِ ناموجود قابل تشخیص نبود و "
                "کامپوننت بی‌صدا کل جریان لاگ را دوباره دریافت می‌کرد. حالا "
                "خواننده خطا برمی‌گرداند که هنگام ساخت کامپوننت واضح شکست "
                "می‌خورد، در حالی که نبودِ فایل یا فایل ناقص همچنان غیرمهلک "
                "است.",
            ],
        },
        {
            "repo": "cloudflare/workers-sdk",
            "status": "TypeScript · ۲ PR · ۱ ادغام‌شده، ۱ باز",
            "bullets": [
                "ریشهٔ کرش مخصوص ویندوز ناشی از مسیرهای غیر ASCII (نقض هدر "
                "Latin-1) را در ۵ نقطهٔ فراخوانی یافتم و با اجرای CI ویندوز "
                "تأیید کردم — ادغام‌شده (PR #14713).",
                "هم‌ارزی تبدیل‌های بایندینگ Images محلی (fit/gravity/"
                "background) با محیط تولید را درست کردم — باز و در حال "
                "بازبینی (PR #14810).",
            ],
        },
        {
            "repo": "transact-rs/sqlx",
            "status": "Rust · PR #4351 · باز",
            "bullets": [
                "مشکل تولید placeholder از نوع ? توسط درایور Any روی Postgres "
                "(issue #3000) را با بازنویسیِ آگاه از SQL به $N رفع کردم که "
                "رشته‌های لیترال، شناسه‌های نقل‌قول‌شده، رشته‌های "
                "dollar-quoted و کامنت‌ها را رد می‌کند و فقط روی مسیر "
                "Postgres اعمال می‌شود تا MySQL و SQLite تحت‌تأثیر نباشند. CI "
                "روی فورک می‌گذرد.",
            ],
        },
        {
            "repo": "release-plz/release-plz",
            "status": "Rust · PR #2954 · باز",
            "bullets": [
                "شرط مسیر سریع در مقایسهٔ فایل‌های پکیج را شل کردم تا "
                "پکیج‌های استخراج‌شده از رجیستری فراخوانی کندتر و گاه‌ناموفق "
                "cargo package --list را رد کنند.",
            ],
        },
        {
            "repo": "anthropics/skills",
            "status": "Python · ۴ PR · باز",
            "bullets": [
                "یک باگ پارسر فیلد فرم PDF، یک شکاف حساسیت به حروف در بررسی "
                "ایمنی لینک خارجی xlsx، یک کرش import در Python 3.9 در docx و "
                "وابستگی جاافتادهٔ PyYAML را رفع کردم.",
            ],
        },
    ],
    "skills": [
        ("زبان‌ها", "JavaScript / TypeScript, Node.js, Python, SQL, Bash; "
                    "Go, Rust"),
        ("بک‌اند و API", "Express, REST API design, OAuth2 / PKCE, JWT, "
                         "rate limiting, IP allowlisting, webhooks, React, "
                         "Next.js, Tailwind, Electron"),
        ("ابزارهای هوش مصنوعی / عامل", "Model Context Protocol (MCP), "
                                       "LangChain, RAG / vector DBs "
                                       "(Qdrant), n8n, multi-provider LLM "
                                       "fallback, structured output, prompt "
                                       "design"),
        ("زیرساخت", "Git, Cloudflare (D1, KV, R2, Workers, Hyperdrive), "
                    "Redis, SQLite, Render / Vercel, GitHub Actions CI, "
                    "Vitest, Playwright, Termux / Android"),
    ],
}
