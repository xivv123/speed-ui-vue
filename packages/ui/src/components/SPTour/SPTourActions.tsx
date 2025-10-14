// Components
import { SPBtn } from '@/components/SPBtn'

// Utilities
import { genericComponent, propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'

export const makeSPTourActionsProps = propsFactory(
  {
    isFirst: Boolean,
    isLast: Boolean,
    type: String as PropType<'default' | 'primary'>,
    skipLabel: String,
    prevLabel: String,
    nextLabel: String,
    finishLabel: String,
    onPrev: Function as PropType<() => void>,
    onNext: Function as PropType<() => void>,
    onSkip: Function as PropType<() => void>,
  },
  'SPTourActions'
)

export const SPTourActions = genericComponent()({
  name: 'SPTourActions',

  props: makeSPTourActionsProps(),

  setup(props) {
    return () => (
      <div class="sp-tour__actions">
        {!props.isLast && (
          <SPBtn variant="text" onClick={props.onSkip}>
            {props.skipLabel}
          </SPBtn>
        )}

        {!props.isFirst && (
          <SPBtn variant="outlined" onClick={props.onPrev}>
            {props.prevLabel}
          </SPBtn>
        )}

        <SPBtn
          variant="outlined"
          color={props.type === 'primary' ? 'primary' : undefined}
          onClick={props.onNext}
        >
          {props.isLast ? props.finishLabel : props.nextLabel}
        </SPBtn>
      </div>
    )
  },
})

export type SPTourActions = InstanceType<typeof SPTourActions>

