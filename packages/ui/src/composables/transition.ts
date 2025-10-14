// Utilities
import { h, mergeProps, Transition, TransitionGroup } from 'vue'
import { isObject, onlyDefinedProps, propsFactory } from '../utils'

// Types
import type { Component, FunctionalComponent, Prop, TransitionProps, HTMLAttributes } from 'vue'

export const makeTransitionProps = propsFactory(
  {
    transition: {
      type: null,
      default: 'fade-transition',
      validator: val => val !== true,
    } as Prop<
      null | string | boolean | (TransitionProps & { component?: Component })
    >,
  },
  'transition'
)

interface MaybeTransitionProps extends TransitionProps {
  transition?: null | string | boolean | (TransitionProps & { component?: any })
  disabled?: boolean
  group?: boolean
  tag?: string
  class?: object
  style?: object
  
}

export const MaybeTransition: FunctionalComponent<MaybeTransitionProps & HTMLAttributes> = (
  props,
  { slots }
) => {
  const { transition, disabled, group, ...rest } = props

  const { component = group ? TransitionGroup : Transition, ...customProps } =
    isObject(transition) ? transition : {}

  let transitionProps
  if (isObject(transition)) {
    transitionProps = mergeProps(
      customProps,
      onlyDefinedProps({ disabled, group }),
      rest
    )
  } else {
    transitionProps = mergeProps(
      { name: disabled || !transition ? '' : transition },
      rest
    )
  }

  return h(component, transitionProps, slots)
}
