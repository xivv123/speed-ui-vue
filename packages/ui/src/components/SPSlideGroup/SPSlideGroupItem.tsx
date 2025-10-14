// Composables
import { makeGroupItemProps, useGroupItem } from '../../composables/group'

// Utilities
import { SPSlideGroupSymbol } from './SPSlideGroup'
import { genericComponent } from '../../utils'

// Types
import type { UnwrapRef } from 'vue'
import type { GroupItemProvide } from '../../composables/group'

type SPSlideGroupItemSlots = {
  default: {
    isSelected: UnwrapRef<GroupItemProvide['isSelected']>
    select: GroupItemProvide['select']
    toggle: GroupItemProvide['toggle']
    selectedClass: UnwrapRef<GroupItemProvide['selectedClass']>
  }
}

export const SPSlideGroupItem = genericComponent<SPSlideGroupItemSlots>()({
  name: 'SPSlideGroupItem',

  props: makeGroupItemProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
  },

  setup(props, { slots }) {
    const slideGroupItem = useGroupItem(props, SPSlideGroupSymbol)

    return () =>
      slots.default?.({
        isSelected: slideGroupItem.isSelected.value,
        select: slideGroupItem.select,
        toggle: slideGroupItem.toggle,
        selectedClass: slideGroupItem.selectedClass.value,
      })
  },
})

export type SPSlideGroupItem = InstanceType<typeof SPSlideGroupItem>
