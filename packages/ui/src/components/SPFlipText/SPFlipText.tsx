// Styles
import './SPFlipText.scss'

// Vue
import { defineComponent, shallowRef, ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

// Composables & Utils
import { useTheme } from '@/composables/theme'
import { useDelay } from '@/composables/delay'
import { animate } from '@/utils/animation'

// Props
import { makeSPFlipTextProps } from './props'

export const SPFlipText = defineComponent({
  name: 'SPFlipText',
  props: makeSPFlipTextProps(),
  setup(props, { slots, expose }) {
    const { themeClasses } = useTheme()

    const rootRef = shallowRef<HTMLElement>()
    const innerRef = shallowRef<HTMLElement>()
    const isFlipping = ref(false)
    // 当前立方体旋转角度（以 90° 为单位前进）
    const currentAngleX = ref(0)
    const currentAngleY = ref(0)
    const isMounted = ref(false)

    const axis = computed(() => (props.direction === 'flip-left' || props.direction === 'flip-right') ? 'Y' : 'X')

    // 根据当前角度计算处于正面的面
    const activeFace = computed(() => {
      const ax = ((currentAngleX.value % 360) + 360) % 360
      const ay = ((currentAngleY.value % 360) + 360) % 360
      // X 轴旋转：-90 对应 top，+90 对应 bottom
      if (ax === 270) return 'top'
      if (ax === 90) return 'bottom'
      // Y 轴旋转：+90 对应 left，-90(=270) 对应 right
      if (ay === 0) return 'front'
      if (ay === 180) return 'back'
      if (ay === 90) return 'left'
      if (ay === 270) return 'right'
      // 默认返回 front
      return 'front'
    })

    const rootClasses = computed(() => [
      'sp-flip-text',
      `sp-flip-text--${props.direction}`,
      { 'sp-flip-text--flipping': isFlipping.value, 'sp-flip-text--paused': props.paused },
      themeClasses.value,
      props.class,
    ])

    const rootStyles = computed(() => ([props.style]))

    // Delay composable for start delay per flip
    const { runOpenDelay, clearDelay } = useDelay({ openDelay: props.delay })

    // Auto loop timer
    let autoTimer: number | null = null

    const canFlip = () => !props.paused && !isFlipping.value && !!innerRef.value

    const doFlipAnimation = async () => {
      if (!canFlip()) return
      isFlipping.value = true
      props.onFlipStart?.()

      // Wait optional delay before each flip
      if (props.delay && props.delay > 0) {
        await runOpenDelay()
        if (!canFlip()) { isFlipping.value = false; return }
      }

      const el = innerRef.value!
      // 起始角度
      const fromX = currentAngleX.value
      const fromY = currentAngleY.value

      // 目标角度：按照方向增量旋转 90° 或 180°
      let toX = fromX
      let toY = fromY
      if (props.direction === 'flip-up') toX = fromX - 90
      else if (props.direction === 'flip-down') toX = fromX + 90
      else if (props.direction === 'flip-left') toY = fromY + 90
      else if (props.direction === 'flip-right') toY = fromY - 90
      else {
        // 兼容可能的 front/back 翻转（若 props.direction 为 'flip-front'/'flip-back'）
        toY = fromY + 180
      }

      const keyframes = [
        { transform: `rotateX(${fromX}deg) rotateY(${fromY}deg)` },
        { transform: `rotateX(${toX}deg) rotateY(${toY}deg)` },
      ]

      const animation = animate(el, keyframes, {
        duration: props.duration,
        easing: props.easing,
        fill: 'forwards',
      })

      try {
        await animation.finished
      } catch (_) {
        // canceled
      }

      // 保持最终角度，更新状态
      currentAngleX.value = toX
      currentAngleY.value = toY

      props.onFlipEnd?.()
      props.onFlipComplete?.()
      isFlipping.value = false
    }

    const flip = async () => {
      // Public method for manual trigger
      await doFlipAnimation()
    }

    expose({ flip })

    const setupAuto = () => {
      teardownAuto()
      if (props.trigger === 'auto') {
        // If loop=false, run one flip after delay; else run every interval
        const runOnce = async () => {
          await nextTick()
          await doFlipAnimation()
        }
        if (props.loop) {
          autoTimer = window.setInterval(() => {
            if (!props.paused && !isFlipping.value) {
              void doFlipAnimation()
            }
          }, Math.max(0, props.interval))
        } else {
          // single run after mount
          void runOnce()
        }
      }
    }

    const teardownAuto = () => {
      if (autoTimer) {
        clearInterval(autoTimer)
        autoTimer = null
      }
      clearDelay()
    }

    const onMouseEnter = () => {
      if (props.trigger === 'hover' && !props.paused) {
        void doFlipAnimation()
      }
    }

    const onClick = () => {
      if (props.trigger === 'click' && !props.paused) {
        void doFlipAnimation()
      }
    }

    // React to control props
    watch(() => props.paused, (paused) => {
      if (paused) {
        teardownAuto()
      } else if (isMounted.value) {
        setupAuto()
      }
    })

    watch(() => [props.direction, props.duration, props.easing, props.interval, props.loop, props.trigger] as const, () => {
      if (!isMounted.value) return
      setupAuto()
    })

    onMounted(() => {
      isMounted.value = true
      setupAuto()
    })

    onUnmounted(() => {
      teardownAuto()
    })

    return () => (
      <div
        ref={rootRef}
        class={rootClasses.value}
        style={rootStyles.value}
        onMouseenter={onMouseEnter}
        onClick={onClick}
      >
        <div ref={innerRef} class={['sp-flip-text__inner']} style={{ transform: `rotateX(${currentAngleX.value}deg) rotateY(${currentAngleY.value}deg)` }}>
          {/* 始终渲染前后两面 */}
          <div class={['sp-flip-text__face', 'sp-flip-text__face--front', { 'sp-flip-text__face--active': activeFace.value === 'front' }]}>
            <div class="sp-flip-text__content">
              { slots.front?.() ?? slots.default?.() }
            </div>
          </div>
          <div class={['sp-flip-text__face', 'sp-flip-text__face--back', { 'sp-flip-text__face--active': activeFace.value === 'back' }]}>
            <div class="sp-flip-text__content">
              { slots.back?.() ?? slots.default?.() }
            </div>
          </div>

          {/* 根据当前翻转轴仅渲染两个侧面，保证总计四个面 */}
          {axis.value === 'X' ? (
            <>
              <div class={['sp-flip-text__face', 'sp-flip-text__face--top', { 'sp-flip-text__face--active': activeFace.value === 'top' }]}>
                <div class="sp-flip-text__content">
                  { slots.top?.() }
                </div>
              </div>
              <div class={['sp-flip-text__face', 'sp-flip-text__face--bottom', { 'sp-flip-text__face--active': activeFace.value === 'bottom' }]}>
                <div class="sp-flip-text__content">
                  { slots.bottom?.() }
                </div>
              </div>
            </>
          ) : (
            <>
              <div class={['sp-flip-text__face', 'sp-flip-text__face--left', { 'sp-flip-text__face--active': activeFace.value === 'left' }]}>
                <div class="sp-flip-text__content">
                  { slots.left?.() }
                </div>
              </div>
              <div class={['sp-flip-text__face', 'sp-flip-text__face--right', { 'sp-flip-text__face--active': activeFace.value === 'right' }]}>
                <div class="sp-flip-text__content">
                  { slots.right?.() }
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    )
  },
})

export type SPFlipTextInstance = InstanceType<typeof SPFlipText>