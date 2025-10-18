<text>
> 图标颜色 - 主题色、灰度色、透明度等多种颜色展示
</text>

<template>
  <sp-row gap="24">
    <sp-col cols="6">
      <sp-icon :icon="Heart" :size="32" color="#1976d2" />
      <sp-icon :icon="Heart" :size="32" color="#dc004e" />
      <sp-icon :icon="Heart" :size="32" color="#ff9800" />
      <sp-icon :icon="Heart" :size="32" color="#4caf50" />
      <sp-icon :icon="Heart" :size="32" color="#2196f3" />
    </sp-col>

    <sp-col cols="6">
      <sp-icon :icon="Person" :size="28" color="#000" />
      <sp-icon :icon="Person" :size="28" color="#666" />
      <sp-icon :icon="Person" :size="28" color="#999" />
      <sp-icon :icon="Person" :size="28" color="#ccc" />
    </sp-col>
  </sp-row>
</template>

<script setup>
import {
  Heart,
  Person
} from '@vicons/ionicons5'
</script>
