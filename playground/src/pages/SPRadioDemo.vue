<template>
  <DemoContainer title="📻 SPRadio 单选按钮组件演示" description="基于 SPSelector 的单选按钮组件，支持多种样式和状态">
    <DemoSection title="基础用法">
      <sp-space direction="vertical" size="medium">
        <sp-radio-group v-model="basicValue" inline>
          <sp-radio value="option1">选项 1</sp-radio>
          <sp-radio value="option2">选项 2</sp-radio>
          <sp-radio value="option3">选项 3</sp-radio>
        </sp-radio-group>
        <p class="demo-result">当前选中值: {{ basicValue }}</p>
      </sp-space>
    </DemoSection>

    <DemoSection title="禁用状态">
      <sp-space direction="vertical" size="medium">
        <sp-radio-group v-model="disabledValue" inline>
          <sp-radio value="option1" disabled>禁用选项 1</sp-radio>
          <sp-radio value="option2">正常选项 2</sp-radio>
          <sp-radio value="option3" disabled>禁用选项 3</sp-radio>
        </sp-radio-group>
        <p class="demo-result">当前选中值: {{ disabledValue }}</p>
      </sp-space>
    </DemoSection>

    <DemoSection title="不同尺寸">
      <sp-space direction="vertical" size="medium">
        <sp-radio-group v-model="sizeValue" inline>
          <sp-radio value="small" size="small">小尺寸</sp-radio>
          <sp-radio value="medium">默认尺寸</sp-radio>
          <sp-radio value="large" size="large">大尺寸</sp-radio>
        </sp-radio-group>
        <p class="demo-result">当前选中值: {{ sizeValue }}</p>
      </sp-space>
    </DemoSection>

    <DemoSection title="错误状态">
      <sp-space direction="vertical" size="medium">
        <sp-radio-group v-model="errorValue" inline>
          <sp-radio value="option1" error>错误状态选项 1</sp-radio>
          <sp-radio value="option2">正常选项 2</sp-radio>
          <sp-radio value="option3" error>错误状态选项 3</sp-radio>
        </sp-radio-group>
        <p class="demo-result">当前选中值: {{ errorValue }}</p>
      </sp-space>
    </DemoSection>

    <DemoSection title="只读状态">
      <sp-space direction="vertical" size="medium">
        <sp-radio-group v-model="readonlyValue" inline readonly>
          <sp-radio value="option1">只读选项 1</sp-radio>
          <sp-radio value="option2">只读选项 2</sp-radio>
          <sp-radio value="option3">只读选项 3</sp-radio>
        </sp-radio-group>
        <p class="demo-result">当前选中值: {{ readonlyValue }}</p>
      </sp-space>
    </DemoSection>

    <DemoSection title="加载状态">
      <sp-space direction="vertical" size="medium">
        <sp-radio-group v-model="loadingValue" inline>
          <sp-radio value="option1" loading>加载中选项 1</sp-radio>
          <sp-radio value="option2">正常选项 2</sp-radio>
          <sp-radio value="option3" loading>加载中选项 3</sp-radio>
        </sp-radio-group>
        <p class="demo-result">当前选中值: {{ loadingValue }}</p>
      </sp-space>
    </DemoSection>

    <DemoSection title="自定义颜色">
      <sp-space direction="vertical" size="medium">
        <sp-radio-group v-model="colorValue" inline>
          <sp-radio value="red" color="#ff6b6b">红色主题</sp-radio>
          <sp-radio value="green" color="#4ecdc4">绿色主题</sp-radio>
          <sp-radio value="blue" color="#45b7d1">蓝色主题</sp-radio>
        </sp-radio-group>
        <p class="demo-result">当前选中值: {{ colorValue }}</p>
      </sp-space>
    </DemoSection>

    <DemoSection title="单选组示例">
      <sp-space direction="vertical" size="large">
        <div class="demo-group">
          <h3>选择你喜欢的编程语言：</h3>
          <sp-radio-group v-model="languageValue" inline>
            <sp-radio value="javascript">JavaScript</sp-radio>
            <sp-radio value="typescript">TypeScript</sp-radio>
            <sp-radio value="vue">Vue.js</sp-radio>
            <sp-radio value="react">React</sp-radio>
          </sp-radio-group>
          <p class="demo-result">你选择的语言: {{ languageValue }}</p>
        </div>

        <div class="demo-group">
          <h3>选择你的工作经验：</h3>
          <sp-radio-group v-model="experienceValue" inline>
            <sp-radio value="junior">初级 (0-2年)</sp-radio>
            <sp-radio value="middle">中级 (2-5年)</sp-radio>
            <sp-radio value="senior">高级 (5年以上)</sp-radio>
          </sp-radio-group>
          <p class="demo-result">你的工作经验: {{ experienceValue }}</p>
        </div>
      </sp-space>
    </DemoSection>

    <DemoSection title="垂直布局">
      <sp-space direction="vertical" size="medium">
        <sp-radio-group v-model="verticalValue">
          <sp-radio value="option1">垂直选项 1</sp-radio>
          <sp-radio value="option2">垂直选项 2</sp-radio>
          <sp-radio value="option3">垂直选项 3</sp-radio>
          <sp-radio value="option4">垂直选项 4</sp-radio>
        </sp-radio-group>
        <p class="demo-result">当前选中值: {{ verticalValue }}</p>
      </sp-space>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

// 响应式数据
const basicValue = ref('option1')
const disabledValue = ref('option2')
const sizeValue = ref('medium')
const errorValue = ref('')
const readonlyValue = ref('option2')
const loadingValue = ref('')
const colorValue = ref('red')
const languageValue = ref('vue')
const experienceValue = ref('middle')
const verticalValue = ref('option1')
</script>

<style scoped>
.demo-group {
  margin-bottom: 24px;
}

.demo-group:last-child {
  margin-bottom: 0;
}

.demo-group h3 {
  font-size: 1.1rem;
  color: var(--sp-color-text-primary);
  margin-bottom: 12px;
  font-weight: 500;
}

.demo-result {
  background: var(--sp-color-surface-variant);
  border: 1px solid var(--sp-color-outline-variant);
  border-radius: 8px;
  padding: 12px 16px;
  margin: 16px 0 0 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  color: var(--sp-color-text-secondary);
}
</style>