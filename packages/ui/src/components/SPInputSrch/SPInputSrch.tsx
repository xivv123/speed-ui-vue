// Styles
import './SPInputSrch.scss'

// Components
import { SPBtn } from '@/components/SPBtn'
import { SPDefaultsProvider } from '@/components/SPDefaultsProvider'
import { SPDivider } from '@/components/SPDivider'
import { SPList, SPListItem } from '@/components/SPList'
import { SPMenu } from '@/components/SPMenu'
import {
  makeSPTextFieldProps,
  SPTextField,
} from '@/components/SPTextField'

// Composables
import { useForm } from '@/composables/form'
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, nextTick, ref, shallowRef, watch } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/utils'

// Types
import type { PropType } from 'vue'
import type { SPTextFieldSlots } from '@/components/SPTextField'

// Search suggestion data
interface SearchSuggestion {
  value: string
  text: string
  description?: string
  category?: string
  icon?: string
  disabled?: boolean
}

type SPInputSrchSlots = SPTextFieldSlots & {
  'search-button': {
    props: Record<string, unknown>
  }
  suggestion: {
    suggestion: SearchSuggestion
    props: Record<string, unknown>
  }
}

type SearchPosition = 'prepend' | 'append'

const makeSPInputSrchProps = propsFactory(
  {
    suggestions: {
      type: Array as PropType<SearchSuggestion[]>,
      default: () => [],
    },
    searchPosition: {
      type: String as PropType<SearchPosition>,
      default: 'append' as SearchPosition,
    },
    modelValue: {
      type: String,
      default: '',
    },
    searchIcon: {
      type: String,
      default: 'Search',
    },
    placeholder: {
      type: String,
      default: '请输入搜索内容',
    },
    inset: Boolean,
    autoSearch: {
      type: Boolean,
      default: true,
    },
    searchOnEnter: {
      type: Boolean,
      default: true,
    },
    minSearchLength: {
      type: Number,
      default: 0,
    },
    maxSuggestions: {
      type: Number,
      default: 10,
    },
    menuProps: {
      type: Object as PropType<SPMenu['$props']>,
    },
    filterSuggestions: {
      type: Boolean,
      default: true,
    },

    ...omit(makeSPTextFieldProps(), [
      'modelValue',
      'validationValue',
      'placeholder',
    ]),
  },
  'SPInputSrch'
)

export const SPInputSrch = genericComponent<SPInputSrchSlots>()({
  name: 'SPInputSrch',

  props: {
    ...makeSPInputSrchProps(),
  },

  emits: {
    'update:focused': (_val: boolean) => true,
    'update:modelValue': (_val: string) => true,
    search: (_val: string) => true,
    'suggestion-select': (_suggestion: SearchSuggestion) => true,
    clear: () => true,
  },

  setup(props, { slots, emit }) {
    const vTextFieldRef = ref<SPTextField>()
    const spMenuRef = ref<SPMenu>()
    const listRef = ref<SPList>()

    const form = useForm(props)
    const isFocused = shallowRef(props.focused)
    const isMenuOpen = shallowRef(false)

    const model = useProxiedModel(
      props,
      'modelValue',
      '',
      val => val ?? '',
      val => val ?? ''
    )

    const searchDisabled = computed(
      () => form.isReadonly.value || form.isDisabled.value
    )

    const computedMenuProps = computed(() => {
      return {
        ...props.menuProps,
        activatorProps: {
          ...(props.menuProps?.activatorProps || {}),
          'aria-haspopup': 'listbox',
        },
      }
    })

    const filteredSuggestions = computed(() => {
      if (!props.filterSuggestions) {
        return props.suggestions.slice(0, props.maxSuggestions)
      }

      const searchValue = model.value.toLowerCase().trim()
      if (!searchValue || searchValue.length < props.minSearchLength) {
        return props.suggestions.slice(0, props.maxSuggestions)
      }

      return props.suggestions
        .filter(suggestion => {
          if (suggestion.disabled) return false
          const text = suggestion.text.toLowerCase()
          const value = suggestion.value.toLowerCase()
          const description = suggestion.description?.toLowerCase() || ''

          return (
            text.includes(searchValue) ||
            value.includes(searchValue) ||
            description.includes(searchValue)
          )
        })
        .slice(0, props.maxSuggestions)
    })

    const shouldShowMenu = computed(() => {
      return (
        isMenuOpen.value &&
        filteredSuggestions.value.length > 0 &&
        model.value.length >= props.minSearchLength
      )
    })

    function onSearch() {
      if (searchDisabled.value) return
      const searchValue = model.value.trim()
      if (searchValue || props.minSearchLength === 0) {
        emit('search', searchValue)
      }
    }

    function onSuggestionSelect(suggestion: SearchSuggestion) {
      if (suggestion.disabled) return

      model.value = suggestion.value
      emit('suggestion-select', suggestion)
      emit('update:modelValue', suggestion.value)
      isMenuOpen.value = false

      if (props.autoSearch) {
        nextTick(() => {
          onSearch()
        })
      }
    }

    function onSearchButtonClick() {
      if (searchDisabled.value) return
      onSearch()
    }

    function onClear() {
      model.value = ''
      emit('clear')
      emit('update:modelValue', '')
      isMenuOpen.value = false
    }

    function onKeydown(e: KeyboardEvent) {
      if (e.key === 'Enter' && props.searchOnEnter) {
        e.preventDefault()
        onSearch()
        isMenuOpen.value = false
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (!isMenuOpen.value && filteredSuggestions.value.length > 0) {
          isMenuOpen.value = true
        }
      } else if (e.key === 'Escape') {
        isMenuOpen.value = false
      }
    }

    function onFocus() {
      if (
        filteredSuggestions.value.length > 0 &&
        model.value.length >= props.minSearchLength
      ) {
        isMenuOpen.value = true
      }
    }

    function onBlur(e: FocusEvent) {
      if (!listRef.value?.$el.contains(e.relatedTarget as HTMLElement)) {
        isMenuOpen.value = false
      }
    }

    watch(model, newValue => {
      if (
        newValue.length >= props.minSearchLength &&
        filteredSuggestions.value.length > 0
      ) {
        isMenuOpen.value = true
      } else {
        isMenuOpen.value = false
      }

      if (props.autoSearch && newValue.length >= props.minSearchLength) {
        onSearch()
      }
    })

    useRender(() => {
      const textFieldProps = omit(props, [
        'modelValue',
        'suggestions',
        'searchPosition',
        'searchIcon',
        'autoSearch',
        'searchOnEnter',
        'minSearchLength',
        'maxSuggestions',
        'menuProps',
        'filterSuggestions',
      ])

      function searchButton() {
        return !slots['search-button'] ? (
          <SPBtn
            aria-label="搜索"
            disabled={searchDisabled.value}
            flat
            height="100%"
            icon={props.searchIcon}
            key="search-btn"
            size="small"
            class="sp-input-srch__search-btn"
            onClick={onSearchButtonClick}
          />
        ) : (
          <SPDefaultsProvider
            key="search-button-defaults"
            defaults={{
              SPBtn: {
                disabled: searchDisabled.value,
                flat: true,
                height: '100%',
                size: 'small',
                icon: props.searchIcon,
                class: 'sp-input-srch__search-btn',
                style: {
                  backgroundColor: 'transparent !important',
                  borderRadius: '0 !important',
                  minWidth: 'auto !important',
                  padding: '0 12px !important',
                  whiteSpace: 'nowrap',
                },
              },
            }}
          >
            {slots['search-button']({
              props: {
                disabled: searchDisabled.value,
                onClick: onSearchButtonClick,
              },
            })}
          </SPDefaultsProvider>
        )
      }

      function searchControl() {
        return (
          <div
            class="sp-input-srch__control"
            onMousedown={(e: MouseEvent) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            onPointerdown={(e: PointerEvent) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            {searchButton()}
            <SPDivider vertical />
          </div>
        )
      }

      const prependInnerControl =
        props.searchPosition === 'prepend' ? searchControl() : undefined
      const appendInnerControl =
        props.searchPosition === 'append' ? (
          <>
            <SPDivider vertical />
            {searchButton()}
          </>
        ) : undefined

      const hasPrependInner = slots['prepend-inner'] || prependInnerControl
      const hasAppendInner = slots['append-inner'] || appendInnerControl

      return (
        <SPTextField
          ref={vTextFieldRef}
          {...textFieldProps}
          v-model={model.value}
          v-model:focused={isFocused.value}
          validationValue={model.value}
          placeholder={props.placeholder}
          clearable={props.clearable}
          onKeydown={onKeydown}
          onBlur={onBlur}
          {...{
            onFocus: onFocus
          }}
          class={[
            'sp-input-srch',
            {
              'sp-input-srch--inset': props.inset,
              'sp-input-srch--menu-active': shouldShowMenu.value,
              'sp-input-srch--prepend': props.searchPosition === 'prepend',
              'sp-input-srch--append': props.searchPosition === 'append',
            },
            props.class,
          ]}
          style={props.style}
          type="search"
        >
          {{
            ...slots,
            default: () => (
              <>
                {shouldShowMenu.value && (
                  <SPMenu
                    ref={spMenuRef}
                    v-model={isMenuOpen.value}
                    activator="parent"
                    contentClass="sp-input-srch__menu-content"
                    disabled={searchDisabled.value}
                    maxHeight={300}
                    openOnClick={false}
                    closeOnContentClick={false}
                    {...computedMenuProps.value}
                  >
                    <SPList
                      ref={listRef}
                      selectStrategy="single-independent"
                      aria-label="搜索建议"
                      density="compact"
                    >
                      {filteredSuggestions.value.map((suggestion, index) => (
                        <SPListItem
                          key={`${suggestion.value}-${index}`}
                          value={suggestion.value}
                          title={suggestion.text}
                          subtitle={suggestion.description}
                          disabled={suggestion.disabled}
                          onClick={() => onSuggestionSelect(suggestion)}
                        >
                          {{
                            prepend: () =>
                              suggestion.icon && (
                                <span class="sp-input-srch__suggestion-icon">
                                  {suggestion.icon}
                                </span>
                              ),
                            append: () =>
                              suggestion.category && (
                                <span class="sp-input-srch__suggestion-category">
                                  {suggestion.category}
                                </span>
                              ),
                          }}
                        </SPListItem>
                      ))}
                    </SPList>
                  </SPMenu>
                )}
              </>
            ),
            'prepend-inner': hasPrependInner
              ? (slotProps: any) => (
                  <>
                    {prependInnerControl}
                    {slots['prepend-inner']?.(slotProps)}
                  </>
                )
              : undefined,
            'append-inner': hasAppendInner
              ? (slotProps: any) => (
                  <>
                    {slots['append-inner']?.(slotProps)}
                    {appendInnerControl}
                  </>
                )
              : undefined,
          }}
        </SPTextField>
      )
    })

    return forwardRefs({}, vTextFieldRef)
  },
})

export type SPInputSrch = InstanceType<typeof SPInputSrch>
