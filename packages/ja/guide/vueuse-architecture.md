# VueUseの構成

## 概要

VueUse は、Vue 開発者向けに 200 以上の機能を提供する Vue Composition API ユーティリティの重要なコレクションです。そのアーキテクチャを理解することで、同様のパターンに従ってより優れたコンポーザブルを作成できます。

## 基本原則

### 1. モジュラー設計
VueUse は、各ユーティリティが次のような特徴を持つモジュラーアプローチを採用しています。
- 自己完結型で、各関数は独立してインポート・使用可能
- ツリーシェイキング対応により、使用するユーティリティのみバンドルに含まれる
- カテゴリ分類により、関数は論理的なグループに整理される

### 2. パッケージ構造

VueUse は複数のパッケージで構成されています。たとえば、次のようなパッケージがあります。

- @vueuse/core は一般的なタスク用の必須ユーティリティ
- @vueuse/shared はパッケージ間で使用される共有ユーティリティ
- @vueuse/integrations はサードパーティライブラリとの統合
- @vueuse/router はルーター関連のユーティリティ
- @vueuse/rxjs は RxJS 統合
- @vueuse/firebase は Firebase 統合

## 関数カテゴリ

### 主要カテゴリ

1. **状態管理**
   - `useLocalStorage`、`useSessionStorage`
   - `useRefHistory`、`useManualRefHistory`
   - `useCloned`

2. **センサー**
   - `useMouse`、`useMousePressed`
   - `useDeviceOrientation`、`useDeviceMotion`
   - `useGeolocation`

3. **ブラウザAPI**
   - `useClipboard`、`usePermission`
   - `useFullscreen`、`useDocumentVisibility`
   - `useBrowserLocation`

4. **アニメーション＆タイミング**
   - `useInterval`、`useTimeout`
   - `useRafFn`、`useTimestamp`
   - `useTransition`

5. **ネットワーク＆通信**
   - `useFetch`、`useWebSocket`
   - `useEventSource`
   - `useWebWorker`

6. **コンポーネントユーティリティ**
   - `useVModel`、`useVModels`
   - `templateRef`
   - `unrefElement`

## デザインパターン

### 1. 一貫性のあるAPI設計

VueUse 関数は一貫したパターンに従います：

```typescript
// ほとんどの関数はリアクティブなrefを返す
const { x, y } = useMouse()

// オプションは最後のパラメータとして渡される
const { data, error } = useFetch(url, {
  refetch: true,
  timeout: 5000
})

// クリーンアップは自動的に処理される
const { pause, resume } = useInterval(1000, {
  immediate: true
})
```

### 2. デフォルトでリアクティブ

すべての VueUse 関数は Vue のリアクティビティシステムと連携します。

```typescript
const storage = useLocalStorage('key', 'default')
// storageはlocalStorageと同期するref

storage.value = 'new value' // localStorageを自動的に更新
```

### 3. SSR互換性

関数はクライアントとサーバーの両環境で動作するよう設計されています。具体的には、次のような仕組みを備えています。
- ブラウザ API のサーバーサイドチェック
- API が利用できない場合のフォールバック機能（デフォルト値の返却など）
- ハイドレーションセーフな実装

### 4. TypeScriptファースト

すべての関数は TypeScript で書かれており、次のような利点があります。
- 完全な型推論
- 詳細な型定義
- 包括的な IDE サポート

## 実装パターン

### 1. 一時停止可能なコントロール

多くの関数は制御メカニズムを提供します：

```typescript
interface Pausable {
  isActive: Ref<boolean>
  pause: () => void
  resume: () => void
}
```

### 2. イベントクリーンアップ

イベントリスナーとサブスクリプションの自動クリーンアップ：

```typescript
// コンポーネントのアンマウント時にイベントが自動的に削除される
useEventListener(target, 'click', handler)
```

### 3. 設定可能なオプション

関数は柔軟性のために設定オブジェクトを受け入れます：

```typescript
interface UseMouseOptions {
  type?: 'page' | 'client'
  touch?: boolean
  resetOnTouchEnds?: boolean
  initialValue?: { x: number; y: number }
}
```

## VueUseのベストプラクティス

1. **単一責任**: 各関数は一つのことをうまく行う
2. **構成可能性**: 関数を組み合わせて複雑な動作を作成できる
3. **パフォーマンス**: 遅延評価とメモ化による不要な再計算の防止
4. **開発者体験**: 明確な命名、優れたドキュメント、例
5. **テスト**: 信頼性のための包括的なテストカバレッジ

## VueUseライクなコンポーザブルの作成

VueUse パターンに従って独自のコンポーザブルを作成する場合、次の点に注意しましょう。より詳細なガイドラインについては、[VueUse Guidelines](https://vueuse.org/guidelines) と [Best Practice Guide](https://vueuse.org/guide/best-practice.html) を参照することをお勧めします。これらのドキュメントには、実際の VueUse 開発で培われた知見が詰まっています。

1. **`use`プレフィックスで命名**: `useMyFeature()`
2. **リアクティブな値を返す**: `ref()`、`reactive()`、または`computed()`を使用
3. **クリーンアップを処理**: クリーンアップロジックには`onUnmounted()`を使用
4. **コントロールを提供**: 該当する場合は pause/resume/stop 関数を返す
5. **オプションを受け入れる**: 設定用のオプションオブジェクトを使用
6. **TypeScriptをサポート**: ジェネリクスやオーバーロードを含む型定義を追加
7. **ドキュメント化**: JSDoc コメントで使用例とエッジケースを含める

## ディレクトリ構造の例

```
packages/
├── core/                 # コアユーティリティ
│   ├── useStorage/
│   │   ├── index.ts     # メイン実装
│   │   ├── index.md     # ドキュメント
│   │   └── demo.vue     # インタラクティブデモ
│   └── index.ts         # パッケージエクスポート
├── shared/              # 共有ユーティリティ
│   └── utils/
│       ├── is.ts        # 型ガード
│       └── types.ts     # 型定義
└── guide/               # ドキュメント
    └── *.md             # ガイドチャプター
```

このアーキテクチャにより、VueUse は次のような特徴を実現しています。
- 保守性を高める明確な構造と関心の分離
- 拡張性を確保し、新しい関数の追加が容易
- テスト可能性を向上させる明確な境界を持つ分離されたユニット
- パフォーマンスを最適化するツリーシェイキングによるバンドルサイズの削減
