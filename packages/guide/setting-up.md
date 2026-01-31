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

You can install them from:

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- pnpm: [https://pnpm.io/installation](https://pnpm.io/installation)

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

The tool creates a monorepo structure with your composables in `packages/` and an example app in `examples/playground/`. Navigate to the playground directory:

```bash
cd my-vueyouse/examples/playground
```

### Step 3: Install Dependencies

```bash
pnpm install
```

### Step 4: Start the Development Server

```bash
pnpm run dev
```

Your development server should now be running at `http://localhost:5173`. Open this URL in your browser, and you're ready to start learning!

### Project Structure

The `create-vueyouse` tool creates the following structure:

```
my-vueyouse/
├── packages/              # Your composables live here
│   └── index.ts
├── examples/
│   └── playground/        # Development environment
│       ├── src/
│       │   ├── App.vue
│       │   └── main.ts
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── package.json
├── tsconfig.json
└── package.json
```

You'll write your composables in `packages/index.ts` and test them in the `playground` app.

## Approach 2: Manual Setup

If you prefer to understand every piece of the setup or want to customize your environment from scratch, follow these steps to create the monorepo structure:

### Step 1: Create Project Structure

Create the project directory and monorepo structure:

```bash
mkdir -p my-vueyouse/packages
mkdir -p my-vueyouse/examples/playground
cd my-vueyouse
```

### Step 2: Create Vite Project in Playground

Navigate to the playground directory and create a Vite project:

```bash
cd examples/playground
pnpm create vite . --template vue-ts
pnpm install
```

### Step 3: Clean Up Unnecessary Files

Remove the files we won't need for learning VueYous:

```bash
rm -rf src/assets src/components src/style.css public
```

### Step 4: Simplify App.vue and main.ts

Replace the contents of `src/App.vue` with a simple template:

```vue
<template>Hello VueYous!</template>
```

Replace the contents of `src/main.ts` with a minimal setup:

```typescript
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

### Step 5: Create Composables Directory

Navigate back to the project root and create `packages/index.ts` with your first composable:

```bash
cd ../..  # Back to my-vueyouse root
```

Create `packages/index.ts`:

```typescript
export function HelloVueYous() {
  // eslint-disable-next-line no-console
  console.log("Hello VueYous!");
}
```

> [!TIP]
> The `packages/` directory at the project root is where you'll build your VueUse-style composables. Each composable you create will be exported from `index.ts`.

### Step 6: Configure TypeScript and Vite Aliases

Navigate to the playground directory and update the configuration files:

```bash
cd examples/playground
```

Update `vite.config.ts` to add the `vueyouse` alias pointing to the root-level packages:

```typescript
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vueyouse: fileURLToPath(new URL("../../packages", import.meta.url)),
    },
  },
});
```

Update `tsconfig.app.json` to add TypeScript path mapping (add `baseUrl` and `paths` to `compilerOptions`):

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "types": ["vite/client"],
    "baseUrl": ".",
    "paths": {
      "vueyouse": ["../../packages/index.ts"]
    }
    /* ... other compiler options ... */
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

> [!IMPORTANT]
> The `vueyouse` alias allows you to import your composables from the root-level `packages/` directory. Both Vite (for runtime) and TypeScript (for type checking) need this configuration to resolve the module correctly.

### Step 7: Import and Call HelloVueYous

Update `src/main.ts` to import and call your first composable:

```typescript
import { createApp } from "vue";
import { HelloVueYous } from "vueyouse";
import App from "./App.vue";

HelloVueYous();

createApp(App).mount("#app");
```

### Step 8: Start Development Server

Start the development server from the playground directory:

```bash
pnpm run dev
```

## Core Learning Structure

Your VueYous project follows a monorepo structure that separates concerns:

```
my-vueyouse/
├── packages/              # Composables (your learning focus)
│   └── index.ts          # All composables exported here
└── examples/
    └── playground/        # Testing environment
        └── src/
            ├── App.vue
            └── main.ts    # Import and test composables
```

The most important file is `packages/index.ts` at the project root. This is where you'll build your VueUse-style composables throughout this guide:

```typescript
// packages/index.ts
export function HelloVueYous() {
  console.log("Hello VueYous!");
}

// As you learn, you'll add more composables here
export function useCounter() {
  /* ... */
}
export function useMouse() {
  /* ... */
}
```

You'll write composables in `packages/index.ts` and test them by importing in `examples/playground/src/main.ts` or any component in the playground app.

## Verifying Your Setup

To verify everything is working correctly:

1. Make sure your development server is running (`pnpm run dev`)
2. Open `http://localhost:5173` in your browser
3. Open the browser's Developer Console (F12 or right-click → Inspect → Console tab)
4. You should see **"Hello VueYous!"** printed in the console
5. Try editing any file in your project and save - you should see the changes immediately (Hot Module Replacement)

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

If you encounter errors like `Cannot find module 'vueyouse'`:

1. **Check TypeScript configuration**: Ensure `tsconfig.app.json` in the playground directory has the correct `paths` mapping:

   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "vueyouse": ["../../packages/index.ts"]
       }
     }
   }
   ```

2. **Check Vite configuration**: Ensure `vite.config.ts` has the correct alias:

   ```typescript
   resolve: {
     alias: {
       vueyouse: fileURLToPath(new URL("../../packages", import.meta.url));
     }
   }
   ```

3. **Delete node_modules and reinstall**:

   ```bash
   cd examples/playground
   rm -rf node_modules
   pnpm install
   ```

4. **Clear Vite cache**:
   ```bash
   rm -rf node_modules/.vite
   ```

> [!NOTE]
> For more details on TypeScript module resolution in monorepos, see `typescript-module-resolution-memo.md` in the project root.

### TypeScript Errors

If you see TypeScript errors in your editor:

1. Restart your TypeScript server (in VS Code: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server")
2. Make sure you have the Vue Language Features (Volar) extension installed (not Vetur)
3. Ensure you're working in the correct directory (`examples/playground`)

---

Ready to start building composables? Let's move on to understanding what composables are and why they're so powerful!
