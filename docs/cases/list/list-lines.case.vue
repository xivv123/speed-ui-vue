<text>
不同行数的列表项，支持单行、双行、三行
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">单行列表</div>
      <sp-list lines="one">
        <sp-list-item title="单行列表项" />
        <sp-list-item title="只显示标题" />
      </sp-list>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">双行列表</div>
      <sp-list lines="two">
        <sp-list-item
          title="双行列表项"
          subtitle="包含副标题的列表项"
        />
        <sp-list-item
          title="另一个项目"
          subtitle="这是副标题内容"
        />
      </sp-list>
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">三行列表</div>
      <sp-list lines="three">
        <sp-list-item
          title="三行列表项"
          subtitle="这个列表项可以显示更多内容，包括较长的副标题文本"
        />
      </sp-list>
    </div>
  </sp-space>
</template>

<script setup lang="ts">
import { SPList, SPListItem, SPSpace } from 'speed-ui-vue'
</script>
