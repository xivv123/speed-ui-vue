// Components
import { SPProgressLinear } from '../components/SPProgressLinear'

// Utilities
import { toRef } from 'vue'
import { getCurrentInstanceName, propsFactory } from '../utils'

// Types
import type { ExtractPropTypes, SetupContext } from 'vue'
import type { SlotsToProps } from '../utils'

export interface LoaderSlotProps {
  color: string | undefined
  isActive: boolean
}

export interface LoaderProps {
  loading?: boolean | string
}

// Composables
export const makeLoaderProps = propsFactory(
  {
    loading: [Boolean, String],
  },
  'loader'
)

export function useLoader(props: LoaderProps, name = getCurrentInstanceName()) {
  const loaderClasses = toRef(() => ({
    [`${name}--loading`]: props.loading,
  }))

  return { loaderClasses }
}

export function LoaderSlot(
  props: {
    absolute?: boolean
    active: boolean
    name: string
    color?: string
  } & ExtractPropTypes<
    SlotsToProps<{
      default: LoaderSlotProps
    }>
  >,
  { slots }: SetupContext
) {
  return (
    <div class={`${props.name}__loader`}>
      {slots.default?.({
        color: props.color,
        isActive: props.active,
      } satisfies LoaderSlotProps) || (
        <SPProgressLinear
          absolute={props.absolute}
          active={props.active}
          color={props.color}
          height="3"
          indeterminate
        />
      )}
    </div>
  )
}
