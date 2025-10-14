// Components
import { VDialogTransition } from '@/components/transitions'
import { makeSPOverlayProps } from '../SPOverlay/SPOverlay'

// Utilities
import { omit, propsFactory } from '@/utils'

/**
 * SPMenu组件的属性定义
 */
export const makeSPMenuProps = propsFactory(
  {
    /** 是否为子菜单 */
    submenu: Boolean,
    /** 是否禁用初始聚焦 */
    disableInitialFocus: Boolean,

    ...omit(
      makeSPOverlayProps({
        closeDelay: 250,
        closeOnContentClick: true,
        locationStrategy: 'connected' as const,
        location: undefined,
        openDelay: 300,
        scrim: false,
        scrollStrategy: 'reposition' as const,
        transition: { component: VDialogTransition },
      }),
      ['absolute']
    ),
  },
  'SPMenu'
)
