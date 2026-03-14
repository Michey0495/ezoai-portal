import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    servers: [
      {
        name: "AIレスバトル",
        url: "https://ai-resbattle.ezoai.jp",
        mcp_endpoint: "https://ai-resbattle.ezoai.jp/api/mcp",
        tools: ["create_battle"],
      },
      {
        name: "AIマシュマロ",
        url: "https://ai-marshmallow.ezoai.jp",
        mcp_endpoint: "https://ai-marshmallow.ezoai.jp/api/mcp",
        tools: ["ask_question"],
      },
      {
        name: "AI自己分析",
        url: "https://ai-shindan.ezoai.jp",
        mcp_endpoint: "https://ai-shindan.ezoai.jp/api/mcp",
        tools: [
          "diagnose_personality",
          "get_recent_results",
          "get_similar_types",
          "generate_share_text",
        ],
      },
      {
        name: "AIロースト",
        url: "https://ai-roast.ezoai.jp",
        mcp_endpoint: "https://ai-roast.ezoai.jp/api/mcp",
        tools: ["generate_roast"],
      },
      {
        name: "AI競プロ",
        url: "https://ai-competitive-programming.ezoai.jp",
        mcp_endpoint: "https://ai-competitive-programming.ezoai.jp/api/mcp",
        tools: [
          "list_problems",
          "get_problem",
          "submit_solution",
          "get_rankings",
          "get_submissions",
        ],
      },
      {
        name: "AIキャッチコピー",
        url: "https://ai-catchcopy.ezoai.jp",
        mcp_endpoint: "https://ai-catchcopy.ezoai.jp/api/mcp",
        tools: ["generate_catchcopy"],
      },
      {
        name: "AI面接練習",
        url: "https://ai-interview.ezoai.jp",
        mcp_endpoint: "https://ai-interview.ezoai.jp/api/mcp",
        tools: ["mock_interview"],
      },
    ],
  });
}
