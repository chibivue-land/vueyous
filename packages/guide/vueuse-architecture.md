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

Each file has a clear role:

- **index.ts**: Main Composable implementation (TypeScript type safety, error handling)
- **index.md**: Documentation (usage, API reference)
- **demo.vue**: Interactive demo (implementation example)
- **index.test.ts**: Unit tests (quality assurance)

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
