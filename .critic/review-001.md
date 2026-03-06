# Pro Critic Review: ezoai-portal
## Date: 2026-03-04
## Review: #001 (Initial)
## Overall Score: 55/100

---

### Category Scores

| Category | Score | Details |
|----------|-------|---------|
| ブラウザアプリ完成度 | 12/20 | robots.tsなし。dark class未付与。JSON-LD未実装。keywords未設定。canonical未設定。Nav非sticky(ページ内インライン)。OG画像参照なし |
| UI/UXデザイン | 16/20 | ヒーロー完成度高い。サービスグリッド色分け秀逸。Steps/Dev table整備。ただしNav非sticky。guideページへの導線弱い |
| システム設計 | 14/20 | ポータルとしてのAPIは単純なGET。RecentActivityのクライアントfetchは適切。ただしエラーハンドリング弱い。AI生成不要のためフォールバック問題なし |
| AIエージェント導線 | 7/20 | **agent.json重大問題**: 5サービスしか記載(7中)。URLが2箇所誤り(ai-personality→ai-shindan, ai-compprog→ai-competitive-programming)。**llms.txt重大問題**: 5サービスのみ。ツール名が間違い(analyze_personality等)。URL不整合。MCPディレクトリAPIは正しい |
| 人間エンタメ体験 | 6/20 | RecentActivityは外部API依存で不安定。ポータル自体のコンテンツが薄い。guideページは充実しているが導線不足 |

---

### Critical Issues (P0)

1. **agent.json不完全**: 5/7サービスのみ。URLが2箇所誤り(ai-personality.ezoai.jp→ai-shindan.ezoai.jp、ai-compprog.ezoai.jp→ai-competitive-programming.ezoai.jp)
2. **llms.txt不完全**: 5/7サービスのみ。ツール名が多数間違い。URL不整合

### Major Issues (P1)

3. **robots.ts未実装**: metadata.robotsのみ。`/api/mcp-directory`のAllow明記なし
4. **JSON-LD未実装**: WebSite/Organization構造化データなし
5. **`<html>` dark class未付与**
6. **Nav非sticky**: ページ内インラインで非固定

### Medium Issues (P2)

7. **keywords未設定**
8. **canonical未設定**

---

### Score Breakdown

```
ブラウザアプリ完成度:  12/20
UI/UXデザイン:        16/20
システム設計:          14/20
AIエージェント導線:     7/20
人間エンタメ体験:       6/20
──────────────────────
合計:                  55/100
```
