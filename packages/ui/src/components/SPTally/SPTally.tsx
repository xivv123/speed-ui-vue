// Styles
import './SPTally.scss'

// Components
import { makeSPTallyProps } from './props'

// Utilities
import { computed, ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { genericComponent, useRender } from '@/utils'

export type SPTallySlot = {
  counter: string
  max: string | number | undefined
  value: string | number | undefined
}

type SPTallySlots = {
  default: SPTallySlot
}

export const SPTally = genericComponent<SPTallySlots>()({
  name: 'SPTally',

  functional: true,

  props: makeSPTallyProps(),

  setup(props, { slots }) {
    const counter = computed(() => {
      return props.max ? `${props.value} / ${props.max}` : String(props.value)
    })

    const isError = computed(() => {
      const hasError =
        props.max &&
        !props.disabled &&
        parseFloat(String(props.value)) > parseFloat(String(props.max))
      return hasError
    })

    // 抖动状态和控制
    const isShaking = ref(false)
    let shakeTimeoutId: number | null = null

    // 触发抖动的函数
    const triggerShake = () => {
      // 如果已经在抖动中，先重置
      if (shakeTimeoutId) {
        clearTimeout(shakeTimeoutId)
        isShaking.value = false
      }
      
      // 使用nextTick确保DOM更新，然后触发新的抖动
      nextTick(() => {
        isShaking.value = true
        shakeTimeoutId = window.setTimeout(() => {
          isShaking.value = false
          shakeTimeoutId = null
        }, 500)
      })
    }

    // 只有启用shaking时才监听错误状态变化
    if (props.shaking) {
      watch(isError, (newError) => {
        if (newError) {
          triggerShake()
        }
      })
    }

    useRender(() => (
      <div
        v-show={props.active}
        class={[
          'sp-tally',
          {
            'sp-tally--error': isError.value,
            'sp-tally--shake': props.shaking && isShaking.value,
          },
          props.class,
        ]}
        style={props.style}
      >
        {slots.default
          ? slots.default({
              counter: counter.value,
              max: props.max,
              value: props.value,
            })
          : counter.value}
      </div>
    ))

    // 组件卸载时清理定时器，防止内存泄漏
    onBeforeUnmount(() => {
      if (shakeTimeoutId) {
        clearTimeout(shakeTimeoutId)
        shakeTimeoutId = null
      }
    })

    return {}
  },
})

export type SPTally = InstanceType<typeof SPTally>
