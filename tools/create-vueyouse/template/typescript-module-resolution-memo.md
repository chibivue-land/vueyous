# TypeScriptモジュール解決の設定メモ

## 問題

playground 内で `import { HelloVueYous } from 'vueyouse'` を使用すると以下のエラーが発生：

```
モジュール 'vueyouse' またはそれに対応する型宣言が見つかりません。ts(2307)
```

## 原因

モノレポ構造では、**ViteとTypeScriptの両方にモジュール解決設定が必要**：

- **Vite** (`vite.config.ts`): ランタイムのモジュール解決を担当
- **TypeScript** (`tsconfig.app.json`): 型チェック時のモジュール解決を担当

この案件では、Vite にはエイリアス設定があったが、TypeScript のパスマッピングが欠けていた。

## 解決策

`examples/playground/tsconfig.app.json` に以下を追加：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "vueyouse": ["../../packages/index.ts"]
    }
  }
}
```

### 重要なポイント

1. **`baseUrl: "."`**: 相対パスの基準点を設定（必須）
2. **`paths`マッピング**: TypeScript にモジュールの実際の場所を教える
3. **Viteとの整合性**: `vite.config.ts`のエイリアス設定と同じパスを指すようにする

## 設定ファイルの関係

```
examples/playground/
├── vite.config.ts          # Viteのエイリアス: vueyouse → ../../packages
├── tsconfig.json           # プロジェクトのルート設定
├── tsconfig.app.json       # アプリ用設定（ここにpathsを追加）
└── tsconfig.node.json      # Node用設定（vite.config.ts用）
```

## 教訓

モノレポでローカルパッケージを参照する場合は、以下の両方を設定する。

- ビルドツールのエイリアス/解決設定（Vite, Webpack 等）
- TypeScript の paths マッピング

片方だけでは、実行時は動くが型チェックが失敗する（またはその逆）。
