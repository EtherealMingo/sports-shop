<template>
  <view class="page">
    <!-- 未登录状态 -->
    <view v-if="!isLogin" class="login-container">
      <view class="login-card card">
        <view class="login-title text-lg text-bold text-center mb-base">会员登录</view>
        
        <tn-form ref="loginFormRef" :model="loginForm">
          <tn-form-item label="手机号">
            <tn-input
              v-model="loginForm.phone"
              placeholder="请输入手机号"
              maxlength="11"
              type="number"
            />
          </tn-form-item>
          
          <tn-form-item label="验证码">
            <view class="code-input-wrapper flex">
              <tn-input
                v-model="loginForm.code"
                placeholder="请输入验证码"
                maxlength="6"
                type="number"
              />
              <tn-button
                :disabled="codeCountdown > 0"
                size="sm"
                @click="sendCode"
              >
                {{ codeCountdown > 0 ? `${codeCountdown}s后重发` : '获取验证码' }}
              </tn-button>
            </view>
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
        
        <view class="register-tip text-sm text-center text-secondary">
          还不是会员?
          <text class="text-primary" @click="handleRegister">立即注册</text>
        </view>
      </view>
    </view>
    
    <!-- 已登录状态 -->
    <view v-else>
      <!-- 会员信息卡片 -->
      <view class="card card--primary">
        <view class="user-info flex-between mb-sm">
          <view>
            <view class="text-lg text-bold">{{ memberInfo.name }}</view>
            <view class="text-xs mt-xs">{{ memberInfo.phone }}</view>
          </view>
          <view class="user-level text-xs">
            {{ memberInfo.level }}级会员
          </view>
        </view>
        <view class="points-section flex-center mt-sm">
          <view class="points-label text-sm">当前积分</view>
          <view class="points-value text-bold" style="font-size: 56rpx;">
            {{ memberInfo.points }}
          </view>
        </view>
      </view>
      
      <!-- 快捷操作 -->
      <view class="card">
        <view class="quick-action flex-between">
          <view class="action-item" @click="goToDetail">
            <view class="action-num text-lg text-bold">{{ memberInfo.points }}</view>
            <view class="action-label text-sm text-secondary">可用积分</view>
          </view>
          <view class="divider"></view>
          <view class="action-item" @click="goToDetail">
            <view class="action-num text-lg text-bold">{{ memberInfo.earnedThisMonth || 0 }}</view>
            <view class="action-label text-sm text-secondary">本月获得</view>
          </view>
          <view class="divider"></view>
          <view class="action-item" @click="goToDetail">
            <view class="action-num text-lg text-bold">{{ memberInfo.usedThisMonth || 0 }}</view>
            <view class="action-label text-sm text-secondary">本月使用</view>
          </view>
        </view>
      </view>
      
      <!-- 功能列表 -->
      <view class="card">
        <tn-list>
          <tn-list-item
            title="积分明细"
            note="查看消费、抵扣、兑换记录"
            arrow
            @click="goToDetail"
          />
          <tn-list-item
            title="积分规则"
            note="了解如何获取和使用积分"
            arrow
            @click="goToRule"
          />
          <tn-list-item
            title="我的预约"
            note="查看缠线服务预约记录"
            arrow
            @click="goToMyReserve"
          />
          <tn-list-item
            title="设置"
            note="账户设置和帮助"
            arrow
            @click="goToSettings"
          />
        </tn-list>
      </view>
      
      <!-- 退出登录按钮 -->
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
  phone: '',
  code: ''
})

// 验证码倒计时
const codeCountdown = ref(0)

// 会员信息
const memberInfo = ref({
  name: '张三',
  phone: '138****1234',
  level: 3,
  points: 350,
  earnedThisMonth: 200,
  usedThisMonth: 100
})

// 发送验证码
const sendCode = () => {
  if (!loginForm.value.phone) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none'
    })
    return
  }
  
  if (!/^1[3-9]\d{9}$/.test(loginForm.value.phone)) {
    uni.showToast({
      title: '手机号格式错误',
      icon: 'none'
    })
    return
  }
  
  // TODO: 调用API发送验证码
  uni.showToast({
    title: '验证码已发送',
    icon: 'success'
  })
  
  // 倒计时
  codeCountdown.value = 60
  const timer = setInterval(() => {
    codeCountdown.value--
    if (codeCountdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

// 登录
const handleLogin = () => {
  if (!loginForm.value.phone || !loginForm.value.code) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none'
    })
    return
  }
  
  // TODO: 调用API登录
  uni.showToast({
    title: '登录成功',
    icon: 'success'
  })
  
  isLogin.value = true
  
  // TODO: 保存token到本地存储
}

// 注册
const handleRegister = () => {
  uni.showToast({
    title: '注册功能开发中',
    icon: 'none'
  })
}

// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗?',
    success: (res) => {
      if (res.confirm) {
        isLogin.value = false
        // TODO: 清除本地存储的token
        
        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        })
      }
    }
  })
}

// 跳转积分明细
const goToDetail = () => {
  uni.navigateTo({
    url: '/pages/points-detail/detail'
  })
}

// 跳转积分规则
const goToRule = () => {
  uni.navigateTo({
    url: '/pages/points-rule/rule'
  })
}

// 跳转我的预约
const goToMyReserve = () => {
  uni.showToast({
    title: '我的预约功能开发中',
    icon: 'none'
  })
}

// 跳转设置
const goToSettings = () => {
  uni.showToast({
    title: '设置功能开发中',
    icon: 'none'
  })
}

onMounted(() => {
  // TODO: 检查本地存储的登录状态
  // const token = uni.getStorageSync('token')
  // if (token) {
  //   isLogin.value = true
  // }
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

.code-input-wrapper {
  gap: 20rpx;
  
  .tn-input {
    flex: 1;
  }
}

.register-tip {
  margin-top: 40rpx;
}

.user-info {
  .user-level {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 8rpx 20rpx;
    border-radius: 4px;
  }
}

.points-section {
  flex-direction: column;
  margin-top: 40rpx;
  
  .points-label {
    margin-bottom: 10rpx;
  }
  
  .points-value {
    color: #F97316;
  }
}

.quick-action {
  padding: 30rpx 0;
  
  .action-item {
    flex: 1;
    text-align: center;
    
    .action-num {
      color: #1E3A8A;
      margin-bottom: 10rpx;
    }
  }
  
  .divider {
    width: 1px;
    background-color: #E5E7EB;
  }
}
</style>
