// @ai-generated - 全部由 AI 輔助生成
import { request } from '@umijs/max';

// 是否启用 Mock 数据
const ENABLE_MOCK = true;

// ========== Mock 数据 ==========

const mockWires = [
  { id: 1, brand: 'Yonex', model: 'BG-80', spec: '0.68mm', color: '白色', type: 'badminton', minStock: 5, currentStock: 28, avgCost: 15.43, createTime: '2026-06-01T00:00:00' },
  { id: 2, brand: 'Yonex', model: 'BG-65', spec: '0.70mm', color: '蓝色', type: 'badminton', minStock: 5, currentStock: 9, avgCost: 12.00, createTime: '2026-06-01T00:00:00' },
  { id: 3, brand: '李宁', model: 'N90-III', spec: '0.65mm', color: '黄色', type: 'badminton', minStock: 3, currentStock: 6, avgCost: 18.00, createTime: '2026-06-01T00:00:00' },
  { id: 4, brand: 'Wilson', model: 'Sensation', spec: '1.25mm', color: '黑色', type: 'tennis', minStock: 3, currentStock: 4, avgCost: 22.00, createTime: '2026-06-01T00:00:00' },
  { id: 5, brand: 'Luxilon', model: 'ALU Power', spec: '1.25mm', color: '银色', type: 'tennis', minStock: 3, currentStock: 2, avgCost: 35.00, createTime: '2026-06-01T00:00:00' },
  { id: 6, brand: '尤尼克斯', model: 'AB', spec: '0.61mm', color: '红色', type: 'badminton', minStock: 4, currentStock: 4, avgCost: 25.00, createTime: '2026-06-01T00:00:00' },
];

const mockSuppliers = [
  { id: 1, name: '上海羽毛球用品批发', contact: '张经理', phone: '138-0000-1111', paymentMethod: 'transfer', rating: 4.5, createTime: '2024-01-01T00:00:00' },
  { id: 2, name: '北京体育器材中心', contact: '李总', phone: '139-0000-2222', paymentMethod: 'monthly', rating: 4.2, createTime: '2024-01-01T00:00:00' },
  { id: 3, name: '广州网球用品专卖', contact: '王老板', phone: '136-0000-3333', paymentMethod: 'cash', rating: 4.8, createTime: '2024-01-01T00:00:00' },
];

const mockPurchases = [
  { id: 1, wireId: 1, wireName: 'Yonex BG-80', supplierId: 1, supplierName: '上海羽毛球用品批发', purchaseDate: '2026-06-01', quantity: 20, unitPrice: 15.00, totalPrice: 300.00, paymentMethod: 'transfer', batchNo: 'YNX-20260601-001' },
  { id: 2, wireId: 1, wireName: 'Yonex BG-80', supplierId: 1, supplierName: '上海羽毛球用品批发', purchaseDate: '2026-06-10', quantity: 15, unitPrice: 16.00, totalPrice: 240.00, paymentMethod: 'transfer', batchNo: 'YNX-20260610-001' },
  { id: 3, wireId: 2, wireName: 'Yonex BG-65', supplierId: 1, supplierName: '上海羽毛球用品批发', purchaseDate: '2026-06-05', quantity: 10, unitPrice: 12.00, totalPrice: 120.00, paymentMethod: 'transfer', batchNo: 'YNX-20260605-001' },
  { id: 4, wireId: 3, wireName: '李宁 N90-III', supplierId: 2, supplierName: '北京体育器材中心', purchaseDate: '2026-06-08', quantity: 8, unitPrice: 18.00, totalPrice: 144.00, paymentMethod: 'monthly', batchNo: 'LN-20260608-001' },
  { id: 5, wireId: 4, wireName: 'Wilson Sensation', supplierId: 3, supplierName: '广州网球用品专卖', purchaseDate: '2026-06-03', quantity: 5, unitPrice: 22.00, totalPrice: 110.00, paymentMethod: 'cash', batchNo: 'WL-20260603-001' },
];

const mockUsages = [
  { id: 1, wireId: 1, wireName: 'Yonex BG-80', usageDate: '2026-06-10', quantity: 2, relatedOrder: 'ORD-20260610-001', operator: '张师傅' },
  { id: 2, wireId: 1, wireName: 'Yonex BG-80', usageDate: '2026-06-11', quantity: 3, relatedOrder: 'ORD-20260611-001', operator: '王师傅' },
  { id: 3, wireId: 2, wireName: 'Yonex BG-65', usageDate: '2026-06-11', quantity: 1, relatedOrder: 'ORD-20260611-002', operator: '张师傅' },
  { id: 4, wireId: 3, wireName: '李宁 N90-III', usageDate: '2026-06-12', quantity: 2, relatedOrder: 'ORD-20260612-001', operator: '王师傅' },
];

const mockWastes = [
  { id: 1, wireId: 1, wireName: 'Yonex BG-80', wasteDate: '2026-06-10', quantity: 1, reason: 'knot', reasonLabel: '打结', operator: '张师傅', remark: '穿线时打结' },
  { id: 2, wireId: 1, wireName: 'Yonex BG-80', wasteDate: '2026-06-11', quantity: 1, reason: 'break', reasonLabel: '断裂', operator: '王师傅', remark: '拉线时断裂' },
  { id: 3, wireId: 3, wireName: '李宁 N90-III', wasteDate: '2026-06-12', quantity: 1, reason: 'human', reasonLabel: '人为损坏', operator: '王师傅', remark: '剪线失误' },
];

const mockInventory = [
  { wireId: 1, brand: 'Yonex', model: 'BG-80', totalPurchased: 35, totalUsed: 5, totalWasted: 2, currentStock: 28, avgCost: 15.43, isLowStock: false },
  { wireId: 2, brand: 'Yonex', model: 'BG-65', totalPurchased: 10, totalUsed: 1, totalWasted: 0, currentStock: 9, avgCost: 12.00, isLowStock: false },
  { wireId: 3, brand: '李宁', model: 'N90-III', totalPurchased: 8, totalUsed: 2, totalWasted: 1, currentStock: 5, avgCost: 18.00, isLowStock: false },
  { wireId: 4, brand: 'Wilson', model: 'Sensation', totalPurchased: 5, totalUsed: 1, totalWasted: 0, currentStock: 4, avgCost: 22.00, isLowStock: true },
  { wireId: 5, brand: 'Luxilon', model: 'ALU Power', totalPurchased: 3, totalUsed: 1, totalWasted: 0, currentStock: 2, avgCost: 35.00, isLowStock: true },
];

// ========== API 函数 ==========

// 线材管理
export async function getWireList(params: { current?: number; pageSize?: number; keyword?: string; type?: string }) {
  if (ENABLE_MOCK) {
    let list = [...mockWires];
    if (params.keyword) {
      list = list.filter(w => w.brand.includes(params.keyword) || w.model.includes(params.keyword));
    }
    if (params.type) {
      list = list.filter(w => w.type === params.type);
    }
    const start = ((params.current || 1) - 1) * (params.pageSize || 10);
    const end = start + (params.pageSize || 10);
    return { data: list.slice(start, end), success: true, total: list.length };
  }
  return request<API.ResponseList<API.Wire>>('/api/wire/list', { method: 'GET', params });
}

export async function addWire(data: any) {
  if (ENABLE_MOCK) {
    mockWires.push({ ...data, id: Date.now(), currentStock: 0, avgCost: 0, createTime: new Date().toISOString() });
    return { success: true };
  }
  return request('/api/wire', { method: 'POST', data });
}

export async function updateWire(id: number, data: any) {
  if (ENABLE_MOCK) {
    const index = mockWires.findIndex(w => w.id === id);
    if (index > -1) Object.assign(mockWires[index], data);
    return { success: true };
  }
  return request(`/api/wire/${id}`, { method: 'PUT', data });
}

export async function deleteWire(id: number) {
  if (ENABLE_MOCK) {
    const index = mockWires.findIndex(w => w.id === id);
    if (index > -1) mockWires.splice(index, 1);
    return { success: true };
  }
  return request(`/api/wire/${id}`, { method: 'DELETE' });
}

// 供应商管理
export async function getSupplierList(params: { current?: number; pageSize?: number; keyword?: string }) {
  if (ENABLE_MOCK) {
    let list = [...mockSuppliers];
    if (params.keyword) {
      list = list.filter(s => s.name.includes(params.keyword));
    }
    const start = ((params.current || 1) - 1) * (params.pageSize || 10);
    const end = start + (params.pageSize || 10);
    return { data: list.slice(start, end), success: true, total: list.length };
  }
  return request<API.ResponseList<API.Supplier>>('/api/supplier/list', { method: 'GET', params });
}

export async function addSupplier(data: any) {
  if (ENABLE_MOCK) {
    mockSuppliers.push({ ...data, id: Date.now(), rating: 0, createTime: new Date().toISOString() });
    return { success: true };
  }
  return request('/api/supplier', { method: 'POST', data });
}

export async function updateSupplier(id: number, data: any) {
  if (ENABLE_MOCK) {
    const index = mockSuppliers.findIndex(s => s.id === id);
    if (index > -1) Object.assign(mockSuppliers[index], data);
    return { success: true };
  }
  return request(`/api/supplier/${id}`, { method: 'PUT', data });
}

// 进货管理
export async function getPurchaseList(params: { current?: number; pageSize?: number; wireId?: number; supplierId?: number }) {
  if (ENABLE_MOCK) {
    let list = [...mockPurchases];
    if (params.wireId) list = list.filter(p => p.wireId === params.wireId);
    if (params.supplierId) list = list.filter(p => p.supplierId === params.supplierId);
    const start = ((params.current || 1) - 1) * (params.pageSize || 10);
    const end = start + (params.pageSize || 10);
    return { data: list.slice(start, end), success: true, total: list.length };
  }
  return request<API.ResponseList<API.Purchase>>('/api/purchase/list', { method: 'GET', params });
}

export async function addPurchase(data: any) {
  if (ENABLE_MOCK) {
    const wire = mockWires.find(w => w.id === data.wireId);
    const supplier = mockSuppliers.find(s => s.id === data.supplierId);
    mockPurchases.push({
      ...data,
      id: Date.now(),
      wireName: wire ? `${wire.brand} ${wire.model}` : '',
      supplierName: supplier?.name || '',
      totalPrice: (data.unitPrice || 0) * (data.quantity || 0),
      batchNo: `${(wire?.brand || 'UNK').substring(0, 3).toUpperCase()}-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(mockPurchases.length + 1).padStart(3, '0')}`,
    });
    return { success: true };
  }
  return request('/api/purchase', { method: 'POST', data });
}

// 消耗记录
export async function getUsageList(params: { current?: number; pageSize?: number; wireId?: number }) {
  if (ENABLE_MOCK) {
    let list = [...mockUsages];
    if (params.wireId) list = list.filter(u => u.wireId === params.wireId);
    const start = ((params.current || 1) - 1) * (params.pageSize || 10);
    const end = start + (params.pageSize || 10);
    return { data: list.slice(start, end), success: true, total: list.length };
  }
  return request<API.ResponseList<API.Usage>>('/api/usage/list', { method: 'GET', params });
}

export async function addUsage(data: any) {
  if (ENABLE_MOCK) {
    const wire = mockWires.find(w => w.id === data.wireId);
    mockUsages.push({
      ...data,
      id: Date.now(),
      wireName: wire ? `${wire.brand} ${wire.model}` : '',
    });
    return { success: true };
  }
  return request('/api/usage', { method: 'POST', data });
}

// 报废记录
export async function getWasteList(params: { current?: number; pageSize?: number; wireId?: number }) {
  if (ENABLE_MOCK) {
    let list = [...mockWastes];
    if (params.wireId) list = list.filter(w => w.wireId === params.wireId);
    const start = ((params.current || 1) - 1) * (params.pageSize || 10);
    const end = start + (params.pageSize || 10);
    return { data: list.slice(start, end), success: true, total: list.length };
  }
  return request<API.ResponseList<API.Waste>>('/api/waste/list', { method: 'GET', params });
}

export async function addWaste(data: any) {
  if (ENABLE_MOCK) {
    const wire = mockWires.find(w => w.id === data.wireId);
    mockWastes.push({
      ...data,
      id: Date.now(),
      wireName: wire ? `${wire.brand} ${wire.model}` : '',
      reasonLabel: data.reason === 'knot' ? '打结' : data.reason === 'break' ? '断裂' : data.reason === 'human' ? '人为损坏' : '其他',
    });
    return { success: true };
  }
  return request('/api/waste', { method: 'POST', data });
}

// 库存查询
export async function getInventoryList() {
  if (ENABLE_MOCK) {
    return { data: mockInventory, success: true, total: mockInventory.length };
  }
  return request<API.InventoryItem[]>('/api/inventory/list', { method: 'GET' });
}

export async function getLowStockItems() {
  if (ENABLE_MOCK) {
    return { data: mockInventory.filter(i => i.isLowStock), success: true, total: mockInventory.filter(i => i.isLowStock).length };
  }
  return request<API.InventoryItem[]>('/api/inventory/low-stock', { method: 'GET' });
}

// 财务报表
export async function getDailyReport() {
  if (ENABLE_MOCK) {
    return { data: [
      { date: '2026-06-10', wireName: 'Yonex BG-80', usedQty: 2, wastedQty: 1, cost: 45 },
      { date: '2026-06-11', wireName: 'Yonex BG-80', usedQty: 3, wastedQty: 1, cost: 60 },
      { date: '2026-06-12', wireName: '李宁 N90-III', usedQty: 2, wastedQty: 1, cost: 54 },
    ], success: true };
  }
  return request('/api/report/daily', { method: 'GET' });
}

export async function getSupplierCompare() {
  if (ENABLE_MOCK) {
    return { data: [
      { wireName: 'Yonex BG-80', supplierName: '上海羽毛球用品批发', avgPrice: 15.5, totalQty: 35, lastPurchaseDate: '2026-06-10' },
      { wireName: 'Yonex BG-65', supplierName: '上海羽毛球用品批发', avgPrice: 12.0, totalQty: 10, lastPurchaseDate: '2026-06-05' },
      { wireName: 'Wilson Sensation', supplierName: '广州网球用品专卖', avgPrice: 22.0, totalQty: 5, lastPurchaseDate: '2026-06-03' },
    ], success: true };
  }
  return request('/api/report/supplier', { method: 'GET' });
}

export async function getWastageReport() {
  if (ENABLE_MOCK) {
    return { data: [
      { wireName: 'Yonex BG-80', totalUsed: 5, totalWasted: 2, wastageRate: 40.0 },
      { wireName: '李宁 N90-III', totalUsed: 2, totalWasted: 1, wastageRate: 50.0 },
    ], success: true };
  }
  return request('/api/report/wastage', { method: 'GET' });
}

export async function getMonthlySummary() {
  if (ENABLE_MOCK) {
    return { data: {
      month: '2026-06',
      totalPurchaseCost: 914.00,
      totalUsageCost: 159.00,
      totalWasteCost: 69.00,
      topUsedWires: [{ name: 'Yonex BG-80', qty: 5 }, { name: '李宁 N90-III', qty: 2 }],
      topWastedWires: [{ name: 'Yonex BG-80', qty: 2 }, { name: '李宁 N90-III', qty: 1 }],
    }, success: true };
  }
  return request('/api/report/monthly', { method: 'GET' });
}
