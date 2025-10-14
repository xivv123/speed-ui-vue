<template>
  <div class="features-section">
    <div class="features-container">
      <div class="guide-card">
        <img src="/vue.png" alt="Vue" />
        <div class="guide-body">
          <p class="guide-desc">Vue 3 组件生态与最佳实践</p>
        </div>
      </div>

      <div class="guide-card">
        <img src="/ts.png" alt="TypeScript" />
        <div class="guide-body">
          <p class="guide-desc">类型安全、智能提示、稳壮工程</p>
        </div>
      </div>

      <div class="guide-card">
        <img src="/material.png" alt="TypeScript" />

        <!-- <div class="guide-top grad-google"></div> -->
        <div class="guide-body">
          <p class="guide-desc">Material Design 3 设计规范</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// presentational section
</script>

<style scoped>
.features-section { margin-top: 4rem; padding: 0 2rem; }
.features-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.guide-card {
  background: #ffffff;
  border: 1px solid rgba(15, 18, 24, 0.06);
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(15, 18, 24, 0.06);
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.guide-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(15, 18, 24, 0.12); }

/* unify img height and spacing with the third card */
.guide-card > img {
  display: block;
  width: calc(100% - 32px);
  height: 140px;
  margin: 16px 16px 12px;
  border-radius: 12px;
  object-fit: cover;
  object-position: center;
}

.guide-top {
  height: 140px;
  margin: 16px 16px 12px;
  border-radius: 12px;
  position: relative;
}
.guide-top.grad-google { background: linear-gradient(135deg, #d7c8fb 0%, #b1a2f5 100%); }
.guide-top.grad-google::after {
  content: '';
  position: absolute; inset: 0;
  background-image:
    radial-gradient(48px 48px at 30% 58%, rgba(255,255,255,0.28), transparent 48px),
    radial-gradient(36px 36px at 52% 52%, rgba(255,255,255,0.26), transparent 36px),
    radial-gradient(44px 44px at 74% 56%, rgba(255,255,255,0.24), transparent 44px);
}

.guide-body { padding: 0 20px 18px; }
.guide-desc { margin: 8px 0 0; font-size: 14px; color: var(--vp-c-text-2, #6b7280); }

@media (max-width: 768px) {
  .features-section { margin-top: 2rem; padding: 0 1rem; }
  .features-container { grid-template-columns: 1fr; gap: 1.5rem; }
}
</style>

