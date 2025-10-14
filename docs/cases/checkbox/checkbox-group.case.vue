<text>
> 复选框组合使用，多个复选框绑定到同一个数组
</text>

<template>
  <div class="checkbox-group-demo">
    <h4>兴趣爱好选择:</h4>
    <sp-checkbox
      v-model="hobbies"
      label="阅读"
      value="reading"
    />
    <sp-checkbox
      v-model="hobbies"
      label="运动"
      value="sports"
    />
    <sp-checkbox
      v-model="hobbies"
      label="音乐"
      value="music"
    />
    <sp-checkbox
      v-model="hobbies"
      label="旅行"
      value="travel"
    />
    <sp-checkbox
      v-model="hobbies"
      label="编程"
      value="coding"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const hobbies = ref(['music', 'coding'])
</script>

<style scoped>
  .checkbox-group-demo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .checkbox-group-demo h4 {
    margin: 0 0 0.5rem 0;
    color: #333;
    font-size: 1rem;
    font-weight: 600;
  }
</style>
