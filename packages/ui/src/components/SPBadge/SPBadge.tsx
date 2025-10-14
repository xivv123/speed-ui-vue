// Styles
import './style/SPBadge.scss'

// Props & Types
import { makeSPBadgeProps } from './props'
import type { SPBadgeSlots } from './types'

// Components
import SpIcon from '../icon/Icon'

// Composables
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { useDimension } from '@/composables/dimensions'
import { useLocale } from '@/composables/locale'
import { useLocation } from '@/composables/location'
import { useRounded } from '@/composables/rounded'
import { useTheme } from '@/composables/theme'
import { MaybeTransition } from '@/composables/transition'
import type { LocationProps } from '@/composables/location'

// Utilities
import { genericComponent, pickWithRest, useRender } from '@/utils'

export const SPBadge = genericComponent<SPBadgeSlots>()({
  name: 'SPBadge',

  inheritAttrs: false,

  props: makeSPBadgeProps(),

  setup(props, ctx) {
    const { backgroundColorClasses, backgroundColorStyles } =
      useBackgroundColor(() => props.color)
    const { roundedClasses } = useRounded(props)
    const { t } = useLocale()
    const { textColorClasses, textColorStyles } = useTextColor(
      () => props.textColor
    )
    const { themeClasses } = useTheme()

    const { locationStyles } = useLocation(props as LocationProps, true, side => {
      const base = props.floating ? (props.dot ? 2 : 4) : props.dot ? 8 : 12

      return (
        base +
        (['top', 'bottom'].includes(side)
          ? Number(props.offsetY ?? 0)
          : ['left', 'right'].includes(side)
          ? Number(props.offsetX ?? 0)
          : 0)
      )
    })

    const { dimensionStyles } = useDimension(props)

    useRender(() => {
      const value = Number(props.content)
      const content =
        !props.max || isNaN(value)
          ? props.content
          : value <= Number(props.max)
          ? value
          : `${props.max}+`

      const [badgeAttrs, attrs] = pickWithRest(
        ctx.attrs as Record<string, any>,
        ['aria-atomic', 'aria-label', 'aria-live', 'role', 'title']
      )

      const Tag = props.tag as any

      return (
        <Tag
          class={[
            'sp-badge',
            {
              'sp-badge--bordered': props.bordered,
              'sp-badge--dot': props.dot,
              'sp-badge--floating': props.floating,
              'sp-badge--inline': props.inline,
            },
            props.class,
          ]}
          {...attrs}
          style={props.style}
        >
          <div class="sp-badge__wrapper">
            {ctx.slots.default?.()}

            <MaybeTransition transition={props.transition}>
              <span
                v-show={props.modelValue}
                class={[
                  'sp-badge__badge',
                  themeClasses.value,
                  backgroundColorClasses.value,
                  roundedClasses.value,
                  textColorClasses.value,
                ]}
                style={[
                  backgroundColorStyles.value,
                  textColorStyles.value,
                  dimensionStyles.value,
                  props.inline ? {} : locationStyles.value,
                ]}
                aria-atomic="true"
                aria-label={props.label != null ? t(String(props.label), value) : undefined}
                aria-live="polite"
                role="status"
                {...badgeAttrs}
              >
                {props.dot ? undefined : ctx.slots.badge ? (
                  ctx.slots.badge?.()
                ) : props.icon ? (
                  <SpIcon
                    name={
                      typeof props.icon === 'string'
                        ? props.icon
                        : String(props.icon || '')
                    }
                  />
                ) : (
                  content
                )}
              </span>
            </MaybeTransition>
          </div>
        </Tag>
      )
    })

    return {}
  },
})

export type SPBadge = InstanceType<typeof SPBadge>
