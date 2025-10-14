<template>
  <div v-if="isHome" class="home-scroll-showcase">
    <HeroTitle />
    <ScrollMarquee />
    <FeatureGuides />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import HeroTitle from './home-scroll/HeroTitle.vue'
import ScrollMarquee from './home-scroll/ScrollMarquee.vue'
import FeatureGuides from './home-scroll/FeatureGuides.vue'

const { frontmatter } = useData()
const isHome = computed(() => frontmatter.value?.layout === 'home')
</script>

<style scoped>
.home-scroll-showcase {
  position: relative;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  padding: 0;
}
</style>

