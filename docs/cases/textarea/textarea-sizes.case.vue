<text>
> 不同行数和尺寸的文本域
</text>

<template>
  <sp-space wrap>
    <sp-textarea
      label="小文本域"
      placeholder="2行文本域"
      :rows="2"
      style="width: 250px"
    />
    <sp-textarea
      label="中等文本域"
      placeholder="4行文本域"
      :rows="4"
      style="width: 300px"
    />
    <sp-textarea
      label="大文本域"
      placeholder="6行文本域"
      :rows="6"
      style="width: 350px"
    />
  </sp-space>
</template>
