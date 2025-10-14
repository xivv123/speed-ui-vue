筛选面板,常见的筛选功能使用场景。

<template>
  <sp-btn @click="drawer = true">打开筛选</sp-btn>

  <sp-drawer v-model="drawer" location="right" :width="320">
    <div class="filter-drawer">
      <div class="filter-header">
        <h3>筛选条件</h3>
        <sp-btn text @click="drawer = false">完成</sp-btn>
      </div>
      <div class="filter-body">
        <div class="filter-section">
          <h4>价格区间</h4>
          <sp-checkbox v-model="filters.price1">0-100元</sp-checkbox>
          <sp-checkbox v-model="filters.price2">100-500元</sp-checkbox>
          <sp-checkbox v-model="filters.price3">500元以上</sp-checkbox>
        </div>
        <div class="filter-section">
          <h4>品牌</h4>
          <sp-checkbox v-model="filters.brand1">品牌A</sp-checkbox>
          <sp-checkbox v-model="filters.brand2">品牌B</sp-checkbox>
          <sp-checkbox v-model="filters.brand3">品牌C</sp-checkbox>
        </div>
        <div class="filter-actions">
          <sp-btn @click="resetFilters" variant="outlined">重置</sp-btn>
          <sp-btn @click="applyFilters" color="primary">应用</sp-btn>
        </div>
      </div>
    </div>
  </sp-drawer>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'

  const drawer = ref(false)

  const filters = reactive({
    price1: false,
    price2: false,
    price3: false,
    brand1: false,
    brand2: false,
    brand3: false,
  })

  const resetFilters = () => {
    Object.keys(filters).forEach(key => {
      filters[key as keyof typeof filters] = false
    })
  }

  const applyFilters = () => {
    console.log('应用筛选:', filters)
    drawer.value = false
  }
</script>

<style scoped>
  .filter-drawer {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-bottom: 1px solid #e0e0e0;
  }

  .filter-header h3 {
    margin: 0;
    font-size: 18px;
  }

  .filter-body {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
  }

  .filter-section {
    margin-bottom: 24px;
  }

  .filter-section h4 {
    margin: 0 0 12px 0;
    font-size: 14px;
    font-weight: 600;
  }

  .filter-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
  }
</style>
