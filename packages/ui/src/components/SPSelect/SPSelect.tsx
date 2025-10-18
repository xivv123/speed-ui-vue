// Styles
import './style/SPSelect.sass'

// Components
import { SPDivider } from '@/components/SPDivider'
import { SPList, SPListItem, SPListSubheader } from '@/components/SPList'
import { SPMenu } from '@/components/SPMenu'
import { SPTextField } from '@/components/SPTextField/SPTextField'
import { SPVirtualScroll } from '@/components/SPVirtualScroll'
import { makeSPSelectProps } from './props'
export { makeSelectProps, makeSPSelectProps } from './props'
import { SPSelectItem } from './SPSelectItem'
import { SPSelectSelection } from './SPSelectSelection'

// Composables
import { useScrolling } from './internal/useScrolling'
import { useSelectBase } from '@/composables/select/useSelectBase'
import { useSelectMenuIcon } from '@/composables/select/useSelectMenuIcon'
import { useSelectModelUpdate } from './useSelectModelUpdate'
import { forwardRefs } from '@/composables/forwardRefs'
import { useItems } from '@/composables/list-items'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, mergeProps, nextTick, ref, watch, inject } from 'vue'
import {
  checkPrintable,
  deepEqual,
  genericComponent,
  IN_BROWSER,
  useVNodeRender,
  wrapInArray,
} from '@/utils'

// Types
import type { FormItemContext } from '@/components/SPFormItem/types'
import { FormItemKey } from '@/components/SPFormItem/types'
import type { ListItem } from '@/composables/list-items'
import type { GenericProps, SelectItemKey } from '@/utils'
import type { SPSelectSlots, SPSelectProps, ItemType, Value } from './types'

export const SPSelect = genericComponent<
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
    props: SPSelectProps<T, Item, ReturnObject, Multiple, V> & {
      items?: T
      itemTitle?: SelectItemKey<ItemType<T>>
      itemValue?: SelectItemKey<ItemType<T>>
      itemProps?: SelectItemKey<ItemType<T>>
      returnObject?: ReturnObject
      multiple?: Multiple
      modelValue?: V | null
      'onUpdate:modelValue'?: (value: V) => void
    },
    slots: SPSelectSlots<Item>
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'SPSelect',

  props: makeSPSelectProps(),

  emits: {
    'update:focused': (_focused: boolean) => true,
    'update:modelValue': (_value: any) => true,
    'update:menu': (_menu: boolean) => true,
  },

  setup(props, { slots }) {
    const SPTextFieldRef = ref<SPTextField>()
    const SPMenuRef = ref<SPMenu>()
    const SPVirtualScrollRef = ref<SPVirtualScroll>()
    const { items, transformIn, transformOut } = useItems(props)
    const model = useProxiedModel(
      props,
      'modelValue',
      [],
      v => {
        // 处理 null 和 undefined
        if (v === null || v === undefined) return []

        const wrapped = wrapInArray(v)
        // 过滤掉空字符串、null 和 undefined
        const filtered = wrapped.filter(item => {
          return item !== '' && item !== null && item !== undefined
        })

        return filtered.length > 0 ? transformIn(filtered) : []
      },
      v => {
        const transformed = transformOut(v)
        return props.multiple ? transformed : transformed[0] ?? null
      }
    )

    const selectedValues = computed(() =>
      model.value.map(selection => selection.value)
    )

    // 获取来自 SPFormItem 的验证状态
    const formItem = inject<FormItemContext | null>(FormItemKey, null)

    let keyboardLookupPrefix = ''
    let keyboardLookupIndex = -1
    let keyboardLookupLastTime: number

    const displayItems = computed(() => {
      if (props.hideSelected) {
        return items.value.filter(
          item =>
            !model.value.some(s =>
              (props.valueComparator || deepEqual)(s, item)
            )
        )
      }
      return items.value
    })

    // Normalize style in case a CSSStyleDeclaration slips through
    const normalizeInlineStyle = (s: any) => {
      try {
        return s &&
          typeof s === 'object' &&
          'getPropertyValue' in s &&
          'cssText' in s
          ? (s as CSSStyleDeclaration).cssText
          : s
      } catch {
        return s
      }
    }

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
      itemsLength: computed(() => displayItems.value.length),
      spMenuRef: SPMenuRef,
    })

    const counterValue = computed(() => {
      return typeof props.counterValue === 'function'
        ? props.counterValue(model.value)
        : typeof props.counterValue === 'number'
        ? props.counterValue
        : model.value.length
    })

    const { renderAppendInner } = useSelectMenuIcon({
      componentName: 'sp-select',
      menuIcon: props.menuIcon,
      textFieldRef: SPTextFieldRef,
      slots,
    })

    const computedMenuProps = computed(() => {
      return {
        ...props.menuProps,
        activatorProps: {
          ...(props.menuProps?.activatorProps || {}),
          'aria-haspopup': 'listbox', // Set aria-haspopup to 'listbox'
        },
      }
    })

    const listRef = ref<SPList>()
    const listEvents = {
      ...useScrolling(listRef, SPTextFieldRef),
      onMousedown: (e: MouseEvent) => e.preventDefault(),
    }

    function onListKeydown(e: KeyboardEvent) {
      if (checkPrintable(e)) {
        onKeydown(e)
      }
    }
    function onKeydown(e: KeyboardEvent) {
      if (!e.key || form.isReadonly.value) return

      if (
        ['Enter', ' ', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)
      ) {
        e.preventDefault()
      }

      if (['Enter', 'ArrowDown', ' '].includes(e.key)) {
        menu.value = true
      }

      if (['Escape', 'Tab'].includes(e.key)) {
        menu.value = false
      }

      if (e.key === 'Home') {
        listRef.value?.focus('first')
      } else if (e.key === 'End') {
        listRef.value?.focus('last')
      }

      // html select hotkeys
      const KEYBOARD_LOOKUP_THRESHOLD = 1000 // milliseconds

      if (!checkPrintable(e)) return

      const now = performance.now()
      if (now - keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
        keyboardLookupPrefix = ''
        keyboardLookupIndex = -1
      }
      keyboardLookupPrefix += e.key.toLowerCase()
      keyboardLookupLastTime = now

      const items = displayItems.value
      function findItem() {
        let result = findItemBase()
        if (result) return result

        if (keyboardLookupPrefix.at(-1) === keyboardLookupPrefix.at(-2)) {
          // No matches but we have a repeated letter, try the next item with that prefix
          keyboardLookupPrefix = keyboardLookupPrefix.slice(0, -1)
          result = findItemBase()
          if (result) return result
        }

        // Still nothing, wrap around to the top
        keyboardLookupIndex = -1
        result = findItemBase()
        if (result) return result

        // Still nothing, try just the new letter
        keyboardLookupPrefix = e.key.toLowerCase()
        return findItemBase()
      }
      function findItemBase() {
        for (let i = keyboardLookupIndex + 1; i < items.length; i++) {
          const _item = items[i]
          if (_item.title.toLowerCase().startsWith(keyboardLookupPrefix)) {
            return [_item, i] as const
          }
        }
        return undefined
      }

      const result = findItem()
      if (!result) return

      const [item, index] = result
      keyboardLookupIndex = index
      listRef.value?.focus(index)
      if (!props.multiple) {
        model.value = [item]
      }
    }

    /** @param set - null means toggle */
    function select(item: ListItem, set: boolean | null = true) {
      if (item.props.disabled) return

      if (props.multiple) {
        const index = model.value.findIndex(selection =>
          (props.valueComparator || deepEqual)(selection.value, item.value)
        )
        const add = set == null ? !~index : set

        if (~index) {
          const value = add ? [...model.value, item] : [...model.value]
          value.splice(index, 1)
          model.value = value
        } else if (add) {
          model.value = [...model.value, item]
        }
      } else {
        const add = set !== false
        model.value = add ? [item] : []

        nextTick(() => {
          menu.value = false
        })
      }
    }
    function onBlur(e: FocusEvent) {
      if (!listRef.value?.$el.contains(e.relatedTarget as HTMLElement)) {
        menu.value = false
      }
    }
    function onAfterEnter() {
      if (props.eager) {
        SPVirtualScrollRef.value?.calculateVisibleItems()
      }
    }
    function onAfterLeave() {
      if (isFocused.value) {
        SPTextFieldRef.value?.focus()
      }
    }
    const onModelUpdate = useSelectModelUpdate({
      textFieldRef: SPTextFieldRef,
      model,
      enableAutofill: true,
      emptyValue: [] as any,
      onAutofillMatch: v => {
        const item = items.value.find(item => item.title === v)
        if (item) {
          select(item)
        }
      },
    })

    watch(menu, () => {
      if (!props.hideSelected && menu.value && model.value.length) {
        const index = displayItems.value.findIndex(item =>
          model.value.some(s =>
            (props.valueComparator || deepEqual)(s.value, item.value)
          )
        )
        IN_BROWSER &&
          !props.noAutoScroll &&
          window.requestAnimationFrame(() => {
            index >= 0 && SPVirtualScrollRef.value?.scrollToIndex(index)
          })
      }
    })

    watch(
      () => props.items,
      (newVal, oldVal) => {
        if (menu.value) return

        if (
          isFocused.value &&
          props.hideNoData &&
          !oldVal.length &&
          newVal.length
        ) {
          menu.value = true
        }
      }
    )

    useVNodeRender(() => {
      const hasTags = !!(props.tags || slots.tag)
      const hasList = !!(
        !props.hideNoData ||
        displayItems.value.length ||
        slots['prepend-item'] ||
        slots['append-item'] ||
        slots['no-data']
      )
      const isDirty = model.value.length > 0
      const textFieldProps = SPTextField.filterProps(props)

      const placeholder =
        isDirty ||
        (!isFocused.value && props.label && !props.persistentPlaceholder)
          ? undefined
          : props.placeholder

      return (
        <SPTextField
          ref={SPTextFieldRef}
          {...textFieldProps}
          {...({ onKeydown, onBlur } as any)}
          modelValue={model.value.map(v => v.props.title).join(', ')}
          onUpdate:modelValue={onModelUpdate}
          focused={isFocused.value}
          onUpdate:focused={(v: boolean) => (isFocused.value = v)}
          validationValue={model.externalValue}
          counterValue={
            props.counter || props.counterValue ? counterValue.value : undefined
          }
          dirty={isDirty}
          hideDetails={formItem ? true : textFieldProps.hideDetails}
          error={
            formItem ? formItem.isValid.value === false : textFieldProps.error
          }
          class={[
            'sp-select',
            {
              'sp-select--active-menu': menu.value,
              'sp-select--tags': !!props.tags,
              [`sp-select--${props.multiple ? 'multiple' : 'single'}`]: true,
              'sp-select--selected': model.value.length,
              'sp-select--selection-slot': !!slots.selection,
            },
            props.class,
          ]}
          style={normalizeInlineStyle(props.style)}
          inputmode="none"
          placeholder={placeholder}
          onClick:clear={onClear}
          onMousedown:control={onMousedownControl}
          aria-label={t(label.value)}
          title={t(label.value)}
        >
          {{
            ...slots,
            default: () => (
              <>
                <SPMenu
                  ref={SPMenuRef}
                  modelValue={menu.value}
                  onUpdate:modelValue={(v: boolean | undefined) =>
                    (menu.value = v)
                  }
                  activator="parent"
                  contentClass="sp-select__content"
                  disabled={menuDisabled.value}
                  eager={props.eager}
                  maxHeight={310}
                  openOnClick={false}
                  closeOnContentClick={false}
                  transition={props.transition}
                  onAfterEnter={onAfterEnter}
                  onAfterLeave={onAfterLeave}
                  {...computedMenuProps.value}
                >
                  {hasList && (
                    <SPList
                      ref={listRef}
                      selected={selectedValues.value}
                      selectStrategy={
                        props.multiple ? 'independent' : 'single-independent'
                      }
                      onKeydown={onListKeydown}
                      onFocusin={onFocusin}
                      aria-live="polite"
                      aria-label={`${props.label}-list`}
                      color={props.itemColor ?? props.color}
                      {...listEvents}
                      {...props.listProps}
                    >
                      {slots['prepend-item']?.()}

                      {!displayItems.value.length &&
                        !props.hideNoData &&
                        (slots['no-data']?.() ?? (
                          <SPListItem
                            key="no-data"
                            title={t(props.noDataText)}
                          />
                        ))}

                      <SPVirtualScroll
                        ref={SPVirtualScrollRef}
                        renderless
                        items={displayItems.value as any}
                        itemKey="value"
                      >
                        {({ item, index, itemRef }: any) => {
                          // const camelizedProps = camelizeProps(item.props)

                          const itemProps = mergeProps(item.props, {
                            ref: itemRef,
                            key: item.value,
                            onClick: () => select(item, null),
                          })

                          if (item.type === 'divider') {
                            return (
                              slots.divider?.({ props: item.raw, index }) ?? (
                                <SPDivider
                                  {...item.props}
                                  key={`divider-${index}`}
                                />
                              )
                            )
                          }

                          if (item.type === 'subheader') {
                            return (
                              slots.subheader?.({ props: item.raw, index }) ?? (
                                <SPListSubheader
                                  {...item.props}
                                  key={`subheader-${index}`}
                                />
                              )
                            )
                          }

                          return (
                            slots.item?.({
                              item,
                              index,
                              props: itemProps,
                            }) ?? (
                              <SPSelectItem
                                item={item}
                                itemProps={itemProps}
                                multiple={props.multiple}
                                hideSelected={props.hideSelected}
                              />
                            )
                          )
                        }}
                      </SPVirtualScroll>

                      {slots['append-item']?.()}
                    </SPList>
                  )}
                </SPMenu>

                <SPSelectSelection
                  items={model.value as any}
                  multiple={props.multiple}
                  hasTags={hasTags}
                  closableTags={props.closableTags}
                  tagSlot={slots.tag}
                  selectionSlot={slots.selection}
                  onRemove={(item: ListItem<any>) => select(item, false)}
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
        select,
      },
      SPTextFieldRef
    )
  },
})

export type SPSelect = InstanceType<typeof SPSelect>
