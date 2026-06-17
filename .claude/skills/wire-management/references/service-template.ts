// services/wire.ts — 线材管理 Service 模板
// 严格参照 services/admin.ts 的写法

import { request } from '@umijs/max';
import { mockApi } from './wire-mock';

const ENABLE_MOCK = true;

// ========== 线材管理 ==========

export async function getWireList(params: {
  current?: number;
  pageSize?: number;
  keyword?: string;
  type?: string;
}) {
  if (ENABLE_MOCK) return mockApi.getWireList(params);
  return request<API.ResponseList<API.Wire>>('/api/wire/list', {
    method: 'GET',
    params,
  });
}

export async function getWireDetail(id: number) {
  if (ENABLE_MOCK) return mockApi.getWireDetail(id);
  return request<API.Wire>(`/api/wire/${id}`, {
    method: 'GET',
  });
}

export async function addWire(data: API.WireForm) {
  if (ENABLE_MOCK) return mockApi.addWire(data);
  return request('/api/wire', {
    method: 'POST',
    data,
  });
}

export async function updateWire(id: number, data: Partial<API.WireForm>) {
  if (ENABLE_MOCK) return mockApi.updateWire(id, data);
  return request(`/api/wire/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function deleteWire(id: number) {
  if (ENABLE_MOCK) return mockApi.deleteWire(id);
  return request(`/api/wire/${id}`, {
    method: 'DELETE',
  });
}

// ========== 供应商管理 ==========

export async function getSupplierList(params: {
  current?: number;
  pageSize?: number;
  keyword?: string;
}) {
  if (ENABLE_MOCK) return mockApi.getSupplierList(params);
  return request<API.ResponseList<API.Supplier>>('/api/supplier/list', {
    method: 'GET',
    params,
  });
}

export async function addSupplier(data: API.SupplierForm) {
  if (ENABLE_MOCK) return mockApi.addSupplier(data);
  return request('/api/supplier', {
    method: 'POST',
    data,
  });
}

export async function updateSupplier(id: number, data: Partial<API.SupplierForm>) {
  if (ENABLE_MOCK) return mockApi.updateSupplier(id, data);
  return request(`/api/supplier/${id}`, {
    method: 'PUT',
    data,
  });
}

// ========== 进货管理 ==========

export async function getPurchaseList(params: {
  current?: number;
  pageSize?: number;
  wireId?: number;
  supplierId?: number;
  startDate?: string;
  endDate?: string;
}) {
  if (ENABLE_MOCK) return mockApi.getPurchaseList(params);
  return request<API.ResponseList<API.Purchase>>('/api/purchase/list', {
    method: 'GET',
    params,
  });
}

export async function addPurchase(data: API.PurchaseForm) {
  if (ENABLE_MOCK) return mockApi.addPurchase(data);
  return request('/api/purchase', {
    method: 'POST',
    data,
  });
}

// ========== 消耗记录 ==========

export async function getUsageList(params: {
  current?: number;
  pageSize?: number;
  wireId?: number;
  startDate?: string;
  endDate?: string;
}) {
  if (ENABLE_MOCK) return mockApi.getUsageList(params);
  return request<API.ResponseList<API.Usage>>('/api/usage/list', {
    method: 'GET',
    params,
  });
}

export async function addUsage(data: API.UsageForm) {
  if (ENABLE_MOCK) return mockApi.addUsage(data);
  return request('/api/usage', {
    method: 'POST',
    data,
  });
}

// ========== 报废记录 ==========

export async function getWasteList(params: {
  current?: number;
  pageSize?: number;
  wireId?: number;
  startDate?: string;
  endDate?: string;
  reason?: string;
}) {
  if (ENABLE_MOCK) return mockApi.getWasteList(params);
  return request<API.ResponseList<API.Waste>>('/api/waste/list', {
    method: 'GET',
    params,
  });
}

export async function addWaste(data: API.WasteForm) {
  if (ENABLE_MOCK) return mockApi.addWaste(data);
  return request('/api/waste', {
    method: 'POST',
    data,
  });
}

// ========== 库存查询 ==========

export async function getInventoryList(params: {
  current?: number;
  pageSize?: number;
  keyword?: string;
  type?: string;
}) {
  if (ENABLE_MOCK) return mockApi.getInventoryList(params);
  return request<API.ResponseList<API.InventoryItem>>('/api/inventory/list', {
    method: 'GET',
    params,
  });
}

export async function getLowStockItems() {
  if (ENABLE_MOCK) return mockApi.getLowStockItems();
  return request<API.InventoryItem[]>('/api/inventory/low-stock', {
    method: 'GET',
  });
}

// ========== 财务报表 ==========

export async function getDailyReport(date?: string) {
  if (ENABLE_MOCK) return mockApi.getDailyReport(date);
  return request<API.DailyReport[]>('/api/report/daily', {
    method: 'GET',
    params: { date },
  });
}

export async function getSupplierCompare(wireId?: number) {
  if (ENABLE_MOCK) return mockApi.getSupplierCompare(wireId);
  return request<API.SupplierCompare[]>('/api/report/supplier', {
    method: 'GET',
    params: { wireId },
  });
}

export async function getWastageReport(startDate: string, endDate: string) {
  if (ENABLE_MOCK) return mockApi.getWastageReport(startDate, endDate);
  return request<API.WastageReport[]>('/api/report/wastage', {
    method: 'GET',
    params: { startDate, endDate },
  });
}

export async function getMonthlySummary(month: string) {
  if (ENABLE_MOCK) return mockApi.getMonthlySummary(month);
  return request<API.MonthlySummary>('/api/report/monthly', {
    method: 'GET',
    params: { month },
  });
}
