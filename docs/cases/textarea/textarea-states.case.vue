<text>
> 不同状态的文本域（禁用、只读等）
</text>

<template>
  <sp-space wrap>
    <sp-textarea
      label="正常状态"
      placeholder="正常可编辑状态"
      :rows="3"
      style="width: 300px"
    />
    <sp-textarea
      label="禁用状态"
      placeholder="禁用状态"
      disabled
      :rows="3"
      style="width: 300px"
    />
    <sp-textarea
      label="只读状态"
      model-value="这是只读状态的内容，无法编辑"
      readonly
      :rows="3"
      style="width: 300px"
    />
  </sp-space>
</template>
