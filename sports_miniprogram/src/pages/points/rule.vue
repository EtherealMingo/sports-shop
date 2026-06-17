<template>
  <view class="rule-container">
    <view v-if="rule" class="rule-content">
      <view class="rule-section">
        <view class="section-title">获取方式</view>
        <view class="section-content">
          {{ rule.description }}
        </view>
      </view>

      <view class="rule-section">
        <view class="section-title">使用方式</view>
        <view class="section-content">
          1. 积分抵扣：{{ rule.deductRate }}积分可抵扣1元消费（无门槛，可抵扣缠线服务或商品费用）
        </view>
        <view class="section-content">
          2. 积分兑换：可在兑换页面使用积分兑换指定商品或服务
        </view>
      </view>

      <view class="rule-section">
        <view class="section-title">有效期</view>
        <view class="section-content">
          积分自获得之日起{{ rule.validMonths }}个月有效，到期自动清零
        </view>
      </view>

      <view class="rule-section">
        <view class="section-title">注意事项</view>
        <view class="section-content">
          1. 积分不可转让、不可提现
        </view>
        <view class="section-content">
          2. 兑换商品仅支持到店自提
        </view>
        <view class="section-content">
          3. 积分使用后不可撤销
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getPointsRule } from '@/api/member'
import type { IPointsRule } from '@/api/types/member'

definePage({
  style: {
    navigationBarTitleText: '积分规则',
  },
})

const rule = ref<IPointsRule | null>(null)

onMounted(async () => {
  try {
    const res = await getPointsRule()
    rule.value = res.data
  }
  catch (error) {
    console.error('加载积分规则失败', error)
  }
})
</script>

<style scoped lang="scss">
.rule-container {
  min-height: 100vh;
  background: #FAFAF8;
  padding: 24rpx 40rpx 120rpx;
}

.rule-content {
  .rule-section {
    background: #FFFFFF;
    border: 1rpx solid #E8E8E3;
    border-radius: 20rpx;
    padding: 28rpx;
    margin-bottom: 16rpx;

    .section-title {
      font-size: 26rpx;
      font-weight: 600;
      color: #2A2A26;
      margin-bottom: 16rpx;
    }

    .section-content {
      font-size: 24rpx;
      color: #6B6B65;
      line-height: 1.8;
      margin-bottom: 12rpx;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
