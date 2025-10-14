// Components
import { makeSPOverlayProps } from '@/components/SPOverlay/SPOverlay'

// Utilities
import { omit, propsFactory } from '@/utils'

export const makeSPDrawerProps = propsFactory(
  {
    location: {
      type: String as () => 'left' | 'right' | 'top' | 'bottom',
      default: 'right',
    },
    temporary: {
      type: Boolean,
      default: true,
    },
    permanent: Boolean,
    ...omit(
      makeSPOverlayProps({
        scrollStrategy: 'block' as const,
        zIndex: 2300,
      }),
      ['location']
    ),
  },
  'SPDrawer'
)
