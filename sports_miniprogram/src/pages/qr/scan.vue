<template>
  <view class="container">
    <view class="scan-area">
      <view class="scan-frame">
        <view class="scan-line"></view>
      </view>
      <text class="scan-tips">将二维码放入框内扫描</text>
    </view>

    <view class="actions">
      <button class="action-btn" @click="scanQRCode">
        <text>扫码使用线材</text>
      </button>
      <button class="action-btn secondary" @click="showMyScans">
        <text>扫码记录</text>
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: '扫码',
  },
});
const scanQRCode = () => {
  uni.scanCode({
    success: (res) => {
      console.log('扫码结果:', res.result);
      uni.showToast({ title: '扫码成功', icon: 'success' });
    },
    fail: (err) => {
      console.error('扫码失败:', err);
    },
  });
};

const showMyScans = () => {
  uni.navigateTo({ url: '/pages/qr/my-scans' });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #FAFAF8;
  padding: 48rpx 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scan-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80rpx;
  margin-bottom: 80rpx;
}

.scan-frame {
  width: 400rpx;
  height: 400rpx;
  border: 2rpx solid #2A2A26;
  border-radius: 20rpx;
  position: relative;
  overflow: hidden;
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2rpx;
  background: #C2652E;
  animation: scan 2s linear infinite;
}

@keyframes scan {
  0% { top: 0; }
  50% { top: 396rpx; }
  100% { top: 0; }
}

.scan-tips {
  color: #8A8A84;
  font-size: 24rpx;
  margin-top: 24rpx;
}

.actions {
  width: 100%;
}

.action-btn {
  width: 100%;
  background: #2A2A26;
  color: #FFFFFF;
  border: none;
  border-radius: 32rpx;
  padding: 24rpx;
  font-size: 28rpx;
  font-weight: 500;
  margin-bottom: 16rpx;
  text-align: center;
}

.action-btn.secondary {
  background: #F3F3F0;
  color: #2A2A26;
}
</style>
