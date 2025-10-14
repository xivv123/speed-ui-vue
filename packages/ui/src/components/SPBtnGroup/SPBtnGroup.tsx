// Styles
import './style/SPBtnGroup.sass'

// Props
import { makeSPBtnGroupProps } from './props'

// Composables
import { useBorder } from '@/composables/border'
import { provideDefaults } from '@/composables/defaults'
import { useDensity } from '@/composables/density'
import { useElevation } from '@/composables/elevation'
import { useRounded } from '@/composables/rounded'
import { provideTheme } from '@/composables/theme'

// Utilities
import { toRef } from 'vue'
import { genericComponent, useRender } from '@/utils'


export const SPBtnGroup = genericComponent()({
  name: 'SPBtnGroup',

  props: makeSPBtnGroupProps(),

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)
    const { borderClasses } = useBorder(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)

    provideDefaults({
      SPBtn: {
        height: toRef(() => props.direction === 'horizontal' ? undefined : null),
        baseColor: toRef(() => props.baseColor),
        color: toRef(() => props.color),
        density: toRef(() => props.density),
        flat: true,
        variant: toRef(() => props.variant),
      },
    })

    useRender(() => {
      const Tag = props.tag as any

      return (
        <Tag
          class={[
            'sp-btn-group',
            `sp-btn-group--${props.direction}`,
            {
              'sp-btn-group--divided': props.divided,
            },
            themeClasses.value,
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            roundedClasses.value,
            props.class,
          ]}
          style={ props.style }
          v-slots={ slots }
        />
      )
    })
  },
})

export type SPBtnGroup = InstanceType<typeof SPBtnGroup>
