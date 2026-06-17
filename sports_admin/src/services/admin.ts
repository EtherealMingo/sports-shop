// @ai-generated - 全部由 AI 輔助生成
import { request } from '@umijs/max';
import { mockApi } from './mock';

// 是否启用 Mock 数据
// 注意: 设置为 false 前需要确保后端已启动 (http://localhost:8080)
const ENABLE_MOCK = true;

// ========== 会员管理 ==========
// 获取会员列表
export async function getMemberList(params: {
  current?: number;
  pageSize?: number;
  keyword?: string;
}) {
  if (ENABLE_MOCK) return mockApi.getMemberList(params);
  return request<API.ResponseList<API.Member>>('/api/member/list', {
    method: 'GET',
    params,
  });
}

// 获取会员详情
export async function getMemberDetail(id: number) {
  if (ENABLE_MOCK) return mockApi.getMemberDetail(String(id));
  return request<API.Member>(`/api/member/${id}`, {
    method: 'GET',
  });
}

// 更新会员信息
export async function updateMember(data: API.MemberUpdate) {
  if (ENABLE_MOCK) return mockApi.updateMember(data);
  return request(`/api/member/${data.id}`, {
    method: 'PUT',
    data,
  });
}

// 补赠积分
export async function addPoints(data: { memberId: string; points: number; reason: string }) {
  if (ENABLE_MOCK) return mockApi.adjustPoints(data);
  return request(`/api/member/${data.memberId}/points/add`, {
    method: 'POST',
    data,
  });
}

// 扣除积分
export async function deductPoints(data: { memberId: string; points: number; reason: string }) {
  if (ENABLE_MOCK) return mockApi.adjustPoints(data);
  return request(`/api/member/${data.memberId}/points/deduct`, {
    method: 'POST',
    data,
  });
}

// 积分核销
export async function redeemPoints(data: API.PointsRedeem) {
  if (ENABLE_MOCK) return mockApi.redeemPoints(data);
  return request('/api/points/redeem', {
    method: 'POST',
    data,
  });
}

// 获取积分明细
export async function getPointsRecords(params: {
  current?: number;
  pageSize?: number;
  memberId?: string;
  type?: string;
}) {
  if (ENABLE_MOCK) return mockApi.getPointsRecords(params);
  return request<API.ResponseList<API.PointsRecord>>('/api/points/records', {
    method: 'GET',
    params,
  });
}

// ========== 兑换管理 ==========
// 获取兑换商品列表
export async function getExchangeItems() {
  if (ENABLE_MOCK) return mockApi.getExchangeItems();
  return request<API.ExchangeItem[]>('/api/exchange/items', {
    method: 'GET',
  });
}

// 添加兑换商品
export async function addExchangeItem(data: API.ExchangeItemForm) {
  if (ENABLE_MOCK) return mockApi.addExchangeItem(data);
  return request('/api/exchange/items', {
    method: 'POST',
    data,
  });
}

// 更新兑换商品
export async function updateExchangeItem(id: number, data: API.ExchangeItemForm) {
  if (ENABLE_MOCK) return mockApi.updateExchangeItem(id, data);
  return request(`/api/exchange/items/${id}`, {
    method: 'PUT',
    data,
  });
}

// 删除兑换商品
export async function deleteExchangeItem(id: number) {
  if (ENABLE_MOCK) return mockApi.deleteExchangeItem(id);
  return request(`/api/exchange/items/${id}`, {
    method: 'DELETE',
  });
}

// 获取兑换记录
export async function getExchangeRecords(params: {
  current?: number;
  pageSize?: number;
  status?: string;
}) {
  if (ENABLE_MOCK) return mockApi.getExchangeRecords(params);
  return request<API.ResponseList<API.ExchangeRecord>>('/api/exchange/records', {
    method: 'GET',
    params,
  });
}

// 核销兑换记录
export async function redeemExchangeRecord(data: { recordId: number }) {
  if (ENABLE_MOCK) return mockApi.redeemExchangeRecord(data);
  return request(`/api/exchange/records/${data.recordId}/redeem`, {
    method: 'PUT',
  });
}

// ========== 预约管理 ==========
// 获取预约列表
export async function getAppointments(params: {
  current?: number;
  pageSize?: number;
  status?: string;
  date?: string;
}) {
  if (ENABLE_MOCK) return mockApi.getAppointments(params);
  return request<API.ResponseList<API.Appointment>>('/api/appointment/list', {
    method: 'GET',
    params,
  });
}

// 更新预约状态
export async function updateAppointmentStatus(id: number, data: { status: string }) {
  if (ENABLE_MOCK) return mockApi.updateAppointmentStatus(id, data);
  if (data.status === 'confirmed') {
    return request(`/api/appointment/${id}/confirm`, { method: 'PUT' });
  } else if (data.status === 'cancelled') {
    return request(`/api/appointment/${id}/cancel`, { method: 'PUT' });
  }
  return request(`/api/appointment/${id}`, { method: 'PUT', data });
}

// 获取可预约时间段
export async function getAvailableTimeSlots(date: string) {
  if (ENABLE_MOCK) return mockApi.getAvailableTimeSlots(date);
  return request<API.TimeSlot[]>('/api/appointment/timeSlots', {
    method: 'GET',
    params: { date },
  });
}

// 设置可预约时间段
export async function setTimeSlots(data: { date: string; timeSlots: API.TimeSlot[] }) {
  if (ENABLE_MOCK) return mockApi.setTimeSlots(data);
  return request('/api/appointment/timeSlots', {
    method: 'POST',
    data,
  });
}

// 更新服务进度
export async function updateServiceProgress(id: number, data: { status: API.ServiceStatus; description?: string; operator?: string }) {
  if (ENABLE_MOCK) return mockApi.updateServiceProgress(id, data);
  return request(`/api/service/progress/${id}/status`, {
    method: 'PUT',
    data,
  });
}

// ========== 统计数据 ==========
// 获取统计数据
export async function getStatistics() {
  if (ENABLE_MOCK) return mockApi.getStatistics();
  return request<API.Statistics>('/api/statistics', {
    method: 'GET',
  });
}

// ========== 积分规则 ==========
// 获取积分规则
export async function getPointsRule() {
  if (ENABLE_MOCK) return mockApi.getPointsRule();
  return request<API.PointsRule>('/api/points/rule', {
    method: 'GET',
  });
}

// 更新积分规则
export async function updatePointsRule(data: API.PointsRuleForm) {
  if (ENABLE_MOCK) return mockApi.updatePointsRule(data);
  return request('/api/points/rule', {
    method: 'PUT',
    data,
  });
}

// ========== 商家登录 ==========
export async function adminLogin(data: { username: string; password: string }) {
  if (ENABLE_MOCK) return mockApi.adminLogin(data);
  return request<{ token: string; adminInfo: API.AdminInfo }>('/api/auth/login', {
    method: 'POST',
    data,
  });
}

// 获取商家信息
export async function getAdminInfo() {
  if (ENABLE_MOCK) return mockApi.getAdminInfo();
  return request<API.AdminInfo>('/api/auth/info', {
    method: 'GET',
  });
}

// 退出登录
export async function adminLogout() {
  if (ENABLE_MOCK) return mockApi.adminLogout();
  return request('/api/auth/logout', {
    method: 'POST',
  });
}
