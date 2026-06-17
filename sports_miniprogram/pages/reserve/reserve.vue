<template>
  <view class="page">
    <!-- 服务说明 -->
    <view class="card">
      <view class="service-title text-base text-bold text-primary mb-sm">
        缠线服务预约
      </view>
      <view class="service-desc text-sm text-secondary">
        提供羽毛球拍/网球拍专业缠线服务,单次费用30元起,会员可积分抵扣
      </view>
    </view>
    
    <!-- 预约表单 -->
    <view class="card">
      <tn-form ref="formRef" :model="form">
        <tn-form-item label="姓名" required>
          <tn-input
            v-model="form.name"
            placeholder="请输入您的姓名"
            maxlength="20"
          />
        </tn-form-item>
        
        <tn-form-item label="手机号" required>
          <tn-input
            v-model="form.phone"
            placeholder="请输入手机号"
            maxlength="11"
            type="number"
          />
        </tn-form-item>
        
        <tn-form-item label="球拍类型" required>
          <tn-input
            v-model="form.racketType"
            placeholder="如:羽毛球拍/网球拍"
          />
        </tn-form-item>
        
        <tn-form-item label="预约日期" required>
          <tn-picker
            mode="date"
            v-model="form.date"
            :start-date="minDate"
            :end-date="maxDate"
            @confirm="handleDateConfirm"
          >
            <view class="picker-value">
              {{ form.date || '请选择日期' }}
            </view>
          </tn-picker>
        </tn-form-item>
        
        <tn-form-item label="预约时间" required>
          <tn-picker
            mode="selector"
            :range="timeSlots"
            v-model="timeSlotIndex"
            @confirm="handleTimeConfirm"
          >
            <view class="picker-value">
              {{ form.time || '请选择时间段' }}
            </view>
          </tn-picker>
        </tn-form-item>
        
        <tn-form-item label="备注">
          <tn-textarea
            v-model="form.remark"
            placeholder="如有特殊需求,请填写备注"
            :maxlength="100"
            :autoHeight="true"
          />
        </tn-form-item>
      </tn-form>
      
      <!-- 提交按钮 -->
      <tn-button
        type="primary"
        width="100%"
        margin="40rpx 0"
        @click="handleSubmit"
      >
        提交预约
      </tn-button>
    </view>
    
    <!-- 我的预约 -->
    <view class="card">
      <view class="section-title text-base text-bold text-primary mb-sm">
        我的预约记录
      </view>
      
      <view
        v-for="item in myReserveList"
        :key="item.id"
        class="reserve-item"
      >
        <view class="reserve-info mb-sm">
          <view class="reserve-date text-base text-bold mb-xs">
            {{ item.date }} {{ item.time }}
          </view>
          <view class="reserve-detail text-sm text-secondary">
            {{ item.name }} | {{ item.phone }} | {{ item.racketType }}
          </view>
        </view>
        <view class="reserve-status flex-between">
          <view
            class="status-tag text-sm"
            :class="getStatusClass(item.status)"
          >
            {{ getStatusText(item.status) }}
          </view>
          <view
            v-if="item.status === 'pending'"
            class="cancel-btn text-sm text-secondary"
            @click="handleCancel(item)"
          >
            取消预约
          </view>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view v-if="myReserveList.length === 0" class="empty-state">
        <tn-empty text="暂无预约记录" icon="time" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 最小日期(今天)
const minDate = ref('')
// 最大日期(30天后)
const maxDate = ref('')

// 表单数据
const form = ref({
  name: '',
  phone: '',
  racketType: '',
  date: '',
  time: '',
  remark: ''
})

// 时间段选项
const timeSlots = [
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00'
]

// 时间段索引
const timeSlotIndex = ref(0)

// 我的预约列表
const myReserveList = ref([
  {
    id: 1,
    name: '张三',
    phone: '138****1234',
    racketType: '羽毛球拍',
    date: '2026-02-01',
    time: '10:00-11:00',
    status: 'pending'
  },
  {
    id: 2,
    name: '张三',
    phone: '138****1234',
    racketType: '网球拍',
    date: '2026-01-25',
    time: '14:00-15:00',
    status: 'completed'
  }
])

// 日期确认
const handleDateConfirm = (e) => {
  form.value.date = e.value
}

// 时间确认
const handleTimeConfirm = (e) => {
  form.value.time = timeSlots[e.index]
  timeSlotIndex.value = e.index
}

// 获取状态样式
const getStatusClass = (status) => {
  const statusMap = {
    pending: 'status-pending',
    confirmed: 'status-confirmed',
    completed: 'status-completed',
    cancelled: 'status-cancelled'
  }
  return statusMap[status] || ''
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    pending: '待确认',
    confirmed: '已确认',
    completed: '已完成',
    cancelled: '已取消'
  }
  return statusMap[status] || status
}

// 提交预约
const handleSubmit = () => {
  if (!form.value.name) {
    uni.showToast({
      title: '请输入姓名',
      icon: 'none'
    })
    return
  }
  
  if (!form.value.phone) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none'
    })
    return
  }
  
  if (!/^1[3-9]\d{9}$/.test(form.value.phone)) {
    uni.showToast({
      title: '手机号格式错误',
      icon: 'none'
    })
    return
  }
  
  if (!form.value.racketType) {
    uni.showToast({
      title: '请输入球拍类型',
      icon: 'none'
    })
    return
  }
  
  if (!form.value.date) {
    uni.showToast({
      title: '请选择预约日期',
      icon: 'none'
    })
    return
  }
  
  if (!form.value.time) {
    uni.showToast({
      title: '请选择预约时间',
      icon: 'none'
    })
    return
  }
  
  // TODO: 调用API提交预约
  uni.showLoading({
    title: '提交中...'
  })
  
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '预约成功',
      icon: 'success'
    })
    
    // 重置表单
    form.value = {
      name: '',
      phone: '',
      racketType: '',
      date: '',
      time: '',
      remark: ''
    }
    
    // TODO: 重新获取预约列表
  }, 1000)
}

// 取消预约
const handleCancel = (item) => {
  uni.showModal({
    title: '确认取消',
    content: '确定要取消这个预约吗?',
    success: async (res) => {
      if (res.confirm) {
        try {
          // TODO: 调用API取消预约
          uni.showToast({
            title: '取消成功',
            icon: 'success'
          })
          
          // 更新列表
          item.status = 'cancelled'
        } catch (error) {
          uni.showToast({
            title: '取消失败',
            icon: 'none'
          })
        }
      }
    }
  })
}

onMounted(() => {
  // 设置日期范围
  const today = new Date()
  minDate.value = formatDate(today)
  
  const maxDateObj = new Date()
  maxDateObj.setDate(today.getDate() + 30)
  maxDate.value = formatDate(maxDateObj)
  
  // TODO: 获取我的预约列表
})

// 格式化日期
const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>

<style lang="scss" scoped>
.service-desc {
  line-height: 1.6;
}

.picker-value {
  min-height: 80rpx;
  display: flex;
  align-items: center;
  color: #1F2937;
}

.reserve-item {
  padding: 20rpx;
  border-bottom: 1px solid #E5E7EB;
  
  &:last-child {
    border-bottom: none;
  }
}

.reserve-status {
  margin-top: 15rpx;
}

.status-tag {
  padding: 8rpx 20rpx;
  border-radius: 4px;
  
  &.status-pending {
    background-color: #FEF3C7;
    color: #F59E0B;
  }
  
  &.status-confirmed {
    background-color: #DBEAFE;
    color: #3B82F6;
  }
  
  &.status-completed {
    background-color: #D1FAE5;
    color: #10B981;
  }
  
  &.status-cancelled {
    background-color: #F3F4F6;
    color: #9CA3AF;
  }
}

.cancel-btn {
  padding: 8rpx 20rpx;
}

.empty-state {
  padding: 80rpx 0;
}
</style>
