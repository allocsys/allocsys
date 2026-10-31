import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Providers from '@/components/Providers';
import './globals.css';

const display = localFont({
  src: '../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wdth-normal.woff2',
  variable: '--font-display',
  weight: '200 800',
  display: 'swap',
});
const serif = localFont({
  src: '../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2',
  variable: '--font-serif',
  weight: '400',
  style: 'italic',
  display: 'swap',
});
const mono = localFont({
  src: '../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2',
  variable: '--font-mono',
  weight: '100 800',
  display: 'swap',
});

const SITE = 'https://allocsys.github.io/allocsys/';
const TITLE = 'allocsys — Backend Developer';
const DESC =
  'Backend developer portfolio: MCP server infrastructure, AI agent automation, and open-source contributions.';
const OG_IMAGE = 'https://raw.githubusercontent.com/allocsys/allocsys/main/github-metrics.svg';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESC,
  alternates: { canonical: SITE },
  openGraph: { type: 'profile', title: TITLE, description: DESC, url: SITE, siteName: 'allocsys', images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC, images: [OG_IMAGE] },
};

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0e0e0d' },
    { media: '(prefers-color-scheme: light)', color: '#f3f0e8' },
  ],
};

// Runs before first paint: resolves the theme (saved choice, else system) and the motion flag.
const boot =
  "try{var d=document.documentElement,t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t;if(localStorage.getItem('lang')==='fa')d.lang='fa'}catch(e){}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700&display=swap" />
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
