<template>
  <view class="login-container">
    <view class="login-header">
      <view class="logo">
        <image src="/static/icons/logo.png" mode="aspectFit" />
      </view>
      <view class="title">商家管理后台</view>
    </view>

    <view class="login-form">
      <view class="form-item">
        <view class="input-wrapper">
          <image src="/static/icons/user.png" mode="aspectFit" />
          <input v-model="form.username" type="text" placeholder="请输入账号" class="input" />
        </view>
      </view>

      <view class="form-item">
        <view class="input-wrapper">
          <image src="/static/icons/password.png" mode="aspectFit" />
          <input v-model="form.password" type="password" placeholder="请输入密码" class="input" />
        </view>
      </view>

      <button class="login-btn" @click="handleLogin">登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { adminLogin } from '@/api/admin'

const form = ref({
  username: '',
  password: '',
})

async function handleLogin() {
  if (!form.value.username) {
    uni.showToast({
      title: '请输入账号',
      icon: 'none',
    })
    return
  }

  if (!form.value.password) {
    uni.showToast({
      title: '请输入密码',
      icon: 'none',
    })
    return
  }

  try {
    const res = await adminLogin(form.value)
    uni.setStorageSync('adminToken', res.data.token)
    uni.showToast({
      title: '登录成功',
      icon: 'success',
    })
    setTimeout(() => {
      uni.reLaunch({ url: '/pages-admin/index/index' })
    }, 1500)
  }
  catch (error: any) {
    uni.showToast({
      title: error.message || '登录失败',
      icon: 'none',
    })
  }
}
</script>

<style scoped lang="scss">
.login-container {
  min-height: 100vh;
  background: #FAFAFA;
  padding: 80rpx 48rpx;
  overflow-x: hidden;
  max-width: 100vw;
}

.login-header {
  text-align: center;
  margin-bottom: 80rpx;

  .logo {
    width: 120rpx;
    height: 120rpx;
    margin: 0 auto 24rpx;
    background: #FFF7ED;
    border-radius: 16rpx;
    overflow: hidden;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .title {
    font-size: 36rpx;
    font-weight: 700;
    color: #1A1A1A;
  }
}

.login-form {
  .form-item {
    margin-bottom: 24rpx;

    .input-wrapper {
      display: flex;
      align-items: center;
      gap: 16rpx;
      background: white;
      border: 1rpx solid #E8E8E8;
      border-radius: 8rpx;
      padding: 20rpx 24rpx;

      image {
        width: 36rpx;
        height: 36rpx;
      }

      .input {
        flex: 1;
        font-size: 28rpx;
        border: none;
        outline: none;
      }
    }
  }

  .login-btn {
    background: #FF6B35;
    color: white;
    border: none;
    border-radius: 8rpx;
    padding: 24rpx 0;
    font-size: 28rpx;
    font-weight: 600;
    margin-top: 32rpx;
  }
}
</style>
