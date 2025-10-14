// Styles
import './style/SPRow.sass'

// Utilities
import { computed } from 'vue'
import { convertToUnit, genericComponent, useRender } from '../../utils'

// Props
import { makeSPRowProps } from './props'

// Types
export type { SPRowAlign, SPRowJustify } from './types'
export { makeSPRowProps } from './props'

export const SPRow = genericComponent()({
  name: 'SPRow',

  props: makeSPRowProps(),

  setup(props, { slots }) {
    const gridTemplateColumns = computed(() => {
      if (props.autoFill) {
        return `repeat(auto-fill, minmax(${convertToUnit(props.minColWidth)}, 1fr))`
      }
      if (props.autoFit) {
        return `repeat(auto-fit, minmax(${convertToUnit(props.minColWidth)}, 1fr))`
      }
      return `repeat(${props.cols}, 1fr)`
    })

    const styles = computed(() => {
      const gap = props.gap !== undefined ? convertToUnit(props.gap) : undefined
      const columnGap = props.columnGap !== undefined ? convertToUnit(props.columnGap) : undefined
      const rowGap = props.rowGap !== undefined ? convertToUnit(props.rowGap) : undefined

      return {
        '--sp-row-cols': props.cols,
        '--sp-row-gap': gap,
        '--sp-row-column-gap': columnGap,
        '--sp-row-row-gap': rowGap,
        gridTemplateColumns: gridTemplateColumns.value,
        gap: gap,
        columnGap: columnGap,
        rowGap: rowGap,
        alignItems: props.align,
        justifyContent: props.justify,
        gridAutoFlow: props.dense ? 'dense' : undefined,
      }
    })

    useRender(() => {
      const Tag = props.tag as any

      return (
        <Tag
          class={[
            'sp-row',
            props.class,
          ]}
          style={[styles.value, props.style]}
        >
          {slots.default?.()}
        </Tag>
      )
    })

    return {}
  },
})

export type SPRow = InstanceType<typeof SPRow>
