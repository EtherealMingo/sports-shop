<template>
  <view class="page-shop">
    <view v-if="shopInfo.name" class="shop-info">
      <!-- 店名 -->
      <view class="shop-name">{{ shopInfo.name }}</view>

      <!-- 电话 -->
      <view class="shop-phone" @click="callPhone">
        <view class="i-carbon-phone text-20px text-#C2652E" />
        <text>{{ shopInfo.phone }}</text>
      </view>

      <!-- 图片轮播 -->
      <view class="shop-images" v-if="shopInfo.images.length">
        <swiper class="swiper" indicator-dots autoplay circular>
          <swiper-item v-for="(image, index) in shopInfo.images" :key="index">
            <image :src="image" mode="aspectFill" class="shop-image" />
          </swiper-item>
        </swiper>
      </view>

      <!-- 地址 -->
      <view class="detail-item">
        <view class="i-carbon-location text-22px text-#C2652E" />
        <text class="detail-text">{{ shopInfo.address }}</text>
        <text class="nav-btn" @click="navigate">导航</text>
      </view>

      <!-- 营业时间 -->
      <view class="detail-item">
        <view class="i-carbon-time text-22px text-#C2652E" />
        <text class="detail-text">{{ shopInfo.businessHours }}</text>
      </view>

      <!-- 店铺介绍 -->
      <view class="shop-desc" v-if="shopInfo.description">
        <text class="desc-title">店铺介绍</text>
        <text class="desc-content">{{ shopInfo.description }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getShopInfo } from '@/api/member'
import type { IShopInfo } from '@/api/types/member'

definePage({
  style: {
    navigationBarTitleText: '店铺信息',
  },
})

const shopInfo = ref<IShopInfo>({
  name: '',
  address: '',
  phone: '',
  businessHours: '',
  description: '',
  images: [],
})

onMounted(async () => {
  try {
    const res = await getShopInfo()
    shopInfo.value = res.data
  }
  catch (error) {
    console.error('加载店铺信息失败', error)
  }
})

function callPhone() {
  uni.makePhoneCall({ phoneNumber: shopInfo.value.phone })
}

function navigate() {
  uni.openLocation({
    latitude: 0,
    longitude: 0,
    name: shopInfo.value.name,
    address: shopInfo.value.address,
  })
}
</script>

<style scoped lang="scss">
.page-shop {
  min-height: 100vh;
  background: #FAFAF8;
  padding: 0 40rpx 120rpx;
}

.shop-info {
  padding-top: 40rpx;
}

.shop-name {
  font-size: 40rpx;
  font-weight: 700;
  color: #2A2A26;
  letter-spacing: -0.5rpx;
  margin-bottom: 20rpx;
}

.shop-phone {
  display: flex;
  align-items: center;
  gap: 10rpx;
  font-size: 26rpx;
  color: #2A2A26;
  margin-bottom: 32rpx;
}

.shop-images {
  margin-bottom: 32rpx;

  .swiper {
    height: 360rpx;
    border-radius: 20rpx;
    overflow: hidden;
  }

  .shop-image {
    width: 100%;
    height: 100%;
  }
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #F3F3F0;

  &:last-child {
    border-bottom: none;
  }

  .detail-text {
    flex: 1;
    font-size: 26rpx;
    color: #2A2A26;
  }

  .nav-btn {
    flex: none;
    background: #2A2A26;
    color: #FFFFFF;
    padding: 10rpx 24rpx;
    border-radius: 24rpx;
    font-size: 22rpx;
    font-weight: 500;
  }
}

.shop-desc {
  margin-top: 32rpx;
  padding: 28rpx;
  background: #FFFFFF;
  border: 1rpx solid #E8E8E3;
  border-radius: 20rpx;

  .desc-title {
    font-size: 26rpx;
    font-weight: 600;
    color: #2A2A26;
    margin-bottom: 12rpx;
    display: block;
  }

  .desc-content {
    font-size: 24rpx;
    color: #6B6B65;
    line-height: 1.8;
  }
}
</style>
