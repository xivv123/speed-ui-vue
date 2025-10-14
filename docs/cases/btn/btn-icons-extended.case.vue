<text>
> 扩展图标按钮演示，展示各种常用图标和组合方式
</text>

<template>
  <sp-space direction="horizontal" :size="12" wrap>
    <sp-btn icon="Add" color="success"></sp-btn>
    <sp-btn prepend-icon="Edit">编辑</sp-btn>
    <sp-btn append-icon="Delete" color="error">删除</sp-btn>
    <sp-btn prepend-icon="Search" variant="outlined">搜索</sp-btn>
    <sp-btn prepend-icon="Save" color="success" variant="tonal">保存</sp-btn>
    <sp-btn prepend-icon="Share" append-icon="ArrowRight">分享</sp-btn>
  </sp-space>
</template>