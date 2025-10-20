// Styles
import './SPList.sass'

// Components
import { makeSPListProps } from './props'

// Internal
import { useListItems, SPListChildren } from './internal'

// Composables
import { createList } from './list'
import { useBorder } from '@/composables/border'
import { useBackgroundColor } from '@/composables/color'
import { provideDefaults } from '@/composables/defaults'
import { useDensity } from '@/composables/density'
import { useDimension } from '@/composables/dimensions'
import { useElevation } from '@/composables/elevation'
import { useNested } from '@/composables/nested/nested'
import { useRounded } from '@/composables/rounded'
import { provideTheme } from '@/composables/theme'

// Utilities
import { ref, shallowRef, toRef } from 'vue'
import { focusChild, genericComponent, useRender } from '@/utils'

// Types
import type { SPListChildrenSlots } from './internal/SPListChildren'
import type { GenericProps, SelectItemKey } from '@/utils'

type ItemType<T> = T extends readonly (infer U)[] ? U : never

export const SPList = genericComponent<new <
  T extends readonly any[],
  S = unknown,
  O = unknown
>(
  props: {
    items?: T
    itemTitle?: SelectItemKey<ItemType<T>>
    itemValue?: SelectItemKey<ItemType<T>>
    itemChildren?: SelectItemKey<ItemType<T>>
    itemProps?: SelectItemKey<ItemType<T>>
    selected?: S
    'onUpdate:selected'?: (value: S) => void
    'onClick:open'?: (value: { id: unknown, value: boolean, path: unknown[] }) => void
    'onClick:select'?: (value: { id: unknown, value: boolean, path: unknown[] }) => void
    opened?: O
    'onUpdate:opened'?: (value: O) => void
  },
  slots: SPListChildrenSlots<ItemType<T>>
) => GenericProps<typeof props, typeof slots>>()({
  name: 'SPList',

  props: makeSPListProps(),

  emits: {
    'update:selected': (value: unknown) => true,
    'update:activated': (value: unknown) => true,
    'update:opened': (value: unknown) => true,
    'click:open': (value: { id: unknown, value: boolean, path: unknown[] }) => true,
    'click:activate': (value: { id: unknown, value: boolean, path: unknown[] }) => true,
    'click:select': (value: { id: unknown, value: boolean, path: unknown[] }) => true,
    keydown: (e: KeyboardEvent) => true,
    focusin: (e: FocusEvent) => true,
  },

  setup (props, { slots, emit }) {
    const { items } = useListItems(props)
    const { themeClasses } = provideTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.bgColor)
    const { borderClasses } = useBorder(props)
    const { densityClasses } = useDensity(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)
    const { children, open, parents, select, getPath } = useNested(props)
    const lineClasses = toRef(() => props.lines ? `sp-list--${props.lines}-line` : undefined)
    const activeColor = toRef(() => props.activeColor)
    const baseColor = toRef(() => props.baseColor)
    const color = toRef(() => props.color)

    createList({
      filterable: props.filterable,
    })

    provideDefaults({
      SPListGroup: {
        activeColor,
        baseColor,
        color,
        expandIcon: toRef(() => props.expandIcon),
        collapseIcon: toRef(() => props.collapseIcon),
      },
      SPListItem: {
        activeClass: toRef(() => props.activeClass),
        activeColor,
        baseColor,
        color,
        density: toRef(() => props.density),
        disabled: toRef(() => props.disabled),
        lines: toRef(() => props.lines),
        nav: toRef(() => props.nav),
        slim: toRef(() => props.slim),
        variant: toRef(() => props.variant),
      },
    })

    const isFocused = shallowRef(false)
    const contentRef = ref<HTMLElement>()
    function onFocusin (e: FocusEvent) {
      emit('focusin', e)
      isFocused.value = true
    }

    function onFocusout (e: FocusEvent) {
      isFocused.value = false
    }

    function onFocus (e: FocusEvent) {
      if (
        !isFocused.value &&
        !(e.relatedTarget && contentRef.value?.contains(e.relatedTarget as Node))
      ) focus()
    }

    function onKeydown (e: KeyboardEvent) {
      emit('keydown', e)
      
      const target = e.target as HTMLElement

      if (!contentRef.value ||
        (target.tagName === 'INPUT' && ['Home', 'End'].includes(e.key)) ||
        target.tagName === 'TEXTAREA') {
        return
      }

      if (e.key === 'ArrowDown') {
        focus('next')
      } else if (e.key === 'ArrowUp') {
        focus('prev')
      } else if (e.key === 'Home') {
        focus('first')
      } else if (e.key === 'End') {
        focus('last')
      } else {
        return
      }

      e.preventDefault()
    }

    function onMousedown (e: MouseEvent) {
      isFocused.value = true
    }

    function focus (location?: 'next' | 'prev' | 'first' | 'last' | number) {
      if (contentRef.value) {
        return focusChild(contentRef.value, location)
      }
    }

    useRender(() => {
      const Tag = props.tag as any
      return (
        <Tag
          ref={ contentRef }
          class={[
            'sp-list',
            {
              'sp-list--disabled': props.disabled,
              'sp-list--nav': props.nav,
              'sp-list--slim': props.slim,
            },
            themeClasses.value,
            backgroundColorClasses.value,
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            lineClasses.value,
            roundedClasses.value,
            props.class,
          ]}
          style={[
            backgroundColorStyles.value,
            dimensionStyles.value,
            props.style,
          ]}
          tabindex={ props.tabindex ?? (props.disabled ? -1 : 0) }
          role="listbox"
          aria-activedescendant={ undefined }
          onFocusin={ onFocusin }
          onFocusout={ onFocusout }
          onFocus={ onFocus }
          onKeydown={ onKeydown }
          onMousedown={ onMousedown }
        >
          <SPListChildren
            items={ items.value }
            returnObject={ props.returnObject }
            v-slots={ slots }
          />
        </Tag>
      )
    })

    return {
      open,
      select,
      focus,
      children,
      parents,
      getPath,
    }
  },
})

export type SPList = InstanceType<typeof SPList>
