<text>
导航列表，带有圆角和高亮效果
</text>

<template>
  <sp-list nav>
    <sp-list-item
      prepend-icon="Dashboard"
      title="仪表盘"
      value="dashboard"
    />
    <sp-list-item
      prepend-icon="ShoppingCart"
      title="订单管理"
      value="orders"
    />
    <sp-list-item
      prepend-icon="People"
      title="用户管理"
      value="users"
    />
    <sp-list-item
      prepend-icon="Settings"
      title="系统设置"
      value="settings"
    />
  </sp-list>
</template>

<script setup lang="ts">
import { SPList, SPListItem } from 'speed-ui-vue'
</script>
