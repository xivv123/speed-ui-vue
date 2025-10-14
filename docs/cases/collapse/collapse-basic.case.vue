<text>
基本的折叠面板，通过 v-model 控制展开的面板
</text>

<template>
  <sp-collapse v-model="activeNames" style="border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 4px;">
    <sp-collapse-item name="1" title="一致性 Consistency">
      <div style="padding: 16px;">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </div>
    </sp-collapse-item>

    <sp-collapse-item name="2" title="反馈 Feedback">
      <div style="padding: 16px;">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </div>
    </sp-collapse-item>

    <sp-collapse-item name="3" title="效率 Efficiency">
      <div style="padding: 16px;">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </div>
    </sp-collapse-item>
  </sp-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPCollapse, SPCollapseItem } from 'speed-ui-vue'

const activeNames = ref(['1'])
</script>
