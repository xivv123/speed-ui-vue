// Styles

// Components
import { SPTextField } from '../SPTextField/SPTextField'

// Utilities
import { ref, nextTick } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/utils'

export const makeSPInputPwdProps = propsFactory(
  {
    modelValue: String,
    appendIcon: Boolean,
    appendInnerIcon: Boolean,
    prependIcon: Boolean,
    prependInnerIcon: Boolean,
  },
  'SPInputPwd'
)

export const SPInputPwd = genericComponent()({
  name: 'SPInputPwd',

  inheritAttrs: false,

  props: makeSPInputPwdProps(),

  emits: {
    'update:modelValue': (value: string) => true,
    // pwd: (isVisible: boolean) => true,
  },

  setup(props, { attrs, emit }) {
    // 内部控制密码可见性状态
    const isVisible = ref(false)

    // 切换密码可见性并发出 pwd 事件
    const toggleVisibility = (event?: Event) => {
      event?.preventDefault()
      event?.stopPropagation()
      isVisible.value = !isVisible.value
      // emit('pwd', isVisible.value)
    }

    // 根据传入的属性确定眼睛图标的位置
    const getIconPosition = () => {
      if (props.appendIcon) return 'append'
      if (props.appendInnerIcon) return 'appendInner'
      if (props.prependIcon) return 'prepend'
      if (props.prependInnerIcon) return 'prependInner'
      // 默认使用 append 位置
      return 'append'
    }

    // 根据图标位置生成对应的属性
    const getIconProps = () => {
      const position = getIconPosition()
      const iconName = isVisible.value ? 'EyeOff' : 'Eye'
      const props: any = {}

      switch (position) {
        case 'append':
          props.appendIcon = iconName
          props['onClick:append'] = toggleVisibility
          break
        case 'appendInner':
          props.appendInnerIcon = iconName
          props['onClick:appendInner'] = toggleVisibility
          break
        case 'prepend':
          props.prependIcon = iconName
          props['onClick:prepend'] = toggleVisibility
          break
        case 'prependInner':
          props.prependInnerIcon = iconName
          props['onClick:prependInner'] = toggleVisibility
          break
      }

      return props
    }

    useRender(() => (
      <SPTextField
        {...attrs}
        {...getIconProps()}
        modelValue={props.modelValue}
        type={isVisible.value ? 'text' : 'password'}
        onUpdate:modelValue={(value: string) =>
          emit('update:modelValue', value)
        }
      />
    ))

    return {}
  },
})

export type SPInputPwd = InstanceType<typeof SPInputPwd>
