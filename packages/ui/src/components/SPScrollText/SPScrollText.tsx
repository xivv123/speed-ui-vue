import { defineComponent, ref, computed, onMounted, onUnmounted, watch, nextTick, shallowRef } from 'vue'
import { makeSPScrollTextProps } from './props'
// import type { SPScrollTextSlots } from './types'

// Composables
import { useTheme } from '@/composables/theme'
import { useDelay } from '@/composables/delay'
import { useDebounce } from '@/composables/debounce'
import { useResizeObserver } from '@/composables/resizeObserver'
import { animate } from '@/utils/animation'

export const SPScrollText = defineComponent({
  name: 'SPScrollText',
  props: makeSPScrollTextProps(),
  setup(props, { slots }) {
    const { themeClasses } = useTheme()

    // 状态管理 - 优化响应式数据使用
    const containerRef = shallowRef<HTMLElement>()
    const contentRef = shallowRef<HTMLElement>()
    // 将频繁更新的位置改为非响应式，只在需要时更新样式
    let currentPosition = 0
    const transformStyle = ref('')
    const isAnimating = shallowRef(false)
    const isHovered = shallowRef(false)

    // 缓存方向判断结果
    const isHorizontal = computed(() => ['left', 'right'].includes(props.direction))

    // 缓存DOM尺寸，避免频繁查询
    const containerSize = ref(0)
    const contentSize = ref(0)

    // 使用 delay composable 处理延迟
    const { clearDelay, runOpenDelay } = useDelay({ openDelay: props.delay })

    // 使用 debounce composable
    const { debounce: debouncedRestart } = useDebounce({ delay: 100 })

    // 使用 ResizeObserver 监听容器大小变化
    const { resizeRef, contentRect } = useResizeObserver(() => {
      updateSizes()
      // 尺寸变化时重新开始动画
      debouncedRestart(() => {
        stopAnimation()
        resetPosition()
        if (!actualPaused.value) {
          nextTick(() => {
            startAnimation()
          })
        }
      })
    })
    
    // 当前动画实例
    let currentAnimation: Animation | { finished: Promise<void> } | null = null

    // 实际暂停状态（包括 hover 和 props.paused）
    const actualPaused = computed(() => props.paused || (props.pauseOnHover && isHovered.value))

    // 计算起始位置的辅助函数 - 提取重复逻辑
    const getStartPosition = (): number => {
      if (props.direction === 'left' || props.direction === 'up') {
        return containerSize.value
      } else {
        return -contentSize.value
      }
    }

    // 计算结束位置的辅助函数
    const getEndPosition = (): number => {
      if (props.direction === 'left' || props.direction === 'up') {
        return -contentSize.value
      } else {
        return containerSize.value
      }
    }
    
    // 更新DOM尺寸的函数
    const updateSizes = () => {
      if (containerRef.value && contentRef.value) {
        containerSize.value = isHorizontal.value 
          ? containerRef.value.offsetWidth 
          : containerRef.value.offsetHeight
        contentSize.value = isHorizontal.value 
          ? contentRef.value.offsetWidth 
          : contentRef.value.offsetHeight
      }
    }
    
    // 更新transform样式
    const updateTransform = (position: number) => {
      currentPosition = position
      transformStyle.value = isHorizontal.value 
        ? `translateX(${position}px)`
        : `translateY(${position}px)`
    }

    // 计算样式 - 优化计算属性
    const containerStyle = computed(() => ({
      '--sp-scroll-text-direction': props.direction,
      '--sp-scroll-text-speed': `${props.speed}px`,
      position: 'relative' as const,
      overflow: 'hidden' as const,
      width: '100%',
      height: '100%'
    }))

    const contentStyle = computed(() => ({
      position: 'absolute' as const,
      top: 0,
      left: 0,
      transform: transformStyle.value,
      whiteSpace: isHorizontal.value ? 'nowrap' as const : 'normal' as const,
      transition: 'none'
    }))

    // 动画逻辑
    const startAnimation = async () => {
      if (!containerRef.value || !contentRef.value || actualPaused.value) {
        return
      }

      // 停止当前动画
      stopAnimation()

      // 更新DOM尺寸
      updateSizes()

      // 如果有延迟，等待延迟完成
      if (props.delay && props.delay > 0) {
        await runOpenDelay()
        if (actualPaused.value) return // 延迟期间可能被暂停
      }

      executeAnimation()
    }

    const executeAnimation = () => {
      if (!containerRef.value || !contentRef.value || actualPaused.value) {
        return
      }

      const content = contentRef.value

      // 使用缓存的尺寸，避免重复DOM查询
      if (contentSize.value === 0 || containerSize.value === 0) {
        return
      }

      const startPos = getStartPosition()
      const endPos = getEndPosition()

      const distance = Math.abs(endPos - startPos)
      const duration = (distance / props.speed) * 1000

      // 设置起始位置并更新样式
      updateTransform(startPos)
      
      // 使用 Web Animations API 进行动画
      const keyframes = [
        { transform: isHorizontal.value ? `translateX(${startPos}px)` : `translateY(${startPos}px)` },
        { transform: isHorizontal.value ? `translateX(${endPos}px)` : `translateY(${endPos}px)` }
      ]
      
      currentAnimation = animate(content, keyframes, {
        duration,
        easing: 'linear',
        fill: 'forwards'
      })
      
      isAnimating.value = true
      
      currentAnimation.finished.then(() => {
        isAnimating.value = false
        updateTransform(endPos)
        props.onComplete?.()
        
        // 如果是循环模式，使用RAF重新开始
        if (props.loop && !actualPaused.value) {
          requestAnimationFrame(() => {
            startAnimation()
          })
        }
      }).catch(() => {
        // 动画被取消
        isAnimating.value = false
      })
    }

    const stopAnimation = () => {
      if (currentAnimation) {
        // 检查是否是真正的 Animation 对象
        if ('cancel' in currentAnimation) {
          currentAnimation.cancel()
        }
        currentAnimation = null
      }
      clearDelay()
      isAnimating.value = false
    }

    const resetPosition = () => {
      if (!containerRef.value || !contentRef.value) return

      // 更新尺寸缓存
      updateSizes()

      // 使用辅助函数计算起始位置
      const resetPos = getStartPosition()

      updateTransform(resetPos)
    }

    // 重新开始动画（使用防抖）
    const restartAnimation = () => {
      debouncedRestart(() => {
        stopAnimation()
        resetPosition()
        if (!actualPaused.value) {
          nextTick(() => {
            startAnimation()
          })
        }
      })
    }

    // 监听实际暂停状态
    watch(actualPaused, (newPaused) => {
      if (newPaused) {
        if (currentAnimation && 'pause' in currentAnimation) {
          currentAnimation.pause()
        }
      } else {
        if (currentAnimation && 'play' in currentAnimation) {
          currentAnimation.play()
        } else {
          startAnimation()
        }
      }
    })

    // 监听其他属性变化，使用防抖重新开始动画
    watch([() => props.speed, () => props.direction, () => props.loop, () => props.delay], restartAnimation)

    onMounted(() => {
      requestAnimationFrame(() => {
        resetPosition()
        if (!actualPaused.value) {
          startAnimation()
        }
      })
    })

    onUnmounted(() => {
      stopAnimation()
    })

    return () => (
      <div
        ref={(el) => {
          containerRef.value = el as HTMLElement
          resizeRef.value = el as HTMLElement
        }}
        class={[
          'sp-scroll-text',
          `sp-scroll-text--${props.direction}`,
          themeClasses.value,
          {
            'sp-scroll-text--paused': actualPaused.value,
            'sp-scroll-text--animating': isAnimating.value,
            'sp-scroll-text--hovered': isHovered.value
          }
        ]}
        style={containerStyle.value}
        onMouseenter={props.pauseOnHover ? () => { isHovered.value = true } : undefined}
        onMouseleave={props.pauseOnHover ? () => { isHovered.value = false } : undefined}
      >
        <div
          ref={contentRef}
          class="sp-scroll-text__content"
          style={contentStyle.value}
        >
          {slots.default?.()}
        </div>
      </div>
    )
  }
})

export type SPScrollTextInstance = InstanceType<typeof SPScrollText>