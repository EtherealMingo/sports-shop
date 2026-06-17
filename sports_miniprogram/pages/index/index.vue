<template>
  <view class="page">
    <!-- 极简轮播 - 仅2-3张图片,手动切换 -->
    <view class="swiper-container">
      <tn-swiper
        :list="swiperList"
        :autoplay="false"
        :circular="false"
        :height="360"
        :indicator="{ type: 'dot' }"
        @change="handleSwiperChange"
      />
    </view>

    <!-- 会员信息卡片 -->
    <view class="member-card card card--primary">
      <view class="member-info">
        <view class="text-lg text-bold">{{ memberInfo.name || '会员' }}</view>
        <view class="text-sm mt-xs">手机号: {{ memberInfo.phone || '未绑定' }}</view>
      </view>
      <view class="points-display">
        <view class="text-xs">当前积分</view>
        <view class="points-num text-xl text-bold">{{ memberInfo.points || 0 }}</view>
      </view>
    </view>

    <!-- 核心功能入口 -->
    <view class="card">
      <view class="card-title text-base text-bold text-primary">常用功能</view>
      <view class="function-grid">
        <view class="function-item" @click="goToDetail">
          <view class="function-icon text-accent">💰</view>
          <view class="function-text text-sm mt-xs">积分明细</view>
        </view>
        <view class="function-item" @click="goToRule">
          <view class="function-icon text-accent">📋</view>
          <view class="function-text text-sm mt-xs">积分规则</view>
        </view>
        <view class="function-item" @click="goToReserve">
          <view class="function-icon text-accent">🏸</view>
          <view class="function-text text-sm mt-xs">预约缠线</view>
        </view>
        <view class="function-item" @click="goToExchange">
          <view class="function-icon text-accent">🎁</view>
          <view class="function-text text-sm mt-xs">积分兑换</view>
        </view>
      </view>
    </view>

    <!-- 店铺信息 -->
    <view class="card">
      <view class="card-title text-base text-bold text-primary">店铺信息</view>
      <view class="shop-info mt-sm">
        <view class="info-row flex-between text-sm mb-xs">
          <text class="text-secondary">店铺名称</text>
          <text>{{ shopInfo.name }}</text>
        </view>
        <view class="info-row flex-between text-sm mb-xs">
          <text class="text-secondary">营业时间</text>
          <text>{{ shopInfo.hours }}</text>
        </view>
        <view class="info-row flex-between text-sm">
          <text class="text-secondary">联系电话</text>
          <text class="text-primary">{{ shopInfo.phone }}</text>
        </view>
      </view>
      <view class="shop-address text-sm text-secondary mt-base">
        📍 {{ shopInfo.address }}
      </view>
    </view>

    <!-- 快捷入口 - 商家端 -->
    <view class="card" v-if="isMerchant">
      <view class="card-title text-base text-bold text-primary">商家管理</view>
      <view class="function-grid">
        <view class="function-item" @click="goToMerchant">
          <view class="function-icon text-primary">👥</view>
          <view class="function-text text-sm mt-xs">会员管理</view>
        </view>
        <view class="function-item" @click="goToPointsManage">
          <view class="function-icon text-primary">📊</view>
          <view class="function-text text-sm mt-xs">积分管理</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 轮播图列表 - 店铺实景/球拍缠线过程
const swiperList = ref([
  'https://example.com/shop1.jpg', // 占位:店铺实景
  'https://example.com/service1.jpg', // 占位:球拍缠线过程
  'https://example.com/equipment1.jpg' // 占位:器材陈列
])

// 会员信息
const memberInfo = ref({
  name: '张三',
  phone: '138****1234',
  points: 350
})

// 店铺信息
const shopInfo = ref({
  name: '运动器材专卖店',
  hours: '9:00-21:00',
  phone: '021-12345678',
  address: '上海市浦东新区XX路XX号'
})

// 是否是商家
const isMerchant = ref(false)

// 轮播切换
const handleSwiperChange = (e) => {
  console.log('当前轮播索引:', e.current)
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

// 跳转预约缠线
const goToReserve = () => {
  uni.switchTab({
    url: '/pages/reserve/reserve'
  })
}

// 跳转积分兑换
const goToExchange = () => {
  uni.showToast({
    title: '积分兑换功能开发中',
    icon: 'none'
  })
}

// 跳转商家管理
const goToMerchant = () => {
  uni.navigateTo({
    url: '/pages/merchant/merchant'
  })
}

// 跳转积分管理
const goToPointsManage = () => {
  uni.navigateTo({
    url: '/pages/merchant/merchant?type=points'
  })
}

onMounted(() => {
  // TODO: 从本地存储获取会员信息
  // TODO: 从API获取店铺信息
})
</script>

<style lang="scss" scoped>
.swiper-container {
  margin-bottom: 20rpx;
  
  :deep(.tn-swiper) {
    border-radius: 0;
  }
}

.member-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .points-display {
    text-align: center;
    
    .points-num {
      font-size: 48rpx;
      color: #F97316;
      margin-top: 10rpx;
    }
  }
}

.card-title {
  padding-bottom: 20rpx;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 20rpx;
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20rpx;
}

.function-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;
  
  .function-icon {
    font-size: 48rpx;
  }
  
  .function-text {
    color: #1F2937;
  }
}

.info-row {
  padding: 12rpx 0;
  border-bottom: 1px solid #F3F4F6;
  
  &:last-child {
    border-bottom: none;
  }
}

.shop-address {
  line-height: 1.6;
  padding: 16rpx;
  background-color: #F3F4F6;
  border-radius: 4px;
}
</style>
