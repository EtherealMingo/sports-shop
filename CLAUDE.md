---
name: "体育器材服务店铺管理系统开发专家"
description: "体育器材服务店铺综合管理系统：会员积分 + 耗材管理 + 服务预约。前端：uniapp(小程序) + React 19(后台)。后端：Spring Boot 3.2 + MyBatis Plus + MySQL。UI设计：ui-ux-pro-max。"
model: "claude-sonnet-4-5"
---

# 体育器材服务店铺管理系统 — Claude Code 开发配置

## 项目概览

开发一个面向体育器材服务店铺（羽毛球拍/网球拍缠线服务 + 器材售卖）的综合管理系统，核心目标是"增加用户粘性、回馈老客户 + 精细化运营 + 数据驱动决策"。

**业务核心**：缠线服务（高频刚需）+ 器材售卖（低频高客单）+ 积分体系闭环 + 线材料级追踪

**技术栈**：
- 小程序前端：uniapp + Vue 3 + UnoCSS + 图鸟 UI (TnUI)
- 管理后台前端：React 19 + Ant Design Pro (Umi Max)
- 后端：Java Spring Boot 3.2 + MyBatis Plus + MySQL 8.0
- UI 设计：**ui-ux-pro-max**（50+ 风格、97 色板、57 字体搭配、99 UX 指南、25 图表类型）
- 认证：JWT

## 业务 Skill 索引

本项目使用以下 Skill 指导开发，按需加载：

| Skill | 路径 | 激活场景 |
|---|---|---|
| **UI 设计（高质量）** | `ui-ux-pro-max` | 50+ 风格、97 色板、57 字体、99 UX 指南、25 图表。**所有页面设计前必须调用此 Skill** |
| **前端页面控制** | `frontend-design` | 创建 distinctive、production-grade 前端界面。**避免 generic AI 美学** |
| 会员积分小程序 | `.claude/CLAUDE.md`（本配置） | 小程序前端开发、UI 设计 |
| 线材耗材管理系统 | `.claude/skills/wire-management/skill.md` | 线材料库存、进销存、消耗/报废、二维码、财务报表 |
| PRD 编写规范 | `.claude/skills/pm-prd-writer/SKILL.md` | 需求文档编写、PRD 结构规范 |

### 开发场景与 Skill 映射

| 开发任务 | 推荐 Skill | 说明 |
|---------|-----------|------|
| **UI 设计（所有页面）** | `ui-ux-pro-max` | 50+ 风格、97 色板、57 字体、99 UX 指南。**设计前必须运行 `--design-system`** |
| **前端页面实现** | `frontend-design` | 创建 distinctive、production-grade 前端界面。**避免 generic AI 美学，追求独特视觉风格** |
| 小程序代码审查 | `zh-code-reviewer` | 中文代码审查报告 |
| 后台代码审查 | `refactor-advisor` | 重构建议、代码坏味道识别 |
| 后端 API 开发 | `api-tester` | API 测试用例生成 |
| 数据库设计/迁移 | `db-migrator` | Schema 对比、迁移脚本生成 |
| 数据库 ER 图 | `mermaid-tools` | Mermaid 图表绘制 |
| 安全审查 | `security-audit` | 漏洞扫描、依赖检查 |
| 单元测试 | `test-generator` | 自动生成测试代码 |
| 国际化 | `i18n-helper` / `i18n-expert` | 多语言支持 |
| 文档生成 | `zh-docgen` | 从代码生成中文技术文档 |
| Excel 导出 | `excel-automation` | 财务报表导出 |
| PDF 生成 | `pdf-creator` | 标签、报告 PDF 生成 |
| PPT 制作 | `ppt-creator` | 汇报 PPT |
| 代码质量 | `simplify` | 代码审查与品质优化 |
| PR 审查 | `review` | Pull Request 审查 |
| Prompt 优化 | `prompt-optimizer` | 需求描述优化 |
| **PDF 生成** | `pdf-creator` | 标签、报告 PDF 生成 |
| **PPT 制作** | `ppt-creator` | 汇报 PPT |
| **代码质量** | `simplify` | 代码审查与品质优化 |
| **PR 审查** | `review` | Pull Request 审查 |
| **Prompt 优化** | `prompt-optimizer` | 需求描述优化 |

## 设计风格指南

### 小程序端（活力热情主题）

```css
/* 主色调 - 运动活力橙 */
--primary: #FF6B35;
--primary-light: #FF8C61;
--primary-dark: #E55A2B;

/* 辅助色 */
--secondary: #00D9FF;
--accent: #FFD700;
--success: #00E676;
--warning: #FFC107;
--error: #FF5252;

/* 背景色 */
--bg-primary: #0A0E27;
--bg-secondary: #12183A;
--bg-tertiary: #1A237E;
```

- **整体风格**：深色模式 + 高对比度 + 运动科技感
- **圆角设计**：大圆角（16-24rpx）
- **动效**：快速响应（200-300ms）、弹性缓动
- **图标风格**：线性图标 + 品牌色点缀

### 管理后台端（专业简洁主题）

- **主题色**：Ant Design 默认蓝 #1890ff
- **布局**：侧边栏 + 顶部导航（mix 模式）
- **组件**：Ant Design Pro Components（ProTable, ProForm, StatisticCard）
- **图表**：@ant-design/plots 或 @ant-design/pro-components

## UI 设计工作流（ui-ux-pro-max）

> **强制规则**：所有页面设计前，必须先运行 `ui-ux-pro-max` 生成设计系统。

### 设计流程

```
1. 分析需求 → 提取产品类型/行业/风格关键词
2. 生成设计系统 → python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<关键词>" --design-system -p "项目名"
3. 补充查询 → 按 domain 查询细节（style/typography/color/ux/chart）
4. 技术栈指南 → --stack react/vue/html-tailwind
5. 实现代码 → 遵循设计系统 + 交付前检查清单
```

### 快速命令

```bash
# 生成完整设计系统（必须首先执行）
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "sports equipment shop badminton tennis" --design-system -p "Sports Shop"

# 指定技术栈（默认 html-tailwind）
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "dashboard admin" --design-system --stack react

# 查询具体领域
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "glassmorphism dark" --domain style
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "bar chart line" --domain chart
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "animation accessibility" --domain ux

# 持久化设计系统（跨会话保留）
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "关键词" --design-system --persist -p "项目名"
```

### 设计系统输出内容

| 输出项 | 说明 |
|--------|------|
| PATTERN | 页面模式（Hero-Centric/Feature-Rich 等）|
| STYLE | UI 风格（Glassmorphism/Minimalism 等）|
| COLORS | 主色/辅色/CTA/背景/文字色 |
| TYPOGRAPHY | 字体搭配（标题/正文）|
| KEY EFFECTS | 动效建议 |
| AVOID | 反模式警告 |

### 交付前检查清单（来自 Skill）

- [ ] 无 emoji 图标（使用 SVG：Heroicons/Lucide）
- [ ] 所有可点击元素有 `cursor-pointer`
- [ ] Hover 状态平滑过渡（150-300ms）
- [ ] 文字对比度 ≥ 4.5:1
- [ ] 焦点状态可见（键盘导航）
- [ ] 尊重 `prefers-reduced-motion`
- [ ] 响应式：375px / 768px / 1024px / 1440px

## 前端页面实现工作流（frontend-design）

> **强制规则**：所有前端页面实现必须使用 `frontend-design` skill，避免 generic AI 美学。

### 实现流程

```
1. 确定产品类型 → SaaS / E-commerce / Dashboard / Admin / Landing Page
2. 确定风格方向 → 从 50+ 风格中选择（避免 generic 选择）
3. 生成设计系统 → ui-ux-pro-max --design-system
4. 选择技术栈 → React / Vue / HTML-Tailwind / 其他 9 种
5. 实现代码 → 遵循 frontend-design 美学指南
6. 交付前检查 → 视觉质量 + 交互 + 对比度 + 响应式
```

### 核心原则（来自 frontend-design）

| 原则 | 要求 |
|------|------|
| **字体** | 禁止使用 Arial/Inter/Roboto，选择有特色的字体（Barlow/Playfair/DM Serif 等）|
| **色彩** | 主色+强调色，避免均匀分布的 timid palette |
| **动效** | CSS 优先，React 用 Motion 库，150-300ms 微交互 |
| **布局** | 不对称/重叠/对角线/打破网格，避免千篇一律 |
| **背景** | 渐变网格/噪点纹理/几何图案/分层透明，避免纯色 |
| **图标** | 只用 SVG（Heroicons/Lucide/Simple Icons），禁止 emoji |
| **光标** | 所有可点击元素必须有 `cursor-pointer` |
| **Hover** | 颜色/透明度过渡，禁止 scale 变换导致布局偏移 |
| **对比度** | 文字 4.5:1，玻璃卡片 light 模式用 `bg-white/80` |
| **响应式** | 375px / 768px / 1024px / 1440px |
| **无障碍** | 图片 alt 文字、表单 label、键盘导航、prefers-reduced-motion |

### 禁止事项（来自 frontend-design）

| 禁止 | 原因 |
|------|------|
| 禁止 emoji 作为图标 | 不专业 |
| 禁止通用字体（Inter/Roboto/Arial）| 缺乏个性 |
| 禁止紫色渐变白色背景 | 千篇一律 |
| 禁止 hover 时 scale 变换 | 导致布局偏移 |
| 禁止 glass 卡片 light 模式用 `bg-white/10` | 透明度过高 |
| 禁止文字颜色 `#94A3B8`（slate-400）| 对比度不足 |
| 禁止固定 navbar 贴边（`top-0`）| 需要留白 |
| 禁止内容被固定导航栏遮挡 | 需要 padding-top |

### 两 Skill 协作方式

```
场景：实现一个后台管理页面

1. ui-ux-pro-max --design-system "sports equipment admin dashboard"
   → 获得：风格、色板、字体、布局建议、反模式警告

2. frontend-design
   → 遵循设计系统 + 美学指南实现代码
   → 确保：独特视觉 + 高质量代码 + 交付前检查

3. frontend-design --stack react
   → 获得：React 性能优化最佳实践
```

## 技术架构规范

### 小程序端规范
- 框架：uniapp + Vue 3 Composition API + `<script setup>`
- UI：图鸟 UI (TnUI) 组件优先
- 请求：`uni.$u.http` 或封装的 `request` 方法
- 类型：TypeScript 接口
- 样式：SCSS + rpx 单位

### 管理后台端规范
- 框架：React 19 + Umi Max
- UI：Ant Design 5 + Pro Components
- 请求：Umi Max request
- 类型：TypeScript strict
- 代码规范：Biome (lint)

### 后端规范
- 框架：Spring Boot 3.2 + MyBatis Plus
- 数据库：MySQL 8.0 + utf8mb4
- 认证：JWT Token（24h 有效期）
- 返回格式：`Result<T>`（`{ code: 200, message, data }`）
- 软删除：`deleted` 字段（0=正常 1=已删）
- 审计字段：`created_by`, `updated_by`, `create_time`, `update_time`

## 数据库设计规范

### 命名规范
- 表名：`tb_` 前缀 + 英文小写单数名词
- 字段：snake_case（`create_time`, `update_time`, `deleted`）
- 索引：`idx_` 前缀 + 字段名
- 唯一索引：`uk_` 前缀 + 字段名

### 必备字段（每张表）
```sql
id              BIGINT AUTO_INCREMENT PRIMARY KEY
deleted         TINYINT DEFAULT 0
create_time     DATETIME DEFAULT CURRENT_TIMESTAMP
update_time     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
created_by      BIGINT COMMENT '创建人ID'
updated_by      BIGINT COMMENT '更新人ID'
```

### 字典值管理
- 所有枚舉值統一存儲在 `tb_dict_data` 表
- 字典類型定義在 `tb_dict_type` 表
- 前端下拉框從 `/api/dict/{typeCode}` 獲取

### ER 關係圖
> 完整 ER 關係圖（25 條關係線）參見需求文檔 4.6.3 節

## 开发优先级（P0/P1/P2）

### P0 - 核心必备
1. 微信登录 + 会员注册
2. 积分查询/使用/管理
3. 线材料 CRUD + 供应商管理
4. 进货管理（批次计价）
5. 消耗/报废记录
6. 库存查询 + 低库存预警
7. 二维码生成 + 扫码使用
8. 服务预约 + 进度追踪

### P1 - 重要优化
1. 智能采购建议 + 库存盘点
2. 财务报表（毛利/损耗/月度汇总）
3. 服务毛利分析 + 技师绩效看板
4. 线材效期管理 + 单卷余量追踪
5. 应付账款管理 + 现金流日历
6. 个性化推荐

### P2 - 可选拓展
1. 会员等级权益 + 积分翻倍活动
2. 客户 RFM 分析 + 营销活动
3. 盈亏平衡分析 + 数据导出
4. 多店铺支持

## 开发检查清单

每次生成代码前，请确认：
- [ ] 是否遵循各端的组件规范？（TnUI / Ant Design Pro）
- [ ] 是否使用项目统一的请求封装？
- [ ] 是否添加了 TypeScript 类型定义？
- [ ] 是否添加了加载/错误/空状态处理？
- [ ] 数据库表是否包含全部审计字段？
- [ ] 字典值是否从 `tb_dict_data` 获取？
- [ ] 是否考虑了小程序特有约束？
- [ ] 接口返回格式是否符合 `Result<T>` 规范？

## 禁止事项

1. 禁止生成线上支付功能（仅支持线下消费 + 积分抵扣）
2. 禁止生成物流配送功能（兑换商品仅到店自提）
3. 禁止跳过 Mock 数据层直接调真实 API
4. 禁止使用 `any` 类型（用 `API.Xxx` 或 `Record<string, unknown>`）
5. 禁止在 Service 层混用真实请求和 Mock（通过 `ENABLE_MOCK` flag 统一切换）
6. 禁止对软删除记录执行物理删除

## 需求文档

> **文档已拆分为模块化结构，按需加载以节省 Token。**

完整需求文档（29 张表、98 个 API、46 个页面）已拆分为以下模块：

| 模块 | 文档 | 核心内容 |
|------|------|---------|
| 项目概述 | `docs/01-项目概述.md` | 技术栈、功能清单、优先级 |
| 会员积分系统 | `docs/02-会员积分系统.md` | 登录/积分/兑换/规则 |
| 线材耗材管理系统 | `docs/03-线材耗材管理系统.md` | 进销存/二维码/追溯/财务 |
| 服务预约与追踪系统 | `docs/04-服务预约与追踪系统.md` | 预约/进度/历史/推荐 |
| 数据库设计 | `docs/05-数据库设计.md` | 完整表结构/ER图/索引 |
| UI 设计规范 | `docs/06-UI设计规范.md` | 设计系统/美学指南/检查清单 |

**工程化结构**: `docs/00-工程化结构.md`（前后端分层、命名规范、API 规范、开发顺序）

**索引文件**: `docs/README.md`（导航 + 快速定位 + 开发顺序）

### 开发时按需加载

| 开发任务 | 加载文档 |
|---------|---------|
| 微信登录/注册 | `docs/02-会员积分系统.md` |
| 积分管理 | `docs/02-会员积分系统.md` |
| 线材 CRUD | `docs/03-线材耗材管理系统.md` |
| 二维码管理 | `docs/03-线材耗材管理系统.md` |
| 服务预约 | `docs/04-服务预约与追踪系统.md` |
| 数据库建表 | `docs/05-数据库设计.md` |
| UI 设计 | `docs/06-UI设计规范.md` |
