<template>
  <view class="page-me">
    <!-- 用户信息 - 极简卡片 -->
    <view class="user-section">
      <view class="user-info">
        <image class="avatar" :src="memberInfo.avatar || '/static/avatar.png'" mode="aspectFill" />
        <view class="info">
          <text class="name">{{ memberInfo.name || '点击登录' }}</text>
          <text class="level">{{ memberInfo.level || '普通会员' }}</text>
        </view>
      </view>
    </view>

    <!-- 商家端入口 - 低调处理 -->
    <view class="merchant-entry" @click="goMerchant">
      <view class="i-carbon-store text-20px text-#C2652E" />
      <text class="entry-text">商家管理后台</text>
      <view class="i-carbon-chevron-right text-18px text-#C8C8C3" />
    </view>

    <!-- 统计数据 - 纯数字展示 -->
    <view class="stats-row">
      <view class="stat-item">
        <text class="stat-value">{{ memberInfo.points || 0 }}</text>
        <text class="stat-label">积分</text>
      </view>
      <view class="stat-divider" />
      <view class="stat-item">
        <text class="stat-value">{{ stats.appointments || 0 }}</text>
        <text class="stat-label">本月预约</text>
      </view>
      <view class="stat-divider" />
      <view class="stat-item">
        <text class="stat-value">{{ stats.services || 0 }}</text>
        <text class="stat-label">累计服务</text>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="menu-list">
      <view class="menu-item" @click="goAppointments">
        <view class="i-carbon-calendar text-22px text-#C2652E" />
        <text class="menu-text">我的预约</text>
        <view class="i-carbon-chevron-right text-18px text-#C8C8C3" />
      </view>
      <view class="menu-item" @click="goServiceHistory">
        <view class="i-carbon-time text-22px text-#C2652E" />
        <text class="menu-text">服务历史</text>
        <view class="i-carbon-chevron-right text-18px text-#C8C8C3" />
      </view>
      <view class="menu-item" @click="goScanHistory">
        <view class="i-carbon-qr-code text-22px text-#C2652E" />
        <text class="menu-text">扫码记录</text>
        <view class="i-carbon-chevron-right text-18px text-#C8C8C3" />
      </view>
      <view class="menu-item" @click="goShopInfo">
        <view class="i-carbon-store text-22px text-#C2652E" />
        <text class="menu-text">店铺信息</text>
        <view class="i-carbon-chevron-right text-18px text-#C8C8C3" />
      </view>
      <view class="menu-item" @click="goPointsRule">
        <view class="i-carbon-information text-22px text-#C2652E" />
        <text class="menu-text">积分规则</text>
        <view class="i-carbon-chevron-right text-18px text-#C8C8C3" />
      </view>
      <view class="menu-item" @click="goSettings">
        <view class="i-carbon-settings text-22px text-#C2652E" />
        <text class="menu-text">设置</text>
        <view class="i-carbon-chevron-right text-18px text-#C8C8C3" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getMemberInfo } from '@/api/member';

definePage({
  style: {
    navigationBarTitleText: '我的',
  },
});

const memberInfo = ref<any>({});
const stats = ref<any>({});

onMounted(() => {
  loadData();
});

async function loadData() {
  try {
    const res = await getMemberInfo();
    memberInfo.value = res.data || {};
    stats.value = res.data?.stats || {};
  } catch (e) {
    console.error('加载用户数据失败', e);
  }
}

function goMerchant() { uni.navigateTo({ url: '/pages/merchant/login' }); }
function goAppointments() { uni.navigateTo({ url: '/pages/appointment/list' }); }
function goServiceHistory() { uni.navigateTo({ url: '/pages/service/history' }); }
function goScanHistory() { uni.navigateTo({ url: '/pages/qr/my-scans' }); }
function goShopInfo() { uni.navigateTo({ url: '/pages/shop/info' }); }
function goPointsRule() { uni.navigateTo({ url: '/pages/points/rule' }); }
function goSettings() { uni.showToast({ title: '功能开发中', icon: 'none' }); }
</script>

<style lang="scss" scoped>
.page-me {
  min-height: 100vh;
  background: #FAFAF8;
  padding: 0 40rpx 120rpx;
}

/* 用户信息 */
.user-section {
  padding-top: 80rpx;
  margin-bottom: 48rpx;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: #E8E8E3;
}

.info .name {
  display: block;
  font-size: 34rpx;
  font-weight: 600;
  color: #2A2A26;
  letter-spacing: -0.5rpx;
}

.info .level {
  display: block;
  font-size: 22rpx;
  color: #8A8A84;
  margin-top: 4rpx;
}

/* 商家入口 */
.merchant-entry {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 28rpx 32rpx;
  background: #F3F3F0;
  border-radius: 16rpx;
  margin-bottom: 40rpx;
}

.entry-text {
  flex: 1;
  font-size: 26rpx;
  color: #2A2A26;
  font-weight: 500;
}

/* 统计数据 */
.stats-row {
  display: flex;
  align-items: center;
  padding: 40rpx 32rpx;
  background: #FFFFFF;
  border-radius: 20rpx;
  border: 1rpx solid #E8E8E3;
  margin-bottom: 48rpx;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rpx;
}

.stat-divider {
  width: 1rpx;
  height: 48rpx;
  background: #E8E8E3;
}

.stat-value {
  font-size: 40rpx;
  font-weight: 700;
  color: #2A2A26;
  letter-spacing: -0.5rpx;
}

.stat-label {
  font-size: 20rpx;
  color: #8A8A84;
}

/* 菜单列表 */
.menu-list {
  background: #FFFFFF;
  border-radius: 20rpx;
  border: 1rpx solid #E8E8E3;
  padding: 8rpx 32rpx;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 28rpx 0;
  border-bottom: 1rpx solid #F3F3F0;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-text {
  flex: 1;
  font-size: 26rpx;
  color: #2A2A26;
}
</style>
