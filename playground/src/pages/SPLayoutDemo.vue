<template>
  <div class="layout-demo">
    <h1>sp-layout 布局组件演示</h1>

    <!-- 左右侧边栏布局示例 -->
    <section class="demo-section">
      <h2>
        1. 左右侧边栏布局（Header + Left Aside + Main + Right Aside + Footer）
      </h2>
      <div
        class="demo-container"
        style="border: 1px solid #e8e8e8"
      >
        <sp-layout height="400px">
          <sp-layout-header>1</sp-layout-header>

          <sp-layout-aside
            position="left"
            background-color="#f0f0f0"
          >
            2
          </sp-layout-aside>

          <sp-layout-main>3</sp-layout-main>

          <sp-layout-aside
            position="right"
            background-color="#e0e0e0"
          >
            4
          </sp-layout-aside>

          <sp-layout-footer>
            <div>© 2024 Speed-UI. All rights reserved.</div>
          </sp-layout-footer>
        </sp-layout>
      </div>
    </section>

    <!-- 纯净布局示例（无背景色） -->
    <section class="demo-section">
      <h2>1.2. 纯净布局（无默认背景色）</h2>
      <div
        class="demo-container"
        style="border: 1px solid #e8e8e8"
      >
        <sp-layout height="400px">
          <sp-layout-header>
            <div style="font-weight: bold; padding: 16px">网站标题</div>
          </sp-layout-header>

          <sp-layout-aside position="left">
            <div style="padding: 16px; border-right: 1px solid #ddd">
              <div style="margin-bottom: 12px; font-weight: bold">左侧导航</div>
              <div style="padding: 8px 0; cursor: pointer">🏠 首页</div>
              <div style="padding: 8px 0; cursor: pointer">📊 数据</div>
              <div style="padding: 8px 0; cursor: pointer">⚙️ 设置</div>
            </div>
          </sp-layout-aside>

          <sp-layout-main>
            <div style="padding: 24px">
              <h3>主内容区域</h3>
              <p>这个布局没有默认的灰色背景，看起来更加纯净。</p>
              <p>
                侧边栏和底部区域都没有默认背景色，你可以根据需要自定义样式。
              </p>
            </div>
          </sp-layout-main>

          <sp-layout-aside position="right">
            <div style="padding: 16px; border-left: 1px solid #ddd">
              <div style="margin-bottom: 12px; font-weight: bold">右侧工具</div>
              <div style="padding: 8px 0; cursor: pointer">📝 笔记</div>
              <div style="padding: 8px 0; cursor: pointer">🔍 搜索</div>
              <div style="padding: 8px 0; cursor: pointer">💬 聊天</div>
            </div>
          </sp-layout-aside>

          <sp-layout-footer>
            <div style="padding: 16px">
              © 2024 Speed-UI. All rights reserved.
            </div>
          </sp-layout-footer>
        </sp-layout>
      </div>
    </section>

    <!-- 侧边栏占满高度布局示例 -->
    <section class="demo-section">
      <h2>1.5. 侧边栏占满高度布局（Aside 从顶部到底部）</h2>
      <div
        class="demo-container"
        style="border: 1px solid #e8e8e8"
      >
        <sp-layout
          header-mode="content-only"
          height="400px"
        >
          <sp-layout-header>
            <div style="font-weight: bold">网站标题</div>
            <div style="margin-left: auto; display: flex; gap: 16px">
              <span>用户</span>
              <span>设置</span>
            </div>
          </sp-layout-header>

          <sp-layout-aside>
            <div style="padding: 16px">
              <div style="margin-bottom: 12px; font-weight: bold">导航菜单</div>
              <div style="padding: 8px 0; cursor: pointer">🏠 首页</div>
              <div style="padding: 8px 0; cursor: pointer">📊 数据</div>
              <div style="padding: 8px 0; cursor: pointer">⚙️ 设置</div>
              <div style="padding: 8px 0; cursor: pointer">👤 用户2</div>
            </div>
          </sp-layout-aside>

          <sp-layout-main>
            <h3>主内容区域</h3>
            <p>
              在这种布局模式下，侧边栏从顶部延伸到底部，Header
              只占用右侧内容区域。
            </p>
            <p>这种布局适合需要突出侧边栏导航的应用场景。</p>
            <p>
              <strong>注意：</strong>
              这个示例设置了 height="400px"，所以不会占满整个屏幕。
            </p>
          </sp-layout-main>

          <sp-layout-footer>
            <div>© 2024 Speed-UI. All rights reserved.</div>
          </sp-layout-footer>
        </sp-layout>
      </div>
    </section>

    <!-- 垂直布局示例 -->
    <section class="demo-section">
      <h2>2. 垂直布局</h2>
      <div
        class="demo-container"
        style="height: 300px; border: 1px solid #e8e8e8"
      >
        <sp-layout direction="vertical">
          <sp-layout-header>
            <div style="font-weight: bold">垂直布局示例</div>
          </sp-layout-header>

          <sp-layout-main>
            <p>垂直布局模式下，所有组件按垂直方向排列。</p>
          </sp-layout-main>

          <sp-layout-footer>
            <div>底部信息</div>
          </sp-layout-footer>
        </sp-layout>
      </div>
    </section>

    <!-- 无侧边栏布局 -->
    <section class="demo-section">
      <h2>3. 无侧边栏布局</h2>
      <div
        class="demo-container"
        style="height: 250px; border: 1px solid #e8e8e8"
      >
        <sp-layout>
          <sp-layout-header>
            <div style="font-weight: bold">简单布局</div>
          </sp-layout-header>

          <sp-layout-main>
            <p>没有侧边栏的简单布局，头部不会显示汉堡菜单按钮。</p>
          </sp-layout-main>

          <sp-layout-footer>
            <div>底部信息</div>
          </sp-layout-footer>
        </sp-layout>
      </div>
    </section>

    <!-- 自定义宽度和高度 -->
    <section class="demo-section">
      <h2>4. 自定义尺寸</h2>
      <div
        class="demo-container"
        style="height: 350px; border: 1px solid #e8e8e8"
      >
        <sp-layout>
          <sp-layout-header height="80">
            <div style="font-weight: bold; font-size: 18px">
              自定义高度头部 (80px)
            </div>
          </sp-layout-header>

          <div style="display: flex; flex: 1">
            <sp-layout-aside
              width="300"
              collapsed-width="80"
            >
              <div style="padding: 16px">
                <div style="margin-bottom: 12px; font-weight: bold">
                  宽侧边栏 (300px)
                </div>
                <div style="padding: 8px 0">📁 文件管理</div>
                <div style="padding: 8px 0">🔍 搜索功能</div>
                <div style="padding: 8px 0">📈 统计报表</div>
              </div>
            </sp-layout-aside>

            <sp-layout-main padding="24">
              <h3>自定义内边距 (24px)</h3>
              <p>可以自定义各个组件的尺寸和内边距。</p>
            </sp-layout-main>
          </div>

          <sp-layout-footer height="50">
            <div>自定义高度底部 (50px)</div>
          </sp-layout-footer>
        </sp-layout>
      </div>
    </section>

    <!-- 响应式说明 -->
    <section class="demo-section">
      <h2>5. 响应式功能说明</h2>
      <div class="responsive-info">
        <h3>🔧 功能特性：</h3>
        <ul>
          <li>
            <strong>自动响应：</strong>
            当浏览器宽度小于 768px 时，侧边栏自动变为抽屉式
          </li>
          <li>
            <strong>汉堡菜单：</strong>
            头部自动显示汉堡菜单按钮，点击可切换侧边栏状态
          </li>
          <li>
            <strong>遮罩层：</strong>
            移动端打开侧边栏时显示遮罩层，点击可关闭侧边栏
          </li>
          <li>
            <strong>平滑动画：</strong>
            侧边栏展开/收起带有平滑的过渡动画
          </li>
          <li>
            <strong>自由组合：</strong>
            各个布局组件可以自由组合，支持嵌套使用
          </li>
        </ul>

        <h3>📱 测试方法：</h3>
        <p>
          请尝试调整浏览器窗口大小，或使用开发者工具的设备模拟器来测试响应式效果。
        </p>

        <h3>🎨 自定义选项：</h3>
        <ul>
          <li>
            <code>height</code>
            : 布局高度（默认 '100vh'，即占满整个视口高度）
          </li>
          <li>
            <code>header-mode</code>
            : 头部布局模式（'full-width' | 'content-only'）
          </li>
          <li>
            <code>breakpoint</code>
            : 自定义响应式断点（默认 768px）
          </li>
          <li>
            <code>collapsible</code>
            : 是否允许折叠侧边栏
          </li>
          <li>
            <code>collapsed</code>
            : 默认是否折叠
          </li>
          <li>
            <code>responsive</code>
            : 是否启用响应式模式
          </li>
        </ul>

        <h3>🔧 侧边栏选项：</h3>
        <ul>
          <li>
            <code>position</code>
            : 侧边栏位置（'left' | 'right'，默认 'left'）
          </li>
          <li>
            <code>background-color</code>
            : 自定义背景色（不设置则无背景色）
          </li>
          <li>
            <code>width</code>
            : 侧边栏宽度（默认 240px）
          </li>
          <li>
            <code>collapsed-width</code>
            : 折叠时的宽度（默认 64px）
          </li>
        </ul>

        <h3>📏 高度设置说明：</h3>
        <ul>
          <li>
            <strong>默认行为：</strong>
            sp-layout 默认设置
            <code>height="100vh"</code>
            ，会占满整个屏幕高度
          </li>
          <li>
            <strong>自定义高度：</strong>
            可以设置
            <code>height="400px"</code>
            或
            <code>height="50vh"</code>
            等固定高度
          </li>
          <li>
            <strong>自适应内容：</strong>
            设置
            <code>height="auto"</code>
            可以让布局根据内容自动调整高度
          </li>
          <li>
            <strong>实际应用：</strong>
            在实际项目中，通常会设置
            <code>height="100vh"</code>
            来创建全屏应用布局
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  // import {
  //   sp-layout,
  //   sp-layout-header,
  //   sp-layout-aside,
  //   sp-layout-main,
  //   sp-layout-footer,
  // } from '@speed-ui/ui'
</script>

<style scoped>
  .layout-demo {
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .demo-section {
    margin-bottom: 48px;
  }

  .demo-section h2 {
    color: #333;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #e8e8e8;
  }

  .demo-container {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .responsive-info {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 24px;
    border-radius: 12px;
    border-left: 4px solid #4caf50;
  }

  .responsive-info h3 {
    color: #333;
    margin-bottom: 12px;
  }

  .responsive-info ul {
    margin: 12px 0;
    padding-left: 20px;
  }

  .responsive-info li {
    margin-bottom: 8px;
    line-height: 1.6;
  }

  .responsive-info code {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }
</style>
