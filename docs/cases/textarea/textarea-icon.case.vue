<text>
带有图标的多行文本域，展示不同位置的图标配置
</text>

<template>
  <sp-row :cols="2" gap="24">
    <sp-col>
      <sp-textarea
        label="基础文本域"
        placeholder="基础样式"
        :prepend-icon="Location"
        :prepend-inner-icon="Person"
        :append-inner-icon="Notifications"
        :rows="3"
      />
    </sp-col>

    <sp-col>
      <sp-textarea
        label="轮廓文本域"
        variant="outlined"
        placeholder="轮廓样式"
        :prepend-icon="Heart"
        :prepend-inner-icon="Star"
        :append-icon="Play"
        :append-inner-icon="Wifi"
        :rows="3"
      />
    </sp-col>
  </sp-row>
</template>

<script setup>
import {
  Location,
  Person,
  Notifications,
  Heart,
  Star,
  Play,
  Wifi
} from '@vicons/ionicons5'
</script>
