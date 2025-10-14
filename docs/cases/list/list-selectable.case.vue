<text>
可选择的列表，通过 v-model 控制选中项
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <sp-list v-model:selected="selected">
      <sp-list-item
        v-for="item in items"
        :key="item.value"
        :title="item.title"
        :value="item.value"
      />
    </sp-list>
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPList, SPListItem, SPSpace } from 'speed-ui-vue'

const selected = ref([1])

const items = [
  { title: '选项 1', value: 1 },
  { title: '选项 2', value: 2 },
  { title: '选项 3', value: 3 },
  { title: '选项 4', value: 4 },
]
</script>
