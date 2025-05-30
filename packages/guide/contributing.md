# Contributing to VueYous

Thank you for your interest in contributing to VueYous! This project is a resource for learning how to create reusable, maintainable, and extensible composable functions similar to VueUse.

## Development Environment Setup

### Prerequisites

- Node.js 20 or higher
- pnpm 8.15.6 or higher

### Setup Steps

1. Fork and clone the repository:

```bash
git clone https://github.com/your-username/vueyous.git
cd vueyous
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm docs:dev
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
mkdir packages/core/useYourComposable
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
- Follow ESLint rules (check with `pnpm lint`)
- Code formatting is applied automatically

## Development Commands

```bash
# Start development server
pnpm docs:dev

# Build
pnpm build

# Type check
pnpm type-check

# Lint
pnpm lint

# Lint auto-fix
pnpm lint:fix

# Text lint (for Japanese documents)
pnpm lint:text

# Build documentation
pnpm docs:build

# Preview documentation
pnpm docs:preview
```

Thank you for contributing! 🎉
