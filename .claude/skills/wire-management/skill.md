---
name: "wire-management-system"
description: "体育器材店线材（网球/羽毛球拍线）进销存与耗材管理系统。涵盖：线材字典、供应商管理、批次计价进货、日常消耗记录、报废记录、库存管理、财务统计分析。当用户提到线材、耗材、拍线、网线、羽毛球线、进货批次、消耗记录、报废、缠线成本 时激活本 skill。"
model: "claude-sonnet-4-5"
---

# 线材耗材管理系统 — 开发指导手册

## 一、业务背景

体育器材服务店铺的**线材（网球拍线 / 羽毛球拍线）**管理是核心业务痛点：

1. **批次计价** — 同一线材从不同供应商、不同时间进货，单价不同，必须按批次独立记录
2. **日常消耗** — 每日缠线服务消耗线材，需要记录用量
3. **报废消耗** — 缠线过程中断线、打结、人为损坏等产生的损耗
4. **库存管理** — 实时库存 = Σ进货 − Σ消耗 − Σ报废
5. **财务分析** — 成本核算、供应商价格比较、损耗率、利润分析

## 二、技术栈（与现有项目一致）

| 分层 | 技术 | 说明 |
|------|------|------|
| 数据库 | MySQL 8.0 + utf8mb4 | 新增 5 张表 |
| 后端 | Spring Boot 3.2 + MyBatis Plus | Entity/Mapper/Service/Controller |
| 前端管理后台 | React 19 + Ant Design Pro (Umi Max) | ProTable + ProForm |
| 代码规范 | Biome (lint) + TypeScript strict | 前端代码风格 |

## 三、数据库设计

### 3.1 表清单

| 表名 | 说明 | 核心字段 |
|------|------|----------|
| `tb_wire` | 线材字典 | brand, model, spec, color, type, min_stock |
| `tb_supplier` | 供应商 | name, contact, phone, payment_method |
| `tb_purchase` | 进货记录（批次计价） | wire_id, supplier_id, quantity, unit_price, batch_no |
| `tb_usage` | 正常消耗记录 | wire_id, usage_date, quantity, related_order |
| `tb_waste` | 报废消耗记录 | wire_id, waste_date, quantity, reason |

### 3.2 建表 SQL（完整版见 references/db-schema.sql）

关键约束：
- 所有表含 `deleted` 字段（软删除，0=正常 1=已删）
- 所有表含 `create_time` / `update_time`
- `tb_purchase` 的 `batch_no` 格式：`{品牌缩写}-{YYYYMMDD}-{序号}`，如 `YNK-20260612-001`
- `tb_waste.reason` 枚举：`break`(断裂) / `knot`(打结) / `human`(人为损坏) / `other`(其他)
- `tb_wire.type` 枚举：`tennis`(网球) / `badminton`(羽毛球)

### 3.3 库存计算

```sql
-- 某线材的实时库存
SELECT
    w.id,
    w.brand,
    w.model,
    COALESCE(SUM(p.quantity), 0)                          AS total_purchased,
    COALESCE((SELECT SUM(u.quantity) FROM tb_usage u WHERE u.wire_id = w.id AND u.deleted = 0), 0) AS total_used,
    COALESCE((SELECT SUM(w2.quantity) FROM tb_waste w2 WHERE w2.wire_id = w.id AND w2.deleted = 0), 0) AS total_wasted,
    COALESCE(SUM(p.quantity), 0)
      - COALESCE((SELECT SUM(u.quantity) FROM tb_usage u WHERE u.wire_id = w.id AND u.deleted = 0), 0)
      - COALESCE((SELECT SUM(w2.quantity) FROM tb_waste w2 WHERE w2.wire_id = w.id AND w2.deleted = 0), 0) AS current_stock
FROM tb_wire w
LEFT JOIN tb_purchase p ON p.wire_id = w.id AND p.deleted = 0
WHERE w.deleted = 0 AND w.id = ?
GROUP BY w.id;
```

### 3.4 加权平均成本（Weighted Average Cost）

```sql
-- 某线材的加权平均单价
SELECT
    wire_id,
    SUM(quantity * unit_price) / SUM(quantity) AS avg_cost
FROM tb_purchase
WHERE wire_id = ? AND deleted = 0
GROUP BY wire_id;
```

## 四、后端规范（Java Spring Boot）

### 4.1 Entity 规范

参照现有 `Member.java` 的写法：
- 使用 `@Data`（Lombok）+ `@TableName`
- `@TableId(type = IdType.AUTO)` 主键
- `@TableField(fill = FieldFill.INSERT)` 用于 `create_time`
- `@TableField(fill = FieldFill.INSERT_UPDATE)` 用于 `update_time`
- **不使用**逻辑删除注解 `@TableLogic`，直接用 `deleted` 字段 + 手动条件

```java
// 参考：sports_java/src/main/java/com/sports/entity/Member.java
@Data
@TableName("tb_wire")
public class Wire {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String brand;         // 品牌
    private String model;         // 型号
    private String spec;          // 规格（粗细 mm）
    private String color;         // 颜色
    private String type;          // tennis / badminton
    private Integer minStock;     // 最低库存预警线
    private Integer deleted;      // 0=正常 1=已删
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
```

### 4.2 Controller 规范

```
路径前缀：/api/wire, /api/supplier, /api/purchase, /api/usage, /api/waste, /api/inventory, /api/report
请求方式：RESTful
返回格式：Result<T>（参照现有 Result.java）
```

每个 Controller 的标准方法：
- `GET /list` — 分页列表（支持多条件筛选）
- `GET /{id}` — 详情
- `POST /` — 新增
- `PUT /{id}` — 更新
- `DELETE /{id}` — 软删除（设置 deleted=1）

### 4.3 Service 规范

- 接口 + 实现类分离（`XxxService` / `XxxServiceImpl`）
- 使用 `@Service` 注解
- 分页查询使用 MyBatis Plus `Page<T>`
- 软删除统一使用 `update().set("deleted", 1).eq("id", id).update()`

### 4.4 标准 API 清单

```
WireController
  GET    /api/wire/list          线材列表（分页，支持品牌/类型筛选）
  GET    /api/wire/{id}          线材详情
  POST   /api/wire               新增线材
  PUT    /api/wire/{id}          更新线材
  DELETE /api/wire/{id}          软删除线材

SupplierController
  GET    /api/supplier/list      供应商列表
  POST   /api/supplier           新增供应商
  PUT    /api/supplier/{id}      更新供应商

PurchaseController
  GET    /api/purchase/list       进货列表（支持日期/供应商/线材筛选）
  GET    /api/purchase/{id}       进货详情
  POST   /api/purchase            新增进货（自动生成批次号）

UsageController
  GET    /api/usage/list         消耗列表
  POST   /api/usage              新增消耗记录

WasteController
  GET    /api/waste/list         报废列表
  POST   /api/waste              新增报废记录

InventoryController
  GET    /api/inventory/list     库存列表（含加权平均成本）
  GET    /api/inventory/low-stock 低库存预警

ReportController
  GET    /api/report/daily       日消耗统计
  GET    /api/report/supplier    供应商价格比较
  GET    /api/report/wastage     损耗率统计
  GET    /api/report/monthly     月度汇总
```

## 五、前端规范（React + Ant Design Pro）

### 5.1 文件结构

```
sports_admin/src/
├── pages/Wire/                   # 线材管理
│   ├── index.tsx                 # 线材列表页
│   └── WireModal.tsx             # 新增/编辑弹窗
├── pages/Supplier/               # 供应商管理
│   └── index.tsx
├── pages/Purchase/               # 进货管理
│   ├── index.tsx
│   └── PurchaseModal.tsx
├── pages/Usage/                  # 消耗记录
│   └── index.tsx
├── pages/Waste/                  # 报废记录
│   └── index.tsx
├── pages/Inventory/              # 库存查询
│   └── index.tsx
└── pages/Report/                 # 财务报表
    └── index.tsx
```

### 5.2 页面模板规范

**严格参照现有代码风格**（以 `Member/index.tsx`、`Points/index.tsx`、`Exchange/index.tsx` 为模板）：

```tsx
// 标准列表页骨架
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Tag, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { getList, addItem, updateItem, deleteItem } from '@/services/wire';
import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<API.Wire | null>(null);

  const columns: ProColumns<API.Wire>[] = [
    // ... 列定义
    {
      title: '操作',
      valueType: 'option',
      width: 180,
      render: (_, record) => [
        <Button key="edit" type="link" size="small" icon={<EditOutlined />}
          onClick={() => handleEdit(record)}>编辑</Button>,
        <Button key="delete" type="link" size="small" danger icon={<DeleteOutlined />}
          onClick={() => handleDelete(record)}>删除</Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Wire>
        headerTitle="线材列表"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 80 }}
        toolBarRender={() => [
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增线材</Button>,
        ]}
        request={async (params) => {
          const res = await getList({
            current: params.current,
            pageSize: params.pageSize,
            ...params,
          });
          return { data: res.data?.data || [], success: true, total: res.data?.total || 0 };
        }}
        columns={columns}
        scroll={{ x: 1200 }}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
      />
      {/* Modal 表单 */}
    </PageContainer>
  );
};
```

### 5.3 Service 规范

**严格参照现有 `services/admin.ts`**：

```ts
// services/wire.ts
import { request } from '@umijs/max';
import { mockApi } from './wire-mock';

const ENABLE_MOCK = true;

// ========== 线材管理 ==========
export async function getWireList(params: API.PageParams & { keyword?: string; type?: string }) {
  if (ENABLE_MOCK) return mockApi.getWireList(params);
  return request<API.ResponseList<API.Wire>>('/api/wire/list', { method: 'GET', params });
}

export async function addWire(data: API.WireForm) {
  if (ENABLE_MOCK) return mockApi.addWire(data);
  return request('/api/wire', { method: 'POST', data });
}

// ... 其他方法
```

### 5.4 TypeScript 类型定义

**添加至 `services/ant-design-pro/typings.d.ts`** 的 `API` namespace 中：

```ts
// 线材
type Wire = {
  id?: number;
  brand?: string;        // 品牌
  model?: string;        // 型号
  spec?: string;         // 规格
  color?: string;        // 颜色
  type?: string;         // tennis / badminton
  minStock?: number;     // 最低库存预警线
  currentStock?: number; // 实时库存（后端计算）
  avgCost?: number;      // 加权平均成本
  createTime?: string;
  updateTime?: string;
};

type WireForm = {
  brand: string;
  model: string;
  spec?: string;
  color?: string;
  type: string;
  minStock?: number;
};

// 供应商
type Supplier = {
  id?: number;
  name?: string;
  contact?: string;
  phone?: string;
  paymentMethod?: string;
  remark?: string;
};

// 进货记录
type Purchase = {
  id?: number;
  wireId?: number;
  wireName?: string;     // 关联显示
  supplierId?: number;
  supplierName?: string; // 关联显示
  purchaseDate?: string;
  quantity?: number;
  unitPrice?: number;
  totalPrice?: number;
  paymentMethod?: string;
  batchNo?: string;
  remark?: string;
};

// 消耗记录
type Usage = {
  id?: number;
  wireId?: number;
  wireName?: string;
  usageDate?: string;
  quantity?: number;
  usageType?: string;
  relatedOrder?: string;
  operator?: string;
  remark?: string;
};

// 报废记录
type Waste = {
  id?: number;
  wireId?: number;
  wireName?: string;
  wasteDate?: string;
  quantity?: number;
  reason?: string;       // break / knot / human / other
  operator?: string;
  remark?: string;
};

// 库存
type InventoryItem = {
  wireId?: number;
  brand?: string;
  model?: string;
  totalPurchased?: number;
  totalUsed?: number;
  totalWasted?: number;
  currentStock?: number;
  avgCost?: number;
  isLowStock?: boolean;
};

// 报表
type DailyReport = {
  date?: string;
  wireId?: number;
  wireName?: string;
  usedQty?: number;
  wastedQty?: number;
  cost?: number;
};

type SupplierCompare = {
  wireId?: number;
  wireName?: string;
  supplierId?: number;
  supplierName?: string;
  avgPrice?: number;
  totalQty?: number;
  lastPurchaseDate?: string;
};

type WastageReport = {
  wireId?: number;
  wireName?: string;
  totalUsed?: number;
  totalWasted?: number;
  wastageRate?: number;  // 百分比
};

type MonthlySummary = {
  month?: string;
  totalPurchaseCost?: number;
  totalUsageCost?: number;
  totalWasteCost?: number;
  topUsedWires?: { name: string; qty: number }[];
  topWastedWires?: { name: string; qty: number }[];
};
```

### 5.5 路由配置

在 `config/routes.ts` 中添加：

```ts
{
  name: 'wire',
  icon: 'BuildOutlined',   // Ant Design 图标
  path: '/wire',
  component: './Wire',
},
{
  name: 'supplier',
  icon: 'TruckOutlined',
  path: '/supplier',
  component: './Supplier',
},
{
  name: 'purchase',
  icon: 'ShoppingCartOutlined',
  path: '/purchase',
  component: './Purchase',
},
{
  name: 'usage',
  icon: 'ScissorOutlined',
  path: '/usage',
  component: './Usage',
},
{
  name: 'waste',
  icon: 'WarningOutlined',
  path: '/waste',
  component: './Waste',
},
{
  name: 'inventory',
  icon: 'AppstoreOutlined',
  path: '/inventory',
  component: './Inventory',
},
{
  name: 'report',
  icon: 'BarChartOutlined',
  path: '/report',
  component: './Report',
},
```

### 5.6 国际化菜单

在 `locales/zh-CN/menu.ts` 中添加：

```ts
'menu.wire': '线材管理',
'menu.supplier': '供应商管理',
'menu.purchase': '进货管理',
'menu.usage': '消耗记录',
'menu.waste': '报废记录',
'menu.inventory': '库存查询',
'menu.report': '财务报表',
```

### 5.7 Mock 数据

**严格参照 `services/mock.ts`** 的模式：
- 定义 `const mockXxx: API.Xxx[]` 数组
- 导出 `mockApi` 对象，方法返回 `Promise.resolve(...)`
- 列表方法支持分页切片：`list.slice(start, end)`

## 六、命名规范

### 6.1 数据库命名
- 表名：`tb_` 前缀 + 英文小写单数名词（`tb_wire`, `tb_supplier`, `tb_purchase`）
- 字段：snake_case（`create_time`, `update_time`, `deleted`）
- 注释：必须有 COMMENT

### 6.2 Java 命名
- 类名：PascalCase（`Wire`, `WireController`, `WireService`, `WireServiceImpl`）
- 方法/变量：camelCase（`getWireList`, `wireId`）
- 常量：UPPER_SNAKE_CASE

### 6.3 前端命名
- 文件名：PascalCase 组件（`WireModal.tsx`）+ kebab-case 页面目录（`Wire/index.tsx`）
- 变量/函数：camelCase
- 类型：PascalCase（`API.Wire`, `API.Purchase`）

### 6.4 API 路径
- 全部小写：`/api/wire/list`, `/api/purchase/list`
- 使用名词复数：`/api/wires` → **统一使用** `/api/wire/list`（与现有项目风格一致）

## 七、开发顺序建议

| 阶段 | 内容 | 产岀 |
|------|------|------|
| **P0 数据层** | 创建 5 张表 + Entity + Mapper | 数据库 + 基础 CRUD |
| **P0 后端 API** | Wire + Supplier + Purchase + Usage + Waste 的 Controller/Service | 基础 CRUD API |
| **P0 前端页面** | 线材列表 + 供应商列表 + 进货列表 + 消耗录入 + 报废录入 | 管理后台可用 |
| **P1 库存** | 库存查询 + 加权平均成本 + 低库存预警 | 实时库存可见 |
| **P1 报表** | 日消耗统计 + 供应商比较 + 损耗率 + 月度汇总 | 财务分析可用 |
| **P2 集成** | 与会员/积分系统打通（缠线消费 → 积分 + 扣库存） | 完整业务闭环 |

## 八、禁止事项

1. **禁止** 在数据库字段名中使用大写字母或连字符
2. **禁止** 在前端直接使用 `@umijs/max` 之外的请求库
3. **禁止** 跳过 Mock 数据层直接调真实 API
4. **禁止** 使用 `any` 类型（用 `API.Xxx` 或 `Record<string, unknown>`）
5. **禁止** 在 Service 层混用真实请求和 Mock（通过 `ENABLE_MOCK` flag 统一切换）

## 九、参考文件

| 文件 | 用途 |
|------|------|
| `sports_java/src/main/java/com/sports/entity/Member.java` | Entity 写法参考 |
| `sports_java/src/main/java/com/sports/common/Result.java` | 统一返回格式 |
| `sports_java/src/main/resources/db/init.sql` | 数据库建表参考 |
| `sports_admin/src/pages/Member/index.tsx` | 列表页写法参考 |
| `sports_admin/src/pages/Exchange/index.tsx` | 弹窗+表单写法参考 |
| `sports_admin/src/pages/Points/index.tsx` | Modal+操作写法参考 |
| `sports_admin/src/services/admin.ts` | Service 层写法参考 |
| `sports_admin/src/services/mock.ts` | Mock 数据写法参考 |
| `sports_admin/src/services/ant-design-pro/typings.d.ts` | 类型定义参考 |
| `sports_admin/config/routes.ts` | 路由配置参考 |
| `sports_admin/src/locales/zh-CN/menu.ts` | 菜单国际化参考 |
