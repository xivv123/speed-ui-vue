<text>
带图标的分段控制器，可以只显示图标或图标配文字
</text>

<template>
  <div class="demo-container">
    <div class="demo-item">
      <p class="label">图标配文字</p>
      <sp-segmented
        v-model="selected1"
        :options="options1"
      />
    </div>

    <div class="demo-item">
      <p class="label">仅图标</p>
      <sp-segmented
        v-model="selected2"
        :options="options2"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected1 = ref('list')
const selected2 = ref('grid')

const options1 = [
  {
    label: '列表',
    value: 'list',
    trueIcon: 'mdi-view-list'
  },
  {
    label: '网格',
    value: 'grid',
    trueIcon: 'mdi-view-grid'
  },
  {
    label: '看板',
    value: 'kanban',
    trueIcon: 'mdi-view-column'
  }
]

const options2 = [
  {
    label: '',
    value: 'list',
    trueIcon: 'mdi-view-list'
  },
  {
    label: '',
    value: 'grid',
    trueIcon: 'mdi-view-grid'
  },
  {
    label: '',
    value: 'kanban',
    trueIcon: 'mdi-view-column'
  }
]
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
}

.demo-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.label {
  font-size: 14px;
  color: #666;
  margin: 0;
}
</style>
