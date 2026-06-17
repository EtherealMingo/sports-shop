<template>
  <view class="page-points">
    <!-- 积分数字展示 -->
    <view class="points-header">
      <text class="points-value">{{ points }}</text>
      <text class="points-label">积分余额</text>
    </view>

    <!-- 操作按钮 - 极简 -->
    <view class="actions-row">
      <view class="action-btn" @click="goExchange">
        <view class="i-carbon-gift text-20px text-#C2652E" />
        <text>兑换</text>
      </view>
      <view class="action-btn" @click="goRule">
        <view class="i-carbon-information text-20px text-#C2652E" />
        <text>规则</text>
      </view>
    </view>

    <!-- Tab -->
    <view class="tab-bar">
      <view class="tab-item" :class="{ active: activeTab === 'records' }" @click="activeTab = 'records'">
        <text>积分明细</text>
      </view>
      <view class="tab-item" :class="{ active: activeTab === 'exchange' }" @click="activeTab = 'exchange'">
        <text>兑换记录</text>
      </view>
    </view>

    <!-- 积分明细 -->
    <view v-if="activeTab === 'records'" class="tab-content">
      <view v-if="records.length === 0" class="empty-state">
        <text class="empty-text">暂无积分记录</text>
      </view>
      <view v-else class="records-list">
        <view v-for="item in records" :key="item.id" class="record-item">
          <view class="record-left">
            <text class="record-reason">{{ item.reason }}</text>
            <text class="record-time">{{ item.createTime }}</text>
          </view>
          <text :class="['record-points', item.type]">
            {{ item.type === 'earn' ? '+' : '-' }}{{ item.points }}
          </text>
        </view>
      </view>
    </view>

    <!-- 兑换记录 -->
    <view v-if="activeTab === 'exchange'" class="tab-content">
      <view v-if="exchangeRecords.length === 0" class="empty-state">
        <text class="empty-text">暂无兑换记录</text>
      </view>
      <view v-else class="exchange-list">
        <view v-for="item in exchangeRecords" :key="item.id" class="exchange-item">
          <view class="exchange-info">
            <text class="exchange-name">{{ item.itemName }}</text>
            <text class="exchange-time">{{ item.createTime }}</text>
          </view>
          <view class="exchange-right">
            <text class="exchange-points">-{{ item.points }}</text>
            <tn-tag :color="statusColor(item.status)" size="sm">{{ statusLabel(item.status) }}</tn-tag>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPointsRecords } from '@/api/member';
import TnTag from '@tuniao/tnui-vue3-uniapp/components/tag/src/tag.vue';

definePage({
  style: {
    navigationBarTitleText: '我的积分',
  },
});

const points = ref(2580);
const activeTab = ref('records');
const records = ref<any[]>([]);
const exchangeRecords = ref<any[]>([]);

onMounted(() => { loadData(); });

async function loadData() {
  try {
    const res = await getPointsRecords();
    records.value = res.data?.data || [];
  } catch (e) {
    console.error('加载积分记录失败', e);
  }
}

function statusColor(status: string) {
  const map: Record<string, string> = { pending: 'warning', redeemed: 'success', cancelled: 'default' };
  return map[status] || 'default';
}

function statusLabel(status: string) {
  const map: Record<string, string> = { pending: '待核销', redeemed: '已核销', cancelled: '已取消' };
  return map[status] || status;
}

function goExchange() { uni.navigateTo({ url: '/pages/points/exchange' }); }
function goRule() { uni.navigateTo({ url: '/pages/points/rule' }); }
</script>

<style lang="scss" scoped>
.page-points {
  min-height: 100vh;
  background: #FAFAF8;
  padding: 0 40rpx 120rpx;
}

/* 积分头部 */
.points-header {
  padding-top: 80rpx;
  margin-bottom: 32rpx;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8rpx;
}

.points-value {
  font-size: 64rpx;
  font-weight: 700;
  color: #2A2A26;
  letter-spacing: -1rpx;
  line-height: 1;
}

.points-label {
  font-size: 24rpx;
  color: #8A8A84;
}

/* 操作按钮 */
.actions-row {
  display: flex;
  gap: 12rpx;
  margin-bottom: 40rpx;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  background: #F3F3F0;
  border-radius: 32rpx;
  padding: 14rpx 28rpx;
  color: #2A2A26;
  font-size: 24rpx;
  font-weight: 500;
}

/* Tab */
.tab-bar {
  display: flex;
  gap: 4rpx;
  background: #F3F3F0;
  border-radius: 12rpx;
  padding: 4rpx;
  margin-bottom: 32rpx;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 18rpx;
  color: #8A8A84;
  font-size: 26rpx;
  border-radius: 10rpx;
}

.tab-item.active {
  background: #FFFFFF;
  color: #2A2A26;
  font-weight: 500;
}

/* Tab 内容 */
.tab-content {
  min-height: 400rpx;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80rpx 0;
}

.empty-text {
  color: #8A8A84;
  font-size: 26rpx;
}

/* 积分明细 */
.records-list {
  display: flex;
  flex-direction: column;
  gap: 2rpx;
}

.record-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #F3F3F0;
}

.record-item:last-child {
  border-bottom: none;
}

.record-left {
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.record-reason {
  font-size: 26rpx;
  color: #2A2A26;
}

.record-time {
  font-size: 22rpx;
  color: #8A8A84;
}

.record-points {
  font-size: 30rpx;
  font-weight: 600;
}

.record-points.earn {
  color: #C2652E;
}

.record-points.deduct {
  color: #C24848;
}

/* 兑换记录 */
.exchange-list {
  display: flex;
  flex-direction: column;
  gap: 2rpx;
}

.exchange-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #F3F3F0;
}

.exchange-item:last-child {
  border-bottom: none;
}

.exchange-info {
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.exchange-name {
  font-size: 26rpx;
  color: #2A2A26;
}

.exchange-time {
  font-size: 22rpx;
  color: #8A8A84;
}

.exchange-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8rpx;
}

.exchange-points {
  font-size: 26rpx;
  font-weight: 600;
  color: #2A2A26;
}
</style>
