<template>
  <view class="page">
    <!-- 未登录 -->
    <view v-if="!isLogin" class="login-container">
      <view class="login-card card">
        <view class="login-title text-lg text-bold text-center mb-base">
          商家登录
        </view>
        
        <tn-form ref="loginFormRef" :model="loginForm">
          <tn-form-item label="账号" required>
            <tn-input
              v-model="loginForm.username"
              placeholder="请输入商家账号"
            />
          </tn-form-item>
          
          <tn-form-item label="密码" required>
            <tn-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              password
            />
          </tn-form-item>
        </tn-form>
        
        <tn-button
          type="primary"
          width="100%"
          margin="40rpx 0 20rpx"
          @click="handleLogin"
        >
          登录
        </tn-button>
      </view>
    </view>
    
    <!-- 已登录 -->
    <view v-else>
      <!-- 功能切换 -->
      <view class="card">
        <tn-tabs
          :list="tabs"
          :current="currentTab"
          @change="handleTabChange"
        />
      </view>
      
      <!-- 会员管理 -->
      <view v-if="currentTab === 0">
        <!-- 搜索 -->
        <view class="card">
          <tn-input
            v-model="searchKeyword"
            placeholder="搜索会员姓名或手机号"
            prefix-icon="search"
            @confirm="searchMember"
          />
        </view>
        
        <!-- 会员列表 -->
        <view class="member-list">
          <view
            v-for="member in memberList"
            :key="member.id"
            class="member-item card"
          >
            <view class="member-info mb-sm">
              <view class="member-name text-base text-bold mb-xs">
                {{ member.name }}
              </view>
              <view class="member-phone text-sm text-secondary">
                {{ member.phone }} | {{ member.level }}级会员
              </view>
            </view>
            <view class="member-points flex-between mb-sm">
              <view>
                <text class="text-xs text-secondary">当前积分:</text>
                <text class="text-lg text-bold text-primary ml-xs">
                  {{ member.points }}
                </text>
              </view>
              <view>
                <text class="text-xs text-secondary">累计消费:</text>
                <text class="text-base text-secondary ml-xs">
                  ¥{{ member.totalSpent }}
                </text>
              </view>
            </view>
            <view class="member-actions flex">
              <tn-button
                size="sm"
                width="48%"
                @click="handleAddPoints(member)"
              >
                增加积分
              </tn-button>
              <tn-button
                size="sm"
                width="48%"
                type="default"
                @click="handleDeductPoints(member)"
              >
                扣除积分
              </tn-button>
            </view>
          </view>
          
          <!-- 空状态 -->
          <view v-if="memberList.length === 0" class="empty-state">
            <tn-empty text="暂无会员" icon="user" />
          </view>
        </view>
      </view>
      
      <!-- 积分管理 -->
      <view v-if="currentTab === 1">
        <!-- 快捷操作 -->
        <view class="card">
          <view class="section-title text-base text-bold text-primary mb-sm">
            快捷操作
          </view>
          <tn-button
            width="100%"
            margin="20rpx 0"
            @click="handleManualAdjust"
          >
            手动调整积分
          </tn-button>
          <tn-button
            type="default"
            width="100%"
            margin="20rpx 0"
            @click="goToPointsRule"
          >
            设置积分规则
          </tn-button>
        </view>
        
        <!-- 积分明细 -->
        <view class="card">
          <view class="section-title text-base text-bold text-primary mb-sm">
            最近积分变动
          </view>
          
          <view
            v-for="item in pointsLog"
            :key="item.id"
            class="log-item"
          >
            <view class="log-info">
              <view class="log-title text-sm mb-xs">{{ item.title }}</view>
              <view class="log-desc text-xs text-secondary">
                {{ item.memberName }} | {{ item.time }}
              </view>
            </view>
            <view
              class="log-amount text-sm"
              :class="item.type === 'income' ? 'income' : 'expense'"
            >
              {{ item.type === 'income' ? '+' : '-' }}{{ item.amount }}
            </view>
          </view>
        </view>
      </view>
      
      <!-- 统计数据 -->
      <view v-if="currentTab === 2">
        <view class="card">
          <view class="section-title text-base text-bold text-primary mb-sm">
            今日数据
          </view>
          <view class="stats-grid">
            <view class="stat-item">
              <view class="stat-value text-lg text-bold text-primary">
                {{ todayStats.memberCount }}
              </view>
              <view class="stat-label text-sm text-secondary">
                会员总数
              </view>
            </view>
            <view class="stat-item">
              <view class="stat-value text-lg text-bold text-accent">
                {{ todayStats.newMemberCount }}
              </view>
              <view class="stat-label text-sm text-secondary">
                新增会员
              </view>
            </view>
            <view class="stat-item">
              <view class="stat-value text-lg text-bold text-primary">
                {{ todayStats.pointsGiven }}
              </view>
              <view class="stat-label text-sm text-secondary">
                今日赠分
              </view>
            </view>
            <view class="stat-item">
              <view class="stat-value text-lg text-bold text-accent">
                {{ todayStats.pointsUsed }}
              </view>
              <view class="stat-label text-sm text-secondary">
                今日扣分
              </view>
            </view>
          </view>
        </view>
        
        <view class="card">
          <view class="section-title text-base text-bold text-primary mb-sm">
            本月数据
          </view>
          <view class="stats-grid">
            <view class="stat-item">
              <view class="stat-value text-lg text-bold text-primary">
                {{ monthStats.totalRevenue }}
              </view>
              <view class="stat-label text-sm text-secondary">
                营业额(元)
              </view>
            </view>
            <view class="stat-item">
              <view class="stat-value text-lg text-bold text-accent">
                {{ monthStats.appointmentCount }}
              </view>
              <view class="stat-label text-sm text-secondary">
                预约次数
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 退出登录 -->
      <view class="card mt-base">
        <tn-button
          type="default"
          width="100%"
          @click="handleLogout"
        >
          退出登录
        </tn-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 登录状态
const isLogin = ref(false)

// 登录表单
const loginForm = ref({
  username: '',
  password: ''
})

// Tab列表
const tabs = [
  { name: '会员管理' },
  { name: '积分管理' },
  { name: '统计数据' }
]

// 当前Tab
const currentTab = ref(0)

// 搜索关键词
const searchKeyword = ref('')

// 会员列表
const memberList = ref([
  {
    id: 1,
    name: '张三',
    phone: '138****1234',
    level: 3,
    points: 350,
    totalSpent: 2300
  },
  {
    id: 2,
    name: '李四',
    phone: '139****5678',
    level: 2,
    points: 120,
    totalSpent: 800
  }
])

// 积分变动日志
const pointsLog = ref([
  {
    id: 1,
    title: '消费赠分',
    memberName: '张三',
    time: '2026-01-30 14:30',
    amount: 50,
    type: 'income'
  },
  {
    id: 2,
    title: '积分抵扣',
    memberName: '李四',
    time: '2026-01-30 10:15',
    amount: 100,
    type: 'expense'
  }
])

// 今日统计数据
const todayStats = ref({
  memberCount: 156,
  newMemberCount: 3,
  pointsGiven: 450,
  pointsUsed: 200
})

// 本月统计数据
const monthStats = ref({
  totalRevenue: 28000,
  appointmentCount: 85
})

// Tab切换
const handleTabChange = (e) => {
  currentTab.value = e.index
}

// 搜索会员
const searchMember = () => {
  console.log('搜索:', searchKeyword.value)
  // TODO: 调用API搜索会员
}

// 增加积分
const handleAddPoints = (member) => {
  uni.showModal({
    title: '增加积分',
    content: `为${member.name}增加积分`,
    editable: true,
    placeholderText: '请输入积分数量',
    success: (res) => {
      if (res.confirm && res.content) {
        const points = parseInt(res.content)
        if (isNaN(points) || points <= 0) {
          uni.showToast({
            title: '请输入有效的积分数量',
            icon: 'none'
          })
          return
        }
        
        // TODO: 调用API增加积分
        uni.showToast({
          title: `已增加${points}积分`,
          icon: 'success'
        })
      }
    }
  })
}

// 扣除积分
const handleDeductPoints = (member) => {
  uni.showModal({
    title: '扣除积分',
    content: `为${member.name}扣除积分`,
    editable: true,
    placeholderText: '请输入积分数量',
    success: (res) => {
      if (res.confirm && res.content) {
        const points = parseInt(res.content)
        if (isNaN(points) || points <= 0) {
          uni.showToast({
            title: '请输入有效的积分数量',
            icon: 'none'
          })
          return
        }
        
        if (points > member.points) {
          uni.showToast({
            title: '积分不足',
            icon: 'none'
          })
          return
        }
        
        // TODO: 调用API扣除积分
        uni.showToast({
          title: `已扣除${points}积分`,
          icon: 'success'
        })
      }
    }
  })
}

// 手动调整积分
const handleManualAdjust = () => {
  uni.showToast({
    title: '功能开发中',
    icon: 'none'
  })
}

// 设置积分规则
const goToPointsRule = () => {
  uni.navigateTo({
    url: '/pages/points-rule/rule'
  })
}

// 商家登录
const handleLogin = () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    uni.showToast({
      title: '请输入账号和密码',
      icon: 'none'
    })
    return
  }
  
  // TODO: 调用API登录
  uni.showLoading({
    title: '登录中...'
  })
  
  setTimeout(() => {
    uni.hideLoading()
    isLogin.value = true
    uni.showToast({
      title: '登录成功',
      icon: 'success'
    })
  }, 1000)
}

// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗?',
    success: (res) => {
      if (res.confirm) {
        isLogin.value = false
        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        })
      }
    }
  })
}

onMounted(() => {
  // TODO: 检查登录状态
})
</script>

<style lang="scss" scoped>
.login-container {
  padding: 40rpx 20rpx;
}

.login-card {
  padding: 40rpx;
}

.login-title {
  color: #1E3A8A;
}

.member-list {
  padding: 0 20rpx;
}

.member-item {
  margin-bottom: 15rpx;
}

.member-actions {
  gap: 15rpx;
}

.log-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1px solid #E5E7EB;
  
  &:last-child {
    border-bottom: none;
  }
  
  .log-amount {
    font-weight: bold;
    
    &.income {
      color: #1E3A8A;
    }
    
    &.expense {
      color: #F97316;
    }
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.stat-item {
  text-align: center;
  padding: 20rpx;
  background-color: #F3F4F6;
  border-radius: 4px;
}

.empty-state {
  padding: 120rpx 0;
}
</style>
