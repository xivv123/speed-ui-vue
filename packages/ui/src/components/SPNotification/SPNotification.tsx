// Styles
import './SPNotification.sass'

// Components
import { SPBtn } from '@/components/SPBtn'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { useTeleport } from '@/composables/teleport'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Utilities
import { computed, onMounted, onUnmounted, ref, Teleport, watch } from 'vue'
import {
  convertToUnit,
  genericComponent,
  propsFactory,
  useRender,
} from '@/utils'

// Types
import type { PropType } from 'vue'
import type {
  SPNotificationProps,
  NotificationType,
  NotificationPosition,
} from './types'

const makeSPNotificationProps = propsFactory(
  {
    id: {
      type: String,
      required: true,
    },
    title: String,
    message: String,
    type: {
      type: String as PropType<NotificationType>,
      default: 'info',
    },
    position: {
      type: String as PropType<NotificationPosition>,
      default: 'top-right',
    },
    duration: {
      type: Number,
      default: 4500,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    offset: {
      type: Number,
      default: 0,
    },
    onClick: Function as PropType<() => void>,
    onClose: Function as PropType<() => void>,
    dangerouslyUseHTMLString: Boolean,
    customClass: String,
    icon: String,
    visible: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: Number,
      default: 2000,
    },
    color: {
      type: String,
      default: 'info',
    },
    ...makeComponentProps(),
    ...makeThemeProps(),
    ...makeTransitionProps({
      transition: {
        component: {
          name: 'sp-notification',
        },
      },
    }),
  },
  'SPNotification'
)

export const SPNotification = genericComponent()({
  name: 'SPNotification',

  props: makeSPNotificationProps(),

  emits: {
    'update:visible': (visible: boolean) => true,
    close: () => true,
    click: () => true,
  },

  setup(props, { emit }) {
    const { themeClasses } = provideTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } =
      useBackgroundColor(computed(() => props.color))

    const timer = ref<NodeJS.Timeout>()
    // 简化状态管理 - 默认显示，根据props.visible更新
    const isVisible = ref(props.visible)

    // 计算位置相关的样式
    const positionClasses = computed(() => {
      const [vertical, horizontal] = props.position.split('-')
      return {
        [`sp-notification--${vertical}`]: true,
        [`sp-notification--${horizontal}`]: true,
      }
    })

    const positionStyles = computed(() => {
      const [vertical, horizontal] = props.position.split('-')
      const offset = convertToUnit(props.offset)

      return {
        zIndex: props.zIndex,
        [vertical]: offset,
        [horizontal]: '16px',
      }
    })

    // 获取通知类型对应的图标 - 使用简单的Unicode字符
    const typeIcon = computed(() => {
      if (props.icon) return props.icon

      const iconMap = {
        success: '✅',
        warning: '⚠️',
        info: 'ℹ️',
        error: '❌',
      }

      return iconMap[props.type] || iconMap.info
    })

    // 自动关闭计时器
    function startTimer() {
      if (props.duration > 0) {
        timer.value = setTimeout(() => {
          close()
        }, props.duration)
      }
    }

    function clearTimer() {
      if (timer.value) {
        clearTimeout(timer.value)
        timer.value = undefined
      }
    }

    function close() {
      isVisible.value = false
      emit('update:visible', false)
      emit('close')
    }

    function handleClick() {
      emit('click')
      props.onClick?.()
    }

    function handleMouseenter() {
      clearTimer()
    }

    function handleMouseleave() {
      startTimer()
    }

    // 监听 visible 变化
    watch(
      () => props.visible,
      val => {
        isVisible.value = val
        if (val) {
          startTimer()
        } else {
          clearTimer()
        }
      },
      { immediate: true }
    )

    // 确保初始化时正确设置
    onMounted(() => {
      if (props.visible) {
        isVisible.value = true
        startTimer()
      }
    })

    onUnmounted(() => {
      clearTimer()
    })

    useRender(() => {
      if (!isVisible.value) {
        return <></>
      }

      return (
        <div
          class={[
            'sp-notification',
            positionClasses.value,
            `sp-notification--${props.type}`,
            backgroundColorClasses.value,
            themeClasses.value,
            props.customClass,
            props.class,
          ]}
          style={[
            positionStyles.value,
            backgroundColorStyles.value,
            props.style,
            { pointerEvents: 'auto' }, // 覆盖容器的 pointer-events: none
          ]}
          onClick={handleClick}
          onMouseenter={handleMouseenter}
          onMouseleave={handleMouseleave}
        >
          <div class="sp-notification__icon">{typeIcon.value}</div>

          <div class="sp-notification__content">
            {props.title && (
              <div class="sp-notification__title">{props.title}</div>
            )}

            {props.message && (
              <div
                class="sp-notification__message"
                innerHTML={
                  props.dangerouslyUseHTMLString ? props.message : undefined
                }
              >
                {!props.dangerouslyUseHTMLString && props.message}
              </div>
            )}
          </div>

          {props.showClose && (
            <div class="sp-notification__close">
              <SPBtn
                variant="text"
                size="small"
                onClick={(e: Event) => {
                  e.stopPropagation()
                  close()
                }}
              >
                ✕
              </SPBtn>
            </div>
          )}
        </div>
      )
    })

    return {
      close,
    }
  },
})

export type SPNotification = InstanceType<typeof SPNotification>
