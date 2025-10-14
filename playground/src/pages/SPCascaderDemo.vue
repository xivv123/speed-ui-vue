<template>
  <DemoContainer title="SPCascader 级联选择器组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="单选和多选模式">
      <div class="demo-group">
        <div>
          <h4>单选模式</h4>
          <SPCascader
            v-model="singleValue"
            :options="basicOptions"
            placeholder="请选择地区"
            style="width: 300px"
          />
          <p class="result">选中值: {{ JSON.stringify(singleValue) }}</p>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 展开触发方式 -->
    <DemoSection title="展开触发方式" subtitle="点击或悬停展开">
      <div class="demo-group">
        <div>
          <h4>点击展开（默认）</h4>
          <SPCascader
            v-model="clickValue"
            :options="basicOptions"
            expand-trigger="click"
            placeholder="点击展开子级"
            style="width: 300px"
          />
        </div>
        <div>
          <h4>悬停展开</h4>
          <SPCascader
            v-model="hoverValue"
            :options="basicOptions"
            expand-trigger="hover"
            placeholder="悬停展开子级"
            style="width: 300px"
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
import { SPCascader } from '@speed-ui/ui'

const basicOptions = [
  {
    label: '北京市',
    value: 'beijing',
    children: [
      {
        label: '海淀区',
        value: 'haidian',
        children: [
          { label: '中关村', value: 'zhongguancun' },
          { label: '五道口', value: 'wudaokou' },
        ],
      },
      {
        label: '朝阳区',
        value: 'chaoyang',
        children: [
          { label: '三里屯', value: 'sanlitun' },
          { label: '国贸', value: 'guomao' },
        ],
      },
    ],
  },
  {
    label: '上海市',
    value: 'shanghai',
    children: [
      {
        label: '浦东新区',
        value: 'pudong',
        children: [
          { label: '陆家嘴', value: 'lujiazui' },
          { label: '张江', value: 'zhangjiang' },
        ],
      },
    ],
  },
]

const singleValue = ref(null)
const clickValue = ref(null)
const hoverValue = ref(null)
</script>

<style scoped>
.demo-group {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.demo-group > div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

h4 {
  color: #555;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}

.result {
  margin-top: 8px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #666;
}
</style>
