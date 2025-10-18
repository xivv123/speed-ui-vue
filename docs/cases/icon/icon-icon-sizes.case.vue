<text>
> 图标大小 - 从 12px 到 64px 的各种尺寸展示
</text>

<template>
  <sp-row gap="24">
    <sp-col cols="6">
      <sp-icon :icon="Heart" :size="12" color="#e91e63" />
      <sp-icon :icon="Heart" :size="16" color="#e91e63" />
      <sp-icon :icon="Heart" :size="20" color="#e91e63" />
      <sp-icon :icon="Heart" :size="24" color="#e91e63" />
    </sp-col>

    <sp-col cols="6">
      <sp-icon :icon="Heart" :size="32" color="#e91e63" />
      <sp-icon :icon="Heart" :size="48" color="#e91e63" />
      <sp-icon :icon="Heart" :size="64" color="#e91e63" />
    </sp-col>
  </sp-row>
</template>

<script setup>
import {
  Heart
} from '@vicons/ionicons5'
</script>
