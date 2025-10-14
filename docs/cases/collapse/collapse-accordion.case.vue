<text>
手风琴模式，每次只能展开一个面板
</text>

<template>
  <sp-collapse v-model="activeName" accordion style="border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 4px;">
    <sp-collapse-item name="1" title="产品介绍">
      <div style="padding: 16px;">
        <div>Speed UI 是一个基于 Vue 3 的现代化组件库</div>
        <div>提供丰富的组件和完善的文档</div>
      </div>
    </sp-collapse-item>

    <sp-collapse-item name="2" title="技术栈">
      <div style="padding: 16px;">
        <div>Vue 3 + TypeScript</div>
        <div>Vite + SASS</div>
        <div>Composition API</div>
      </div>
    </sp-collapse-item>

    <sp-collapse-item name="3" title="特性">
      <div style="padding: 16px;">
        <div>组件化开发</div>
        <div>主题定制</div>
        <div>TypeScript 支持</div>
      </div>
    </sp-collapse-item>
  </sp-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPCollapse, SPCollapseItem } from 'speed-ui-vue'

const activeName = ref('1')
</script>
