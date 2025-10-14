<template>
  <DemoContainer title="SPBadge 徽章组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="徽章的基本使用方式">
      <div class="badge-group">
        <sp-badge content="5">
          <sp-btn>消息</sp-btn>
        </sp-badge>
        <sp-badge content="99">
          <sp-btn>通知</sp-btn>
        </sp-badge>
        <sp-badge content="New">
          <sp-btn>新功能</sp-btn>
        </sp-badge>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 最大值限制 -->
    <DemoSection title="最大值限制" subtitle="超过最大值显示为 max+">
      <div class="badge-group">
        <sp-badge content="99" :max="99">
          <sp-btn>消息</sp-btn>
        </sp-badge>
        <sp-badge content="100" :max="99">
          <sp-btn>通知</sp-btn>
        </sp-badge>
        <sp-badge content="1000" :max="999">
          <sp-btn>邮件</sp-btn>
        </sp-badge>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 小红点 -->
    <DemoSection title="小红点" subtitle="不显示具体数字，只显示一个点">
      <div class="badge-group">
        <sp-badge dot>
          <sp-btn>消息</sp-btn>
        </sp-badge>
        <sp-badge dot color="success">
          <sp-btn>在线状态</sp-btn>
        </sp-badge>
        <sp-badge dot color="warning">
          <sp-btn>警告</sp-btn>
        </sp-badge>
        <sp-badge dot color="error">
          <sp-btn>错误</sp-btn>
        </sp-badge>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同颜色 -->
    <DemoSection title="不同颜色" subtitle="支持多种颜色主题">
      <div class="badge-group">
        <sp-badge content="5" color="primary">
          <sp-btn>主要</sp-btn>
        </sp-badge>
        <sp-badge content="5" color="success">
          <sp-btn>成功</sp-btn>
        </sp-badge>
        <sp-badge content="5" color="warning">
          <sp-btn>警告</sp-btn>
        </sp-badge>
        <sp-badge content="5" color="error">
          <sp-btn>错误</sp-btn>
        </sp-badge>
        <sp-badge content="5" color="info">
          <sp-btn>信息</sp-btn>
        </sp-badge>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 位置调整 -->
    <DemoSection title="位置调整" subtitle="徽章可以显示在不同位置">
      <div class="badge-group">
        <sp-badge content="5" location="top start">
          <sp-btn>左上</sp-btn>
        </sp-badge>
        <sp-badge content="5" location="top end">
          <sp-btn>右上</sp-btn>
        </sp-badge>
        <sp-badge content="5" location="bottom start">
          <sp-btn>左下</sp-btn>
        </sp-badge>
        <sp-badge content="5" location="bottom end">
          <sp-btn>右下</sp-btn>
        </sp-badge>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 偏移量调整 -->
    <DemoSection title="偏移量调整" subtitle="通过 offset 属性精细调整位置">
      <div class="badge-group">
        <sp-badge content="5" :offset-x="10" :offset-y="10">
          <sp-btn>偏移调整</sp-btn>
        </sp-badge>
        <sp-badge content="5" :offset-x="-10" :offset-y="-10">
          <sp-btn>负偏移</sp-btn>
        </sp-badge>
        <sp-badge content="5" :offset-x="20" :offset-y="0">
          <sp-btn>水平偏移</sp-btn>
        </sp-badge>
        <sp-badge content="5" :offset-x="0" :offset-y="20">
          <sp-btn>垂直偏移</sp-btn>
        </sp-badge>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 带图标 -->
    <DemoSection title="带图标" subtitle="徽章内可以显示图标">
      <div class="badge-group">
        <sp-badge icon="Close" color="error">
          <sp-btn>关闭</sp-btn>
        </sp-badge>
        <sp-badge icon="RefreshOutline" color="primary">
          <sp-btn>刷新</sp-btn>
        </sp-badge>
        <sp-badge icon="CheckmarkOutline" color="success">
          <sp-btn>完成</sp-btn>
        </sp-badge>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 内联模式 -->
    <DemoSection title="内联模式" subtitle="徽章可以内联在文本中">
      <div class="badge-group inline-group">
        <span>
          收到
          <sp-badge content="5" inline color="error" />
          条新消息
        </span>
        <span>
          任务进度
          <sp-badge content="80%" inline color="success" />
        </span>
        <span>
          状态
          <sp-badge dot inline color="warning" />
          待处理
        </span>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 浮动模式 -->
    <DemoSection title="浮动模式" subtitle="徽章可以浮动显示">
      <div class="badge-group">
        <sp-badge content="5" floating>
          <sp-btn>浮动徽章</sp-btn>
        </sp-badge>
        <sp-badge dot floating color="success">
          <sp-btn>浮动小红点</sp-btn>
        </sp-badge>
        <sp-badge content="New" floating color="warning">
          <sp-btn>浮动文本</sp-btn>
        </sp-badge>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 边框样式 -->
    <DemoSection title="边框样式" subtitle="徽章可以带边框">
      <div class="badge-group">
        <sp-badge content="5" bordered>
          <sp-btn>带边框</sp-btn>
        </sp-badge>
        <sp-badge dot bordered color="warning">
          <sp-btn>边框小红点</sp-btn>
        </sp-badge>
        <sp-badge content="99+" bordered color="error">
          <sp-btn>边框文本</sp-btn>
        </sp-badge>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 动态控制 -->
    <DemoSection title="动态控制" subtitle="动态改变徽章内容和显示状态">
      <div class="badge-group">
        <sp-badge :content="badgeCount" :model-value="showBadge">
          <sp-btn @click="toggleBadge">切换显示</sp-btn>
        </sp-badge>
        <sp-btn @click="increaseBadgeCount">增加数量 ({{ badgeCount }})</sp-btn>
        <sp-btn @click="resetBadgeCount">重置数量</sp-btn>
        <sp-btn @click="setBadgeCount(99)">设置为99</sp-btn>
      </div>
      <sp-space :size="16" />
      <div class="status-display">
        当前状态: 显示={{ showBadge }}, 数量={{ badgeCount }}
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 圆角样式 -->
    <DemoSection title="圆角样式" subtitle="不同的圆角大小">
      <div class="badge-group">
        <sp-badge content="5" rounded="0">
          <sp-btn>无圆角</sp-btn>
        </sp-badge>
        <sp-badge content="5" rounded="sm">
          <sp-btn>小圆角</sp-btn>
        </sp-badge>
        <sp-badge content="5" rounded="md">
          <sp-btn>中等圆角</sp-btn>
        </sp-badge>
        <sp-badge content="5" rounded="lg">
          <sp-btn>大圆角</sp-btn>
        </sp-badge>
        <sp-badge content="5" rounded="xl">
          <sp-btn>超大圆角</sp-btn>
        </sp-badge>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 尺寸调整 -->
    <DemoSection title="尺寸调整" subtitle="自定义徽章大小">
      <div class="badge-group align-center">
        <sp-badge content="5" width="20" height="20">
          <sp-btn>小尺寸</sp-btn>
        </sp-badge>
        <sp-badge content="5" width="24" height="24">
          <sp-btn>默认尺寸</sp-btn>
        </sp-badge>
        <sp-badge content="5" width="32" height="32">
          <sp-btn>大尺寸</sp-btn>
        </sp-badge>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 文本颜色 -->
    <DemoSection title="文本颜色" subtitle="自定义徽章文本颜色">
      <div class="badge-group">
        <sp-badge content="5" color="primary" text-color="white">
          <sp-btn>白色文本</sp-btn>
        </sp-badge>
        <sp-badge content="5" color="warning" text-color="black">
          <sp-btn>黑色文本</sp-btn>
        </sp-badge>
        <sp-badge content="5" color="success" text-color="yellow">
          <sp-btn>黄色文本</sp-btn>
        </sp-badge>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 过渡动画 -->
    <DemoSection title="过渡动画" subtitle="不同的过渡动画效果">
      <div class="badge-group">
        <sp-badge :content="animatedCount" transition="scale-transition">
          <sp-btn @click="animateCount">缩放动画</sp-btn>
        </sp-badge>
        <sp-badge :content="animatedCount" transition="fade-transition">
          <sp-btn @click="animateCount">淡入淡出</sp-btn>
        </sp-badge>
        <sp-badge :content="animatedCount" transition="slide-x-transition">
          <sp-btn @click="animateCount">滑动动画</sp-btn>
        </sp-badge>
      </div>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

// 响应式数据
const badgeCount = ref(5)
const showBadge = ref(true)
const animatedCount = ref(1)

// 方法
const toggleBadge = () => {
  showBadge.value = !showBadge.value
}

const increaseBadgeCount = () => {
  badgeCount.value++
}

const resetBadgeCount = () => {
  badgeCount.value = 0
}

const setBadgeCount = (count: number) => {
  badgeCount.value = count
}

const animateCount = () => {
  animatedCount.value = animatedCount.value === 1 ? 99 : 1
}
</script>

<style scoped>
.badge-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.badge-group.align-center {
  align-items: center;
}

.badge-group.inline-group {
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.inline-group span {
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-display {
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
}
</style>
