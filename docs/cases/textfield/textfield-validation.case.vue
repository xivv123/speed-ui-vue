<text>
> 带有验证和错误状态的单行文本框
</text>

<template>
  <sp-space wrap>
    <sp-text-field
      label="成功状态"
      model-value="验证通过"
      placeholder="请输入内容"
      color="success"
      style="width: 280px"
    />
    <sp-text-field
      label="警告状态"
      model-value="需要注意"
      placeholder="请输入内容"
      color="warning"
      style="width: 280px"
    />
    <sp-text-field
      label="错误状态"
      model-value="错误内容"
      placeholder="请输入内容"
      color="error"
      style="width: 280px"
    />
  </sp-space>

  <sp-space wrap>
    <sp-text-field
      label="带错误信息"
      model-value="invalid@email"
      placeholder="请输入邮箱"
      type="email"
      color="error"
      error-messages="邮箱格式不正确"
      style="width: 300px"
    />
    <sp-text-field
      label="带提示信息"
      placeholder="请输入用户名"
      hint="用户名长度为3-20个字符"
      persistent-hint
      style="width: 300px"
    />
  </sp-space>

  <sp-space wrap>
    <sp-text-field
      label="轮廓 + 验证"
      variant="outlined"
      model-value="success@example.com"
      placeholder="请输入邮箱"
      type="email"
      color="success"
      style="width: 320px"
    />
    <sp-text-field
      label="轮廓 + 错误"
      variant="outlined"
      model-value="error"
      placeholder="请输入内容"
      color="error"
      error-messages="输入内容不符合要求"
      style="width: 320px"
    />
  </sp-space>
</template>
