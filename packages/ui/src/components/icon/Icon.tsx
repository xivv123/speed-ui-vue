import { computed, defineComponent } from 'vue'
import { useIcon } from '@/composables/icons'
import type { IconValue } from '@/composables/icons'

interface IconProps {
  // 图标名称或组件（支持 IconValue 类型）
  name?: IconValue
  icon?: any
  // 图标大小
  size?: string | number
  // 图标颜色
  color?: string
  // 是否可点击
  clickable?: boolean
  // 是否禁用
  disabled?: boolean
  // 自定义类名
  class?: string | string[] | Record<string, boolean>
  // 自定义样式
  style?: string | Record<string, any>
}

export default defineComponent({
  name: 'SpIcon',
  inheritAttrs: false,
  props: {
    // 图标名称（支持别名，如 $close）或 IconValue 类型
    name: {
      type: [String, Array] as any,
      default: undefined,
    },
    // 直接传递图标组件（用户从 xicon 导入的组件）
    icon: {
      type: [Object, Function],
      default: undefined,
    },
    size: {
      type: [String, Number],
      default: 16,
    },
    color: String,
    clickable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    class: [String, Array, Object],
    style: [String, Object],
  },
  emits: ['click'],
  setup(props: IconProps, { attrs, emit }: any) {
    // 使用图标系统解析图标
    const { iconData } = useIcon(() => props.name || '')

    // 获取图标组件
    const iconComponent = computed(() => {
      // 1. 优先使用直接传入的 icon 组件
      if (props.icon) {
        return props.icon
      }

      // 2. 使用 name 从别名系统解析
      if (props.name) {
        // 如果 name 是字符串
        if (typeof props.name === 'string') {
          // 如果是以 $ 开头的别名，使用图标系统
          if (props.name.startsWith('$')) {
            if (iconData.value && iconData.value.component) {
              return iconData.value.component
            }
            console.warn(`图标别名 "${props.name}" 未找到`)
            return null
          }

          // 对于普通名称（如 "close", "checkmarkCircle"），转换为别名格式
          const aliasName = `$${props.name}`
          const { iconData: aliasIconData } = useIcon(() => aliasName)
          if (aliasIconData.value && aliasIconData.value.component) {
            return aliasIconData.value.component
          }

          console.warn(
            `图标 "${props.name}" 未找到，请确保已在 svgIconAliases 中定义或直接传递图标组件`
          )
          return null
        }

        // 如果 name 是 IconValue 类型（数组或其他），直接使用 iconData
        if (iconData.value && iconData.value.component) {
          return iconData.value.component
        }

        console.warn(`图标值解析失败`)
        return null
      }

      console.warn('Icon: 必须提供 name 或 icon 属性')
      return null
    })

    // 获取图标数据（用于 SVG 图标）
    const iconValue = computed(() => {
      // 如果是直接传入的组件，返回 undefined（让组件自己处理）
      if (props.icon) {
        return undefined
      }

      // 如果是通过 name 解析的，返回 iconData
      if (props.name) {
        // 字符串类型
        if (typeof props.name === 'string') {
          const nameStr = props.name as string
          if (nameStr.startsWith('$')) {
            return iconData.value?.icon
          }
          // 对于普通名称，也要获取对应的 iconData
          const aliasName = `$${nameStr}`
          const { iconData: aliasIconData } = useIcon(() => aliasName)
          return aliasIconData.value?.icon
        }

        // IconValue 类型
        return iconData.value?.icon
      }

      return undefined
    })

    // 计算图标类名
    const iconClass = computed(() => {
      const classes = ['sp-icon']

      if (props.clickable) classes.push('sp-icon--clickable')
      if (props.disabled) classes.push('sp-icon--disabled')
      if (props.class) {
        if (typeof props.class === 'string') {
          classes.push(props.class)
        } else if (Array.isArray(props.class)) {
          classes.push(...props.class)
        } else {
          Object.entries(props.class).forEach(([key, value]) => {
            if (value) classes.push(key)
          })
        }
      }

      return classes
    })

    // 计算图标样式
    const iconStyle = computed(() => {
      const styles: Record<string, any> = {
        width: typeof props.size === 'number' ? `${props.size}px` : props.size,
        height: typeof props.size === 'number' ? `${props.size}px` : props.size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
      }

      if (props.color) {
        styles.color = props.color
      }

      if (props.clickable && !props.disabled) {
        styles.cursor = 'pointer'
      }

      if (props.disabled) {
        styles.opacity = 0.5
        styles.cursor = 'not-allowed'
      }

      // 合并用户自定义样式
      if (props.style) {
        if (typeof props.style === 'string') {
          return [styles, props.style]
        } else {
          Object.assign(styles, props.style)
        }
      }

      return styles
    })

    // 处理点击事件
    const handleClick = (event: MouseEvent) => {
      if (props.disabled) return
      if (props.clickable) {
        // 阻止事件冒泡，避免影响输入框焦点
        event.preventDefault()
        event.stopPropagation()
        emit('click', event)
      }
    }

    return () => {
      const IconComponent = iconComponent.value
      if (!IconComponent) return null

      return (
        <IconComponent
          class={iconClass.value}
          style={iconStyle.value}
          icon={iconValue.value}
          tag="span"
          {...attrs}
          onClick={handleClick}
        />
      )
    }
  },
})
