<template>
  <view class="container">
    <scroll-view scroll-y class="content">
      <view v-if="records.length === 0" class="empty">
        <text class="empty-text">暂无扫码记录</text>
      </view>

      <view v-else class="records">
        <view v-for="record in records" :key="record.id" class="record-card">
          <view class="card-header">
            <text class="qr-code">{{ record.qrCode }}</text>
            <tn-tag :color="record.action === 'scan_start' ? 'primary' : 'success'" size="sm">
              {{ record.action === 'scan_start' ? '开始服务' : '结束服务' }}
            </tn-tag>
          </view>
          <view class="card-body">
            <view class="info-row">
              <view class="i-carbon-time text-20px text-#8A8A84" />
              <text>{{ record.scanTime }}</text>
            </view>
            <view v-if="record.usedLength" class="info-row">
              <view class="i-carbon-ruler text-20px text-#8A8A84" />
              <text>使用长度: {{ record.usedLength }}米</text>
            </view>
            <view v-if="record.remainingLength" class="info-row">
              <view class="i-carbon-data-base text-20px text-#8A8A84" />
              <text>剩余长度: {{ record.remainingLength }}米</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TnTag from '@tuniao/tnui-vue3-uniapp/components/tag/src/tag.vue';

definePage({
  style: {
    navigationBarTitleText: '扫码记录',
  },
});

const records = ref([
  {
    id: 1,
    qrCode: 'WIR-00000001-00000001-0003-A3F2',
    action: 'scan_start',
    scanTime: '2026-06-15 14:00:00',
    usedLength: '10.6',
    remainingLength: '0.0',
  },
  {
    id: 2,
    qrCode: 'WIR-00000001-00000001-0001-B2E1',
    action: 'scan_end',
    scanTime: '2026-06-15 15:30:00',
    usedLength: '10.6',
    remainingLength: '0.0',
  },
]);
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #FAFAF8;
}

.content {
  padding: 24rpx 40rpx;
}

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;
}

.empty-text {
  color: #8A8A84;
  font-size: 26rpx;
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.qr-code {
  font-size: 22rpx;
  color: #2A2A26;
  font-family: monospace;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.info-row text {
  color: #6B6B65;
  font-size: 24rpx;
}
</style>
