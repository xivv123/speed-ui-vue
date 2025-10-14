<text>
> 不同状态的单行文本框（正常、禁用、只读、加载等）
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-space wrap>
      <sp-text-field
        label="正常状态"
        placeholder="正常可编辑状态"
        style="width: 280px"
      />
      <sp-text-field
        label="禁用状态"
        placeholder="禁用状态"
        disabled
        style="width: 280px"
      />
      <sp-text-field
        label="只读状态"
        model-value="只读内容，无法编辑"
        readonly
        style="width: 280px"
      />
    </sp-space>
    
    <sp-space wrap>
      <sp-text-field
        label="加载状态"
        placeholder="加载中..."
        loading
        style="width: 280px"
      />
      <sp-text-field
        label="聚焦状态"
        placeholder="自动聚焦"
        autofocus
        style="width: 280px"
      />
      <sp-text-field
        label="持久占位符"
        placeholder="占位符始终显示"
        persistent-placeholder
        style="width: 280px"
      />
    </sp-space>
    
    <sp-space wrap>
      <sp-text-field
        label="轮廓 + 禁用"
        variant="outlined"
        placeholder="轮廓禁用状态"
        disabled
        style="width: 280px"
      />
      <sp-text-field
        label="轮廓 + 只读"
        variant="outlined"
        model-value="轮廓只读内容"
        readonly
        style="width: 280px"
      />
    </sp-space>
  </sp-space>
</template>
