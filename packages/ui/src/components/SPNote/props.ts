import type { PropType } from 'vue'
import { propsFactory } from '@/utils'
import { makeDimensionProps } from '@/composables/dimensions'
import type { NotePosition } from './types'

export const makeSPNoteProps = propsFactory(
  {
    modelValue: String,
    placeholder: {
      type: String,
      default: '记笔记...'
    },
    draggable: {
      type: Boolean,
      default: true,
    },
    position: {
      type: Object as PropType<NotePosition>,
      default: () => ({ x: 0, y: 0 }),
    },
    zIndex: [Number, String],
    header: {
      type: Boolean,
      default: true,
    },
    title: String,
    resizable: {
      type: Boolean,
      default: true,
    },
    closable: {
      type: Boolean,
      default: true,
    },

    // allow width/height via dimension props
    ...makeDimensionProps(),
  },
  'SPNote'
)
