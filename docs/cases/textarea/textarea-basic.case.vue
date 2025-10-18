<text>
> 基本的用法，提供多种变体样式
</text>

<template>
  <sp-row :cols="2" gap="24">
    <sp-col>
      <sp-textarea
        label="基础文本域"
        placeholder="基础样式"
        :rows="3"
      />
      <sp-textarea
        label="solo文本域"
        variant="solo"
        placeholder="solo样式"
        :rows="3"
      />
    </sp-col>

    <sp-col>
      <sp-textarea
        label="轮廓文本域"
        variant="outlined"
        placeholder="轮廓样式"
        :rows="3"
      />
      <sp-textarea
        label="下划线文本域"
        variant="underlined"
        placeholder="下划线样式"
        :rows="3"
      />
    </sp-col>
  </sp-row>
</template>
