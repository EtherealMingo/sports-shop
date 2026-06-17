<template>
  <view class="page">
    <!-- 积分余额卡片 -->
    <view class="balance-card card card--primary">
      <view class="balance-label text-sm">可用积分</view>
      <view class="balance-value text-bold" style="font-size: 64rpx;">
        {{ balance }}
      </view>
      <view class="balance-tip text-xs mt-xs">
        积分有效期12个月,到期前7天提醒
      </view>
    </view>
    
    <!-- 类型筛选 -->
    <view class="card">
      <tn-tabs
        :list="typeList"
        :current="currentType"
        @change="handleTypeChange"
      />
    </view>
    
    <!-- 积分明细列表 -->
    <view class="list-container">
      <view
        v-for="item in recordList"
        :key="item.id"
        class="record-item card"
      >
        <view class="record-info">
          <view class="record-title text-base text-bold mb-xs">{{ item.title }}</view>
          <view class="record-desc text-sm text-secondary">{{ item.desc }}</view>
          <view class="record-time text-xs text-light mt-xs">{{ item.time }}</view>
        </view>
        <view
          class="record-points"
          :class="item.type === 'income' ? 'income' : 'expense'"
        >
          {{ item.type === 'income' ? '+' : '-' }}{{ item.points }}
        </view>
      </view>
      
      <!-- 空状态 -->
      <view v-if="recordList.length === 0" class="empty-state">
        <tn-empty text="暂无记录" icon="money" />
      </view>
      
      <!-- 加载更多 -->
      <view v-if="hasMore" class="load-more">
        <tn-loading mode="circle" size="sm" />
        <text class="text-sm text-secondary ml-xs">加载中...</text>
      </view>
      
      <!-- 没有更多 -->
      <view v-if="!hasMore && recordList.length > 0" class="no-more text-sm text-light text-center">
        没有更多了
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 积分余额
const balance = ref(350)

// 类型列表
const typeList = [
  { name: '全部' },
  { name: '收入' },
  { name: '支出' }
]

// 当前类型
const currentType = ref(0)

// 积分记录列表
const recordList = ref([
  {
    id: 1,
    title: '消费赠分',
    desc: '羽毛球拍缠线服务',
    time: '2026-01-30 14:30',
    points: 50,
    type: 'income'
  },
  {
    id: 2,
    title: '积分抵扣',
    desc: '抵扣10元缠线费',
    time: '2026-01-28 10:15',
    points: 100,
    type: 'expense'
  },
  {
    id: 3,
    title: '消费赠分',
    desc: '购买尤尼克斯球拍',
    time: '2026-01-25 16:20',
    points: 200,
    type: 'income'
  },
  {
    id: 4,
    title: '积分抵扣',
    desc: '兑换运动袜一双',
    time: '2026-01-20 09:45',
    points: 50,
    type: 'expense'
  }
])

// 是否有更多
const hasMore = ref(false)

// 类型切换
const handleTypeChange = (e) => {
  currentType.value = e.index
  // TODO: 根据类型筛选记录
}

onMounted(() => {
  // TODO: 从API获取积分明细
})
</script>

<style lang="scss" scoped>
.balance-card {
  text-align: center;
  padding: 60rpx 40rpx;
  
  .balance-label {
    color: rgba(255, 255, 255, 0.8);
  }
  
  .balance-value {
    margin: 20rpx 0;
    color: #F97316;
  }
  
  .balance-tip {
    color: rgba(255, 255, 255, 0.6);
  }
}

.list-container {
  padding: 0 20rpx;
}

.record-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24rpx;
  margin-bottom: 15rpx;
  
  .record-info {
    flex: 1;
  }
  
  .record-points {
    font-size: 32rpx;
    font-weight: bold;
    margin-left: 20rpx;
    
    &.income {
      color: #1E3A8A;
    }
    
    &.expense {
      color: #F97316;
    }
  }
}

.empty-state {
  padding: 120rpx 0;
}

.load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30rpx 0;
}

.no-more {
  padding: 30rpx 0;
}
</style>
