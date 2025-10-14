import type { ComputedRef, Ref } from 'vue'
import type { SPInputinnerSlots } from '../SPInputinner/SPInputinner'
import type { SPSelctrlSlots } from '../SPSelctrl/SPSelctrl'
import type { IconValue } from '../../composables/icons'
import type { LoaderSlotProps } from '../../composables/loader'

export type SPSwitchSlot = {
  model: Ref<boolean>
  isValid: ComputedRef<boolean | null>
}

export type SPSwitchSlots = SPInputinnerSlots &
  SPSelctrlSlots & {
    loader: LoaderSlotProps
    thumb: { icon: IconValue | undefined } & SPSwitchSlot
    'track-false': SPSwitchSlot
    'track-true': SPSwitchSlot
  }
