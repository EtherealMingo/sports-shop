# 线材管理系统 — API 接口规范

## 通用约定

- 基础路径：`/api`
- 统一返回格式：`Result<T>`（`{ code: 200, message: "操作成功", data: T }`）
- 分页参数：`current`（页码，从 1 开始）、`pageSize`（每页条数，默认 10）
- 分页返回：`{ data: T[], total: number, success: boolean }`
- 软删除：`DELETE /{id}` 实际执行 `UPDATE SET deleted=1`

---

## 1. WireController — 线材管理

### GET /api/wire/list
**请求参数：**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| current | int | 否 | 页码，默认 1 |
| pageSize | int | 否 | 每页条数，默认 10 |
| keyword | string | 否 | 搜索关键词（匹配 brand + model） |
| type | string | 否 | 筛选类型 tennis/badminton |

**响应：** `Result<{ data: Wire[], total: number }>`

### GET /api/wire/{id}
**响应：** `Result<Wire>`

### POST /api/wire
**请求体：** `{ brand, model, spec?, color?, type, minStock? }`
**响应：** `Result<Wire>`

### PUT /api/wire/{id}
**请求体：** `{ brand?, model?, spec?, color?, type?, minStock? }`
**响应：** `Result<Wire>`

### DELETE /api/wire/{id}
**响应：** `Result<void>`

---

## 2. SupplierController — 供应商管理

### GET /api/supplier/list
**请求参数：** `current`, `pageSize`, `keyword`
**响应：** `Result<{ data: Supplier[], total: number }>`

### POST /api/supplier
**请求体：** `{ name, contact?, phone?, paymentMethod?, remark? }`
**响应：** `Result<Supplier>`

### PUT /api/supplier/{id}
**响应：** `Result<Supplier>`

---

## 3. PurchaseController — 进货管理

### GET /api/purchase/list
**请求参数：**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| current | int | 否 | 页码 |
| pageSize | int | 否 | 每页条数 |
| wireId | long | 否 | 按线材筛选 |
| supplierId | long | 否 | 按供应商筛选 |
| startDate | string | 否 | 起始日期 |
| endDate | string | 否 | 截止日期 |

**响应：** `Result<{ data: Purchase[], total: number }>`

### POST /api/purchase
**请求体：** `{ wireId, supplierId, purchaseDate, quantity, unitPrice, paymentMethod?, remark? }`
**说明：** `totalPrice` 由后端计算（quantity × unitPrice），`batchNo` 由后端自动生成
**响应：** `Result<Purchase>`

### GET /api/purchase/{id}
**响应：** `Result<Purchase>`

---

## 4. UsageController — 消耗记录

### GET /api/usage/list
**请求参数：** `current`, `pageSize`, `wireId`, `startDate`, `endDate`
**响应：** `Result<{ data: Usage[], total: number }>`

### POST /api/usage
**请求体：** `{ wireId, usageDate, quantity, usageType?, relatedOrder?, operator?, remark? }`
**响应：** `Result<Usage>`

---

## 5. WasteController — 报废记录

### GET /api/waste/list
**请求参数：** `current`, `pageSize`, `wireId`, `startDate`, `endDate`, `reason`
**响应：** `Result<{ data: Waste[], total: number }>`

### POST /api/waste
**请求体：** `{ wireId, wasteDate, quantity, reason, operator?, remark? }`
**响应：** `Result<Waste>`

---

## 6. InventoryController — 库存查询

### GET /api/inventory/list
**请求参数：** `current`, `pageSize`, `keyword`, `type`
**响应：** `Result<{ data: InventoryItem[], total: number }>`

### GET /api/inventory/low-stock
**响应：** `Result<InventoryItem[]>`（所有 currentStock ≤ minStock 的线材）

---

## 7. ReportController — 财务报表

### GET /api/report/daily
**请求参数：** `date`（日期，默认今天）
**响应：** `Result<DailyReport[]>`

### GET /api/report/supplier
**请求参数：** `wireId`（可选，不传则返回所有线材的供应商比较）
**响应：** `Result<SupplierCompare[]>`

### GET /api/report/wastage
**请求参数：** `startDate`, `endDate`
**响应：** `Result<WastageReport[]>`

### GET /api/report/monthly
**请求参数：** `month`（格式 YYYY-MM，默认当月）
**响应：** `Result<MonthlySummary>`
