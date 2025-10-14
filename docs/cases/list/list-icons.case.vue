<text>
带图标的列表，支持前置和后置图标
</text>

<template>
  <sp-list>
    <sp-list-item
      prepend-icon="Home"
      title="首页"
      subtitle="查看首页内容"
    />
    <sp-list-item
      prepend-icon="Person"
      title="个人中心"
      subtitle="管理个人信息"
    />
    <sp-list-item
      prepend-icon="Settings"
      title="设置"
      subtitle="系统设置"
      append-icon="ChevronForward"
    />
  </sp-list>
</template>

<script setup lang="ts">
import { SPList, SPListItem } from 'speed-ui-vue'
</script>
