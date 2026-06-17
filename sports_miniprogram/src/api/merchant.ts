// @ai-generated - 全部由 AI 輔助生成
import { http } from '@/http/http';
import type { IResponse } from '@/http/types';

// ========== 商家端 API ==========

// 商家登录
export async function merchantLogin(data: { username: string; password: string }) {
  if (data.username === 'admin' && data.password === 'admin123') {
    return { data: { token: 'mock_token', adminInfo: { name: '管理员' } } } as IResponse<any>;
  }
  throw new Error('用户名或密码错误');
}

// 获取商家首页数据
export async function getMerchantDashboard() {
  return {
    data: {
      stats: { todayAppointments: 5, todayPoints: 580, lowStock: 2 },
      recentAppointments: [
        { id: 1, memberName: '张三', serviceType: 'badminton', status: 'pending', timeSlot: '14:00' },
      ],
    },
  } as IResponse<any>;
}

// 获取会员列表（商家端）
export async function getMemberList(params?: any) {
  return { data: { data: [], total: 0 } } as IResponse<any>;
}

// 调整会员积分（商家端）
export async function adjustPoints(data: any) {
  return { data: { success: true } } as IResponse<any>;
}

// 获取预约列表（商家端）
export async function getAppointmentList(params?: any) {
  return { data: { data: [], total: 0 } } as IResponse<any>;
}

// 更新预约状态（商家端）
export async function updateAppointmentStatus(id: number, status: string) {
  return { data: { success: true } } as IResponse<any>;
}

// 获取库存列表
export async function getInventoryList() {
  return { data: { data: [], total: 0 } } as IResponse<any>;
}

// 获取财务报表
export async function getFinanceReport(params?: any) {
  return { data: { totalPurchase: 0, totalUsage: 0, totalWaste: 0 } } as IResponse<any>;
}
