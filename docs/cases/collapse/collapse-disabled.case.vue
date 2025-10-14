<text>
禁用单个面板，禁用的面板无法展开或收起
</text>

<template>
  <sp-collapse v-model="activeNames" style="border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 4px;">
    <sp-collapse-item name="1" title="正常面板">
      <div style="padding: 16px;">这个面板可以正常展开和收起</div>
    </sp-collapse-item>

    <sp-collapse-item name="2" title="禁用面板" disabled>
      <div style="padding: 16px;">这个面板被禁用了</div>
    </sp-collapse-item>

    <sp-collapse-item name="3" title="正常面板">
      <div style="padding: 16px;">这个面板可以正常展开和收起</div>
    </sp-collapse-item>
  </sp-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPCollapse, SPCollapseItem } from 'speed-ui-vue'

const activeNames = ref(['1'])
</script>
