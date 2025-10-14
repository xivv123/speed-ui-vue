<text>
> 不同输入类型的单行文本框
</text>

<template>
  <sp-space
    direction="vertical"
    :size="16"
  >
    <sp-space wrap>
      <sp-text-field
        label="文本输入"
        type="text"
        placeholder="普通文本输入"
        style="width: 300px"
      />
      <sp-text-field
        label="密码输入"
        type="password"
        placeholder="请输入密码"
        style="width: 300px"
      />
      <sp-text-field
        label="邮箱输入"
        type="email"
        placeholder="请输入邮箱地址"
        style="width: 300px"
      />
    </sp-space>

    <sp-space wrap>
      <sp-text-field
        label="数字输入"
        type="number"
        placeholder="请输入数字"
        style="width: 300px"
      />
      <sp-text-field
        label="电话输入"
        type="tel"
        placeholder="请输入电话号码"
        style="width: 300px"
      />
      <sp-text-field
        label="网址输入"
        type="url"
        placeholder="请输入网址"
        style="width: 300px"
      />
    </sp-space>

    <sp-space wrap>
      <sp-text-field
        label="搜索输入"
        type="search"
        placeholder="请输入搜索内容"
        clearable
        style="width: 300px"
      />
      <sp-text-field
        label="日期输入"
        type="date"
        style="width: 300px"
      />
      <sp-text-field
        label="时间输入"
        type="time"
        style="width: 300px"
      />
    </sp-space>
  </sp-space>
</template>
