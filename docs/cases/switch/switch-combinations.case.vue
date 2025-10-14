<text>
> 开关组件的组合示例，展示多种属性的组合使用效果
</text>

<template>
  <div class="switch-combinations-demo">
    <sp-switch
      v-model="combo1Value"
      label="Primary + Inset + 文字"
      color="primary"
      inset
      thumb-checked-text="ON"
      thumb-unchecked-text="OFF"
    />

    <sp-switch
      v-model="combo2Value"
      label="Success + Flat + 符号"
      color="success"
      flat
      thumb-checked-text="✓"
      thumb-unchecked-text="✗"
    />

    <sp-switch
      v-model="combo3Value"
      label="Warning + Inset + Flat + 数字"
      color="warning"
      inset
      flat
      thumb-checked-text="1"
      thumb-unchecked-text="0"
    />

    <sp-switch
      v-model="combo4Value"
      label="Error + 方形 + 中文"
      color="error"
      inset-square
      thumb-checked-text="开"
      thumb-unchecked-text="关"
    />

    <sp-switch
      v-model="combo5Value"
      label="Info + 大尺寸 + 内部文本"
      color="info"
      size="large"
      show-text
      checked-text="启用"
      unchecked-text="禁用"
    />

    <sp-switch
      v-model="combo6Value"
      label="Secondary + 小尺寸 + 左标签"
      color="secondary"
      size="small"
      label-position="left"
      thumb-checked-text="Y"
      thumb-unchecked-text="N"
    />

    <div class="status-display">
      <h4>当前状态:</h4>
      <pre>{{
        {
          primaryInset: combo1Value,
          successFlat: combo2Value,
          warningCombo: combo3Value,
          errorSquare: combo4Value,
          infoLarge: combo5Value,
          secondarySmall: combo6Value,
        }
      }}</pre>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const combo1Value = ref(true)
  const combo2Value = ref(false)
  const combo3Value = ref(true)
  const combo4Value = ref(false)
  const combo5Value = ref(true)
  const combo6Value = ref(false)
</script>

<style scoped>
  .switch-combinations-demo {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .status-display {
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 6px;
    border-left: 4px solid #28a745;
    margin-top: 1rem;
  }

  .status-display h4 {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
  }

  .status-display pre {
    background: #2c3e50;
    color: #ecf0f1;
    padding: 0.75rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    margin: 0;
    overflow-x: auto;
  }
</style>
