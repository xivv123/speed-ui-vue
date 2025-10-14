// Styles
import './style/SPMorphBtn.scss'

// Props & Types
import { makeSPMorphBtnProps } from './props'
import type { SPMorphBtnSlots } from './types'

// Composables
import { useDimension } from '@/composables/dimensions'
import { useRounded } from '@/composables/rounded'
import { useSize } from '@/composables/size'
import { provideTheme } from '@/composables/theme'
import { useVariant } from '@/composables/variant'

// Utilities
import { computed, ref, watch, nextTick } from 'vue'
import { convertToUnit, animate, genericComponent, useRender } from '@/utils'

export const SPMorphBtn = genericComponent<SPMorphBtnSlots>()({
  name: 'SPMorphBtn',

  props: makeSPMorphBtnProps(),

  emits: {
    'update:expanded': (val: boolean) => true,
    'click': (e: MouseEvent) => true,
    'expand': () => true,
    'collapse': () => true,
  },

  setup(props, { slots, emit }) {
    // Refs
    const buttonRef = ref<HTMLElement>()
    const isAnimating = ref(false)

    // Composables
    const { themeClasses } = provideTheme(props)
    const { dimensionStyles } = useDimension(props)
    const { roundedClasses } = useRounded(props)
    const { sizeClasses, sizeStyles } = useSize(props, 'sp-morph-btn')
    const { variantClasses, colorClasses, colorStyles } = useVariant(props)

    // Computed
    const isExpanded = computed({
      get: () => props.expanded,
      set: (value: boolean) => emit('update:expanded', value)
    })

    const morphStyles = computed(() => {
      if (!isExpanded.value) {
        // 圆形状态
        return {
          '--sp-morph-btn-width': convertToUnit(props.size || 48),
          '--sp-morph-btn-height': convertToUnit(props.size || 48),
          '--sp-morph-btn-border-radius': '50%',
        }
      } else {
        // 展开状态
        return {
          '--sp-morph-btn-width': convertToUnit(props.expandedWidth),
          '--sp-morph-btn-height': convertToUnit(props.expandedHeight),
          '--sp-morph-btn-border-radius': convertToUnit(12),
        }
      }
    })

    // Methods
    const handleClick = (event: MouseEvent) => {
      if (props.disabled || isAnimating.value) return
      
      emit('click', event)
      toggle()
    }

    const toggle = async () => {
      if (isAnimating.value) return
      
      isAnimating.value = true
      
      const newExpanded = !isExpanded.value
      
      if (newExpanded) {
        emit('expand')
      } else {
        emit('collapse')
      }
      
      // 使用 Web Animations API 进行平滑动画
      await animateMorph(newExpanded)
      
      isExpanded.value = newExpanded
      isAnimating.value = false
    }

    const animateMorph = async (toExpanded: boolean) => {
      if (!buttonRef.value) return
      
      const element = buttonRef.value
      const currentSize = props.size || 48
      
      const fromWidth = toExpanded ? currentSize : props.expandedWidth
      const toWidth = toExpanded ? props.expandedWidth : currentSize
      const fromHeight = toExpanded ? currentSize : props.expandedHeight
      const toHeight = toExpanded ? props.expandedHeight : currentSize
      const fromRadius = toExpanded ? '50%' : convertToUnit(12)
      const toRadius = toExpanded ? convertToUnit(12) : '50%'
      
      const keyframes = [
        {
          width: convertToUnit(fromWidth),
          height: convertToUnit(fromHeight),
          borderRadius: fromRadius,
        },
        {
          width: convertToUnit(toWidth),
          height: convertToUnit(toHeight),
          borderRadius: toRadius,
        }
      ]
      
      const animation = animate(element, keyframes, {
        duration: props.duration,
        easing: props.easing,
        fill: 'forwards'
      })
      
      return animation.finished
    }

    // Watch for external changes
    watch(() => props.expanded, async (newVal, oldVal) => {
      if (newVal !== oldVal && !isAnimating.value) {
        await nextTick()
        await animateMorph(newVal)
      }
    })

    useRender(() => (
      <props.tag
        ref={buttonRef}
        class={[
          'sp-morph-btn',
          {
            'sp-morph-btn--expanded': isExpanded.value,
            'sp-morph-btn--disabled': props.disabled,
            'sp-morph-btn--animating': isAnimating.value,
          },
          themeClasses.value || '',
          roundedClasses.value || '',
          sizeClasses.value || '',
          variantClasses.value || '',
          colorClasses?.value || '',
        ]}
        style={[
          dimensionStyles.value || {},
          sizeStyles.value || {},
          colorStyles?.value || {},
          morphStyles.value,
        ]}
        disabled={props.disabled}
        onClick={handleClick}
      >
        {/* 默认状态内容（圆形按钮） */}
        {!isExpanded.value && (
          <div class="sp-morph-btn__default">
            {slots.default?.() || <span class="sp-morph-btn__icon">+</span>}
          </div>
        )}

        {/* 展开状态内容（超方形按钮） */}
        {isExpanded.value && (
          <div class="sp-morph-btn__expanded">
            {slots.expanded?.() || <span class="sp-morph-btn__expanded-content">展开内容</span>}
          </div>
        )}

        {/* 背景层 */}
        <div class="sp-morph-btn__background" />
      </props.tag>
    ))

    return {}
  },
})

export type SPMorphBtn = InstanceType<typeof SPMorphBtn>