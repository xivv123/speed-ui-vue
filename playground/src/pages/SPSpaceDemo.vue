<template>
  <DemoContainer title="SPSpace 间距组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="最简单的用法，默认为水平布局">
      <sp-space>
        <sp-btn>按钮 1</sp-btn>
        <sp-btn>按钮 2</sp-btn>
        <sp-btn>按钮 3</sp-btn>
      </sp-space>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 垂直布局 -->
    <DemoSection title="垂直布局" subtitle="设置 direction='vertical' 可以让子元素垂直排列">
      <sp-space direction="vertical">
        <sp-btn>按钮 1</sp-btn>
        <sp-btn>按钮 2</sp-btn>
        <sp-btn>按钮 3</sp-btn>
      </sp-space>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同尺寸 -->
    <DemoSection title="不同尺寸" subtitle="内置 small、default、large 三种尺寸，也可以使用数字自定义间距">
      <div class="size-demo">
        <div class="size-item">
          <label>小间距 (small):</label>
          <sp-space size="small">
            <sp-btn>按钮 1</sp-btn>
            <sp-btn>按钮 2</sp-btn>
            <sp-btn>按钮 3</sp-btn>
          </sp-space>
        </div>
        <div class="size-item">
          <label>默认间距 (default):</label>
          <sp-space size="default">
            <sp-btn>按钮 1</sp-btn>
            <sp-btn>按钮 2</sp-btn>
            <sp-btn>按钮 3</sp-btn>
          </sp-space>
        </div>
        <div class="size-item">
          <label>大间距 (large):</label>
          <sp-space size="large">
            <sp-btn>按钮 1</sp-btn>
            <sp-btn>按钮 2</sp-btn>
            <sp-btn>按钮 3</sp-btn>
          </sp-space>
        </div>
        <div class="size-item">
          <label>自定义间距 (32px):</label>
          <sp-space :size="32">
            <sp-btn>按钮 1</sp-btn>
            <sp-btn>按钮 2</sp-btn>
            <sp-btn>按钮 3</sp-btn>
          </sp-space>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 自动换行 -->
    <DemoSection title="自动换行" subtitle="设置 wrap 属性可以让子元素在空间不足时自动换行">
      <sp-space wrap style="width: 300px; border: 1px dashed #ccc; padding: 10px">
        <sp-btn v-for="i in 8" :key="i">
          按钮 {{ i }}
        </sp-btn>
      </sp-space>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 对齐方式 -->
    <DemoSection title="对齐方式" subtitle="通过 alignment 属性设置子元素的对齐方式">
      <div class="alignment-demo">
        <div class="alignment-item">
          <label>居中对齐 (center):</label>
          <sp-space alignment="center" style="height: 80px; background: #f5f5f5; padding: 10px">
            <sp-btn>按钮</sp-btn>
            <sp-btn size="large">大按钮</sp-btn>
            <sp-btn size="small">小按钮</sp-btn>
          </sp-space>
        </div>
        <div class="alignment-item">
          <label>顶部对齐 (start):</label>
          <sp-space alignment="start" style="height: 80px; background: #f5f5f5; padding: 10px">
            <sp-btn>按钮</sp-btn>
            <sp-btn size="large">大按钮</sp-btn>
            <sp-btn size="small">小按钮</sp-btn>
          </sp-space>
        </div>
        <div class="alignment-item">
          <label>底部对齐 (end):</label>
          <sp-space alignment="end" style="height: 80px; background: #f5f5f5; padding: 10px">
            <sp-btn>按钮</sp-btn>
            <sp-btn size="large">大按钮</sp-btn>
            <sp-btn size="small">小按钮</sp-btn>
          </sp-space>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 填充容器 -->
    <DemoSection title="填充容器" subtitle="设置 fill 属性可以让子元素平均分配容器宽度">
      <sp-space fill style="width: 100%; background: #f5f5f5; padding: 10px">
        <sp-btn>按钮 1</sp-btn>
        <sp-btn>按钮 2</sp-btn>
        <sp-btn>按钮 3</sp-btn>
      </sp-space>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'
</script>

<style scoped>
.size-demo,
.alignment-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.size-item,
.alignment-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.size-item label,
.alignment-item label {
  font-weight: 500;
  color: #2c3e50;
}
</style>
