// Types
import type { SPFieldSlots } from '../SPField'
import type { SPInputinnerSlots } from '../SPInputinner/SPInputinner'
import type { SPTallySlot } from '../SPTally/SPTally'

export type SPTextareaSlots = Omit<SPInputinnerSlots & SPFieldSlots, 'default'> & {
  counter: SPTallySlot
}
