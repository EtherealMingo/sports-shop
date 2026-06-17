// services/wire-mock.ts — 线材管理 Mock 数据模板
// 严格参照 services/mock.ts 的写法

// ========== Mock 数据 ==========

const mockWires: API.Wire[] = [
  { id: 1, brand: 'Yonex', model: 'BG-80', spec: '0.68mm', color: '白色', type: 'badminton', minStock: 5, currentStock: 28, avgCost: 15.43, createTime: '2026-06-01T00:00:00' },
  { id: 2, brand: 'Yonex', model: 'BG-65', spec: '0.70mm', color: '蓝色', type: 'badminton', minStock: 5, currentStock: 9, avgCost: 12.00, createTime: '2026-06-01T00:00:00' },
  { id: 3, brand: '李宁', model: 'N90-III', spec: '0.65mm', color: '黄色', type: 'badminton', minStock: 3, currentStock: 6, avgCost: 18.00, createTime: '2026-06-01T00:00:00' },
  { id: 4, brand: 'Wilson', model: 'Sensation', spec: '1.25mm', color: '黑色', type: 'tennis', minStock: 3, currentStock: 4, avgCost: 22.00, createTime: '2026-06-01T00:00:00' },
  { id: 5, brand: 'Luxilon', model: 'ALU Power', spec: '1.25mm', color: '银色', type: 'tennis', minStock: 3, currentStock: 2, avgCost: 35.00, createTime: '2026-06-01T00:00:00' },
  { id: 6, brand: '尤尼克斯', model: 'AB', spec: '0.61mm', color: '红色', type: 'badminton', minStock: 4, currentStock: 4, avgCost: 25.00, createTime: '2026-06-01T00:00:00' },
];

const mockSuppliers: API.Supplier[] = [
  { id: 1, name: '上海羽毛球用品批发', contact: '张经理', phone: '138-0000-1111', paymentMethod: 'transfer', remark: 'Yonex 总代理' },
  { id: 2, name: '北京体育器材中心', contact: '李总', phone: '139-0000-2222', paymentMethod: 'monthly', remark: '月结，量大优惠' },
  { id: 3, name: '广州网球用品专卖', contact: '王老板', phone: '136-0000-3333', paymentMethod: 'cash', remark: '现场现货' },
];

const mockPurchases: API.Purchase[] = [
  { id: 1, wireId: 1, wireName: 'Yonex BG-80', supplierId: 1, supplierName: '上海羽毛球用品批发', purchaseDate: '2026-06-01', quantity: 20, unitPrice: 15.00, totalPrice: 300.00, paymentMethod: 'transfer', batchNo: 'YNX-20260601-001' },
  { id: 2, wireId: 1, wireName: 'Yonex BG-80', supplierId: 1, supplierName: '上海羽毛球用品批发', purchaseDate: '2026-06-10', quantity: 15, unitPrice: 16.00, totalPrice: 240.00, paymentMethod: 'transfer', batchNo: 'YNX-20260610-001' },
  { id: 3, wireId: 2, wireName: 'Yonex BG-65', supplierId: 1, supplierName: '上海羽毛球用品批发', purchaseDate: '2026-06-05', quantity: 10, unitPrice: 12.00, totalPrice: 120.00, paymentMethod: 'transfer', batchNo: 'YNX-20260605-001' },
  { id: 4, wireId: 3, wireName: '李宁 N90-III', supplierId: 2, supplierName: '北京体育器材中心', purchaseDate: '2026-06-08', quantity: 8, unitPrice: 18.00, totalPrice: 144.00, paymentMethod: 'monthly', batchNo: 'LN-20260608-001' },
  { id: 5, wireId: 4, wireName: 'Wilson Sensation', supplierId: 3, supplierName: '广州网球用品专卖', purchaseDate: '2026-06-03', quantity: 5, unitPrice: 22.00, totalPrice: 110.00, paymentMethod: 'cash', batchNo: 'WL-20260603-001' },
];

const mockUsages: API.Usage[] = [
  { id: 1, wireId: 1, wireName: 'Yonex BG-80', usageDate: '2026-06-10', quantity: 2, relatedOrder: 'ORD-20260610-001', operator: '张师傅' },
  { id: 2, wireId: 1, wireName: 'Yonex BG-80', usageDate: '2026-06-11', quantity: 3, relatedOrder: 'ORD-20260611-001', operator: '王师傅' },
  { id: 3, wireId: 2, wireName: 'Yonex BG-65', usageDate: '2026-06-11', quantity: 1, relatedOrder: 'ORD-20260611-002', operator: '张师傅' },
  { id: 4, wireId: 3, wireName: '李宁 N90-III', usageDate: '2026-06-12', quantity: 2, relatedOrder: 'ORD-20260612-001', operator: '王师傅' },
  { id: 5, wireId: 4, wireName: 'Wilson Sensation', usageDate: '2026-06-12', quantity: 1, relatedOrder: 'ORD-20260612-002', operator: '李师傅' },
];

const mockWastes: API.Waste[] = [
  { id: 1, wireId: 1, wireName: 'Yonex BG-80', wasteDate: '2026-06-10', quantity: 1, reason: 'knot', operator: '张师傅', remark: '穿线时打结' },
  { id: 2, wireId: 1, wireName: 'Yonex BG-80', wasteDate: '2026-06-11', quantity: 1, reason: 'break', operator: '王师傅', remark: '拉线时断裂' },
  { id: 3, wireId: 3, wireName: '李宁 N90-III', wasteDate: '2026-06-12', quantity: 1, reason: 'human', operator: '王师傅', remark: '剪线失误' },
];

// ========== Mock API 函数 ==========

export const mockApi = {
  // 线材
  getWireList: (params: { current?: number; pageSize?: number; keyword?: string; type?: string }) => {
    let list = [...mockWires];
    if (params.keyword) {
      list = list.filter(w => w.brand.includes(params.keyword!) || w.model.includes(params.keyword!));
    }
    if (params.type) {
      list = list.filter(w => w.type === params.type!);
    }
    const start = ((params.current || 1) - 1) * (params.pageSize || 10);
    const end = start + (params.pageSize || 10);
    return Promise.resolve({ data: list.slice(start, end), success: true, total: list.length });
  },

  getWireDetail: (id: number) => {
    const wire = mockWires.find(w => w.id === id);
    return Promise.resolve(wire || mockWires[0]);
  },

  addWire: (data: API.WireForm) => {
    const newWire: API.Wire = { ...data, id: Date.now(), currentStock: 0, avgCost: 0, createTime: new Date().toISOString() };
    mockWires.push(newWire);
    return Promise.resolve({ success: true });
  },

  updateWire: (id: number, data: Partial<API.WireForm>) => {
    const index = mockWires.findIndex(w => w.id === id);
    if (index > -1) Object.assign(mockWires[index], data);
    return Promise.resolve({ success: true });
  },

  deleteWire: (id: number) => {
    const index = mockWires.findIndex(w => w.id === id);
    if (index > -1) mockWires.splice(index, 1);
    return Promise.resolve({ success: true });
  },

  // 供应商
  getSupplierList: (params: { current?: number; pageSize?: number; keyword?: string }) => {
    let list = [...mockSuppliers];
    if (params.keyword) list = list.filter(s => s.name.includes(params.keyword!));
    const start = ((params.current || 1) - 1) * (params.pageSize || 10);
    const end = start + (params.pageSize || 10);
    return Promise.resolve({ data: list.slice(start, end), success: true, total: list.length });
  },

  addSupplier: (data: API.SupplierForm) => {
    const newSupplier: API.Supplier = { ...data, id: Date.now(), createTime: new Date().toISOString() };
    mockSuppliers.push(newSupplier);
    return Promise.resolve({ success: true });
  },

  updateSupplier: (id: number, data: Partial<API.SupplierForm>) => {
    const index = mockSuppliers.findIndex(s => s.id === id);
    if (index > -1) Object.assign(mockSuppliers[index], data);
    return Promise.resolve({ success: true });
  },

  // 进货
  getPurchaseList: (params: { current?: number; pageSize?: number; wireId?: number; supplierId?: number }) => {
    let list = [...mockPurchases];
    if (params.wireId) list = list.filter(p => p.wireId === params.wireId!);
    if (params.supplierId) list = list.filter(p => p.supplierId === params.supplierId!);
    const start = ((params.current || 1) - 1) * (params.pageSize || 10);
    const end = start + (params.pageSize || 10);
    return Promise.resolve({ data: list.slice(start, end), success: true, total: list.length });
  },

  addPurchase: (data: API.PurchaseForm) => {
    const wire = mockWires.find(w => w.id === data.wireId);
    const supplier = mockSuppliers.find(s => s.id === data.supplierId);
    const newPurchase: API.Purchase = {
      ...data,
      id: Date.now(),
      wireName: wire ? `${wire.brand} ${wire.model}` : '',
      supplierName: supplier?.name || '',
      totalPrice: (data.unitPrice || 0) * (data.quantity || 0),
      batchNo: `${(wire?.brand || 'UNK').substring(0, 3).toUpperCase()}-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(mockPurchases.length + 1).padStart(3, '0')}`,
      createTime: new Date().toISOString(),
    };
    mockPurchases.push(newPurchase);
    return Promise.resolve({ success: true });
  },

  // 消耗
  getUsageList: (params: { current?: number; pageSize?: number; wireId?: number }) => {
    let list = [...mockUsages];
    if (params.wireId) list = list.filter(u => u.wireId === params.wireId!);
    const start = ((params.current || 1) - 1) * (params.pageSize || 10);
    const end = start + (params.pageSize || 10);
    return Promise.resolve({ data: list.slice(start, end), success: true, total: list.length });
  },

  addUsage: (data: API.UsageForm) => {
    const wire = mockWires.find(w => w.id === data.wireId);
    const newUsage: API.Usage = {
      ...data, id: Date.now(),
      wireName: wire ? `${wire.brand} ${wire.model}` : '',
      usageType: data.usageType || 'service',
      createTime: new Date().toISOString(),
    };
    mockUsages.push(newUsage);
    return Promise.resolve({ success: true });
  },

  // 报废
  getWasteList: (params: { current?: number; pageSize?: number; wireId?: number; reason?: string }) => {
    let list = [...mockWastes];
    if (params.wireId) list = list.filter(w => w.wireId === params.wireId!);
    if (params.reason) list = list.filter(w => w.reason === params.reason!);
    const start = ((params.current || 1) - 1) * (params.pageSize || 10);
    const end = start + (params.pageSize || 10);
    return Promise.resolve({ data: list.slice(start, end), success: true, total: list.length });
  },

  addWaste: (data: API.WasteForm) => {
    const wire = mockWires.find(w => w.id === data.wireId);
    const newWaste: API.Waste = {
      ...data, id: Date.now(),
      wireName: wire ? `${wire.brand} ${wire.model}` : '',
      createTime: new Date().toISOString(),
    };
    mockWastes.push(newWaste);
    return Promise.resolve({ success: true });
  },

  // 库存
  getInventoryList: () => {
    const inventory: API.InventoryItem[] = mockWires.map(w => {
      const totalPurchased = mockPurchases.filter(p => p.wireId === w.id).reduce((sum, p) => sum + p.quantity, 0);
      const totalUsed = mockUsages.filter(u => u.wireId === w.id).reduce((sum, u) => sum + u.quantity, 0);
      const totalWasted = mockWastes.filter(wa => wa.wireId === w.id).reduce((sum, wa) => sum + wa.quantity, 0);
      const currentStock = totalPurchased - totalUsed - totalWasted;
      return {
        wireId: w.id, brand: w.brand, model: w.model,
        totalPurchased, totalUsed, totalWasted, currentStock,
        avgCost: w.avgCost, isLowStock: currentStock <= w.minStock,
      };
    });
    return Promise.resolve({ data: inventory, success: true, total: inventory.length });
  },

  getLowStockItems: () => {
    return mockApi.getInventoryList().then(res => ({
      ...res, data: res.data.filter(i => i.isLowStock),
    }));
  },

  // 报表
  getDailyReport: (date?: string) => {
    const targetDate = date || new Date().toISOString().slice(0, 10);
    const dayUsages = mockUsages.filter(u => u.usageDate === targetDate);
    const dayWastes = mockWastes.filter(w => w.wasteDate === targetDate);
    const report: API.DailyReport[] = [
      ...dayUsages.map(u => ({ date: targetDate, wireId: u.wireId, wireName: u.wireName, usedQty: u.quantity, cost: (u.quantity * 15) })),
      ...dayWastes.map(w => ({ date: targetDate, wireId: w.wireId, wireName: w.wireName, wastedQty: w.quantity, cost: (w.quantity * 15) })),
    ];
    return Promise.resolve(report);
  },

  getSupplierCompare: (wireId?: number) => {
    const list = wireId ? mockPurchases.filter(p => p.wireId === wireId) : mockPurchases;
    const grouped = list.reduce((acc, p) => {
      const key = `${p.wireId}-${p.supplierId}`;
      if (!acc[key]) acc[key] = { wireId: p.wireId, wireName: p.wireName, supplierId: p.supplierId, supplierName: p.supplierName, totalQty: 0, totalCost: 0, lastDate: p.purchaseDate };
      acc[key].totalQty += p.quantity;
      acc[key].totalCost += p.totalPrice;
      if (p.purchaseDate > acc[key].lastDate) acc[key].lastDate = p.purchaseDate;
      return acc;
    }, {} as Record<string, any>);
    const compare: API.SupplierCompare[] = Object.values(grouped).map(g => ({
      wireId: g.wireId, wireName: g.wireName, supplierId: g.supplierId, supplierName: g.supplierName,
      avgPrice: g.totalCost / g.totalQty, totalQty: g.totalQty, lastPurchaseDate: g.lastDate,
    }));
    return Promise.resolve(compare);
  },

  getWastageReport: (startDate: string, endDate: string) => {
    const rangeWastes = mockWastes.filter(w => w.wasteDate >= startDate && w.wasteDate <= endDate);
    const rangeUsages = mockUsages.filter(u => u.usageDate >= startDate && u.usageDate <= endDate);
    const wireIds = [...new Set(rangeWastes.map(w => w.wireId))];
    const report: API.WastageReport[] = wireIds.map(wireId => {
      const wire = mockWires.find(w => w.id === wireId);
      const totalWasted = rangeWastes.filter(w => w.wireId === wireId).reduce((s, w) => s + w.quantity, 0);
      const totalUsed = rangeUsages.filter(u => u.wireId === wireId).reduce((s, u) => s + u.quantity, 0);
      return { wireId, wireName: wire ? `${wire.brand} ${wire.model}` : '', totalUsed, totalWasted, wastageRate: totalUsed > 0 ? (totalWasted / totalUsed * 100) : 0 };
    });
    return Promise.resolve(report);
  },

  getMonthlySummary: (month: string) => {
    const monthPurchases = mockPurchases.filter(p => p.purchaseDate.startsWith(month));
    const monthUsages = mockUsages.filter(u => u.usageDate.startsWith(month));
    const monthWastes = mockWastes.filter(w => w.wasteDate.startsWith(month));
    const totalPurchaseCost = monthPurchases.reduce((s, p) => s + p.totalPrice, 0);
    const totalUsageQty = monthUsages.reduce((s, u) => s + u.quantity, 0);
    const totalWasteQty = monthWastes.reduce((s, w) => s + w.quantity, 0);
    return Promise.resolve({
      month, totalPurchaseCost, totalUsageCost: totalUsageQty * 15, totalWasteCost: totalWasteQty * 15,
      topUsedWires: [{ name: 'Yonex BG-80', qty: 5 }], topWastedWires: [{ name: 'Yonex BG-80', qty: 2 }],
    });
  },
};
