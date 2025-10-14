<template>
  <DemoContainer title="SPStretchBtn 拉伸按钮组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="鼠标悬停时拉伸展开">
      <sp-stretch-btn>
        <template #icon>
          <sp-icon name="add" size="20" />
        </template>
        <template #text>
          添加项目
        </template>
      </sp-stretch-btn>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同颜色 -->
    <DemoSection title="不同颜色" subtitle="多种颜色主题">
      <div class="button-group">
        <sp-stretch-btn color="primary">
          <template #icon>
            <sp-icon name="save" size="20" />
          </template>
          <template #text>
            保存
          </template>
        </sp-stretch-btn>

        <sp-stretch-btn color="success">
          <template #icon>
            <sp-icon name="checkmark" size="20" />
          </template>
          <template #text>
            确认
          </template>
        </sp-stretch-btn>

        <sp-stretch-btn color="error">
          <template #icon>
            <sp-icon name="trash" size="20" />
          </template>
          <template #text>
            删除
          </template>
        </sp-stretch-btn>

        <sp-stretch-btn color="warning">
          <template #icon>
            <sp-icon name="warning" size="20" />
          </template>
          <template #text>
            警告
          </template>
        </sp-stretch-btn>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同尺寸 -->
    <DemoSection title="不同尺寸" subtitle="小、中、大三种尺寸">
      <div class="button-group" style="align-items: center;">
        <sp-stretch-btn size="small">
          <template #icon>
            <sp-icon name="download" size="16" />
          </template>
          <template #text>
            下载
          </template>
        </sp-stretch-btn>

        <sp-stretch-btn size="default">
          <template #icon>
            <sp-icon name="download" size="20" />
          </template>
          <template #text>
            下载
          </template>
        </sp-stretch-btn>

        <sp-stretch-btn size="large">
          <template #icon>
            <sp-icon name="download" size="24" />
          </template>
          <template #text>
            下载
          </template>
        </sp-stretch-btn>
      </div>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'
</script>

<style scoped>
.button-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
</style>
