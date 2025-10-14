<text>
实际应用场景示例
</text>

<template>
  <sp-space direction="vertical" :gap="30">
    <div>
      <h4 style="margin-bottom: 12px;">选择你喜欢的编程语言：</h4>
      <sp-radio-group v-model="language" inline>
        <sp-radio value="javascript">JavaScript</sp-radio>
        <sp-radio value="typescript">TypeScript</sp-radio>
      </sp-radio-group>
      <div style="margin-top: 12px; color: #666;">你选择的语言: {{ language }}</div>
    </div>

    <div>
      <h4 style="margin-bottom: 12px;">选择你的工作经验：</h4>
      <sp-radio-group v-model="experience">
        <sp-radio value="junior">初级 (0-2年)</sp-radio>
        <sp-radio value="middle">中级 (2-5年)</sp-radio>
        <sp-radio value="senior">高级 (5年以上)</sp-radio>
      </sp-radio-group>
      <div style="margin-top: 12px; color: #666;">你的工作经验: {{ experience }}</div>
    </div>
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPRadioGroup, SPRadio, SPSpace } from 'speed-ui-vue'

const language = ref('vue')
const experience = ref('middle')
</script>
