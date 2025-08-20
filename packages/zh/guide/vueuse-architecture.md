# VueUse 架构

## 概述

VueUse 是一个为 Vue 开发者提供 200+ 函数的 Vue Composition API 实用工具集合。了解其架构有助于我们按照类似的模式创建更好的可组合函数。

## 核心原则

### 1. 模块化设计
VueUse 采用模块化方法，每个实用工具都具有以下特点。
- 自包含，每个函数都可以独立导入和使用
- 可摇树优化，只有您使用的实用工具才会包含在打包文件中
- 分类组织，函数按逻辑分组组织

### 2. 包结构

VueUse 组织成多个包。例如，有以下这些包可供使用。

- @vueuse/core 提供常见任务的基本实用工具
- @vueuse/shared 包含跨包使用的共享实用工具
- @vueuse/integrations 实现与第三方库的集成
- @vueuse/router 提供路由相关的实用工具
- @vueuse/rxjs 实现 RxJS 集成
- @vueuse/firebase 实现 Firebase 集成

## 函数类别

### 核心类别

1. **状态管理**
   - `useLocalStorage`、`useSessionStorage`
   - `useRefHistory`、`useManualRefHistory`
   - `useCloned`

2. **传感器**
   - `useMouse`、`useMousePressed`
   - `useDeviceOrientation`、`useDeviceMotion`
   - `useGeolocation`

3. **浏览器 API**
   - `useClipboard`、`usePermission`
   - `useFullscreen`、`useDocumentVisibility`
   - `useBrowserLocation`

4. **动画与计时**
   - `useInterval`、`useTimeout`
   - `useRafFn`、`useTimestamp`
   - `useTransition`

5. **网络与通信**
   - `useFetch`、`useWebSocket`
   - `useEventSource`
   - `useWebWorker`

6. **组件实用工具**
   - `useVModel`、`useVModels`
   - `templateRef`
   - `unrefElement`

## 设计模式

### 1. 一致的 API 设计

VueUse 函数遵循一致的模式：

```typescript
// 大多数函数返回响应式 ref
const { x, y } = useMouse()

// 选项作为最后一个参数传递
const { data, error } = useFetch(url, {
  refetch: true,
  timeout: 5000
})

// 自动处理清理
const { pause, resume } = useInterval(1000, {
  immediate: true
})
```

### 2. 默认响应式

所有 VueUse 函数都与 Vue 的响应式系统配合工作。

```typescript
const storage = useLocalStorage('key', 'default')
// storage 是一个与 localStorage 同步的 ref

storage.value = 'new value' // 自动更新 localStorage
```

### 3. SSR 兼容性

函数设计为在客户端和服务器环境中都能工作。具体包括以下机制。
- 服务器端检查浏览器 API
- API 不可用时的优雅降级（如返回默认值）
- 水合安全的实现

### 4. TypeScript 优先

每个函数都用 TypeScript 编写，这带来了以下好处。
- 完整的类型推断
- 详细的类型定义
- 全面的 IDE 支持

## 实现模式

### 1. 可暂停控制

许多函数提供控制机制：

```typescript
interface Pausable {
  isActive: Ref<boolean>
  pause: () => void
  resume: () => void
}
```

### 2. 事件清理

自动清理事件监听器和订阅：

```typescript
// 组件卸载时自动移除事件
useEventListener(target, 'click', handler)
```

### 3. 可配置选项

函数接受配置对象以提供灵活性：

```typescript
interface UseMouseOptions {
  type?: 'page' | 'client'
  touch?: boolean
  resetOnTouchEnds?: boolean
  initialValue?: { x: number; y: number }
}
```

## VueUse 的最佳实践

1. **单一职责**：每个函数只做好一件事
2. **可组合性**：函数可以组合以创建复杂的行为
3. **性能**：延迟求值和高效更新
4. **开发者体验**：清晰的命名、良好的文档和示例
5. **测试**：全面的测试覆盖以确保可靠性

## 创建类似 VueUse 的可组合函数

按照 VueUse 模式创建自己的可组合函数时，请注意以下几点。如需更详细的指导，建议参考官方的 [VueUse Guidelines](https://vueuse.org/guidelines) 和 [Best Practice Guide](https://vueuse.org/guide/best-practice.html)，这些文档包含了 VueUse 实际开发中积累的宝贵经验。

1. **使用 `use` 前缀命名**：`useMyFeature()`
2. **返回响应式值**：使用 `ref()`、`reactive()` 或 `computed()`
3. **处理清理**：使用 `onUnmounted()` 进行清理逻辑
4. **提供控制**：在适用时返回 pause/resume/stop 函数
5. **接受选项**：使用选项对象进行配置
6. **支持 TypeScript**：添加包括泛型和重载在内的类型定义
7. **良好的文档**：在 JSDoc 注释中包含示例和边缘情况

## 目录结构示例

```
packages/
├── core/                 # 核心实用工具
│   ├── useStorage/
│   │   ├── index.ts     # 主要实现
│   │   ├── index.md     # 文档
│   │   └── demo.vue     # 交互式演示
│   └── index.ts         # 包导出
├── shared/              # 共享实用工具
│   └── utils/
│       ├── is.ts        # 类型守卫
│       └── types.ts     # 类型定义
└── guide/               # 文档
    └── *.md             # 指南章节
```

这种架构使 VueUse 能够实现以下特性。
- 可维护性，通过清晰的结构和关注点分离
- 可扩展性，易于添加新函数
- 可测试性，具有明确边界的独立单元
- 高性能，通过摇树优化减少包大小
