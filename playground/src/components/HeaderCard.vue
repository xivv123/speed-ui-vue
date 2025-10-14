<template>
  <sp-card class="header-card" elevation="2">
    <sp-card-item class="header-card-item">
      <template #prepend>
        <slot name="prepend">
          <div class="prepend-content">
            <sp-btn 
              v-if="back"
              variant="text" 
              color="white" 
              @click="goBack"
              class="back-btn"
            >
              <sp-icon name="arrow-back" size="20" />
              返回
            </sp-btn>
            <sp-icon :name="iconName" size="48" :color="iconColor" />
          </div>
        </slot>
      </template>
      <sp-card-title class="text-h3 font-weight-bold header-title">
        {{ title }}
      </sp-card-title>
      <!-- <sp-card-subtitle class="text-h6 text-medium-emphasis header-subtitle">
        {{ subtitle }}
      </sp-card-subtitle> -->
    </sp-card-item>
  </sp-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  iconName?: string
  iconColor?: string
  title: string
  subtitle?: string
  back?: boolean
}

withDefaults(defineProps<Props>(), {
  iconName: 'grid',
  iconColor: 'primary',
  back: false
})

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.header-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  min-height: 80px;
}

.header-card-item {
  padding: 20px 24px !important;
  align-items: flex-start !important;
}

.prepend-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-title {
  font-size: 1.75rem !important;
  line-height: 2rem !important;
  margin-bottom: 4px !important;
  margin-top: 0 !important;
  display: block !important;
  width: 100% !important;
}

.header-subtitle {
  font-size: 1.125rem !important;
  line-height: 1.5rem !important;
  margin-top: 4px !important;
  display: block !important;
  width: 100% !important;
}

.text-h3 {
  font-size: 1.75rem;
  line-height: 2rem;
  margin-bottom: 4px;
}

.text-h6 {
  font-size: 1.125rem;
  line-height: 1.5rem;
  margin-top: 4px;
}

.font-weight-bold {
  font-weight: 700;
}

.text-medium-emphasis {
  opacity: 0.7;
}

.back-btn {
  margin-right: 0;
  padding: 8px 12px;
  min-width: auto;
}
</style>