<template>
  <div
    v-if="isHome"
    class="sp-home-hero"
    ref="root"
    aria-hidden="true"
  >
    <canvas ref="canvas" class="sp-hero-canvas" />

    <!-- Floating geometry with parallax -->
    <div class="sp-fx sp-fx--circle" :style="styleFor(60, 20, 0.06)" />
    <div class="sp-fx sp-fx--square" :style="styleFor(15, 8, 0.08)" />
    <div class="sp-fx sp-fx--triangle" :style="styleFor(82, 76, 0.07)" />
    <div class="sp-fx sp-fx--blob" :style="styleFor(70, 30, 0.05)" />
  </div>
  
  <!-- Keep slot for future extension if needed -->
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const isHome = computed(() => frontmatter.value?.layout === 'home')

const root = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)

let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let dpr = 1

type Particle = { x: number; y: number; vx: number; vy: number; r: number; h: number }
let particles: Particle[] = []
const mouse = { x: 0, y: 0, active: false }

function resize() {
  const el = canvas.value!
  const rect = el.getBoundingClientRect()
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  el.width = Math.floor(rect.width * dpr)
  el.height = Math.floor(rect.height * dpr)
}

function seed() {
  const el = canvas.value!
  const count = Math.min(80, Math.floor((el.width * el.height) / (1200 * 1200)) * 50 + 40)
  particles = Array.from({ length: count }).map(() => ({
    x: Math.random() * el.width,
    y: Math.random() * el.height,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: 1 + Math.random() * 2.5,
    h: Math.random() * 360,
  }))
}

function step() {
  if (!ctx || !canvas.value) return
  const el = canvas.value
  ctx.clearRect(0, 0, el.width, el.height)

  for (const p of particles) {
    // mild mouse repel
    if (mouse.active) {
      const dx = p.x - mouse.x * dpr
      const dy = p.y - mouse.y * dpr
      const dist2 = dx * dx + dy * dy
      const maxR = 180 * dpr
      if (dist2 < maxR * maxR) {
        const f = (1 - dist2 / (maxR * maxR)) * 0.8
        p.vx += (dx / Math.sqrt(dist2 + 0.001)) * f * 0.12
        p.vy += (dy / Math.sqrt(dist2 + 0.001)) * f * 0.12
      }
    }

    // integrate
    p.x += p.vx
    p.y += p.vy
    p.vx *= 0.985
    p.vy *= 0.985

    // wrap around
    if (p.x < -50) p.x = el.width + 50
    if (p.x > el.width + 50) p.x = -50
    if (p.y < -50) p.y = el.height + 50
    if (p.y > el.height + 50) p.y = -50

    // draw
    p.h += 0.1
    ctx.beginPath()
    ctx.fillStyle = `hsla(${p.h}, 90%, 60%, 0.08)`
    ctx.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2)
    ctx.fill()
  }

  raf = requestAnimationFrame(step)
}

function onMove(e: MouseEvent) {
  if (!root.value) return
  const rect = root.value.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
  mouse.active = true

  // parallax via CSS vars
  const cx = (mouse.x / rect.width - 0.5) * 2
  const cy = (mouse.y / rect.height - 0.5) * 2
  root.value.style.setProperty('--parallax-x', String(cx))
  root.value.style.setProperty('--parallax-y', String(cy))
}

function onLeave() {
  mouse.active = false
}

function styleFor(x: number, y: number, depth: number) {
  return {
    left: `${x}%`,
    top: `${y}%`,
    '--depth': String(depth),
  } as any
}

onMounted(() => {
  if (!isHome.value) return
  const el = canvas.value!
  ctx = el.getContext('2d')
  resize()
  seed()
  step()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('mouseleave', onLeave)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMove as any)
  window.removeEventListener('mouseleave', onLeave as any)
})
</script>

<style scoped>
.sp-home-hero {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0; /* behind hero content */
  pointer-events: none;
}

.sp-hero-canvas {
  position: absolute;
  inset: -10% -10% -10% -10%;
  width: 120%;
  height: 120%;
  filter: blur(0.25px) saturate(110%);
}

/* base shape */
.sp-fx {
  position: absolute;
  width: 120px;
  height: 120px;
  opacity: 0.1;
  filter: blur(0.2px) saturate(120%);
  transform: translate3d(
      calc(var(--parallax-x, 0) * 18px * var(--depth, 0.06)),
      calc(var(--parallax-y, 0) * 18px * var(--depth, 0.06)),
      0
    )
    rotate(0deg);
  animation: drift 12s ease-in-out infinite;
}

.sp-fx--circle {
  background: radial-gradient(circle, #2B8BC7, #197AAB);
  border-radius: 50%;
}

.sp-fx--square {
  background: linear-gradient(135deg, #4A9FD1, #197AAB);
  border-radius: 16px;
  width: 80px;
  height: 80px;
}

.sp-fx--triangle {
  width: 110px;
  height: 110px;
  background: linear-gradient(225deg, #06b6d4, #3b82f6);
  -webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.sp-fx--blob {
  width: 200px;
  height: 200px;
  border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%;
  background: radial-gradient(circle at 30% 30%, #a78bfa, transparent 60%),
    radial-gradient(circle at 70% 70%, #f472b6, transparent 60%),
    linear-gradient(135deg, rgba(79, 70, 229, 0.5), rgba(124, 58, 237, 0.5));
  opacity: 0.06;
  animation-duration: 18s;
}

@keyframes drift {
  0%,
  100% {
    transform: translate3d(
        calc(var(--parallax-x, 0) * 18px * var(--depth, 0.06)),
        calc(var(--parallax-y, 0) * 18px * var(--depth, 0.06)),
        0
      )
      rotate(0deg);
  }
  50% {
    transform: translate3d(
        calc(var(--parallax-x, 0) * 18px * var(--depth, 0.06)),
        calc(var(--parallax-y, 0) * 18px * var(--depth, 0.06) - 14px),
        0
      )
      rotate(180deg);
  }
}
</style>

