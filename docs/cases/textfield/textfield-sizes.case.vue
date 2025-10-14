<text>
> 不同尺寸和密度的单行文本框
</text>

<template>
  <sp-space direction="vertical" :size="20">
    <div>
      <h4 style="margin: 0 0 12px 0; color: #374151; font-size: 14px;">紧凑密度</h4>
      <sp-space wrap>
        <sp-text-field
          label="紧凑文本框"
          placeholder="紧凑样式"
          density="compact"
          style="width: 250px"
        />
        <sp-text-field
          label="紧凑轮廓"
          variant="outlined"
          placeholder="紧凑轮廓样式"
          density="compact"
          style="width: 250px"
        />
      </sp-space>
    </div>
    
    <div>
      <h4 style="margin: 0 0 12px 0; color: #374151; font-size: 14px;">默认密度</h4>
      <sp-space wrap>
        <sp-text-field
          label="默认文本框"
          placeholder="默认样式"
          style="width: 280px"
        />
        <sp-text-field
          label="默认轮廓"
          variant="outlined"
          placeholder="默认轮廓样式"
          style="width: 280px"
        />
      </sp-space>
    </div>
    
    <div>
      <h4 style="margin: 0 0 12px 0; color: #374151; font-size: 14px;">舒适密度</h4>
      <sp-space wrap>
        <sp-text-field
          label="舒适文本框"
          placeholder="舒适样式"
          density="comfortable"
          style="width: 300px"
        />
        <sp-text-field
          label="舒适轮廓"
          variant="outlined"
          placeholder="舒适轮廓样式"
          density="comfortable"
          style="width: 300px"
        />
      </sp-space>
    </div>
  </sp-space>
</template>
