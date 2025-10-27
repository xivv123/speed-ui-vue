<text>
自定义导航抽屉的宽度，可设置不同的宽度以适应不同的内容需求
</text>

<template>
  <div>
    <sp-space>
      <sp-btn @click="narrowDrawer = !narrowDrawer">窄抽屉 (200px)</sp-btn>
      <sp-btn @click="normalDrawer = !normalDrawer">标准抽屉 (256px)</sp-btn>
      <sp-btn @click="wideDrawer = !wideDrawer">宽抽屉 (400px)</sp-btn>
    </sp-space>

    <div style="position: relative; border: 1px solid #e0e0e0; border-radius: 4px; margin-top: 16px; overflow: hidden; transform: translateZ(0);">
      <sp-layout height="400px">
        <sp-navigation-drawer v-model="narrowDrawer" :width="200" temporary absolute>
          <sp-list activatable>
            <sp-list-subheader>窄抽屉 (200px)</sp-list-subheader>
            <sp-list-item :prepend-icon="List" title="菜单 1" value="narrow1"></sp-list-item>
            <sp-list-item :prepend-icon="List" title="菜单 2" value="narrow2"></sp-list-item>
          </sp-list>
        </sp-navigation-drawer>

        <sp-navigation-drawer v-model="normalDrawer" :width="256" temporary absolute>
          <sp-list activatable>
            <sp-list-subheader>标准抽屉 (256px)</sp-list-subheader>
            <sp-list-item :prepend-icon="DocumentText" title="菜单项 1" subtitle="标准宽度" value="normal1"></sp-list-item>
            <sp-list-item :prepend-icon="DocumentText" title="菜单项 2" subtitle="默认宽度" value="normal2"></sp-list-item>
          </sp-list>
        </sp-navigation-drawer>

        <sp-navigation-drawer v-model="wideDrawer" :width="400" temporary absolute>
          <sp-list activatable>
            <sp-list-subheader>宽抽屉 (400px)</sp-list-subheader>
            <sp-list-item :prepend-icon="Newspaper" title="菜单项 1" subtitle="这个抽屉有更多空间显示详细内容和描述信息" value="wide1"></sp-list-item>
            <sp-list-item :prepend-icon="Newspaper" title="菜单项 2" subtitle="可以展示更多信息，适合内容较多的场景" value="wide2"></sp-list-item>
          </sp-list>
        </sp-navigation-drawer>

        <sp-layout-main>
          <div style="padding: 24px; background: #fafafa; min-height: 100%;">
            <h3>主要内容区域</h3>
            <p>窄: {{ narrowDrawer ? '开' : '关' }} | 标准: {{ normalDrawer ? '开' : '关' }} | 宽: {{ wideDrawer ? '开' : '关' }}</p>
            <p>根据内容需求选择合适的宽度</p>
          </div>
        </sp-layout-main>
      </sp-layout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { List, DocumentText, Newspaper } from '@vicons/ionicons5'

const narrowDrawer = ref(false)
const normalDrawer = ref(false)
const wideDrawer = ref(false)
</script>
