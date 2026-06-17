<template>
  <view class="page-merchant-login">
    <!-- 顶部渐变背景 -->
    <view class="header-bg"></view>

    <view class="login-container">
      <!-- 返回按钮 -->
      <view class="back-btn" @click="goBack">
        <tn-icon name="left" color="#FFFFFF" size="36" />
      </view>

      <!-- Logo 区域 -->
      <view class="logo-area">
        <view class="logo-icon">
          <tn-icon name="store" color="#FFFFFF" size="64" />
        </view>
        <text class="logo-title">体育器材服务</text>
        <text class="logo-subtitle">商家管理后台</text>
      </view>

      <!-- 登录表单 -->
      <view class="login-form">
        <view class="form-item">
          <tn-icon name="user" color="rgba(255,255,255,0.6)" size="32" />
          <input
            v-model="form.username"
            type="text"
            placeholder="请输入用户名"
            placeholder-style="color: rgba(255,255,255,0.4); font-size: 28rpx;"
            class="form-input"
          />
        </view>
        <view class="form-item">
          <tn-icon name="lock" color="rgba(255,255,255,0.6)" size="32" />
          <input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            placeholder-style="color: rgba(255,255,255,0.4); font-size: 28rpx;"
            class="form-input"
          />
        </view>

        <button class="login-btn" :loading="loading" @click="handleLogin">
          登录
        </button>

        <view class="login-tip">
          <text>默认账号: admin / admin123</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { merchantLogin } from '@/api/merchant';
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue';

definePage({
  style: {
    navigationBarTitleText: '商家登录',
  },
});

const form = ref({
  username: '',
  password: '',
});

const loading = ref(false);

async function handleLogin() {
  if (!form.value.username || !form.value.password) {
    uni.showToast({ title: '请输入用户名和密码', icon: 'none' });
    return;
  }

  loading.value = true;
  try {
    const res = await merchantLogin(form.value);
    uni.setStorageSync('merchantToken', res.data?.token || '');
    uni.setStorageSync('merchantInfo', JSON.stringify(res.data?.adminInfo || {}));
    uni.showToast({ title: '登录成功', icon: 'success' });
    setTimeout(() => {
      uni.navigateTo({ url: '/pages/merchant/index' });
    }, 500);
  } catch (e: any) {
    uni.showToast({ title: e.message || '登录失败', icon: 'none' });
  } finally {
    loading.value = false;
  }
}

function goBack() {
  uni.navigateBack();
}
</script>

<style lang="scss" scoped>
.page-merchant-login {
  min-height: 100vh;
  background: #FAFAFA;
  overflow-x: hidden;
  max-width: 100vw;
}

.login-container {
  padding: 60rpx 32rpx;
}

.back-btn {
  width: 56rpx;
  height: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32rpx;
  background: #FFFFFF;
  border: 1rpx solid #E8E8E8;
  border-radius: 50%;
}

.logo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60rpx;
}

.logo-icon {
  width: 100rpx;
  height: 100rpx;
  background: #FFF7ED;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
}

.logo-title {
  color: #1A1A1A;
  font-size: 36rpx;
  font-weight: 700;
  margin-bottom: 4rpx;
}

.logo-subtitle {
  color: #999999;
  font-size: 26rpx;
}

.login-form {
  background: #FFFFFF;
  border: 1rpx solid #E8E8E8;
  border-radius: 12rpx;
  padding: 32rpx;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #F5F5F5;
  margin-bottom: 16rpx;
}

.form-input {
  flex: 1;
  color: #1A1A1A;
  font-size: 26rpx;
}

.login-btn {
  width: 100%;
  height: 80rpx;
  background: #FF6B35;
  border-radius: 8rpx;
  color: #FFFFFF;
  font-size: 28rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32rpx;
  border: none;
}

.login-tip {
  text-align: center;
  margin-top: 20rpx;
}

.login-tip text {
  color: #999999;
  font-size: 24rpx;
}
</style>
