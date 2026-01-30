# Setting Up the Development Environment

Before diving into creating composables, let's set up a proper development environment for learning VueYous. This chapter will walk you through two approaches: using our convenient setup tool or manually configuring your environment.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v24.13.0 or higher)
- **pnpm** (v10.28.2 or higher)

You can verify your installations by running:

```bash
node --version
pnpm --version
```

### Installation Options

#### Option 1: Direct Installation

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- pnpm: [https://pnpm.io/installation](https://pnpm.io/installation)

#### Option 2: Using mise (Recommended for Version Management)

If you want to manage multiple Node.js and pnpm versions or ensure consistent versions across your team, we recommend using [mise](https://mise.jdx.dev/):

```bash
# Install mise (if not already installed)
curl https://mise.run | sh

# Install Node.js and pnpm globally
mise use -g node@24.13.0
mise use -g pnpm@10.28.2

# Verify installations
node --version
pnpm --version
```

> [!TIP]
> When you create a VueYous project with `create-vueyouse`, it includes a `mise.toml` file that locks these versions. Navigate to your project and run:
>
> ```bash
> mise trust  # Required for security
> mise install
> ```

## Setup Approaches

There are two ways to set up your VueYous learning environment. Choose the one that fits your needs.

## Approach 1: Using create-vueyouse (Recommended)

The easiest way to get started is using our `create-vueyouse` tool. This tool scaffolds a complete learning environment with all the necessary files and configurations.

### Step 1: Create Your Project

Run the following command, replacing `my-vueyouse` with your preferred directory name:

```bash
pnpm dlx tsx tools/create-vueyouse/main.ts my-vueyouse
```

This command will:

- Create a new directory with your specified name
- Copy all necessary template files
- Set up the project structure for learning

### Step 2: Navigate to Your Project

```bash
cd my-vueyouse
```

### Step 3: Install Dependencies

> [!IMPORTANT]
> If you're using mise, run `mise trust` before installing dependencies to enable version management.

```bash
pnpm install
```

### Step 4: Start the Development Server

```bash
pnpm run dev
```

Your development server should now be running at `http://localhost:5173`. Open this URL in your browser, and you're ready to start learning!

## Approach 2: Manual Setup

If you prefer to understand every piece of the setup or want to customize your environment from scratch, follow these steps:

### Step 1: Create Project Directory

```bash
mkdir my-vueyouse
cd my-vueyouse
```

### Step 2: Initialize Package Manager

```bash
pnpm init
```

### Step 3: Install Core Dependencies

```bash
pnpm add vue@^3.5.0
pnpm add -D vite @vitejs/plugin-vue typescript vue-tsc
```

### Step 4: Install Type Definitions

```bash
pnpm add -D @types/node @tsconfig/node24 @vue/tsconfig
```

### Step 5: Create Configuration Files

Create the following files in your project root:

**`tsconfig.json`**:

```json
{
  "files": [],
  "references": [{ "path": "./tsconfig.node.json" }, { "path": "./tsconfig.app.json" }]
}
```

**`tsconfig.app.json`**:

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**`tsconfig.node.json`**:

```json
{
  "extends": "@tsconfig/node24/tsconfig.json",
  "include": [
    "vite.config.*",
    "vitest.config.*",
    "cypress.config.*",
    "nightwatch.conf.*",
    "playwright.config.*"
  ],
  "compilerOptions": {
    "composite": true,
    "noEmit": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "types": ["node"]
  }
}
```

**`vite.config.ts`**:

```typescript
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```

**`env.d.ts`**:

```typescript
/// <reference types="vite/client" />
```

### Step 6: Create Project Structure

Create the following directory structure:

```
my-vueyouse/
├── packages/             # Your composables library
│   └── index.ts
└── examples/             # Test playground (optional)
    └── playground/
```

### Step 7: Create Your First Composable

Create `packages/index.ts`:

```typescript
export function HelloVueYous() {
  // eslint-disable-next-line no-console
  console.log("Hello VueYous!");
}
```

This is your starting point. As you learn, you'll add more composables to this file and export them.

> [!TIP]
> The `packages/` directory is where you'll build your own VueUse-style composables. Each composable you create will be exported from `index.ts`.

### Step 8: Add Scripts to package.json

Update your `package.json` to include these scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  }
}
```

### Step 9: Start Development Server

```bash
pnpm run dev
```

## Project Structure Overview

Regardless of which approach you chose, your project structure should look like this:

```
my-vueyouse/
├── src/
│   ├── composables/      # Your VueUse-inspired composables
│   ├── App.vue           # Main application component
│   └── main.ts           # Application entry point
├── public/               # Static assets
├── node_modules/         # Dependencies
├── index.html            # HTML template
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript config
├── tsconfig.app.json     # App-specific TS config
├── tsconfig.node.json    # Node-specific TS config
├── vite.config.ts        # Vite configuration
└── env.d.ts              # Type definitions
```

### Key Directories

- **`src/composables/`**: This is where you'll create your custom composables as you work through the book
- **`src/App.vue`**: Your playground for testing composables
- **`public/`**: Static files that don't need processing

## Verifying Your Setup

To verify everything is working correctly:

1. Make sure your development server is running (`pnpm run dev`)
2. Open `http://localhost:5173` in your browser
3. Open the browser's Developer Console (F12 or right-click → Inspect → Console tab)
4. You should see **"Hello VueYous!"** printed in the console
5. Try editing `src/App.vue` and save - you should see the changes immediately (Hot Module Replacement)

> [!TIP]
> If you see "Hello VueYous!" in the console, congratulations! Your environment is set up correctly and ready for learning.

## Next Steps

Congratulations! Your development environment is now ready.

In the next section, we'll start creating our first composable and understand how VueUse composables work internally.

## Troubleshooting

### Port Already in Use

If you see an error that port 5173 is already in use:

```bash
# Kill the process using the port
npx kill-port 5173

# Or specify a different port
pnpm run dev -- --port 3000
```

### Module Resolution Issues

If you encounter module resolution errors:

1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules
   pnpm install
   ```
2. Clear Vite cache:
   ```bash
   rm -rf node_modules/.vite
   ```

### TypeScript Errors

If you see TypeScript errors in your editor:

1. Restart your TypeScript server (in VS Code: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server")
2. Make sure you have the Vue Language Features (Volar) extension installed (not Vetur)

---

Ready to start building composables? Let's move on to understanding what composables are and why they're so powerful!
