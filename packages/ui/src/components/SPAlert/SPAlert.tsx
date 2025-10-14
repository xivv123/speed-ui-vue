// Styles
import './SPAlert.sass'

// Components
import { SPAlertTitle } from './SPAlertTitle'
import { SPBtn } from '@/components/SPBtn'
import { SPDefaultsProvider } from '@/components/SPDefaultsProvider'
import SpIcon from '../icon/Icon'

// Composables
import { useTextColor } from '@/composables/color'
import { useDensity } from '@/composables/density'
import { useDimension } from '@/composables/dimensions'
import { useElevation } from '@/composables/elevation'
import { useLocale } from '@/composables/locale'
import { useLocation } from '@/composables/location'
import { usePosition } from '@/composables/position'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useRounded } from '@/composables/rounded'
import { provideTheme } from '@/composables/theme'
import { genOverlays, useVariant } from '@/composables/variant'

// Utilities
import { toRef } from 'vue'
import { genericComponent } from '@/utils'

// Props
import { makeVAlertProps } from './props'

export type VAlertSlots = {
  default: never
  prepend: never
  title: never
  text: never
  append: never
  close: { props: Record<string, any> }
}

export const SPAlert = genericComponent<VAlertSlots>()({
  name: 'SPAlert',

  props: makeVAlertProps(),

  emits: {
    'click:close': (e: MouseEvent) => true,
    'update:modelValue': (value: boolean) => true,
  },

  setup(props, { emit, slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const icon = toRef(() => {
      if (props.icon === false) return undefined
      if (!props.type) return props.icon

      return props.icon ?? `$${props.type}`
    })

    // const { iconSize } = useIconSizes(props, () => props.prominent ? 44 : undefined)
    const { themeClasses } = provideTheme(props)
    const { colorClasses, colorStyles, variantClasses } = useVariant(
      () => ({
        color: props.color ?? props.type,
        variant: props.variant,
      }),
      'sp-alert'
    )
    const { densityClasses } = useDensity(props, 'sp-alert')
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { locationStyles } = useLocation(props)
    const { positionClasses } = usePosition(props)
    const { roundedClasses } = useRounded(props, 'sp-alert')
    const { textColorClasses, textColorStyles } = useTextColor(
      () => props.borderColor
    )
    const { t } = useLocale()

    const closeProps = toRef(() => ({
      'aria-label': t(props.closeLabel),
      onClick(e: MouseEvent) {
        isActive.value = false

        emit('click:close', e)
      },
    }))

    return () => {
      const hasPrepend = !!(slots.prepend || icon.value)
      const hasTitle = !!(slots.title || props.title)
      const hasClose = !!(slots.close || props.closable)
      const Tag = props.tag as any
      const iconProps = {
        density: props.density,
        name: icon.value,
        // size: props.iconSize || props.prominent
        //   ? iconSize.value
        //   : undefined,
      }

      return (
        isActive.value && (
          <Tag
            class={[
              'sp-alert',
              props.border && {
                'sp-alert--border': !!props.border,
                [`sp-alert--border-${
                  props.border === true ? 'start' : props.border
                }`]: true,
              },
              {
                'sp-alert--prominent': props.prominent,
              },
              themeClasses.value,
              colorClasses.value,
              densityClasses.value,
              elevationClasses.value,
              positionClasses.value,
              roundedClasses.value,
              variantClasses.value,
              props.class,
            ]}
            style={[
              colorStyles.value,
              dimensionStyles.value,
              locationStyles.value,
              props.style,
            ]}
            role="alert"
          >
            {genOverlays(false, 'sp-alert')}

            {props.border && (
              <div
                key="border"
                class={['sp-alert__border', textColorClasses.value]}
                style={textColorStyles.value}
              />
            )}

            {hasPrepend && (
              <div
                key="prepend"
                class="sp-alert__prepend"
              >
                {!slots.prepend ? (
                  icon.value && (
                    <SpIcon
                      key="prepend-icon"
                      name={icon.value as string}
                    />
                  )
                ) : (
                  <SPDefaultsProvider
                    key="prepend-defaults"
                    disabled={!icon.value}
                    defaults={{ SpIcon: { ...iconProps } }}
                    v-slots:default={slots.prepend}
                  />
                )}
              </div>
            )}

            <div class="sp-alert__content">
              {hasTitle && (
                <SPAlertTitle key="title">
                  {slots.title?.() ?? props.title}
                </SPAlertTitle>
              )}

              {slots.text?.() ?? props.text}

              {slots.default?.()}
            </div>

            {slots.append && (
              <div
                key="append"
                class="sp-alert__append"
              >
                {slots.append()}
              </div>
            )}

            {hasClose && (
              <div
                key="close"
                class="sp-alert__close"
              >
                {!slots.close ? (
                  <SPBtn
                    key="close-btn"
                    icon={props.closeIcon}
                    size="x-small"
                    variant="text"
                    {...closeProps.value}
                  />
                ) : (
                  <SPDefaultsProvider
                    key="close-defaults"
                    defaults={{
                      SPBtn: {
                        icon: props.closeIcon,
                        size: 'x-small',
                        variant: 'text',
                      },
                    }}
                  >
                    {slots.close?.({ props: closeProps.value })}
                  </SPDefaultsProvider>
                )}
              </div>
            )}
          </Tag>
        )
      )
    }
  },
})

export type SPAlert = InstanceType<typeof SPAlert>
