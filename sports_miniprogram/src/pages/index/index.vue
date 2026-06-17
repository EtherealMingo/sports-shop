<template>
  <view class="page-home">
    <!-- 顶部区域 - 纯文字极简 -->
    <view class="header-area">
      <view class="header-top">
        <view class="user-greeting">
          <image class="avatar" :src="memberInfo.avatar || '/static/avatar.png'" mode="aspectFill" />
          <text class="greeting">{{ memberInfo.name || '点击登录' }}</text>
        </view>
        <view class="header-actions">
          <view class="icon-btn" @click="goScan">
            <view class="i-carbon-scan text-24px text-#2A2A26" />
          </view>
          <view class="icon-btn" @click="goNotifications">
            <view class="i-carbon-notification text-24px text-#2A2A26" />
            <view v-if="unreadCount > 0" class="badge">{{ unreadCount }}</view>
          </view>
        </view>
      </view>
      <view class="shop-name">{{ shopInfo.name || '体育器材服务' }}</view>
      <view class="shop-addr" v-if="shopInfo.address">
        <view class="i-carbon-location text-14px text-#8A8A84" />
        <text class="addr-text">{{ shopInfo.address }}</text>
      </view>
    </view>

    <!-- 积分卡片 - 核心数据突出 -->
    <view class="points-card" @click="goPointsDetail">
      <view class="points-main">
        <text class="points-label">积分余额</text>
        <text class="points-value">{{ memberInfo.points || 0 }}</text>
      </view>
      <view class="points-side">
        <view class="sign-btn" :class="{ signed: signedToday }" @click.stop="handleSign">
          <view :class="signedToday ? 'i-carbon-checkmark' : 'i-carbon-add'" class="text-18px" />
          <text>{{ signedToday ? '已签到' : '签到' }}</text>
        </view>
      </view>
    </view>

    <!-- 核心功能区 - 四宫格 -->
    <view class="main-grid">
      <view class="grid-item" @click="goExchange">
        <view class="grid-icon">
          <view class="i-carbon-gift text-28px text-#C2652E" />
        </view>
        <text class="grid-label">积分兑换</text>
      </view>
      <view class="grid-item" @click="goAppointment">
        <view class="grid-icon">
          <view class="i-carbon-calendar text-28px text-#C2652E" />
        </view>
        <text class="grid-label">缠线预约</text>
      </view>
      <view class="grid-item" @click="goScan">
        <view class="grid-icon">
          <view class="i-carbon-scan text-28px text-#C2652E" />
        </view>
        <text class="grid-label">扫码使用</text>
      </view>
      <view class="grid-item" @click="goMerchant">
        <view class="grid-icon">
          <view class="i-carbon-store text-28px text-#C2652E" />
        </view>
        <text class="grid-label">商家入口</text>
      </view>
    </view>

    <!-- 热门兑换 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">热门兑换</text>
        <view class="section-more" @click="goExchange">
          <text>全部</text>
          <view class="i-carbon-chevron-right text-16px text-#8A8A84" />
        </view>
      </view>
      <scroll-view scroll-x class="goods-scroll">
        <view v-for="item in hotGoods" :key="item.id" class="goods-card" @click="goExchange">
          <image class="goods-img" :src="item.image" mode="aspectFill" />
          <view class="goods-info">
            <text class="goods-name">{{ item.name }}</text>
            <text class="goods-points">{{ item.points }} 积分</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 快捷入口 - 列表式 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">更多</text>
      </view>
      <view class="menu-list">
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
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getMemberInfo, dailySign, getHotGoods, getShopInfo } from '@/api/member';

definePage({
  style: {
    navigationBarTitleText: '首页',
  },
});

const memberInfo = ref<any>({});
const signedToday = ref(false);
const unreadCount = ref(0);
const hotGoods = ref<any[]>([]);
const shopInfo = ref<any>({});

onMounted(() => {
  loadData();
});

async function loadData() {
  try {
    const [memberRes, goodsRes, shopRes] = await Promise.all([
      getMemberInfo(),
      getHotGoods(),
      getShopInfo(),
    ]);
    memberInfo.value = memberRes.data || {};
    signedToday.value = memberRes.data?.signedToday || false;
    hotGoods.value = goodsRes.data || [];
    shopInfo.value = shopRes.data || {};
  } catch (e) {
    console.error('加载数据失败', e);
  }
}

async function handleSign() {
  if (signedToday.value) return;
  try {
    await dailySign();
    signedToday.value = true;
    memberInfo.value.points += 1;
    uni.showToast({ title: '签到成功 +1', icon: 'success' });
  } catch (e: any) {
    uni.showToast({ title: e.message || '签到失败', icon: 'none' });
  }
}

function goPointsDetail() { uni.navigateTo({ url: '/pages/points/index' }); }
function goExchange() { uni.navigateTo({ url: '/pages/points/exchange' }); }
function goAppointment() { uni.navigateTo({ url: '/pages/appointment/book' }); }
function goScan() { uni.navigateTo({ url: '/pages/qr/scan' }); }
function goMerchant() { uni.navigateTo({ url: '/pages/merchant/login' }); }
function goNotifications() { uni.showToast({ title: '暂无通知', icon: 'none' }); }
function goServiceHistory() { uni.navigateTo({ url: '/pages/service/history' }); }
function goScanHistory() { uni.navigateTo({ url: '/pages/qr/my-scans' }); }
function goShopInfo() { uni.navigateTo({ url: '/pages/shop/info' }); }
function goPointsRule() { uni.navigateTo({ url: '/pages/points/rule' }); }
</script>

<style lang="scss" scoped>
.page-home {
  min-height: 100vh;
  background: #FAFAF8;
  padding: 0 40rpx 120rpx;
}

/* 顶部区域 */
.header-area {
  padding-top: 80rpx;
  margin-bottom: 48rpx;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
}

.user-greeting {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.avatar {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  background: #E8E8E3;
}

.greeting {
  font-size: 30rpx;
  font-weight: 500;
  color: #2A2A26;
}

.header-actions {
  display: flex;
  gap: 8rpx;
}

.icon-btn {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.badge {
  position: absolute;
  top: -2rpx;
  right: -2rpx;
  min-width: 24rpx;
  height: 24rpx;
  background: #C24848;
  border-radius: 12rpx;
  color: #FFFFFF;
  font-size: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4rpx;
}

.shop-name {
  font-size: 40rpx;
  font-weight: 700;
  color: #2A2A26;
  letter-spacing: -0.5rpx;
  margin-bottom: 8rpx;
}

.shop-addr {
  display: flex;
  align-items: center;
  gap: 6rpx;
}

.addr-text {
  font-size: 24rpx;
  color: #8A8A84;
}

/* 积分卡片 */
.points-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40rpx 36rpx;
  background: #FFFFFF;
  border-radius: 20rpx;
  margin-bottom: 48rpx;
  border: 1rpx solid #E8E8E3;
}

.points-main {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.points-label {
  font-size: 24rpx;
  color: #8A8A84;
}

.points-value {
  font-size: 52rpx;
  font-weight: 700;
  color: #2A2A26;
  letter-spacing: -1rpx;
  line-height: 1;
}

.sign-btn {
  display: flex;
  align-items: center;
  gap: 6rpx;
  background: #2A2A26;
  border-radius: 32rpx;
  padding: 14rpx 28rpx;
  color: #FFFFFF;
  font-size: 22rpx;
  font-weight: 500;
}

.sign-btn.signed {
  background: #F3F3F0;
  color: #8A8A84;
}

/* 核心功能区 - 四宫格 */
.main-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24rpx;
  margin-bottom: 56rpx;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
}

.grid-icon {
  width: 72rpx;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F3F3F0;
  border-radius: 16rpx;
}

.grid-label {
  font-size: 22rpx;
  color: #2A2A26;
  font-weight: 500;
}

/* Section */
.section {
  margin-bottom: 48rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #2A2A26;
}

.section-more {
  display: flex;
  align-items: center;
  gap: 4rpx;
  color: #8A8A84;
  font-size: 22rpx;
}

/* 商品滚动 */
.goods-scroll {
  margin: 0 -40rpx;
  padding: 0 40rpx;
  white-space: nowrap;
}

.goods-card {
  display: inline-block;
  width: 200rpx;
  margin-right: 16rpx;
  border-radius: 12rpx;
  overflow: hidden;
  border: 1rpx solid #E8E8E3;
}

.goods-img {
  width: 200rpx;
  height: 200rpx;
  background: #F3F3F0;
}

.goods-info {
  padding: 14rpx 16rpx;
}

.goods-name {
  display: block;
  font-size: 24rpx;
  color: #2A2A26;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 4rpx;
}

.goods-points {
  font-size: 20rpx;
  color: #C2652E;
  font-weight: 600;
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
