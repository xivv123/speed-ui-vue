<text>
> 不同主题颜色的单行文本框
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-space wrap>
      <sp-text-field
        label="主要色彩"
        placeholder="primary 主题色"
        color="primary"
        style="width: 250px"
      />
      <sp-text-field
        label="次要色彩"
        placeholder="secondary 次要色"
        color="secondary"
        style="width: 250px"
      />
      <sp-text-field
        label="成功色彩"
        placeholder="success 成功色"
        color="success"
        style="width: 250px"
      />
    </sp-space>
    
    <sp-space wrap>
      <sp-text-field
        label="警告色彩"
        placeholder="warning 警告色"
        color="warning"
        variant="outlined"
        style="width: 250px"
      />
      <sp-text-field
        label="错误色彩"
        placeholder="error 错误色"
        color="error"
        variant="outlined"
        style="width: 250px"
      />
      <sp-text-field
        label="信息色彩"
        placeholder="info 信息色"
        color="info"
        variant="outlined"
        style="width: 250px"
      />
    </sp-space>
    
    <sp-space wrap>
      <sp-text-field
        label="下划线 + 主要色"
        placeholder="下划线样式"
        color="primary"
        variant="underlined"
        style="width: 280px"
      />
      <sp-text-field
        label="solo + 成功色"
        placeholder="solo样式"
        color="success"
        variant="solo"
        style="width: 280px"
      />
    </sp-space>
  </sp-space>
</template>
