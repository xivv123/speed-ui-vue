// Types
import type { SPTallySlot } from '@/components/SPTally/SPTally'
import type { SPFieldSlots } from '@/components/SPField/types'
import type { SPInputinnerSlots } from '@/components/SPInputinner/SPInputinner'

export type SPTextFieldSlots = Omit<
  SPInputinnerSlots & SPFieldSlots,
  'default'
> & {
  default: never
  counter: SPTallySlot
}
