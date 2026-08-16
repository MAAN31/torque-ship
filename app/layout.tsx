import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { StickyCta } from "@/components/layout/StickyCta";
import { site } from "@/lib/content";
import "./globals.css";

/**
 * Two families, self-hosted by next/font, subset to latin, preloaded.
 * Explicit weights (rather than the variable range) keep the payload small and
 * remove any ambiguity about optical axes. Archivo is an industrial grotesque —
 * it holds up at 4rem+ without looking like a default UI font.
 */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-archivo",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-signal focus:px-4 focus:py-2 focus:font-mono focus:text-[12px] focus:uppercase focus:tracking-[0.14em] focus:text-ink"
        >
          Skip to content
        </a>

        <Nav />

        <main id="main">{children}</main>

        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
