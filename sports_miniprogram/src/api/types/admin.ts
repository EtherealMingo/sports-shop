/**
 * 商家登录表单
 */
export interface IAdminLoginForm {
  username: string
  password: string
}

/**
 * 商家信息类型
 */
export interface IAdminInfo {
  id: number
  username: string
  role: string
  createTime: string
}

/**
 * 会员列表查询参数
 */
export interface IMemberListParams {
  page?: number
  pageSize?: number
  keyword?: string
}

/**
 * 积分调整类型
 */
export interface IPointsAdjustParams {
  memberId: string
  points: number
  reason: string
  type: 'add' | 'deduct'
}

/**
 * 积分核销类型
 */
export interface IPointsRedeemParams {
  memberId: string
  amount: number
  consumeType: 'service' | 'product'
  usePoints?: number
}

/**
 * 统计数据类型
 */
export interface IStatisticsData {
  totalMembers: number
  todayNewMembers: number
  todayPointsEarn: number
  todayPointsDeduct: number
  todayExchangeCount: number
  todayRedeemCount: number
}

/**
 * 兑换商品管理类型
 */
export interface IExchangeItemManage {
  id?: number
  name: string
  description: string
  points: number
  stock: number
  image: string
  type: 'product' | 'service'
  status: 'active' | 'inactive'
}

/**
 * 核销兑换记录类型
 */
export interface IRedeemExchangeParams {
  recordId: number
}

/**
 * 预约管理类型
 */
export interface IAppointmentManageParams {
  id: number
  status: 'confirmed' | 'completed' | 'cancelled'
}

/**
 * 时间段类型
 */
export interface ITimeSlot {
  startTime: string
  endTime: string
}

/**
 * 积分规则设置类型
 */
export interface IPointsRuleSetting {
  earnRate: number
  deductRate: number
  validMonths: number
  description: string
}
