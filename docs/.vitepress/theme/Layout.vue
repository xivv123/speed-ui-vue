<template>
  <!-- 全局加载条 -->
  <GlobalLoadingBar ref="loadingBarRef" />
  <Layout>
    <!-- 默认布局内容 -->
    <template #nav-bar-title-before>
      <slot name="nav-bar-title-before" />
    </template>
    
    <template #nav-bar-title-after>
      <slot name="nav-bar-title-after" />
    </template>
    
    <template #nav-bar-content-before>
      <slot name="nav-bar-content-before" />
    </template>
    
    <template #nav-bar-content-after>
      <slot name="nav-bar-content-after" />
    </template>
    
    <template #nav-screen-content-before>
      <slot name="nav-screen-content-before" />
    </template>
    
    <template #nav-screen-content-after>
      <slot name="nav-screen-content-after" />
    </template>
    
    <template #sidebar-nav-before>
      <slot name="sidebar-nav-before" />
    </template>
    
    <template #sidebar-nav-after>
      <slot name="sidebar-nav-after" />
    </template>
    
    <template #page-top>
      <slot name="page-top" />
    </template>
    
    <template #page-bottom>
      <slot name="page-bottom" />
    </template>
    
    <template #not-found>
      <slot name="not-found" />
    </template>
    
    <template #home-hero-before>
      <slot name="home-hero-before" />
    </template>
    
    <template #home-hero-info>
      <slot name="home-hero-info" />
    </template>
    
    <template #home-hero-actions>
      <slot name="home-hero-actions" />
    </template>
    
    <template #home-hero-after>
      <!-- Home interactive showcase (no dynamic bg) -->
      <!-- Interactive component showcase dock -->
      <HomeScrollShowcase />
      <slot name="home-hero-after" />
    </template>
    
    <template #home-features-before>
      <slot name="home-features-before" />
    </template>
    
    <template #home-features-after>
      <slot name="home-features-after" />
    </template>
    
    <template #doc-footer-before>
      <slot name="doc-footer-before" />
    </template>
    
    <template #doc-before>
      <slot name="doc-before" />
    </template>
    
    <template #doc-after>
      <slot name="doc-after" />
    </template>
    
    <template #doc-top>
      <slot name="doc-top" />
    </template>
    
    <template #doc-bottom>
      <slot name="doc-bottom" />
    </template>
    
    <template #aside-top>
      <slot name="aside-top" />
    </template>
    
    <template #aside-bottom>
      <slot name="aside-bottom" />
    </template>
    
    <template #aside-outline-before>
      <slot name="aside-outline-before" />
    </template>
    
    <template #aside-outline-after>
      <slot name="aside-outline-after" />
    </template>
    
    <template #aside-ads-before>
      <slot name="aside-ads-before" />
    </template>
    
    <template #aside-ads-after>
      <slot name="aside-ads-after" />
    </template>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import GlobalLoadingBar from './components/GlobalLoadingBar.vue'
import HomeScrollShowcase from './components/HomeScrollShowcase.vue'

const { Layout } = DefaultTheme
const loadingBarRef = ref(null)

// 全局提供加载条控制方法
onMounted(() => {
  if (typeof window !== 'undefined') {
    // 将加载条方法挂载到全局
    window.$loadingBar = {
      start: () => loadingBarRef.value?.start(),
      finish: () => loadingBarRef.value?.finish()
    }
  }
})
</script>
