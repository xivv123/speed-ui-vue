// Styles
import './style/SPInputSuggest.sass'

// Components
import { SPCheckboxBtn } from '@/components/SPCheckbox'
import { SPDivider } from '@/components/SPDivider'
import SpIcon from '@/components/icon/Icon'
import { SPList, SPListItem, SPListSubheader } from '@/components/SPList'
import { SPMenu } from '@/components/SPMenu'
import { SPSelectSelection } from '@/components/SPSelect/SPSelectSelection'
import { SPTextField } from '@/components/SPTextField'
import { SPVirtualScroll } from '@/components/SPVirtualScroll'

// Composables
import { useScrolling } from '../SPSelect/internal/useScrolling'
import { useTextColor } from '@/composables/color'
import { highlightResult, useFilter } from '@/composables/filter'
import { useForm } from '@/composables/form'
import { forwardRefs } from '@/composables/forwardRefs'
import { useItems } from '@/composables/list-items'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useAutoScrollToSelected } from '@/composables/select/useAutoScrollToSelected'
import { useSearchableSelect } from '@/composables/select/useSearchableSelect'
import { useSelectMenuIcon } from '@/composables/select/useSelectMenuIcon'

// Utilities
import { computed, mergeProps, nextTick, ref, shallowRef, watch } from 'vue'
import {
  checkPrintable,
  deepEqual,
  genericComponent,
  matchesSelector,
  noop,
  useRender,
  wrapInArray,
} from '@/utils'

// Local
import { makeSPInputSuggestProps } from './props'

// Types
import type { ListItem } from '@/composables/list-items'
import type { GenericProps, SelectItemKey } from '@/utils'
import type { ItemType, SPInputSuggestSlots, Value } from './types'

export const SPInputSuggest = genericComponent<
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
      items?: T
      itemTitle?: SelectItemKey<ItemType<T>>
      itemValue?: SelectItemKey<ItemType<T>>
      itemProps?: SelectItemKey<ItemType<T>>
      returnObject?: ReturnObject
      multiple?: Multiple
      modelValue?: V | null
      'onUpdate:modelValue'?: (value: V) => void
    },
    slots: SPInputSuggestSlots<Item>
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'SPInputSuggest',

  props: makeSPInputSuggestProps(),

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:search': (value: any) => true,
    'update:modelValue': (value: any) => true,
    'update:menu': (value: boolean) => true,
  },

  setup(props, { slots }) {
    const { t } = useLocale()
    const SPTextFieldRef = ref<SPTextField>()
    const isFocused = shallowRef(false)
    const isPristine = shallowRef(true)
    const SPMenuRef = ref<SPMenu>()
    const SPVirtualScrollRef = ref<SPVirtualScroll>()
    const selectionIndex = shallowRef(-1)
    const { items, transformIn, transformOut } = useItems(props)
    const { textColorClasses, textColorStyles } = useTextColor(
      () => SPTextFieldRef.value?.color
    )
    const search = useProxiedModel(props, 'search', '')
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
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function'
        ? props.counterValue(model.value)
        : typeof props.counterValue === 'number'
        ? props.counterValue
        : model.value.length
    })
    const form = useForm(props)

    // 先创建一个临时的 isPristine ref
    // const isPristine = shallowRef(true)

    const { filteredItems, getMatches } = useFilter(props, items, () =>
      isPristine.value ? '' : search.value
    )

    const displayItems = computed(() => {
      if (props.hideSelected) {
        return filteredItems.value.filter(
          filteredItem => !model.value.some(s => s.value === filteredItem.value)
        )
      }
      return filteredItems.value
    })

    const hasTags = computed(() => !!(props.tags || slots.chip))
    const hasSelectionSlot = computed(() => hasTags.value || !!slots.selection)

    // 使用 useSearchableSelect 统一管理搜索状态
    const searchState = useSearchableSelect(search as any, {
      isFocused,
      multiple: props.multiple,
      hasSelectionSlot: hasSelectionSlot.value,
      model,
      displayItems,
    })

    // 同步 isPristine 状态到过滤器
    watch(
      () => searchState.isPristine.value,
      val => {
        isPristine.value = val
      },
      { immediate: true }
    )

    const selectedValues = computed(() =>
      model.value.map(selection => selection.props.value)
    )

    // 增强的 highlightFirst，支持 autoSelectFirst 的 exact 模式
    const highlightFirst = computed(() => {
      const selectFirst =
        props.autoSelectFirst === true ||
        (props.autoSelectFirst === 'exact' &&
          search.value === displayItems.value[0]?.title)
      return selectFirst && searchState.highlightFirst.value
    })

    const menuDisabled = computed(
      () =>
        (props.hideNoData && !displayItems.value.length) ||
        form.isReadonly.value ||
        form.isDisabled.value
    )
    const _menu = useProxiedModel(props, 'menu')
    const menu = computed({
      get: () => _menu.value,
      set: v => {
        if (_menu.value && !v && SPMenuRef.value?.ΨopenChildren.size) return
        if (v && menuDisabled.value) return
        _menu.value = v
      },
    })

    const label = computed(() =>
      menu.value ? props.closeText : props.openText
    )

    const { renderAppendInner } = useSelectMenuIcon({
      componentName: 'sp-input-suggest',
      menuIcon: props.menuIcon,
      textFieldRef: SPTextFieldRef,
      slots,
      label: label as any,
      onClick: noop,
    })

    // 使用 useAutoScrollToSelected 自动滚动
    useAutoScrollToSelected({
      menu: menu as any,
      model,
      displayItems,
      hideSelected: props.hideSelected,
      virtualScrollRef: SPVirtualScrollRef,
      valueComparator: props.valueComparator,
    })

    const listRef = ref<SPList>()
    // const listEvents = useScrolling(listRef, SPTextFieldRef)
    const listEvents = {
      ...useScrolling(listRef, SPTextFieldRef),
      onMousedown: (e: MouseEvent) => e.preventDefault(),
    }
    function onClear(e: MouseEvent) {
      if (props.openOnClear) {
        menu.value = true
      }

      search.value = ''
    }
    function onMousedownControl() {
      if (menuDisabled.value) return

      menu.value = true
    }
    function onMousedownMenuIcon(e: MouseEvent) {
      if (menuDisabled.value) return

      if (isFocused.value) {
        e.preventDefault()
        e.stopPropagation()
      }
      menu.value = !menu.value
    }
    function onListKeydown(e: KeyboardEvent) {
      if (checkPrintable(e) || e.key === 'Backspace') {
        SPTextFieldRef.value?.focus()
      }
    }
    function onKeydown(e: KeyboardEvent) {
      if (form.isReadonly.value) return

      const selectionStart = SPTextFieldRef.value?.selectionStart
      const length = model.value.length

      if (['Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault()
      }

      if (['Enter', 'ArrowDown'].includes(e.key)) {
        menu.value = true
      }

      if (['Escape'].includes(e.key)) {
        menu.value = false
      }

      if (
        highlightFirst.value &&
        ['Enter', 'Tab'].includes(e.key) &&
        !model.value.some(({ value }) => value === displayItems.value[0].value)
      ) {
        select(displayItems.value[0])
      }

      if (e.key === 'ArrowDown' && highlightFirst.value) {
        listRef.value?.focus('next')
      }

      if (['Backspace', 'Delete'].includes(e.key)) {
        if (
          !props.multiple &&
          hasSelectionSlot.value &&
          model.value.length > 0 &&
          !search.value
        )
          return select(model.value[0], false)

        if (~selectionIndex.value) {
          e.preventDefault()
          const originalSelectionIndex = selectionIndex.value
          select(model.value[selectionIndex.value], false)

          selectionIndex.value =
            originalSelectionIndex >= length - 1
              ? length - 2
              : originalSelectionIndex
        } else if (e.key === 'Backspace' && !search.value) {
          selectionIndex.value = length - 1
        }

        return
      }

      if (!props.multiple) return

      if (e.key === 'ArrowLeft') {
        if (selectionIndex.value < 0 && selectionStart && selectionStart > 0)
          return

        const prev =
          selectionIndex.value > -1 ? selectionIndex.value - 1 : length - 1

        if (model.value[prev]) {
          selectionIndex.value = prev
        } else {
          const searchLength = search.value?.length ?? null
          selectionIndex.value = -1
          SPTextFieldRef.value?.setSelectionRange(searchLength, searchLength)
        }
      } else if (e.key === 'ArrowRight') {
        if (selectionIndex.value < 0) return

        const next = selectionIndex.value + 1

        if (model.value[next]) {
          selectionIndex.value = next
        } else {
          selectionIndex.value = -1
          SPTextFieldRef.value?.setSelectionRange(0, 0)
        }
      } else if (~selectionIndex.value && checkPrintable(e)) {
        selectionIndex.value = -1
      }
    }

    function onChange(e: Event) {
      if (
        matchesSelector(SPTextFieldRef.value, ':autofill') ||
        matchesSelector(SPTextFieldRef.value, ':-webkit-autofill')
      ) {
        const item = items.value.find(
          item => item.title === (e.target as HTMLInputElement).value
        )
        if (item) {
          select(item)
        }
      }
    }

    function onAfterEnter() {
      if (props.eager) {
        SPVirtualScrollRef.value?.calculateVisibleItems()
      }
    }
    function onAfterLeave() {
      if (isFocused.value) {
        isPristine.value = true
        SPTextFieldRef.value?.focus()
      }
    }

    function onFocusin(e: FocusEvent) {
      isFocused.value = true
      setTimeout(() => {
        searchState.listHasFocus.value = true
      })
    }
    function onFocusout(e: FocusEvent) {
      searchState.listHasFocus.value = false
    }
    function onUpdateModelValue(v: any) {
      if (v == null || (v === '' && !props.multiple && !hasSelectionSlot.value))
        model.value = []
    }

    function select(item: ListItem | undefined, set: boolean | null = true) {
      if (!item || item.props.disabled) return

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

        if (props.clearOnSelect) {
          search.value = ''
        }
      } else {
        const add = set !== false
        model.value = add ? [item] : []
        search.value = add && !hasSelectionSlot.value ? item.title : ''

        // watch for search watcher to trigger
        nextTick(() => {
          menu.value = false
        })
      }
    }

    watch(isFocused, (val, oldVal) => {
      if (val === oldVal) return

      if (!val) {
        selectionIndex.value = -1
        menu.value = false
      }
    })

    // useAutoScrollToSelected 已处理自动滚动逻辑

    watch(
      () => props.items,
      (newVal, oldVal) => {
        if (menu.value) return

        if (isFocused.value && !oldVal.length && newVal.length) {
          menu.value = true
        }
      }
    )

    useRender(() => {
      const hasList = !!(
        !props.hideNoData ||
        displayItems.value.length ||
        slots['prepend-item'] ||
        slots['append-item'] ||
        slots['no-data']
      )
      const isDirty = model.value.length > 0
      const textFieldProps = SPTextField.filterProps(props)

      return (
        <SPTextField
          ref={SPTextFieldRef}
          {...textFieldProps}
          v-model={search.value}
          onUpdate:modelValue={onUpdateModelValue}
          v-model:focused={isFocused.value}
          validationValue={model.externalValue}
          counterValue={
            props.counter || props.counterValue ? counterValue.value : undefined
          }
          dirty={isDirty}
          // onChange={onChange}
          class={[
            'sp-input-suggest',
            `sp-input-suggest--${props.multiple ? 'multiple' : 'single'}`,
            {
              'sp-input-suggest--active-menu': menu.value,
              'sp-input-suggest--tags': !!props.tags,
              'sp-input-suggest--selection-slot': !!hasSelectionSlot.value,
              'sp-input-suggest--selecting-index': selectionIndex.value > -1,
            },
            props.class,
          ]}
          style={props.style}
          readonly={form.isReadonly.value}
          placeholder={isDirty ? undefined : props.placeholder}
          onClick:clear={onClear}
          onMousedown:control={onMousedownControl}
          // onKeydown={onKeydown}
        >
          {{
            ...slots,
            default: () => (
              <>
                <SPMenu
                  ref={SPMenuRef}
                  v-model={menu.value}
                  activator="parent"
                  contentClass="sp-input-suggest__content"
                  disabled={menuDisabled.value}
                  eager={props.eager}
                  maxHeight={310}
                  openOnClick={false}
                  closeOnContentClick={false}
                  transition={props.transition}
                  onAfterEnter={onAfterEnter}
                  onAfterLeave={onAfterLeave}
                  {...props.menuProps}
                >
                  {hasList && (
                    <SPList
                      ref={listRef}
                      filterable
                      selected={selectedValues.value}
                      selectStrategy={
                        props.multiple ? 'independent' : 'single-independent'
                      }
                      // onMousedown={(e: MouseEvent) => e.preventDefault()}
                      onKeydown={onListKeydown}
                      onFocusin={onFocusin}
                      // onFocusout={onFocusout}
                      // tabindex="-1"
                      aria-live="polite"
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
                        items={displayItems.value}
                        itemKey="value"
                      >
                        {({ item, index, itemRef }: any) => {
                          const itemProps = mergeProps(item.props, {
                            ref: itemRef,
                            key: item.value,
                            active:
                              highlightFirst.value && index === 0
                                ? true
                                : undefined,
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
                              <SPListItem
                                {...itemProps}
                                // role="option"
                              >
                                {{
                                  prepend: ({
                                    isSelected,
                                  }: {
                                    isSelected: boolean
                                  }) => (
                                    <>
                                      {props.multiple && !props.hideSelected ? (
                                        <SPCheckboxBtn
                                          key={item.value}
                                          modelValue={isSelected}
                                        />
                                      ) : undefined}

                                      {item.props.prependIcon && (
                                        <SpIcon name={item.props.prependIcon} />
                                      )}
                                    </>
                                  ),
                                  title: () => {
                                    return searchState.isPristine.value
                                      ? item.title
                                      : highlightResult(
                                          'sp-input-suggest',
                                          item.title,
                                          getMatches(item)?.title
                                        )
                                  },
                                }}
                              </SPListItem>
                            )
                          )
                        }}
                      </SPVirtualScroll>

                      {slots['append-item']?.()}
                    </SPList>
                  )}
                </SPMenu>

                <SPSelectSelection
                  items={[...model.value]}
                  multiple={props.multiple}
                  hasTags={hasTags.value}
                  closableTags={props.closableTags}
                  tagSlot={slots.chip}
                  selectionSlot={slots.selection}
                  onRemove={item => select(item, false)}
                  selectionIndex={selectionIndex.value}
                  classPrefix="sp-input-suggest"
                  textColorClasses={textColorClasses.value}
                  textColorStyles={textColorStyles.value}
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
        isPristine: searchState.isPristine,
        menu,
        search,
        filteredItems,
        select,
      },
      SPTextFieldRef
    )
  },
})

export type SPInputSuggest = InstanceType<typeof SPInputSuggest>
