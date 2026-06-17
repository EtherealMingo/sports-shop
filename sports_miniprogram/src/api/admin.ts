import type {
  IAdminLoginForm,
  IAdminInfo,
  IMemberListParams,
  IPointsAdjustParams,
  IPointsRedeemParams,
  IStatisticsData,
  IExchangeItemManage,
  IRedeemExchangeParams,
  IAppointmentManageParams,
  ITimeSlot,
  IPointsRuleSetting,
} from './types/admin'
import type { IMember, IExchangeRecord, IAppointment } from './types/member'
import { http } from '@/http/http'

/**
 * 商家登录
 */
export function adminLogin(data: IAdminLoginForm) {
  return http.post<{ token: string; adminInfo: IAdminInfo }>('/admin/login', data)
}

/**
 * 获取商家信息
 */
export function getAdminInfo() {
  return http.get<IAdminInfo>('/admin/info')
}

/**
 * 获取会员列表
 */
export function getMemberList(params: IMemberListParams) {
  return http.get<{ list: IMember[]; total: number }>('/admin/members', params)
}

/**
 * 获取会员详情
 */
export function getMemberDetail(memberId: string) {
  return http.get<IMember>(`/admin/member/${memberId}`)
}

/**
 * 调整积分
 */
export function adjustPoints(data: IPointsAdjustParams) {
  return http.post('/admin/points/adjust', data)
}

/**
 * 积分核销
 */
export function redeemPoints(data: IPointsRedeemParams) {
  return http.post('/admin/points/redeem', data)
}

/**
 * 获取积分明细
 */
export function getPointsDetail(params?: { page?: number; pageSize?: number; memberId?: string; type?: string }) {
  return http.get<{ list: any[]; total: number }>('/admin/points/records', params)
}

/**
 * 获取统计数据
 */
export function getStatistics() {
  return http.get<IStatisticsData>('/admin/statistics')
}

/**
 * 获取兑换商品管理列表
 */
export function getExchangeItemsManage() {
  return http.get<IExchangeItemManage[]>('/admin/exchange/items')
}

/**
 * 添加兑换商品
 */
export function addExchangeItem(data: IExchangeItemManage) {
  return http.post('/admin/exchange/item', data)
}

/**
 * 更新兑换商品
 */
export function updateExchangeItem(id: number, data: IExchangeItemManage) {
  return http.put(`/admin/exchange/item/${id}`, data)
}

/**
 * 删除兑换商品
 */
export function deleteExchangeItem(id: number) {
  return http.delete(`/admin/exchange/item/${id}`)
}

/**
 * 获取兑换记录管理列表
 */
export function getExchangeRecordsManage(params?: { page?: number; pageSize?: number; status?: string }) {
  return http.get<{ list: IExchangeRecord[]; total: number }>('/admin/exchange/records', params)
}

/**
 * 核销兑换记录
 */
export function redeemExchangeRecord(data: IRedeemExchangeParams) {
  return http.post('/admin/exchange/redeem', data)
}

/**
 * 获取预约管理列表
 */
export function getAppointmentManageList(params?: { page?: number; pageSize?: number; status?: string; date?: string }) {
  return http.get<{ list: IAppointment[]; total: number }>('/admin/appointments', params)
}

/**
 * 更新预约状态
 */
export function updateAppointmentStatus(id: number, data: IAppointmentManageParams) {
  return http.put(`/admin/appointment/${id}`, data)
}

/**
 * 获取可预约时间段
 */
export function getAvailableTimeSlots(date: string) {
  return http.get<ITimeSlot[]>('/admin/appointments/timeSlots', { date })
}

/**
 * 设置可预约时间段
 */
export function setTimeSlots(data: { date: string; timeSlots: ITimeSlot[] }) {
  return http.post('/admin/appointments/timeSlots', data)
}

/**
 * 获取积分规则
 */
export function getPointsRuleAdmin() {
  return http.get<IPointsRuleSetting>('/admin/points/rule')
}

/**
 * 更新积分规则
 */
export function updatePointsRule(data: IPointsRuleSetting) {
  return http.put('/admin/points/rule', data)
}

/**
 * 退出登录
 */
export function adminLogout() {
  return http.post('/admin/logout')
}
