<template>
  <sp-card class="demo-section">
    <sp-card-item>
      <sp-card-title>{{ title }}</sp-card-title>
      <sp-card-subtitle v-if="subtitle">{{ subtitle }}</sp-card-subtitle>
    </sp-card-item>
    <sp-card-text>
      <slot />
    </sp-card-text>
  </sp-card>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>

<style scoped>
.demo-section {
  margin-bottom: 24px;
}
</style>