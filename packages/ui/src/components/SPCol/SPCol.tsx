// Styles
import './style/SPCol.sass'

// Utilities
import { computed } from 'vue'
import { genericComponent, useRender } from '@/utils'

// Props
import { makeSPColProps } from './props'

// Types
export type { SPColAlign, SPColJustify } from './types'
export { makeSPColProps } from './props'

export const SPCol = genericComponent()({
  name: 'SPCol',

  props: makeSPColProps(),

  setup(props, { slots }) {
    const styles = computed(() => {
      const gridColumn = (() => {
        if (props.colStart && props.colEnd) {
          return `${props.colStart} / ${props.colEnd}`
        }
        if (props.colStart) {
          return `${props.colStart} / span ${props.cols || 1}`
        }
        if (props.cols && props.cols !== 'auto') {
          return `span ${props.cols}`
        }
        if (props.offset) {
          return `${Number(props.offset) + 1} / span ${props.cols || 1}`
        }
        return undefined
      })()

      const gridRow = (() => {
        if (props.rowStart && props.rowEnd) {
          return `${props.rowStart} / ${props.rowEnd}`
        }
        if (props.rowStart) {
          return `${props.rowStart} / span ${props.rows || 1}`
        }
        if (props.rows) {
          return `span ${props.rows}`
        }
        return undefined
      })()

      return {
        gridColumn,
        gridRow,
        order: props.order,
        alignSelf: props.alignSelf,
        justifySelf: props.justifySelf,
      }
    })

    useRender(() => {
      const Tag = props.tag as any

      return (
        <Tag
          class={[
            'sp-col',
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

export type SPCol = InstanceType<typeof SPCol>

