// Styles
import './SPDivider.scss'

// Props & Types
import { makeSPDividerProps } from './props'
import type { DividerStyles } from './types'

// Composables
import { useTextColor } from '@/composables/color'
import { provideTheme } from '@/composables/theme'

// Utilities
import { computed } from 'vue'
import {
  convertToUnit,
  genericComponent,
  useRender,
} from '@/utils'

export const SPDivider = genericComponent()({
  name: 'SPDivider',

  props: makeSPDividerProps(),

  setup(props, { attrs, slots }) {
    const { themeClasses } = provideTheme(props)
    const { textColorClasses, textColorStyles } = useTextColor(
      () => props.color
    )
    
    const dividerStyles = computed(() => {
      const styles: DividerStyles = {}

      if (props.length) {
        styles[props.vertical ? 'height' : 'width'] = convertToUnit(
          props.length
        )
      }

      if (props.thickness) {
        styles[props.vertical ? 'borderRightWidth' : 'borderTopWidth'] =
          convertToUnit(props.thickness)
      }

      return styles
    })

    useRender(() => {
      const divider = (
        <hr
          class={[
            {
              'sp-divider': true,
              'sp-divider--inset': props.inset,
              'sp-divider--vertical': props.vertical,
            },
            themeClasses.value,
            textColorClasses.value,
            props.class,
          ]}
          style={[
            dividerStyles.value,
            textColorStyles.value,
            { '--sp-border-opacity': props.opacity },
            props.style,
          ]}
          aria-orientation={
            !attrs.role || attrs.role === 'separator'
              ? props.vertical
                ? 'vertical'
                : 'horizontal'
              : undefined
          }
          role={`${attrs.role || 'separator'}`}
        />
      )

      if (!slots.default) return divider

      return (
        <div
          class={[
            'sp-divider__wrapper',
            {
              'sp-divider__wrapper--vertical': props.vertical,
              'sp-divider__wrapper--inset': props.inset,
            },
          ]}
        >
          {divider}

          <div class="sp-divider__content">{slots.default()}</div>

          {divider}
        </div>
      )
    })

    return {}
  },
})

export type SPDivider = InstanceType<typeof SPDivider>
