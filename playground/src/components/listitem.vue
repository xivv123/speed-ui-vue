<template>
  <sp-col cols="12" md="6" lg="4">
    <sp-card class="category-card" hover>
      <sp-card-item>
        <template #prepend>
          <sp-icon :name="iconName" size="32" :color="iconColor" />
        </template>
        <sp-card-title>{{ title }}</sp-card-title>
        <sp-card-subtitle>{{ subtitle }}</sp-card-subtitle>
      </sp-card-item>
      <sp-card-text>
        <sp-space :size="8" />
        <div class="component-list">
          <sp-tag v-for="tag in tags" :key="tag" :color="iconColor" variant="outlined" size="small"
            @click="handleTagClick(tag)" style="cursor: pointer;">
            {{ tag }}
          </sp-tag>
        </div>
      </sp-card-text>
    </sp-card>
  </sp-col>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  iconName: string
  iconColor: string
  title: string
  subtitle: string
  tags: string[]
}

defineProps<Props>()

const router = useRouter()

// 组件标签到路由的映射表
const tagRouteMap: Record<string, string> = {
  // 基础组件
  'SPBtn': '/zh-CN/spbtn-demo',
  'SPBtnGroup': '/zh-CN/sp-btn-group-demo',
  'SPBadge': '/zh-CN/sp-badge-demo',
  'SPTag': '/zh-CN/sp-tag-demo',
  'SPIcon': '/zh-CN/icon-demo',
  'SPDivider': '/zh-CN/sp-divider-demo',

  // 布局组件
  'SPRow': '/zh-CN/sp-row-col-demo',
  'SPCol': '/zh-CN/sp-row-col-demo',
  'SPSpace': '/zh-CN/sp-space-demo',
  'SPLayout': '/zh-CN/layout-demo',
  'SPCard': '/zh-CN/sp-card-demo',

  // 表单组件
  'SPTextField': '/zh-CN/sp-text-field-demo',
  'SPTextarea': '/zh-CN/sp-textarea-demo',
  'SPSelect': '/zh-CN/sp-select-demo',
  'SPCheckbox': '/zh-CN/sp-checkbox-demo',
  'SPRadio': '/zh-CN/sp-radio-demo',
  'SPSwitch': '/zh-CN/sp-switch-tsx-demo',
  'SPSlider': '/zh-CN/sp-slider-demo',
  'SPForm': '/zh-CN/sp-form-demo',

  // 表单扩展
  'SPInputNum': '/zh-CN/sp-input-num-demo',
  'SPInputPwd': '/zh-CN/sp-input-pwd-demo',
  'SPInputSrch': '/zh-CN/sp-input-srch-demo',
  'SPCascader': '/zh-CN/sp-cascader-demo',
  'SPCombo': '/zh-CN/sp-combo-demo',
  'SPSegmented': '/zh-CN/sp-segmented-demo',

  // 反馈组件
  'SPAlert': '/zh-CN/sp-alert-demo',
  'SPDialog': '/zh-CN/sp-dialog-demo',
  'SPLoading': '/zh-CN/sp-loading-demo',
  'SPTooltip': '/zh-CN/sp-tooltip-demo',
  'SPProgCir': '/zh-CN/sp-prog-cir-demo',
  'SPMsgBar': '/zh-CN/sp-msg-bar-demo',

  // 导航组件
  'SPMenu': '/zh-CN/sp-menu-demo',
  'SPDrawer': '/zh-CN/sp-drawer-demo',
  'SPSidebar': '/zh-CN/sp-sidebar-demo',
  'SPTour': '/zh-CN/sp-tour-demo',
  'SPGlobalBanner': '/zh-CN/sp-global-banner-demo',

  // 数据展示
  'SPList': '/zh-CN/sp-list-demo',
  'SPCollapse': '/zh-CN/sp-collapse-demo',
  'SPScrollbar': '/zh-CN/sp-scrollbar-demo',

  // 特效组件
  'SPExpandBtn': '/zh-CN/sp-expand-btn-demo',
  'SPStretchBtn': '/zh-CN/sp-stretch-btn-demo',
  'SPFlipText': '/zh-CN/sp-flip-text-demo',
  'SPScrollText': '/zh-CN/sp-scroll-text-demo'
}

const handleTagClick = (tag: string) => {
  const route = tagRouteMap[tag]
  if (route) {
    router.push(route)
  } else {
    console.warn(`未找到组件 ${tag} 对应的演示页面路由`)
  }
}
</script>

<style scoped>
.category-card {
  height: 100%;
  transition: transform 0.2s ease-in-out;
}

.category-card:hover {
  transform: translateY(-4px);
}

.component-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>