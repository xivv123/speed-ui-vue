// Styles
import './SPListItem.sass'

// Components
import { SPListItemSubtitle } from './internal/SPListItemSubtitle'
import { SPListItemTitle } from './internal/SPListItemTitle'
import { SPDefaultsProvider } from '@/components/SPDefaultsProvider'
import SpIcon from '../icon/Icon'

// Composables
import { useList } from './list'
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { IconValue } from '@/composables/icons'
import { useNestedItem } from '@/composables/nested/nested'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeRouterProps, useLink } from '@/composables/router'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import {
  genOverlays,
  makeVariantProps,
  useVariant,
} from '@/composables/variant'

// Directives
// import vRipple from '@/directives/ripple'

// Utilities
import { computed, onBeforeMount, toDisplayString, toRef, watch } from 'vue'
import {
  deprecate,
  EventProp,
  genericComponent,
  propsFactory,
  useRender,
} from '@/utils'

// Types
import type { PropType } from 'vue'
// import type { RippleDirectiveBinding } from '@/directives/ripple'

export type ListItemSlot = {
  index?: number
  depth?: number
  path?: number[]
  isFirst?: boolean
  isLast?: boolean
  isActive: boolean
  isOpen: boolean
  isSelected: boolean
  isIndeterminate: boolean
  select: (value: boolean) => void
}

export type ListItemTitleSlot = {
  title?: string | number | boolean
}

export type ListItemSubtitleSlot = {
  subtitle?: string | number | boolean
}

export type SPListItemSlots = {
  prepend: ListItemSlot
  append: ListItemSlot
  default: ListItemSlot
  title: ListItemTitleSlot
  subtitle: ListItemSubtitleSlot
}

export const makeSPListItemProps = propsFactory(
  {
    active: {
      type: Boolean,
      default: undefined,
    },
    activeClass: String,
    /* @deprecated */
    activeColor: String,
    appendAvatar: String,
    appendIcon: IconValue,
    baseColor: String,
    disabled: Boolean,
    lines: [Boolean, String] as PropType<'one' | 'two' | 'three' | false>,
    link: {
      type: Boolean,
      default: undefined,
    },
    nav: Boolean,
    prependAvatar: String,
    prependIcon: IconValue,
    // ripple: {
    //   type: [Boolean, Object] as PropType<RippleDirectiveBinding['value']>,
    //   default: true,
    // },
    slim: Boolean,
    subtitle: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    title: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    value: null,

    onClick: EventProp<[MouseEvent | KeyboardEvent]>(),
    onClickOnce: EventProp<[MouseEvent]>(),

    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'text' } as const),
  },
  'SPListItem'
)

export const SPListItem = genericComponent<SPListItemSlots>()({
  name: 'SPListItem',

  // directives: { vRipple },

  props: makeSPListItemProps(),

  emits: {
    click: (e: MouseEvent | KeyboardEvent) => true,
  },

  setup(props, { attrs, slots, emit }) {
    const link = useLink(props, attrs)
    const id = computed(() =>
      props.value === undefined ? link.href.value : props.value
    )
    const {
      activate,
      isActivated,
      select,
      isOpen,
      isSelected,
      isIndeterminate,
      isGroupActivator,
      root,
      parent,
      openOnSelect,
      id: uid,
    } = useNestedItem(id, () => props.disabled, false)
    const list = useList()
    const isActive = computed(
      () =>
        props.active !== false &&
        (props.active ||
          link.isActive?.value ||
          (root.activatable.value ? isActivated.value : isSelected.value))
    )
    const isLink = toRef(() => props.link !== false && link.isLink.value)
    const isSelectable = computed(
      () =>
        !!list &&
        (root.selectable.value || root.activatable.value || props.value != null)
    )
    const isClickable = computed(
      () =>
        !props.disabled &&
        props.link !== false &&
        (props.link || link.isClickable.value || isSelectable.value)
    )

    const roundedProps = toRef(() => props.rounded || props.nav)
    const color = toRef(() => props.color ?? props.activeColor)
    const variantProps = toRef(() => ({
      color: isActive.value ? color.value ?? props.baseColor : props.baseColor,
      variant: props.variant,
    }))

    // useNestedItem doesn't call register until beforeMount,
    // so this can't be an immediate watcher as we don't know parent yet
    watch(
      () => link.isActive?.value,
      val => {
        if (!val) return
        handleActiveLink()
      }
    )
    onBeforeMount(() => {
      if (link.isActive?.value) handleActiveLink()
    })
    function handleActiveLink() {
      if (parent.value != null) {
        root.open(parent.value, true)
      }
      openOnSelect(true)
    }

    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props, 'sp-list')
    const { colorClasses, colorStyles, variantClasses } = useVariant(
      variantProps,
      'sp-list-item'
    )
    const { densityClasses } = useDensity(props, 'sp-list-item')
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(roundedProps, 'sp-list-item')
    const lineClasses = toRef(() =>
      props.lines ? `sp-list-item--${props.lines}-line` : undefined
    )
    // const rippleOptions = toRef(() =>
    //   (
    //     props.ripple !== undefined &&
    //     !!props.ripple &&
    //     list?.filterable
    //   )
    //     ? { keys: ['Enter'] }
    //     : props.ripple
    // )

    const slotProps = computed(
      () =>
        ({
          isActive: isActive.value,
          select,
          isOpen: isOpen.value,
          isSelected: isSelected.value,
          isIndeterminate: isIndeterminate.value,
        } satisfies ListItemSlot)
    )

    function onClick(e: MouseEvent) {
      emit('click', e)
      if (['INPUT', 'TEXTAREA'].includes((e.target as Element)?.tagName)) return

      if (!isClickable.value) return

      link.navigate?.(e)

      if (isGroupActivator) return

      if (root.activatable.value) {
        activate(!isActivated.value, e)
      } else if (root.selectable.value) {
        select(!isSelected.value, e)
      } else if (props.value != null) {
        select(!isSelected.value, e)
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement

      if (['INPUT', 'TEXTAREA'].includes(target.tagName)) return

      if (e.key === 'Enter' || (e.key === ' ' && !list?.filterable)) {
        e.preventDefault()
        e.stopPropagation()
        e.target!.dispatchEvent(new MouseEvent('click', e))
      }
    }

    useRender(() => {
      // const Tag = isLink.value ? 'a' : props.tag
      const Tag = props.tag as any
      const hasTitle = slots.title || props.title != null
      const hasSubtitle = slots.subtitle || props.subtitle != null
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon)
      const hasAppend = !!(hasAppendMedia || slots.append)
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon)
      const hasPrepend = !!(hasPrependMedia || slots.prepend)

      list?.updateHasPrepend(hasPrepend)

      if (props.activeColor) {
        deprecate('active-color', ['color', 'base-color'])
      }

      return (
        <Tag
          class={[
            'sp-list-item',
            {
              'sp-list-item--active': isActive.value,
              'sp-list-item--disabled': props.disabled,
              'sp-list-item--link': isClickable.value,
              'sp-list-item--nav': props.nav,
              'sp-list-item--prepend': !hasPrepend && list?.hasPrepend.value,
              'sp-list-item--slim': props.slim,
              [`${props.activeClass}`]: props.activeClass && isActive.value,
            },
            themeClasses.value,
            borderClasses.value,
            colorClasses.value,
            densityClasses.value,
            elevationClasses.value,
            lineClasses.value,
            roundedClasses.value,
            variantClasses.value,
            props.class,
          ]}
          style={[colorStyles.value, dimensionStyles.value, props.style]}
          tabindex={isClickable.value ? (list ? -2 : 0) : undefined}
          aria-selected={
            isSelectable.value
              ? root.activatable.value
                ? isActivated.value
                : root.selectable.value
                ? isSelected.value
                : isActive.value
              : undefined
          }
          onClick={onClick}
          onKeydown={isClickable.value && !isLink.value && onKeyDown}
          // v-ripple={ isClickable.value && rippleOptions.value }
          {...link.linkProps}
        >
          {genOverlays(isClickable.value || isActive.value, 'sp-list-item')}

          {hasPrepend && (
            <div
              key="prepend"
              class="sp-list-item__prepend"
            >
              {!slots.prepend ? (
                <>
                  {props.prependIcon && (
                    <SpIcon
                      key="prepend-icon"
                      name={props.prependIcon as string}
                    />
                  )}
                </>
              ) : (
                <SPDefaultsProvider
                  key="prepend-defaults"
                  disabled={!hasPrependMedia}
                  defaults={{
                    SpIcon: {
                      density: props.density,
                      icon: props.prependIcon,
                    },
                    SPListItemAction: {
                      start: true,
                    },
                  }}
                >
                  {slots.prepend?.(slotProps.value)}
                </SPDefaultsProvider>
              )}

              <div class="sp-list-item__spacer" />
            </div>
          )}

          <div
            class="sp-list-item__content"
            data-no-activator=""
          >
            {hasTitle && (
              <SPListItemTitle key="title">
                {slots.title?.({ title: props.title }) ??
                  toDisplayString(props.title)}
              </SPListItemTitle>
            )}

            {hasSubtitle && (
              <SPListItemSubtitle key="subtitle">
                {slots.subtitle?.({ subtitle: props.subtitle }) ??
                  toDisplayString(props.subtitle)}
              </SPListItemSubtitle>
            )}

            {slots.default?.(slotProps.value)}
          </div>

          {hasAppend && (
            <div
              key="append"
              class="sp-list-item__append"
            >
              {!slots.append ? (
                <>
                  {props.appendIcon && (
                    <SpIcon
                      key="append-icon"
                      name={props.appendIcon as string}
                    />
                  )}
                </>
              ) : (
                <SPDefaultsProvider
                  key="append-defaults"
                  disabled={!hasAppendMedia}
                  defaults={{
                    SpIcon: {
                      density: props.density,
                      icon: props.appendIcon,
                    },
                    SPListItemAction: {
                      end: true,
                    },
                  }}
                >
                  {slots.append?.(slotProps.value)}
                </SPDefaultsProvider>
              )}

              <div class="sp-list-item__spacer" />
            </div>
          )}
        </Tag>
      )
    })

    return {
      activate,
      isActivated,
      isGroupActivator,
      isSelected,
      list,
      select,
      root,
      id: uid,
      link,
    }
  },
})

export type SPListItem = InstanceType<typeof SPListItem>
