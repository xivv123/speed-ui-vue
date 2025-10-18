<text>
> 基本的用法，提供5中变体样式
</text>

<template>
  <sp-row :cols="2" gap="24">
    <sp-col>
      <sp-text-field label="基础文本" placeholder="基础样式" />
      <sp-text-field label="solo文本" variant="solo" placeholder="solo样式" />
    </sp-col>

    <sp-col>
      <sp-text-field label="轮廓文本" variant="outlined" placeholder="轮廓样式" />
      <sp-text-field label="下划线文本" variant="underlined" placeholder="下划线样式" />
    </sp-col>
  </sp-row>
</template>
