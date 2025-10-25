<template>
  <sp-global-banner v-model="showBanner" bg-color="warning">
    <template #center>
      <span>⚠️ 本组件目前只用于学习、讨论、研究。请勿使用在生产环境。</span>
    </template>
  </sp-global-banner>
  <div class="home-container">

    <!-- 头部区域 -->
    <HeaderCard title="Speed UI 组件库" />

    <sp-space :size="32" />

    <!-- 组件分类导航 -->
    <sp-row>
      <ListItem v-for="category in categories" :key="category.title" :icon-name="category.iconName"
        :icon-color="category.iconColor" :title="category.title" :subtitle="category.subtitle" :tags="category.tags" />
    </sp-row>

    <sp-space :size="48" />

    <!-- 底部信息 -->
    <sp-card class="footer-card" variant="outlined">
      <sp-card-text class="text-center">
        <div class="d-flex justify-center align-center">
          <sp-icon name="heart" color="red" size="20" />
          <span class="mx-2">Built with Vue 3 + TypeScript</span>
          <sp-icon name="heart" color="red" size="20" />
        </div>
        <sp-space :size="8" />
        <div class="text-caption text-medium-emphasis">
          Speed UI - 现代化的 Vue 组件库
        </div>
      </sp-card-text>
    </sp-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ListItem from '../components/listitem.vue'
import HeaderCard from '../components/HeaderCard.vue'

// 横幅显示状态
const showBanner = ref(true)

// 组件数据
const categories = [
  {
    iconName: 'grid-outline',
    iconColor: 'blue',
    title: '基础组件',
    subtitle: '按钮、标签、徽章等基础UI元素',
    tags: ['SPBtn', 'SPBtnGroup', 'SPBadge', 'SPTag', 'SPDivider']
  },
  {
    iconName: 'grid',
    iconColor: 'green',
    title: '布局组件',
    subtitle: '网格、间距、布局容器等布局元素',
    tags: ['SPRow', 'SPCol', 'SPSpace', 'SPLayout', 'SPCard']
  },
  {
    iconName: 'document-outline',
    iconColor: 'orange',
    title: '表单组件',
    subtitle: '输入框、选择器、开关等表单元素',
    tags: ['SPTextField', 'SPTextarea', 'SPSelect', 'SPCheckbox', 'SPRadio', 'SPSwitch', 'SPSlider', 'SPForm']
  },
  {
    iconName: 'document-text-outline',
    iconColor: 'pink',
    title: '表单扩展',
    subtitle: '特殊输入、级联选择等高级表单',
    tags: ['SPInputNum', 'SPInputPwd', 'SPInputSrch', 'SPCascader', 'SPCombo', 'SPSegmented']
  },
  {
    iconName: 'notifications-outline',
    iconColor: 'purple',
    title: '反馈组件',
    subtitle: '通知、进度条、加载等反馈元素',
    tags: ['SPAlert', 'SPDialog', 'SPLoading', 'SPTooltip', 'SPProgCir', 'SPProgressLinear', 'SPMsgBar']
  },
  {
    iconName: 'menu-outline',
    iconColor: 'teal',
    title: '导航组件',
    subtitle: '菜单、抽屉、侧边栏等导航元素',
    tags: ['SPMenu', 'SPDrawer', 'SPNavigationDrawer', 'SPSidebar', 'SPTour', 'SPGlobalBanner']
  },
  {
    iconName: 'list-outline',
    iconColor: 'red',
    title: '数据展示',
    subtitle: '列表、折叠面板、滚动条等展示元素',
    tags: ['SPList', 'SPCollapse', 'SPScrollbar', 'SPVirtualScroll']
  },
  {
    iconName: 'flash-outline',
    iconColor: 'amber',
    title: '特效组件',
    subtitle: '动画按钮、文本特效等视觉元素',
    tags: ['SPExpandBtn', 'SPMorphBtn', 'SPStretchBtn', 'SPFlipText', 'SPScrollText']
  }
]
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.footer-card {
  margin-top: 32px;
}

.d-flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.align-center {
  align-items: center;
}

.text-center {
  text-align: center;
}

.mx-2 {
  margin-left: 8px;
  margin-right: 8px;
}

.text-caption {
  font-size: 0.75rem;
}
</style>
