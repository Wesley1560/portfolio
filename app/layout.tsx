import type { Metadata } from "next";
import { Providers } from "./providers";
import { portfolioContent } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wesley Eze's Portfolio",
  description: portfolioContent.hero.summary,
  icons: {
    icon: [
      {
        url: "/website_logo/wesley_eze_monogram_logo_dark.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/website_logo/wesley_eze_monogram_logo_light.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  openGraph: {
    title: "Wesley Eze's Portfolio",
    description: portfolioContent.hero.summary,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wesley Eze's Portfolio",
    description: portfolioContent.hero.summary,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
