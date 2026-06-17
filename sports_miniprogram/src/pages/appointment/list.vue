<template>
  <view class="container">
    <scroll-view scroll-y class="content" @scrolltolower="loadMore">
      <view v-if="appointments.length === 0" class="empty">
        <text class="empty-icon">📅</text>
        <text class="empty-text">暂无预约记录</text>
        <tn-button type="primary" size="sm" @click="goBook">立即预约</tn-button>
      </view>

      <view v-else class="appointments">
        <view
          v-for="item in appointments"
          :key="item.id"
          class="appointment-card"
        >
          <view class="card-header">
            <text class="service-type">{{ item.serviceType === 'badminton' ? '羽毛球拍' : item.serviceType === 'tennis' ? '网球拍' : '重穿线' }}</text>
            <tn-tag :color="statusColor(item.status)" size="sm">{{ statusLabel(item.status) }}</tn-tag>
          </view>
          <view class="card-body">
            <view class="info-row">
              <view class="i-carbon-calendar text-20px text-#8A8A84" />
              <text>{{ item.date }} {{ item.timeSlot }}</text>
            </view>
            <view class="info-row">
              <view class="i-carbon-user text-20px text-#8A8A84" />
              <text>{{ item.racketCount }} 支球拍</text>
            </view>
            <view v-if="item.tension" class="info-row">
              <view class="i-carbon-flash text-20px text-#8A8A84" />
              <text>{{ item.tension }} 磅</text>
            </view>
          </view>
          <view v-if="item.status === 'pending'" class="card-footer">
            <tn-button type="default" size="sm" @click="handleCancel(item)">取消预约</tn-button>
          </view>
          <view v-if="item.status === 'completed'" class="card-footer">
            <tn-button type="primary" size="sm" @click="handleRebook(item)">再次预约</tn-button>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue';
import TnTag from '@tuniao/tnui-vue3-uniapp/components/tag/src/tag.vue';

definePage({
  style: {
    navigationBarTitleText: '我的预约',
  },
});

const appointments = ref([
  {
    id: 1,
    serviceType: 'badminton',
    date: '2026-06-15',
    timeSlot: '14:00-15:00',
    racketCount: 2,
    tension: '26',
    status: 'pending',
  },
  {
    id: 2,
    serviceType: 'badminton',
    date: '2026-05-20',
    timeSlot: '10:00-11:00',
    racketCount: 1,
    tension: '25',
    status: 'completed',
  },
]);

const statusColor = (status: string) => {
  const map: Record<string, string> = {
    pending: 'warning',
    confirmed: 'primary',
    in_progress: 'processing',
    completed: 'success',
    cancelled: 'error',
  };
  return map[status] || 'default';
};

const statusLabel = (status: string) => {
  const map: Record<string, string> = {
    pending: '待确认',
    confirmed: '已确认',
    in_progress: '服务中',
    completed: '已完成',
    cancelled: '已取消',
  };
  return map[status] || status;
};

const goBook = () => uni.navigateTo({ url: '/pages/appointment/book' });
const handleCancel = (item: any) => {
  uni.showModal({
    title: '确认取消',
    content: '确定要取消此预约吗？',
    success: (res) => {
      if (res.confirm) {
        item.status = 'cancelled';
        uni.showToast({ title: '已取消', icon: 'success' });
      }
    },
  });
};
const handleRebook = () => uni.navigateTo({ url: '/pages/appointment/book' });
const loadMore = () => {};
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;
}

.empty-icon {
  font-size: 80rpx;
  margin-bottom: 16rpx;
}

.empty-text {
  color: #8A8A84;
  font-size: 26rpx;
  margin-bottom: 24rpx;
}

.appointments {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.appointment-card {
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

.service-type {
  font-size: 28rpx;
  font-weight: 600;
  color: #2A2A26;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
  margin-bottom: 16rpx;
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

.card-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 16rpx;
  border-top: 1rpx solid #F3F3F0;
}
</style>
