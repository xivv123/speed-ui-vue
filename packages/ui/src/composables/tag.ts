// Utilities
import { propsFactory } from '../utils'

// Types
import type { PropType, Component } from 'vue'

export type TagValue = string | Component

export interface TagProps {
  tag?: TagValue
}

// Composables
export const makeTagProps = propsFactory(
  {
    tag: {
      type: [String, Object, Function] as PropType<TagValue>,
      default: 'div',
    },
  },
  'tag'
)

export function useTag(props: TagProps) {
  return {
    tag: props.tag || 'div',
  }
}
