# useCounter

カウンターを管理するシンプルな composable 関数を作成します。

## なぜuseCounterが必要なのか

Web アプリケーションでは、数値を増減させる機能が頻繁に必要になります

- 「いいね」ボタンのカウント
- ショッピングカートの商品数
- ページネーションのページ番号
- タイマーやストップウォッチの秒数

これらを毎回`ref`と関数で実装するのは冗長です。`useCounter`を使えば、一貫性のある方法でカウンター機能を再利用できます。

## 基本実装

まずは最もシンプルなバージョンから始めましょう。

```ts
import { ref } from "vue";

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);

  const inc = () => count.value++;
  const dec = () => count.value--;
  const reset = () => (count.value = initialValue);

  return { count, inc, dec, reset };
}
```

### 使い方

```vue
<script setup lang="ts">
import { useCounter } from "./useCounter";

const { count, inc, dec, reset } = useCounter(0);
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="inc">+1</button>
    <button @click="dec">-1</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

これだけで、基本的なカウンター機能が動作します。しかし、まだ改善の余地があります。

## 機能拡張

現在の実装は最低限の機能しかありません。以下の機能を追加してみましょう

- 任意の値で増減（+5、-3 など）
- 最小値・最大値の制限
- 特定の値にセット

```ts
import { ref, computed } from "vue";

export interface UseCounterOptions {
  min?: number;
  max?: number;
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const { min = -Infinity, max = Infinity } = options;

  const count = ref(initialValue);

  const inc = (delta = 1) => {
    count.value = Math.min(max, count.value + delta);
  };

  const dec = (delta = 1) => {
    count.value = Math.max(min, count.value - delta);
  };

  const set = (value: number) => {
    count.value = Math.max(min, Math.min(max, value));
  };

  const reset = () => {
    count.value = initialValue;
  };

  const isMin = computed(() => count.value <= min);
  const isMax = computed(() => count.value >= max);

  return { count, inc, dec, set, reset, isMin, isMax };
}
```

### どこが改善されたのか？

1. **任意の増減**: `delta`引数を追加することで、任意の値で増減できるようになりました。
2. **値の制限**: `min`と`max`オプションを追加して、カウンターの値が特定の範囲内に収まるようにしました。
3. **状態の派生**: `isMin`と`isMax`の computed プロパティを追加して、現在の値が最小値や最大値に達しているかを簡単に判定できるようにしました。

### 使い方（拡張版）

```vue
<script setup lang="ts">
import { useCounter } from "./useCounter";

// 0から10の範囲で制限
const { count, inc, dec, set, reset, isMin, isMax } = useCounter(5, {
  min: 0,
  max: 10,
});
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="inc()" :disabled="isMax">+1</button>
    <button @click="inc(5)" :disabled="isMax">+5</button>
    <button @click="dec()" :disabled="isMin">-1</button>
    <button @click="set(7)">Set to 7</button>
    <button @click="reset">Reset</button>
    <p v-if="isMin">最小値に達しています</p>
    <p v-if="isMax">最大値に達しています</p>
  </div>
</template>
```

## VueUseとの比較

実際の VueUse の[useCounter](https://github.com/vueuse/vueuse/blob/main/packages/shared/useCounter/index.ts)実装を見てみましょう。

主な違い

1. **MaybeRef型のサポート**: VueUse では`initialValue`に`Ref`も渡せる
2. **より詳細な型定義**: 返り値の型が明確に定義されている
3. **エッジケースの処理**: より堅牢なエラーハンドリング

VueUse の実装はより汎用的ですが、基本的な構造は私たちが作ったものと同じです。

## 高度なパターン

ここまでの実装で基本は理解できましたが、VueUse のような高度な実装にはさらにいくつかのテクニックがあります。

### shallowRef vs ref

数値のような**プリミティブ値**を扱う場合、`ref`と`shallowRef`に実質的な違いはありません。しかし、概念として理解しておくことは重要です。

```ts
import { ref, shallowRef } from "vue";

// ref: 深い（deep）リアクティビティ
const deepState = ref({ nested: { value: 0 } });
deepState.value.nested.value++; // リアクティブに更新される

// shallowRef: 浅い（shallow）リアクティビティ
const shallowState = shallowRef({ nested: { value: 0 } });
shallowState.value.nested.value++; // リアクティブに更新されない
shallowState.value = { nested: { value: 1 } }; // これはリアクティブ
```

**useCounterでの選択:**

- 数値（number）はプリミティブなので、`ref`で十分
- ただし、VueUse では一貫性のため`shallowRef`を使うこともある
- パフォーマンスへの影響は、プリミティブ値では無視できる

### MaybeRef型とunref/toValue

VueUse の最も強力な特徴の一つは、**引数の柔軟性**です。

```ts
import type { MaybeRef } from "vue";
import { ref, unref } from "vue";

// MaybeRef<T> = T | Ref<T>
// 静的な値でもリアクティブな値でも受け取れる
export function useCounter(initialValue: MaybeRef<number> = 0) {
  // unrefで値を取り出す（Refなら.value、そうでなければそのまま）
  const count = ref(unref(initialValue));

  // ...
}

// 使い方の柔軟性
const counter1 = useCounter(5); // 静的な値
const initialRef = ref(10);
const counter2 = useCounter(initialRef); // リアクティブな値
```

**unref vs toValue:**

```ts
import { unref } from "vue";
import { toValue } from "@vueuse/shared";

const value = ref(5);
const getter = () => 10;

unref(value); // 5 (Refの値を取得)
unref(getter); // () => 10 (関数はそのまま)

toValue(value); // 5 (Refの値を取得)
toValue(getter); // 10 (関数を実行して結果を取得)
```

VueUse では`toValue`を使うことで、`Ref | Getter | Static`のすべてに対応できます。

### 実装例: MaybeRef対応版

```ts
import type { MaybeRef } from "vue";
import { ref, computed, unref } from "vue";

export interface UseCounterOptions {
  min?: number;
  max?: number;
}

export function useCounter(initialValue: MaybeRef<number> = 0, options: UseCounterOptions = {}) {
  const { min = -Infinity, max = Infinity } = options;

  // unrefで値を取り出してからrefに変換
  const count = ref(unref(initialValue));

  const inc = (delta = 1) => {
    count.value = Math.min(max, count.value + delta);
  };

  const dec = (delta = 1) => {
    count.value = Math.max(min, count.value - delta);
  };

  const set = (value: number) => {
    count.value = Math.max(min, Math.min(max, value));
  };

  const reset = () => {
    count.value = unref(initialValue); // resetでも元の値を取得
  };

  const isMin = computed(() => count.value <= min);
  const isMax = computed(() => count.value >= max);

  return { count, inc, dec, set, reset, isMin, isMax };
}
```

この実装により、以下のような柔軟な使い方が可能になります。

```ts
// 静的な値
const counter1 = useCounter(5);

// リアクティブな値
const initialCount = ref(10);
const counter2 = useCounter(initialCount);

// 後からinitialCountを変更しても、counter2には影響しない
// （unrefで一度値を取り出しているため）
```

## 学んだパターン

このセクションを通じて、以下のパターンを学びました

### 1. Composable関数の基本構造

```ts
export function useXxx(initialValue, options = {}) {
  // リアクティブな状態
  const state = ref(initialValue)

  // 操作メソッド
  const method1 = () => { /* ... */ }
  const method2 = () => { /* ... */ }

  // 派生状態（computed）
  const derivedState = computed(() => /* 状態に基づく計算 */)

  // 状態とメソッドを返す
  return { state, method1, method2, derivedState }
}
```

### 2. オプション引数のパターン

```ts
export interface UseXxxOptions {
  option1?: Type1;
  option2?: Type2;
}

export function useXxx(initialValue, options: UseXxxOptions = {}) {
  const { option1 = defaultValue1, option2 = defaultValue2 } = options;
  // ...
}
```

### 3. 値の制限パターン

```ts
const clampedValue = Math.max(min, Math.min(max, value));
```

### 4. computedによる派生状態

```ts
// 状態に依存する値はcomputedで定義
const isMin = computed(() => count.value <= min);
const isMax = computed(() => count.value >= max);

// メリット:
// 1. 自動的にリアクティブに更新される
// 2. キャッシュされるので効率的
// 3. テンプレートで直接使える（:disabled="isMax"）
```

## まとめ

`useCounter`は最もシンプルな composable 関数の一つですが、重要なパターンが詰まっています

- リアクティブな状態の管理（`ref`）
- 派生状態の定義（`computed`）
- オプション引数による柔軟性
- 型安全性の確保
- 値の制限とバリデーション

次のセクションでは、より複雑な状態管理パターンを学んでいきます。

## 実践: useCounterを実装しよう

ここまで学んだ知識を使って、実際に`useCounter`を実装してみましょう。

### 準備: 開発環境のセットアップ

まだ開発環境をセットアップしていない場合は、[開発環境のセットアップ](../setting-up.md)を参照して`my-vueyouse`プロジェクトを作成してください。

### ステップ1: ファイルを作成

`my-vueyouse`プロジェクトのルートで、以下のディレクトリとファイルを作成します。

```bash
mkdir -p packages/core/useCounter
```

`packages/core/useCounter/index.ts`を作成し、以下の骨組みコードをコピーしてください。

```ts
import { ref, computed } from "vue";

export interface UseCounterOptions {
  min?: number;
  max?: number;
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const { min = -Infinity, max = Infinity } = options;

  const count = ref(initialValue);

  // TODO: inc, dec, set, resetメソッドを実装

  const inc = (delta = 1) => {
    // ここに実装
  };

  const dec = (delta = 1) => {
    // ここに実装
  };

  const set = (value: number) => {
    // ここに実装
  };

  const reset = () => {
    // ここに実装
  };

  const isMin = computed(() => {
    // ここに実装
    return false;
  });

  const isMax = computed(() => {
    // ここに実装
    return false;
  });

  return { count, inc, dec, set, reset, isMin, isMax };
}
```

### ステップ2: メソッドを実装

以下のメソッドを実装してください。

1. **inc(delta)**: カウントを増やす（`max`を超えないように制限）
2. **dec(delta)**: カウントを減らす（`min`を下回らないように制限）
3. **set(value)**: 特定の値にセット（`min`と`max`の範囲内に収める）
4. **reset()**: `initialValue`に戻す
5. **isMin**: `count.value <= min`を返す computed
6. **isMax**: `count.value >= max`を返す computed

**ヒント:**

- 値の制限には`Math.min(max, value)`と`Math.max(min, value)`を組み合わせる
- このセクションの「機能拡張」に実装例がある

### ステップ3: エクスポートして使用

`packages/index.ts`からエクスポートします。

```ts
export { useCounter } from "./core/useCounter";
```

### ステップ4: デモファイルを作成

`src/demos/UseCounterDemo.vue`を作成してテストしましょう。

```vue
<script setup lang="ts">
import { useCounter } from "vueyouse";

const { count, inc, dec, set, reset, isMin, isMax } = useCounter(5, {
  min: 0,
  max: 10,
});
</script>

<template>
  <div>
    <h2>useCounter Demo</h2>
    <p>Count: {{ count }}</p>
    <button @click="inc()" :disabled="isMax">+1</button>
    <button @click="dec()" :disabled="isMin">-1</button>
    <button @click="set(7)">Set to 7</button>
    <button @click="reset">Reset</button>
    <p v-if="isMin">最小値に達しました</p>
    <p v-if="isMax">最大値に達しました</p>
  </div>
</template>
```

### ステップ5: App.vueにインポート

`src/App.vue`を更新してデモを表示します。

```vue
<script setup lang="ts">
import UseCounterDemo from "./demos/UseCounterDemo.vue";
</script>

<template>
  <div>
    <h1>VueYous Demos</h1>
    <hr />
    <UseCounterDemo />
  </div>
</template>
```

開発サーバーを起動して（`pnpm run dev`）、動作を確認してください！

> [!TIP]
> デモファイルを`src/demos/`に分離することで、新しいセクションを追加する際も`App.vue`を上書きせずに済みます。各コンポーザブルごとに独立したデモファイルを作成し、`App.vue`でインポートして表示しましょう。

## 練習問題

以下の機能を追加してみましょう。

1. `double()`メソッド: カウントを 2 倍にする（最大値制限も考慮）
2. `onChange`コールバック: 値が変更されたときに呼ばれる関数
3. `get()`メソッド: 現在の値を返す（count.value の代わり）

<details>
<summary>ヒント</summary>

```ts
import { ref, computed, watch } from "vue";

export interface UseCounterOptions {
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const { min = -Infinity, max = Infinity, onChange } = options;

  const count = ref(initialValue);

  // 既存のメソッド...

  const double = () => {
    // count.value * 2 を最大値制限内でセット
    set(count.value * 2);
  };

  const get = () => {
    // 現在の値を返す
    return count.value;
  };

  // onChange監視
  if (onChange) {
    watch(count, (newValue) => onChange(newValue));
  }

  return { count, inc, dec, set, reset, double, get, isMin, isMax };
}
```

</details>

<details>
<summary>解答</summary>

### 完全な実装

```ts
import { ref, computed, watch } from "vue";

export interface UseCounterOptions {
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const { min = -Infinity, max = Infinity, onChange } = options;

  const count = ref(initialValue);

  const inc = (delta = 1) => {
    count.value = Math.min(max, count.value + delta);
  };

  const dec = (delta = 1) => {
    count.value = Math.max(min, count.value - delta);
  };

  const set = (value: number) => {
    count.value = Math.max(min, Math.min(max, value));
  };

  const reset = () => {
    count.value = initialValue;
  };

  // 1. double()メソッド
  const double = () => {
    // setメソッドを使うことで、自動的に最大値制限が適用される
    set(count.value * 2);
  };

  // 3. get()メソッド
  const get = () => {
    return count.value;
  };

  const isMin = computed(() => count.value <= min);
  const isMax = computed(() => count.value >= max);

  // 2. onChange コールバック
  if (onChange) {
    watch(count, (newValue) => {
      onChange(newValue);
    });
  }

  return { count, inc, dec, set, reset, double, get, isMin, isMax };
}
```

### 使い方

```vue
<script setup lang="ts">
import { useCounter } from "./useCounter";

const { count, inc, dec, double, get, reset } = useCounter(5, {
  min: 0,
  max: 100,
  onChange: (value) => {
    console.log("カウントが変更されました:", value);
  },
});
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>現在の値: {{ get() }}</p>
    <button @click="inc()">+1</button>
    <button @click="double()">2倍にする</button>
    <button @click="reset()">Reset</button>
  </div>
</template>
```

### ポイント

1. **double()**: 既存の`set()`メソッドを再利用することで、値の制限ロジックを重複させない
2. **onChange**: `watch`を使うことで、値が変更されるたびに自動的にコールバックを実行
3. **get()**: `count.value`のエイリアス。テンプレート外で値を取得する際に便利

</details>
