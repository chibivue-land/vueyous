# Contributing to VueYous

Thank you for your interest in contributing to VueYous! This project is a resource for learning how to create reusable, maintainable, and extensible composable functions similar to VueUse.

## Development Environment Setup

### Prerequisites

- [mise](https://mise.jdx.dev/) - Runtime version manager
  - This will automatically install Node.js 24 and pnpm 10

### Setup Steps

1. Install mise (if not already installed):

```bash
$ curl https://mise.run | sh
```

2. Fork and clone the repository:

```bash
$ git clone https://github.com/your-username/vueyous.git
$ cd vueyous
```

3. Install tools and dependencies:

```bash
$ mise install
$ mise run setup
```

4. Start the development server:

```bash
$ mise run docs:dev
```

## Project Structure

```
vueyous/
├── packages/
│   ├── core/           # Core composable functions
│   ├── shared/         # Shared utilities
│   ├── guide/          # Documentation (English)
│   ├── ja/            # Documentation (Japanese)
│   └── zh/            # Documentation (Chinese)
├── package.json       # Root package configuration
└── vite.config.ts     # Vite configuration
```

## How to Contribute

### Adding New Composable Functions

1. Create a new folder in the `packages/core` directory:

```bash
$ mkdir packages/core/useYourComposable
```

2. Create the following files:
   - `index.ts` - Composable function implementation
   - `index.md` - Documentation
   - `demo.vue` - Demo component (if needed)

3. Add the export to `packages/core/index.ts`

### Documentation Updates

- English documentation: `packages/guide/`
- Japanese documentation: `packages/ja/guide/`
- Chinese documentation: `packages/zh/guide/`

### Coding Standards

- Use TypeScript
- Follow ESLint rules (check with `mise run lint`)
- Code formatting is applied automatically

## Development Commands

```bash
# Start development server
$ mise run docs:dev

# Build
$ mise run build

# Type check
$ mise run type-check

# Lint
$ mise run lint

# Lint auto-fix
$ mise run lint:fix

# Text lint (for Japanese documents)
$ mise run lint:text

# Build documentation
$ mise run docs:build

# Preview documentation
$ mise run docs:preview
```

Thank you for contributing! 🎉
