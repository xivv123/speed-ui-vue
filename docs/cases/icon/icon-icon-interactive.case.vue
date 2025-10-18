<text>
> 交互图标 - 可点击图标、禁用状态、带徽章图标
</text>

<template>
  <sp-row gap="24">
    <sp-col cols="6">
      <sp-icon
        :icon="Heart"
        :size="32"
        clickable
        :color="liked ? '#e91e63' : '#ccc'"
        @click="liked = !liked"
      />
      <sp-icon
        :icon="Notifications"
        :size="32"
        clickable
        :color="notified ? '#2196f3' : '#ccc'"
        @click="notified = !notified"
      />
      <sp-icon
        :icon="Person"
        :size="32"
        clickable
        :color="followed ? '#4caf50' : '#ccc'"
        @click="followed = !followed"
      />
    </sp-col>

    <sp-col cols="6">
      <sp-icon :icon="Search" :size="28" />
      <sp-icon :icon="Search" :size="28" disabled />
      <sp-icon :icon="Search" :size="28" clickable disabled />
    </sp-col>
  </sp-row>
</template>

<script setup>
import { ref } from 'vue'
import {
  Heart,
  Notifications,
  Person,
  Search
} from '@vicons/ionicons5'

const liked = ref(false)
const notified = ref(false)
const followed = ref(false)
</script>
