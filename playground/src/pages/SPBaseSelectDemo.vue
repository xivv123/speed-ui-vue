<template>
  <DemoContainer title="SPBaseSelect 基础选择器组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="单选和多选模式">
      <div class="select-group">
        <div class="select-item">
          <h3>单选模式</h3>
          <sp-base-select
            v-model="singleValue"
            :items="basicItems"
            placeholder="请选择一个选项"
            style="width: 200px"
          />
          <p>选中值: {{ singleValue }}</p>
        </div>

        <div class="select-item">
          <h3>多选模式</h3>
          <sp-base-select
            v-model="multipleValue"
            :items="basicItems"
            multiple
            placeholder="请选择多个选项"
            style="width: 250px"
          />
          <p>选中值: {{ multipleValue }}</p>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同尺寸 -->
    <DemoSection title="不同尺寸" subtitle="小、中、大三种尺寸">
      <div class="select-group">
        <div class="select-item">
          <h3>小尺寸</h3>
          <sp-base-select
            v-model="sizeSmallValue"
            :items="basicItems"
            size="small"
            placeholder="小尺寸选择器"
            style="width: 180px"
          />
        </div>

        <div class="select-item">
          <h3>中等尺寸</h3>
          <sp-base-select
            v-model="sizeMediumValue"
            :items="basicItems"
            size="medium"
            placeholder="中等尺寸选择器"
            style="width: 200px"
          />
        </div>

        <div class="select-item">
          <h3>大尺寸</h3>
          <sp-base-select
            v-model="sizeLargeValue"
            :items="basicItems"
            size="large"
            placeholder="大尺寸选择器"
            style="width: 220px"
          />
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同变体 -->
    <DemoSection title="不同变体" subtitle="多种视觉样式">
      <div class="select-group">
        <div class="select-item">
          <h3>默认变体</h3>
          <sp-base-select
            v-model="variantDefaultValue"
            :items="basicItems"
            variant="default"
            placeholder="默认变体"
            style="width: 200px"
          />
        </div>

        <div class="select-item">
          <h3>填充变体</h3>
          <sp-base-select
            v-model="variantFilledValue"
            :items="basicItems"
            variant="filled"
            placeholder="填充变体"
            style="width: 200px"
          />
        </div>

        <div class="select-item">
          <h3>轮廓变体</h3>
          <sp-base-select
            v-model="variantOutlinedValue"
            :items="basicItems"
            variant="outlined"
            placeholder="轮廓变体"
            style="width: 200px"
          />
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 禁用状态 -->
    <DemoSection title="禁用状态" subtitle="禁用和只读状态">
      <div class="select-group">
        <div class="select-item">
          <h3>禁用的选择器</h3>
          <sp-base-select
            v-model="disabledValue"
            :items="basicItems"
            disabled
            placeholder="禁用状态"
            style="width: 200px"
          />
        </div>

        <div class="select-item">
          <h3>只读状态</h3>
          <sp-base-select
            v-model="readonlyValue"
            :items="basicItems"
            readonly
            placeholder="只读状态"
            style="width: 200px"
          />
        </div>
      </div>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

const basicItems = [
  { title: '选项 1', value: 'option1' },
  { title: '选项 2', value: 'option2' },
  { title: '选项 3', value: 'option3' },
  { title: '选项 4', value: 'option4' },
  { title: '选项 5', value: 'option5' },
]

const singleValue = ref('')
const multipleValue = ref([])
const sizeSmallValue = ref('')
const sizeMediumValue = ref('')
const sizeLargeValue = ref('')
const variantDefaultValue = ref('')
const variantFilledValue = ref('')
const variantOutlinedValue = ref('')
const disabledValue = ref('option1')
const readonlyValue = ref('option2')
</script>

<style scoped>
.select-group {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.select-item {
  flex: 1;
  min-width: 250px;
}

.select-item h3 {
  color: #555;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.select-item p {
  margin-top: 8px;
  font-size: 12px;
  color: #888;
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}
</style>
