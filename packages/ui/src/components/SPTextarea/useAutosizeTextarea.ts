// Composables
import { useResizeObserver } from '@/composables/resizeObserver'

// Utils
import { clamp, convertToUnit } from '@/utils'

// Vue
import { computed, nextTick, onMounted, ref, shallowRef, unref, watch, watchEffect } from 'vue'

// Types
import type { Ref } from 'vue'

interface Options {
  autoGrow: Ref<boolean> | boolean
  rowsProp: Ref<number | string> | number | string
  maxRowsProp?: Ref<number | string | undefined> | number | string | undefined
  // SPField instance ref to access $el for CSS variables
  fieldEl?: Ref<{ $el: HTMLElement } | undefined>
}

export function useAutosizeTextarea(options: Options) {
  const rows = ref(Number(unref(options.rowsProp)))
  const controlHeight = shallowRef('')

  const { resizeRef: sizerRef } = useResizeObserver(() => calculate())

  function calculate() {
    if (!unref(options.autoGrow)) return

    const sizerEl = sizerRef.el as HTMLTextAreaElement | undefined
    const fieldEl = options.fieldEl?.value?.$el as HTMLElement | undefined
    if (!sizerEl || !fieldEl) return

    nextTick(() => {
      const style = getComputedStyle(sizerEl)
      const fieldStyle = getComputedStyle(fieldEl)

      const padding =
        parseFloat(style.getPropertyValue('--sp-field-padding-top')) +
        parseFloat(style.getPropertyValue('--sp-input-padding-top')) +
        parseFloat(style.getPropertyValue('--sp-field-padding-bottom'))

      const height = sizerEl.scrollHeight
      const lineHeight = parseFloat(style.lineHeight)

      const minHeight = Math.max(
        Number(unref(options.rowsProp)) * lineHeight + padding,
        parseFloat(fieldStyle.getPropertyValue('--sp-input-control-height'))
      )

      const maxRowsVal = unref(options.maxRowsProp as any)
      const maxRowsNum =
        maxRowsVal == null || maxRowsVal === '' ? undefined : Number(maxRowsVal)
      const maxHeight =
        maxRowsNum != null ? maxRowsNum * lineHeight + padding : Infinity

      const newHeight = clamp(height ?? 0, minHeight, maxHeight)
      rows.value = Math.floor((newHeight - padding) / lineHeight)
      controlHeight.value = convertToUnit(newHeight)
    })
  }

  // Keep rows in sync when not using autoGrow
  watchEffect(() => {
    if (!unref(options.autoGrow)) rows.value = Number(unref(options.rowsProp))
  })

  onMounted(calculate)
  watch(() => unref(options.rowsProp), () => calculate())
  watch(() => unref(options.maxRowsProp as any), () => calculate())

  return {
    sizerRef,
    rows,
    controlHeight,
    calculate,
  }
}

