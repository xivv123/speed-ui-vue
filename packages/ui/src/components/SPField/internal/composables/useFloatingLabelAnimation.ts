// Utilities
import { animate, convertToUnit, nullifyTransforms, standardEasing } from '@/utils'

// Vue
import { watch, nextTick } from 'vue'

// Types
import type { Ref } from 'vue'
import type { SPFloatLabel as SPFloatLabelInstance } from '../SPFloatLabel'

export function useFloatingLabelAnimation(
  hasFloatingLabel: Ref<boolean>,
  labelRef: Ref<SPFloatLabelInstance | undefined>,
  floatingLabelRef: Ref<SPFloatLabelInstance | undefined>,
  isActive: Ref<boolean>
) {
  watch(
    isActive,
    async val => {
      if (!hasFloatingLabel.value || !labelRef.value || !floatingLabelRef.value) return

      const el: HTMLElement = labelRef.value.$el
      const targetEl: HTMLElement = floatingLabelRef.value.$el

      // Ensure children (including SPFieldOutline) have updated DOM
      await nextTick()
      requestAnimationFrame(() => {
        const rect = nullifyTransforms(el)
        const targetRect = targetEl.getBoundingClientRect()

        const x = targetRect.x - rect.x
        const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2)

        const targetWidth = targetRect.width / 0.75
        const width =
          Math.abs(targetWidth - rect.width) > 1
            ? { maxWidth: convertToUnit(targetWidth) }
            : undefined

        const style = getComputedStyle(el)
        const targetStyle = getComputedStyle(targetEl)
        const duration = parseFloat(style.transitionDuration) * 1000 || 150
        const scale = parseFloat(targetStyle.getPropertyValue('--sp-float-label-scale'))
        const color = targetStyle.getPropertyValue('color')

        el.style.visibility = 'visible'
        targetEl.style.visibility = 'hidden'

        animate(
          el,
          {
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            color,
            ...width,
          },
          {
            duration,
            easing: standardEasing,
            direction: val ? 'normal' : 'reverse',
          }
        ).finished.then(() => {
          el.style.removeProperty('visibility')
          targetEl.style.removeProperty('visibility')
        })
      })
    },
    { flush: 'post' }
  )
}

