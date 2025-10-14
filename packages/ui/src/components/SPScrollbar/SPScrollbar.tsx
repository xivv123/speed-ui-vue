// Styles
import './SPScrollbar.scss'

// Composables
import { makeComponentProps } from '../../composables/component'
import { makeTagProps } from '../../composables/tag'
import { makeThemeProps, provideTheme } from '../../composables/theme'
import { useResizeObserver } from '../../composables/resizeObserver'
import { useRtl } from '../../composables/locale'

// Utilities
import { computed, nextTick, onMounted, onUpdated, ref, watch } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '../../utils'

// Types
import type { PropType, CSSProperties } from 'vue'

export type ScrollbarDirection = 'top' | 'bottom' | 'left' | 'right'

export const makeSPScrollbarProps = propsFactory(
  {
    height: [String, Number],
    maxHeight: [String, Number],
    native: {
      type: Boolean,
      default: false,
    },
    wrapStyle: [String, Object] as PropType<string | CSSProperties>,
    wrapClass: String,
    viewStyle: [String, Object] as PropType<string | CSSProperties>,
    viewClass: String,
    always: {
      type: Boolean,
      default: false,
    },
    distance: {
      type: Number,
      default: 0,
    },

    ...makeComponentProps(),
    ...makeTagProps({ tag: 'div' }),
    ...makeThemeProps(),
  },
  'SPScrollbar'
)

export const SPScrollbar = genericComponent()({
  name: 'SPScrollbar',

  props: makeSPScrollbarProps(),

  emits: {
    scroll: (evt: { scrollTop: number; scrollLeft: number }) => true,
    'end-reached': (direction: ScrollbarDirection) => true,
  },

  setup(props, { emit, slots, expose }) {
    const { themeClasses } = provideTheme(props)
    const { isRtl } = useRtl()

    const wrapRef = ref<HTMLElement>()
    const viewRef = ref<HTMLElement>()
    const verticalBarRef = ref<HTMLElement>()
    const horizontalBarRef = ref<HTMLElement>()
    
    // 滚动条状态
    const verticalSize = ref(0)
    const horizontalSize = ref(0) 
    const verticalOffset = ref(0)
    const horizontalOffset = ref(0)
    const isDragging = ref(false)
    
    const style = computed(() => {
      const styleObj: CSSProperties = {}
      if (props.height) styleObj.height = convertToUnit(props.height)
      if (props.maxHeight) styleObj.maxHeight = convertToUnit(props.maxHeight)
      return styleObj
    })

    const wrapKls = computed(() => [
      props.wrapClass,
      'sp-scrollbar__wrap'
    ])

    const wrapStyle = computed<CSSProperties>(() => {
      const styleObj: CSSProperties = {}
      if (typeof props.wrapStyle === 'string') {
        Object.assign(styleObj, { cssText: props.wrapStyle })
      } else {
        Object.assign(styleObj, props.wrapStyle)
      }
      return styleObj
    })

    const viewKls = computed(() => [
      props.viewClass,
      'sp-scrollbar__view',
    ])

    const viewStyle = computed<CSSProperties>(() => {
      const styleObj: CSSProperties = {}
      if (typeof props.viewStyle === 'string') {
        Object.assign(styleObj, { cssText: props.viewStyle })
      } else {
        Object.assign(styleObj, props.viewStyle)
      }
      return styleObj
    })

    // 滚动条样式计算
    const verticalBarStyle = computed(() => ({
      height: verticalSize.value ? `${verticalSize.value}%` : '0',
      transform: `translateY(${verticalOffset.value}px)`,
    }))
    
    const horizontalBarStyle = computed(() => ({
      width: horizontalSize.value ? `${horizontalSize.value}%` : '0', 
      transform: `translateX(${horizontalOffset.value}px)`,
    }))
    
    // 更新滚动条大小和位置
    const updateScrollbar = () => {
      if (!wrapRef.value) return
      
      const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = wrapRef.value
      
      // 垂直滚动条
      if (scrollHeight > clientHeight) {
        verticalSize.value = (clientHeight / scrollHeight) * 100
        verticalOffset.value = (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - (clientHeight * verticalSize.value / 100))
      } else {
        verticalSize.value = 0
      }
      
      // 水平滚动条
      if (scrollWidth > clientWidth) {
        horizontalSize.value = (clientWidth / scrollWidth) * 100
        horizontalOffset.value = (scrollLeft / (scrollWidth - clientWidth)) * (clientWidth - (clientWidth * horizontalSize.value / 100))
      } else {
        horizontalSize.value = 0  
      }
    }

    // 拖拽滚动条事件（触摸）
    const handleThumbTouchStart = (e: TouchEvent, direction: 'vertical' | 'horizontal') => {
      if (!wrapRef.value) return
      e.preventDefault()
      e.stopPropagation()

      isDragging.value = true
      const startPos = direction === 'vertical' ? e.touches[0].clientY : e.touches[0].clientX
      const startScroll = direction === 'vertical' ? wrapRef.value.scrollTop : wrapRef.value.scrollLeft

      const handleTouchMove = (moveEvent: TouchEvent) => {
        if (!wrapRef.value || !isDragging.value) return
        const currentPos = direction === 'vertical' ? moveEvent.touches[0].clientY : moveEvent.touches[0].clientX
        const diff = currentPos - startPos
        if (direction === 'vertical') {
          const { scrollHeight, clientHeight } = wrapRef.value
          const scrollRatio = diff / clientHeight
          wrapRef.value.scrollTop = startScroll + (scrollRatio * (scrollHeight - clientHeight))
        } else {
          const { scrollWidth, clientWidth } = wrapRef.value
          const scrollRatio = diff / clientWidth
          const delta = scrollRatio * (scrollWidth - clientWidth)
          wrapRef.value.scrollLeft = startScroll + (isRtl.value ? -delta : delta)
        }
      }

      const handleTouchEnd = () => {
        isDragging.value = false
        window.removeEventListener('touchmove', handleTouchMove, moveOptions)
        window.removeEventListener('touchend', handleTouchEnd)
      }

      const moveOptions: AddEventListenerOptions = { passive: true, capture: true }
      window.addEventListener('touchmove', handleTouchMove, moveOptions)
      window.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    // 键盘可达性：thumb 键盘控制滚动
    const handleThumbKeydown = (e: KeyboardEvent, direction: 'vertical' | 'horizontal') => {
      if (!wrapRef.value) return
      const wrap = wrapRef.value

      const viewport = direction === 'vertical' ? wrap.clientHeight : wrap.clientWidth
      const maxScroll = direction === 'vertical' ? wrap.scrollHeight - wrap.clientHeight : wrap.scrollWidth - wrap.clientWidth

      const arrowStep = Math.max(24, Math.floor(viewport * 0.1))
      const pageStep = Math.max(100, viewport - 40)

      let delta = 0
      switch (e.key) {
        case 'ArrowUp':
          if (direction === 'vertical') delta = -arrowStep
          break
        case 'ArrowDown':
          if (direction === 'vertical') delta = arrowStep
          break
        case 'ArrowLeft':
          if (direction === 'horizontal') delta = -arrowStep
          break
        case 'ArrowRight':
          if (direction === 'horizontal') delta = arrowStep
          break
        case 'PageUp':
          delta = -pageStep
          break
        case 'PageDown':
          delta = pageStep
          break
        case 'Home':
          if (direction === 'vertical') wrap.scrollTop = 0
          else wrap.scrollLeft = 0
          e.preventDefault()
          return
        case 'End':
          if (direction === 'vertical') wrap.scrollTop = maxScroll
          else wrap.scrollLeft = maxScroll
          e.preventDefault()
          return
        default:
          return
      }

      if (direction === 'horizontal' && isRtl.value) delta = -delta

      if (direction === 'vertical') wrap.scrollTop = Math.min(maxScroll, Math.max(0, wrap.scrollTop + delta))
      else wrap.scrollLeft = Math.min(maxScroll, Math.max(0, wrap.scrollLeft + delta))

      e.preventDefault()
    }

    // 使用 ResizeObserver 监听尺寸变化，自动更新滚动条
    const { resizeRef: wrapResizeRef } = useResizeObserver(() => updateScrollbar())
    const { resizeRef: viewResizeRef } = useResizeObserver(() => updateScrollbar())
    watch(
      () => wrapRef.value,
      el => {
        ;(wrapResizeRef as any).value = el as any
      },
      { flush: 'post', immediate: true }
    )
    watch(
      () => viewRef.value,
      el => {
        ;(viewResizeRef as any).value = el as any
      },
      { flush: 'post', immediate: true }
    )

    const handleScroll = () => {
      if (!wrapRef.value) return

      const wrapEl = wrapRef.value
      updateScrollbar()
      
      emit('scroll', {
        scrollTop: wrapEl.scrollTop,
        scrollLeft: wrapEl.scrollLeft,
      })

      // Check end reached
      if (props.distance >= 0) {
        const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = wrapEl
        
        if (scrollTop + clientHeight >= scrollHeight - props.distance) {
          emit('end-reached', 'bottom')
        }
        if (scrollTop <= props.distance) {
          emit('end-reached', 'top')
        }
        if (scrollLeft + clientWidth >= scrollWidth - props.distance) {
          emit('end-reached', 'right')
        }
        if (scrollLeft <= props.distance) {
          emit('end-reached', 'left')
        }
      }
    }

    const scrollTo = (options: ScrollToOptions | number, yCoord?: number) => {
      if (!wrapRef.value) return

      if (typeof options === 'number' && typeof yCoord === 'number') {
        wrapRef.value.scrollTo(options, yCoord)
      } else if (typeof options === 'object') {
        wrapRef.value.scrollTo(options)
      }
    }

    const setScrollTop = (value: number) => {
      if (!wrapRef.value) return
      wrapRef.value.scrollTop = value
    }

    const setScrollLeft = (value: number) => {
      if (!wrapRef.value) return
      wrapRef.value.scrollLeft = value
    }

    // 拖拽滚动条事件
    const handleThumbMouseDown = (e: MouseEvent, direction: 'vertical' | 'horizontal') => {
      e.preventDefault()
      e.stopPropagation()
      
      if (!wrapRef.value) return
      
      isDragging.value = true
      const startPos = direction === 'vertical' ? e.clientY : e.clientX
      const startScroll = direction === 'vertical' ? wrapRef.value.scrollTop : wrapRef.value.scrollLeft
      
      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!wrapRef.value || !isDragging.value) return
        
        const currentPos = direction === 'vertical' ? moveEvent.clientY : moveEvent.clientX
        const diff = currentPos - startPos
        
        if (direction === 'vertical') {
          const { scrollHeight, clientHeight } = wrapRef.value
          const scrollRatio = diff / clientHeight
          wrapRef.value.scrollTop = startScroll + (scrollRatio * (scrollHeight - clientHeight))
        } else {
          const { scrollWidth, clientWidth } = wrapRef.value
          const scrollRatio = diff / clientWidth 
          const delta = scrollRatio * (scrollWidth - clientWidth)
          wrapRef.value.scrollLeft = startScroll + (isRtl.value ? -delta : delta)
        }
      }
      
      const handleMouseUp = () => {
        isDragging.value = false
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
      
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
    
    // 组件挂载后初始化
    onMounted(() => {
      nextTick(() => {
        updateScrollbar()
      })
    })
    
    onUpdated(() => {
      updateScrollbar()
    })

    expose({
      wrapRef,
      update: updateScrollbar,
      scrollTo,
      setScrollTop,
      setScrollLeft,
      handleScroll,
    })

    useRender(() => {
      const Tag = props.tag as any

      return (
        <div
          class={[
            'sp-scrollbar',
            themeClasses.value,
            { 'sp-scrollbar--always-show': props.always },
            { 'sp-scrollbar--native': props.native },
          ]}
          style={style.value}
        >
          <div
            ref={wrapRef}
            class={wrapKls.value}
            style={wrapStyle.value}
            onScroll={handleScroll}
          >
            <Tag
              ref={viewRef}
              class={viewKls.value}
              style={viewStyle.value}
            >
              {slots.default?.()}
            </Tag>
          </div>
          
          {/* 垂直滚动条 */}
          {!props.native && verticalSize.value > 0 && (
            <div class="sp-scrollbar__bar sp-scrollbar__bar--vertical">
              <div
                ref={verticalBarRef}
                class="sp-scrollbar__thumb"
                style={verticalBarStyle.value}
                tabindex={0}
                role="scrollbar"
                aria-orientation="vertical"
                onMousedown={(e) => handleThumbMouseDown(e, 'vertical')}
                onTouchstart={(e) => handleThumbTouchStart(e, 'vertical')}
                onKeydown={(e) => handleThumbKeydown(e, 'vertical')}
              />
            </div>
          )}
          
          {/* 水平滚动条 */}
          {!props.native && horizontalSize.value > 0 && (
            <div class="sp-scrollbar__bar sp-scrollbar__bar--horizontal">
              <div
                ref={horizontalBarRef}
                class="sp-scrollbar__thumb"
                style={horizontalBarStyle.value}
                tabindex={0}
                role="scrollbar"
                aria-orientation="horizontal"
                onMousedown={(e) => handleThumbMouseDown(e, 'horizontal')}
                onTouchstart={(e) => handleThumbTouchStart(e, 'horizontal')}
                onKeydown={(e) => handleThumbKeydown(e, 'horizontal')}
              />
            </div>
          )}
        </div>
      )
    })
  },
})

export type SPScrollbarInstance = InstanceType<typeof SPScrollbar>
