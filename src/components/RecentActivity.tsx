"use client";

import { useEffect, useState } from "react";

interface ActivityItem {
  service: string;
  accent: string;
  title: string;
  description: string;
  timestamp: number;
  url: string;
}

const accentClasses: Record<string, string> = {
  blue: "bg-blue-500/20 text-blue-300",
  pink: "bg-pink-500/20 text-pink-300",
  purple: "bg-purple-500/20 text-purple-300",
  orange: "bg-orange-500/20 text-orange-300",
  emerald: "bg-emerald-500/20 text-emerald-300",
  amber: "bg-amber-500/20 text-amber-300",
};

const feeds = [
  {
    name: "AI レスバトル",
    slug: "ai-resbattle",
    accent: "blue",
    url: "https://ai-resbattle.ezoai.jp/api/recent",
    resultPath: "battle",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform: (item: any) => ({
      title: `${item.restaurant1} vs ${item.restaurant2}`,
      description: item.summary?.slice(0, 80) ?? "",
    }),
  },
  {
    name: "AI マシュマロ",
    slug: "ai-marshmallow",
    accent: "pink",
    url: "https://ai-marshmallow.ezoai.jp/api/recent",
    resultPath: "question",
    transform: (item: any) => ({
      title: item.content?.slice(0, 60) ?? "",
      description: item.answer?.slice(0, 80) ?? "",
    }),
  },
  {
    name: "AI 性格診断",
    slug: "ai-shindan",
    accent: "purple",
    url: "https://ai-shindan.ezoai.jp/api/feed",
    resultPath: "result",
    transform: (item: any) => ({
      title: item.personalityType ?? "",
      description: item.traits?.join(", ") ?? "",
    }),
  },
  {
    name: "AI ロースト",
    slug: "ai-roast",
    accent: "orange",
    url: "https://ai-roast.ezoai.jp/api/feed",
    resultPath: "result",
    transform: (item: any) => ({
      title: item.name ?? "",
      description: item.roast?.slice(0, 80) ?? "",
    }),
  },
  {
    name: "AI キャッチコピー",
    slug: "ai-catchcopy",
    accent: "emerald",
    url: "https://ai-catchcopy.ezoai.jp/api/feed",
    resultPath: "result",
    transform: (item: any) => ({
      title: item.productName ?? "",
      description: item.catchcopies?.slice(0, 2).join(" / ") ?? "",
    }),
  },
  {
    name: "AI 面接練習",
    slug: "ai-interview",
    accent: "amber",
    url: "https://ai-interview.ezoai.jp/api/feed",
    resultPath: "result",
    transform: (item: any) => ({
      title: `${item.position}${item.rank ? ` [${item.rank}]` : ""}`,
      description: item.summary?.slice(0, 80) ?? "",
    }),
  },
];

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

export function RecentActivity() {
  const [items, setItems] = useState<ActivityItem[]>([]);

  useEffect(() => {
    async function fetchAll() {
      const results = await Promise.allSettled(
        feeds.map(async (feed) => {
          const res = await fetch(feed.url);
          if (!res.ok) return [];
          const data = await res.json();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return data.slice(0, 3).map((item: any) => {
            const transformed = feed.transform(item);
            const ts =
              typeof item.createdAt === "number"
                ? item.createdAt
                : new Date(item.createdAt).getTime();
            return {
              service: feed.name,
              accent: feed.accent,
              title: transformed.title,
              description: transformed.description,
              timestamp: ts,
              url: `https://${feed.slug}.ezoai.jp/${feed.resultPath}/${item.id}`,
            };
          });
        })
      );

      const allItems: ActivityItem[] = [];
      for (const result of results) {
        if (result.status === "fulfilled") {
          allItems.push(...result.value);
        }
      }

      allItems.sort((a, b) => b.timestamp - a.timestamp);
      setItems(allItems.slice(0, 5));
    }

    fetchAll();
  }, []);

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white/30 text-sm">アクティビティを読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <a
          key={i}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-1">
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded ${
                accentClasses[item.accent] ?? "bg-white/10 text-white/60"
              }`}
            >
              {item.service}
            </span>
            <span className="text-white/30 text-xs">
              {timeAgo(item.timestamp)}
            </span>
          </div>
          <p className="text-white text-sm font-medium">{item.title}</p>
          {item.description && (
            <p className="text-white/40 text-xs mt-0.5 line-clamp-1">
              {item.description}
            </p>
          )}
        </a>
      ))}
    </div>
  );
}
