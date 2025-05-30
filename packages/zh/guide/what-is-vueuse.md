# 什么是 VueUse？

VueUse 是基于 Vue.js [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html) 的实用工具函数集合。它充分利用 Vue 3 的强大功能 Composition API，提供可重用且易于维护的组合式函数。

## VueUse 的卓越之处

### 🎯 显著提升开发效率

使用 VueUse，您无需从零开始实现常用功能。鼠标位置跟踪、本地存储管理、暗色模式检测等日常所需功能都可以立即使用。

```vue
<script setup>
import { useLocalStorage, useMouse, usePreferredDark } from '@vueuse/core'

// 跟踪鼠标位置
const { x, y } = useMouse()

// 检测暗色模式偏好
const isDark = usePreferredDark()

// 使用本地存储持久化状态
const store = useLocalStorage(
  'my-storage',
  {
    name: 'Apple',
    color: 'red',
  },
)
</script>
```

### 🔧 丰富的函数分类

VueUse 提供超过 200 个函数，分为以下多个类别：

- **State（状态管理）**: 响应式状态管理
- **Elements（元素）**: 与 DOM 元素的交互
- **Browser（浏览器）**: 浏览器 API 的利用
- **Sensors（传感器）**: 设备传感器信息
- **Network（网络）**: HTTP 通信和网络状态
- **Animation（动画）**: 流畅的动画效果
- **Component（组件）**: 组件间通信
- **Watch（监听）**: 响应式值的监听
- **Reactivity（响应式）**: Vue 3 响应式系统的扩展
- **Array（数组）**: 数组操作工具
- **Time（时间）**: 日期时间操作和管理
- **Utilities（工具）**: 其他便利函数

### 🚀 完全支持 TypeScript

VueUse 使用 TypeScript 构建，提供优秀的类型安全性。IDE 中的自动补全和错误检测大大提升了开发体验。

### 📱 广泛的平台支持

VueUse 设计为在各种开发环境和工具链中无缝工作：

#### Vue 3 项目
```bash
npm install @vueuse/core
```
充分利用 Vue 3 的 Composition API，提供支持 tree-shaking 的轻量级包。

#### Nuxt 3 中的自动导入
```bash
npx nuxi@latest module add vueuse
```
专用的 Nuxt 模块使您能够自动导入 VueUse 函数。无需配置即可立即开始使用。

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt']
})
```

#### Vite 优化
与 Vite 结合使用时提供快速的开发体验。完全支持热模块替换 (HMR)。

#### Webpack 项目
在传统的基于 Webpack 的项目中无缝工作，便于集成到现有项目中。

#### 通过 CDN 直接使用
```html
<script src="https://unpkg.com/@vueuse/core"></script>
```
无需构建过程即可从 HTML 文件直接使用。非常适合原型开发和学习目的。

### 🎨 直观的 API 设计

VueUse 函数提供一致且直观的 API。所有函数都以 `use` 开头，遵循 Vue 3 Composition API 的约定。

### 🔄 响应式设计

所有函数都与 Vue 3 的响应式系统完全集成，值的变化会自动反映在 UI 中。

```vue
<script setup>
import { useMouse, useWindowSize, useOnline } from '@vueuse/core'

const { x, y } = useMouse()
const { width, height } = useWindowSize()
const isOnline = useOnline()
</script>

<template>
  <div>
    <p>鼠标位置: {{ x }}, {{ y }}</p>
    <p>屏幕尺寸: {{ width }} x {{ height }}</p>
    <p>在线状态: {{ isOnline ? '在线' : '离线' }}</p>
  </div>
</template>
```

### 🛠️ 可定制化

许多函数提供可配置的选项，可以根据您的项目需求进行定制。

### 🌍 活跃的社区

VueUse 由活跃的开源社区支持，持续改进并添加新功能。

## 官方文档与本指南的区别

[官方文档](https://vueuse.org/) 专注于如何使用 VueUse，提供丰富的示例代码和演示。相比之下，本指南专注于**让您能够创建类似 VueUse 的组合式函数**。

本指南的结构旨在帮助您从"使用" VueUse 函数提升到"创建"它们。通过实际动手操作，您可以获得设计和实现生产级组合式函数的技能。

此外，由于本指南不是官方出版物，可能不够全面。可能存在错误或遗漏，我们欢迎任何反馈和建议。

### ⚠️ 免责声明

本指南不是官方出版物。虽然我们努力确保内容的准确性，但可能存在错误或不完整的部分。我们欢迎您的反馈，并将根据您的意见持续改进本指南。
