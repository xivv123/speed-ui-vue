<text>
> 不同状态的单行文本框（正常、禁用、只读、加载等）
</text>

<template>
  <sp-row :cols="2" gap="24">
    <sp-col>
      <sp-text-field
        label="正常状态"
        placeholder="正常可编辑状态"
      />
      <sp-text-field
        label="只读状态"
        model-value="只读内容，无法编辑"
        readonly
      />
      <sp-text-field
        label="聚焦状态"
        placeholder="自动聚焦"
        autofocus
      />
      <sp-text-field
        label="轮廓 + 禁用"
        variant="outlined"
        placeholder="轮廓禁用状态"
        disabled
      />
    </sp-col>

    <sp-col>
      <sp-text-field
        label="禁用状态"
        placeholder="禁用状态"
        disabled
      />
      <sp-text-field
        label="加载状态"
        placeholder="加载中..."
        loading
      />
      <sp-text-field
        label="持久占位符"
        placeholder="占位符始终显示"
        persistent-placeholder
      />
      <sp-text-field
        label="轮廓 + 只读"
        variant="outlined"
        model-value="轮廓只读内容"
        readonly
      />
    </sp-col>
  </sp-row>
</template>
