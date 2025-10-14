<template>
  <DemoContainer title="SPTextarea 文本域组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="最简单的文本域使用方式">
      <sp-textarea
        v-model="basicValue"
        label="基础文本域"
        placeholder="请输入内容..."
      />
      <p style="margin-top: 8px; color: #666;">当前值: {{ basicValue }}</p>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 字符计数 -->
    <DemoSection title="字符计数" subtitle="显示字符数量限制">
      <sp-textarea
        v-model="countedValue"
        label="限制字符数"
        placeholder="最多输入100个字符..."
        :maxlength="100"
        counter
      />
    </DemoSection>

    <sp-space :size="24" />

    <!-- 自动增长高度 -->
    <DemoSection title="自动增长高度" subtitle="根据内容自动调整高度">
      <sp-textarea
        v-model="autoGrowValue"
        label="自动增长"
        placeholder="输入内容会自动调整高度..."
        auto-grow
      />
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同变体 -->
    <DemoSection title="不同变体" subtitle="多种视觉样式">
      <div class="variant-group">
        <sp-textarea
          v-model="variantValue"
          label="填充变体"
          placeholder="填充变体..."
          variant="filled"
        />
        <sp-textarea
          v-model="variantValue"
          label="轮廓变体"
          placeholder="轮廓变体..."
          variant="outlined"
        />
        <sp-textarea
          v-model="variantValue"
          label="下划线变体"
          placeholder="下划线变体..."
          variant="underlined"
        />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 禁用和只读 -->
    <DemoSection title="禁用和只读状态" subtitle="不可编辑的状态">
      <div class="state-group">
        <sp-textarea
          v-model="disabledValue"
          label="禁用文本域"
          disabled
        />
        <sp-textarea
          v-model="readonlyValue"
          label="只读文本域"
          readonly
        />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 清除按钮 -->
    <DemoSection title="清除按钮" subtitle="快速清空输入内容">
      <sp-textarea
        v-model="clearableValue"
        label="可清除文本域"
        placeholder="输入内容后会显示清除按钮..."
        clearable
      />
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

const basicValue = ref('')
const countedValue = ref('')
const autoGrowValue = ref('')
const variantValue = ref('')
const disabledValue = ref('这是禁用状态的内容')
const readonlyValue = ref('这是只读状态的内容，无法编辑')
const clearableValue = ref('')
</script>

<style scoped>
.variant-group,
.state-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
