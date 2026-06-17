declare namespace API {
  // ========== 通用类型 ==========
  type ResponseList<T> = {
    data?: T[];
    success?: boolean;
    total?: number;
  };

  // ========== 会员相关 ==========
  interface Member {
    id: number;
    memberId: string;
    name: string;
    phone: string;
    avatar?: string;
    level: string;
    points: number;
    registerTime: string;
    lastConsumeTime?: string;
  }

  interface MemberUpdate {
    id: number;
    name?: string;
    phone?: string;
    level?: string;
  }

  // ========== 积分相关 ==========
  interface PointsRecord {
    id: number;
    memberId: string;
    memberName?: string;
    memberPhone?: string;
    points: number;
    type: 'earn' | 'deduct';
    reason: string;
    createTime: string;
  }

  interface PointsAdjust {
    memberId: string;
    points: number;
    reason: string;
    type: 'add' | 'deduct';
  }

  interface PointsRedeem {
    memberId: string;
    amount: number;
    consumeType: 'service' | 'product';
    usePoints?: number;
  }

  // ========== 兑换相关 ==========
  interface ExchangeItem {
    id: number;
    name: string;
    description: string;
    points: number;
    stock: number;
    image: string;
    type: 'product' | 'service';
    status: 'active' | 'inactive';
    createTime?: string;
  }

  interface ExchangeItemForm {
    id?: number;
    name: string;
    description: string;
    points: number;
    stock: number;
    image: string;
    type: 'product' | 'service';
    status: 'active' | 'inactive';
  }

  interface ExchangeRecord {
    id: number;
    memberId: string;
    memberName?: string;
    memberPhone?: string;
    itemId: number;
    itemName: string;
    points: number;
    status: 'pending' | 'redeemed' | 'cancelled';
    code: string;
    createTime: string;
    redeemTime?: string;
  }

  // ========== 服务进度状态 ==========
  type ServiceStatus =
    | 'pending'      // 待确认
    | 'confirmed'    // 已确认
    | 'received'     // 已收件
    | 'in_progress'  // 缠线中
    | 'completed'    // 已完成
    | 'delivered'    // 已取件
    | 'cancelled';   // 已取消

  interface ServiceProgress {
    status: ServiceStatus;
    label: string;
    description: string;
    operator?: string;
    createTime: string;
  }

  // ========== 预约相关 ==========
  interface Appointment {
    id: number;
    memberId: string;
    memberName?: string;
    memberPhone?: string;
    serviceType: 'badminton' | 'tennis';
    appointmentDate: string;
    timeSlot: string;
    racketCount: number;
    requirements?: string;
    status: ServiceStatus;
    progress: ServiceProgress[];
    createTime: string;
  }

  interface TimeSlot {
    startTime: string;
    endTime: string;
  }

  // ========== 统计相关 ==========
  interface Statistics {
    totalMembers: number;
    todayNewMembers: number;
    todayPointsEarn: number;
    todayPointsDeduct: number;
    todayExchangeCount: number;
    todayRedeemCount: number;
  }

  // ========== 积分规则 ==========
  interface PointsRule {
    earnRate: number;
    deductRate: number;
    validMonths: number;
    description: string;
  }

  interface PointsRuleForm {
    earnRate: number;
    deductRate: number;
    validMonths: number;
    description: string;
  }

  // ========== 管理员相关 ==========
  interface AdminInfo {
    id: number;
    username: string;
    role: string;
    createTime: string;
  }

  // ========== 店铺信息 ==========
  interface ShopInfo {
    id: number;
    name: string;
    address: string;
    phone: string;
    businessHours: string;
    description: string;
    images: string[];
  }
}
