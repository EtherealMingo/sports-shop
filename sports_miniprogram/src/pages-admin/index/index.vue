<template>
  <view class="admin-container">
    <!-- 统计数据 -->
    <view class="statistics">
      <view class="stat-item">
        <view class="stat-value">{{ statistics.totalMembers }}</view>
        <view class="stat-label">会员总数</view>
      </view>
      <view class="stat-item">
        <view class="stat-value">{{ statistics.todayNewMembers }}</view>
        <view class="stat-label">今日新增</view>
      </view>
      <view class="stat-item">
        <view class="stat-value">{{ statistics.todayPointsEarn }}</view>
        <view class="stat-label">今日发放</view>
      </view>
      <view class="stat-item">
        <view class="stat-value">{{ statistics.todayPointsDeduct }}</view>
        <view class="stat-label">今日扣除</view>
      </view>
    </view>

    <!-- 快捷操作 -->
    <view class="quick-actions">
      <view class="action-card" @click="goToMembers">
        <image src="/static/icons/members.png" mode="aspectFit" />
        <text>会员管理</text>
      </view>
      <view class="action-card" @click="goToPointsAdjust">
        <image src="/static/icons/points-adjust.png" mode="aspectFit" />
        <text>积分调整</text>
      </view>
      <view class="action-card" @click="goToExchangeManage">
        <image src="/static/icons/exchange-manage.png" mode="aspectFit" />
        <text>兑换管理</text>
      </view>
      <view class="action-card" @click="goToAppointmentManage">
        <image src="/static/icons/appointment-manage.png" mode="aspectFit" />
        <text>预约管理</text>
      </view>
    </view>

    <!-- 待处理事项 -->
    <view class="pending-tasks">
      <view class="section-title">待处理事项</view>
      <view class="task-item" @click="goToExchangePending">
        <view class="task-info">
          <view class="task-name">待核销兑换</view>
          <view class="task-desc">{{ statistics.todayExchangeCount }}个待核销</view>
        </view>
        <text class="arrow">></text>
      </view>
      <view class="task-item" @click="goToAppointmentPending">
        <view class="task-info">
          <view class="task-name">待确认预约</view>
          <view class="task-desc">查看待确认预约</view>
        </view>
        <text class="arrow">></text>
      </view>
    </view>

    <!-- 底部导航 -->
    <view class="bottom-actions">
      <button class="logout-btn" @click="handleLogout">退出登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getStatistics, adminLogout } from '@/api/admin'
import type { IStatisticsData } from '@/api/types/admin'

const statistics = ref<IStatisticsData>({
  totalMembers: 0,
  todayNewMembers: 0,
  todayPointsEarn: 0,
  todayPointsDeduct: 0,
  todayExchangeCount: 0,
  todayRedeemCount: 0,
})

onMounted(() => {
  loadStatistics()
})

async function loadStatistics() {
  try {
    const res = await getStatistics()
    statistics.value = res.data
  }
  catch (error) {
    console.error('加载统计数据失败', error)
  }
}

function goToMembers() {
  uni.navigateTo({ url: '/pages-admin/members/list' })
}

function goToPointsAdjust() {
  uni.navigateTo({ url: '/pages-admin/points/adjust' })
}

function goToExchangeManage() {
  uni.navigateTo({ url: '/pages-admin/exchange/list' })
}

function goToAppointmentManage() {
  uni.navigateTo({ url: '/pages-admin/appointment/list' })
}

function goToExchangePending() {
  uni.navigateTo({ url: '/pages-admin/exchange/list?status=pending' })
}

function goToAppointmentPending() {
  uni.navigateTo({ url: '/pages-admin/appointment/list?status=pending' })
}

async function handleLogout() {
  uni.showModal({
    title: '确认退出',
    content: '确定要退出登录吗？',
    success: async (res) => {
      if (res.confirm) {
        try {
          await adminLogout()
          uni.removeStorageSync('adminToken')
          uni.reLaunch({ url: '/pages-admin/login/login' })
        }
        catch (error) {
          uni.removeStorageSync('adminToken')
          uni.reLaunch({ url: '/pages-admin/login/login' })
        }
      }
    },
  })
}
</script>

<style scoped lang="scss">
.admin-container {
  min-height: 100vh;
  background: #FAFAFA;
  padding: 16rpx;
  overflow-x: hidden;
  max-width: 100vw;
}

.statistics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12rpx;
  background: white;
  border: 1rpx solid #E8E8E8;
  border-radius: 12rpx;
  padding: 24rpx 16rpx;
  margin-bottom: 16rpx;

  .stat-item {
    text-align: center;

    .stat-value {
      font-size: 32rpx;
      font-weight: 700;
      color: #FF6B35;
      margin-bottom: 6rpx;
    }

    .stat-label {
      font-size: 20rpx;
      color: #999;
    }
  }
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
  margin-bottom: 16rpx;

  .action-card {
    background: white;
    border: 1rpx solid #E8E8E8;
    border-radius: 12rpx;
    padding: 32rpx 16rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12rpx;

    image {
      width: 56rpx;
      height: 56rpx;
      max-width: 100%;
    }

    text {
      font-size: 24rpx;
      color: #1A1A1A;
    }
  }
}

.pending-tasks {
  background: white;
  border: 1rpx solid #E8E8E8;
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 16rpx;

  .section-title {
    font-size: 26rpx;
    font-weight: 600;
    color: #1A1A1A;
    margin-bottom: 12rpx;
  }

  .task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #F5F5F5;

    &:last-child {
      border-bottom: none;
    }

    .task-info {
      .task-name {
        font-size: 26rpx;
        color: #1A1A1A;
        margin-bottom: 4rpx;
      }

      .task-desc {
        font-size: 22rpx;
        color: #999;
      }
    }

    .arrow {
      font-size: 28rpx;
      color: #CCCCCC;
    }
  }
}

.bottom-actions {
  margin-top: 32rpx;

  .logout-btn {
    background: white;
    color: #EF4444;
    border: 1rpx solid #EF4444;
    border-radius: 8rpx;
    padding: 20rpx 0;
    font-size: 26rpx;
  }
}
</style>
