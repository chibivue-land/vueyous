# 设置开发环境

在开始创建组合式函数之前，让我们先为学习 VueYous 设置一个合适的开发环境。本章将介绍两种方法：使用我们提供的便捷设置工具或手动配置环境。

## 前置条件

开始之前，请确保已安装以下工具：

- **Node.js**（v24.13.0 或更高版本）
- **pnpm**（v10.28.2 或更高版本）

您可以通过运行以下命令来验证安装：

```bash
node --version
pnpm --version
```

您可以从以下链接安装：

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- pnpm: [https://pnpm.io/installation](https://pnpm.io/installation)

## 设置方法

有两种方法来设置您的 VueYous 学习环境。选择适合您需求的方法。

## 方法 1: 使用 create-vueyouse（推荐）

最简单的入门方法是使用我们的 `create-vueyouse` 工具。该工具会为您搭建一个包含所有必要文件和配置的完整学习环境。

### 步骤 1: 创建项目

运行以下命令，将 `my-vueyouse` 替换为您喜欢的目录名：

```bash
pnpm dlx tsx tools/create-vueyouse/main.ts my-vueyouse
```

此命令将：

- 使用您指定的名称创建新目录
- 复制所有必要的模板文件
- 设置用于学习的项目结构

### 步骤 2: 进入项目目录

该工具会在 `packages/` 中创建您的组合式函数，在 `playground/` 中创建开发环境。进入 playground 目录：

```bash
cd my-vueyouse/playground
```

### 步骤 3: 安装依赖

```bash
pnpm install
```

### 步骤 4: 启动开发服务器

```bash
pnpm run dev
```

您的开发服务器现在应该在 `http://localhost:5173` 运行。在浏览器中打开此 URL，您就可以开始学习了！

## 方法 2: 手动设置

如果您希望了解设置的每个部分或想从头开始自定义环境，请按照以下步骤操作：

### 步骤 1: 创建 Vite 项目

使用 Vue 和 TypeScript 创建新的 Vite 项目：

```bash
pnpm create vite my-vueyouse --template vue-ts
cd my-vueyouse
pnpm install
```

### 步骤 2: 清理不必要的文件

删除 VueYous 学习中不需要的文件：

```bash
rm -rf src/assets src/components src/style.css public
```

### 步骤 3: 简化 App.vue 和 main.ts

将 `src/App.vue` 的内容替换为简单的模板：

```vue
<template>Hello VueYous!</template>
```

将 `src/main.ts` 的内容替换为最小化设置：

```typescript
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

### 步骤 4: 创建组合式函数目录

创建用于构建组合式函数的 `packages` 目录：

```bash
mkdir packages
```

创建您的第一个组合式函数 `packages/index.ts`：

```typescript
export function HelloVueYous() {
  // eslint-disable-next-line no-console
  console.log("Hello VueYous!");
}
```

> [!TIP]
> `packages/` 目录是您构建 VueUse 风格组合式函数的地方。您创建的每个组合式函数都将从 `index.ts` 导出。

### 步骤 5: 配置 TypeScript 和 Vite 别名

更新 `vite.config.ts` 添加 `vueyouse` 别名：

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

更新 `tsconfig.app.json` 添加 TypeScript 路径映射（在 `compilerOptions` 中添加 `baseUrl` 和 `paths`，在 `include` 中添加 `packages/**/*.ts`）。

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
    /* ... 其他编译器选项 ... */
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue", "packages/**/*.ts"]
}
```

> [!IMPORTANT]
> `vueyouse` 别名允许您在整个项目中从 `packages/` 目录导入组合式函数。

### 步骤 6: 导入并调用 HelloVueYous

更新 `src/main.ts` 导入并调用您的第一个组合式函数：

```typescript
import { createApp } from "vue";
import { HelloVueYous } from "vueyouse";
import App from "./App.vue";

HelloVueYous();

createApp(App).mount("#app");
```

### 步骤 7: 启动开发服务器

启动开发服务器：

```bash
pnpm run dev
```

## 核心学习结构

VueYous 项目中最重要的是 `packages/index.ts` 文件。在整个指南中，您将在这里构建 VueUse 风格的组合式函数。

```typescript
// packages/index.ts
export function HelloVueYous() {
  console.log("Hello VueYous!");
}

// 随着学习的深入，您将在这里添加更多组合式函数
export function useCounter() {
  /* ... */
}
export function useMouse() {
  /* ... */
}
```

实际的项目结构可能因您的设置方法而异，但这个核心文件保持不变。

## 验证您的设置

要验证一切是否正常工作：

1. 确保开发服务器正在运行（`pnpm run dev`）
2. 在浏览器中打开 `http://localhost:5173`
3. 打开浏览器的开发者控制台（F12 或右键 → 检查 → Console 标签）
4. 您应该在控制台中看到 **"Hello VueYous!"**
5. 尝试编辑项目中的任何文件并保存 - 您应该立即看到更改（热模块替换）

> [!TIP]
> 如果在控制台中看到 "Hello VueYous!"，恭喜！您的环境已正确设置，可以开始学习了。

## 下一步

恭喜！您的开发环境现已准备就绪。

在下一节中，我们将开始创建第一个组合式函数，并了解 VueUse 组合式函数的内部工作原理。

## 故障排除

### 端口已被占用

如果您看到端口 5173 已被使用的错误：

```bash
# 终止使用该端口的进程
npx kill-port 5173

# 或指定不同的端口
pnpm run dev -- --port 3000
```

### 模块解析问题

如果遇到模块解析错误：

1. 删除 `node_modules` 并重新安装：
   ```bash
   rm -rf node_modules
   pnpm install
   ```
2. 清除 Vite 缓存：
   ```bash
   rm -rf node_modules/.vite
   ```

### TypeScript 错误

如果在编辑器中看到 TypeScript 错误：

1. 重启 TypeScript 服务器（在 VS Code 中：`Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"）
2. 确保已安装 Vue Language Features (Volar) 扩展（而不是 Vetur）

---

准备好开始构建组合式函数了吗？让我们继续了解什么是组合式函数以及它们为何如此强大！
