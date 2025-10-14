import './SPThumb.scss'

import { SPDefaultsProvider } from '../SPDefaultsProvider'
import SpIcon from '../icon/Icon'
import { LoaderSlot } from '@/composables/loader'
import { genericComponent, propsFactory, useRender } from '@/utils'
import { makeComponentProps } from '@/composables/component'
import { ref, computed } from 'vue'
import type { LoaderSlotProps } from '@/composables/loader'

export type SPThumbSlots = {
  default: any
  loader: LoaderSlotProps
}

export const makeSPThumbProps = propsFactory(
  {
    // 基础属性
    ...makeComponentProps(),
    
    // 图标相关
    icon: [String, Function, Object] as any,
    
    // 文字相关
    text: String,
    checkedText: String,
    uncheckedText: String,
    
    // 状态相关
    loading: {
      type: [Boolean, String],
      default: false,
    },
    checked: Boolean,
    filled: Boolean,
    
    // 样式相关
    inset: Boolean,
    backgroundColorClasses: Array,
    backgroundColorStyles: Object,
    
    // 验证状态
    isValid: {
      type: [Boolean, null] as any,
      default: null,
    },
  },
  'SPThumb'
)

export const SPThumb = genericComponent<SPThumbSlots>()({
  name: 'SPThumb',

  props: makeSPThumbProps(),

  inheritAttrs: false,

  setup(props, { attrs, slots, expose }) {
    const root = ref<HTMLElement>()
    expose({ el: root })

    // 计算当前应该显示的文字
    const displayText = computed(() => {
      if (props.text) {
        return props.text
      }
      if (props.checked) {
        return props.checkedText || ''
      } else {
        return props.uncheckedText || ''
      }
    })

    // 计算加载器颜色
    const loaderColor = computed(() => {
      return typeof props.loading === 'string' && props.loading !== ''
        ? props.loading
        : undefined
    })

    useRender(() => {
      return (
        <div 
          ref={root} 
          class={[
            'sp-thumb',
            {
              'sp-thumb--filled': props.filled || props.icon || props.loading,
            },
            props.inset ? undefined : props.backgroundColorClasses,
            props.class
          ]}
          style={[
            props.inset ? undefined : props.backgroundColorStyles,
            props.style
          ]}
          {...attrs}
        >
          {slots.default ? (
            <SPDefaultsProvider
              defaults={{
                SpIcon: {
                  name: props.icon,
                  size: 'x-small',
                },
              }}
            >
              {slots.default({ 
                icon: props.icon,
                text: displayText.value,
                loading: props.loading,
                checked: props.checked 
              })}
            </SPDefaultsProvider>
          ) : (
            // 默认内容渲染逻辑
            <>
              {!props.loading ? (
                <>
                  {/* 显示图标 */}
                  {props.icon && !displayText.value && (
                    <SpIcon
                      key={String(props.icon)}
                      name={String(props.icon)}
                    />
                  )}
                  {/* 显示文字 */}
                  {displayText.value && (
                    <span class="sp-thumb__text">
                      {displayText.value}
                    </span>
                  )}
                </>
              ) : (
                <LoaderSlot
                  name="sp-thumb"
                  active
                  color={
                    props.isValid === false
                      ? undefined
                      : loaderColor.value
                  }
                >
                  {(slotProps: LoaderSlotProps) =>
                    slots.loader
                      ? slots.loader(slotProps)
                      : null
                  }
                </LoaderSlot>
              )}
            </>
          )}
        </div>
      )
    })

    return {}
  },
})

export type SPThumb = InstanceType<typeof SPThumb>

