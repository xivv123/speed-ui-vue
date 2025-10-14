import { h, onBeforeUnmount, Ref, ref } from 'vue'

export type ResizeDir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'

export interface PositionLike { x: number; y: number }

export interface UseResizableOptions {
  el: Ref<HTMLElement | undefined>
  position: Ref<PositionLike>
  width: Ref<number | string | undefined>
  height: Ref<number | string | undefined>
  enabled?: Ref<boolean> | boolean
  minWidth?: number | string
  minHeight?: number | string
  maxWidth?: number | string
  maxHeight?: number | string
  onStart?: () => void
}

export function useResizable(opts: UseResizableOptions) {
  const isResizing = ref(false)
  const dir = ref<ResizeDir | null>(null)
  const start = ref<
    | { w: number; h: number; x: number; y: number; px: number; py: number }
    | null
  >(null)

  const getNum = (v: number | string | undefined | null) => {
    if (v == null || v === '') return undefined
    const n = Number(v)
    return isNaN(n) ? undefined : n
  }

  function onMove(e: MouseEvent | TouchEvent) {
    if (!isResizing.value || !start.value) return
    const pt = 'touches' in e ? e.touches[0] : (e as MouseEvent)
    const dx = pt.clientX - start.value.x
    const dy = pt.clientY - start.value.y

    let w = start.value.w
    let h = start.value.h
    // baseline to the position at resize start to avoid cumulative drift
    let x = start.value.px
    let y = start.value.py

    const minW = getNum(opts.minWidth) ?? 120
    const minH = getNum(opts.minHeight) ?? 100
    const maxW = getNum(opts.maxWidth) ?? Infinity
    const maxH = getNum(opts.maxHeight) ?? Infinity

    switch (dir.value) {
      case 'e':
        w = Math.max(minW, start.value.w + dx)
        break
      case 's':
        h = Math.max(minH, start.value.h + dy)
        break
      case 'w':
        w = Math.max(minW, start.value.w - dx)
        x = start.value.px + dx
        break
      case 'n':
        h = Math.max(minH, start.value.h - dy)
        y = start.value.py + dy
        break
      case 'ne':
        w = Math.max(minW, start.value.w + dx)
        h = Math.max(minH, start.value.h - dy)
        y = start.value.py + dy
        break
      case 'nw':
        w = Math.max(minW, start.value.w - dx)
        x = start.value.px + dx
        h = Math.max(minH, start.value.h - dy)
        y = start.value.py + dy
        break
      case 'se':
        w = Math.max(minW, start.value.w + dx)
        h = Math.max(minH, start.value.h + dy)
        break
      case 'sw':
        w = Math.max(minW, start.value.w - dx)
        x = start.value.px + dx
        h = Math.max(minH, start.value.h + dy)
        break
    }

    // clamp
    w = Math.min(w, maxW)
    h = Math.min(h, maxH)

    opts.width.value = w as any
    opts.height.value = h as any
    opts.position.value = { x, y }

    e.preventDefault()
  }

  function end() {
    if (!isResizing.value) return
    isResizing.value = false
    dir.value = null
    start.value = null
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', end)
    window.removeEventListener('touchmove', onMove)
    window.removeEventListener('touchend', end)
  }

  function startResize(d: ResizeDir, e: MouseEvent | TouchEvent) {
    const enabled = typeof opts.enabled === 'boolean' ? opts.enabled : opts.enabled?.value
    if (enabled === false) return
    opts.onStart?.()
    isResizing.value = true
    dir.value = d
    const pt = 'touches' in e ? e.touches[0] : (e as MouseEvent)
    const rect = opts.el.value?.getBoundingClientRect()
    const w = rect?.width ?? getNum(opts.width.value) ?? 200
    const h = rect?.height ?? getNum(opts.height.value) ?? 160
    start.value = {
      w,
      h,
      x: pt.clientX,
      y: pt.clientY,
      px: opts.position.value.x,
      py: opts.position.value.y,
    }
    window.addEventListener('mousemove', onMove, { passive: false })
    window.addEventListener('mouseup', end, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', end, { passive: true })
    e.preventDefault()
    ;(e as Event).stopPropagation()
  }

  onBeforeUnmount(() => end())

  function renderHandles() {
    return [
      h('div', {
        class: 'sp-note__resize sp-note__resize--n',
        onMousedown: (e: MouseEvent) => startResize('n', e),
        onTouchstart: (e: TouchEvent) => startResize('n', e),
      }),
      h('div', {
        class: 'sp-note__resize sp-note__resize--s',
        onMousedown: (e: MouseEvent) => startResize('s', e),
        onTouchstart: (e: TouchEvent) => startResize('s', e),
      }),
      h('div', {
        class: 'sp-note__resize sp-note__resize--e',
        onMousedown: (e: MouseEvent) => startResize('e', e),
        onTouchstart: (e: TouchEvent) => startResize('e', e),
      }),
      h('div', {
        class: 'sp-note__resize sp-note__resize--w',
        onMousedown: (e: MouseEvent) => startResize('w', e),
        onTouchstart: (e: TouchEvent) => startResize('w', e),
      }),
      h('div', {
        class: 'sp-note__resize sp-note__resize--ne',
        onMousedown: (e: MouseEvent) => startResize('ne', e),
        onTouchstart: (e: TouchEvent) => startResize('ne', e),
      }),
      h('div', {
        class: 'sp-note__resize sp-note__resize--nw',
        onMousedown: (e: MouseEvent) => startResize('nw', e),
        onTouchstart: (e: TouchEvent) => startResize('nw', e),
      }),
      h('div', {
        class: 'sp-note__resize sp-note__resize--se',
        onMousedown: (e: MouseEvent) => startResize('se', e),
        onTouchstart: (e: TouchEvent) => startResize('se', e),
      }),
      h('div', {
        class: 'sp-note__resize sp-note__resize--sw',
        onMousedown: (e: MouseEvent) => startResize('sw', e),
        onTouchstart: (e: TouchEvent) => startResize('sw', e),
      }),
    ]
  }

  return { isResizing, startResize, renderHandles }
}
