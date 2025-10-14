<text>
> 带有前缀和后缀的单行文本框
</text>

<template>
  <sp-space wrap>
    <sp-text-field label="货币输入" prefix="¥" placeholder="0.00" type="number" />
    <sp-text-field label="百分比" suffix="%" placeholder="0" type="number" />
    <sp-text-field label="网站域名" prefix="https://" suffix=".com" placeholder="example" />
  </sp-space>

  <sp-space wrap>
    <sp-text-field label="重量输入" suffix="kg" placeholder="请输入重量" type="number" variant="outlined" />
    <sp-text-field label="邮箱地址" suffix="@company.com" placeholder="username" variant="outlined" />
  </sp-space>

  <sp-space wrap>
    <sp-text-field label="完整示例" prefix="用户：" suffix="@域名" placeholder="请输入用户名" variant="outlined" clearable
      style="width: 350px" />
  </sp-space>
</template>
