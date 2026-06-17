<template>
  <view class="page-exchange">
    <view class="section">
      <view class="section-header">
        <text class="section-title">可兑换商品</text>
      </view>
      <view class="goods-list">
        <view class="goods-card" v-for="item in goods" :key="item.id">
          <image :src="item.image" class="goods-img" />
          <view class="goods-info">
            <text class="goods-name">{{ item.name }}</text>
            <text class="goods-points">{{ item.points }} 积分</text>
          </view>
          <button class="exchange-btn" @click="handleExchange(item)">兑换</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

definePage({
  style: {
    navigationBarTitleText: '积分兑换',
  },
});

const goods = ref([
  { id: 1, name: '专业羽毛球拍手胶', points: 200, image: 'https://picsum.photos/200/200?random=1' },
  { id: 2, name: 'YONEX羽毛球线', points: 350, image: 'https://picsum.photos/200/200?random=2' },
  { id: 3, name: '免费缠线服务券', points: 500, image: 'https://picsum.photos/200/200?random=3' },
]);

const handleExchange = (item: any) => {
  uni.showModal({
    title: '确认兑换',
    content: `确定要用 ${item.points} 积分兑换 ${item.name} 吗？`,
    success: (res) => {
      if (res.confirm) {
        uni.showToast({ title: '兑换成功', icon: 'success' });
      }
    },
  });
};
</script>

<style lang="scss" scoped>
.page-exchange {
  min-height: 100vh;
  background: #FAFAF8;
  padding: 24rpx 40rpx 120rpx;
}

.section-header {
  margin-bottom: 24rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #2A2A26;
}

.goods-card {
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border: 1rpx solid #E8E8E3;
  border-radius: 20rpx;
  padding: 24rpx;
  margin-bottom: 16rpx;
}

.goods-img {
  width: 96rpx;
  height: 96rpx;
  border-radius: 12rpx;
  background: #F3F3F0;
}

.goods-info {
  flex: 1;
  margin-left: 20rpx;
}

.goods-name {
  font-size: 26rpx;
  color: #2A2A26;
  font-weight: 500;
  display: block;
  margin-bottom: 6rpx;
}

.goods-points {
  font-size: 22rpx;
  color: #C2652E;
  font-weight: 600;
}

.exchange-btn {
  background: #2A2A26;
  color: #FFFFFF;
  border: none;
  border-radius: 28rpx;
  padding: 12rpx 28rpx;
  font-size: 22rpx;
  font-weight: 500;
}
</style>
