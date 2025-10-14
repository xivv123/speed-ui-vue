/* eslint-disable complexity */

// Styles
import './style/SPCard.scss'

// Components
import { SPCardActions, SPCardItem, SPCardText } from './internal'
// import { SPDefaultsProvider } from '@/components/SPDefaultsProvider' // temporarily disabled
// import { VImg } from '@/components/VImg' // temporarily disabled, component missing

// Composables
import { useBorder } from '@/composables/border'
import { useDensity } from '@/composables/density'
import { useDimension } from '@/composables/dimensions'
import { useElevation } from '@/composables/elevation'
import { LoaderSlot, useLoader } from '@/composables/loader'
import { useLocation } from '@/composables/location'
import { makeSPCardProps } from './props'
import type { SPCardSlots } from './types'
import { usePosition } from '@/composables/position'
import { useRounded } from '@/composables/rounded'
import { useLink } from '@/composables/router'
import { provideTheme } from '@/composables/theme'
import { genOverlays, useVariant } from '@/composables/variant'

// Directives
// import vRipple from '@/directives/ripple'

// Utilities
import { genericComponent, useRender } from '@/utils'

// Types
// import type { RippleDirectiveBinding } from '@/directives/ripple'

export { makeSPCardProps } from './props'
export type { SPCardSlots } from './types'

export const SPCard = genericComponent<SPCardSlots>()({
  name: 'SPCard',

  // directives: { vRipple },

  props: makeSPCardProps(),

  setup(props, { attrs, slots }) {
    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props, 'sp-card')
    const { colorClasses, colorStyles, variantClasses } = useVariant(
      props,
      'sp-card'
    )
    const { densityClasses } = useDensity(props, 'sp-card')
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { loaderClasses } = useLoader(props, 'sp-card')
    const { locationStyles } = useLocation(props)
    const { positionClasses } = usePosition(props, 'sp-card')
    const { roundedClasses } = useRounded(props, 'sp-card')
    const link = useLink(props, attrs)

    useRender(() => {
      const isLink = props.link !== false && link.isLink.value
      const isClickable =
        !props.disabled &&
        props.link !== false &&
        (props.link || link.isClickable.value)
      const hasTitle = !!(slots.title || props.title != null)
      const hasSubtitle = !!(slots.subtitle || props.subtitle != null)
      const hasHeader = hasTitle || hasSubtitle
      const hasAppend = !!(
        slots.append ||
        props.appendAvatar ||
        props.appendIcon
      )
      const hasPrepend = !!(
        slots.prepend ||
        props.prependAvatar ||
        props.prependIcon
      )
      const hasImage = !!(slots.image || props.image)
      const hasCardItem = hasHeader || hasPrepend || hasAppend
      const hasText = !!(slots.text || props.text != null)
      // const Tag = isLink ? 'a' : (props.tag || 'div')
      const Tag = props.tag as any 
      return (
        <Tag
          class={[
            'sp-card',
            {
              'sp-card--disabled': props.disabled,
              'sp-card--flat': props.flat,
              'sp-card--hover': props.hover && !(props.disabled || props.flat),
              'sp-card--link': isClickable,
            },
            themeClasses.value,
            borderClasses.value,
            colorClasses.value,
            densityClasses.value,
            elevationClasses.value,
            loaderClasses.value,
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
          onClick={isClickable && link.navigate}
          // v-ripple={isClickable && props.ripple}
          tabindex={props.disabled ? -1 : undefined}
          {...link.linkProps}
        >
          {/* Temporarily disable image feature because VImg component is missing */}
          {hasImage && (
            <div
              key="image"
              class="sp-card__image"
            >
              {!slots.image ? (
                <img
                  key="image-img"
                  src={props.image}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  alt=""
                />
              ) : (
                <div key="image-slot">{slots.image?.()}</div>
              )}
            </div>
          )}

          <LoaderSlot
            name="sp-card"
            active={!!props.loading}
            color={
              typeof props.loading === 'boolean' ? undefined : props.loading
            }
            v-slots={{ default: slots.loader }}
          />

          {hasCardItem && (
            <SPCardItem
              key="item"
              prependAvatar={props.prependAvatar}
              prependIcon={props.prependIcon}
              title={props.title}
              subtitle={props.subtitle}
              appendAvatar={props.appendAvatar}
              appendIcon={props.appendIcon}
            >
              {{
                default: slots.item,
                prepend: slots.prepend,
                title: slots.title,
                subtitle: slots.subtitle,
                append: slots.append,
              }}
            </SPCardItem>
          )}

          {hasText && (
            <SPCardText key="text">{slots.text?.() ?? props.text}</SPCardText>
          )}

          {slots.default?.()}

          {slots.actions && (
            <SPCardActions v-slots={{ default: slots.actions }} />
          )}

          {genOverlays(isClickable, 'sp-card')}
        </Tag>
      )
    })

    return {}
  },
})

export type SPCard = InstanceType<typeof SPCard>


