# 设置开发环境

在开始创建组合式函数之前，让我们先为学习 VueYous 设置开发环境。

VueYous 采用**从头开始构建 Vue.js API** 的方法。这意味着我们将通过实现 `ref`、`computed`、`watchEffect` 的最小版本来理解响应式系统，然后在此基础上构建 VueUse 风格的组合式函数。

> [!TIP]
> 这种方法遵循与 [chibivue](https://github.com/chibivue-land/chibivue)、[chibivitest](https://github.com/chibivue-land/chibivitest) 和 [chibinuxt](https://github.com/chibivue-land/chibinuxt) 相同的"chibi（最小化）"精神。我们不直接使用现有的 API，而是从头开始实现它们，以深入理解其工作原理。

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

```bash
cd my-vueyouse
```

### 步骤 3: 安装依赖

```bash
pnpm install
```

### 步骤 4: 运行并验证

```bash
pnpm run dev
```

如果在控制台中看到 **"Hello VueYous!"**，则一切就绪！

## 方法 2: 手动设置

如果您希望了解设置的每个部分或想从头开始自定义环境，请按照以下步骤操作：

### 步骤 1: 创建项目目录

```bash
mkdir my-vueyouse
cd my-vueyouse
pnpm init
```

### 步骤 2: 安装依赖

```bash
pnpm add -D typescript tsx @types/node
```

> [!NOTE]
> - **TypeScript**: 用于类型安全
> - **tsx**: 直接执行 TypeScript 文件
> - **@types/node**: Node.js 的类型定义

### 步骤 3: 配置 TypeScript

创建 `tsconfig.json`：

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
> `paths` 中的 `"vueyouse": ["./packages/index.ts"]` 允许您在整个项目中使用 `vueyouse` 别名导入组合式函数。

### 步骤 4: 在 package.json 中添加脚本

在 `package.json` 中添加以下内容：

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx --watch src/main.ts"
  }
}
```

> [!TIP]
> `--watch` 标志启用热重载 - 保存文件时代码会自动重新运行。

### 步骤 5: 创建目录结构

```bash
mkdir src packages
```

### 步骤 6: 创建入口点

创建 `src/main.ts`：

```typescript
import { HelloVueYous } from "vueyouse";

HelloVueYous();
```

### 步骤 7: 创建第一个组合式函数

创建 `packages/index.ts`：

```typescript
export function HelloVueYous() {
  console.log("Hello VueYous!");
}
```

> [!TIP]
> `packages/` 目录是您构建 VueUse 风格组合式函数的地方。您创建的每个组合式函数都将从 `index.ts` 导出。

### 步骤 8: 运行并验证

```bash
pnpm run dev
```

## 项目结构

设置完成后，您的项目结构如下：

```
my-vueyouse/
├── src/
│   └── main.ts          # 入口点（用于实验和测试）
├── packages/
│   └── index.ts         # 实现组合式函数的地方
├── package.json
└── tsconfig.json
```

**关键点：**

- **`packages/index.ts`**: VueYous 的核心文件。您将在这里实现所有组合式函数
- **`src/main.ts`**: 实验和测试的入口点。用于尝试您创建的组合式函数
- **简单配置**: 不需要 Vite 或 Vue。在纯 TypeScript 环境中从头学习响应式系统

## 验证您的设置

要验证一切是否正常工作：

1. 运行 `pnpm run dev`
2. 检查控制台是否显示 **"Hello VueYous!"**
3. 尝试编辑 `packages/index.ts`：

```typescript
export function HelloVueYous() {
  console.log("Hello VueYous! 🎉");
}
```

4. 保存文件 - 它应该自动重新运行并显示新消息

> [!TIP]
> 如果在控制台中看到 "Hello VueYous!"，恭喜！您的环境已正确设置，可以开始学习了。

## 学习路径

在 VueYous 中，我们将按以下顺序学习：

1. **Part 0: 实现最小化 Vue.js API**
   - `ref` 的简单实现（依赖跟踪机制）
   - `computed` 的简单实现
   - `watchEffect` 的简单实现

2. **Part 1 及以后: 实现 VueUse 风格的组合式函数**
   - 使用我们自定义的 Vue API 学习 VueUse 模式
   - 状态管理、DOM 操作、浏览器 API、传感器、网络等

## 为什么不使用 Vue.js？

VueYous 不直接使用 Vue.js API 的原因：

### 1. **教育价值**

如果我们直接使用 Vue.js 的 API（`ref`、`computed` 等），实际上就是在复制 VueUse 的源代码。通过自己构建，我们可以深入理解**为什么要这样实现**。

### 2. **最小化代码**

遵循"chibi（小型）"精神，我们用最少的代码理解机制。生产环境的 Vue.js 有很多功能，但 VueYous 只实现学习所需的部分。

### 3. **理解响应式系统**

通过理解响应式系统的工作原理，您将能够更有效地使用 Vue.js 和 VueUse。

## 下一步

恭喜！您的开发环境现已准备就绪。

在下一节中，我们将从响应式基础 `ref` 的简单实现开始，了解 Vue.js 响应式系统的工作原理。

## 故障排除

### 找不到 tsx 命令

如果未安装 tsx，请运行：

```bash
pnpm add -D tsx
```

### 模块解析问题

如果无法导入 `vueyouse`：

1. 检查 `tsconfig.json` 中的 `paths` 设置
2. 确认您在项目根目录中运行
3. 重启 TypeScript 服务器（在 VS Code 中：`Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"）

### 文件监视不工作

如果 `--watch` 不工作：

1. 确保已保存文件
2. 检查 `tsx` 版本（推荐最新版本）
3. 手动运行：`pnpm run dev`

---

准备好了吗？让我们深入响应式的核心！
