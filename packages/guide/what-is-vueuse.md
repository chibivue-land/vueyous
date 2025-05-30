# What is VueUse

VueUse is a collection of utility functions based on Vue.js's [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html). It leverages the powerful features of Vue 3's Composition API to provide reusable and maintainable composable functions.

## The Excellence of VueUse

### 🎯 Dramatic Improvement in Development Efficiency

By using VueUse, you no longer need to implement commonly used features from scratch. Everyday functionalities like mouse position tracking, local storage management, and dark mode detection are immediately available.

```vue
<script setup>
import { useLocalStorage, useMouse, usePreferredDark } from '@vueuse/core'

// Track mouse position
const { x, y } = useMouse()

// Detect dark mode preference
const isDark = usePreferredDark()

// Persist state with local storage
const store = useLocalStorage(
  'my-storage',
  {
    name: 'Apple',
    color: 'red',
  },
)
</script>
```

### 🔧 Rich Categories of Functions

VueUse provides over 200 functions, categorized into diverse areas such as:

- **State**: Reactive state management
- **Elements**: Interaction with DOM elements
- **Browser**: Leveraging browser APIs
- **Sensors**: Device sensor information
- **Network**: HTTP communication and network status
- **Animation**: Smooth animation effects
- **Component**: Inter-component communication
- **Watch**: Monitoring reactive values
- **Reactivity**: Extensions to Vue 3's reactive system
- **Array**: Array manipulation utilities
- **Time**: Date and time operations and management
- **Utilities**: Other convenient functions

### 🚀 Full TypeScript Support

VueUse is built with TypeScript and provides excellent type safety. Auto-completion and error detection in IDEs significantly enhance the development experience.

### 📱 Wide Platform Support

VueUse is designed to work seamlessly across various development environments and toolchains:

#### Vue 3 Projects
```bash
npm install @vueuse/core
```
Maximizes Vue 3's Composition API and provides lightweight bundles with tree-shaking support.

#### Auto-import in Nuxt 3
```bash
npx nuxi@latest module add vueuse
```
The dedicated Nuxt module enables auto-importing of VueUse functions. You can start using them immediately without any configuration.

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt']
})
```

#### Optimization with Vite
Delivers a fast development experience when combined with Vite. Hot Module Replacement (HMR) is fully supported.

#### Webpack Projects
Works seamlessly with traditional Webpack-based projects, making it easy to integrate into existing projects.

#### Direct Usage via CDN
```html
<script src="https://unpkg.com/@vueuse/core"></script>
```
Can be used directly from HTML files without a build process. Perfect for prototyping and learning purposes.

### 🎨 Intuitive API Design

VueUse functions provide consistent and intuitive APIs. All functions start with `use` and follow Vue 3's Composition API conventions.

### 🔄 Reactive Design

All functions are fully integrated with Vue 3's reactive system, and value changes are automatically reflected in the UI.

```vue
<script setup>
import { useMouse, useOnline, useWindowSize } from '@vueuse/core'

const { x, y } = useMouse()
const { width, height } = useWindowSize()
const isOnline = useOnline()
</script>

<template>
  <div>
    <p>Mouse position: {{ x }}, {{ y }}</p>
    <p>Screen size: {{ width }} x {{ height }}</p>
    <p>Online status: {{ isOnline ? 'Online' : 'Offline' }}</p>
  </div>
</template>
```

### 🛠️ Customizable

Many functions provide configurable options that can be customized to meet your project requirements.

### 🌍 Active Community

VueUse is supported by an active open-source community, with continuous improvements and new features being added.

## Difference Between Official Documentation and This Guide

The [official documentation](https://vueuse.org/) focuses on how to use VueUse, providing rich sample code and demos. In contrast, this guide focuses on **enabling you to create your own composables like VueUse**.

This guide is structured to help you step up from "using" VueUse functions to "creating" them. By working hands-on, you can acquire the skills to design and implement production-level composables.

Additionally, since this guide is not an official publication, it may not be comprehensive. There might be errors or omissions, so we would appreciate any feedback or suggestions.

### ⚠️ Disclaimer

This guide is not an official publication. While we strive for accuracy in the content, there may be errors or incomplete sections. We would appreciate any feedback and will continue to improve the guide based on your input.
