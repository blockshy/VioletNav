# VioletNav

## 中文说明

VioletNav 是一个简洁的导航仪表盘项目，用于集中展示常用网站或工具入口。它支持搜索、收藏、主题切换和中英双语界面，适合作为个人导航页或轻量级资源站首页。

### 功能特性

- 以分类卡片方式展示导航链接
- 支持关键词搜索分类和卡片内容
- 支持收藏常用项目并自动生成“我的收藏”分组
- 支持深浅色主题切换
- 支持中英双语切换
- 大屏下提供悬浮快速跳转目录

### 技术栈

- React 19
- TypeScript
- Vite
- `lucide-react`

### 本地运行

```bash
npm install
npm run dev
```

### 构建生产版本

```bash
npm run build
npm run preview
```

### 目录结构

```text
components/            头部、卡片、页脚等界面组件
data.ts                导航分类与链接数据
types.ts               类型定义
App.tsx                搜索、收藏、主题和语言逻辑
```

### 适用场景

- 个人起始页
- 项目工具导航页
- 团队内部常用链接聚合页

---

## English

VioletNav is a minimal navigation dashboard for organizing and presenting frequently used websites or tools. It supports search, favorites, theme switching, and a bilingual interface, making it suitable as a personal start page or lightweight resource hub.

### Features

- Display navigation links as categorized cards
- Search across category titles and card content
- Favorite items and generate a dynamic "My Favorites" section
- Switch between dark and light themes
- Toggle between Chinese and English
- Show a floating quick-jump navigation panel on large screens

### Tech Stack

- React 19
- TypeScript
- Vite
- `lucide-react`

### Run Locally

```bash
npm install
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

### Project Structure

```text
components/            Header, cards, footer, and UI components
data.ts                Navigation categories and link data
types.ts               Type definitions
App.tsx                Search, favorites, theme, and language logic
```

### Use Cases

- Personal start page
- Tool navigation portal for projects
- Internal team link aggregation page
