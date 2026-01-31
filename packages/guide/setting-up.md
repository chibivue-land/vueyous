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

### Step 2: Navigate to Playground Directory

The tool creates your composables in `packages/` and a development environment in `playground/`. Navigate to the playground directory:

```bash
cd my-vueyouse/playground
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
├── playground/            # Development environment
│   ├── src/
│   │   ├── App.vue
│   │   └── main.ts
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
├── tsconfig.json
└── package.json
```

You'll write your composables in `packages/index.ts` and test them in the `playground` app.

## Approach 2: Manual Setup

If you prefer to understand every piece of the setup or want to customize your environment from scratch, follow these steps:

### Step 1: Create Vite Project

Create a new Vite project with Vue and TypeScript:

```bash
pnpm create vite my-vueyouse --template vue-ts
cd my-vueyouse
pnpm install
```

### Step 2: Clean Up Unnecessary Files

Remove the files we won't need for learning VueYous:

```bash
rm -rf src/assets src/components src/style.css public
```

### Step 3: Simplify App.vue and main.ts

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

### Step 4: Create Composables Directory

Create the `packages` directory for building your composables:

```bash
mkdir packages
```

Create your first composable `packages/index.ts`:

```typescript
export function HelloVueYous() {
  // eslint-disable-next-line no-console
  console.log("Hello VueYous!");
}
```

> [!TIP]
> The `packages/` directory at the project root is where you'll build your VueUse-style composables. Each composable you create will be exported from `index.ts`.

### Step 5: Configure TypeScript and Vite Aliases

Update `vite.config.ts` to add the `vueyouse` alias:

```typescript
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vueyouse: fileURLToPath(new URL("./packages", import.meta.url)),
    },
  },
});
```

Update `tsconfig.app.json` to add TypeScript path mapping (add `baseUrl` and `paths` to `compilerOptions`, and add `packages/**/*.ts` to `include`):

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "types": ["vite/client"],
    "baseUrl": ".",
    "paths": {
      "vueyouse": ["./packages/index.ts"]
    }
    /* ... other compiler options ... */
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue", "packages/**/*.ts"]
}
```

> [!IMPORTANT]
> The `vueyouse` alias allows you to import your composables throughout the project from the `packages/` directory.

### Step 6: Import and Call HelloVueYous

Update `src/main.ts` to import and call your first composable:

```typescript
import { createApp } from "vue";
import { HelloVueYous } from "vueyouse";
import App from "./App.vue";

HelloVueYous();

createApp(App).mount("#app");
```

### Step 7: Start Development Server

Start the development server:

```bash
pnpm run dev
```

## Core Learning Structure

The most important file in your VueYous project is `packages/index.ts`. This is where you'll build your VueUse-style composables throughout this guide:

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

The actual project structure may differ depending on how you set it up, but this core file remains the same.

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

1. **Check TypeScript configuration**: Ensure `tsconfig.app.json` has the correct `paths` mapping:

   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "vueyouse": ["./packages/index.ts"]
       }
     }
   }
   ```

2. **Check Vite configuration**: Ensure `vite.config.ts` has the correct alias:

   ```typescript
   resolve: {
     alias: {
       vueyouse: fileURLToPath(new URL("./packages", import.meta.url));
     }
   }
   ```

3. **Delete node_modules and reinstall**:

   ```bash
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

---

Ready to start building composables? Let's move on to understanding what composables are and why they're so powerful!
