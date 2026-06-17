/**
 * 会员信息类型
 */
export interface IMember {
  id: number
  memberId: string
  name: string
  phone: string
  points: number
  level: string
  avatar?: string
  registerTime: string
  lastConsumeTime?: string
}

/**
 * 积分明细类型
 */
export interface IPointsRecord {
  id: number
  memberId: string
  points: number
  type: 'earn' | 'deduct'
  reason: string
  createTime: string
}

/**
 * 兑换商品类型
 */
export interface IExchangeItem {
  id: number
  name: string
  description: string
  points: number
  stock: number
  image: string
  type: 'product' | 'service'
  status: 'active' | 'inactive'
}

/**
 * 兑换记录类型
 */
export interface IExchangeRecord {
  id: number
  memberId: string
  itemId: number
  itemName: string
  points: number
  status: 'pending' | 'redeemed' | 'cancelled'
  code: string
  createTime: string
  redeemTime?: string
}

/**
 * 服务进度状态
 */
export type ServiceStatus =
  | 'pending'      // 待确认
  | 'confirmed'    // 已确认
  | 'received'     // 已收件
  | 'in_progress'  // 缠线中
  | 'completed'    // 已完成
  | 'delivered'    // 已取件
  | 'cancelled'    // 已取消

/**
 * 预约/服务类型
 */
export interface IAppointment {
  id: number
  memberId: string
  serviceType: 'badminton' | 'tennis'
  appointmentDate: string
  timeSlot: string
  racketCount: number
  requirements?: string
  status: ServiceStatus
  progress: IServiceProgress[]
  createTime: string
}

/**
 * 服务进度记录
 */
export interface IServiceProgress {
  status: ServiceStatus
  label: string
  description: string
  operator?: string
  createTime: string
}

/**
 * 店铺信息类型
 */
export interface IShopInfo {
  name: string
  address: string
  phone: string
  businessHours: string
  description: string
  images: string[]
}

/**
 * 积分规则类型
 */
export interface IPointsRule {
  earnRate: number
  deductRate: number
  validMonths: number
  description: string
}
