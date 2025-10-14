// Styles
import './style/SPLoading.scss'

// Components
import { SPOverlay } from '../SPOverlay/SPOverlay'
import { SPProgCir } from '../SPProgCir/SPProgCir'

// Composables
import { useTextColor } from '@/composables/color'
import { provideTheme } from '@/composables/theme'

// Utilities
import { computed } from 'vue'
import { genericComponent, useRender } from '@/utils'

// Local
import { makeSPLoadingProps } from './props'
import type { SPLoadingSlots } from './types'

/**
 * SPLoading - 加载组件实现
 */
export const SPLoading = genericComponent<SPLoadingSlots>()({
  name: 'SPLoading',

  props: makeSPLoadingProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup(props, { slots, emit }) {
    // 使用主题
    const { themeClasses } = provideTheme(props)

    // 文本颜色
    const { textColorClasses, textColorStyles } = useTextColor(
      () => props.color
    )

    // 计算进度值
    const normalizedProgress = computed(() => {
      if (props.indeterminate) return 0
      return Math.max(0, Math.min(100, Number(props.progress)))
    })

    // 处理模型值变化
    const handleModelValue = (value: boolean) => {
      emit('update:modelValue', value)
    }

    // 渲染组件
    useRender(() => (
      <SPOverlay
        modelValue={props.modelValue}
        onUpdate:modelValue={handleModelValue}
        absolute={props.absolute}
        contained={props.contained}
        persistent={props.persistent}
        disabled={props.disabled}
        scrim={props.scrim}
        opacity={props.opacity}
        zIndex={props.zIndex}
        noClickAnimation={props.noClickAnimation}
        class={['sp-loading', themeClasses.value, props.class]}
        style={props.style}
        contentClass="sp-loading__content"
      >
        {{
          default: ({ isActive }: { isActive: boolean }) => (
            <div class="sp-loading__wrapper">
              {slots.default ? (
                slots.default({ isActive, progress: normalizedProgress.value })
              ) : (
                <>
                  <SPProgCir
                    modelValue={normalizedProgress.value}
                    indeterminate={props.indeterminate}
                    color={props.color}
                    bgColor={props.bgColor}
                    size={props.size}
                    width={props.width}
                    rotate={props.rotate}
                    class={['sp-loading__progress', textColorClasses.value]}
                    style={textColorStyles.value}
                  />
                  {(props.text || slots.text) && (
                    <div class="sp-loading__text">
                      {slots.text
                        ? slots.text({
                            isActive,
                            progress: normalizedProgress.value,
                          })
                        : props.text}
                    </div>
                  )}
                </>
              )}
            </div>
          ),
        }}
      </SPOverlay>
    ))

    return {}
  },
})

/**
 * SPLoading组件的类型定义
 */
export type SPLoading = InstanceType<typeof SPLoading>
