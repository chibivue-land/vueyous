# VueYousへのコントリビュート

VueYous へのコントリビュートに興味を持っていただき、ありがとうございます！このプロジェクトは、VueUse のような再利用可能で保守性が高く、拡張性のある Composable 関数の作成方法を学ぶためのリソースです。

## 開発環境のセットアップ

### 前提条件

- Node.js 20 以上
- pnpm 8.15.6 以上

### セットアップ手順

1. リポジトリをフォークしてクローン：

```bash
git clone https://github.com/your-username/vueyous.git
cd vueyous
```

2. 依存関係をインストール：

```bash
pnpm install
```

3. 開発サーバーを起動：

```bash
pnpm docs:dev
```

## プロジェクト構造

```
vueyous/
├── packages/
│   ├── core/           # コア Composable 関数
│   ├── shared/         # 共有ユーティリティ
│   ├── guide/          # ドキュメント（英語）
│   ├── ja/            # ドキュメント（日本語）
│   └── zh/            # ドキュメント（中国語）
├── package.json       # ルートパッケージ設定
└── vite.config.ts     # Vite 設定
```

## コントリビュート方法

### 新しい Composable 関数の追加

1. `packages/core`ディレクトリに新しいフォルダを作成：

```bash
mkdir packages/core/useYourComposable
```

2. 以下のファイルを作成：
   - `index.ts` - Composable 関数の実装
   - `index.md` - ドキュメント
   - `demo.vue` - デモコンポーネント（必要に応じて）

3. `packages/core/index.ts`にエクスポートを追加

### ドキュメントの更新

- 英語ドキュメント: `packages/guide/`
- 日本語ドキュメント: `packages/ja/guide/`
- 中国語ドキュメント: `packages/zh/guide/`

### コーディング規約

- TypeScript を使用
- ESLint ルールに従う（`pnpm lint` で確認）
- コードフォーマットは自動適用

## 開発コマンド

```bash
# 開発サーバー起動
pnpm docs:dev

# ビルド
pnpm build

# 型チェック
pnpm type-check

# リント
pnpm lint

# リント自動修正
pnpm lint:fix

# テキストリント（日本語ドキュメント用）
pnpm lint:text

# ドキュメントビルド
pnpm docs:build

# ドキュメントプレビュー
pnpm docs:preview
```


コントリビュートありがとうございます！🎉
