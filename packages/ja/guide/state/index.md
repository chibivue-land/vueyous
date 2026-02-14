# Chapter 1: State（状態管理）

このチャプターでは、リアクティブな状態管理パターンを学びます。

Vue のリアクティビティシステムを活用して、再利用可能な状態管理の composable 関数を作成していきます。

## このチャプターで学ぶこと

- 基本的なカウンターとトグルの実装
- localStorage/sessionStorage を使った永続化
- 状態履歴の追跡（undo/redo 機能）
- 状態管理のベストプラクティス

## セクション一覧

- [useCounter](./useCounter.md) - シンプルなカウンター管理

## 前提知識

このチャプターを進める前に、以下の知識があることを推奨します（必須ではありませんが、理解が深まります）

- Vue 3 の Composition API の基礎（`ref`, `computed`, `watch`）
- TypeScript の基本的な型定義
- JavaScript のクロージャとスコープ

準備ができたら、最初の composable 関数である`useCounter`から始めましょう！
