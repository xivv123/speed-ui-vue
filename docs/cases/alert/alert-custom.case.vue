<text>
可以自定义图标、内容，或使用插槽自由组合内容
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-alert
      type="info"
      icon="informationCircle"
      title="自定义图标"
      text="可以自定义显示的图标样式"
    />

    <sp-alert type="success">
      <template #prepend>
        <sp-icon name="checkmarkCircle" size="24" />
      </template>
      <strong>自定义内容插槽</strong>
      <div>可以在警告框中插入任意自定义内容</div>
    </sp-alert>

    <sp-alert
      type="warning"
      :icon="false"
      text="隐藏图标的警告提示"
    />
  </sp-space>
</template>

<script setup>
</script>

<style scoped>
</style>
