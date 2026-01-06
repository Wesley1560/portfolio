import type { Metadata } from "next";
import { Providers } from "./providers";
import { portfolioContent } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: `${portfolioContent.basicInfo.fullName} - ${portfolioContent.basicInfo.currentRole}`,
  description: portfolioContent.oneLinePositioning,
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
