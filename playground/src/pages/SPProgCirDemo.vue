<template>
  <DemoContainer title="SPProgCir 环形进度条组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="不同进度值的展示">
      <div class="progress-group">
        <sp-prog-cir :model-value="25" color="primary">
          <template #default="{ value }">
            <div class="progress-text">{{ value }}%</div>
          </template>
        </sp-prog-cir>

        <sp-prog-cir :model-value="50" color="success">
          <template #default="{ value }">
            <div class="progress-text">{{ value }}%</div>
          </template>
        </sp-prog-cir>

        <sp-prog-cir :model-value="75" color="warning">
          <template #default="{ value }">
            <div class="progress-text">{{ value }}%</div>
          </template>
        </sp-prog-cir>

        <sp-prog-cir :model-value="100" color="error">
          <template #default="{ value }">
            <div class="progress-text">{{ value }}%</div>
          </template>
        </sp-prog-cir>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不确定进度 -->
    <DemoSection title="不确定进度" subtitle="加载动画效果">
      <div class="progress-group">
        <sp-prog-cir indeterminate color="primary" />
        <sp-prog-cir indeterminate color="success" />
        <sp-prog-cir indeterminate color="warning" />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同尺寸 -->
    <DemoSection title="不同尺寸" subtitle="小、中、大、超大">
      <div class="progress-group" style="align-items: center;">
        <sp-prog-cir :model-value="70" color="primary" size="small">
          <template #default="{ value }">
            <div style="font-size: 12px;">{{ value }}%</div>
          </template>
        </sp-prog-cir>

        <sp-prog-cir :model-value="70" color="primary" size="default">
          <template #default="{ value }">
            <div style="font-size: 16px;">{{ value }}%</div>
          </template>
        </sp-prog-cir>

        <sp-prog-cir :model-value="70" color="primary" size="large">
          <template #default="{ value }">
            <div style="font-size: 24px;">{{ value }}%</div>
          </template>
        </sp-prog-cir>

        <sp-prog-cir :model-value="70" color="primary" size="x-large">
          <template #default="{ value }">
            <div style="font-size: 32px; font-weight: 600;">{{ value }}%</div>
          </template>
        </sp-prog-cir>
      </div>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'
</script>

<style scoped>
.progress-group {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.progress-text {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}
</style>
