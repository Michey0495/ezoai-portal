import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "アクティビティ | ezoai.jp",
  description: "ezoai.jp全サービスの最新アクティビティ",
};

interface ActivityItem {
  id: string;
  service: string;
  serviceSlug: string;
  accent: string;
  resultPath: string;
  title: string;
  description: string;
  timestamp: number;
}

const serviceConfig = [
  {
    name: "AI レスバトル",
    slug: "ai-resbattle",
    accent: "red",
    resultPath: "battle",
    feedUrl: "https://ai-resbattle.ezoai.jp/api/recent",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform: (items: any[], resultPath: string): ActivityItem[] =>
      items.map((item) => ({
        id: item.id,
        service: "AI レスバトル",
        serviceSlug: "ai-resbattle",
        accent: "red",
        resultPath,
        title: `${item.restaurant1} vs ${item.restaurant2}`,
        description: item.summary?.slice(0, 100) ?? "",
        timestamp: new Date(item.createdAt).getTime(),
      })),
  },
  {
    name: "AI マシュマロ",
    slug: "ai-marshmallow",
    accent: "pink",
    resultPath: "question",
    feedUrl: "https://ai-marshmallow.ezoai.jp/api/recent",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform: (items: any[], resultPath: string): ActivityItem[] =>
      items.map((item) => ({
        id: item.id,
        service: "AI マシュマロ",
        serviceSlug: "ai-marshmallow",
        accent: "pink",
        resultPath,
        title: item.content?.slice(0, 60) ?? "",
        description: item.answer?.slice(0, 100) ?? "",
        timestamp: new Date(item.createdAt).getTime(),
      })),
  },
  {
    name: "AI 性格診断",
    slug: "ai-shindan",
    accent: "purple",
    resultPath: "result",
    feedUrl: "https://ai-shindan.ezoai.jp/api/feed",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform: (items: any[], resultPath: string): ActivityItem[] =>
      items.map((item) => ({
        id: item.id,
        service: "AI 性格診断",
        serviceSlug: "ai-shindan",
        accent: "purple",
        resultPath,
        title: item.personalityType ?? "",
        description: item.traits?.join(", ") ?? "",
        timestamp:
          typeof item.createdAt === "number"
            ? item.createdAt
            : new Date(item.createdAt).getTime(),
      })),
  },
  {
    name: "AI ロースト",
    slug: "ai-roast",
    accent: "orange",
    resultPath: "result",
    feedUrl: "https://ai-roast.ezoai.jp/api/feed",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform: (items: any[], resultPath: string): ActivityItem[] =>
      items.map((item) => ({
        id: item.id,
        service: "AI ロースト",
        serviceSlug: "ai-roast",
        accent: "orange",
        resultPath,
        title: item.name ?? "",
        description: item.roast?.slice(0, 100) ?? "",
        timestamp:
          typeof item.createdAt === "number"
            ? item.createdAt
            : new Date(item.createdAt).getTime(),
      })),
  },
  {
    name: "AI キャッチコピー",
    slug: "ai-catchcopy",
    accent: "cyan",
    resultPath: "result",
    feedUrl: "https://ai-catchcopy.ezoai.jp/api/feed",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform: (items: any[], resultPath: string): ActivityItem[] =>
      items.map((item) => ({
        id: item.id,
        service: "AI キャッチコピー",
        serviceSlug: "ai-catchcopy",
        accent: "cyan",
        resultPath,
        title: item.productName ?? "",
        description: item.catchcopies?.slice(0, 2).join(" / ") ?? "",
        timestamp:
          typeof item.createdAt === "number"
            ? item.createdAt
            : new Date(item.createdAt).getTime(),
      })),
  },
  {
    name: "AI 面接練習",
    slug: "ai-interview",
    accent: "violet",
    resultPath: "result",
    feedUrl: "https://ai-interview.ezoai.jp/api/feed",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform: (items: any[], resultPath: string): ActivityItem[] =>
      items.map((item) => ({
        id: item.id,
        service: "AI 面接練習",
        serviceSlug: "ai-interview",
        accent: "violet",
        resultPath,
        title: `${item.position}${item.rank ? ` [${item.rank}]` : ""}`,
        description: item.summary?.slice(0, 100) ?? "",
        timestamp:
          typeof item.createdAt === "number"
            ? item.createdAt
            : new Date(item.createdAt).getTime(),
      })),
  },
  {
    name: "AI 競プロ",
    slug: "ai-competitive-programming",
    accent: "cyan",
    resultPath: "submissions",
    feedUrl: "https://ai-competitive-programming.ezoai.jp/api/submissions",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform: (items: any[], resultPath: string): ActivityItem[] =>
      (Array.isArray(items) ? items : []).map((item) => ({
        id: item.id,
        service: "AI 競プロ",
        serviceSlug: "ai-competitive-programming",
        accent: "cyan",
        resultPath,
        title: `${item.agent ?? "AI"} — ${item.problemId ?? "problem"}`,
        description: `${item.language ?? ""} ${item.status ?? ""}`.trim(),
        timestamp:
          typeof item.createdAt === "number"
            ? item.createdAt
            : new Date(item.createdAt).getTime(),
      })),
  },
];

const accentClasses: Record<
  string,
  { border: string; text: string; badge: string }
> = {
  red: {
    border: "border-l-red-500",
    text: "text-red-400",
    badge: "bg-red-500/20 text-red-300",
  },
  pink: {
    border: "border-l-pink-500",
    text: "text-pink-400",
    badge: "bg-pink-500/20 text-pink-300",
  },
  purple: {
    border: "border-l-purple-500",
    text: "text-purple-400",
    badge: "bg-purple-500/20 text-purple-300",
  },
  orange: {
    border: "border-l-orange-500",
    text: "text-orange-400",
    badge: "bg-orange-500/20 text-orange-300",
  },
  cyan: {
    border: "border-l-cyan-500",
    text: "text-cyan-400",
    badge: "bg-cyan-500/20 text-cyan-300",
  },
  violet: {
    border: "border-l-violet-500",
    text: "text-violet-400",
    badge: "bg-violet-500/20 text-violet-300",
  },
};

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}秒前`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}分前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}時間前`;
  const days = Math.floor(hours / 24);
  return `${days}日前`;
}

async function getAllActivity(): Promise<ActivityItem[]> {
  const results = await Promise.allSettled(
    serviceConfig.map(async (config) => {
      const res = await fetch(config.feedUrl, {
        next: { revalidate: 60 },
      });
      if (!res.ok) return [];
      const data = await res.json();
      return config.transform(data, config.resultPath);
    })
  );

  const allItems: ActivityItem[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      allItems.push(...result.value);
    }
  }

  return allItems
    .filter((item) => item.timestamp > 0)
    .sort((a, b) => b.timestamp - a.timestamp);
}

export default async function ActivityPage() {
  const items = await getAllActivity();

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="text-sm text-white/30 hover:text-white/60 transition-colors cursor-pointer"
        >
          ezoai.jp
        </Link>

        <h1 className="text-4xl font-bold text-white mt-6 mb-4">
          アクティビティ
        </h1>
        <p className="text-white/50 text-lg mb-12">
          全サービスの最新アクティビティをリアルタイムで表示
        </p>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/50">アクティビティはまだありません</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => {
              const colors = accentClasses[item.accent] ?? accentClasses.red;
              return (
                <a
                  key={`${item.serviceSlug}-${item.id}`}
                  href={`https://${item.serviceSlug}.ezoai.jp/${item.resultPath}/${item.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block bg-white/5 border border-white/10 ${colors.border} border-l-2 rounded-lg p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-mono px-2 py-0.5 rounded ${colors.badge}`}
                      >
                        {item.service}
                      </span>
                      <span className="text-white/30 text-xs">
                        {timeAgo(item.timestamp)}
                      </span>
                    </div>
                  </div>
                  <p className="text-white font-medium mt-2 text-sm">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-white/40 text-xs mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </a>
              );
            })}
          </div>
        )}

        <div className="border-t border-white/5 mt-12 pt-8">
          <Link
            href="/"
            className="text-sm text-white/30 hover:text-white/60 transition-colors cursor-pointer"
          >
            ezoai.jp に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
