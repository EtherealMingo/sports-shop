<template>
  <view class="page-container">
    <view class="product-grid">
      <view
        v-for="item in productList"
        :key="item.id"
        class="product-card"
        @click="goToDetail(item)"
      >
        <view class="product-image-wrapper">
          <image :src="item.image" mode="aspectFill" class="product-image" />
        </view>
        <view class="product-info">
          <view class="product-name">{{ item.name }}</view>
          <view class="product-desc">{{ item.description }}</view>
          <view class="product-price">{{ item.price }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '商品展示',
  },
})

const productList = ref([
  {
    id: 1,
    name: '专业羽毛球拍',
    price: '¥299',
    image: 'https://picsum.photos/300/300?random=30',
    description: '碳纤维材质，轻量化设计',
  },
  {
    id: 2,
    name: '专业网球拍',
    price: '¥399',
    image: 'https://picsum.photos/300/300?random=31',
    description: '高弹性拍框，舒适握感',
  },
  {
    id: 3,
    name: '羽毛球线',
    price: '¥35',
    image: 'https://picsum.photos/300/300?random=32',
    description: '高弹力耐打线',
  },
  {
    id: 4,
    name: '网球线',
    price: '¥45',
    image: 'https://picsum.photos/300/300?random=33',
    description: '专业比赛用线',
  },
  {
    id: 5,
    name: '手胶',
    price: '¥15',
    image: 'https://picsum.photos/300/300?random=34',
    description: '吸汗防滑手胶',
  },
  {
    id: 6,
    name: '拍包',
    price: '¥89',
    image: 'https://picsum.photos/300/300?random=35',
    description: '大容量专业拍包',
  },
])

function goToDetail(item: any) {
  uni.showToast({
    title: '查看详情: ' + item.name,
    icon: 'none',
  })
}
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
  background: #FAFAF8;
  padding: 24rpx 40rpx;
  padding-bottom: calc(env(safe-area-inset-bottom) + 140rpx);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
}

.product-card {
  background: #FFFFFF;
  border: 1rpx solid #E8E8E3;
  border-radius: 20rpx;
  overflow: hidden;

  &:active {
    opacity: 0.7;
  }

  .product-image-wrapper {
    height: 240rpx;
    overflow: hidden;

    .product-image {
      width: 100%;
      height: 100%;
      max-width: 100%;
    }
  }

  .product-info {
    padding: 16rpx;

    .product-name {
      font-size: 26rpx;
      font-weight: 500;
      color: #2A2A26;
      margin-bottom: 4rpx;
    }

    .product-desc {
      font-size: 22rpx;
      color: #8A8A84;
      margin-bottom: 8rpx;
      line-height: 1.4;
    }

    .product-price {
      font-size: 28rpx;
      font-weight: 700;
      color: #2A2A26;
    }
  }
}
</style>
