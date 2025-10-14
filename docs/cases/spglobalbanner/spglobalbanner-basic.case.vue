<text>
基础的全局横幅用法，展示左中右三个区域的内容分布。
</text>

<template>
  <div>
    <SPGlobalBanner
      v-model="show"
      color="primary"
    >
      <template #left>
        <span style="font-weight: bold;">UNIVERSE'25</span>
      </template>
      <template #center>
        <span>IRL passes are going fast—secure your spot at Universe 2025 today.</span>
        <a href="#" style="text-decoration: underline; margin-left: 8px;">Register now</a>
      </template>
    </SPGlobalBanner>

    <div style="padding: 20px;">
      <p>页面内容...</p>
      <SPBtn @click="show = true" v-if="!show">显示横幅</SPBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPGlobalBanner, SPBtn } from 'speed-ui-vue'

const show = ref(true)
</script>
