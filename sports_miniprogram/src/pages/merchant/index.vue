<template>
  <view class="page-merchant">
    <!-- 顶部渐变背景 -->
    <view class="header-bg"></view>

    <view class="container">
      <!-- 商家信息卡片 -->
      <view class="merchant-card">
        <view class="card-bg"></view>
        <view class="card-content">
          <view class="merchant-info">
            <view class="merchant-avatar">
              <tn-icon name="store" color="#FFFFFF" size="48" />
            </view>
            <view class="merchant-detail">
              <text class="merchant-name">{{ merchantInfo.name || '商家' }}</text>
              <text class="merchant-role">管理员</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 数据概览 -->
      <view class="stats-cards">
        <view class="stat-card">
          <text class="stat-value">{{ stats.todayAppointments || 0 }}</text>
          <text class="stat-label">今日预约</text>
        </view>
        <view class="stat-card">
          <text class="stat-value">{{ stats.todayPoints || 0 }}</text>
          <text class="stat-label">今日积分发放</text>
        </view>
        <view class="stat-card warning">
          <text class="stat-value">{{ stats.lowStock || 0 }}</text>
          <text class="stat-label">低库存预警</text>
        </view>
      </view>

      <!-- 快捷操作网格 -->
      <view class="quick-actions">
        <view class="section-title">快捷操作</view>
        <view class="action-grid">
          <view class="action-card" @click="goMember">
            <view class="action-icon">
              <tn-icon name="users" color="#FF6B35" size="40" />
            </view>
            <text class="action-name">会员管理</text>
          </view>
          <view class="action-card" @click="goAppointment">
            <view class="action-icon">
              <tn-icon name="calendar" color="#FF6B35" size="40" />
            </view>
            <text class="action-name">预约管理</text>
          </view>
          <view class="action-card" @click="goWire">
            <view class="action-icon">
              <tn-icon name="build" color="#FF6B35" size="40" />
            </view>
            <text class="action-name">线材管理</text>
          </view>
          <view class="action-card" @click="goFinance">
            <view class="action-icon">
              <tn-icon name="chart" color="#FF6B35" size="40" />
            </view>
            <text class="action-name">财务报表</text>
          </view>
        </view>
      </view>

      <!-- 近期预约 -->
      <view class="recent-section">
        <view class="section-header">
          <text class="section-title">近期预约</text>
          <text class="view-all" @click="goAppointment">查看全部</text>
        </view>
        <view class="appointment-list">
          <view v-for="item in recentAppointments" :key="item.id" class="appointment-item">
            <view class="appointment-left">
              <text class="appointment-member">{{ item.memberName }}</text>
              <text class="appointment-service">{{ item.serviceType === 'badminton' ? '羽毛球拍' : '网球拍' }} × {{ item.racketCount }}</text>
            </view>
            <view class="appointment-right">
              <tn-tag :color="statusColor(item.status)" size="sm">{{ statusLabel(item.status) }}</tn-tag>
              <text class="appointment-time">{{ item.timeSlot }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 返回用户端 -->
      <view class="back-to-user" @click="backToUser">
        <tn-icon name="left" color="#FF6B35" size="28" />
        <text>返回用户端</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getMerchantDashboard } from '@/api/merchant';
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue';
import TnTag from '@tuniao/tnui-vue3-uniapp/components/tag/src/tag.vue';

definePage({
  style: {
    navigationBarTitleText: '商家管理',
  },
});

const merchantInfo = ref<any>({});
const stats = ref<any>({});
const recentAppointments = ref<any[]>([]);

onMounted(() => {
  loadDashboard();
});

async function loadDashboard() {
  try {
    const res = await getMerchantDashboard();
    merchantInfo.value = res.data?.merchantInfo || {};
    stats.value = res.data?.stats || {};
    recentAppointments.value = res.data?.recentAppointments || [];
  } catch (e) {
    console.error('加载商家数据失败', e);
    // Mock data
    stats.value = { todayAppointments: 5, todayPoints: 580, lowStock: 2 };
    recentAppointments.value = [
      { id: 1, memberName: '张三', serviceType: 'badminton', racketCount: 2, status: 'pending', timeSlot: '14:00-15:00' },
      { id: 2, memberName: '李四', serviceType: 'tennis', racketCount: 1, status: 'confirmed', timeSlot: '10:00-11:00' },
    ];
  }
}

function statusColor(status: string) {
  const map: Record<string, string> = { pending: 'warning', confirmed: 'primary', in_progress: 'processing', completed: 'success' };
  return map[status] || 'default';
}

function statusLabel(status: string) {
  const map: Record<string, string> = { pending: '待确认', confirmed: '已确认', in_progress: '服务中', completed: '已完成' };
  return map[status] || status;
}

function goMember() { uni.navigateTo({ url: '/pages/merchant/member' }); }
function goAppointment() { uni.navigateTo({ url: '/pages/merchant/appointment' }); }
function goWire() { uni.navigateTo({ url: '/pages/merchant/wire' }); }
function goFinance() { uni.navigateTo({ url: '/pages/merchant/finance' }); }

function backToUser() {
  uni.clearStorageSync();
  uni.reLaunch({ url: '/pages/index/index' });
}
</script>

<style lang="scss" scoped>
.page-merchant {
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

/* 商家卡片 */
.merchant-card {
  background: #FFFFFF;
  border: 1rpx solid #E8E8E8;
  border-radius: 12rpx;
  margin-bottom: 16rpx;
}

.card-content {
  padding: 24rpx;
}

.merchant-info {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.merchant-avatar {
  width: 64rpx;
  height: 64rpx;
  background: #FFF7ED;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.merchant-detail {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.merchant-name {
  color: #1A1A1A;
  font-size: 28rpx;
  font-weight: 600;
}

.merchant-role {
  color: #999999;
  font-size: 22rpx;
}

/* 统计卡片 */
.stats-cards {
  display: flex;
  gap: 12rpx;
  margin-bottom: 16rpx;
  overflow: hidden;
}

.stat-card {
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

.stat-card.warning {
  border-color: #FED7AA;
  background: #FFF7ED;
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

/* 快捷操作 */
.quick-actions {
  margin-bottom: 16rpx;
}

.section-title {
  color: #1A1A1A;
  font-size: 26rpx;
  font-weight: 600;
  margin-bottom: 12rpx;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
}

.action-card {
  background: #FFFFFF;
  border: 1rpx solid #E8E8E8;
  border-radius: 12rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}

.action-icon {
  width: 64rpx;
  height: 64rpx;
  background: #FFF7ED;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-name {
  color: #1A1A1A;
  font-size: 24rpx;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

/* 近期预约 */
.recent-section {
  margin-bottom: 16rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.view-all {
  color: #FF6B35;
  font-size: 24rpx;
}

.appointment-list {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.appointment-item {
  background: #FFFFFF;
  border: 1rpx solid #E8E8E8;
  border-radius: 12rpx;
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.appointment-left {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.appointment-member {
  color: #1A1A1A;
  font-size: 26rpx;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.appointment-service {
  color: #999999;
  font-size: 22rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.appointment-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4rpx;
}

.appointment-time {
  color: #999999;
  font-size: 22rpx;
}

/* 返回用户端 */
.back-to-user {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  padding: 20rpx;
  background: #FFFFFF;
  border: 1rpx solid #E8E8E8;
  border-radius: 12rpx;
  margin-top: 16rpx;
}

.back-to-user text {
  color: #FF6B35;
  font-size: 26rpx;
}
</style>
