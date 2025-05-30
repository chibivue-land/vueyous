# 为 VueYous 做贡献

感谢您对 VueYous 的关注！通过这个项目，您可以学习如何创建类似 VueUse 的可重用、可维护和可扩展的组合函数。

## 开发环境设置

### 前提条件

- Node.js 20 或更高版本
- pnpm 8.15.6 或更高版本

### 设置步骤

1. Fork 并克隆仓库：

```bash
$ git clone https://github.com/your-username/vueyous.git
$ cd vueyous
```

2. 安装依赖：

```bash
$ pnpm install
```

3. 启动开发服务器：

```bash
$ pnpm docs:dev
```

## 项目结构

```
vueyous/
├── packages/
│   ├── core/           # 核心组合函数
│   ├── shared/         # 共享工具
│   ├── guide/          # 文档（英语）
│   ├── ja/            # 文档（日语）
│   └── zh/            # 文档（中文）
├── package.json       # 根包配置
└── vite.config.ts     # Vite 配置
```

## 如何贡献

### 添加新的组合函数

1. 在 `packages/core` 目录中创建新文件夹：

```bash
$ mkdir packages/core/useYourComposable
```

2. 创建以下文件：
   - `index.ts` - 组合函数实现
   - `index.md` - 文档
   - `demo.vue` - 演示组件（如需要）

3. 将导出添加到 `packages/core/index.ts`

### 文档更新

- 英语文档：`packages/guide/`
- 日语文档：`packages/ja/guide/`
- 中文文档：`packages/zh/guide/`

### 编码标准

- 使用 TypeScript
- 遵循 ESLint 规则（使用 `pnpm lint` 检查）
- 代码格式自动应用

## 开发命令

```bash
# 启动开发服务器
$ pnpm docs:dev

# 构建
$ pnpm build

# 类型检查
$ pnpm type-check

# 代码检查
$ pnpm lint

# 代码检查自动修复
$ pnpm lint:fix

# 文本检查（用于日语文档）
$ pnpm lint:text

# 构建文档
$ pnpm docs:build

# 预览文档
$ pnpm docs:preview
```

感谢您的贡献！🎉
