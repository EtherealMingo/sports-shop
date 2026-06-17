<template>
  <view class="container">
    <view class="header">
      <text class="title">服务历史</text>
    </view>

    <view class="records">
      <view class="record-card" v-for="record in records" :key="record.id">
        <view class="record-header">
          <text class="record-date">{{ record.date }}</text>
          <text class="record-status">{{ record.status }}</text>
        </view>
        <view class="record-body">
          <text class="record-info">{{ record.racket }} | {{ record.wire }} | {{ record.tension }}磅</text>
          <text class="record-cost">¥{{ record.cost }}</text>
        </view>
        <view class="record-footer">
          <text class="record-technician">技师: {{ record.technician }}</text>
          <text class="record-rating" v-if="record.rating">{{ record.rating }}★</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

definePage({
  style: {
    navigationBarTitleText: '服务历史',
  },
});

const records = ref([
  { id: 1, date: '2026-06-15', status: '已完成', racket: 'Yonex NR-900', wire: 'Yonex BG-80', tension: 26, cost: 80, technician: '张师傅', rating: 5 },
  { id: 2, date: '2026-05-20', status: '已完成', racket: 'Yonex NR-900', wire: 'Yonex BG-80', tension: 26, cost: 80, technician: '张师傅', rating: 4 },
]);
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #FAFAF8;
  padding: 24rpx 40rpx 120rpx;
}

.header {
  margin-bottom: 32rpx;
}

.title {
  font-size: 40rpx;
  font-weight: 700;
  color: #2A2A26;
  letter-spacing: -0.5rpx;
}

.records {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.record-card {
  background: #FFFFFF;
  border: 1rpx solid #E8E8E3;
  border-radius: 20rpx;
  padding: 28rpx;
}

.record-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12rpx;
}

.record-date {
  font-size: 26rpx;
  color: #2A2A26;
  font-weight: 500;
}

.record-status {
  font-size: 22rpx;
  color: #5B8C5A;
  font-weight: 500;
}

.record-body {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12rpx;
}

.record-info {
  font-size: 24rpx;
  color: #6B6B65;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 60%;
}

.record-cost {
  font-size: 28rpx;
  font-weight: 600;
  color: #2A2A26;
}

.record-footer {
  display: flex;
  justify-content: space-between;
}

.record-technician {
  font-size: 22rpx;
  color: #8A8A84;
}

.record-rating {
  font-size: 24rpx;
  color: #C2652E;
}
</style>
