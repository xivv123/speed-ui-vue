<text>
    > 带有clearable的单行文本框
</text>

<template>
  <sp-row :cols="2" gap="24">
    <sp-col>
      <sp-text-field
        label="可清除文本"
        placeholder="输入内容后显示清除按钮"
        clearable
      />
    </sp-col>

    <sp-col>
      <sp-text-field
        label="可清除文本"
        variant="outlined"
        placeholder="轮廓样式 + 清除按钮"
        clearable
      />
    </sp-col>
  </sp-row>
</template>
