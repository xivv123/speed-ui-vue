<text>
Rail 模式提供紧凑的导航栏，可通过按钮切换展开状态
</text>

<template>
  <div>
    <sp-btn @click="railMode = !railMode">切换 Rail 模式</sp-btn>

    <div
      style="position: relative; border: 1px solid #e0e0e0; border-radius: 4px; margin-top: 16px; transform: translateZ(0);">
      <sp-layout height="400px">
        <sp-navigation-drawer v-model="drawer" :rail="railMode" :rail-width="45" :width="256" permanent>
          <sp-list activatable>
            <sp-list-item :prepend-icon="SpeedometerOutline" title="仪表板" value="dashboard"></sp-list-item>
            <sp-list-item :prepend-icon="PeopleOutline" title="用户" value="users"></sp-list-item>
            <sp-list-item :prepend-icon="SettingsOutline" title="设置" value="settings"></sp-list-item>
            <sp-list-item :prepend-icon="HelpCircleOutline" title="帮助" value="help"></sp-list-item>
          </sp-list>
        </sp-navigation-drawer>

        <sp-layout-main>
          <div style="padding: 24px; background: #fafafa; min-height: 100%;">
            <h3>主要内容区域</h3>
            <p>Rail 模式: {{ railMode ? '启用' : '禁用' }}</p>
            <p>Rail 模式下只显示图标，节省空间</p>
          </div>
        </sp-layout-main>
      </sp-layout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SpeedometerOutline, PeopleOutline, SettingsOutline, HelpCircleOutline } from '@vicons/ionicons5'

const drawer = ref(true)
const railMode = ref(true)
</script>
