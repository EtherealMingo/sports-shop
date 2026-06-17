// Mock 数据配置
const ENABLE_MOCK = true;

// ========== Mock 数据 ==========

// 会员列表
const mockMembers: API.Member[] = [
  {
    id: 1,
    memberId: 'M202401010001',
    name: '张三',
    phone: '138****8888',
    avatar: 'https://picsum.photos/100/100?random=1',
    level: '金牌会员',
    points: 2580,
    registerTime: '2024-01-01T10:00:00',
    lastConsumeTime: '2025-01-28T15:30:00',
  },
  {
    id: 2,
    memberId: 'M202401020002',
    name: '李四',
    phone: '139****6666',
    avatar: 'https://picsum.photos/100/100?random=2',
    level: '银牌会员',
    points: 1280,
    registerTime: '2024-01-15T14:20:00',
    lastConsumeTime: '2025-01-25T10:00:00',
  },
  {
    id: 3,
    memberId: 'M202402010003',
    name: '王五',
    phone: '137****9999',
    avatar: 'https://picsum.photos/100/100?random=3',
    level: '普通会员',
    points: 580,
    registerTime: '2024-02-01T09:00:00',
  },
  {
    id: 4,
    memberId: 'M202402150004',
    name: '赵六',
    phone: '136****7777',
    avatar: 'https://picsum.photos/100/100?random=4',
    level: '金牌会员',
    points: 3650,
    registerTime: '2024-02-15T16:30:00',
    lastConsumeTime: '2025-01-30T11:20:00',
  },
  {
    id: 5,
    memberId: 'M202403010005',
    name: '钱七',
    phone: '135****5555',
    avatar: 'https://picsum.photos/100/100?random=5',
    level: '银牌会员',
    points: 980,
    registerTime: '2024-03-01T11:00:00',
    lastConsumeTime: '2025-01-20T14:00:00',
  },
];

// 积分明细
const mockPointsRecords: API.PointsRecord[] = [
  { id: 1, memberId: 'M202401010001', memberName: '张三', memberPhone: '138****8888', points: 100, type: 'earn', reason: '每日签到', createTime: '2025-01-31T09:00:00' },
  { id: 2, memberId: 'M202401010001', memberName: '张三', memberPhone: '138****8888', points: 50, type: 'earn', reason: '羽毛球拍缠线消费', createTime: '2025-01-30T14:20:00' },
  { id: 3, memberId: 'M202401010001', memberName: '张三', memberPhone: '138****8888', points: -200, type: 'deduct', reason: '兑换运动毛巾', createTime: '2025-01-28T16:00:00' },
  { id: 4, memberId: 'M202401020002', memberName: '李四', memberPhone: '139****6666', points: 80, type: 'earn', reason: '网球拍缠线消费', createTime: '2025-01-29T10:30:00' },
  { id: 5, memberId: 'M202401020002', memberName: '李四', memberPhone: '139****6666', points: -500, type: 'deduct', reason: '兑换专业手胶套装', createTime: '2025-01-25T11:00:00' },
  { id: 6, memberId: 'M202402010003', memberName: '王五', memberPhone: '137****9999', points: 150, type: 'earn', reason: '连续签到7天奖励', createTime: '2025-01-28T09:00:00' },
  { id: 7, memberId: 'M202402150004', memberName: '赵六', memberPhone: '136****7777', points: 200, type: 'earn', reason: '商品消费', createTime: '2025-01-30T15:00:00' },
  { id: 8, memberId: 'M202403010005', memberName: '钱七', memberPhone: '135****5555', points: -350, type: 'deduct', reason: '兑换YONEX羽毛球线', createTime: '2025-01-27T14:00:00' },
];

// 兑换商品
const mockExchangeItems: API.ExchangeItem[] = [
  { id: 1, name: '专业羽毛球拍手胶', description: '高品质PU材质，吸汗防滑', points: 200, stock: 50, image: 'https://picsum.photos/300/200?random=10', type: 'product', status: 'active', createTime: '2024-01-01T00:00:00' },
  { id: 2, name: 'YONEX羽毛球线', description: 'BG-80高弹线，0.68mm线径', points: 350, stock: 30, image: 'https://picsum.photos/300/200?random=11', type: 'product', status: 'active', createTime: '2024-01-01T00:00:00' },
  { id: 3, name: '免费缠线服务券', description: '羽毛球拍或网球拍免费缠线一次', points: 500, stock: 20, image: 'https://picsum.photos/300/200?random=12', type: 'service', status: 'active', createTime: '2024-01-01T00:00:00' },
  { id: 4, name: '运动毛巾', description: '速干吸汗运动毛巾，80*40cm', points: 180, stock: 100, image: 'https://picsum.photos/300/200?random=13', type: 'product', status: 'active', createTime: '2024-01-01T00:00:00' },
  { id: 5, name: '护腕套装', description: '专业运动护腕，保护手腕防扭伤', points: 280, stock: 25, image: 'https://picsum.photos/300/200?random=14', type: 'product', status: 'active', createTime: '2024-01-01T00:00:00' },
  { id: 6, name: '球拍保养套装', description: '包含护框贴、防潮袋、清洁布', points: 450, stock: 15, image: 'https://picsum.photos/300/200?random=15', type: 'product', status: 'inactive', createTime: '2024-01-01T00:00:00' },
];

// 兑换记录
const mockExchangeRecords: API.ExchangeRecord[] = [
  { id: 1, memberId: 'M202401010001', memberName: '张三', memberPhone: '138****8888', itemId: 4, itemName: '运动毛巾', points: 200, status: 'redeemed', code: 'EX20250128001', createTime: '2025-01-28T16:00:00', redeemTime: '2025-01-29T10:00:00' },
  { id: 2, memberId: 'M202401010001', memberName: '张三', memberPhone: '138****8888', itemId: 1, itemName: '专业羽毛球拍手胶', points: 200, status: 'pending', code: 'EX20250131001', createTime: '2025-01-31T09:30:00' },
  { id: 3, memberId: 'M202401020002', memberName: '李四', memberPhone: '139****6666', itemId: 3, itemName: '免费缠线服务券', points: 500, status: 'redeemed', code: 'EX20250115001', createTime: '2025-01-15T11:00:00', redeemTime: '2025-01-16T14:00:00' },
  { id: 4, memberId: 'M202402010003', memberName: '王五', memberPhone: '137****9999', itemId: 2, itemName: 'YONEX羽毛球线', points: 350, status: 'pending', code: 'EX20250130001', createTime: '2025-01-30T10:00:00' },
  { id: 5, memberId: 'M202402150004', memberName: '赵六', memberPhone: '136****7777', itemId: 5, itemName: '护腕套装', points: 280, status: 'cancelled', code: 'EX20250120001', createTime: '2025-01-20T09:00:00' },
];

// 状态标签映射
const statusLabelMap: Record<string, string> = {
  pending: '待确认',
  confirmed: '已确认',
  received: '已收件',
  in_progress: '缠线中',
  completed: '已完成',
  delivered: '已取件',
  cancelled: '已取消',
};

// 创建进度记录
function createProgress(status: string, desc: string, time: string, operator?: string): API.ServiceProgress {
  return {
    status: status as API.ServiceStatus,
    label: statusLabelMap[status],
    description: desc,
    operator: operator || '系统',
    createTime: time,
  };
}

// 预约列表
const mockAppointments: API.Appointment[] = [
  {
    id: 1,
    memberId: 'M202401010001',
    memberName: '张三',
    memberPhone: '138****8888',
    serviceType: 'badminton',
    appointmentDate: '2025-02-05',
    timeSlot: '14:00-16:00',
    racketCount: 2,
    requirements: '请使用BG-80线，25磅',
    status: 'in_progress',
    progress: [
      createProgress('pending', '用户提交预约申请', '2025-01-30T10:00:00'),
      createProgress('confirmed', '商家已确认预约', '2025-01-30T14:30:00', '张师傅'),
      createProgress('received', '已收到用户球拍', '2025-02-05T13:50:00', '李前台'),
      createProgress('in_progress', '正在进行缠线服务', '2025-02-05T15:00:00', '王技师'),
    ],
    createTime: '2025-01-30T10:00:00',
  },
  {
    id: 2,
    memberId: 'M202401020002',
    memberName: '李四',
    memberPhone: '139****6666',
    serviceType: 'tennis',
    appointmentDate: '2025-01-28',
    timeSlot: '10:00-12:00',
    racketCount: 1,
    status: 'delivered',
    progress: [
      createProgress('pending', '用户提交预约申请', '2025-01-25T09:00:00'),
      createProgress('confirmed', '商家已确认预约', '2025-01-25T11:00:00', '张师傅'),
      createProgress('received', '已收到用户球拍', '2025-01-28T09:30:00', '李前台'),
      createProgress('in_progress', '正在进行缠线服务', '2025-01-28T10:00:00', '王技师'),
      createProgress('completed', '缠线服务已完成', '2025-01-28T11:30:00', '王技师'),
      createProgress('delivered', '用户已取走球拍', '2025-01-28T14:00:00', '李前台'),
    ],
    createTime: '2025-01-25T09:00:00',
  },
  {
    id: 3,
    memberId: 'M202402010003',
    memberName: '王五',
    memberPhone: '137****9999',
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
  {
    id: 4,
    memberId: 'M202402150004',
    memberName: '赵六',
    memberPhone: '136****7777',
    serviceType: 'tennis',
    appointmentDate: '2025-02-01',
    timeSlot: '09:00-11:00',
    racketCount: 2,
    status: 'received',
    progress: [
      createProgress('pending', '用户提交预约申请', '2025-01-29T14:00:00'),
      createProgress('confirmed', '商家已确认预约', '2025-01-29T16:00:00', '张师傅'),
      createProgress('received', '已收到用户球拍', '2025-02-01T08:30:00', '李前台'),
    ],
    createTime: '2025-01-29T14:00:00',
  },
  {
    id: 5,
    memberId: 'M202403010005',
    memberName: '钱七',
    memberPhone: '135****5555',
    serviceType: 'badminton',
    appointmentDate: '2025-01-20',
    timeSlot: '15:00-17:00',
    racketCount: 1,
    requirements: '加急处理',
    status: 'cancelled',
    progress: [
      createProgress('pending', '用户提交预约申请', '2025-01-18T10:00:00'),
      createProgress('cancelled', '用户取消预约', '2025-01-19T09:00:00', '用户'),
    ],
    createTime: '2025-01-18T10:00:00',
  },
];

// 统计数据
const mockStatistics: API.Statistics = {
  totalMembers: 128,
  todayNewMembers: 3,
  todayPointsEarn: 580,
  todayPointsDeduct: 320,
  todayExchangeCount: 5,
  todayRedeemCount: 3,
};

// 积分规则
const mockPointsRule: API.PointsRule = {
  earnRate: 1,
  deductRate: 0.1,
  validMonths: 12,
  description: '每消费1元可获得1积分，10积分可抵扣1元。积分自获得之日起12个月内有效。',
};

// 管理员信息
const mockAdminInfo: API.AdminInfo = {
  id: 1,
  username: 'admin',
  role: '超级管理员',
  createTime: '2024-01-01T00:00:00',
};

// 店铺信息
const mockShopInfo: API.ShopInfo = {
  id: 1,
  name: '极速体育器材服务中心',
  address: '北京市朝阳区体育路88号羽毛球馆一层',
  phone: '010-88886666',
  businessHours: '周一至周日 09:00-21:00',
  description: '专业提供羽毛球拍、网球拍缠线服务，各类体育器材销售与维护。',
  images: [
    'https://picsum.photos/400/300?random=20',
    'https://picsum.photos/400/300?random=21',
  ],
};

// 时间段
const mockTimeSlots: API.TimeSlot[] = [
  { startTime: '09:00', endTime: '11:00' },
  { startTime: '11:00', endTime: '13:00' },
  { startTime: '14:00', endTime: '16:00' },
  { startTime: '16:00', endTime: '18:00' },
  { startTime: '19:00', endTime: '21:00' },
];

// ========== Mock API 函数 ==========

export const mockApi = {
  // 是否启用 mock
  isEnabled: () => ENABLE_MOCK,

  // 会员管理
  getMemberList: (params: { current?: number; pageSize?: number; keyword?: string }) => {
    let list = [...mockMembers];
    if (params.keyword) {
      list = list.filter(m => m.name.includes(params.keyword!) || m.phone.includes(params.keyword!));
    }
    const start = ((params.current || 1) - 1) * (params.pageSize || 10);
    const end = start + (params.pageSize || 10);
    return Promise.resolve({
      data: list.slice(start, end),
      success: true,
      total: list.length,
    });
  },

  getMemberDetail: (memberId: string) => {
    const member = mockMembers.find(m => m.memberId === memberId);
    return Promise.resolve(member || mockMembers[0]);
  },

  updateMember: (data: API.MemberUpdate) => {
    return Promise.resolve({ success: true });
  },

  // 积分管理
  adjustPoints: (data: API.PointsAdjust) => {
    return Promise.resolve({ success: true });
  },

  redeemPoints: (data: API.PointsRedeem) => {
    return Promise.resolve({ success: true });
  },

  getPointsRecords: (params: { current?: number; pageSize?: number; memberId?: string; type?: string }) => {
    let list = [...mockPointsRecords];
    if (params.memberId) {
      list = list.filter(r => r.memberId === params.memberId);
    }
    if (params.type) {
      list = list.filter(r => r.type === params.type);
    }
    const start = ((params.current || 1) - 1) * (params.pageSize || 10);
    const end = start + (params.pageSize || 10);
    return Promise.resolve({
      data: list.slice(start, end),
      success: true,
      total: list.length,
    });
  },

  // 兑换管理
  getExchangeItems: () => {
    return Promise.resolve(mockExchangeItems);
  },

  addExchangeItem: (data: API.ExchangeItemForm) => {
    const newItem: API.ExchangeItem = {
      ...data,
      id: Date.now(),
      createTime: new Date().toISOString(),
    };
    mockExchangeItems.push(newItem);
    return Promise.resolve({ success: true });
  },

  updateExchangeItem: (id: number, data: API.ExchangeItemForm) => {
    const index = mockExchangeItems.findIndex(i => i.id === id);
    if (index > -1) {
      mockExchangeItems[index] = { ...mockExchangeItems[index], ...data };
    }
    return Promise.resolve({ success: true });
  },

  deleteExchangeItem: (id: number) => {
    const index = mockExchangeItems.findIndex(i => i.id === id);
    if (index > -1) {
      mockExchangeItems.splice(index, 1);
    }
    return Promise.resolve({ success: true });
  },

  getExchangeRecords: (params: { current?: number; pageSize?: number; status?: string }) => {
    let list = [...mockExchangeRecords];
    if (params.status) {
      list = list.filter(r => r.status === params.status);
    }
    const start = ((params.current || 1) - 1) * (params.pageSize || 10);
    const end = start + (params.pageSize || 10);
    return Promise.resolve({
      data: list.slice(start, end),
      success: true,
      total: list.length,
    });
  },

  redeemExchangeRecord: (data: { recordId: number }) => {
    const record = mockExchangeRecords.find(r => r.id === data.recordId);
    if (record) {
      record.status = 'redeemed';
      record.redeemTime = new Date().toISOString();
    }
    return Promise.resolve({ success: true });
  },

  // 预约管理
  getAppointments: (params: { current?: number; pageSize?: number; status?: string; date?: string }) => {
    let list = [...mockAppointments];
    if (params.status) {
      list = list.filter(a => a.status === params.status);
    }
    if (params.date) {
      list = list.filter(a => a.appointmentDate === params.date);
    }
    const start = ((params.current || 1) - 1) * (params.pageSize || 10);
    const end = start + (params.pageSize || 10);
    return Promise.resolve({
      data: list.slice(start, end),
      success: true,
      total: list.length,
    });
  },

  updateAppointmentStatus: (id: number, data: { status: string }) => {
    const appointment = mockAppointments.find(a => a.id === id);
    if (appointment) {
      appointment.status = data.status as any;
    }
    return Promise.resolve({ success: true });
  },

  getAvailableTimeSlots: (date: string) => {
    return Promise.resolve(mockTimeSlots);
  },

  setTimeSlots: (data: { date: string; timeSlots: API.TimeSlot[] }) => {
    return Promise.resolve({ success: true });
  },

  // 更新服务进度
  updateServiceProgress: (id: number, data: { status: API.ServiceStatus; description?: string; operator?: string }) => {
    const appointment = mockAppointments.find(a => a.id === id);
    if (appointment) {
      appointment.status = data.status;
      appointment.progress.push(createProgress(
        data.status,
        data.description || statusLabelMap[data.status],
        new Date().toISOString(),
        data.operator || '系统'
      ));
    }
    return Promise.resolve({ success: true });
  },

  // 统计数据
  getStatistics: () => {
    return Promise.resolve(mockStatistics);
  },

  // 积分规则
  getPointsRule: () => {
    return Promise.resolve(mockPointsRule);
  },

  updatePointsRule: (data: API.PointsRuleForm) => {
    Object.assign(mockPointsRule, data);
    return Promise.resolve({ success: true });
  },

  // 商家登录
  adminLogin: (data: { username: string; password: string }) => {
    if (data.username === 'admin' && data.password === 'admin') {
      return Promise.resolve({
        token: 'mock_token_' + Date.now(),
        adminInfo: mockAdminInfo,
      });
    }
    return Promise.reject(new Error('用户名或密码错误'));
  },

  getAdminInfo: () => {
    return Promise.resolve(mockAdminInfo);
  },

  adminLogout: () => {
    return Promise.resolve({ success: true });
  },
};
