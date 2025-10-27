<text>
永久显示的导航抽屉，始终可见并占据布局空间
</text>

<template>
  <div>
    <div style="position: relative; border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden; transform: translateZ(0);">
      <sp-layout height="400px">
        <sp-navigation-drawer v-model="drawer" permanent :width="256">
          <sp-list activatable>
            <sp-list-subheader>管理面板</sp-list-subheader>
            <sp-list-item :prepend-icon="SpeedometerOutline" title="仪表板" value="dashboard"></sp-list-item>
            <sp-list-item :prepend-icon="PeopleOutline" title="用户管理" value="users"></sp-list-item>
            <sp-list-item :prepend-icon="SettingsOutline" title="设置" value="settings"></sp-list-item>
            <sp-list-item :prepend-icon="HelpCircleOutline" title="帮助" value="help"></sp-list-item>
          </sp-list>
        </sp-navigation-drawer>

        <sp-layout-main>
          <div style="padding: 24px; background: #fafafa; min-height: 100%;">
            <h3>主要内容区域</h3>
            <p>永久显示的导航抽屉始终可见</p>
            <p>主内容区域会自动调整以适应导航抽屉的宽度</p>
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
</script>
