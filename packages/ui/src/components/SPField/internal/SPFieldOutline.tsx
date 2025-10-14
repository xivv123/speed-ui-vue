// Components
import { SPFloatLabel } from './SPFloatLabel'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/utils'

// Types
import type { PropType, Ref } from 'vue'
import type { SPFloatLabel as SPFloatLabelInstance } from './SPFloatLabel'

export const makeSPFieldOutlineProps = propsFactory(
  {
    isOutlined: Boolean,
    isPlainOrUnderlined: Boolean,
    hasFloatingLabel: Boolean,
    id: String,
    isActive: Boolean,
    // Pass-through classes/styles from parent computed color helpers
    textColorClasses: [String, Array, Object] as PropType<any>,
    textColorStyles: Object as PropType<Record<string, any>>,
    // Allow parent to capture the floating label ref for animations
    floatingLabelRef: Object as PropType<Ref<SPFloatLabelInstance | undefined>>, 
  },
  'SPFieldOutline'
)

export const SPFieldOutline = genericComponent()({
  name: 'SPFieldOutline',

  props: makeSPFieldOutlineProps(),

  setup(props, { slots }) {
    useRender(() => (
      <div
        class={['sp-field__outline', props.textColorClasses]}
        style={props.textColorStyles}
      >
        {props.isOutlined ? (
          <>
            <div class="sp-field__outline__start" />
            {props.hasFloatingLabel && (
              <div class="sp-field__outline__notch">
                <SPFloatLabel
                  ref={(el: any) => props.floatingLabelRef && ((props.floatingLabelRef as any).value = el)}
                  floating
                  for={props.id}
                  aria-hidden={!props.isActive}
                >
                  {slots.default?.()}
                </SPFloatLabel>
              </div>
            )}
            <div class="sp-field__outline__end" />
          </>
        ) : (
          props.isPlainOrUnderlined && props.hasFloatingLabel && (
            <SPFloatLabel
              ref={(el: any) => props.floatingLabelRef && ((props.floatingLabelRef as any).value = el)}
              floating
              for={props.id}
              aria-hidden={!props.isActive}
            >
              {slots.default?.()}
            </SPFloatLabel>
          )
        )}
      </div>
    ))

    return {}
  },
})

export type SPFieldOutline = InstanceType<typeof SPFieldOutline>
