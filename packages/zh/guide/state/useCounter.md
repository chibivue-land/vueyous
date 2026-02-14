# useCounter

创建一个用于管理计数器的简单组合式函数。

## 为什么需要 useCounter？

在 Web 应用程序中，经常需要增减数值的功能：

- "点赞"按钮的计数
- 购物车商品数量
- 分页的页码
- 计时器或秒表的秒数

每次都用 `ref` 和函数实现这些功能会很冗余。使用 `useCounter` 可以以一致的方式复用计数器功能。

## 基本实现

让我们从最简单的版本开始。

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

### 使用方法

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

仅此而已，基本的计数器功能就可以运行了。不过，仍有改进空间。

## 功能扩展

当前的实现只有最基本的功能。让我们添加以下功能：

- 按任意值增减（+5、-3 等）
- 最小值和最大值限制
- 设置为特定值

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

### 改进了哪些地方？

1. **任意增减**：通过添加 `delta` 参数，现在可以按任意值增减。
2. **值的限制**：添加了 `min` 和 `max` 选项，使计数器的值保持在特定范围内。
3. **派生状态**：添加了 `isMin` 和 `isMax` 计算属性，可以轻松判断当前值是否已达到最小值或最大值。

### 使用方法（扩展版）

```vue
<script setup lang="ts">
import { useCounter } from "./useCounter";

// 限制在 0 到 10 的范围
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
    <p v-if="isMin">已达到最小值</p>
    <p v-if="isMax">已达到最大值</p>
  </div>
</template>
```

## 与 VueUse 的比较

让我们看看实际的 VueUse [useCounter](https://github.com/vueuse/vueuse/blob/main/packages/shared/useCounter/index.ts) 实现。

主要区别：

1. **MaybeRef 类型支持**：VueUse 允许将 `Ref` 作为 `initialValue` 传递
2. **更详细的类型定义**：返回值的类型明确定义
3. **边缘情况处理**：更强大的错误处理

VueUse 的实现更加通用，但基本结构与我们创建的相同。

## 高级模式

到目前为止的实现已经让你理解了基础，但像 VueUse 这样的高级实现还使用了几种额外的技术。

### shallowRef vs ref

处理**原始值**（如数字）时，`ref` 和 `shallowRef` 实际上没有区别。不过，理解这个概念很重要。

```ts
import { ref, shallowRef } from "vue";

// ref: 深度（deep）响应式
const deepState = ref({ nested: { value: 0 } });
deepState.value.nested.value++; // 响应式更新

// shallowRef: 浅层（shallow）响应式
const shallowState = shallowRef({ nested: { value: 0 } });
shallowState.value.nested.value++; // 不会响应式更新
shallowState.value = { nested: { value: 1 } }; // 这会响应式更新
```

**useCounter 的选择：**

- 数字（number）是原始值，所以 `ref` 就足够了
- 不过，VueUse 有时为了一致性会使用 `shallowRef`
- 对于原始值，性能影响可以忽略不计

### MaybeRef 类型和 unref/toValue

VueUse 最强大的特性之一是**参数的灵活性**。

```ts
import type { MaybeRef } from "vue";
import { ref, unref } from "vue";

// MaybeRef<T> = T | Ref<T>
// 可以接受静态值或响应式值
export function useCounter(initialValue: MaybeRef<number> = 0) {
  // unref 提取值（如果是 Ref，则取 .value；否则，保持原样）
  const count = ref(unref(initialValue));

  // ...
}

// 使用的灵活性
const counter1 = useCounter(5); // 静态值
const initialRef = ref(10);
const counter2 = useCounter(initialRef); // 响应式值
```

**unref vs toValue：**

```ts
import { unref } from "vue";
import { toValue } from "@vueuse/shared";

const value = ref(5);
const getter = () => 10;

unref(value); // 5（获取 Ref 的值）
unref(getter); // () => 10（函数保持原样）

toValue(value); // 5（获取 Ref 的值）
toValue(getter); // 10（执行函数并获取结果）
```

VueUse 使用 `toValue` 可以同时处理 `Ref | Getter | Static` 所有情况。

### 实现示例：MaybeRef 支持版

```ts
import type { MaybeRef } from "vue";
import { ref, computed, unref } from "vue";

export interface UseCounterOptions {
  min?: number;
  max?: number;
}

export function useCounter(initialValue: MaybeRef<number> = 0, options: UseCounterOptions = {}) {
  const { min = -Infinity, max = Infinity } = options;

  // 用 unref 提取值后转换为 ref
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
    count.value = unref(initialValue); // reset 时也提取原始值
  };

  const isMin = computed(() => count.value <= min);
  const isMax = computed(() => count.value >= max);

  return { count, inc, dec, set, reset, isMin, isMax };
}
```

这种实现使得可以灵活使用：

```ts
// 静态值
const counter1 = useCounter(5);

// 响应式值
const initialCount = ref(10);
const counter2 = useCounter(initialCount);

// 稍后更改 initialCount 不会影响 counter2
// （因为值已通过 unref 提取一次）
```

## 学到的模式

通过本节，你学到了以下模式：

### 1. 组合式函数的基本结构

```ts
export function useXxx(initialValue, options = {}) {
  // 响应式状态
  const state = ref(initialValue)

  // 操作方法
  const method1 = () => { /* ... */ }
  const method2 = () => { /* ... */ }

  // 派生状态（computed）
  const derivedState = computed(() => /* 基于状态的计算 */)

  // 返回状态和方法
  return { state, method1, method2, derivedState }
}
```

### 2. 选项参数模式

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

### 3. 值限制模式

```ts
const clampedValue = Math.max(min, Math.min(max, value));
```

### 4. 使用 computed 的派生状态

```ts
// 依赖于状态的值用 computed 定义
const isMin = computed(() => count.value <= min);
const isMax = computed(() => count.value >= max);

// 优点：
// 1. 自动响应式更新
// 2. 缓存以提高效率
// 3. 可以直接在模板中使用（:disabled="isMax"）
```

## 总结

`useCounter` 是最简单的组合式函数之一，但包含了重要的模式：

- 管理响应式状态（`ref`）
- 定义派生状态（`computed`）
- 通过选项参数实现灵活性
- 确保类型安全
- 值限制和验证

在下一节中，我们将学习更复杂的状态管理模式。

## 实践：实现 useCounter

让我们使用到目前为止学到的知识来实际实现 `useCounter`。

### 准备：开发环境设置

如果你还没有设置开发环境，请参考[开发环境设置](../setting-up.md)创建 `my-vueyouse` 项目。

### 步骤 1：创建文件

在 `my-vueyouse` 项目的根目录中，创建以下目录和文件。

```bash
mkdir -p packages/core/useCounter
```

创建 `packages/core/useCounter/index.ts` 并复制以下框架代码。

```ts
import { ref, computed } from "vue";

export interface UseCounterOptions {
  min?: number;
  max?: number;
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const { min = -Infinity, max = Infinity } = options;

  const count = ref(initialValue);

  // TODO: 实现 inc、dec、set、reset 方法

  const inc = (delta = 1) => {
    // 在这里实现
  };

  const dec = (delta = 1) => {
    // 在这里实现
  };

  const set = (value: number) => {
    // 在这里实现
  };

  const reset = () => {
    // 在这里实现
  };

  const isMin = computed(() => {
    // 在这里实现
    return false;
  });

  const isMax = computed(() => {
    // 在这里实现
    return false;
  });

  return { count, inc, dec, set, reset, isMin, isMax };
}
```

### 步骤 2：实现方法

请实现以下方法：

1. **inc(delta)**：增加计数（限制不超过 `max`）
2. **dec(delta)**：减少计数（限制不低于 `min`）
3. **set(value)**：设置为特定值（限制在 `min` 和 `max` 范围内）
4. **reset()**：返回到 `initialValue`
5. **isMin**：返回 `count.value <= min` 的 computed
6. **isMax**：返回 `count.value >= max` 的 computed

**提示：**

- 结合使用 `Math.min(max, value)` 和 `Math.max(min, value)` 来限制值
- "功能扩展"部分有实现示例

### 步骤 3：导出并使用

从 `packages/index.ts` 导出。

```ts
export { useCounter } from "./core/useCounter";
```

### 步骤 4：创建演示文件

创建 `src/demos/UseCounterDemo.vue` 进行测试。

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
    <p v-if="isMin">已达到最小值</p>
    <p v-if="isMax">已达到最大值</p>
  </div>
</template>
```

### 步骤 5：在 App.vue 中导入

更新 `src/App.vue` 以显示演示。

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

启动开发服务器（`pnpm run dev`）并验证其工作情况！

> [!TIP]
> 通过将演示文件分离到 `src/demos/`，在添加新章节时可以避免覆盖 `App.vue`。为每个组合式函数创建独立的演示文件，并在 `App.vue` 中导入显示。

## 练习题

尝试添加以下功能：

1. `double()` 方法：将计数翻倍（同时考虑最大值限制）
2. `onChange` 回调：值更改时调用的函数
3. `get()` 方法：返回当前值（代替 count.value）

<details>
<summary>提示</summary>

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

  // 现有方法...

  const double = () => {
    // 在最大值限制内设置 count.value * 2
    set(count.value * 2);
  };

  const get = () => {
    // 返回当前值
    return count.value;
  };

  // 监听 onChange
  if (onChange) {
    watch(count, (newValue) => onChange(newValue));
  }

  return { count, inc, dec, set, reset, double, get, isMin, isMax };
}
```

</details>

<details>
<summary>解答</summary>

### 完整实现

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

  // 1. double() 方法
  const double = () => {
    // 使用 set 方法会自动应用最大值限制
    set(count.value * 2);
  };

  // 3. get() 方法
  const get = () => {
    return count.value;
  };

  const isMin = computed(() => count.value <= min);
  const isMax = computed(() => count.value >= max);

  // 2. onChange 回调
  if (onChange) {
    watch(count, (newValue) => {
      onChange(newValue);
    });
  }

  return { count, inc, dec, set, reset, double, get, isMin, isMax };
}
```

### 使用方法

```vue
<script setup lang="ts">
import { useCounter } from "./useCounter";

const { count, inc, dec, double, get, reset } = useCounter(5, {
  min: 0,
  max: 100,
  onChange: (value) => {
    console.log("计数已更改：", value);
  },
});
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>当前值：{{ get() }}</p>
    <button @click="inc()">+1</button>
    <button @click="double()">翻倍</button>
    <button @click="reset()">Reset</button>
  </div>
</template>
```

### 要点

1. **double()**：通过重用现有的 `set()` 方法，避免重复值限制逻辑
2. **onChange**：使用 `watch` 在值更改时自动执行回调
3. **get()**：`count.value` 的别名。在模板外获取值时很方便

</details>
