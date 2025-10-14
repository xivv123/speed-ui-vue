<text>
    > 带有clearable的单行文本框
</text>

<template>
  <sp-space direction="vertical" >
    <sp-text-field
      label="可清除文本"
      placeholder="输入内容后显示清除按钮"
      clearable
      style="width: 300px"
    />
    <sp-text-field
      label="可清除文本"
      variant="outlined"
      placeholder="轮廓样式 + 清除按钮"
      clearable
      style="width: 300px"
    />
  </sp-space>
</template>
