import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Providers from '@/components/Providers';
import './globals.css';

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
  openGraph: {
    type: 'profile',
    title: TITLE,
    description: DESC,
    url: SITE,
    siteName: 'allocsys',
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC, images: [OG_IMAGE] },
};

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0e14' },
    { media: '(prefers-color-scheme: light)', color: '#f7f9fb' },
  ],
};

// Runs before first paint: lets CSS hide the hero lines only when the typing animation will play.
const animFlag =
  "document.documentElement.dataset.anim=matchMedia('(prefers-reduced-motion: reduce)').matches?'off':'on'";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: animFlag }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
