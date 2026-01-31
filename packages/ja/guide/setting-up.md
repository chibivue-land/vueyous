# 開発環境のセットアップ

コンポーザブルの作成に入る前に、VueYous を学ぶための開発環境をセットアップしましょう。

VueYous は **Vue.js の API を含めて自作する**アプローチを取ります。つまり、`ref`, `computed`, `watchEffect` といったリアクティビティシステムをミニマルな実装で理解してから、その上で VueUse スタイルのコンポーザブルを構築していきます。

> [!TIP]
> このアプローチは [chibivue](https://github.com/chibivue-land/chibivue) や [chibivitest](https://github.com/chibivue-land/chibivitest)、[chibinuxt](https://github.com/chibivue-land/chibinuxt) と同じ「chibi（ミニマル）」の精神に基づいています。既存の API をそのまま使うのではなく、根本から実装することで、仕組みを深く理解できます。

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

### ステップ 4: 実行して確認

```bash
pnpm run dev
```

コンソールに **"Hello VueYous!"** が表示されれば成功です！

## アプローチ 2: 手動セットアップ

セットアップの各部分を理解したい場合や、ゼロから環境をカスタマイズしたい場合は、以下の手順に従ってください：

### ステップ 1: プロジェクトディレクトリを作成

```bash
mkdir my-vueyouse
cd my-vueyouse
pnpm init
```

### ステップ 2: 依存関係をインストール

```bash
pnpm add -D typescript tsx @types/node
```

> [!NOTE]
> - **TypeScript**: 型安全性のため
> - **tsx**: TypeScript ファイルを直接実行するため
> - **@types/node**: Node.js の型定義

### ステップ 3: TypeScript の設定

`tsconfig.json` を作成します：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "vueyouse": ["./packages/index.ts"]
    }
  },
  "include": ["src/**/*", "packages/**/*"]
}
```

> [!IMPORTANT]
> `paths` の `"vueyouse": ["./packages/index.ts"]` により、プロジェクト全体で `vueyouse` というエイリアスを使ってコンポーザブルをインポートできます。

### ステップ 4: package.json にスクリプトを追加

`package.json` に以下を追加します：

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx --watch src/main.ts"
  }
}
```

> [!TIP]
> `--watch` フラグにより、ファイルを保存するたびに自動的に再実行されます（ホットリロード）。

### ステップ 5: ディレクトリ構造を作成

```bash
mkdir src packages
```

### ステップ 6: エントリーポイントを作成

`src/main.ts` を作成します：

```typescript
import { HelloVueYous } from "vueyouse";

HelloVueYous();
```

### ステップ 7: 最初のコンポーザブルを作成

`packages/index.ts` を作成します：

```typescript
export function HelloVueYous() {
  console.log("Hello VueYous!");
}
```

> [!TIP]
> `packages/` ディレクトリは、VueUse スタイルのコンポーザブルを構築する場所です。作成した各コンポーザブルは `index.ts` からエクスポートされます。

### ステップ 8: 実行して確認

```bash
pnpm run dev
```

## プロジェクト構造

セットアップが完了すると、以下のような構造になります：

```
my-vueyouse/
├── src/
│   └── main.ts          # エントリーポイント（実験・テスト用）
├── packages/
│   └── index.ts         # コンポーザブルを実装する場所
├── package.json
└── tsconfig.json
```

**重要なポイント：**

- **`packages/index.ts`**: VueYous の核となるファイル。ここにすべてのコンポーザブルを実装します
- **`src/main.ts`**: 実験やテスト用のエントリーポイント。作成したコンポーザブルを試す場所
- **シンプルな構成**: Vite や Vue は不要。純粋な TypeScript 環境でリアクティビティの仕組みから学べます

## セットアップの確認

すべてが正しく動作しているか確認するには

1. `pnpm run dev` を実行
2. コンソールに **"Hello VueYous!"** が表示されることを確認
3. `packages/index.ts` を編集してみてください：

```typescript
export function HelloVueYous() {
  console.log("Hello VueYous! 🎉");
}
```

4. ファイルを保存すると、自動的に再実行され、新しいメッセージが表示されます

> [!TIP]
> コンソールに "Hello VueYous!" が表示されていれば、おめでとうございます！環境が正しくセットアップされ、学習の準備が整いました。

## 学習の流れ

VueYous では、以下の順序で学んでいきます：

1. **Part 0: ミニマル Vue.js API の実装**
   - `ref` の簡易実装（dependency tracking の仕組み）
   - `computed` の簡易実装
   - `watchEffect` の簡易実装

2. **Part 1 以降: VueUse スタイルのコンポーザブル実装**
   - 自作した Vue API を使って、VueUse のパターンを学ぶ
   - 状態管理、DOM 操作、ブラウザ API、センサー、ネットワークなど

## なぜ Vue.js を使わないのか？

VueYous が Vue.js の API をそのまま使わない理由

### 1. **教育的価値**

Vue.js の API（`ref`, `computed` など）をそのまま使うと、VueUse のソースコードをほぼコピペするだけになってしまいます。自作することで、**なぜそのように実装されているのか**を深く理解できます。

### 2. **ミニマルなコード**

「chibi（小さい）」の精神に基づき、必要最小限のコードで仕組みを理解します。本番環境の Vue.js は多くの機能を持っていますが、VueYous では学習に必要な部分だけを実装します。

### 3. **リアクティビティの仕組みを理解**

リアクティビティシステムがどのように動作するかを理解することで、Vue.js や VueUse をより効果的に使えるようになります。

## 次のステップ

おめでとうございます！開発環境の準備が整いました。

次のセクションでは、リアクティビティの基礎となる `ref` の簡易実装から始めて、Vue.js のリアクティビティシステムの仕組みを理解していきます。

## トラブルシューティング

### tsx コマンドが見つからない

tsx がインストールされていない場合は、以下を実行してください：

```bash
pnpm add -D tsx
```

### モジュール解決の問題

`vueyouse` をインポートできない場合：

1. `tsconfig.json` の `paths` 設定を確認
2. プロジェクトのルートディレクトリで実行していることを確認
3. TypeScript サーバーを再起動（VS Code の場合：`Cmd/Ctrl + Shift + P` → 「TypeScript: Restart TS Server」）

### ファイル監視が動作しない

`--watch` が動作しない場合：

1. ファイルを保存していることを確認
2. `tsx` のバージョンを確認（最新版を推奨）
3. 手動で再実行：`pnpm run dev`

---

準備ができたら、リアクティビティの核心に飛び込みましょう！
