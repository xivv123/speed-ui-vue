<template>
  <DemoContainer title="SPNavigationDrawer 导航抽屉组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="侧边导航抽屉">
      <sp-btn @click="basicDrawer = !basicDrawer">切换导航抽屉</sp-btn>

      <div class="demo-layout">
        <sp-layout height="400px">
          <sp-navigation-drawer permanent temporary location="top" v-model="basicDrawer">
            <sp-list activatable>
              <sp-list-item :prepend-icon="Apps" title="Home" value="home"></sp-list-item>
              <sp-list-item :prepend-icon="Apps" title="About" value="about"></sp-list-item>
            </sp-list>
          </sp-navigation-drawer>

          <sp-layout-main>
            <div class="main-content">
              <p>主要内容区域</p>
              <p>左侧抽屉: {{ leftDrawer ? '打开' : '关闭' }}</p>
              <p>右侧抽屉: {{ rightDrawer ? '打开' : '关闭' }}</p>
            </div>
          </sp-layout-main>
        </sp-layout>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同位置 -->
    <DemoSection title="不同位置" subtitle="导航抽屉可以从不同方向显示">
      <div class="button-group">
        <sp-btn @click="leftDrawer = !leftDrawer">左侧 (start)</sp-btn>
        <sp-btn @click="rightDrawer = !rightDrawer">右侧 (end)</sp-btn>
      </div>
      <sp-space :size="16" />

      <div class="demo-layout">
        <sp-layout height="400px">
          <sp-navigation-drawer   v-model="leftDrawer" location="start">
            <sp-list activatable>
              <sp-list-subheader>左侧导航</sp-list-subheader>
              <sp-list-item>
                <sp-list-item-title>菜单项 1</sp-list-item-title>
              </sp-list-item>
              <sp-list-item>
                <sp-list-item-title>菜单项 2</sp-list-item-title>
              </sp-list-item>
              <sp-list-item>
                <sp-list-item-title>菜单项 3</sp-list-item-title>
              </sp-list-item>
            </sp-list>
          </sp-navigation-drawer>

          <sp-navigation-drawer v-model="rightDrawer" location="end" absolute>
            <sp-list activatable>
              <sp-list-subheader>右侧导航</sp-list-subheader>
              <sp-list-item>
                <sp-list-item-title>菜单项 1</sp-list-item-title>
              </sp-list-item>
              <sp-list-item>
                <sp-list-item-title>菜单项 2</sp-list-item-title>
              </sp-list-item>
              <sp-list-item>
                <sp-list-item-title>菜单项 3</sp-list-item-title>
              </sp-list-item>
            </sp-list>
          </sp-navigation-drawer>

          <sp-layout-main>
            <div class="main-content">
              <p>主要内容区域</p>
              <p>左侧抽屉: {{ leftDrawer ? '打开' : '关闭' }}</p>
              <p>右侧抽屉: {{ rightDrawer ? '打开' : '关闭' }}</p>
            </div>
          </sp-layout-main>
        </sp-layout>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 永久显示 -->
    <DemoSection title="永久显示" subtitle="导航抽屉始终可见">
      <div class="demo-layout">
        <sp-layout height="400px">
          <sp-navigation-drawer v-model="permanentDrawer" permanent :width="256">
            <sp-list activatable>
              <sp-list-subheader>管理面板</sp-list-subheader>
              <sp-list-item>
                <sp-list-item-media>📊</sp-list-item-media>
                <sp-list-item-title>仪表板</sp-list-item-title>
              </sp-list-item>
              <sp-list-item>
                <sp-list-item-media>👥</sp-list-item-media>
                <sp-list-item-title>用户管理</sp-list-item-title>
              </sp-list-item>
              <sp-list-item>
                <sp-list-item-media>⚙️</sp-list-item-media>
                <sp-list-item-title>设置</sp-list-item-title>
              </sp-list-item>
              <sp-list-item>
                <sp-list-item-media>❓</sp-list-item-media>
                <sp-list-item-title>帮助</sp-list-item-title>
              </sp-list-item>
            </sp-list>
          </sp-navigation-drawer>

          <sp-layout-main>
            <div class="main-content">
              <p>主要内容区域</p>
              <p>永久显示的导航抽屉始终可见</p>
            </div>
          </sp-layout-main>
        </sp-layout>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- Rail 模式 -->
    <DemoSection title="Rail 模式" subtitle="紧凑的导航栏模式">
      <sp-btn @click="railDrawer = !railDrawer">切换 Rail 模式</sp-btn>
      <sp-space :size="16" />

      <div class="demo-layout">
        <sp-layout height="400px">
          <sp-navigation-drawer
            v-model="railActive"
            :rail="railDrawer"
            :rail-width="45"
            :width="256"
            permanent

          >
            <sp-list activatable>
              <sp-list-item :prepend-icon="Apps" title="Home" value="home"></sp-list-item>
              <sp-list-item :prepend-icon="Apps" title="About" value="about"></sp-list-item>
            </sp-list>
          </sp-navigation-drawer>

          <sp-layout-main>
            <div class="main-content">
              <p>主要内容区域</p>
              <p>Rail 模式: {{ railDrawer ? '启用' : '禁用' }}</p>
            </div>
          </sp-layout-main>
        </sp-layout>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 悬浮展开 -->
    <DemoSection title="悬浮展开" subtitle="鼠标悬浮时展开导航">
      <div class="demo-layout">
        <sp-layout height="400px">
          <sp-navigation-drawer
            v-model="hoverActive"
            rail
            expand-on-hover
            :rail-width="72"
            :width="256"
            permanent
          >
            <sp-list activatable>
              <sp-list-item>
                <sp-list-item-media>📊</sp-list-item-media>
                <sp-list-item-title>仪表板</sp-list-item-title>
              </sp-list-item>
              <sp-list-item>
                <sp-list-item-media>👥</sp-list-item-media>
                <sp-list-item-title>用户</sp-list-item-title>
              </sp-list-item>
              <sp-list-item>
                <sp-list-item-media>⚙️</sp-list-item-media>
                <sp-list-item-title>设置</sp-list-item-title>
              </sp-list-item>
              <sp-list-item>
                <sp-list-item-media>❓</sp-list-item-media>
                <sp-list-item-title>帮助</sp-list-item-title>
              </sp-list-item>
            </sp-list>
          </sp-navigation-drawer>

          <sp-layout-main>
            <div class="main-content">
              <p>主要内容区域</p>
              <p>鼠标悬浮在左侧导航栏上查看展开效果</p>
            </div>
          </sp-layout-main>
        </sp-layout>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 临时抽屉 -->
    <DemoSection title="临时抽屉" subtitle="点击遮罩层关闭">
      <sp-btn @click="tempDrawer = true">打开临时抽屉</sp-btn>
      <sp-space :size="16" />

      <div class="demo-layout">
        <sp-layout height="400px">
          <sp-navigation-drawer v-model="tempDrawer" temporary absolute>
            <sp-list activatable>
              <sp-list-subheader>临时导航</sp-list-subheader>
              <sp-list-item>
                <sp-list-item-media>🏠</sp-list-item-media>
                <sp-list-item-title>首页</sp-list-item-title>
              </sp-list-item>
              <sp-list-item>
                <sp-list-item-media>📦</sp-list-item-media>
                <sp-list-item-title>产品</sp-list-item-title>
              </sp-list-item>
              <sp-list-item>
                <sp-list-item-media>🛠️</sp-list-item-media>
                <sp-list-item-title>服务</sp-list-item-title>
              </sp-list-item>
              <sp-list-item @click="tempDrawer = false">
                <sp-list-item-media>✖️</sp-list-item-media>
                <sp-list-item-title>关闭</sp-list-item-title>
              </sp-list-item>
            </sp-list>
          </sp-navigation-drawer>

          <sp-layout-main>
            <div class="main-content">
              <p>主要内容区域</p>
              <p>点击遮罩层或关闭按钮关闭抽屉</p>
            </div>
          </sp-layout-main>
        </sp-layout>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同宽度 -->
    <DemoSection title="自定义宽度" subtitle="可以设置不同的抽屉宽度">
      <div class="button-group">
        <sp-btn @click="narrowDrawer = !narrowDrawer">窄抽屉 (200px)</sp-btn>
        <sp-btn @click="wideDrawer = !wideDrawer">宽抽屉 (400px)</sp-btn>
      </div>
      <sp-space :size="16" />

      <div class="demo-layout">
        <sp-layout height="400px">
          <sp-navigation-drawer v-model="narrowDrawer" :width="200" absolute>
            <sp-list activatable>
              <sp-list-subheader>窄抽屉 (200px)</sp-list-subheader>
              <sp-list-item>
                <sp-list-item-title>菜单 1</sp-list-item-title>
              </sp-list-item>
              <sp-list-item>
                <sp-list-item-title>菜单 2</sp-list-item-title>
              </sp-list-item>
            </sp-list>
          </sp-navigation-drawer>

          <sp-navigation-drawer v-model="wideDrawer" location="end" :width="400" absolute>
            <sp-list activatable>
              <sp-list-subheader>宽抽屉 (400px)</sp-list-subheader>
              <sp-list-item>
                <sp-list-item-title>菜单项 1</sp-list-item-title>
                <sp-list-item-subtitle>这个抽屉有更多空间显示详细内容</sp-list-item-subtitle>
              </sp-list-item>
              <sp-list-item>
                <sp-list-item-title>菜单项 2</sp-list-item-title>
                <sp-list-item-subtitle>可以展示更多信息</sp-list-item-subtitle>
              </sp-list-item>
            </sp-list>
          </sp-navigation-drawer>

          <sp-layout-main>
            <div class="main-content">
              <p>主要内容区域</p>
              <p>窄抽屉 (左): {{ narrowDrawer ? '打开' : '关闭' }}</p>
              <p>宽抽屉 (右): {{ wideDrawer ? '打开' : '关闭' }}</p>
            </div>
          </sp-layout-main>
        </sp-layout>
      </div>
    </DemoSection>

    <sp-space :size="24" />



  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

import { Copy,Apps } from '@vicons/ionicons5'
// 基础用法
const basicDrawer = ref(false)

// 不同位置
const leftDrawer = ref(false)
const rightDrawer = ref(false)

// 永久显示
const permanentDrawer = ref(false)

// Rail 模式
const railDrawer = ref(true)
const railActive = ref(true)

// 悬浮展开
const hoverActive = ref(false)

// 临时抽屉
const tempDrawer = ref(false)

// 不同宽度
const narrowDrawer = ref(false)
const wideDrawer = ref(false)

// 自定义样式
const styledDrawer = ref(true)

// 带插槽
const slotDrawer = ref(true)
</script>

<style scoped>
.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.demo-layout {
  position: relative;
  min-height: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  /* 创建一个新的堆叠上下文，让 fixed 定位的元素相对于此容器 */
  transform: translateZ(0);
}

.main-content {
  padding: 24px;
  background-color: #fafafa;
  min-height: 300px;
}

.main-content p {
  margin: 0 0 12px 0;
  color: #666;
}

.drawer-header {
  padding: 24px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.drawer-header h3 {
  margin: 0 0 4px 0;
  font-size: 20px;
  color: white;
}

.drawer-header p {
  margin: 0;
  font-size: 12px;
  opacity: 0.9;
}

.drawer-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  background-color: #f5f5f5;
  text-align: center;
}

.drawer-footer p {
  margin: 4px 0;
  font-size: 12px;
  color: #666;
}

/* 白色文字样式 */
.white-text :deep(.sp-list-item-title),
.white-text :deep(.sp-list-item-subtitle) {
  color: white;
}
</style>
