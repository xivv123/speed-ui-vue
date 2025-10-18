<text>
> 不同尺寸和密度的单行文本框
</text>

<template>
  <sp-row :cols="2" gap="24">
    <sp-col>
      <sp-text-field label="紧凑文本框" placeholder="紧凑样式" density="compact" />
      <sp-text-field label="默认文本框" placeholder="默认样式" />
      <sp-text-field label="舒适文本框" placeholder="舒适样式" density="comfortable" />
    </sp-col>

    <sp-col>
      <sp-text-field label="紧凑轮廓" variant="outlined" placeholder="紧凑轮廓样式" density="compact" />
      <sp-text-field label="默认轮廓" variant="outlined" placeholder="默认轮廓样式" />
      <sp-text-field label="舒适轮廓" variant="outlined" placeholder="舒适轮廓样式" density="comfortable" />
    </sp-col>
  </sp-row>
</template>
