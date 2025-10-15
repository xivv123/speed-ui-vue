<template>
  <div class="hero-top">
    <div class="hero-layout">
      <div class="hero-left">
        <div class="headline-glass-area" @mousemove="onMove" @mouseenter="onEnter" @mouseleave="onLeave">
          <h1 class="hero-headline" aria-label="SPEED UI VUE3 COMPONENT">
            <span class="speed-text">
              <img src="/logos/logo.png" alt="S" class="logo-s" />PEED UI
            </span>
            <span>UI Library</span>
          </h1>
          <div v-show="glassVisible" class="glass-cursor" :style="glassStyle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const glassVisible = ref(false)
const glassStyle = ref<Record<string, string>>({})

function onEnter() {
  glassVisible.value = true
}

function onLeave() {
  glassVisible.value = false
}

function onMove(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const size = 150 // 更小的玻璃直径，更贴近苹果的光晕范围
  glassStyle.value = {
    left: `${x - size / 2}px`,
    top: `${y - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
  }
}
</script>

<style scoped>
.hero-layout {
  width: min(1280px, 92vw);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: start;
}

.hero-top {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: calc(var(--vp-nav-height, 64px) + 12px) 16px 16px;
}

.hero-left { text-align: center; justify-self: center; }

.hero-headline {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
  text-align: center;
  font-weight: 600; /* thinner */
  line-height: 1.1;
  letter-spacing: 4px;
  font-stretch: ultra-condensed;
  color: #1866ff;
  font-size: clamp(60px, 12vw, 172px);
  min-height: clamp(120px, 20vw, 300px);
}

@media (max-width: 768px) {
  .hero-headline {
    font-size: clamp(64px, 14vw, 120px);
    min-height: clamp(150px, 23vw, 230px);
  }
}

.hero-headline span {
  display: block;
  transform: scaleX(0.92) scaleY(1); /* thinner look */
  transform-origin: left bottom;
  margin-bottom: clamp(4px, 1vw, 8px);
}

.speed-text {
  display: flex !important;
  align-items: baseline;
  justify-content: flex-start;
  gap: 0;
}

/* 仅第一排贴左，其余保持居中 */
.hero-headline > .speed-text {
  align-self: flex-start;
  text-align: left;
}
.logo-s {
  height: 0.81em;
  width: 0.8em;
  display: inline-block;
  vertical-align: baseline;
  margin-right: -0.05em;
  transform: scaleX(0.85) scaleY(0.9);
  transform-origin: left bottom;
}

@media (max-width: 768px) {
  .hero-top { padding-top: calc(var(--vp-nav-height, 72px) + 8px); }
}
.headline-glass-area {
  position: relative;
  display: inline-block;
}

/* 苹果液态玻璃效果 (Liquid Glass) */
.glass-cursor {
  position: absolute;
  pointer-events: none;
  border-radius: 999px;

  /* 液态玻璃基础层 - 半透明底色 */
  background-color: rgba(255, 255, 255, 0.06);

  /* 多层液态渐变叠加 - 模拟光线在液体中的折射和反射 */
  background-image:
    /* 主高光 - 左上角强烈反射 */
    radial-gradient(140% 140% at 25% 25%,
      rgba(255, 255, 255, 0.85) 0%,
      rgba(255, 255, 255, 0.45) 20%,
      rgba(255, 255, 255, 0.15) 35%,
      rgba(255, 255, 255, 0.0) 50%),
    /* 次级高光 - 右下角柔和反射 */
    radial-gradient(160% 120% at 75% 70%,
      rgba(255, 255, 255, 0.50) 0%,
      rgba(255, 255, 255, 0.25) 25%,
      rgba(255, 255, 255, 0.08) 45%,
      rgba(255, 255, 255, 0.0) 65%),
    /* 中央扩散光晕 */
    radial-gradient(circle at 50% 50%,
      rgba(255, 255, 255, 0.18) 0%,
      rgba(255, 255, 255, 0.10) 30%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.02) 70%,
      rgba(255, 255, 255, 0.0) 90%),
    /* 色彩折射层 - 模拟液体中的色散 */
    radial-gradient(ellipse 130% 100% at 60% 40%,
      rgba(100, 149, 237, 0.12) 0%,
      rgba(138, 43, 226, 0.08) 40%,
      rgba(255, 255, 255, 0.0) 70%);

  /* 液态玻璃边缘 - 柔和但有光泽 */
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  background-clip: padding-box;

  /* 多层阴影 - 创造深度和液态质感 */
  box-shadow:
    /* 内部光晕 - 液体的内反射 */
    inset 0 0 35px rgba(255, 255, 255, 0.35),
    inset 0 -12px 28px rgba(255, 255, 255, 0.22),
    inset -8px -8px 20px rgba(255, 255, 255, 0.15),
    /* 外部阴影 - 液滴的投影 */
    0 8px 32px rgba(24, 102, 255, 0.15),
    0 2px 8px rgba(0, 0, 0, 0.08),
    /* 外光晕 - 液体的光散射 */
    0 0 60px rgba(255, 255, 255, 0.20);

  /* 液态玻璃的核心 - 强化的背景模糊和色彩增强 */
  backdrop-filter: blur(28px) saturate(200%) brightness(1.15) contrast(1.06) hue-rotate(2deg);
  -webkit-backdrop-filter: blur(28px) saturate(200%) brightness(1.15) contrast(1.06) hue-rotate(2deg);

  /* 液态混合模式 */
  mix-blend-mode: screen;

  /* 性能优化 */
  will-change: transform, opacity, filter;

  /* 液态流动动画 */
  transition:
    transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 250ms ease-out,
    filter 200ms ease-out,
    box-shadow 200ms ease-out;

  opacity: 0.92;

  /* 液态波纹动画 */
  animation: liquidPulse 3s ease-in-out infinite;
}

/* 液态波纹关键帧 */
@keyframes liquidPulse {
  0%, 100% {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.5));
  }
}

/* 液态玻璃的内层光晕 - 增强立体感和液态质感 */
.glass-cursor::before {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(
    circle at 35% 35%,
    rgba(255, 255, 255, 0.35) 0%,
    rgba(255, 255, 255, 0.15) 30%,
    rgba(255, 255, 255, 0.0) 60%
  );
  opacity: 0.8;
  mix-blend-mode: overlay;
  animation: liquidShimmer 4s ease-in-out infinite;
}

/* 边缘高光环 - 模拟液滴表面张力的光泽 */
.glass-cursor::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.25) inset,
    0 0 12px rgba(255, 255, 255, 0.20);
  animation: liquidGlow 2.5s ease-in-out infinite alternate;
}

/* 液态光泽动画 */
@keyframes liquidShimmer {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.8;
  }
  33% {
    transform: translate(2px, -2px) scale(1.02);
    opacity: 0.9;
  }
  66% {
    transform: translate(-2px, 2px) scale(0.98);
    opacity: 0.85;
  }
}

/* 液态光晕呼吸 */
@keyframes liquidGlow {
  0% {
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.25) inset,
      0 0 12px rgba(255, 255, 255, 0.20);
  }
  100% {
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.35) inset,
      0 0 20px rgba(255, 255, 255, 0.35);
  }
}

/* Hover 状态 - 液态玻璃的弹性反馈 */
.headline-glass-area:hover .glass-cursor {
  transform: scale(1.05);
  opacity: 0.96;
  box-shadow:
    inset 0 0 40px rgba(255, 255, 255, 0.40),
    inset 0 -12px 32px rgba(255, 255, 255, 0.28),
    inset -8px -8px 24px rgba(255, 255, 255, 0.20),
    0 10px 40px rgba(24, 102, 255, 0.25),
    0 4px 12px rgba(0, 0, 0, 0.10),
    0 0 80px rgba(255, 255, 255, 0.30);
  animation: liquidPulse 2s ease-in-out infinite;
}

/* 降级处理：如果不支持 backdrop-filter */
@supports not ((backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px))) {
  .glass-cursor {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background-color: rgba(255, 255, 255, 0.12);
    background-image:
      radial-gradient(140% 140% at 25% 25%,
        rgba(255, 255, 255, 0.60) 0%,
        rgba(255, 255, 255, 0.30) 25%,
        rgba(255, 255, 255, 0.0) 50%),
      radial-gradient(160% 120% at 75% 70%,
        rgba(255, 255, 255, 0.40) 0%,
        rgba(255, 255, 255, 0.20) 30%,
        rgba(255, 255, 255, 0.0) 60%);
    border: 1.5px solid rgba(255, 255, 255, 0.35);
    box-shadow:
      inset 0 0 28px rgba(255, 255, 255, 0.28),
      0 8px 24px rgba(0, 0, 0, 0.10);
  }
}

/* 提升文字的液态光晕效果 */
.headline-glass-area:hover .hero-headline {
  filter: drop-shadow(0 8px 20px rgba(24, 102, 255, 0.20))
          drop-shadow(0 0 40px rgba(255, 255, 255, 0.15));
  transition: filter 300ms ease-out;
}

</style>

