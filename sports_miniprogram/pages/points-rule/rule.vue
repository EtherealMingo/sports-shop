<template>
  <view class="page">
    <!-- 规则说明 -->
    <view class="card">
      <view class="rule-section">
        <view class="section-title text-lg text-bold text-primary mb-sm">
          如何获取积分
        </view>
        <view class="rule-content text-sm">
          <view class="rule-item mb-sm">
            <text class="text-accent">●</text>
            <text class="ml-xs">消费1元积1分,封顶500分/次</text>
          </view>
          <view class="rule-item mb-sm">
            <text class="text-accent">●</text>
            <text class="ml-xs">缠线服务消费积双倍积分</text>
          </view>
          <view class="rule-item mb-sm">
            <text class="text-accent">●</text>
            <text class="ml-xs">新会员注册赠送50积分</text>
          </view>
          <view class="rule-item">
            <text class="text-accent">●</text>
            <text class="ml-xs">连续消费满10次额外赠送200积分</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="card">
      <view class="rule-section">
        <view class="section-title text-lg text-bold text-primary mb-sm">
          如何使用积分
        </view>
        <view class="rule-content text-sm">
          <view class="rule-item mb-sm">
            <text class="text-accent">●</text>
            <text class="ml-xs">100积分可抵扣10元缠线费</text>
          </view>
          <view class="rule-item mb-sm">
            <text class="text-accent">●</text>
            <text class="ml-xs">50积分可兑换运动袜一双</text>
          </view>
          <view class="rule-item mb-sm">
            <text class="text-accent">●</text>
            <text class="ml-xs">200积分可兑换护腕一个</text>
          </view>
          <view class="rule-item mb-sm">
            <text class="text-accent">●</text>
            <text class="ml-xs">300积分可兑换毛巾一条</text>
          </view>
          <view class="rule-item">
            <text class="text-accent">●</text>
            <text class="ml-xs">单次消费最多使用500积分</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="card">
      <view class="rule-section">
        <view class="section-title text-lg text-bold text-primary mb-sm">
          积分到期规则
        </view>
        <view class="rule-content text-sm">
          <view class="rule-item mb-sm">
            <text class="text-accent">●</text>
            <text class="ml-xs">积分有效期12个月,到期自动清零</text>
          </view>
          <view class="rule-item mb-sm">
            <text class="text-accent">●</text>
            <text class="ml-xs">到期前7天会短信提醒</text>
          </view>
          <view class="rule-item">
            <text class="text-accent">●</text>
            <text class="ml-xs">建议定期使用,避免积分过期</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="card">
      <view class="rule-section">
        <view class="section-title text-lg text-bold text-primary mb-sm">
          会员等级
        </view>
        <view class="rule-content text-sm">
          <view class="level-item mb-sm">
            <view class="level-name text-bold">1级会员</view>
            <view class="level-desc text-secondary">累计消费满0元</view>
          </view>
          <view class="level-item mb-sm">
            <view class="level-name text-bold">2级会员</view>
            <view class="level-desc text-secondary">累计消费满500元</view>
          </view>
          <view class="level-item mb-sm">
            <view class="level-name text-bold">3级会员</view>
            <view class="level-desc text-secondary">累计消费满2000元,缠线费9折</view>
          </view>
          <view class="level-item">
            <view class="level-name text-bold">4级会员</view>
            <view class="level-desc text-secondary">累计消费满5000元,缠线费8.5折</view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 联系方式 -->
    <view class="card mt-base">
      <view class="contact-tip text-sm text-center text-secondary">
        如有疑问,请联系店铺
        <text class="text-primary">021-12345678</text>
      </view>
    </view>
  </view>
</template>

<script setup>
// 积分规则页面 - 口语化展示,无专业术语
</script>

<style lang="scss" scoped>
.rule-section {
  padding: 10rpx 0;
}

.section-title {
  padding-bottom: 20rpx;
  border-bottom: 1px solid #E5E7EB;
}

.rule-content {
  padding-top: 20rpx;
}

.rule-item {
  line-height: 1.8;
  
  .text-accent {
    font-size: 16rpx;
  }
}

.level-item {
  padding: 16rpx;
  background-color: #F3F4F6;
  border-radius: 4px;
  
  .level-name {
    color: #1E3A8A;
    margin-bottom: 8rpx;
  }
  
  .level-desc {
    line-height: 1.5;
  }
}

.contact-tip {
  padding: 20rpx;
  line-height: 1.6;
}
</style>
