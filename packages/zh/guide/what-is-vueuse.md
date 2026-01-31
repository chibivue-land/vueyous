# VueUse 是什么？

[VueUse](https://vueuse.org/) 是 Vue Composition API 实用工具的集合。它提供了一套丰富的可组合函数，可以解决 Vue 应用程序中常见的编程挑战。

## VueUse 解决的问题

在构建 Vue 应用程序时，您经常会发现自己一遍又一遍地编写相同的模式：

- 管理窗口调整大小监听器
- 处理鼠标和键盘事件
- 在 localStorage 中存储数据
- 检测暗黑模式偏好
- 处理异步操作

VueUse 为这些常见问题提供了经过实战检验和优化的解决方案，因此您可以专注于构建功能而不是重新发明轮子。

## 什么是可组合函数？

**可组合函数**是一种利用 Vue 的 Composition API 来封装和重用有状态逻辑的函数。可以将其视为将组件逻辑提取到可重用函数中的一种方法。

### 示例：不使用 VueUse

以下是在不使用 VueUse 的情况下跟踪鼠标位置的方法：

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

### 示例：使用 VueUse

使用 VueUse 的 `useMouse` 可组合函数，相同的功能变得更加简单：

```vue
<script setup lang="ts">
import { useMouse } from "@vueuse/core";

const { x, y } = useMouse();
</script>

<template>
  <div>Mouse position: {{ x }}, {{ y }}</div>
</template>
```

请注意 VueUse 如何为您处理生命周期管理、清理和边缘情况。可组合函数会自动添加和删除事件监听器，防止内存泄漏，即使在复杂场景中也能正常工作。

## 主要优势

### 1. 可重用性

编写一次逻辑，随处使用。可组合函数可以在组件之间甚至项目之间共享。

### 2. 类型安全

VueUse 使用 TypeScript 编写，提供出色的类型推断，在编译时捕获错误。

### 3. Tree-shakable（可摇树优化）

只有您使用的可组合函数才会包含在最终捆绑包中，从而保持应用程序的精简。

### 4. SSR 友好

许多 VueUse 函数在 Nuxt 等服务器端渲染环境中无缝工作。

### 5. 经过充分测试

每个可组合函数都经过全面测试，并被成千上万的开发人员在生产环境中使用。

## VueUse 函数类别

VueUse 将其 200 多个函数组织为逻辑类别：

- State（状态）：响应式状态管理（`useLocalStorage`、`useSessionStorage`、`useToggle`）
- Elements（元素）：DOM 元素交互（`useEventListener`、`useIntersectionObserver`）
- Browser（浏览器）：浏览器 API（`useDark`、`useMediaQuery`、`useClipboard`）
- Sensors（传感器）：用户输入检测（`useMouse`、`useKeyboard`、`useSwipe`）
- Network（网络）：网络请求和连接性（`useFetch`、`useWebSocket`）
- Animation（动画）：时序和过渡（`useInterval`、`useTimeout`、`useTransition`）
- Component（组件）：组件实用工具（`useVModel`、`useTemplateRef`）
- Watch（监听）：增强型监听器（`watchDebounced`、`watchThrottled`、`until`）
- Reactivity（响应性）：高级响应性模式（`computedAsync`、`refDebounced`）
- Array（数组）：响应式数组操作（`useArrayMap`、`useArrayFilter`）
- Utilities（实用工具）：辅助函数（`createSharedComposable`、`until`、`whenever`）

## 本书的学习方法

本书不仅仅是使用 VueUse 的函数，而是教您如何**自己构建它们**。通过重新创建简化版的 VueUse 可组合函数：

- 您将了解它们在**内部**的工作原理
- 您将学习使用某些模式的**原因**
- 您将能够针对独特需求创建**自己的**自定义可组合函数

可以将其视为学习钓鱼而不是仅仅接受鱼。最后，您不仅知道如何有效地使用 VueUse，还知道如何构建解决特定问题的可组合函数。

## 准备好开始了吗？

现在您已经了解了 VueUse 是什么以及为什么它有价值，让我们设置好您的环境并开始构建您的第一个可组合函数！
