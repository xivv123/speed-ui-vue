<template>
  <div v-if="isHome" class="sp-hero-dock" aria-hidden="false">
    <div class="sp-hero-card">
      <header class="sp-hero-card__hd">
        <strong>交互预览</strong>
        <span class="sp-hero-card__tag">实时</span>
      </header>

      <section class="sp-hero-card__controls">
        <SPSegmented
          v-model="preset"
          :items="presets"
          class="sp-row"
        />

        <div class="sp-row">
          <SPTextField
            v-model="label"
            placeholder="按钮文案"
            density="comfortable"
            clearable
            style="min-width: 0"
          />
          <SPSwitch v-model="loading">Loading</SPSwitch>
        </div>

        <div class="sp-row">
          <span class="sp-row__label">进度 {{ progress }}%</span>
          <SPSlider v-model="progress" :min="0" :max="100" />
        </div>
      </section>

      <section class="sp-hero-card__stage">
        <SPProgressLinear :model-value="progress" :color="color" rounded />

        <div class="sp-stage-grid">
          <SPBtn :color="color" :loading="loading" rounded @click="ping">
            {{ label || '确定' }}
          </SPBtn>

          <SPSelect
            v-model="fruit"
            :items="['苹果', '香蕉', '橙子']"
            label="选择水果"
            density="comfortable"
          />

          <SPTextarea v-model="notes" label="备注" auto-grow />
        </div>
      </section>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const isHome = computed(() => frontmatter.value?.layout === 'home')

const presets = ['brand', 'success', 'warning', 'error']
const preset = ref('brand')
const color = computed(() => {
  switch (preset.value) {
    case 'success':
      return 'success'
    case 'warning':
      return 'warning'
    case 'error':
      return 'error'
    default:
      return 'primary'
  }
})

const label = ref('确定')
const loading = ref(false)
const progress = ref(40)
const fruit = ref('苹果')
const notes = ref('这里是可编辑区域')

function ping() {
  // 简单的交互反馈：点击时快速涨/落一点进度
  progress.value = Math.min(100, progress.value + 10)
  setTimeout(() => (progress.value = Math.max(0, progress.value - 8)), 400)
}
</script>

<style scoped>
.sp-hero-dock {
  position: absolute;
  right: max(32px, 6vw);
  top: 120px;
  width: min(520px, 42vw);
  pointer-events: auto;
  z-index: 2; /* above background */
  display: none;
}

@media (min-width: 1100px) {
  .sp-hero-dock { display: block; }
}

.sp-hero-card {
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 12px 30px rgba(17, 24, 39, 0.08), 0 1px 0 rgba(17, 24, 39, 0.04);
  border: 1px solid color-mix(in oklab, var(--vp-c-divider) 70%, transparent);
  overflow: hidden;
  animation: rise-in 420ms cubic-bezier(.2,.7,.2,1) both;
}

.sp-hero-card__hd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0));
}

.sp-hero-card__tag {
  font-size: 12px;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  padding: 2px 6px;
  border-radius: 999px;
}

.sp-hero-card__controls {
  display: grid;
  gap: 12px;
  padding: 12px 16px 6px 16px;
}

.sp-row { display: flex; gap: 12px; align-items: center; }
.sp-row__label { width: 80px; color: var(--vp-c-text-2); font-size: 12px; }

.sp-hero-card__stage {
  padding: 8px 16px 16px 16px;
}

.sp-stage-grid {
  margin-top: 10px;
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 1280px) {
  .sp-stage-grid { grid-template-columns: 1fr; }
}

@keyframes rise-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
