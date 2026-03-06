import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/mcp-directory"],
      },
    ],
    sitemap: "https://ezoai.jp/sitemap.xml",
  };
}
