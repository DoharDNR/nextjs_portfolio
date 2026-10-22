import type { Metadata } from "next";
import Navbar from "@/components/portfolio/Navbar";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dohar Siregar — Portfolio",
  description: "A personal portfolio for Dohar Siregar.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="site-shell">
          <Navbar />
          {children}
          <footer className="border-t border-line bg-background px-6 py-5 sm:px-6">
            <div className="mx-auto flex w-full max-w-360 flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-muted-foreground">&copy; 2026 Dohar Siregar. All rights reserved.</p>
              <div className="flex flex-col items-center gap-1 md:items-end">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground line-through">v1.0.0</span>
                  <span className="text-sm font-medium text-foreground">v1.4.5</span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
                  <svg className="animate-spin" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 7v5h-5" /><path d="M4 17v-5h5" /><path d="M5.6 9a7 7 0 0 1 11.5-2L20 12" /><path d="M4 12l2.9 5a7 7 0 0 0 11.5-2" />
                  </svg>
                  <span>Upgrading</span>
                </span>
              </div>
            </div>
          </footer>
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
