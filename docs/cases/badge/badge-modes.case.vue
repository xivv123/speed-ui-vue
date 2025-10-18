<text>
> 使用浮动和内联模式的徽章
</text>

<template>
  <sp-space :size="16">
    <sp-badge content="5" floating>
      <sp-btn>浮动徽章</sp-btn>
    </sp-badge>

    <sp-badge dot floating color="success">
      <sp-btn>浮动点状</sp-btn>
    </sp-badge>

    <sp-badge content="8" inline>
      <sp-btn>内联徽章</sp-btn>
    </sp-badge>

    <sp-badge dot inline color="warning">
      <sp-btn>内联点状</sp-btn>
    </sp-badge>
  </sp-space>
</template>