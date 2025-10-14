<text>
> 带有字符计数器的单行文本框
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-space wrap>
      <sp-text-field
        label="字符计数器"
        placeholder="输入内容查看计数"
        counter
        style="width: 300px"
      />
      <sp-text-field
        label="限制20字符"
        placeholder="最多20个字符"
        counter
        :maxlength="20"
        style="width: 300px"
      />
    </sp-space>
    
    <sp-space wrap>
      <sp-text-field
        label="轮廓 + 计数器"
        variant="outlined"
        placeholder="轮廓样式带计数器"
        counter
        :maxlength="50"
        style="width: 320px"
      />
      <sp-text-field
        label="持久计数器"
        placeholder="计数器始终显示"
        counter
        persistent-counter
        :maxlength="30"
        style="width: 320px"
      />
    </sp-space>
    
    <sp-space wrap>
      <sp-text-field
        label="完整功能"
        placeholder="计数器 + 清除 + 图标"
        counter
        clearable
        :maxlength="100"
        prepend-inner-icon="Person"
        append-inner-icon="Search"
        style="width: 400px"
      />
    </sp-space>
  </sp-space>
</template>
