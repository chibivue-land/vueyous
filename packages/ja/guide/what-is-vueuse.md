# VueUseとは？

[VueUse](https://vueuse.org/)は、Vue Composition API の必須ユーティリティ集です。Vue アプリケーションにおける一般的なプログラミング課題を解決するための、豊富なコンポーザブル関数セットを提供しています。

## VueUseが解決する問題

Vue アプリケーションを構築する際、同じパターンを何度も書いていることに気づくことがあります。

- ウィンドウリサイズリスナーの管理
- マウスとキーボードイベントの処理
- localStorage へのデータ保存
- ダークモード設定の検出
- 非同期操作の取り扱い

VueUse は、これらの一般的な問題に対して、実戦でテストされた最適化されたソリューションを提供することで、車輪の再発明ではなく機能開発に集中できるようにします。

## コンポーザブルとは？

**コンポーザブル**とは、Vue の Composition API を活用して状態を持つロジックをカプセル化し、再利用可能にする関数のことです。コンポーネントのロジックを再利用可能な関数として抽出する方法と考えてください。

### 例: VueUseを使わない場合

VueUse を使わずにマウスの位置を追跡する場合は次のようになります。

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const x = ref(0);
const y = ref(0);

function update(event: MouseEvent) {
  x.value = event.pageX;
  y.value = event.pageY;
}

onMounted(() => window.addEventListener("mousemove", update));
onUnmounted(() => window.removeEventListener("mousemove", update));
</script>

<template>
  <div>Mouse position: {{ x }}, {{ y }}</div>
</template>
```

### 例: VueUseを使う場合

VueUse の`useMouse`コンポーザブルを使うと、同じ機能がはるかにシンプルになります。

```vue
<script setup lang="ts">
import { useMouse } from "@vueuse/core";

const { x, y } = useMouse();
</script>

<template>
  <div>Mouse position: {{ x }}, {{ y }}</div>
</template>
```

VueUse がライフサイクル管理、クリーンアップ、エッジケースの処理を自動で行っていることに注目してください。このコンポーザブルは自動的にイベントリスナーの追加と削除を行い、メモリリークを防ぎ、複雑なシナリオでも正しく動作します。

## 主な利点

### 1. 再利用性

一度ロジックを書けば、どこでも使えます。コンポーザブルはコンポーネント間やプロジェクト間で共有できます。

### 2. 型安全性

VueUse は TypeScript で書かれており、優れた型推論を提供し、コンパイル時にエラーをキャッチします。

### 3. ツリーシェイキング対応

使用するコンポーザブルだけが最終的なバンドルに含まれるため、アプリケーションを軽量に保つことができます。

### 4. SSRフレンドリー

多くの VueUse 関数は、Nuxt のようなサーバーサイドレンダリング環境でシームレスに動作します。

### 5. 十分にテストされている

すべてのコンポーザブルは徹底的にテストされており、何千人もの開発者によって本番環境で使用されています。

## VueUse関数のカテゴリー

VueUse は 200 以上の関数を論理的なカテゴリーに整理しています。

- State（状態）: リアクティブ状態管理（`useLocalStorage`、`useSessionStorage`、`useToggle`）
- Elements（要素）: DOM 要素とのインタラクション（`useEventListener`、`useIntersectionObserver`）
- Browser（ブラウザ）: ブラウザ API（`useDark`、`useMediaQuery`、`useClipboard`）
- Sensors（センサー）: ユーザー入力検出（`useMouse`、`useKeyboard`、`useSwipe`）
- Network（ネットワーク）: ネットワークリクエストと接続性（`useFetch`、`useWebSocket`）
- Animation（アニメーション）: タイミングとトランジション（`useInterval`、`useTimeout`、`useTransition`）
- Component（コンポーネント）: コンポーネントユーティリティ（`useVModel`、`useTemplateRef`）
- Watch（監視）: 拡張ウォッチャー（`watchDebounced`、`watchThrottled`、`until`）
- Reactivity（リアクティビティ）: 高度なリアクティビティパターン（`computedAsync`、`refDebounced`）
- Array（配列）: リアクティブ配列操作（`useArrayMap`、`useArrayFilter`）
- Utilities（ユーティリティ）: ヘルパー関数（`createSharedComposable`、`until`、`whenever`）

## この本での学習アプローチ

VueUse の関数を使うだけでなく、この本では**自分で構築する方法**を教えます。VueUse コンポーザブルの簡略版を再現することで、次のことができるようになります。

- 内部でどのように動作しているかを**理解**できます
- 特定のパターンが使われている**理由**を学べます
- 独自のニーズに合わせた**カスタム**コンポーザブルを作成できるようになります

魚を与えられるのではなく、釣り方を学ぶようなものです。最終的には、VueUse を効果的に使う方法だけでなく、特定の問題を解決するコンポーザブル関数を構築する方法も習得できます。

## 始める準備はできましたか？

VueUse が何であり、なぜ価値があるのかを理解できたので、環境をセットアップして、最初のコンポーザブルを構築しましょう！
