// Components
import { SPDefaultsProvider } from '@/components/SPDefaultsProvider'
import { SPTag } from '@/components/SPTag'

// Utilities
import { ensureValidVNode, genericComponent, useRender } from '@/utils'

// Types
import type { PropType } from 'vue'
import type { ListItem } from '@/composables/list-items'

export const SPSelectSelection = genericComponent()({
  name: 'SPSelectSelection',

  props: {
    items: {
      type: Array as PropType<ListItem[]>,
      required: true,
    },
    multiple: Boolean,
    hasTags: Boolean,
    closableTags: Boolean,
    tagSlot: Function as PropType<
      ((args: { item: ListItem; index: number; props: Record<string, any> }) => any) | undefined
    >,
    selectionSlot: Function as PropType<
      ((args: { item: ListItem; index: number }) => any) | undefined
    >,
    onRemove: {
      type: Function as PropType<(item: ListItem) => void>,
      required: true,
    },
    // 新增：支持选中索引高亮
    selectionIndex: {
      type: Number,
      default: -1,
    },
    // 新增：支持自定义 class 前缀（如 sp-select、sp-combo、sp-cascader）
    classPrefix: {
      type: String,
      default: 'sp-select',
    },
    // 新增：支持自定义文本颜色样式
    textColorClasses: {
      type: [String, Array] as PropType<string | string[]>,
      default: undefined,
    },
    textColorStyles: {
      type: Object as PropType<Record<string, any>>,
      default: undefined,
    },
    // 新增：支持自定义显示文本（如级联路径）
    getDisplayText: {
      type: Function as PropType<(item: ListItem) => string>,
      default: undefined,
    },
    // 新增：支持点击事件
    onSelectionClick: {
      type: Function as PropType<(item: ListItem, e: Event) => void>,
      default: undefined,
    },
  },

  setup(props) {
    useRender(() => {
      return (
        <>
          {props.items.map((item, index) => {
            function onChipClose(e: Event) {
              e.stopPropagation()
              e.preventDefault()
              props.onRemove(item)
            }

            const slotProps = {
              'onClick:close': onChipClose,
              onKeydown(e: KeyboardEvent) {
                if (e.key !== 'Enter' && e.key !== ' ') return
                e.preventDefault()
                e.stopPropagation()
                onChipClose(e)
              },
              onMousedown(e: MouseEvent) {
                e.preventDefault()
                e.stopPropagation()
              },
              modelValue: true,
              'onUpdate:modelValue': undefined,
            }

            const hasSlot = props.hasTags ? !!props.tagSlot : !!props.selectionSlot
            const slotContent = hasSlot
              ? ensureValidVNode(
                  props.hasTags
                    ? props.tagSlot?.({ item, index, props: slotProps })
                    : props.selectionSlot?.({ item, index })
                )
              : undefined

            if (hasSlot && !slotContent) return undefined

            // 使用自定义 getDisplayText 或默认 item.title
            const displayText = props.getDisplayText ? props.getDisplayText(item) : item.title

            // 是否选中当前项
            const isSelected = index === props.selectionIndex

            return (
              <div
                key={item.value}
                class={[
                  `${props.classPrefix}__selection`,
                  isSelected && [
                    `${props.classPrefix}__selection--selected`,
                    props.textColorClasses,
                  ],
                ]}
                style={isSelected ? props.textColorStyles : undefined}
                onClick={(e: Event) => props.onSelectionClick?.(item, e)}
              >
                {props.hasTags ? (
                  !props.tagSlot ? (
                    <SPTag
                      key="tag"
                      closable={props.closableTags}
                      size="small"
                      text={displayText}
                      disabled={item.props.disabled}
                      {...(slotProps as any)}
                    />
                  ) : (
                    <SPDefaultsProvider
                      key="tag-defaults"
                      defaults={{
                        SPTag: {
                          closable: props.closableTags,
                          size: 'small',
                          text: displayText,
                        },
                      }}
                    >
                      {slotContent}
                    </SPDefaultsProvider>
                  )
                ) : (
                  slotContent ?? (
                    <span class={`${props.classPrefix}__selection-text`}>
                      {displayText}
                      {props.multiple && index < props.items.length - 1 && (
                        <span class={`${props.classPrefix}__selection-comma`}>,</span>
                      )}
                    </span>
                  )
                )}
              </div>
            )
          })}
        </>
      )
    })

    return {}
  },
})

export type SPSelectSelection = InstanceType<typeof SPSelectSelection>