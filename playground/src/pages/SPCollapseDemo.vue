<template>
  <DemoContainer title="SPCollapse 折叠面板组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="可折叠的内容面板">
      <SPCollapse v-model="basicValue">
        <SPCollapseItem name="1" title="一致性 Consistency">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </SPCollapseItem>
        <SPCollapseItem name="2" title="反馈 Feedback">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </SPCollapseItem>
        <SPCollapseItem name="3" title="效率 Efficiency">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        </SPCollapseItem>
      </SPCollapse>
      <sp-space :size="12" />
      <div class="status-display">展开的面板: {{ JSON.stringify(basicValue) }}</div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 手风琴模式 -->
    <DemoSection title="手风琴模式" subtitle="只能同时展开一个面板">
      <SPCollapse v-model="accordionValue" accordion>
        <SPCollapseItem name="1" title="产品介绍">
          <div>这是一个优秀的产品，具有以下特点：</div>
          <ul>
            <li>高性能：采用最新技术栈，响应速度快</li>
            <li>易用性：界面简洁直观，操作简单</li>
            <li>可扩展：模块化设计，支持自定义扩展</li>
          </ul>
        </SPCollapseItem>
        <SPCollapseItem name="2" title="技术规格">
          <div>技术参数详情：</div>
          <div class="spec-table">
            <div class="spec-row">
              <span>框架：</span>
              <span>Vue 3 + TypeScript</span>
            </div>
            <div class="spec-row">
              <span>构建工具：</span>
              <span>Vite</span>
            </div>
            <div class="spec-row">
              <span>样式方案：</span>
              <span>SCSS + CSS Variables</span>
            </div>
          </div>
        </SPCollapseItem>
        <SPCollapseItem name="3" title="使用指南">
          <div>快速开始：</div>
          <pre class="code-block">npm install speed-ui
import { SPCollapse, SPCollapseItem } from 'speed-ui'</pre>
        </SPCollapseItem>
      </SPCollapse>
      <sp-space :size="12" />
      <div class="status-display">当前展开: {{ JSON.stringify(accordionValue) }}</div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 自定义图标位置 -->
    <DemoSection title="自定义图标位置" subtitle="图标可以在左侧或右侧">
      <h3 class="subsection-title">图标在左侧</h3>
      <SPCollapse v-model="iconLeftValue" expand-icon-position="left">
        <SPCollapseItem name="1" title="左侧图标示例">
          <div>当图标位置设置为 left 时，展开/收起图标会显示在标题的左侧。</div>
        </SPCollapseItem>
        <SPCollapseItem name="2" title="另一个面板">
          <div>这是另一个面板的内容，图标同样在左侧。</div>
        </SPCollapseItem>
      </SPCollapse>

      <sp-space :size="16" />

      <h3 class="subsection-title">图标在右侧（默认）</h3>
      <SPCollapse v-model="iconRightValue" expand-icon-position="right">
        <SPCollapseItem name="1" title="右侧图标示例">
          <div>默认情况下，展开/收起图标显示在标题的右侧。</div>
        </SPCollapseItem>
        <SPCollapseItem name="2" title="标准布局">
          <div>这是标准的布局方式，符合大多数用户的使用习惯。</div>
        </SPCollapseItem>
      </SPCollapse>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 自定义内容 -->
    <DemoSection title="自定义内容" subtitle="自定义标题和图标">
      <SPCollapse v-model="customValue">
        <SPCollapseItem name="1">
          <template #title="{ isActive }">
            <div class="custom-title">
              <span class="emoji">🎨</span>
              <span :style="{ color: isActive ? '#1976d2' : '#333' }">自定义标题样式</span>
              <span :class="['status-badge', isActive ? 'active' : '']">
                {{ isActive ? '已展开' : '已收起' }}
              </span>
            </div>
          </template>
          <div>这个面板使用了自定义的标题模板，可以显示更丰富的内容。</div>
        </SPCollapseItem>

        <SPCollapseItem name="2" title="自定义图标">
          <template #icon="{ isActive }">
            <span class="custom-icon">{{ isActive ? '📂' : '📁' }}</span>
          </template>
          <div>这个面板使用了自定义的图标，展开和收起时显示不同的图标。</div>
        </SPCollapseItem>

        <SPCollapseItem name="3" title="禁用状态" disabled>
          <div>这个面板被禁用了，无法点击展开。</div>
        </SPCollapseItem>
      </SPCollapse>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

const basicValue = ref(['1'])
const accordionValue = ref('1')
const iconLeftValue = ref(['1'])
const iconRightValue = ref(['1'])
const customValue = ref(['1'])
</script>

<style scoped>
.status-display {
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
}

.subsection-title {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #666;
}

.spec-table {
  margin-top: 10px;
}

.spec-row {
  display: flex;
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.spec-row span:first-child {
  font-weight: 600;
  width: 120px;
}

.code-block {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
}

.custom-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.emoji {
  font-size: 18px;
}

.status-badge {
  background: #999;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
}

.status-badge.active {
  background: #1976d2;
}

.custom-icon {
  font-size: 16px;
  transition: transform 0.2s;
}
</style>
