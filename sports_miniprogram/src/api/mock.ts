import type {
  IMember,
  IPointsRecord,
  IExchangeItem,
  IExchangeRecord,
  IAppointment,
  IShopInfo,
  IPointsRule,
} from './types/member'

// 模拟当前会员信息
const currentMember: IMember = {
  id: 1,
  memberId: 'M202401010001',
  name: '张三',
  phone: '138****8888',
  points: 2580,
  level: '金牌会员',
  avatar: 'https://picsum.photos/100/100?random=1',
  registerTime: '2024-01-01T10:00:00',
  lastConsumeTime: '2025-01-28T15:30:00',
}

// 积分明细数据
const pointsRecords: IPointsRecord[] = [
  { id: 1, memberId: 'M202401010001', points: 100, type: 'earn', reason: '每日签到', createTime: '2025-01-31T09:00:00' },
  { id: 2, memberId: 'M202401010001', points: 50, type: 'earn', reason: '羽毛球拍缠线消费', createTime: '2025-01-30T14:20:00' },
  { id: 3, memberId: 'M202401010001', points: -200, type: 'deduct', reason: '兑换运动毛巾', createTime: '2025-01-28T16:00:00' },
  { id: 4, memberId: 'M202401010001', points: 80, type: 'earn', reason: '网球拍缠线消费', createTime: '2025-01-25T10:30:00' },
  { id: 5, memberId: 'M202401010001', points: 150, type: 'earn', reason: '连续签到7天奖励', createTime: '2025-01-20T09:00:00' },
  { id: 6, memberId: 'M202401010001', points: -500, type: 'deduct', reason: '兑换专业手胶套装', createTime: '2025-01-15T11:00:00' },
  { id: 7, memberId: 'M202401010001', points: 100, type: 'earn', reason: '每日签到', createTime: '2025-01-10T09:00:00' },
  { id: 8, memberId: 'M202401010001', points: 60, type: 'earn', reason: '商品消费', createTime: '2025-01-05T15:00:00' },
]

// 可兑换商品列表
const exchangeItems: IExchangeItem[] = [
  {
    id: 1,
    name: '专业羽毛球拍手胶',
    description: '高品质PU材质，吸汗防滑，专业选手首选',
    points: 200,
    stock: 50,
    image: 'https://picsum.photos/300/200?random=10',
    type: 'product',
    status: 'active',
  },
  {
    id: 2,
    name: 'YONEX羽毛球线',
    description: 'BG-80高弹线，0.68mm线径，耐打高弹',
    points: 350,
    stock: 30,
    image: 'https://picsum.photos/300/200?random=11',
    type: 'product',
    status: 'active',
  },
  {
    id: 3,
    name: '免费缠线服务券',
    description: '羽毛球拍或网球拍免费缠线一次',
    points: 500,
    stock: 20,
    image: 'https://picsum.photos/300/200?random=12',
    type: 'service',
    status: 'active',
  },
  {
    id: 4,
    name: '运动毛巾',
    description: '速干吸汗运动毛巾，80*40cm',
    points: 180,
    stock: 100,
    image: 'https://picsum.photos/300/200?random=13',
    type: 'product',
    status: 'active',
  },
  {
    id: 5,
    name: '护腕套装',
    description: '专业运动护腕，保护手腕防扭伤',
    points: 280,
    stock: 25,
    image: 'https://picsum.photos/300/200?random=14',
    type: 'product',
    status: 'active',
  },
  {
    id: 6,
    name: '球拍保养套装',
    description: '包含护框贴、防潮袋、清洁布',
    points: 450,
    stock: 15,
    image: 'https://picsum.photos/300/200?random=15',
    type: 'product',
    status: 'active',
  },
]

// 兑换记录
const exchangeRecords: IExchangeRecord[] = [
  { id: 1, memberId: 'M202401010001', itemId: 4, itemName: '运动毛巾', points: 200, status: 'redeemed', code: 'EX20250128001', createTime: '2025-01-28T16:00:00', redeemTime: '2025-01-29T10:00:00' },
  { id: 2, memberId: 'M202401010001', itemId: 1, itemName: '专业羽毛球拍手胶', points: 500, status: 'pending', code: 'EX20250131001', createTime: '2025-01-31T09:30:00' },
  { id: 3, memberId: 'M202401010001', itemId: 3, itemName: '免费缠线服务券', points: 500, status: 'redeemed', code: 'EX20250115001', createTime: '2025-01-15T11:00:00', redeemTime: '2025-01-16T14:00:00' },
]

// 服务进度标签映射
const statusLabelMap: Record<string, string> = {
  pending: '待确认',
  confirmed: '已确认',
  received: '已收件',
  in_progress: '缠线中',
  completed: '已完成',
  delivered: '已取件',
  cancelled: '已取消',
}

// 创建进度记录
function createProgress(status: string, desc: string, time: string): IServiceProgress {
  return {
    status: status as any,
    label: statusLabelMap[status],
    description: desc,
    operator: '系统',
    createTime: time,
  }
}

// 预约列表
const appointments: IAppointment[] = [
  {
    id: 1,
    memberId: 'M202401010001',
    serviceType: 'badminton',
    appointmentDate: '2025-02-05',
    timeSlot: '14:00-16:00',
    racketCount: 2,
    requirements: '请使用BG-80线，25磅',
    status: 'in_progress',
    progress: [
      createProgress('pending', '用户提交预约申请', '2025-01-30T10:00:00'),
      createProgress('confirmed', '商家已确认预约', '2025-01-30T14:30:00'),
      createProgress('received', '已收到用户球拍', '2025-02-05T13:50:00'),
      createProgress('in_progress', '正在进行缠线服务', '2025-02-05T15:00:00'),
    ],
    createTime: '2025-01-30T10:00:00',
  },
  {
    id: 2,
    memberId: 'M202401010001',
    serviceType: 'tennis',
    appointmentDate: '2025-01-28',
    timeSlot: '10:00-12:00',
    racketCount: 1,
    requirements: '',
    status: 'delivered',
    progress: [
      createProgress('pending', '用户提交预约申请', '2025-01-25T09:00:00'),
      createProgress('confirmed', '商家已确认预约', '2025-01-25T11:00:00'),
      createProgress('received', '已收到用户球拍', '2025-01-28T09:30:00'),
      createProgress('in_progress', '正在进行缠线服务', '2025-01-28T10:00:00'),
      createProgress('completed', '缠线服务已完成', '2025-01-28T11:30:00'),
      createProgress('delivered', '用户已取走球拍', '2025-01-28T14:00:00'),
    ],
    createTime: '2025-01-25T09:00:00',
  },
  {
    id: 3,
    memberId: 'M202401010001',
    serviceType: 'badminton',
    appointmentDate: '2025-02-10',
    timeSlot: '16:00-18:00',
    racketCount: 3,
    requirements: '颜色要白色',
    status: 'pending',
    progress: [
      createProgress('pending', '用户提交预约申请', '2025-01-31T08:00:00'),
    ],
    createTime: '2025-01-31T08:00:00',
  },
]

// 店铺信息
const shopInfo: IShopInfo = {
  name: '极速体育器材服务中心',
  address: '北京市朝阳区体育路88号羽毛球馆一层',
  phone: '010-88886666',
  businessHours: '周一至周日 09:00-21:00',
  description: '专业提供羽毛球拍、网球拍缠线服务，各类体育器材销售与维护。拥有专业技师团队，使用高品质线材，为您的装备提供最佳服务。',
  images: [
    'https://picsum.photos/400/300?random=20',
    'https://picsum.photos/400/300?random=21',
    'https://picsum.photos/400/300?random=22',
  ],
}

// 积分规则
const pointsRule: IPointsRule = {
  earnRate: 1,
  deductRate: 0.1,
  validMonths: 12,
  description: '每消费1元可获得1积分，10积分可抵扣1元。积分自获得之日起12个月内有效。',
}

// 签到记录
const signRecord = {
  signedToday: false,
  consecutiveDays: 3,
  totalSignDays: 45,
}

// 添加进度到预约
function addProgressToAppointment(appointment: IAppointment, status: ServiceStatus, desc: string) {
  appointment.status = status
  appointment.progress.push({
    status,
    label: statusLabelMap[status],
    description: desc,
    createTime: new Date().toISOString(),
  })
}

// Mock API 封装
export const mockApi = {
  // 会员信息
  getMemberInfo: () => Promise.resolve({ data: { ...currentMember } }),

  // 积分明细
  getPointsRecords: (params?: { page?: number; pageSize?: number }) => {
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return Promise.resolve({
      data: {
        list: pointsRecords.slice(start, end),
        total: pointsRecords.length,
      },
    })
  },

  // 积分余额
  getPointsBalance: () => Promise.resolve({ data: { balance: currentMember.points } }),

  // 可兑换商品
  getExchangeItems: () => Promise.resolve({ data: [...exchangeItems] }),

  // 兑换商品
  exchangeItem: (data: { itemId: number }) => {
    const item = exchangeItems.find(i => i.id === data.itemId)
    if (!item) return Promise.reject(new Error('商品不存在'))
    const record: IExchangeRecord = {
      id: Date.now(),
      memberId: currentMember.memberId,
      itemId: item.id,
      itemName: item.name,
      points: item.points,
      status: 'pending',
      code: `EX${Date.now()}`,
      createTime: new Date().toISOString(),
    }
    exchangeRecords.unshift(record)
    currentMember.points -= item.points
    return Promise.resolve({ data: record })
  },

  // 兑换记录
  getExchangeRecords: (params?: { page?: number; pageSize?: number }) => {
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return Promise.resolve({
      data: {
        list: exchangeRecords.slice(start, end),
        total: exchangeRecords.length,
      },
    })
  },

  // 创建预约
  createAppointment: (data: {
    serviceType: 'badminton' | 'tennis'
    appointmentDate: string
    timeSlot: string
    racketCount: number
    requirements?: string
  }) => {
    const now = new Date().toISOString()
    const appointment: IAppointment = {
      id: Date.now(),
      memberId: currentMember.memberId,
      ...data,
      status: 'pending',
      progress: [createProgress('pending', '用户提交预约申请', now)],
      createTime: now,
    }
    appointments.unshift(appointment)
    return Promise.resolve({ data: appointment })
  },

  // 预约列表
  getAppointments: (params?: { page?: number; pageSize?: number }) => {
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return Promise.resolve({
      data: {
        list: appointments.slice(start, end),
        total: appointments.length,
      },
    })
  },

  // 预约详情
  getAppointmentDetail: (id: number) => {
    const appointment = appointments.find(a => a.id === id)
    if (!appointment) return Promise.reject(new Error('预约不存在'))
    return Promise.resolve({ data: appointment })
  },

  // 取消预约
  cancelAppointment: (id: number) => {
    const appointment = appointments.find(a => a.id === id)
    if (appointment) {
      addProgressToAppointment(appointment, 'cancelled', '用户取消预约')
    }
    return Promise.resolve({ data: null })
  },

  // 店铺信息
  getShopInfo: () => Promise.resolve({ data: { ...shopInfo } }),

  // 积分规则
  getPointsRule: () => Promise.resolve({ data: { ...pointsRule } }),

  // 每日签到
  dailySign: () => {
    signRecord.signedToday = true
    signRecord.consecutiveDays += 1
    signRecord.totalSignDays += 1
    const points = signRecord.consecutiveDays >= 7 ? 50 : 10
    currentMember.points += points
    return Promise.resolve({
      data: {
        points,
        consecutiveDays: signRecord.consecutiveDays,
      },
    })
  },

  // 签到记录
  getSignRecord: () => Promise.resolve({ data: { ...signRecord } }),
}
