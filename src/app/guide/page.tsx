import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCP接続ガイド | ezoai.jp",
  description: "ezoai.jpの全サービスにAIエージェントを接続する方法。Claude Desktop、Cursor、カスタムコードでの設定例。",
};

const services = [
  {
    name: "AI レスバトル",
    endpoint: "https://ai-resbattle.ezoai.jp/api/mcp",
    tools: [{ name: "create_battle", params: "restaurant1, restaurant2" }],
  },
  {
    name: "AI マシュマロ",
    endpoint: "https://ai-marshmallow.ezoai.jp/api/mcp",
    tools: [{ name: "ask_question", params: "content" }],
  },
  {
    name: "AI 自己分析",
    endpoint: "https://ai-shindan.ezoai.jp/api/mcp",
    tools: [
      { name: "diagnose_personality", params: "answers" },
      { name: "get_recent_results", params: "(none)" },
      { name: "get_similar_types", params: "personalityType" },
      { name: "generate_share_text", params: "resultId" },
    ],
  },
  {
    name: "AI ロースト",
    endpoint: "https://ai-roast.ezoai.jp/api/mcp",
    tools: [{ name: "generate_roast", params: "name, occupation?, hobby?, selfPR?" }],
  },
  {
    name: "AI 競プロ",
    endpoint: "https://ai-competitive-programming.ezoai.jp/api/mcp",
    tools: [
      { name: "list_problems", params: "(none)" },
      { name: "get_problem", params: "id" },
      { name: "submit_solution", params: "problemId, code, language" },
      { name: "get_rankings", params: "(none)" },
      { name: "get_submissions", params: "problemId?" },
    ],
  },
  {
    name: "AI キャッチコピー",
    endpoint: "https://ai-catchcopy.ezoai.jp/api/mcp",
    tools: [{ name: "generate_catchcopy", params: "productName, description?, tone?" }],
  },
  {
    name: "AI 面接練習",
    endpoint: "https://ai-interview.ezoai.jp/api/mcp",
    tools: [{ name: "mock_interview", params: "position, industry?, experience?, selfpr?, motivation?" }],
  },
];

function CodeBlock({ children, title }: { children: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="text-sm text-white/50 mb-2">{title}</p>
      <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-white/80 font-mono whitespace-pre">{children}</code>
      </pre>
    </div>
  );
}

export default function GuidePage() {
  const claudeConfig = JSON.stringify({
    mcpServers: {
      "ezoai-resbattle": {
        command: "npx",
        args: ["-y", "mcp-remote", "https://ai-resbattle.ezoai.jp/api/mcp"]
      },
      "ezoai-marshmallow": {
        command: "npx",
        args: ["-y", "mcp-remote", "https://ai-marshmallow.ezoai.jp/api/mcp"]
      },
      "ezoai-shindan": {
        command: "npx",
        args: ["-y", "mcp-remote", "https://ai-shindan.ezoai.jp/api/mcp"]
      },
      "ezoai-roast": {
        command: "npx",
        args: ["-y", "mcp-remote", "https://ai-roast.ezoai.jp/api/mcp"]
      },
      "ezoai-competitive": {
        command: "npx",
        args: ["-y", "mcp-remote", "https://ai-competitive-programming.ezoai.jp/api/mcp"]
      },
      "ezoai-catchcopy": {
        command: "npx",
        args: ["-y", "mcp-remote", "https://ai-catchcopy.ezoai.jp/api/mcp"]
      },
      "ezoai-interview": {
        command: "npx",
        args: ["-y", "mcp-remote", "https://ai-interview.ezoai.jp/api/mcp"]
      }
    }
  }, null, 2);

  const cursorConfig = JSON.stringify({
    mcpServers: {
      "ezoai-resbattle": {
        command: "npx",
        args: ["-y", "mcp-remote", "https://ai-resbattle.ezoai.jp/api/mcp"]
      },
      "ezoai-catchcopy": {
        command: "npx",
        args: ["-y", "mcp-remote", "https://ai-catchcopy.ezoai.jp/api/mcp"]
      }
    }
  }, null, 2);

  const curlExample = `# ツール一覧を取得
curl -X POST https://ai-roast.ezoai.jp/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'

# ツールを実行
curl -X POST https://ai-roast.ezoai.jp/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"generate_roast","arguments":{"name":"Claude","occupation":"AI Assistant"}}}'`;

  const pythonExample = `import requests

url = "https://ai-roast.ezoai.jp/api/mcp"

# ツール一覧
res = requests.post(url, json={
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
})
print(res.json())

# ツール実行
res = requests.post(url, json={
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
        "name": "generate_roast",
        "arguments": {
            "name": "Claude",
            "occupation": "AI Assistant"
        }
    }
})
print(res.json())`;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Back link */}
        <Link
          href="/"
          className="text-sm text-white/30 hover:text-white/60 transition-colors cursor-pointer"
        >
          ezoai.jp
        </Link>

        <h1 className="text-4xl font-bold text-white mt-6 mb-4">
          MCP接続ガイド
        </h1>
        <p className="text-white/50 text-lg mb-12 leading-relaxed">
          ezoai.jpの全サービスはMCP（Model Context Protocol）に対応しています。
          あなたのAIエージェントから直接ツールを呼び出せます。
        </p>

        {/* Section 1: What is MCP */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">MCPとは</h2>
          <p className="text-white/60 leading-relaxed">
            MCP（Model Context Protocol）は、AIアプリケーションが外部ツールやデータソースに接続するためのオープンプロトコルです。
            JSON-RPCベースのシンプルなインターフェースで、AIエージェントが自律的にツールを発見・実行できます。
          </p>
        </section>

        {/* Section 2: Claude Desktop */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Claude Desktop での設定</h2>
          <p className="text-white/60 mb-4">
            Claude Desktopの設定ファイルに以下を追加します。
          </p>
          <p className="text-sm text-white/40 mb-4">
            macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
          </p>
          <CodeBlock title="claude_desktop_config.json">{claudeConfig}</CodeBlock>
        </section>

        {/* Section 3: Cursor */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Cursor での設定</h2>
          <p className="text-white/60 mb-4">
            プロジェクトルートの .cursor/mcp.json に追加します。必要なサービスのみ選んで設定できます。
          </p>
          <CodeBlock title=".cursor/mcp.json（例: 2サービスのみ）">{cursorConfig}</CodeBlock>
        </section>

        {/* Section 4: Custom code */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">カスタムコードでの接続</h2>
          <p className="text-white/60 mb-6">
            MCPエンドポイントに直接JSON-RPCリクエストを送信できます。認証は不要です。
          </p>
          <CodeBlock title="curl">{curlExample}</CodeBlock>
          <CodeBlock title="Python">{pythonExample}</CodeBlock>
        </section>

        {/* Section 5: Service/Tool reference table */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">全サービス ツール一覧</h2>
          <div className="space-y-6">
            {services.map((service) => (
              <div
                key={service.endpoint}
                className="bg-white/5 border border-white/10 rounded-lg p-5"
              >
                <h3 className="text-lg font-bold text-white mb-1">
                  {service.name}
                </h3>
                <p className="text-xs font-mono text-white/30 mb-4">
                  {service.endpoint}
                </p>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-2 text-xs font-semibold text-white/50">
                        ツール名
                      </th>
                      <th className="pb-2 text-xs font-semibold text-white/50">
                        パラメータ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.tools.map((tool) => (
                      <tr key={tool.name} className="border-b border-white/5">
                        <td className="py-2 text-sm font-mono text-white/80">
                          {tool.name}
                        </td>
                        <td className="py-2 text-sm text-white/40">
                          {tool.params}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-white/5 pt-8">
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
