<template>
  <DemoContainer title="SPExpandBtn 可展开按钮组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="鼠标悬停时展开显示更多内容">
      <sp-expand-btn>
        <template #collapsed>
          <sp-icon name="heart" style="font-size: 24px; color: #ff4d4f" />
        </template>
        <template #expanded>
          <div class="expand-content">
            <sp-icon name="heart" style="font-size: 24px; color: #ff4d4f" />
            <span style="color: #ff4d4f">喜欢这个</span>
          </div>
        </template>
      </sp-expand-btn>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同形状 -->
    <DemoSection title="不同形状" subtitle="圆形和矩形两种形状">
      <div class="shape-group">
        <div>
          <p class="label">圆形 (默认)</p>
          <sp-expand-btn shape="circle">
            <template #collapsed>
              <sp-icon name="bookmark" style="font-size: 24px; color: #1890ff" />
            </template>
            <template #expanded>
              <div class="expand-content">
                <sp-icon name="bookmark" style="font-size: 24px; color: #1890ff" />
                <span style="color: #1890ff">保存书签</span>
              </div>
            </template>
          </sp-expand-btn>
        </div>

        <div>
          <p class="label">矩形</p>
          <sp-expand-btn shape="rectangle">
            <template #collapsed>
              <sp-icon name="apps" style="font-size: 24px; color: #52c41a" />
            </template>
            <template #expanded>
              <div class="expand-content">
                <sp-icon name="apps" style="font-size: 24px; color: #52c41a" />
                <span style="color: #52c41a">更多选项</span>
              </div>
            </template>
          </sp-expand-btn>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 操作按钮组 -->
    <DemoSection title="操作按钮组" subtitle="展开后显示多个操作按钮">
      <sp-expand-btn shape="rectangle" :expanded-width="220">
        <template #collapsed>
          <sp-icon name="ellipsisHorizontal" style="font-size: 24px; color: #666" />
        </template>
        <template #expanded>
          <div class="action-buttons">
            <sp-btn @click.stop size="small" color="primary">编辑</sp-btn>
            <sp-btn @click.stop size="small" color="error">删除</sp-btn>
            <sp-btn @click.stop size="small" color="success">分享</sp-btn>
          </div>
        </template>
      </sp-expand-btn>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'
</script>

<style scoped>
.shape-group {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.label {
  margin-bottom: 10px;
  color: #666;
  font-weight: 500;
  font-size: 14px;
}

.expand-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  padding: 0 12px;
}
</style>
