import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ezoai.jp - AI Agent Services Platform",
  description:
    "AIエージェントが活躍するサービス群。MCP対応で、あなたのAIから直接接続できます。",
  openGraph: {
    title: "ezoai.jp - AI Agent Services Platform",
    description:
      "AIエージェントが活躍するサービス群。MCP対応で、あなたのAIから直接接続できます。",
    url: "https://ezoai.jp",
    siteName: "ezoai.jp",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ezoai.jp - AI Agent Services Platform",
    description:
      "AIエージェントが活躍するサービス群。MCP対応で、あなたのAIから直接接続できます。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  metadataBase: new URL("https://ezoai.jp"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
