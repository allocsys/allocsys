// Persian copy for projects, open-source contributions and skill group titles.
// Keyed by the English `name`; entries missing here fall back to English.
// Inline markup matches data/site.ts: `code` and [text](url).

export type ProjectFa = { stack: string; bullets: string[] };
export type ContributionFa = { what: string; status: string; bullets: string[] };

export const projectsFa: Record<string, ProjectFa> = {
  madmcp: {
    stack: "سرور MCP — حدود ۵۰ ابزار در ۸ اتصال‌دهنده: GitHub، Cloudflare، Notion، Mem0، Exa و Gemini",
    bullets: [
      "یک سرور MCP ساختم و مستقر کردم که حدود ۵۰ ابزار را در ۸ اتصال‌دهنده (GitHub، Cloudflare D1/KV/R2/Workers، Notion، Mem0، دریافت صفحهٔ وب (fetch)، Exa و Gemini) در اختیار هر کلاینت هوش مصنوعی سازگار با MCP قرار می‌دهد.",
      "معماری مبتنی بر واگذاری وظیفه طراحی کردم: یک ابزار، بررسی باز و چندمرحله‌ای را به مدل دومی می‌سپارد که حلقهٔ ابزار خودش را سمت سرور اجرا می‌کند، و با نقطهٔ بازیابی (checkpoint) مبتنی بر Redis، اجرایی که به‌خاطر محدودیت نرخ متوقف شده از آخرین گام ادامه می‌دهد و از اول شروع نمی‌شود.",
      "ابزارهایی که با محتوای خارجی نامطمئن سروکار دارند (پژوهش وب، fetch) را از ابزارهای سیستم‌های داخلی (GitHub، Cloudflare، Notion) جدا کردم تا داده‌های خارجی هرگز به اعتبارنامه‌ها دسترسی پیدا نکنند.",
      "لایهٔ احراز هویت را طراحی کردم: مقایسهٔ زمان‌ثابت کلید (مقاوم در برابر timing attack)، فهرست مجاز IP محدود به بازهٔ اتصال‌دهندهٔ Claude و محدودسازی نرخ برای هر مسیر، با ترتیبی که نشت یک کلید به‌تنهایی برای ورود کافی نباشد. تشخیص درست IP کلاینت پشت پروکسی‌ها، محدودیت حجم بدنه در pushهای بزرگ و خرابی توکن هر اتصال‌دهنده را مدیریت کردم؛ گردش‌کار مبتنی بر PR با CI در GitHub Actions، vitest و supertest.",
    ],
  },
  proetsy: {
    stack: "Node.js · React · SQLite · Electron · Playwright",
    bullets: [
      "پایپ‌لاینی local-first ساختم که آثار هنری را به لیستینگ‌های آمادهٔ Etsy و موکاپ تبدیل می‌کند: تحلیل اختیاری تصویر، تولید لیستینگ، موکاپ از قالب‌های PSD و مرحلهٔ بازبینی انسانی (انتشار عمداً دستی می‌ماند).",
      "لایهٔ ارائه‌دهندهٔ LLM ساختم با Gemini به‌عنوان اصلی و Claude به‌عنوان جایگزین، مجموعهٔ کلیدها (key pool)، صف و محدودیت نرخ، به‌علاوهٔ فیلتر سلیقهٔ مبتنی بر embedding با JS/WASM خالص (قابل اجرا روی Termux).",
      "هر ماژول را تست کردم (واحد، idempotency، یکپارچگی در سطح مسیر) و E2E با Playwright روی یک LLM شبیه‌سازی‌شدهٔ (mock) قطعی افزودم؛ نصب‌کنندهٔ Electron برای ویندوز را با تأیید CI عرضه کردم.",
    ],
  },
  "news-market-ai": {
    stack: "Cloudflare Workers · D1 · KV · Gemini · Next.js",
    bullets: [
      "یک پایپ‌لاین تبدیل خبر به سیگنال معاملاتی ساختم: دریافت از منابع رایگان و اسکرپرهای سفارشی، تحلیل چندعاملی با LLM و تولید سیگنال، متناسب با محدودیت‌های سطح رایگان Workerها.",
      "بک‌تستری نوشتم که فقط از داده‌های در دسترسِ همان لحظه استفاده می‌کند (point-in-time) و مراحل ورود به معامله را مستند کردم (بک‌تست ← معاملهٔ آزمایشی ← اجرای زنده با حجم بسیار کم)؛ معاملهٔ زنده عمداً خاموش است.",
      "کلاینت Gemini با جایگزینی پلکانی میان مدل‌ها، چندکلیدی و وضعیت cooldown در KV ساختم، و داشبورد عملیاتی Next.js 16 سازگار با موبایل که به‌صورت Worker ارائه می‌شود و ورود و API آن با نشست (session) محافظت شده است.",
    ],
  },
  "ai-campaign-builder": {
    stack: "TypeScript · React · Cloudflare Workers · D1",
    bullets: [
      "یک مونوریپو ساختم که در آن صاحب کسب‌وکار هدفش را می‌گوید و یک عامل هوش مصنوعی کمپین وفاداری یا بازی‌وارسازی تولید می‌کند. اپ‌ها: داشبورد مالک، اپ مشتری، POS کارکنان، کنسول بازبینی، میکروسایت‌های عمومی و API بک‌اند.",
      "پکیج‌های مشترک api-client، UI-kit و campaign-editor؛ احراز هویت JWT، مایگریشن‌های D1، تست‌های Vitest و استقرار CI که D1 و KV را خودکار آماده می‌کند.",
    ],
  },
  peakplast: {
    stack: "Cloudflare Workers · Telegram · Gemini · Zarinpal",
    bullets: [
      "یک ربات سفارش تلگرامی را در محیط تولید ساخته‌ام و اجرا می‌کنم: استخراج سفارش صوتی با Gemini و جایگزینی چندکلیدی، لینک پرداخت و تأیید زرین‌پال، پنل مدیریت و REST API.",
      "همزمانی و سوءاستفاده را مدیریت کردم (قفل هر چت، محدودیت سیل پیام صوتی، حذف آدرس‌های تکراری). در حال برنامه‌ریزی و اجرای تقسیم ایمنِ Worker تک‌فایلِ حدود ۷٬۰۰۰ خطی به ماژول‌های ES هستم، هر بار با یک گام تأییدشده و قابل استقرار.",
    ],
  },
  "clothes-shop": {
    stack: "Next.js · TypeScript · Tailwind CSS · RTL",
    bullets: [
      "فرانت‌اند یک فروشگاه آنلاین پوشاک فارسی (راست‌به‌چپ) را ساختم: صفحات خانه، فروشگاه، محصول، سبد خرید، حساب کاربری و محتوا، با نوار تب موبایل و داده‌های قابل‌تنظیم سایت، تم و محصول. بک‌اند، تسویه و پرداخت در مرحلهٔ بعد برنامه‌ریزی شده‌اند.",
    ],
  },
  "Agentic Email Triage & Ops Automation": {
    stack: "ورک‌فلو n8n — عامل LLM با RAG و مسیریابی به CRM/Sheets/LINE",
    bullets: [
      "ورک‌فلوی n8n طراحی کردم که در آن عامل هوش مصنوعی ایمیل‌های ورودی را در Gmail، تلگرام و واتس‌اپ دسته‌بندی می‌کند، از پایگاه دانش RAG پاسخ می‌دهد و فقط برای موارد غیرفوری پیش‌نویس پاسخ می‌نویسد.",
      "مرز ایمنی را در پرامپت سیستم گذاشتم: ایمیل‌های نیازمند ارجاع به انسان علامت می‌خورند و هرگز پاسخ خودکار نمی‌گیرند. زنجیرهٔ جایگزین OpenAI ← Gemini ← Claude و خروجی JSON اجباری را به‌کار بردم تا نودهای Sheets، CRM و LINE به‌صورت قطعی مسیریابی کنند؛ روی ۶ سناریو تست شد.",
    ],
  },
  "Developer tools (Termux / Android)": {
    stack: "Bash · Node.js · Playwright · Android",
    bullets: [
      "[cf-manager](https://github.com/allocsys/cfmanager): پنل مدیریت Cloudflare با منوی تعاملی در یک اسکریپت bash: استقرار/بازگشت Workers، KV/D1/R2/Hyperdrive، OAuth2 + PKCE با جابه‌جایی چندحسابی، همگام‌سازی با GitHub.",
      "[logger](https://github.com/allocsys/logger) (نقشه‌بردار DOM): DOM زنده، ترافیک شبکه و کنش‌های قابل بازپخش را از راه Browserless.io نگاشت می‌کند و محدودیت Playwright در پشتیبانی از اندروید را دور می‌زند.",
      "[ezgit](https://github.com/allocsys/ezgit) (دستیار Git که پیش از رسیدن diff به LLM رازها را پنهان می‌کند) و [openhands-android-client](https://github.com/allocsys/openhands-android-client) (کلاینت بومی برای عامل‌های کدنویسی OpenHands).",
    ],
  },
};

export const contributionsFa: Record<string, ContributionFa> = {
  "grafana/alloy": {
    what: "جلوگیری از نادیده‌گرفته‌شدن بی‌صدای خطای خواندن فایل positions قدیمی Promtail، که باعث دریافت دوبارهٔ کل لاگ‌ها می‌شد",
    status: "PR #6750 · ادغام‌شده",
    bullets: [
      "در `loki.source.file` / `loki.source.journal` باگی پیدا کردم که خطا را بی‌صدا نادیده می‌گرفت: وقتی فایل positions قدیمی Promtail وجود داشت اما خوانده نمی‌شد (مثلاً خطای دسترسی)، خواننده `nil` برمی‌گرداند — که از «فایل وجود ندارد» قابل تشخیص نبود — و کامپوننت بی‌صدا از ابتدا شروع به خواندن می‌کرد و همهٔ لاگ‌ها را دوباره دریافت می‌کرد، به‌جای اینکه با خطای واضح متوقف شود.",
      "خواننده را طوری تغییر دادم که `(*LegacyFile, error)` برگرداند تا خطای واقعی I/O هنگام ساخت کامپوننت به‌صورت خطای واضح بالا بیاید، در حالی که نبودِ فایل و YAML ناقص همچنان غیرمهلک تلقی می‌شوند.",
    ],
  },
  "cloudflare/workers-sdk": {
    what: "کرش ناشی از کدگذاری مسیر در ویندوز و یکسان‌سازی رفتار بایندینگ محلی Images با محیط تولید",
    status: "۲ PR · ۱ ادغام‌شده، ۱ باز",
    bullets: [
      "علت کرش مخصوص ویندوز، یعنی مسیرهای غیر ASCII (نقض هدر Latin-1)، را در ۵ نقطهٔ فراخوانی یافتم و با اجرای CI ویندوز روی یک مخزن واقعی با مسیر `開発` تأیید کردم. ([PR #14713](https://github.com/cloudflare/workers-sdk/pull/14713) · ادغام‌شده)",
      "رفتار تبدیل‌های بایندینگ Images محلی (`fit`/`gravity`/`background`) را با محیط تولید یکسان کردم. باز و در حال بازبینی. ([PR #14810](https://github.com/cloudflare/workers-sdk/pull/14810) · باز)",
    ],
  },
  "transact-rs/sqlx": {
    what: "تولید placeholderهای $N توسط درایور Any روی Postgres (issue #3000)",
    status: "PR #4351 · باز",
    bullets: [
      "مشکل تولید placeholder از نوع `?` توسط درایور Any روی Postgres را با افزودن بازنویسی SQL-آگاه به `$N` رفع کردم که لیترال‌های رشته‌ای، شناسه‌های داخل نقل‌قول، رشته‌های dollar-quoted و کامنت‌ها را نادیده می‌گیرد، و فقط روی مسیر Postgres اعمال می‌شود تا MySQL و SQLite تحت‌تأثیر نباشند. CI روی فورک می‌گذرد.",
    ],
  },
  "release-plz/release-plz": {
    what: "پرهیز از فراخوانی کندتر و گاه‌ناموفق cargo metadata وقتی مسیر سریع‌تر ایمن است",
    status: "PR #2954 · باز",
    bullets: [
      "متوجه شدم منطق مقایسهٔ فایل‌های پکیج فقط وقتی هر دو شرط جداگانه برقرار بود مسیر سریع فهرست‌گیری مستقیم از دیسک را می‌رفت، پس پکیج‌های استخراج‌شده از رجیستری بی‌دلیل به فراخوانی کندتر `cargo package --list` برمی‌گشتند.",
      "شرط را تعدیل کردم تا با وجود نشانگر `Cargo.toml.orig` / `.orig.orig` مسیر سریع فعال شود، و همچنان `.git`، `.cargo-ok` و `Cargo.lock` از مقایسه کنار گذاشته می‌شوند.",
    ],
  },
  "anthropics/skills": {
    what: "رفع باگ پارسر، شکاف در بررسی ایمنی و مشکلات وابستگی/سازگاری در اسکیل‌های pdf، xlsx، docx و skill-creator",
    status: "۴ PR · باز",
    bullets: [
      "پارسر فیلد فرم PDF را رفع کردم که فرض می‌کرد هر ورودی `/Opt` در فیلد انتخابی طبق مشخصات یک جفت `[export_value, display_text]` است — رشتهٔ تک‌کاراکتریِ ساده (مثلاً `\"Red\"`) بی‌صدا به `value=\"R\", text=\"e\"` شکسته می‌شد یا کرش می‌کرد. ([PR #1474](https://github.com/anthropics/skills/pull/1474))",
      "شکاف حساسیت به حروف در بررسی ایمنی لینک‌های خارجی اسکیل xlsx را رفع کردم: regex مخصوص شناسایی لینک‌های خارجیِ کش‌شده پیش از محاسبهٔ مجدد، ارجاعات فرمول با حروف ناهمخوان را اصلاً نمی‌گرفت چون با `IGNORECASE` کامپایل نشده بود. ([PR #1471](https://github.com/anthropics/skills/pull/1471))",
      "کرش import در Python 3.9 در اسکیل docx (annotationِ union از نوع PEP 604 که هنگام import ارزیابی می‌شد) را رفع و نیازمندی واقعی Python 3.10+ / `defusedxml` را مستند کردم، به‌جای اینکه اعلام‌نشده بماند. ([PR #1473](https://github.com/anthropics/skills/pull/1473))",
      "وابستگی جاافتادهٔ PyYAML را برای اسکریپت اعتبارسنج skill-creator اعلام کردم که در محیط تمیز با `ModuleNotFoundError` شکست می‌خورد. ([PR #1472](https://github.com/anthropics/skills/pull/1472))",
    ],
  },
};

// Titles of the four skill groups, in the same order as `skills` in data/site.ts.
export const skillsFa = ["زبان‌ها", "بک‌اند و API", "ابزارهای هوش مصنوعی / عامل", "زیرساخت و ابزارها"];
