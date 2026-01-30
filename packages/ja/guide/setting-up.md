# 開発環境のセットアップ

コンポーザブルの作成に入る前に、VueYous を学ぶための適切な開発環境をセットアップしましょう。この章では、便利なセットアップツールを使う方法と、手動で環境を構築する方法の 2 つのアプローチを説明します。

## 前提条件

始める前に、以下がインストールされていることを確認してください：

- **Node.js**（v24.13.0 以上）
- **pnpm**（v10.28.2 以上）

以下のコマンドを実行してインストールを確認できます：

```bash
node --version
pnpm --version
```

以下からインストールできます：

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- pnpm: [https://pnpm.io/installation](https://pnpm.io/installation)

## セットアップのアプローチ

VueYous の学習環境をセットアップする方法は 2 つあります。ニーズに合った方法を選んでください。

## アプローチ 1: create-vueyouse を使う（推奨）

最も簡単に始める方法は、`create-vueyouse` ツールを使うことです。このツールは、必要なファイルと設定をすべて含む完全な学習環境をスキャフォールディングします。

### ステップ 1: プロジェクトを作成

以下のコマンドを実行します。`my-vueyouse` は任意のディレクトリ名に置き換えてください：

```bash
pnpm dlx tsx tools/create-vueyouse/main.ts my-vueyouse
```

このコマンドは以下を行います：

- 指定した名前で新しいディレクトリを作成
- 必要なテンプレートファイルをすべてコピー
- 学習用のプロジェクト構造をセットアップ

### ステップ 2: プロジェクトに移動

```bash
cd my-vueyouse
```

### ステップ 3: 依存関係をインストール

```bash
pnpm install
```

### ステップ 4: 開発サーバーを起動

```bash
pnpm run dev
```

開発サーバーが `http://localhost:5173` で起動するはずです。ブラウザでこの URL を開けば、学習を始める準備が整いました！

## アプローチ 2: 手動セットアップ

セットアップの各部分を理解したい場合や、ゼロから環境をカスタマイズしたい場合は、以下の手順に従ってください：

### ステップ 1: Vite プロジェクトを作成

Vue と TypeScript を使った新しい Vite プロジェクトを作成します：

```bash
pnpm create vite my-vueyouse --template vue-ts
cd my-vueyouse
pnpm install
```

### ステップ 2: 不要なファイルを削除

VueYous の学習に不要なファイルを削除します：

```bash
rm -rf src/assets src/components src/style.css public
```

### ステップ 3: App.vue と main.ts をシンプルにする

`src/App.vue` の内容をシンプルなテンプレートに置き換えます：

```vue
<template>Hello VueYous!</template>
```

`src/main.ts` の内容を最小限のセットアップに置き換えます：

```typescript
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

### ステップ 4: コンポーザブル用ディレクトリを作成

コンポーザブルを構築する `packages` ディレクトリを作成します：

```bash
mkdir packages
```

最初のコンポーザブルとして `packages/index.ts` を作成します：

```typescript
export function HelloVueYous() {
  // eslint-disable-next-line no-console
  console.log("Hello VueYous!");
}
```

> [!TIP]
> `packages/` ディレクトリは、VueUse スタイルのコンポーザブルを構築する場所です。作成した各コンポーザブルは `index.ts` からエクスポートされます。

### ステップ 5: TypeScript と Vite のエイリアスを設定

`vite.config.ts` を更新して `vueyouse` エイリアスを追加します：

```typescript
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vueyouse: fileURLToPath(new URL("./packages", import.meta.url)),
    },
  },
});
```

`tsconfig.app.json` を更新して TypeScript のパスマッピングを追加します（`compilerOptions` に `baseUrl` と `paths` を追加し、`include` に `packages/**/*.ts` を追加）：

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "types": ["vite/client"],
    "baseUrl": ".",
    "paths": {
      "vueyouse": ["./packages/index.ts"]
    }
    /* ... その他のコンパイラオプション ... */
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue", "packages/**/*.ts"]
}
```

> [!IMPORTANT]
> `vueyouse` エイリアスにより、プロジェクト全体で `packages/` ディレクトリからコンポーザブルをインポートできるようになります。

### ステップ 6: HelloVueYous をインポートして呼び出す

`src/main.ts` を更新して、最初のコンポーザブルをインポートして呼び出します：

```typescript
import { createApp } from "vue";
import { HelloVueYous } from "vueyouse";
import App from "./App.vue";

HelloVueYous();

createApp(App).mount("#app");
```

### ステップ 7: 開発サーバーを起動

開発サーバーを起動します：

```bash
pnpm run dev
```

## 学習の核となる構造

VueYous プロジェクトで最も重要なのは `packages/index.ts` ファイルです。このガイド全体を通して、ここに VueUse スタイルのコンポーザブルを構築していきます。

```typescript
// packages/index.ts
export function HelloVueYous() {
  console.log("Hello VueYous!");
}

// 学習を進めるにつれて、ここにコンポーザブルを追加していきます
export function useCounter() {
  /* ... */
}
export function useMouse() {
  /* ... */
}
```

実際のプロジェクト構造はセットアップ方法によって異なる場合がありますが、このコアファイルは変わりません。

## セットアップの確認

すべてが正しく動作しているか確認するには：

1. 開発サーバーが起動していることを確認（`pnpm run dev`）
2. ブラウザで `http://localhost:5173` を開く
3. ブラウザの開発者コンソールを開く（F12 または右クリック → 検証 → Console タブ）
4. コンソールに **"Hello VueYous!"** が表示されていることを確認
5. プロジェクト内の任意のファイルを編集して保存してみてください - 変更がすぐに反映されます（ホットモジュールリプレースメント）

> [!TIP]
> コンソールに "Hello VueYous!" が表示されていれば、おめでとうございます！環境が正しくセットアップされ、学習の準備が整いました。

## 次のステップ

おめでとうございます！開発環境の準備が整いました。

次のセクションでは、最初のコンポーザブルを作成し、VueUse のコンポーザブルがどのように内部で動作するかを理解していきます。

## トラブルシューティング

### ポートがすでに使用されている

ポート 5173 がすでに使用されているというエラーが表示された場合：

```bash
# ポートを使用しているプロセスを終了
npx kill-port 5173

# または別のポートを指定
pnpm run dev -- --port 3000
```

### モジュール解決の問題

モジュール解決エラーが発生した場合：

1. `node_modules` を削除して再インストール：
   ```bash
   rm -rf node_modules
   pnpm install
   ```
2. Vite のキャッシュをクリア：
   ```bash
   rm -rf node_modules/.vite
   ```

### TypeScript エラー

エディタで TypeScript エラーが表示される場合：

1. TypeScript サーバーを再起動（VS Code の場合：`Cmd/Ctrl + Shift + P` → 「TypeScript: Restart TS Server」）
2. Vue Language Features (Volar) 拡張機能がインストールされていることを確認（Vetur ではありません）

---

コンポーザブルの構築を始める準備はできましたか？コンポーザブルとは何か、なぜ強力なのかを理解していきましょう！
