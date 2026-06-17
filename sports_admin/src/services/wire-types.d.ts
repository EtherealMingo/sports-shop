// @ai-generated - 全部由 AI 輔助生成

declare namespace API {
  // ===== 线材 =====
  type Wire = {
    id?: number;
    brand?: string;
    model?: string;
    spec?: string;
    color?: string;
    type?: string;
    minStock?: number;
    currentStock?: number;
    avgCost?: number;
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

  // ===== 供应商 =====
  type Supplier = {
    id?: number;
    name?: string;
    contact?: string;
    phone?: string;
    paymentMethod?: string;
    remark?: string;
    createTime?: string;
  };

  type SupplierForm = {
    name: string;
    contact?: string;
    phone?: string;
    paymentMethod?: string;
    remark?: string;
  };

  // ===== 进货记录 =====
  type Purchase = {
    id?: number;
    wireId?: number;
    wireName?: string;
    supplierId?: number;
    supplierName?: string;
    purchaseDate?: string;
    quantity?: number;
    unitPrice?: number;
    totalPrice?: number;
    paymentMethod?: string;
    batchNo?: string;
    remark?: string;
    createTime?: string;
  };

  type PurchaseForm = {
    wireId: number;
    supplierId: number;
    purchaseDate: string;
    quantity: number;
    unitPrice: number;
    paymentMethod?: string;
    remark?: string;
  };

  // ===== 消耗记录 =====
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
    createTime?: string;
  };

  type UsageForm = {
    wireId: number;
    usageDate: string;
    quantity: number;
    usageType?: string;
    relatedOrder?: string;
    operator?: string;
    remark?: string;
  };

  // ===== 报废记录 =====
  type Waste = {
    id?: number;
    wireId?: number;
    wireName?: string;
    wasteDate?: string;
    quantity?: number;
    reason?: string;
    reasonLabel?: string;
    operator?: string;
    remark?: string;
    createTime?: string;
  };

  type WasteForm = {
    wireId: number;
    wasteDate: string;
    quantity: number;
    reason: string;
    operator?: string;
    remark?: string;
  };

  // ===== 库存 =====
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

  // ===== 报表 =====
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
    wastageRate?: number;
  };

  type MonthlySummary = {
    month?: string;
    totalPurchaseCost?: number;
    totalUsageCost?: number;
    totalWasteCost?: number;
    topUsedWires?: { name: string; qty: number }[];
    topWastedWires?: { name: string; qty: number }[];
  };
}
