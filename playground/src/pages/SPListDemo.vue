<template>
  <DemoContainer title="SPList 列表组件">
    <!-- 基础列表 -->
    <DemoSection title="基础列表" subtitle="简单的列表展示">
      <sp-card>
        <sp-list activatable>
          <sp-list-item>
            <sp-list-item-title>列表项 1</sp-list-item-title>
          </sp-list-item>
          <sp-list-item>
            <sp-list-item-title>列表项 2</sp-list-item-title>
          </sp-list-item>
          <sp-list-item>
            <sp-list-item-title>列表项 3</sp-list-item-title>
          </sp-list-item>
        </sp-list>
      </sp-card>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 带副标题的列表 -->
    <DemoSection title="带副标题的列表" subtitle="包含主标题和副标题">
      <sp-list>
        <sp-list-item>
          <sp-list-item-title>主标题 1</sp-list-item-title>
          <sp-list-item-subtitle>这是副标题描述</sp-list-item-subtitle>
        </sp-list-item>
        <sp-list-item>
          <sp-list-item-title>主标题 2</sp-list-item-title>
          <sp-list-item-subtitle>这是另一个副标题</sp-list-item-subtitle>
        </sp-list-item>
      </sp-list>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 带媒体内容的列表 -->
    <DemoSection title="带媒体内容的列表" subtitle="列表项包含头像或图标">
      <sp-list>
        <sp-list-item>
          <sp-list-item-media>
            <div class="avatar">A</div>
          </sp-list-item-media>
          <sp-list-item-title>用户 A</sp-list-item-title>
          <sp-list-item-subtitle>在线状态</sp-list-item-subtitle>
        </sp-list-item>
        <sp-list-item>
          <sp-list-item-media>
            <div class="avatar">B</div>
          </sp-list-item-media>
          <sp-list-item-title>用户 B</sp-list-item-title>
          <sp-list-item-subtitle>离线状态</sp-list-item-subtitle>
        </sp-list-item>
      </sp-list>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 带操作按钮的列表 -->
    <DemoSection title="带操作按钮的列表" subtitle="列表项包含操作按钮">
      <sp-list>
        <sp-list-item>
          <sp-list-item-title>文档 1.pdf</sp-list-item-title>
          <sp-list-item-subtitle>2.5 MB</sp-list-item-subtitle>
          <sp-list-item-action>
            <sp-btn size="small" @click="handleDownload">下载</sp-btn>
          </sp-list-item-action>
        </sp-list-item>
        <sp-list-item>
          <sp-list-item-title>图片 2.jpg</sp-list-item-title>
          <sp-list-item-subtitle>1.2 MB</sp-list-item-subtitle>
          <sp-list-item-action>
            <sp-btn size="small" @click="handleDownload">下载</sp-btn>
          </sp-list-item-action>
        </sp-list-item>
      </sp-list>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 分组列表 -->
    <DemoSection title="分组列表" subtitle="使用子标题分组">
      <sp-list>
        <sp-list-subheader>最近使用</sp-list-subheader>
        <sp-list-item>
          <sp-list-item-title>项目 A</sp-list-item-title>
          <sp-list-item-subtitle>2小时前</sp-list-item-subtitle>
        </sp-list-item>
        <sp-list-item>
          <sp-list-item-title>项目 B</sp-list-item-title>
          <sp-list-item-subtitle>5小时前</sp-list-item-subtitle>
        </sp-list-item>

        <sp-list-subheader>所有项目</sp-list-subheader>
        <sp-list-item>
          <sp-list-item-title>项目 C</sp-list-item-title>
          <sp-list-item-subtitle>昨天</sp-list-item-subtitle>
        </sp-list-item>
        <sp-list-item>
          <sp-list-item-title>项目 D</sp-list-item-title>
          <sp-list-item-subtitle>上周</sp-list-item-subtitle>
        </sp-list-item>
      </sp-list>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 可选择列表 -->
    <DemoSection title="可选择列表" subtitle="支持多选的列表">
      <sp-list v-model:selected="selectedItems" select-strategy="multiple">
        <sp-list-item value="item1">
          <sp-list-item-title>可选项 1</sp-list-item-title>
        </sp-list-item>
        <sp-list-item value="item2">
          <sp-list-item-title>可选项 2</sp-list-item-title>
        </sp-list-item>
        <sp-list-item value="item3">
          <sp-list-item-title>可选项 3</sp-list-item-title>
        </sp-list-item>
      </sp-list>
      <sp-space :size="12" />
      <div class="status-display">已选择: {{ selectedItems.join(', ') || '无' }}</div>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

const selectedItems = ref<string[]>([])

const handleDownload = () => {
  alert('下载功能演示')
}
</script>

<style scoped>
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.status-display {
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
}
</style>
