<text>
> 带有图标和前后缀的选择器示例
</text>

<template>
  <sp-row :cols="2" gap="24">
    <sp-col>
      <sp-select v-model:value="prependIconValue" label="前置图标" placeholder="带前置图标的选择器" :items="iconItems"
        :prepend-icon="AttachOutline" />
      <sp-select v-model:value="menuIconValue" label="自定义菜单图标" placeholder="自定义下拉图标" :items="iconItems"
        :menu-icon="HelpBuoySharp" />
      <sp-select v-model:value="outlinedIconValue" label="轮廓 + 图标" variant="outlined" placeholder="轮廓样式带图标"
        :items="iconItems" :prepend-icon="BatteryChargingSharp" clearable />
    </sp-col>

    <sp-col>
      <sp-select v-model:value="appendIconValue" label="后置图标" placeholder="带后置图标的选择器" :items="iconItems"
        :append-icon="Bookmarks" />
      <sp-select v-model:value="bothIconValue" label="前后图标" placeholder="前后都有图标" :items="iconItems"
        :prepend-icon="Expand" :append-icon="FingerPrint" />
    </sp-col>
  </sp-row>
</template>

<script setup>
import { ref } from 'vue'
import { AttachOutline, BatteryChargingSharp, Bookmarks, Expand, HelpBuoySharp } from '@vicons/ionicons5'
const prependIconValue = ref('')
const appendIconValue = ref('')
const menuIconValue = ref('')
const bothIconValue = ref('')
const outlinedIconValue = ref('')

const iconItems = [
    '北京市',
    '上海市',
    '广州市',
    '深圳市',
    '杭州市',
    '成都市'
]
</script>