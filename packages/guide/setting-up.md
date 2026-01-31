# Setting Up the Development Environment

Before diving into creating composables, let's set up a development environment for learning VueYous.

VueYous takes an approach where **we build Vue.js APIs from scratch**. This means we'll understand the reactivity system by implementing minimal versions of `ref`, `computed`, `watchEffect`, and then build VueUse-style composables on top of them.

> [!TIP]
> This approach follows the same "chibi (minimal)" spirit as [chibivue](https://github.com/chibivue-land/chibivue), [chibivitest](https://github.com/chibivue-land/chibivitest), and [chibinuxt](https://github.com/chibivue-land/chibinuxt). Rather than using existing APIs directly, we'll implement them from the ground up to deeply understand how they work.

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

```bash
cd my-vueyouse
```

### Step 3: Install Dependencies

```bash
pnpm install
```

### Step 4: Run and Verify

```bash
pnpm run dev
```

If you see **"Hello VueYous!"** in the console, you're all set!

## Approach 2: Manual Setup

If you prefer to understand every piece of the setup or want to customize your environment from scratch, follow these steps:

### Step 1: Create Project Directory

```bash
mkdir my-vueyouse
cd my-vueyouse
pnpm init
```

### Step 2: Install Dependencies

```bash
pnpm add -D typescript tsx @types/node
```

> [!NOTE]
> - **TypeScript**: For type safety
> - **tsx**: To execute TypeScript files directly
> - **@types/node**: Type definitions for Node.js

### Step 3: Configure TypeScript

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "vueyouse": ["./packages/index.ts"]
    }
  },
  "include": ["src/**/*", "packages/**/*"]
}
```

> [!IMPORTANT]
> The `"vueyouse": ["./packages/index.ts"]` in `paths` allows you to import composables using the `vueyouse` alias throughout your project.

### Step 4: Add Scripts to package.json

Add the following to your `package.json`:

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx --watch src/main.ts"
  }
}
```

> [!TIP]
> The `--watch` flag enables hot reload - your code will automatically re-run when you save files.

### Step 5: Create Directory Structure

```bash
mkdir src packages
```

### Step 6: Create Entry Point

Create `src/main.ts`:

```typescript
import { HelloVueYous } from "vueyouse";

HelloVueYous();
```

### Step 7: Create Your First Composable

Create `packages/index.ts`:

```typescript
export function HelloVueYous() {
  console.log("Hello VueYous!");
}
```

> [!TIP]
> The `packages/` directory is where you'll build your VueUse-style composables. Each composable you create will be exported from `index.ts`.

### Step 8: Run and Verify

```bash
pnpm run dev
```

## Project Structure

After setup, your project will look like this:

```
my-vueyouse/
├── src/
│   └── main.ts          # Entry point (for experiments and testing)
├── packages/
│   └── index.ts         # Where you'll implement composables
├── package.json
└── tsconfig.json
```

**Key Points:**

- **`packages/index.ts`**: The core file of VueYous. You'll implement all composables here
- **`src/main.ts`**: Entry point for experiments and testing. A place to try out your composables
- **Simple setup**: No Vite or Vue needed. Learn the reactivity system from the ground up in a pure TypeScript environment

## Verifying Your Setup

To verify everything is working correctly:

1. Run `pnpm run dev`
2. Check that **"Hello VueYous!"** appears in the console
3. Try editing `packages/index.ts`:

```typescript
export function HelloVueYous() {
  console.log("Hello VueYous! 🎉");
}
```

4. Save the file - it should automatically re-run and display the new message

> [!TIP]
> If you see "Hello VueYous!" in the console, congratulations! Your environment is set up correctly and ready for learning.

## Learning Path

In VueYous, we'll learn in this order:

1. **Part 0: Implementing Minimal Vue.js APIs**
   - Simple implementation of `ref` (dependency tracking mechanism)
   - Simple implementation of `computed`
   - Simple implementation of `watchEffect`

2. **Part 1 and Beyond: Implementing VueUse-style Composables**
   - Using our custom Vue APIs to learn VueUse patterns
   - State management, DOM manipulation, Browser APIs, Sensors, Network, and more

## Why Not Use Vue.js?

Reasons why VueYous doesn't use Vue.js APIs directly:

### 1. **Educational Value**

If we used Vue.js APIs (`ref`, `computed`, etc.) as-is, we'd essentially be copying VueUse's source code. By building them ourselves, we deeply understand **why they're implemented that way**.

### 2. **Minimal Code**

Following the "chibi (small)" spirit, we understand mechanisms with minimal code. Production Vue.js has many features, but VueYous only implements what's necessary for learning.

### 3. **Understanding the Reactivity System**

By understanding how the reactivity system works, you'll be able to use Vue.js and VueUse more effectively.

## Next Steps

Congratulations! Your development environment is now ready.

In the next section, we'll start with a simple implementation of `ref`, the foundation of reactivity, and understand how Vue.js's reactivity system works.

## Troubleshooting

### tsx Command Not Found

If tsx is not installed, run:

```bash
pnpm add -D tsx
```

### Module Resolution Issues

If you can't import `vueyouse`:

1. Check the `paths` setting in `tsconfig.json`
2. Verify you're running from the project root directory
3. Restart TypeScript server (in VS Code: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server")

### File Watching Not Working

If `--watch` is not working:

1. Make sure you're saving the file
2. Check your `tsx` version (latest recommended)
3. Run manually: `pnpm run dev`

---

Ready? Let's dive into the heart of reactivity!
