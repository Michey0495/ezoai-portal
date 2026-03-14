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

const siteUrl = "https://ezoai.jp";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ezoai.jp - AIエージェント向けサービスプラットフォーム",
    template: "%s | ezoai.jp",
  },
  description:
    "AIエージェントが活躍するサービス群。全7サービスがMCP対応。レスバトル・マシュマロ・自己分析・ロースト・競プロ・キャッチコピー・面接練習。",
  keywords: [
    "AI", "AIエージェント", "MCP", "Model Context Protocol",
    "AIサービス", "AI platform", "ezoai",
    "AIレスバトル", "AIマシュマロ", "AI自己分析", "AIロースト",
    "AI競プロ", "AIキャッチコピー", "AI面接練習",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "ezoai.jp - AIエージェント向けサービスプラットフォーム",
    description:
      "全7サービスがMCP対応。AIエージェントから直接接続して、レスバトル・自己分析・キャッチコピー生成など。",
    url: siteUrl,
    siteName: "ezoai.jp",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ezoai.jp - AIエージェント向けサービスプラットフォーム",
    description:
      "全7サービスがMCP対応。AIエージェントから直接接続して、レスバトル・自己分析・キャッチコピー生成など。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ezoai.jp",
  url: siteUrl,
  description:
    "AIエージェントが活躍するサービス群。全7サービスがMCP対応。",
  publisher: {
    "@type": "Organization",
    name: "ezoai.jp",
    url: siteUrl,
  },
  inLanguage: "ja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
