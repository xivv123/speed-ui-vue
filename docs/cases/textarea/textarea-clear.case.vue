<text>
> 带有clearable的多行文本域
</text>

<template>
  <sp-space wrap>
    <sp-textarea
      label="可清除文本域"
      placeholder="输入内容后显示清除按钮"
      clearable
      :rows="3"
      style="width: 300px"
    />
    <sp-textarea
      label="可清除文本域"
      variant="outlined"
      placeholder="轮廓样式 + 清除按钮"
      clearable
      :rows="3"
      style="width: 300px"
    />
  </sp-space>
</template>
