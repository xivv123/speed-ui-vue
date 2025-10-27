<text>
不同位置的导航抽屉，可以从左、右、上、下四个方向显示
</text>

<template>
  <div>
    <sp-space>
      <sp-btn @click="leftDrawer = !leftDrawer">左侧</sp-btn>
      <sp-btn @click="rightDrawer = !rightDrawer">右侧</sp-btn>
      <sp-btn @click="topDrawer = !topDrawer">顶部</sp-btn>
      <sp-btn @click="bottomDrawer = !bottomDrawer">底部</sp-btn>
    </sp-space>

    <div style="position: relative; border: 1px solid #e0e0e0; border-radius: 4px; margin-top: 16px; overflow: hidden; transform: translateZ(0);">
      <sp-layout height="400px">
        <sp-navigation-drawer v-model="leftDrawer" location="left" temporary absolute>
          <sp-list activatable>
            <sp-list-subheader>左侧导航</sp-list-subheader>
            <sp-list-item :prepend-icon="ChevronForward" title="菜单 1" value="left1"></sp-list-item>
            <sp-list-item :prepend-icon="ChevronForward" title="菜单 2" value="left2"></sp-list-item>
          </sp-list>
        </sp-navigation-drawer>

        <sp-navigation-drawer v-model="rightDrawer" location="right" temporary absolute>
          <sp-list activatable>
            <sp-list-subheader>右侧导航</sp-list-subheader>
            <sp-list-item :prepend-icon="ChevronBack" title="菜单 1" value="right1"></sp-list-item>
            <sp-list-item :prepend-icon="ChevronBack" title="菜单 2" value="right2"></sp-list-item>
          </sp-list>
        </sp-navigation-drawer>

        <sp-navigation-drawer v-model="topDrawer" location="top" temporary absolute>
          <sp-list activatable>
            <sp-list-subheader>顶部导航</sp-list-subheader>
            <sp-list-item :prepend-icon="ChevronDown" title="菜单 1" value="top1"></sp-list-item>
          </sp-list>
        </sp-navigation-drawer>

        <sp-navigation-drawer v-model="bottomDrawer" location="bottom" temporary absolute>
          <sp-list activatable>
            <sp-list-subheader>底部导航</sp-list-subheader>
            <sp-list-item :prepend-icon="ChevronUp" title="菜单 1" value="bottom1"></sp-list-item>
          </sp-list>
        </sp-navigation-drawer>

        <sp-layout-main>
          <div style="padding: 24px; background: #fafafa; min-height: 100%;">
            <h3>主要内容区域</h3>
            <p>左: {{ leftDrawer ? '开' : '关' }} | 右: {{ rightDrawer ? '开' : '关' }} | 上: {{ topDrawer ? '开' : '关' }} | 下: {{ bottomDrawer ? '开' : '关' }}</p>
          </div>
        </sp-layout-main>
      </sp-layout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronForward, ChevronBack, ChevronDown, ChevronUp } from '@vicons/ionicons5'

const leftDrawer = ref(false)
const rightDrawer = ref(false)
const topDrawer = ref(false)
const bottomDrawer = ref(false)
</script>
