<template>
  <view class="page-profile">
    <view class="container">
      <!-- 用户信息卡片 -->
      <view class="user-card">
        <view class="user-info">
          <view class="user-avatar">
            <image :src="memberInfo.avatar || 'https://picsum.photos/100/100?random=1'" />
          </view>
          <view class="user-detail">
            <text class="user-name">{{ memberInfo.name || '用户' }}</text>
            <text class="user-id">{{ memberInfo.memberId || '' }}</text>
          </view>
          <view class="level-badge">
            <text>{{ memberInfo.level || '普通会员' }}</text>
          </view>
        </view>
      </view>

      <!-- 商家端入口 -->
      <view class="merchant-entry" @click="goMerchant">
        <view class="entry-left">
          <view class="entry-icon">
            <view class="i-carbon-store text-36px text-#FF6B35" />
          </view>
          <view class="entry-text">
            <text class="entry-title">商家管理后台</text>
            <text class="entry-desc">管理会员、线材、预约</text>
          </view>
        </view>
        <view class="i-carbon-chevron-right text-28px text-#CCCCCC" />
      </view>

      <!-- 统计数据 -->
      <view class="stats-row">
        <view class="stat-item">
          <text class="stat-value">{{ memberInfo.points || 0 }}</text>
          <text class="stat-label">积分余额</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">{{ stats.appointments || 0 }}</text>
          <text class="stat-label">本月预约</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">{{ stats.services || 0 }}</text>
          <text class="stat-label">累计服务</text>
        </view>
      </view>

      <!-- 功能菜单 -->
      <view class="menu-section">
        <view class="menu-item" @click="goAppointments">
          <view class="i-carbon-calendar text-32px text-#FF6B35" />
          <text class="menu-text">我的预约</text>
          <view class="i-carbon-chevron-right text-24px text-#CCCCCC" />
        </view>
        <view class="menu-item" @click="goServiceHistory">
          <view class="i-carbon-time text-32px text-#FF6B35" />
          <text class="menu-text">服务历史</text>
          <view class="i-carbon-chevron-right text-24px text-#CCCCCC" />
        </view>
        <view class="menu-item" @click="goScanHistory">
          <view class="i-carbon-scan text-32px text-#FF6B35" />
          <text class="menu-text">扫码记录</text>
          <view class="i-carbon-chevron-right text-24px text-#CCCCCC" />
        </view>
        <view class="menu-item" @click="goShopInfo">
          <view class="i-carbon-store text-32px text-#FF6B35" />
          <text class="menu-text">店铺信息</text>
          <view class="i-carbon-chevron-right text-24px text-#CCCCCC" />
        </view>
        <view class="menu-item" @click="goSettings">
          <view class="i-carbon-settings text-32px text-#FF6B35" />
          <text class="menu-text">设置</text>
          <view class="i-carbon-chevron-right text-24px text-#CCCCCC" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getMemberInfo } from '@/api/member';
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue';

definePage({
  style: {
    navigationBarTitleText: '个人资料',
  },
});

const memberInfo = ref<any>({});
const stats = ref<any>({});

onMounted(() => {
  loadUserInfo();
});

async function loadUserInfo() {
  try {
    const res = await getMemberInfo();
    memberInfo.value = res.data || {};
    stats.value = res.data?.stats || {};
  } catch (e) {
    console.error('加载用户信息失败', e);
  }
}

function goMerchant() { uni.navigateTo({ url: '/pages/merchant/login' }); }
function goAppointments() { uni.navigateTo({ url: '/pages/appointment/list' }); }
function goServiceHistory() { uni.navigateTo({ url: '/pages/service/history' }); }
function goScanHistory() { uni.navigateTo({ url: '/pages/qr/history' }); }
function goShopInfo() { uni.navigateTo({ url: '/pages/shop/info' }); }
function goSettings() { uni.showToast({ title: '功能开发中', icon: 'none' }); }
</script>

<style lang="scss" scoped>
.page-profile {
  min-height: 100vh;
  background: #FAFAFA;
  overflow-x: hidden;
  max-width: 100vw;
}

.container {
  padding: 16rpx 24rpx;
  overflow-x: hidden;
  max-width: 100vw;
}

/* 用户卡片 */
.user-card {
  background: #FFFFFF;
  border: 1rpx solid #E8E8E8;
  border-radius: 12rpx;
  margin-bottom: 16rpx;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 24rpx;
}

.user-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  overflow: hidden;
  background: #F5F5F5;
}

.user-avatar image {
  width: 100%;
  height: 100%;
}

.user-detail {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
  flex: 1;
}

.user-name {
  color: #1A1A1A;
  font-size: 28rpx;
  font-weight: 600;
}

.user-id {
  color: #999999;
  font-size: 22rpx;
}

.level-badge {
  background: #FFF7ED;
  border-radius: 8rpx;
  padding: 6rpx 16rpx;
}

.level-badge text {
  color: #FF6B35;
  font-size: 20rpx;
  font-weight: 500;
}

/* 商家入口 */
.merchant-entry {
  background: #FFF7ED;
  border: 1rpx solid #E8E8E8;
  border-radius: 12rpx;
  margin-bottom: 16rpx;
  padding: 20rpx 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.entry-left {
  display: flex;
  align-items: center;
  gap: 14rpx;
}

.entry-icon {
  width: 56rpx;
  height: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.entry-text {
  display: flex;
  flex-direction: column;
  gap: 2rpx;
}

.entry-title {
  color: #1A1A1A;
  font-size: 26rpx;
  font-weight: 600;
}

.entry-desc {
  color: #999999;
  font-size: 20rpx;
}

/* 统计数据 */
.stats-row {
  display: flex;
  gap: 12rpx;
  margin-bottom: 16rpx;
  overflow: hidden;
}

.stat-item {
  flex: 1;
  background: #FFFFFF;
  border: 1rpx solid #E8E8E8;
  border-radius: 12rpx;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rpx;
  min-width: 0;
  overflow: hidden;
}

.stat-value {
  color: #1A1A1A;
  font-size: 36rpx;
  font-weight: 700;
}

.stat-label {
  color: #999999;
  font-size: 20rpx;
}

/* 功能菜单 */
.menu-section {
  background: #FFFFFF;
  border: 1rpx solid #E8E8E8;
  border-radius: 12rpx;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 14rpx;
  padding: 22rpx 24rpx;
  border-bottom: 1rpx solid #F5F5F5;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-text {
  flex: 1;
  color: #1A1A1A;
  font-size: 26rpx;
}
</style>
