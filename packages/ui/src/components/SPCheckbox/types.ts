// Types
import type { SPSelctrlSlots } from '../SPSelctrl/SPSelctrl'
import type { SPInputinnerSlots } from '../SPInputinner/SPInputinner'

export type SPCheckboxSlots = Omit<SPInputinnerSlots, 'default'> & SPSelctrlSlots
