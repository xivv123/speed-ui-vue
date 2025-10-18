<text>
> 带有字符计数器的单行文本框
</text>

<template>
  <sp-row :cols="2" gap="24">
    <sp-col>
      <sp-text-field
        label="字符计数器"
        placeholder="输入内容查看计数"
        counter
      />
      <sp-text-field
        label="轮廓 + 计数器"
        variant="outlined"
        placeholder="轮廓样式带计数器"
        counter
        :maxlength="50"
      />
      <sp-text-field
        label="完整功能"
        placeholder="计数器 + 清除 + 图标"
        counter
        clearable
        :maxlength="100"
        prepend-inner-icon="Person"
        append-inner-icon="Search"
      />
    </sp-col>

    <sp-col>
      <sp-text-field
        label="限制20字符"
        placeholder="最多20个字符"
        counter
        :maxlength="20"
      />
      <sp-text-field
        label="持久计数器"
        placeholder="计数器始终显示"
        counter
        persistent-counter
        :maxlength="30"
      />
    </sp-col>
  </sp-row>
</template>
