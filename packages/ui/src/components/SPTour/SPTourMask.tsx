// Utilities
import { genericComponent, propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'

export const makeSPTourMaskProps = propsFactory(
  {
    mask: [Boolean, String] as PropType<boolean | string>,
    zIndex: Number,
    path: String,
  },
  'SPTourMask'
)

export const SPTourMask = genericComponent()({
  name: 'SPTourMask',

  props: makeSPTourMaskProps(),

  setup(props) {
    return () => {
      if (!props.mask || !props.path) return null

      return (
        <div
          class="sp-tour__mask"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: props.zIndex,
            pointerEvents: 'none',
          }}
        >
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
            <path
              d={props.path}
              fill={typeof props.mask === 'string' ? props.mask : 'rgba(0, 0, 0, 0.32)'}
              {...{ 'fill-rule': 'evenodd' }}
            />
          </svg>
        </div>
      )
    }
  },
})

export type SPTourMask = InstanceType<typeof SPTourMask>

