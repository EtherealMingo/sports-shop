# 体育器材服务店铺管理系统

## 项目概述

这是一个基于微信小程序、Web 管理后台和 Java Spring Boot 的综合管理系统，为体育器材服务店铺提供三大核心模块：

1. **会员积分管理系统**：会员积分管理、商品兑换、服务预约，增加用户粘性、回馈老客户
2. **耗材管理系统**：网球/羽毛球拍线的进销存管理，支持批次计价、日常消耗记录、报废追踪、二维码扫码追踪、财务统计分析
3. **服务预约与追踪系统**：缠线服务预约、进度追踪、服务历史、个性化推荐

## 技术栈

### 前端(小程序)
- **框架**: uniapp (基于 Vue 3)
- **UI**: UnoCSS + 图鸟 UI (TnUI)
- **状态管理**: Pinia
- **网络请求**: Alova
- **构建工具**: Vite
- **UI 设计**: ui-ux-pro-max（50+ 风格、97 色板、57 字体、99 UX 指南）

### 前端(Web管理后台)
- **框架**: React 19 + Ant Design Pro
- **UI**: Ant Design 5
- **构建工具**: Umi Max
- **状态管理**: Umi 内置
- **网络请求**: Umi Max request
- **UI 设计**: ui-ux-pro-max

### 后端(Java)
- **框架**: Spring Boot 3.2.0
- **ORM**: MyBatis Plus
- **数据库**: MySQL 8.0
- **连接池**: Druid
- **工具库**: Hutool
- **认证**: JWT

### UI 设计
- **工具**: ui-ux-pro-max（`.claude/skills/ui-ux-pro-max/`）— 50+ 风格、97 色板、57 字体、99 UX 指南
- **实现**: frontend-design（`.claude/skills/frontend-design/`）— 避免 generic AI 美学，追求独特视觉风格
- **使用**: 所有页面设计前必须先运行 `--design-system` 生成设计系统，再用 frontend-design 实现代码

## 项目结构

```
sports/
├── sports_miniprogram/          # 微信小程序前端
│   ├── src/
│   │   ├── api/                 # API接口
│   │   │   ├── types/           # 类型定义
│   │   │   ├── member.ts        # 会员相关API
│   │   │   ├── wire.ts          # 线材管理API
│   │   │   ├── qr.ts            # 二维码API
│   │   │   └── appointment.ts   # 预约API
│   │   ├── pages/               # 用户端页面
│   │   │   ├── index/           # 首页
│   │   │   ├── points/          # 积分相关页面
│   │   │   ├── exchange/        # 兑换相关页面
│   │   │   ├── appointment/     # 预约相关页面
│   │   │   ├── qr/              # 二维码扫码
│   │   │   └── user/            # 个人中心
│   │   ├── store/               # Pinia 状态管理
│   │   └── utils/               # 工具函数
│   ├── pages.json               # 页面配置
│   └── uni.scss                 # 全局样式变量
├── sports_admin/                # Web管理后台
│   ├── src/
│   │   ├── pages/               # 页面
│   │   │   ├── Wire/            # 线材管理
│   │   │   ├── Supplier/        # 供应商管理
│   │   │   ├── Purchase/        # 进货管理
│   │   │   ├── QR/              # 二维码管理
│   │   │   ├── Report/          # 财务报表
│   │   │   └── ...              # 其他页面
│   │   └── services/            # API服务
│   │       ├── admin.ts         # 管理端API（积分）
│   │       ├── wire.ts          # 管理端API（线材）
│   │       └── typings.d.ts     # 类型定义
│   └── config/                  # 配置文件
├── sports_java/                 # Java后端
│   ├── src/main/java/com/sports/
│   │   ├── entity/              # 实体类
│   │   ├── mapper/              # MyBatis Mapper
│   │   ├── service/             # 服务层
│   │   ├── controller/          # 控制器
│   │   └── common/              # 公共类
│   └── src/main/resources/
│       └── db/                  # 数据库脚本
├── .claude/skills/              # 业务 Skill
│   ├── wire-management/         # 线材耗材管理系统 Skill
│   ├── pm-prd-writer/            # PRD 编写规范 Skill
│   ├── ui-ux-pro-max/           # UI/UX 高质量设计 Skill
│   └── frontend-design/          # 前端页面实现 Skill
└── 体育器材服务店铺管理系统 - 功能性需求文档.md
```

## 数据库设计

### 核心表（29 张）

| 模块 | 表数量 | 核心表 |
|------|--------|--------|
| 会员模块 | 7 | tb_member, tb_points_record, tb_exchange_item, tb_exchange_record, tb_admin, tb_points_rule |
| 线材模块 | 9 | tb_wire, tb_supplier, tb_purchase, tb_usage, tb_waste, tb_wire_quality, tb_wire_spool, tb_inventory_suggestion, tb_inventory_check |
| 二维码模块 | 2 | tb_qr_code, tb_qr_scan_record |
| 预约模块 | 5 | tb_appointment, tb_service_progress, tb_service_history, tb_recommendation, tb_technician |
| 财务增强 | 6 | tb_profit_analysis, tb_payable, tb_price_trend, tb_break_even, tb_wastage_attribution, tb_training_task |

> 完整表结构、字段定义、索引策略、ER 关系图，参见 `体育器材服务店铺管理系统 - 功能性需求文档.md` 第四章 4.6 节。

## 快速开始

### 1. 数据库初始化

```bash
cd sports_java
mysql -u root -p < src/main/resources/db/init.sql
```

### 2. 后端启动

```bash
cd sports_java
# 修改 src/main/resources/application.yml 中的数据库配置
mvn spring-boot:run
```

后端服务将在 `http://localhost:8080` 启动

### 3. Web管理后台启动

```bash
cd sports_admin
npm install
npm run start:dev
```

管理后台将在 `http://localhost:8000` 启动

### 4. 小程序启动

```bash
cd sports_miniprogram
pnpm install
pnpm dev:mp
```

## 核心功能

### 用户端(P0功能)
- ✅ 微信快捷登录/会员注册
- ✅ 积分查询(余额+明细)
- ✅ 积分规则查看
- ✅ 店铺信息查看
- ✅ 积分抵扣消费
- ✅ 积分兑换商品/服务
- ✅ 缠线服务预约
- ✅ 服务进度追踪
- ✅ 二维码扫码标记线材使用

### 商家端 - 积分管理系统(Web后台 P0功能)
- ✅ 数据概览
- ✅ 会员管理
- ✅ 积分管理(调整/核销)
- ✅ 兑换管理(商品/记录)
- ✅ 预约管理
- ✅ 积分规则设置

### 商家端 - 耗材管理系统(Web后台 P0功能)
- ✅ 线材管理 — 品牌/型号/规格 CRUD，展示实时库存与加权均价
- ✅ 供应商管理 — 供应商信息 CRUD
- ✅ 进货管理 — 批次计价进货记录，自动生成批次号
- ✅ 消耗记录 — 每日缠线消耗录入
- ✅ 报废记录 — 断裂/打结/人为损坏等损耗录入
- ✅ 库存查询 — 实时库存 + 低库存预警 + 库存价值统计
- ✅ 二维码管理 — 进货时自动生成二维码标签，支持批量打印
- ✅ 财务报表 — 日消耗统计 + 供应商价格比较 + 损耗率 + 月度汇总

### 商家端 - 经营增强(P1功能)
- ✅ 智能采购建议 — 基于消耗速率自动计算采购量
- ✅ 库存盘点 — 扫码核对，生成盘盈盘亏报告
- ✅ 服务毛利分析 — 按服务类型/技师/时段分析
- ✅ 技师绩效看板 — 日均量/损耗率/评分/毛利
- ✅ 线材追溯 — 追踪每卷线材完整使用链路

## 配置说明

### 小程序配置
1. 修改 `env/.env.development` 中的 `VITE_WX_APPID` 为你的微信小程序AppID
2. 修改 `env/.env.development` 中的 `VITE_API_BASE_URL` 为后端API地址

### 后端配置
1. 修改 `src/main/resources/application.yml` 中的数据库配置
2. 修改 `src/main/resources/application.yml` 中的微信小程序配置

## 下一步开发计划

### 积分系统
1. 完善后端 Service 和 Controller 层
2. 实现微信登录功能
3. 完善商家端管理页面
4. 添加数据校验和异常处理
5. 实现 JWT token 认证
6. 添加单元测试
7. 前后端联调测试

### 线材耗材管理系统（下一阶段）
1. 库存管理 API（加权平均成本、低库存预警）
2. 财务报表 API（日消耗、供应商比较、损耗率、月度汇总）
3. 二维码管理 API（生成、打印、扫码、追溯）
4. 个性化推荐 API
5. 与会员/积分系统打通（缠线消费 → 扣库存 + 积分）
6. 小程序端线材展示

## 注意事项

- 本框架已完成基础搭建，包含完整的页面结构和 API 接口定义
- 后端实体类、Mapper 和数据库表结构已完成
- 需要完善 Service 层业务逻辑和 Controller 层接口实现
- 前端页面已创建，需要完善业务逻辑和数据绑定
- 建议先完成 P0 核心功能，再逐步添加 P1 和 P2 功能

## 相关文档

- **工程化结构**: [docs/00-工程化结构.md](docs/00-工程化结构.md)（前后端分层、命名规范、API 规范、开发顺序）
- **需求文档索引**: [docs/README.md](docs/README.md)（导航 + 快速定位）
- **会员积分系统**: [docs/02-会员积分系统.md](docs/02-会员积分系统.md)
- **线材耗材管理系统**: [docs/03-线材耗材管理系统.md](docs/03-线材耗材管理系统.md)
- **服务预约与追踪系统**: [docs/04-服务预约与追踪系统.md](docs/04-服务预约与追踪系统.md)
- **数据库设计**: [docs/05-数据库设计.md](docs/05-数据库设计.md)
- **UI 设计规范**: [docs/06-UI设计规范.md](docs/06-UI设计规范.md)
- **Skill 配置**: `.claude/skills/` 目录
