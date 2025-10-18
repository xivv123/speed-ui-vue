<text>
> 自动增长高度的文本域
</text>

<template>
  <sp-row :cols="2" gap="24">
    <sp-col>
      <sp-textarea
        label="自动增长文本域"
        placeholder="输入内容会自动调整高度..."
        auto-grow
        :rows="2"
        :max-rows="6"
      />
    </sp-col>

    <sp-col>
      <sp-textarea
        label="自动增长 + 轮廓"
        variant="outlined"
        placeholder="轮廓样式 + 自动增长"
        auto-grow
        :rows="2"
        :max-rows="6"
      />
    </sp-col>
  </sp-row>
</template>
