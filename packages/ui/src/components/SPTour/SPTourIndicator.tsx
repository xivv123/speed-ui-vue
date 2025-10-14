// Utilities
import { genericComponent, propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'

export const makeSPTourIndicatorProps = propsFactory(
  {
    current: { type: Number, required: true },
    total: { type: Number, required: true },
    onSelect: Function as PropType<(index: number) => void>,
  },
  'SPTourIndicator'
)

export const SPTourIndicator = genericComponent()({
  name: 'SPTourIndicator',
  props: makeSPTourIndicatorProps(),
  setup(props) {
    return () => {
      if (props.total <= 1) return null
      return (
        <div class="sp-tour__indicator">
          <span class="sp-tour__indicator-text">
            {props.current + 1} / {props.total}
          </span>
          <div class="sp-tour__dots">
            {Array.from({ length: props.total }).map((_, index) => (
              <button
                key={index}
                class={['sp-tour__dot', { 'sp-tour__dot--active': index === props.current }]}
                onClick={() => props.onSelect?.(index)}
                aria-label={`跳转到第 ${index + 1} 步`}
              />
            ))}
          </div>
        </div>
      )
    }
  },
})

export type SPTourIndicator = InstanceType<typeof SPTourIndicator>

