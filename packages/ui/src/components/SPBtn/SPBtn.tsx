// Styles
import './style/SPBtn.scss'

// Props & Types
import { makeVBtnProps } from './props'
import type { VBtnSlots } from './types'

// Components
// import { VBtnToggleSymbol } from '@/components/VBtnToggle/VBtnToggle'
import { SPDefaultsProvider } from '../SPDefaultsProvider'
import SpIcon from '../icon/Icon'
import { SPProgCir } from '../SPProgCir'

// Composables
import { useBorder } from '@/composables/border'
import { useDensity } from '@/composables/density'
import { useDimension } from '@/composables/dimensions'
import { useElevation } from '@/composables/elevation'
import { useGroupItem } from '@/composables/group'
import { useLoader } from '@/composables/loader'
import { useLocation } from '@/composables/location'
import { usePosition } from '@/composables/position'
import { useRounded } from '@/composables/rounded'
// import { makeRouterProps, useLink } from '@/composables/router'
// import { useSelectLink } from '@/composables/selectLink'
import { useSize } from '@/composables/size'
import { provideTheme } from '@/composables/theme'
import { genOverlays, useVariant } from '@/composables/variant'

// Directives
// import vRipple from '@/directives/ripple'

// Utilities
import { computed, toDisplayString, toRef } from 'vue'
import { genericComponent, useRender } from '@/utils'

// Types
// import type { RippleDirectiveBinding } from '@/directives/ripple'

export const SPBtn = genericComponent<VBtnSlots>()({
  name: 'SPBtn',

  props: makeVBtnProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
    click: (e: MouseEvent) => true,
  },

  setup(props, { attrs, slots, emit }) {
    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props)
    const { densityClasses } = useDensity(props, 'sp-btn')
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { loaderClasses } = useLoader(props)
    const { locationStyles } = useLocation(props)
    const { positionClasses } = usePosition(props)
    const { roundedClasses } = useRounded(props)
    const { sizeClasses, sizeStyles } = useSize(props, 'sp-btn')
    const group = useGroupItem(props, props.symbol, false)
    // const link = useLink(props, attrs)

    const isActive = computed(() => {
      if (props.active !== undefined) {
        return props.active
      }

      // if (link.isLink.value) {
      //   return link.isActive?.value
      // }

      return group?.isSelected.value
    })

    const color = toRef(() =>
      isActive.value ? props.activeColor ?? props.color : props.color
    )
    const variantProps = computed(() => {
      // const showColor =
      //   (group?.isSelected.value &&
      //     (!link.isLink.value || link.isActive?.value)) ||
      //   !group ||
      //   link.isActive?.value
      return {
        color: color.value ?? props.baseColor,
        variant: props.variant,
      }
    })
    const { colorClasses, colorStyles, variantClasses } = useVariant(
      variantProps,
      'sp-btn'
    )

    const isDisabled = computed(() => group?.disabled.value || props.disabled)
    const isElevated = toRef(() => {
      return (
        props.variant === 'elevated' &&
        !(props.disabled || props.flat || props.border)
      )
    })
    const valueAttr = computed(() => {
      if (props.value === undefined || typeof props.value === 'symbol')
        return undefined

      return Object(props.value) === props.value
        ? JSON.stringify(props.value, null, 0)
        : props.value
    })

    function onClick(e: MouseEvent) {
      // if (
      //   isDisabled.value ||
      //   (link.isLink.value &&
      //     (e.metaKey ||
      //       e.ctrlKey ||
      //       e.shiftKey ||
      //       e.button !== 0 ||
      //       attrs.target === '_blank'))
      // )
      //   return
      // link.navigate?.(e)
      // group?.toggle()
      emit('click', e)
    }

    // useSelectLink(link, group?.select)

    useRender(() => {
      const Tag = props.tag as any //link.isLink.value ? 'a' : props.tag
      const hasPrepend = !!(props.prependIcon || slots.prepend)
      const hasAppend = !!(props.appendIcon || slots.append)
      const hasIcon = !!(props.icon && props.icon !== true)

      return (
        <Tag
          type={Tag === 'a' ? undefined : 'button'}
          class={[
            'sp-btn',
            group?.selectedClass.value,
            {
              'sp-btn--active': isActive.value,
              'sp-btn--block': props.block,
              'sp-btn--disabled': isDisabled.value,
              'sp-btn--elevated': isElevated.value,
              'sp-btn--flat': props.flat,
              'sp-btn--icon': !!props.icon,
              'sp-btn--loading': props.loading,
              'sp-btn--readonly': props.readonly,
              'sp-btn--slim': props.slim,
              'sp-btn--stacked': props.stacked,
            },
            themeClasses.value,
            borderClasses.value,
            colorClasses.value,
            densityClasses.value,
            elevationClasses.value,
            loaderClasses.value,
            positionClasses.value,
            roundedClasses.value,
            sizeClasses.value,
            variantClasses.value,
            props.class,
          ]}
          style={[
            colorStyles.value,
            dimensionStyles.value,
            locationStyles.value,
            sizeStyles.value,
            props.style,
          ]}
          aria-busy={props.loading ? true : undefined}
          disabled={isDisabled.value || undefined}
          tabindex={props.loading || props.readonly ? -1 : undefined}
          onClick={onClick}
          value={valueAttr.value}
          {...attrs}
          // {...link.linkProps}
        >
          {genOverlays(true, 'sp-btn')}

          {!props.icon && hasPrepend && (
            <span
              key="prepend"
              class="sp-btn__prepend"
            >
              {!slots.prepend ? (
                <SpIcon
                  key="prepend-icon"
                  name={
                    typeof props.prependIcon === 'string'
                      ? props.prependIcon
                      : String(props.prependIcon || '')
                  }
                />
              ) : (
                <SPDefaultsProvider
                  key="prepend-defaults"
                  disabled={!props.prependIcon}
                  defaults={{
                    SpIcon: {
                      name: props.prependIcon,
                    },
                  }}
                  v-slots:default={slots.prepend}
                />
              )}
            </span>
          )}

          <span
            class="sp-btn__content"
            data-no-activator=""
          >
            {!slots.default && hasIcon ? (
              <SpIcon
                key="content-icon"
                name={
                  typeof props.icon === 'string'
                    ? props.icon
                    : String(props.icon || '')
                }
              />
            ) : (
              <SPDefaultsProvider
                key="content-defaults"
                disabled={!hasIcon}
                defaults={{
                  VIcon: {
                    icon: props.icon,
                  },
                }}
              >
                {slots.default?.() ?? toDisplayString(props.text)}
              </SPDefaultsProvider>
            )}
          </span>

          {!props.icon && hasAppend && (
            <span
              key="append"
              class="sp-btn__append"
            >
              {!slots.append ? (
                <SpIcon
                  key="append-icon"
                  name={
                    typeof props.appendIcon === 'string'
                      ? props.appendIcon
                      : String(props.appendIcon || '')
                  }
                />
              ) : (
                <SPDefaultsProvider
                  key="append-defaults"
                  disabled={!props.appendIcon}
                  defaults={{
                    VIcon: {
                      icon: props.appendIcon,
                    },
                  }}
                  v-slots:default={slots.append}
                />
              )}
            </span>
          )}

          {!!props.loading && (
            <span
              key="loader"
              class="sp-btn__loader"
            >
              {slots.loader?.() ?? (
                <SPProgCir
                  color={
                    typeof props.loading === 'boolean'
                      ? undefined
                      : props.loading
                  }
                  indeterminate
                  width="2"
                />
              )}
            </span>
          )}
        </Tag>
      )
    })

    return { group }
  },
})

export type SPBtn = InstanceType<typeof SPBtn>
