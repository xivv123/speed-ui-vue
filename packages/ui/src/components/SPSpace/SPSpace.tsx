// Styles
import './SPSpace.scss'

// Composables
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { Comment, Fragment, computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/utils'

// Types
import type { CSSProperties, PropType, VNode } from 'vue'

export type SpaceSize = 'small' | 'default' | 'large' | number | [number, number]
export type SpaceDirection = 'horizontal' | 'vertical'
export type SpaceAlignment = 'start' | 'end' | 'center' | 'baseline' | 'stretch'

export const makeSPSpaceProps = propsFactory(
  {
    // Space size
    size: {
      type: [String, Number, Array] as PropType<SpaceSize>,
      default: 'small',
    },
    // Direction
    direction: {
      type: String as PropType<SpaceDirection>,
      default: 'horizontal',
      validator: (v: any) => ['horizontal', 'vertical'].includes(v),
    },
    // Alignment
    alignment: {
      type: String as PropType<SpaceAlignment>,
      default: 'center',
      validator: (v: any) =>
        ['start', 'end', 'center', 'baseline', 'stretch'].includes(v),
    },
    // Enable flex-wrap
    wrap: Boolean,
    // Custom spacer between items
    spacer: [String, Object] as PropType<string | VNode>,
    // Fill container width
    fill: Boolean,
    // Fill ratio
    fillRatio: {
      type: Number,
      default: 100,
    },

    ...makeComponentProps(),
    ...makeDimensionProps(),
    ...makeThemeProps(),
  },
  'SPSpace'
)

export const SPSpace = genericComponent()({
  name: 'SPSpace',

  props: makeSPSpaceProps(),

  setup(props, { slots }) {
    const { dimensionStyles } = useDimension(props)
    const { themeClasses } = provideTheme(props)

    const getSpaceSize = (size: SpaceSize): [number, number] => {
      if (Array.isArray(size)) return size
      if (typeof size === 'number') return [size, size]
      const map: Record<string, [number, number]> = {
        small: [8, 8],
        default: [12, 12],
        large: [16, 16],
      }
      return map[size] || map.default
    }

    const [horizontalSize, verticalSize] = getSpaceSize(props.size)

    const spaceStyles = computed((): CSSProperties => {
      const isHorizontal = props.direction === 'horizontal'
      const styles: CSSProperties = {
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        alignItems:
          props.alignment === 'start'
            ? 'flex-start'
            : props.alignment === 'end'
            ? 'flex-end'
            : props.alignment,
        ...dimensionStyles.value,
      }
      if (props.wrap) {
        styles.flexWrap = 'wrap'
        // 换行模式下使用 margin 方式处理间距，不使用 gap
        const halfH = horizontalSize / 2
        const halfV = verticalSize / 2
        styles.margin = `${-halfV}px ${-halfH}px`
        styles.gap = '0' // 明确设置 gap 为 0
      } else {
        styles.gap = isHorizontal
          ? `${verticalSize}px ${horizontalSize}px`
          : `${verticalSize}px`
      }
      return styles
    })

    const itemStyles = computed((): CSSProperties => {
      const isHorizontal = props.direction === 'horizontal'
      const base: CSSProperties = {}

      // wrap mode: use margin instead of gap
      if (props.wrap) {
        base.margin = `${verticalSize / 2}px ${horizontalSize / 2}px`
      }

      if (props.fill) {
        base.flex = isHorizontal
          ? `0 0 ${props.fillRatio}%`
          : `1 0 ${props.fillRatio}%`
      }

      return base
    })

    useRender(() => {
      const children = slots.default?.() || []
      if (!children.length) return <div class="sp-space" />

      // 扁平化处理 children，处理 v-for 等情况产生的嵌套结构
      const flattenChildren = (children: unknown[]): unknown[] => {
        const result: unknown[] = []
        for (const child of children) {
          if (Array.isArray(child)) {
            // 如果是数组，递归扁平化
            result.push(...flattenChildren(child))
          } else if (child && typeof child === 'object' && 'type' in child && child.type === Fragment && 'children' in child && Array.isArray(child.children)) {
            // 如果是 Fragment，提取其 children
            result.push(...flattenChildren(child.children))
          } else {
            result.push(child)
          }
        }
        return result
      }

      const flatChildren = flattenChildren(children)

      const validChildren = flatChildren.filter(child => {
        return (
          child &&
          child.type !== Comment &&
          !(typeof child.children === 'string' && !child.children.trim()) &&
          !(typeof child === 'string' && !child.trim())
        )
      })
      if (!validChildren.length) return <div class="sp-space" />

      const items = validChildren.map((child, index) => {
        const isLast = index === validChildren.length - 1
        return (
          <Fragment key={index}>
            <div class="sp-space__item" style={itemStyles.value}>
              {child}
            </div>
            {!isLast && props.spacer && (
              <div class="sp-space__spacer">
                {typeof props.spacer === 'string' ? props.spacer : props.spacer}
              </div>
            )}
          </Fragment>
        )
      })

      return (
        <div
          class={[
            'sp-space',
            `sp-space--${props.direction}`,
            { 'sp-space--wrap': props.wrap, 'sp-space--fill': props.fill },
            themeClasses.value,
            props.class,
          ]}
          style={[spaceStyles.value, props.style]}
          data-alignment={props.alignment}
        >
          {items}
        </div>
      )
    })

    return {}
  },
})

export type SPSpace = InstanceType<typeof SPSpace>
