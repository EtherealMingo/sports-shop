// @ai-generated - 全部由 AI 輔助生成
import { http } from '@/http/http';
import type { IResponse } from '@/http/types';

// 是否启用 Mock 数据（后端不可用时使用）
const ENABLE_MOCK = true;

// ========== Mock 数据 ==========

const mockMember = {
  id: 1,
  memberId: 'M202401010001',
  name: '张三',
  phone: '138****8888',
  avatar: 'https://picsum.photos/100/100?random=1',
  level: '普通会员',
  points: 2580,
  signedToday: false,
  signDays: 5,
};

const mockHotGoods = [
  { id: 1, name: '专业羽毛球拍手胶', points: 200, image: 'https://picsum.photos/200/200?random=1', stock: 50 },
  { id: 2, name: 'YONEX羽毛球线', points: 350, image: 'https://picsum.photos/200/200?random=2', stock: 30 },
  { id: 3, name: '免费缠线服务券', points: 500, image: 'https://picsum.photos/200/200?random=3', stock: 20 },
  { id: 4, name: '运动毛巾', points: 180, image: 'https://picsum.photos/200/200?random=4', stock: 100 },
];

const mockShopInfo = {
  id: 1,
  name: '极速体育器材服务中心',
  address: '北京市朝阳区体育路88号羽毛球馆一层',
  phone: '010-88886666',
  hours: '周一至周日 09:00-21:00',
  image: 'https://picsum.photos/400/200?random=10',
};

// ========== API 函数 ==========

// 获取会员信息
export async function getMemberInfo() {
  if (ENABLE_MOCK) {
    return { data: mockMember } as IResponse<typeof mockMember>;
  }
  return http<IResponse<typeof mockMember>>({
    url: '/api/member/info',
    method: 'GET',
  });
}

// 每日签到
export async function dailySign() {
  if (ENABLE_MOCK) {
    return { data: { success: true, points: 1 } } as IResponse<any>;
  }
  return http<IResponse<any>>({
    url: '/api/member/sign',
    method: 'POST',
  });
}

// 获取积分明细
export async function getPointsRecords(params?: { page?: number; pageSize?: number }) {
  if (ENABLE_MOCK) {
    return { data: { data: [], total: 0, success: true } } as IResponse<any>;
  }
  return http<IResponse<any>>({
    url: '/api/points/records',
    method: 'GET',
    data: params as any,
  });
}

// 获取积分规则
export async function getPointsRule() {
  if (ENABLE_MOCK) {
    return {
      data: {
        earnRate: 1,
        deductRate: 10,
        validMonths: 12,
        description: '每消费1元积1分，10积分可抵扣1元',
      },
    } as IResponse<any>;
  }
  return http<IResponse<any>>({
    url: '/api/points/rule',
    method: 'GET',
  });
}

// 获取热门兑换商品
export async function getHotGoods() {
  if (ENABLE_MOCK) {
    return { data: mockHotGoods } as IResponse<typeof mockHotGoods>;
  }
  return http<IResponse<typeof mockHotGoods>>({
    url: '/api/exchange/items',
    method: 'GET',
  });
}

// 获取店铺信息
export async function getShopInfo() {
  if (ENABLE_MOCK) {
    return { data: mockShopInfo } as IResponse<typeof mockShopInfo>;
  }
  return http<IResponse<typeof mockShopInfo>>({
    url: '/api/shop/info',
    method: 'GET',
  });
}

// 获取服务历史
export async function getServiceHistory(params?: { page?: number; pageSize?: number }) {
  if (ENABLE_MOCK) {
    return { data: { data: [], total: 0, success: true } } as IResponse<any>;
  }
  return http<IResponse<any>>({
    url: '/api/service/history',
    method: 'GET',
    data: params as any,
  });
}

// 获取预约列表
export async function getAppointmentList(params?: { page?: number; pageSize?: number; status?: string }) {
  if (ENABLE_MOCK) {
    return { data: { data: [], total: 0, success: true } } as IResponse<any>;
  }
  return http<IResponse<any>>({
    url: '/api/appointment/list',
    method: 'GET',
    data: params as any,
  });
}

// 创建预约
export async function createAppointment(data: any) {
  if (ENABLE_MOCK) {
    return { data: { success: true, id: Date.now() } } as IResponse<any>;
  }
  return http<IResponse<any>>({
    url: '/api/appointment',
    method: 'POST',
    data,
  });
}

// 获取商品列表
export async function getGoodsList(params?: { page?: number; pageSize?: number; type?: string }) {
  if (ENABLE_MOCK) {
    return {
      data: {
        data: [
          { id: 1, name: '专业羽毛球拍', price: '¥299', image: 'https://picsum.photos/300/300?random=20', description: '碳纤维材质，轻量化设计' },
          { id: 2, name: '专业网球拍', price: '¥399', image: 'https://picsum.photos/300/300?random=21', description: '高弹力碳纤维' },
        ],
        total: 2,
        success: true,
      },
    } as IResponse<any>;
  }
  return http<IResponse<any>>({
    url: '/api/goods/list',
    method: 'GET',
    data: params as any,
  });
}

// 获取扫码记录
export async function getScanHistory(params?: { page?: number; pageSize?: number }) {
  if (ENABLE_MOCK) {
    return { data: { data: [], total: 0, success: true } } as IResponse<any>;
  }
  return http<IResponse<any>>({
    url: '/api/qr/history',
    method: 'GET',
    data: params as any,
  });
}

// 商家登录
export async function merchantLogin(data: { username: string; password: string }) {
  if (ENABLE_MOCK) {
    if (data.username === 'admin' && data.password === 'admin123') {
      return { data: { token: 'mock_merchant_token', adminInfo: { name: '管理员', role: 'admin' } } } as IResponse<any>;
    }
    throw new Error('用户名或密码错误');
  }
  return http<IResponse<any>>({
    url: '/api/auth/merchant-login',
    method: 'POST',
    data,
  });
}

// 获取商家首页数据
export async function getMerchantDashboard() {
  if (ENABLE_MOCK) {
    return {
      data: {
        merchantInfo: { name: '极速体育器材服务中心' },
        stats: { todayAppointments: 5, todayPoints: 580, lowStock: 2 },
        recentAppointments: [
          { id: 1, memberName: '张三', serviceType: 'badminton', status: 'pending', timeSlot: '14:00-15:00' },
          { id: 2, memberName: '李四', serviceType: 'tennis', status: 'confirmed', timeSlot: '10:00-11:00' },
        ],
      },
    } as IResponse<any>;
  }
  return http<IResponse<any>>({
    url: '/api/merchant/dashboard',
    method: 'GET',
  });
}
