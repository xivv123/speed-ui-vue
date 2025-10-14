import { propsFactory, omit } from '@/utils'
import { makeSPOverlayProps } from '@/components/SPOverlay/SPOverlay'

export const makeSPTooltipProps = propsFactory(
  {
    text: String,
    color: String,
    textColor: String,
    arrow: {
      type: Boolean,
      default: true,
    },

    ...omit(
      makeSPOverlayProps({
        closeOnBack: false,
        location: 'end' as const,
        locationStrategy: 'connected' as const,
        eager: true,
        minWidth: 0,
        offset: 10,
        openOnClick: false,
        openOnHover: true,
        origin: 'auto' as const,
        scrim: false,
        scrollStrategy: 'reposition' as const,
        transition: null,
        maxWidth: 300,
        zIndex: 2100,
      }),
      ['absolute', 'persistent']
    ),
  },
  'SPTooltip'
)
