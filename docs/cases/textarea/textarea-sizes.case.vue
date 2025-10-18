<text>
> 不同行数和尺寸的文本域
</text>

<template>
  <sp-row :cols="2" gap="24">
    <sp-col>
      <sp-textarea
        label="小文本域"
        placeholder="2行文本域"
        :rows="2"
      />
      <sp-textarea
        label="大文本域"
        placeholder="6行文本域"
        :rows="6"
      />
    </sp-col>

    <sp-col>
      <sp-textarea
        label="中等文本域"
        placeholder="4行文本域"
        :rows="4"
      />
    </sp-col>
  </sp-row>
</template>
