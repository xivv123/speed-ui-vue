// Components
import { makeSPOverlayProps } from '@/components/SPOverlay/SPOverlay'

// Utilities
import { propsFactory } from '@/utils'

export const makeSPDialogProps = propsFactory(
  {
    fullscreen: Boolean,
    retainFocus: {
      type: Boolean,
      default: true,
    },
    scrollable: Boolean,

    ...makeSPOverlayProps({
      origin: 'center center' as const,
      scrollStrategy: 'block' as const,
      // transition: { component: SPDialogTransition },
      zIndex: 2400,
    }),
  },
  'SPDialog'
)
