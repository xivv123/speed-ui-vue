<text>
> 不同方向的滚动文本，支持左、右、上、下四个方向
</text>

<template>
  <div class="demo-container">
      <p class="label">向左滚动 (left)</p>
      <div style="width: 100%; height:40px">
        <sp-scroll-text direction="left">
          ← ← ←向左滚动的文字内容
        </sp-scroll-text>
      </div>

      <p class="label">向右滚动 (right)</p>
      <div style="width: 100%; height:40px">
        <sp-scroll-text direction="right">
          向右滚动的文字内容 → → →
        </sp-scroll-text>
      </div>

      <p class="label">向上滚动 (up)</p>
      <div style="width: 100%; height:40px">
        <sp-scroll-text direction="up">
          <div>第一行内容</div>
          <div>第二行内容</div>
          <div>第三行内容</div>
        </sp-scroll-text>
      </div>

      <p class="label">向下滚动 (down)</p>
      <div style="width: 100%; height:40px">
        <sp-scroll-text direction="down">
          <div>第一行内容</div>
          <div>第二行内容</div>
          <div>第三行内容</div>
        </sp-scroll-text>
    </div>
  </div>
</template>

