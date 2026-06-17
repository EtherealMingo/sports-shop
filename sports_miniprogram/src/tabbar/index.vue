<script setup lang="ts">
// i-carbon-code
import { customTabbarEnable, needHideNativeTabbar, tabbarCacheEnable } from './config'
import { tabbarList, tabbarStore } from './store'
import TabbarItem from './TabbarItem.vue'

// #ifdef MP-WEIXIN
// 将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
defineOptions({
  virtualHost: true,
})
// #endif

function handleClick(index: number) {
  // 点击原来的不做操作
  if (index === tabbarStore.curIdx) {
    return
  }
  const url = tabbarList[index].pagePath
  tabbarStore.setCurIdx(index)
  if (tabbarCacheEnable) {
    uni.switchTab({ url })
  }
  else {
    uni.navigateTo({ url })
  }
}
// #ifndef MP-WEIXIN || MP-ALIPAY
// 因为有了 custom:true， 微信里面不需要多余的hide操作
onLoad(() => {
  // 解决原生 tabBar 未隐藏导致有2个 tabBar 的问题
  needHideNativeTabbar
  && uni.hideTabBar({
    fail(err) {
      console.log('hideTabBar fail: ', err)
    },
    success(res) {
      // console.log('hideTabBar success: ', res)
    },
  })
})
// #endif

// #ifdef MP-ALIPAY
onMounted(() => {
  // 解决支付宝自定义tabbar 未隐藏导致有2个 tabBar 的问题; 注意支付宝很特别，需要在 onMounted 钩子调用
  customTabbarEnable // 另外，支付宝里面，只要是 customTabbar 都需要隐藏
  && uni.hideTabBar({
    fail(err) {
      console.log('hideTabBar fail: ', err)
    },
    success(res) {
      // console.log('hideTabBar success: ', res)
    },
  })
})
// #endif
const activeColor = '#2A2A26'
const inactiveColor = '#8A8A84'
function getColorByIndex(index: number) {
  return tabbarStore.curIdx === index ? activeColor : inactiveColor
}
</script>

<template>
  <view v-if="customTabbarEnable" class="tabbar-wrapper">
    <view class="glass-tabbar" @touchmove.stop.prevent>
      <view class="tabbar-container">
        <view
          v-for="(item, index) in tabbarList" :key="index"
          class="tab-item"
          :class="{ active: tabbarStore.curIdx === index }"
          @click="handleClick(index)"
        >
          <TabbarItem :item="item" :index="index" class="relative text-center" />
        </view>
      </view>
    </view>
    <!-- 安全区域占位 -->
    <view class="safe-area-placeholder" />
  </view>
</template>

<style scoped lang="scss">
.tabbar-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.glass-tabbar {
  padding: 0 24rpx;
  padding-bottom: 12rpx;
}

.tabbar-container {
  position: relative;
  padding: 12rpx 0;
  background: #FAFAF8;
  border-top: 1rpx solid #E8E8E3;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6rpx;
  padding: 10rpx 32rpx;
  transition: all 0.3s ease;

  &.active {
    /* Manner: no bounce */
  }
}

.safe-area-placeholder {
  height: env(safe-area-inset-bottom);
  min-height: 20rpx;
}
</style>
