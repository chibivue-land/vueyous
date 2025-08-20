# VueUse 的主要组成部分

在上一节中我们了解了 VueUse 的概述，现在让我们深入探讨其实际的组成部分。

## 整体目录结构

让我们看看实际的结构。VueUse 包按以下目录结构组织：

这种结构旨在集中管理每个 Composable 的实现和文档，使开发者能够轻松访问。

https://github.com/vueuse/vueuse/tree/main/packages

```sh
vueuse/
├── packages/              # 所有包的根目录
│   ├── .test/            # 测试工具和测试配置
│   ├── .vitepress/       # 文档站点（vueuse.org）配置
│   ├── components/       # Vue 组件形式的实用工具
│   ├── core/             # 核心功能和基础 Composables
│   ├── electron/         # Electron 环境专用的 Composables
│   ├── firebase/         # Firebase 集成功能
│   ├── guide/            # 英文文档和指南
│   ├── integrations/     # 第三方库集成
│   ├── math/             # 数学相关的实用函数
│   ├── metadata/         # 元数据处理工具
│   ├── nuxt/             # Nuxt.js 专用的插件和模块
│   ├── public/           # 公共资源（标志、资源等）
│   ├── router/           # Vue Router 相关的 Composables
│   ├── rxjs/             # RxJS 集成工具
│   └── shared/           # 跨包共享的通用工具
├── scripts/              # 构建和发布脚本
├── playgrounds/          # 开发游乐场环境
└── ...                   # 其他配置文件
```

## 理解包分类

这些包可以分为四个主要类别。每个类别都有明确的角色，并设计为可根据需要独立导入。

### 1. 核心功能

最基本和最常用的功能。

- **`core/`**：DOM 操作、状态管理、事件处理等最基础的 Composables
- **`shared/`**：所有包共享的基础功能和实用工具

例如，`useLocalStorage`、`useMouse`、`useEventListener` 等基本功能都包含在 `core` 包中。

### 2. 环境特定

针对特定运行环境优化的功能。

- **`electron/`**：桌面应用程序功能（文件系统访问等）
- **`nuxt/`**：Nuxt.js 框架专用的集成功能

由于这些只在特定环境中需要，因此作为独立包进行管理。

### 3. 外部集成

与流行库和服务集成的功能。

- **`firebase/`**：与 Firebase 服务（认证、数据库、存储）的集成
- **`rxjs/`**：与 RxJS 响应式编程库的集成
- **`router/`**：与 Vue Router 集成的导航相关功能
- **`integrations/`**：与其他第三方库的集成

这些包使得与外部库的集成变得简单。

### 4. UI/UX 扩展

与用户界面相关的扩展功能。

- **`components/`**：可重用的 Vue 组件形式的实用工具
- **`math/`**：用于动画和物理计算的数学函数

## 单个 Composable 的内部结构

"每个 Composable 是如何构成的？"

在 VueUse 中，所有 Composables 都有统一的文件结构。这使得开发者在添加新功能或理解现有功能时都能获得一致的体验。

### 标准文件结构

让我们以实际的 `useStorage` 为例：

```sh
useStorage/
├── index.ts      # 主要实现（TypeScript）
├── index.md      # 文档（API 参考）
├── demo.vue      # 交互式演示（实现示例）
└── index.test.ts # 单元测试（质量保证）
```

每个文件都有明确的作用。

### index.ts - 核心实现

这是 Composable 的核心。它包括：

```typescript
// 类型定义
export interface UseStorageOptions {
  serializer?: Serializer<T>
  onError?: (error: unknown) => void
  shallow?: boolean
}

// 主函数
export function useStorage<T>(
  key: string,
  defaultValue: T,
  storage?: Storage,
  options?: UseStorageOptions<T>
): RemovableRef<T> {
  // 实现逻辑
  const data = ref(defaultValue)

  // 从存储读取
  const read = () => {
    try {
      const rawValue = storage?.getItem(key)
      if (rawValue != null) {
        data.value = options?.serializer?.read(rawValue) ?? rawValue
      }
    } catch (e) {
      options?.onError?.(e)
    }
  }

  // 写入存储
  const write = () => {
    try {
      storage?.setItem(key, options?.serializer?.write(data.value) ?? data.value)
    } catch (e) {
      options?.onError?.(e)
    }
  }

  // 响应式同步
  watchEffect(write)

  return data
}
```

关键点：
- **完整的类型定义**：使用 TypeScript 实现严格的类型安全
- **错误处理**：适当的错误处理
- **灵活的选项**：可自定义配置
- **响应式集成**：与 Vue 的响应式系统完全集成

### index.md - 文档

用户首先看到的重要信息源：

````markdown
# useStorage

简化与浏览器本地存储集成的响应式存储

## 使用方法

```js
import { useStorage } from '@vueuse/core'

// 使用默认值初始化存储
const state = useStorage('my-store', { hello: 'world' })

// 更改会自动保存到存储
state.value.hello = 'VueUse'
```

## 参数

| 参数 | 类型 | 描述 |
|-----|------|------|
| key | `string` | 存储键 |
| defaultValue | `T` | 默认值 |
| storage | `Storage` | 要使用的存储（默认：localStorage） |
| options | `UseStorageOptions` | 配置选项 |

## 返回值

`RemovableRef<T>` - 响应式存储引用
````

### demo.vue - 实时演示

显示实际行为的交互式演示：

```vue
<script setup lang="ts">
import { useStorage } from '@vueuse/core'

// 自动与 localStorage 同步
const state = useStorage('demo-storage', {
  name: 'VueUse',
  count: 0
})
</script>

<template>
  <div>
    <p>编辑将保存到存储的值：</p>
    <input v-model="state.name" placeholder="输入名称">
    <input v-model.number="state.count" type="number" placeholder="输入数字">

    <div class="mt-4">
      <p>保存的值：</p>
      <pre>{{ JSON.stringify(state, null, 2) }}</pre>
    </div>

    <button @click="state = { name: 'VueUse', count: 0 }">
      重置
    </button>
  </div>
</template>
```

这个演示直接显示在 vueuse.org 上，允许用户交互并体验值在页面重新加载后如何持续存在。

### index.test.ts - 测试

确保质量的自动化测试：

```typescript
import { useStorage } from '.'

describe('useStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should store value in localStorage', () => {
    const storage = useStorage('test-key', 'default')
    expect(storage.value).toBe('default')

    storage.value = 'new value'
    expect(localStorage.getItem('test-key')).toBe('"new value"')
  })

  it('should read existing value from localStorage', () => {
    localStorage.setItem('existing-key', '"existing value"')
    const storage = useStorage('existing-key', 'default')
    expect(storage.value).toBe('existing value')
  })

  it('should handle complex objects', () => {
    const storage = useStorage('object-key', { count: 0 })
    storage.value.count++

    const stored = JSON.parse(localStorage.getItem('object-key')!)
    expect(stored.count).toBe(1)
  })
})
```

## VueUse 设计原则

这些结构基于 VueUse 的明确设计原则：

### 1. 通过 Tree-shaking 优化

通过仅导入必要的功能来最小化打包大小：

```typescript
// ❌ 不推荐：导入所有内容
import * as VueUse from '@vueuse/core'

// ✅ 推荐：仅导入所需内容
import { useStorage, useMouse } from '@vueuse/core'
```

### 2. SSR 安全实现

设计为可安全地与服务器端渲染一起工作：

```typescript
// 检查浏览器环境
if (typeof window !== 'undefined') {
  // 浏览器特定代码
}
```

### 3. TypeScript 优先

为所有函数提供完整的类型定义：

```typescript
export function useCounter(
  initialValue: number = 0
): [Ref<number>, (delta?: number) => void, (delta?: number) => void] {
  const count = ref(initialValue)
  const inc = (delta = 1) => count.value += delta
  const dec = (delta = 1) => count.value -= delta

  return [count, inc, dec]
}
```

## 📚 深入学习

要更深入地了解 VueUse 的设计理念，请参考以下资源：

### 官方文档

- **[VueUse 指南](https://vueuse.org/guidelines.html)**
  贡献者的实施指南。包含创建新 Composables 的指导。

- **[最佳实践指南](https://vueuse.org/guide/best-practice.html)**
  如何编写有效的 Composables。平衡性能和可用性的技术。

### 作者见解

- **[Composable Vue - Anthony Fu](https://antfu.me/posts/composable-vue-vueday-2021)**
  VueUse 作者 Anthony Fu 在 VueDay 2021 的演讲。充满了设计决策的背景和编写 Composable 函数的实用技巧。

这些资源详细解释了为什么做出某些设计决策以及如何创建高质量的 Composables。

## 总结

在本节中，我们详细探讨了 VueUse 的组成部分：

✅ **单体仓库结构**用于高效的包管理
✅ **统一的文件结构**确保一致性
✅ 基于**明确设计原则**的实现
✅ **完整的文档、演示和测试**用于质量保证

VueUse 成功的秘诀在于这种一致的结构和明确的设计原则。每个 Composable 独立运作，同时作为一个有凝聚力的库保持统一。

在下一节中，我们将设置开发环境并实现自己的类似 VueUse 的 Composables。
