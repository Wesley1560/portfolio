import type { Metadata } from "next";
import { Providers } from "./providers";
import { portfolioContent } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wesley Eze's Portfolio",
  description: "Mechanical Engineer | Robotics, Automation, Rapid Prototyping. Specializing in design engineering, CAD/CAM, and innovative manufacturing solutions.",
  openGraph: {
    title: "Wesley Eze's Portfolio",
    description: "Mechanical Engineer | Robotics, Automation, Rapid Prototyping. Specializing in design engineering, CAD/CAM, and innovative manufacturing solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wesley Eze's Portfolio",
    description: "Mechanical Engineer | Robotics, Automation, Rapid Prototyping. Specializing in design engineering, CAD/CAM, and innovative manufacturing solutions.",
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
