<text>
自定义展开图标的位置，可以设置为左侧或右侧
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">图标在左侧</div>
      <sp-collapse v-model="activeNames1" expand-icon-position="left" style="border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 4px;">
        <sp-collapse-item name="1" title="标题一">
          <div style="padding: 16px;">这是内容区域</div>
        </sp-collapse-item>
        <sp-collapse-item name="2" title="标题二">
          <div style="padding: 16px;">这是内容区域</div>
        </sp-collapse-item>
      </sp-collapse>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">图标在右侧（默认）</div>
      <sp-collapse v-model="activeNames2" expand-icon-position="right" style="border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 4px;">
        <sp-collapse-item name="1" title="标题一">
          <div style="padding: 16px;">这是内容区域</div>
        </sp-collapse-item>
        <sp-collapse-item name="2" title="标题二">
          <div style="padding: 16px;">这是内容区域</div>
        </sp-collapse-item>
      </sp-collapse>
    </div>
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPCollapse, SPCollapseItem, SPSpace } from 'speed-ui-vue'

const activeNames1 = ref(['1'])
const activeNames2 = ref(['1'])
</script>
