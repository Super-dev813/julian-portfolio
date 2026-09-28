import { Footer } from "@/components/footer";
import { CursorRing } from "@/components/motion/cursor-ring";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { DATA } from "@/data/resume";
import { SITE_URL } from "@/lib/site-url";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif, Mrs_Saint_Delafield, Syne } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});
const signature = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400", variable: "--font-sign" });
const display = Syne({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-name" });

export const metadata: Metadata = {
  // Origin only: Next adds the deploy base path to metadata images itself.
  metadataBase: new URL(new URL(SITE_URL).origin),
  title: {
    default: `${DATA.name} — ${DATA.title}`,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: `${DATA.name} — ${DATA.title}`,
    description: DATA.description,
    url: SITE_URL,
    siteName: DATA.name,
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    title: `${DATA.name} — ${DATA.title}`,
    description: DATA.description,
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0e14" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "relative min-h-dvh bg-background font-sans antialiased",
          geist.variable,
          instrumentSerif.variable,
          signature.variable,
          display.variable
        )}
      >
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}"}</style>
        </noscript>
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <SmoothScroll />
          <SiteHeader />
          {children}
          <Footer />
          <CursorRing />
          <div aria-hidden className="grain pointer-events-none fixed inset-0 z-50" />
        </Providers>
      </body>
    </html>
  );
}
