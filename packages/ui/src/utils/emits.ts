// Reusable emits helpers for components
// Centralizes common event names so they’re consistent across components.

import type { ObjectEmitsOptions } from 'vue'

// Base, focused and control-related emits
export const modelValueEmits = {
  'update:modelValue': (_: any) => true,
} as const

export const focusedEmits = {
  'update:focused': (_: boolean) => true,
} as const

export const controlEmits = {
  'click:control': (_: MouseEvent) => true,
  'mousedown:control': (_: MouseEvent) => true,
} as const

export const blurEmits = {
  blur: (_: FocusEvent) => true,
} as const

// Utility to merge multiple emits objects into one
export function mergeEmits(
  ...parts: Readonly<ObjectEmitsOptions>[]
): ObjectEmitsOptions {
  return Object.assign({}, ...parts)
}

// Precomposed emits for input-like components
export const inputEmits = {
  ...controlEmits,
  ...focusedEmits,
  ...modelValueEmits,
} as const
