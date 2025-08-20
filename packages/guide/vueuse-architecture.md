# Key Components of VueUse

Now that we understand the overview of VueUse from the previous section, let's dive deeper into its actual components.

## Overall Directory Structure

Let's look at the actual structure. VueUse packages are organized with the following directory structure:

This structure is designed to centrally manage the implementation and documentation of each Composable, making it easily accessible to developers.

https://github.com/vueuse/vueuse/tree/main/packages

```sh
vueuse/
├── packages/              # Root directory for all packages
│   ├── .test/            # Test utilities and test configuration
│   ├── .vitepress/       # Documentation site (vueuse.org) configuration
│   ├── components/       # Vue component-style utilities
│   ├── core/             # Core features and base Composables
│   ├── electron/         # Electron environment-specific Composables
│   ├── firebase/         # Firebase integration features
│   ├── guide/            # English documentation and guides
│   ├── integrations/     # Third-party library integrations
│   ├── math/             # Math-related utility functions
│   ├── metadata/         # Metadata processing utilities
│   ├── nuxt/             # Nuxt.js-specific plugins and modules
│   ├── public/           # Public resources (logos, assets, etc.)
│   ├── router/           # Vue Router-related Composables
│   ├── rxjs/             # RxJS integration utilities
│   └── shared/           # Common utilities shared across packages
├── scripts/              # Build and release scripts
├── playgrounds/          # Development playground environment
└── ...                   # Other configuration files
```

## Understanding Package Categories

These packages can be divided into four main categories. Each has a clear role and is designed to be independently importable as needed.

### 1. Core Features

The most basic and frequently used features.

- **`core/`**: DOM manipulation, state management, event handling, and other most fundamental Composables
- **`shared/`**: Foundation features and utilities shared across all packages

For example, basic features like `useLocalStorage`, `useMouse`, and `useEventListener` are all included in the `core` package.

### 2. Environment-Specific

Features optimized for specific runtime environments.

- **`electron/`**: Features for desktop applications (file system access, etc.)
- **`nuxt/`**: Integration features specific to the Nuxt.js framework

These are managed as independent packages since they're only needed in specific environments.

### 3. External Integrations

Features for integration with popular libraries and services.

- **`firebase/`**: Integration with Firebase services (authentication, database, storage)
- **`rxjs/`**: Integration with the RxJS reactive programming library
- **`router/`**: Navigation-related features integrated with Vue Router
- **`integrations/`**: Integration with other third-party libraries

These packages make it easy to integrate with external libraries.

### 4. UI/UX Extensions

Extension features related to user interfaces.

- **`components/`**: Reusable Vue component-style utilities
- **`math/`**: Mathematical functions used for animations and physics calculations

## Internal Structure of Individual Composables

"How is each Composable structured?"

In VueUse, all Composables have a unified file structure. This allows developers to have a consistent experience when adding new features or understanding existing ones.

### Standard File Structure

Let's look at the actual `useStorage` as an example:

```sh
useStorage/
├── index.ts      # Main implementation (TypeScript)
├── index.md      # Documentation (API reference)
├── demo.vue      # Interactive demo (implementation example)
└── index.test.ts # Unit tests (quality assurance)
```

Each file has a clear role.

### index.ts - Core Implementation

This is the heart of the Composable. It includes:

```typescript
// Type definitions
export interface UseStorageOptions {
  serializer?: Serializer<T>
  onError?: (error: unknown) => void
  shallow?: boolean
}

// Main function
export function useStorage<T>(
  key: string,
  defaultValue: T,
  storage?: Storage,
  options?: UseStorageOptions<T>
): RemovableRef<T> {
  // Implementation logic
  const data = ref(defaultValue)

  // Read from storage
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

  // Write to storage
  const write = () => {
    try {
      storage?.setItem(key, options?.serializer?.write(data.value) ?? data.value)
    } catch (e) {
      options?.onError?.(e)
    }
  }

  // Reactive synchronization
  watchEffect(write)

  return data
}
```

Key points:
- **Complete type definitions**: Strict type safety with TypeScript
- **Error handling**: Proper error handling
- **Flexible options**: Customizable configuration
- **Reactive integration**: Full integration with Vue's Reactivity System

### index.md - Documentation

The critical information source that users see first:

````markdown
# useStorage

Reactive storage that simplifies integration with browser's local storage

## Usage

```js
import { useStorage } from '@vueuse/core'

// Initialize storage with default value
const state = useStorage('my-store', { hello: 'world' })

// Changes are automatically saved to storage
state.value.hello = 'VueUse'
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| key | `string` | Storage key |
| defaultValue | `T` | Default value |
| storage | `Storage` | Storage to use (default: localStorage) |
| options | `UseStorageOptions` | Configuration options |

## Return Value

`RemovableRef<T>` - Reactive storage reference
````

### demo.vue - Live Demo

Interactive demo showing actual behavior:

```vue
<script setup lang="ts">
import { useStorage } from '@vueuse/core'

// Automatically synced with localStorage
const state = useStorage('demo-storage', {
  name: 'VueUse',
  count: 0
})
</script>

<template>
  <div>
    <p>Edit values that will be saved to storage:</p>
    <input v-model="state.name" placeholder="Enter name">
    <input v-model.number="state.count" type="number" placeholder="Enter number">

    <div class="mt-4">
      <p>Saved values:</p>
      <pre>{{ JSON.stringify(state, null, 2) }}</pre>
    </div>

    <button @click="state = { name: 'VueUse', count: 0 }">
      Reset
    </button>
  </div>
</template>
```

This demo is displayed directly on vueuse.org, allowing users to interact and experience how values persist even after page reload.

### index.test.ts - Tests

Automated tests ensuring quality:

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

## Learn More

For those who want to understand VueUse's design philosophy more deeply, please refer to the following resources.

### Official Documentation

- **[VueUse Guidelines](https://vueuse.org/guidelines.html)**
  Implementation guidelines for contributors. Contains guidance for creating new Composables.

- **[Best Practice Guide](https://vueuse.org/guide/best-practice.html)**
  How to write effective Composables. Techniques for balancing performance and usability.

### Author's Insights

- **[Composable Vue - Anthony Fu](https://antfu.me/posts/composable-vue-vueday-2021)**
  VueDay 2021 talk by VueUse author Anthony Fu. Full of background on design decisions and practical tips for writing Composable functions.

## Summary

In this section, we've explored VueUse's components in detail.

In the next section, we'll set up a development environment and implement VueUse-like Composables ourselves.
