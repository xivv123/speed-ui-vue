// Styles
import './style/SPExpandBtn.scss'

// Composables
import { MaybeTransition } from '@/composables/transition'

// Utilities
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { animate, convertToUnit, genericComponent, useRender } from '@/utils'

// Props & Types
import { makeExpandBtnProps } from './props'
import type { SPExpandBtnSlots } from './types'

export type { SPExpandBtnProps, SPExpandBtnSlots } from './types'
export { makeExpandBtnProps } from './props'

export const SPExpandBtn = genericComponent<SPExpandBtnSlots>()({
  name: 'SPExpandBtn',

  props: makeExpandBtnProps({
    collapsedWidth: 48,
    expandedWidth: 200,
    duration: 300,
    disabled: false,
    shape: 'circle',
  }),

  setup(props, { slots }) {
    const elRef = ref<HTMLElement>()
    const isExpanded = ref(false)
    const isAnimating = ref(false)
    let currentAnimation: Animation | null = null
    let leaveTimer: ReturnType<typeof setTimeout> | null = null

    const containerStyles = computed(() => ({
      width: convertToUnit(
        isExpanded.value ? props.expandedWidth : props.collapsedWidth
      ),
      height: convertToUnit(props.collapsedWidth), // 添加高度
    }))

    const clearTimer = () => {
      if (leaveTimer) {
        clearTimeout(leaveTimer)
        leaveTimer = null
      }
    }

    const cancelAnimation = () => {
      if (currentAnimation) {
        currentAnimation.cancel()
        currentAnimation = null
        isAnimating.value = false
      }
    }

    const animateWidth = async (toExpanded: boolean) => {
      if (!elRef.value) return

      // 取消之前的动画
      cancelAnimation()

      // 获取当前实际宽度（可能在动画中间）
      const currentWidth = elRef.value.offsetWidth
      const toWidth = toExpanded ? props.expandedWidth : props.collapsedWidth

      // 如果已经是目标宽度，不需要动画
      if (currentWidth === Number(toWidth)) return

      isAnimating.value = true

      const animation = animate(
        elRef.value,
        [
          { width: convertToUnit(currentWidth) },
          { width: convertToUnit(toWidth) },
        ],
        {
          duration: props.duration,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'both',
        }
      )

      // 检查是否是真正的 Animation 对象
      if ('cancel' in animation) {
        currentAnimation = animation as Animation
      }

      try {
        await animation.finished
        // 动画完成后，commitStyles 确保样式保持
        if (currentAnimation && 'commitStyles' in currentAnimation) {
          currentAnimation.commitStyles()
        }
      } catch (e) {
        // Animation was cancelled
      } finally {
        isAnimating.value = false
        if (currentAnimation && 'cancel' in currentAnimation) {
          currentAnimation.cancel()
        }
        currentAnimation = null
      }
    }

    const handleMouseEnter = () => {
      if (props.disabled) return

      clearTimer()
      
      // 如果已经展开或正在展开，不需要重复操作
      if (isExpanded.value) return
      
      isExpanded.value = true
    }

    const handleMouseLeave = () => {
      if (props.disabled) return

      clearTimer()
      
      // 如果已经收起，不需要重复操作
      if (!isExpanded.value) return
      
      // 延迟收起，避免鼠标快速划过时闪烁
      leaveTimer = setTimeout(() => {
        isExpanded.value = false
        leaveTimer = null
      }, 150)
    }

    watch(isExpanded, async (val, oldVal) => {
      if (val === oldVal) return
      await animateWidth(val)
    })

    onBeforeUnmount(() => {
      clearTimer()
      cancelAnimation()
    })

    useRender(() => {
      return (
        <div
          ref={elRef}
          class={[
            'sp-expand-btn',
            `sp-expand-btn--${props.shape}`,
            {
              'sp-expand-btn--expanded': isExpanded.value,
              'sp-expand-btn--disabled': props.disabled,
              'sp-expand-btn--animating': isAnimating.value,
            },
          ]}
          style={containerStyles.value}
          onMouseenter={handleMouseEnter}
          onMouseleave={handleMouseLeave}
        >
          <MaybeTransition transition="fade-transition">
            {!isExpanded.value && (
              <div class="sp-expand-btn__collapsed">{slots.collapsed?.()}</div>
            )}
          </MaybeTransition>

          <MaybeTransition transition="fade-transition">
            {isExpanded.value && (
              <div class="sp-expand-btn__expanded">{slots.expanded?.()}</div>
            )}
          </MaybeTransition>
        </div>
      )
    })

    return {
      isExpanded,
    }
  },
})

export type SPExpandBtn = InstanceType<typeof SPExpandBtn>
