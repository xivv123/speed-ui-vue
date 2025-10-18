<text>
> 基础图标展示 - 不同大小（16px、24px、32px、48px）和不同颜色的图标
</text>

<template>
  <sp-row gap="24">
    <sp-col cols="6">
      <sp-icon :icon="Search" :size="16" />
      <sp-icon :icon="Search" :size="24" />
      <sp-icon :icon="Search" :size="32" />
      <sp-icon :icon="Search" :size="48" />
    </sp-col>

    <sp-col cols="6">
      <sp-icon :icon="Heart" :size="24" color="red" />
      <sp-icon :icon="Heart" :size="24" color="pink" />
      <sp-icon :icon="Heart" :size="24" color="#ff6b6b" />
      <sp-icon :icon="Heart" :size="24" color="rgba(255, 107, 107, 0.5)" />
    </sp-col>
  </sp-row>
</template>

<script setup>
import {
  Search,
  Heart
} from '@vicons/ionicons5'
</script>
