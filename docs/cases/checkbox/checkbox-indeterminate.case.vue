<text>
> 不确定状态的复选框，实现全选功能
</text>

<template>
  <div class="checkbox-indeterminate-demo">
    <sp-checkbox
      v-model="parentValue"
      :indeterminate="isIndeterminate"
      label="全选"
      @change="onParentChange"
    />
    <div class="child-checkboxes">
      <sp-checkbox
        v-model="childValue1"
        label="子选项 1"
        @change="onChildChange"
      />
      <sp-checkbox
        v-model="childValue2"
        label="子选项 2"
        @change="onChildChange"
      />
      <sp-checkbox
        v-model="childValue3"
        label="子选项 3"
        @change="onChildChange"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'

  const parentValue = ref(false)
  const childValue1 = ref(false)
  const childValue2 = ref(true)
  const childValue3 = ref(false)

  const isIndeterminate = computed(() => {
    const checkedCount = [childValue1.value, childValue2.value, childValue3.value].filter(Boolean).length
    return checkedCount > 0 && checkedCount < 3
  })

  const onParentChange = (value) => {
    childValue1.value = value
    childValue2.value = value
    childValue3.value = value
  }

  const onChildChange = () => {
    const checkedCount = [childValue1.value, childValue2.value, childValue3.value].filter(Boolean).length
    parentValue.value = checkedCount === 3
  }
</script>

<style scoped>
  .checkbox-indeterminate-demo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .child-checkboxes {
    margin-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
</style>
