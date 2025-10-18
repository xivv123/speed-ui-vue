<text>
> 不同主题颜色的单行文本框
</text>

<template>
  <sp-row :cols="2" gap="24">
    <sp-col>
      <sp-text-field
        label="主要色彩"
        placeholder="primary 主题色"
        color="primary"
      />
      <sp-text-field
        label="成功色彩"
        placeholder="success 成功色"
        color="success"
      />
      <sp-text-field
        label="警告色彩"
        placeholder="warning 警告色"
        color="warning"
        variant="outlined"
      />
      <sp-text-field
        label="信息色彩"
        placeholder="info 信息色"
        color="info"
        variant="outlined"
      />
    </sp-col>

    <sp-col>
      <sp-text-field
        label="次要色彩"
        placeholder="secondary 次要色"
        color="secondary"
      />
      <sp-text-field
        label="错误色彩"
        placeholder="error 错误色"
        color="error"
        variant="outlined"
      />
      <sp-text-field
        label="下划线 + 主要色"
        placeholder="下划线样式"
        color="primary"
        variant="underlined"
      />
      <sp-text-field
        label="solo + 成功色"
        placeholder="solo样式"
        color="success"
        variant="solo"
      />
    </sp-col>
  </sp-row>
</template>
