<text>
> 带有clearable的多行文本域
</text>

<template>
  <sp-row :cols="2" gap="24">
    <sp-col>
      <sp-textarea
        label="可清除文本域"
        placeholder="输入内容后显示清除按钮"
        clearable
        :rows="3"
      />
    </sp-col>

    <sp-col>
      <sp-textarea
        label="可清除文本域"
        variant="outlined"
        placeholder="轮廓样式 + 清除按钮"
        clearable
        :rows="3"
      />
    </sp-col>
  </sp-row>
</template>
