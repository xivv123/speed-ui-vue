<text>
> 自定义图标的单选按钮，支持设置选中和未选中状态的图标
</text>

<template>
  <div class="radio-icons-demo">
    <sp-radio-group
      v-model="customIconValue"
      label="自定义图标："
    >
      <sp-radio
        value="heart"
        label="喜欢"
        true-icon="$heart"
        false-icon="$heartOutline"
      />
      <sp-radio
        value="star"
        label="收藏"
        true-icon="$star"
        false-icon="$starOutline"
      />
      <sp-radio
        value="thumb"
        label="点赞"
        true-icon="$thumbUp"
        false-icon="$thumbUpOutline"
      />
    </sp-radio-group>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const customIconValue = ref('heart')
</script>

<style scoped>
  .radio-icons-demo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
