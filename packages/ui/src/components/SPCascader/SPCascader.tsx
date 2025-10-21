// Styles
import './style/SPCascader.scss'

// Props & Types
import { makeSPCascaderProps } from './props'
import type { CascaderOption, ItemType, Value, SPCascaderSlots } from './types'

// Components
import { SPCheckboxBtn } from '@/components/SPCheckbox'
import SpIcon from '../icon/Icon'
import { SPList, SPListItem } from '@/components/SPList'
import { SPMenu } from '@/components/SPMenu'
import { SPSelectSelection } from '@/components/SPSelect/SPSelectSelection'
import { SPTextField } from '@/components/SPTextField'

// Composables
import { useSelectBase } from '@/composables/select/useSelectBase'
import { useSelectMenuIcon } from '@/composables/select/useSelectMenuIcon'
import { useSelectModelUpdate } from '@/components/SPSelect/useSelectModelUpdate'
import { useSelectionDisplay } from './internal/useSelectionDisplay'
import { useCascaderPanels } from './internal/useCascaderPanels'
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, mergeProps, ref, watch } from 'vue'
import {
  deepEqual,
  genericComponent,
  useRender,
  wrapInArray,
} from '@/utils'

// Types
import type { ListItem } from '@/composables/list-items'
import type { GenericProps, SelectItemKey } from '@/utils'

export const SPCascader = genericComponent<
  new <
    T extends readonly any[],
    Item = ItemType<T>,
    ReturnObject extends boolean = false,
    Multiple extends boolean = false,
    V extends Value<Item, ReturnObject, Multiple> = Value<
      Item,
      ReturnObject,
      Multiple
    >
  >(
    props: {
      options?: CascaderOption[]
      itemTitle?: SelectItemKey<ItemType<T>>
      itemValue?: SelectItemKey<ItemType<T>>
      itemProps?: SelectItemKey<ItemType<T>>
      returnObject?: ReturnObject
      multiple?: Multiple
      modelValue?: V | null
      'onUpdate:modelValue'?: (value: V) => void
    },
    slots: SPCascaderSlots<Item>
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'SPCascader',

  props: makeSPCascaderProps(),

  emits: {
    'update:focused': (_focused: boolean) => true,
    'update:modelValue': (_value: any) => true,
    'update:menu': (_ue: boolean) => true,
    'expand-change': (_value: any[]) => true,
  },

  setup(props, { slots, emit }) {
    const SPTextFieldRef = ref<SPTextField>()
    const spMenuRef = ref<SPMenu>()

    // 转换options为items格式
    const items = computed(() => transformOptions(props.options))

    const model = useProxiedModel(
      props,
      'modelValue',
      [],
      v => transformIn(v === null ? [null] : wrapInArray(v)),
      v => {
        const transformed = transformOut(v)
        return props.multiple ? transformed : transformed[0] ?? null
      }
    )

    // 使用 useSelectBase 处理基础状态和事件
    const {
      form,
      isFocused,
      menu,
      menuDisabled,
      label,
      t,
      onClear,
      onMousedownControl,
      onFocusin,
    } = useSelectBase(props, {
      itemsLength: computed(() => items.value.length),
      spMenuRef,
    })

    const { renderAppendInner } = useSelectMenuIcon({
      componentName: 'sp-cascader',
      menuIcon: props.menuIcon,
      textFieldRef: SPTextFieldRef,
      slots,
    })

    // 使用 useCascaderPanels 处理级联面板逻辑
    const cascaderPanels = useCascaderPanels(props, {
      items,
      model,
      menu,
      emit,
      setModel: (value: ListItem[]) => {
        model.value = value
      },
    })

    // 使用 useSelectionDisplay 处理显示逻辑
    const { counterValue, displayText, isDirty } = useSelectionDisplay(props, {
      model,
      getFullPath: cascaderPanels.getFullPath,
    })

    // 转换options为内部格?
    function transformOptions(options: CascaderOption[]): ListItem[] {
      return options.map(option => ({
        type: 'item',
        title: String(option.label ?? ''),
        value: option.value,
        props: {
          title: option.label,
          disabled: option.disabled,
          ...option,
        },
        children: option.children
          ? transformOptions(option.children)
          : undefined,
        raw: option,
      }))
    }

    function transformIn(value: any[]): ListItem[] {
      const result: ListItem[] = []
      for (const v of value) {
        if (v === null) continue

        // 处理多选模式下的路径数组
        if (props.multiple && props.emitPath && Array.isArray(v)) {
          // v 是一个路径数组，如 ['beijing', 'haidian', 'zhongguancun']
          const item = cascaderPanels.findItemByPath(v, items.value)
          if (item) {
            result.push(item)
            // 存储完整路径到itemPaths
            const fullPath = cascaderPanels.buildFullPath(v, items.value)
            if (fullPath.length > 0) {
              cascaderPanels.itemPaths.value.set(item.value, fullPath)
            }
          }
        } else {
          // 单选模式或非路径模式
          const item = cascaderPanels.findItemByValue(v, items.value)
          if (item) {
            result.push(item)
          }
        }
      }
      return result
    }

    function transformOut(value: ListItem[]): any[] {
      if (props.returnObject) {
        return value.map(item => item.raw)
      }
      if (props.emitPath) {
        return value.map(item => cascaderPanels.getNodePath(item))
      }
      return value.map(item => item.value)
    }

    function onBlur(e: FocusEvent) {
      // 简化onBlur逻辑，与SPSelect保持一致
      if (!spMenuRef.value?.$el?.contains(e.relatedTarget as HTMLElement)) {
        menu.value = false
      }
    }

    const onModelUpdate = useSelectModelUpdate({
      textFieldRef: SPTextFieldRef,
      model,
      emptyValue: [] as any,
      onAutofillMatch: () => {
        // 清空路径映射
        cascaderPanels.itemPaths.value.clear()
      },
    })

    // 监听options变化
    watch(
      () => props.options,
      () => {
        if (menu.value) {
          cascaderPanels.initPanels()
        }
      },
      { deep: true }
    )

    useRender(() => {
      const hasTags = !!(props.tags || slots.tag)
      const hasList = !!(
        !props.hideNoData ||
        items.value.length ||
        slots['prepend-item'] ||
        slots['append-item'] ||
        slots['no-data']
      )
      const textFieldProps = SPTextField.filterProps(props)

      const placeholder =
        isDirty.value ||
        (!isFocused.value && props.label && !props.persistentPlaceholder)
          ? undefined
          : props.placeholder

      return (
        <SPTextField
          ref={SPTextFieldRef}
          {...textFieldProps}
          modelValue={displayText.value}
          onUpdate:modelValue={onModelUpdate}
          v-model:focused={isFocused.value}
          validationValue={model.externalValue}
          counterValue={
            props.counter || props.counterValue ? counterValue.value : undefined
          }
          dirty={isDirty.value}
          class={[
            'sp-cascader',
            {
              'sp-cascader--active-menu': menu.value,
              'sp-cascader--tags': !!props.tags,
              [`sp-cascader--${props.multiple ? 'multiple' : 'single'}`]: true,
              'sp-cascader--selected': model.value.length,
              'sp-cascader--selection-slot': !!slots.selection,
            },
            props.class,
          ]}
          style={props.style}
          placeholder={placeholder}
          onClick:clear={onClear}
          onMousedown:control={onMousedownControl}
          onBlur={onBlur}
          aria-label={t(label.value)}
        >
          {{
            ...slots,
            default: () => (
              <>
                <SPMenu
                  ref={spMenuRef}
                  v-model={menu.value}
                  activator="parent"
                  contentClass="sp-cascader__content"
                  disabled={menuDisabled.value}
                  eager={props.eager}
                  maxHeight={310}
                  openOnClick={false}
                  closeOnContentClick={false}
                  transition={props.transition}
                  {...props.menuProps}
                >
                  {hasList && (
                    <div class="sp-cascader__panels">
                      {cascaderPanels.panels.value.map((panel, panelIndex) => (
                        <div
                          key={panelIndex}
                          class="sp-cascader__panel"
                        >
                          <SPList
                            selected={[]}
                            selectStrategy={
                              props.multiple
                                ? 'independent'
                                : 'single-independent'
                            }
                            onMousedown={(e: MouseEvent) => e.preventDefault()}
                            onFocusin={onFocusin}
                            aria-live="polite"
                            aria-label={`${props.label}-panel-${panelIndex}`}
                            color={props.itemColor ?? props.color}
                            {...props.listProps}
                          >
                            {slots['prepend-item']?.()}

                            {!panel.length &&
                              !props.hideNoData &&
                              (slots['no-data']?.() ?? (
                                <SPListItem
                                  key="no-data"
                                  title={t(props.noDataText)}
                                />
                              ))}

                            {panel.map((item, index) => {
                              const isSelected =
                                cascaderPanels.selectedPath.value[panelIndex]
                                  ?.value === item.value
                              // 在多选模式下，也要检查该项是否已被选中
                              const isMultiSelected =
                                props.multiple &&
                                model.value.some(v =>
                                  (props.valueComparator || deepEqual)(
                                    v.value,
                                    item.value
                                  )
                                )
                              const isExpanded =
                                cascaderPanels.expandedValues.value[
                                  panelIndex
                                ] === item.value
                              const hasChildren = !!(
                                item.children && item.children.length > 0
                              )

                              const itemProps = mergeProps(item.props, {
                                key: item.value,
                                onClick: (e: Event) => {
                                  e.stopPropagation()
                                  cascaderPanels.onNodeClick(item, panelIndex)
                                },
                                onMouseenter: () =>
                                  cascaderPanels.onNodeHover(item, panelIndex),
                              })

                              return (
                                slots.item?.({
                                  item,
                                  index,
                                  props: itemProps,
                                }) ?? (
                                  <SPListItem
                                    {...itemProps}
                                    class={{
                                      'sp-cascader__item--selected':
                                        isSelected || isMultiSelected,
                                      'sp-cascader__item--expanded': isExpanded,
                                      'sp-cascader__item--has-children':
                                        hasChildren,
                                    }}
                                  >
                                    {{
                                      prepend: () => (
                                        <>
                                          {props.multiple &&
                                          props.checkStrictly ? (
                                            <SPCheckboxBtn
                                              key={item.value}
                                              modelValue={model.value.some(v =>
                                                (
                                                  props.valueComparator ||
                                                  deepEqual
                                                )(v.value, item.value)
                                              )}
                                              // onClick={(e: Event) => {
                                              //   e.stopPropagation()
                                              //   onNodeClick(item, panelIndex)
                                              // }}
                                            />
                                          ) : undefined}
                                        </>
                                      ),
                                      append: () => (
                                        <>
                                          {hasChildren && (
                                            <SpIcon
                                              name="mdi-chevron-right"
                                              class="sp-cascader__expand-icon"
                                            />
                                          )}
                                        </>
                                      ),
                                    }}
                                  </SPListItem>
                                )
                              )
                            })}

                            {slots['append-item']?.()}
                          </SPList>
                        </div>
                      ))}
                    </div>
                  )}
                </SPMenu>

                <SPSelectSelection
                  items={props.multiple ? (model.value as any) : model.value.slice(-1)}
                  multiple={props.multiple}
                  hasTags={hasTags}
                  closableTags={props.closableTags}
                  tagSlot={slots.tag}
                  selectionSlot={slots.selection}
                  onRemove={(item: ListItem) => {
                    const index = model.value.findIndex(
                      v => v.value === item.value
                    )
                    if (index !== -1) {
                      const newValue = [...model.value]
                      newValue.splice(index, 1)
                      model.value = newValue
                    }
                  }}
                  classPrefix="sp-cascader"
                  getDisplayText={item =>
                    props.showAllLevels
                      ? cascaderPanels
                          .getFullPath(item)
                          .map(p => p.title)
                          .join(props.separator)
                      : item.title
                  }
                  onSelectionClick={(item, e) => {
                    e.stopPropagation()
                    cascaderPanels.onSelectionClick(item)
                  }}
                />
              </>
            ),
            'append-inner': renderAppendInner,
          }}
        </SPTextField>
      )
    })

    return forwardRefs(
      {
        isFocused,
        menu,
        select: cascaderPanels.onNodeClick,
      },
      SPTextFieldRef
    )
  },
})

export type SPCascader = InstanceType<typeof SPCascader>
