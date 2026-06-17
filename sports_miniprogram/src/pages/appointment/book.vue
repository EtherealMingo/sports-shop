<template>
  <view class="page-appointment">
    <scroll-view scroll-y class="content">
      <view class="section">
        <text class="section-title">服务类型</text>
        <view class="service-types">
          <view
            v-for="type in serviceTypes"
            :key="type.value"
            class="type-card"
            :class="{ active: form.serviceType === type.value }"
            @click="form.serviceType = type.value"
          >
            <text class="type-name">{{ type.label }}</text>
            <text class="type-desc">{{ type.desc }}</text>
          </view>
        </view>
      </view>

      <view class="section">
        <text class="section-title">选择日期</text>
        <scroll-view scroll-x class="date-scroll">
          <view
            v-for="date in availableDates"
            :key="date.value"
            class="date-card"
            :class="{ active: form.date === date.value }"
            @click="form.date = date.value"
          >
            <text class="date-week">{{ date.week }}</text>
            <text class="date-day">{{ date.day }}</text>
          </view>
        </scroll-view>
      </view>

      <view class="section">
        <text class="section-title">选择时段</text>
        <view class="time-grid">
          <view
            v-for="slot in timeSlots"
            :key="slot.value"
            class="slot-card"
            :class="{ active: form.timeSlot === slot.value, disabled: !slot.available }"
            @click="slot.available && (form.timeSlot = slot.value)"
          >
            <text class="slot-time">{{ slot.label }}</text>
            <text v-if="!slot.available" class="slot-status">已满</text>
          </view>
        </view>
      </view>

      <view class="section">
        <text class="section-title">球拍数量</text>
        <view class="racket-count">
          <view class="count-btn" @click="form.racketCount > 1 && form.racketCount--">
            <view class="i-carbon-subtract-alt text-22px text-#2A2A26" />
          </view>
          <text class="count-value">{{ form.racketCount }}</text>
          <view class="count-btn" @click="form.racketCount < 10 && form.racketCount++">
            <view class="i-carbon-add text-22px text-#2A2A26" />
          </view>
        </view>
      </view>

      <view class="section">
        <text class="section-title">特殊要求</text>
        <textarea
          v-model="form.requirements"
          placeholder="如：缠线磅数、线材偏好等"
          class="requirements-input"
          :maxlength="200"
        />
      </view>

      <view class="info-row">
        <text class="info-label">预约技师</text>
        <text class="info-value">系统自动分配</text>
      </view>
      <view class="info-row">
        <text class="info-label">预计费用</text>
        <text class="info-price">¥{{ estimatedCost }}</text>
      </view>
    </scroll-view>

    <view class="footer">
      <view class="footer-info">
        <text class="footer-label">预计费用</text>
        <text class="footer-price">¥{{ estimatedCost }}</text>
      </view>
      <button class="submit-btn" :disabled="!canSubmit" @click="handleSubmit">
        确认预约
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

definePage({
  style: {
    navigationBarTitleText: '缠线预约',
  },
});

const form = ref({
  serviceType: '',
  date: '',
  timeSlot: '',
  racketCount: 1,
  requirements: '',
});

onMounted(() => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1] as any;
  const options = currentPage?.options || {};
  if (options?.date) form.value.date = options.date;
  if (options?.timeSlot) form.value.timeSlot = options.timeSlot;
});

const serviceTypes = [
  { value: 'badminton', label: '羽毛球拍', desc: '专业缠线' },
  { value: 'tennis', label: '网球拍', desc: '专业缠线' },
  { value: 'restring', label: '重穿线', desc: '更换旧线' },
];

const availableDates = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return {
    value: d.toISOString().slice(0, 10),
    week: weekDays[d.getDay()],
    day: String(d.getDate()).padStart(2, '0'),
  };
});

const timeSlots = [
  { value: '09:00-10:00', label: '09:00', available: true },
  { value: '10:00-11:00', label: '10:00', available: true },
  { value: '11:00-12:00', label: '11:00', available: false },
  { value: '14:00-15:00', label: '14:00', available: true },
  { value: '15:00-16:00', label: '15:00', available: true },
  { value: '16:00-17:00', label: '16:00', available: true },
  { value: '17:00-18:00', label: '17:00', available: false },
  { value: '19:00-20:00', label: '19:00', available: true },
];

const estimatedCost = computed(() => form.value.racketCount * 80);
const canSubmit = computed(() => form.value.serviceType && form.value.date && form.value.timeSlot);

async function handleSubmit() {
  uni.showLoading({ title: '提交中...' });
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({ title: '预约成功', icon: 'success' });
    setTimeout(() => uni.navigateBack(), 1500);
  }, 1000);
}
</script>

<style lang="scss" scoped>
.page-appointment {
  min-height: 100vh;
  background: #FAFAF8;
  padding-bottom: calc(160rpx + env(safe-area-inset-bottom));
}

.content {
  padding: 24rpx 40rpx;
}

.section {
  margin-bottom: 40rpx;
}

.section-title {
  display: block;
  font-size: 26rpx;
  font-weight: 600;
  color: #2A2A26;
  margin-bottom: 20rpx;
}

.service-types {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
}

.type-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx 16rpx;
  border-radius: 16rpx;
  background: #F3F3F0;
  border: 1rpx solid transparent;
}

.type-card.active {
  background: #2A2A26;
}

.type-card.active text {
  color: #FFFFFF;
}

.type-name {
  font-size: 26rpx;
  font-weight: 500;
  color: #2A2A26;
}

.type-desc {
  font-size: 20rpx;
  color: #8A8A84;
  margin-top: 4rpx;
}

.date-scroll {
  white-space: nowrap;
}

.date-card {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 16rpx 24rpx;
  margin-right: 12rpx;
  border-radius: 12rpx;
  background: #F3F3F0;
  border: 1rpx solid transparent;
}

.date-card.active {
  background: #2A2A26;
}

.date-card.active text {
  color: #FFFFFF;
}

.date-week {
  font-size: 20rpx;
  color: #8A8A84;
}

.date-day {
  font-size: 28rpx;
  font-weight: 600;
  color: #2A2A26;
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12rpx;
}

.slot-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16rpx 8rpx;
  border-radius: 12rpx;
  background: #F3F3F0;
  border: 1rpx solid transparent;
}

.slot-card.active {
  background: #2A2A26;
}

.slot-card.active text {
  color: #FFFFFF;
}

.slot-card.disabled {
  background: #F3F3F0;
  opacity: 0.4;
}

.slot-time {
  font-size: 24rpx;
  font-weight: 500;
  color: #2A2A26;
}

.slot-status {
  font-size: 18rpx;
  color: #8A8A84;
  margin-top: 4rpx;
}

.racket-count {
  display: flex;
  align-items: center;
  gap: 32rpx;
}

.count-btn {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  background: #F3F3F0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.count-value {
  font-size: 36rpx;
  font-weight: 600;
  color: #2A2A26;
  min-width: 48rpx;
  text-align: center;
}

.requirements-input {
  width: 100%;
  min-height: 100rpx;
  padding: 20rpx;
  background: #F3F3F0;
  border-radius: 12rpx;
  font-size: 24rpx;
  color: #2A2A26;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #F3F3F0;
}

.info-label {
  font-size: 24rpx;
  color: #8A8A84;
}

.info-value {
  font-size: 24rpx;
  color: #2A2A26;
}

.info-price {
  font-size: 28rpx;
  font-weight: 600;
  color: #2A2A26;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #FAFAF8;
  padding: 16rpx 40rpx;
  padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
  display: flex;
  align-items: center;
  gap: 20rpx;
  border-top: 1rpx solid #E8E8E3;
}

.footer-info {
  flex: 1;
}

.footer-label {
  font-size: 20rpx;
  color: #8A8A84;
}

.footer-price {
  font-size: 32rpx;
  font-weight: 700;
  color: #2A2A26;
}

.submit-btn {
  background: #2A2A26;
  color: #FFFFFF;
  font-size: 26rpx;
  font-weight: 500;
  border-radius: 32rpx;
  padding: 20rpx 48rpx;
  border: none;
}

.submit-btn[disabled] {
  background: #C8C8C3;
  color: #FFFFFF;
}
</style>
