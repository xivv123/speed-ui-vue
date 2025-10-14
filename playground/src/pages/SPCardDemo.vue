<template>
  <div class="sp-card-demo">
    <h1>SPCard 卡片组件演示</h1>
    <p>展示 SPCard 组件的各种用法和功能</p>

    <!-- 基础卡片 -->
    <section class="demo-section">
      <h2>基础卡片</h2>
      <sp-badge content="都清啦少">
        <sp-card
          title="Card title"
          text="这是一个基础的卡片组件，包含标题和文本内容。
            卡片是一个灵活的容器，可以包含各种内容。这是一个基础的卡片组件，包含标题和文本内容。这是一个基础的卡片组件，包含标题和文本内容。"
          class="demo-card"
        >
          <!-- <sp-card-title>基础卡片标题</sp-card-title> -->
          <!-- <sp-card-text>
            这是一个基础的卡片组件，包含标题和文本内容。
            卡片是一个灵活的容器，可以包含各种内容。
          </sp-card-text> -->
          <sp-card-actions>
            <sp-btn>取消</sp-btn>
            <sp-btn>确定</sp-btn>
          </sp-card-actions>
        </sp-card>
      </sp-badge>
    </section>

    <!-- 带图片的卡片 -->
    <section class="demo-section">
      <h2>带图片的卡片</h2>
      <div class="demo-content">
        <sp-card
          class="demo-card"
          image="https://picsum.photos/400/200"
        >
          <sp-card-title>图片卡片</sp-card-title>
          <sp-card-text>
            这个卡片包含了背景图片，图片会作为卡片的背景显示。
          </sp-card-text>
          <sp-card-actions>
            <sp-btn variant="text">分享</sp-btn>
            <sp-btn variant="outlined">收藏</sp-btn>
          </sp-card-actions>
        </sp-card>
      </div>
    </section>

    <!-- 带标题和副标题的卡片 -->
    <section class="demo-section">
      <h2>带标题和副标题的卡片</h2>
      <div class="demo-content">
        <sp-card
          class="demo-card"
          title="用户信息卡片"
          subtitle="管理员"
        >
          <sp-card-text>
            这个卡片展示了如何使用标题和副标题。
            由于依赖组件暂时不可用，头像和图标功能已暂时屏蔽。
          </sp-card-text>
          <sp-card-actions>
            <sp-btn variant="text">编辑</sp-btn>
            <sp-btn variant="text">删除</sp-btn>
          </sp-card-actions>
        </sp-card>
      </div>
    </section>

    <!-- 不同变体的卡片 -->
    <section class="demo-section">
      <h2>不同变体</h2>
      <div class="demo-content">
        <div class="card-grid">
          <sp-card
            class="demo-card"
            variant="elevated"
          >
            <sp-card-title>Elevated 卡片</sp-card-title>
            <sp-card-text>带有阴影效果的卡片</sp-card-text>
          </sp-card>

          <sp-card
            class="demo-card"
            variant="outlined"
          >
            <sp-card-title>Outlined 卡片</sp-card-title>
            <sp-card-text>带有边框的卡片</sp-card-text>
          </sp-card>

          <sp-card
            class="demo-card"
            variant="flat"
          >
            <sp-card-title>Flat 卡片</sp-card-title>
            <sp-card-text>扁平化的卡片</sp-card-text>
          </sp-card>
        </div>
      </div>
    </section>

    <!-- 可点击的卡片 -->
    <section class="demo-section">
      <h2>可点击的卡片</h2>
      <div class="demo-content">
        <sp-card
          class="demo-card"
          hover
          @click="handleCardClick"
          style="cursor: pointer"
        >
          <sp-card-title>可点击卡片</sp-card-title>
          <sp-card-text>
            这个卡片设置了 hover 属性，鼠标悬停时会有悬浮效果。
            点击卡片会触发点击事件。
          </sp-card-text>
        </sp-card>
      </div>
    </section>

    <!-- 禁用状态的卡片 -->
    <section class="demo-section">
      <h2>禁用状态</h2>
      <div class="demo-content">
        <sp-card
          class="demo-card"
          disabled
        >
          <sp-card-title>禁用的卡片</sp-card-title>
          <sp-card-text>
            这个卡片处于禁用状态，内容会显示为半透明。
          </sp-card-text>
          <sp-card-actions>
            <sp-btn
              variant="text"
              disabled
            >
              操作
            </sp-btn>
          </sp-card-actions>
        </sp-card>
      </div>
    </section>

    <!-- 自定义样式的卡片 -->
    <section class="demo-section">
      <h2>自定义样式</h2>
      <div class="demo-content">
        <sp-card
          class="demo-card custom-card"
          color="primary"
          rounded="lg"
        >
          <sp-card-title style="color: white">自定义样式卡片</sp-card-title>
          <sp-card-text style="color: rgba(255, 255, 255, 0.8)">
            这个卡片使用了自定义的颜色和圆角样式。
          </sp-card-text>
          <sp-card-actions>
            <sp-btn
              variant="text"
              style="color: white"
            >
              了解更多
            </sp-btn>
          </sp-card-actions>
        </sp-card>
      </div>
    </section>
  </div>
</template>

<script setup>
  const handleCardClick = () => {
    alert('卡片被点击了！')
  }
</script>

<style scoped>
  .sp-card-demo {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .demo-section {
    margin-bottom: 40px;
  }

  .demo-section h2 {
    color: #333;
    margin-bottom: 16px;
    font-size: 1.5rem;
  }

  .demo-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .demo-card {
    max-width: 400px;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .custom-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .demo-card {
      max-width: 100%;
    }

    .card-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
