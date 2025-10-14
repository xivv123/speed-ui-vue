import { onBeforeUnmount, onMounted, Ref, ref } from 'vue'

export interface UseDraggableOptions<T extends { x: number; y: number }> {
  handle: Ref<HTMLElement | undefined>
  position: Ref<T>
  enabled?: Ref<boolean> | boolean
  onStart?: (pos: T) => void
  onMove?: (pos: T) => void
  onEnd?: (pos: T) => void
}

export function useDraggable<T extends { x: number; y: number }>(
  opts: UseDraggableOptions<T>
) {
  const isDragging = ref(false)
  const offset = ref({ dx: 0, dy: 0 })

  const isEnabled = () =>
    typeof opts.enabled === 'boolean' ? opts.enabled : !!opts.enabled?.value

  function move(e: MouseEvent | TouchEvent) {
    if (!isDragging.value) return
    const p = 'touches' in e ? e.touches[0] : (e as MouseEvent)
    const x = p.clientX - offset.value.dx
    const y = p.clientY - offset.value.dy
    opts.position.value = { ...(opts.position.value as any), x, y }
    opts.onMove?.(opts.position.value)
    e.preventDefault()
  }

  function up() {
    if (!isDragging.value) return
    isDragging.value = false
    opts.onEnd?.(opts.position.value)
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', up)
    window.removeEventListener('touchmove', move)
    window.removeEventListener('touchend', up)
  }

  function down(e: MouseEvent | TouchEvent) {
    if (!isEnabled()) return
    const p = 'touches' in e ? e.touches[0] : (e as MouseEvent)
    isDragging.value = true
    offset.value = {
      dx: p.clientX - opts.position.value.x,
      dy: p.clientY - opts.position.value.y,
    }
    opts.onStart?.(opts.position.value)
    window.addEventListener('mousemove', move, { passive: false })
    window.addEventListener('mouseup', up, { passive: true })
    window.addEventListener('touchmove', move, { passive: false })
    window.addEventListener('touchend', up, { passive: true })
    e.preventDefault()
  }

  onMounted(() => {
    opts.handle.value?.addEventListener('mousedown', down)
    opts.handle.value?.addEventListener('touchstart', down, { passive: false })
  })
  onBeforeUnmount(() => {
    opts.handle.value?.removeEventListener('mousedown', down)
    opts.handle.value?.removeEventListener('touchstart', down)
    up()
  })

  return { isDragging }
}

