<template>
  <view class="page-container">
    <!-- 积分记录列表 -->
    <z-paging
      ref="pagingRef"
      v-model="recordList"
      @query="queryList"
    >
      <view
        v-for="record in recordList"
        :key="record.id"
        class="record-item"
      >
        <view class="record-left">
          <view class="record-reason">{{ record.reason }}</view>
          <view class="record-time">{{ record.createTime }}</view>
        </view>
        <view :class="['record-points', record.type]">
          <tn-icon :name="record.type === 'earn' ? 'arrow-up-circle' : 'arrow-down-circle'" />
          <text>{{ record.type === 'earn' ? '+' : '-' }}{{ Math.abs(record.points) }}</text>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getPointsRecords } from '@/api/member'
import type { IPointsRecord } from '@/api/types/member'

definePage({
  style: {
    navigationBarTitleText: '积分明细',
  },
})

const recordList = ref<IPointsRecord[]>([])
const pagingRef = ref()

async function queryList(pageNo: number, pageSize: number) {
  try {
    const res = await getPointsRecords({ page: pageNo, pageSize })
    recordList.value = res.data.list
    pagingRef.value?.complete(recordList.value)
  }
  catch (error) {
    pagingRef.value?.complete(false)
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
  background: #FAFAF8;
  padding: 24rpx 40rpx;
  padding-bottom: calc(env(safe-area-inset-bottom) + 140rpx);
}

.record-item {
  margin: 0 0 2rpx;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #F3F3F0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  .record-left {
    flex: 1;

    .record-reason {
      font-size: 26rpx;
      color: #2A2A26;
      margin-bottom: 6rpx;
      font-weight: 500;
    }

    .record-time {
      font-size: 22rpx;
      color: #8A8A84;
    }
  }

  .record-points {
    display: flex;
    align-items: center;
    gap: 6rpx;
    font-size: 32rpx;
    font-weight: 600;

    &.earn {
      color: #C2652E;
    }

    &.deduct {
      color: #C24848;
    }
  }
}
</style>
