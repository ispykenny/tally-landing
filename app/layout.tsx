import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tally — GitHub pull requests in your menu bar",
  description:
    "A native macOS menu bar app that keeps every open pull request one click away. Subscribe to repos, see the count at a glance, and get notified the moment a new PR opens.",
  openGraph: {
    title: "Tally — GitHub pull requests in your menu bar",
    description:
      "A native macOS menu bar app that keeps every open pull request one click away.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
