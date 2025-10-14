import { computed, defineComponent, inject } from 'vue'
import type { CSSProperties, PropType } from 'vue'

export interface SPLayoutFooterProps {
  /**
   * 底部高度
   */
  height?: number | string
  /**
   * 自定义元素标签
   */
  tag?: string
}

const SPLayoutFooter = defineComponent({
  name: 'SPLayoutFooter',
  props: {
    height: {
      type: [Number, String] as PropType<number | string>,
      default: 64,
    },
    tag: {
      type: String,
      default: 'footer',
    },
  },
  setup(props, { slots }) {
    const Tag = props.tag as any

    // 注入布局上下文
    const layoutContext = inject('spLayout', {
      direction: computed(() => 'horizontal'),
      isMobile: computed(() => false),
      hasAside: computed(() => false),
      hasLeftAside: computed(() => false as boolean),
      hasRightAside: computed(() => false as boolean),
      isLeftCollapsed: computed(() => false as boolean),
      isRightCollapsed: computed(() => false as boolean),
      toggleCollapse: (_pos?: 'left' | 'right' | 'both') => {},
    })

    // 计算底部样式
    const footerStyles = computed((): CSSProperties => {
      const styles: CSSProperties = {
        gridArea: 'footer',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        borderTop: '1px solid #e8e8e8',
      }

      // 设置高度
      if (typeof props.height === 'number') {
        styles.height = `${props.height}px`
      } else {
        styles.height = props.height
      }

      return styles
    })

    // 计算底部类名
    const footerClasses = computed(() => {
      return [
        'sp-layout-footer',
        {
          'sp-layout-footer--mobile': layoutContext.isMobile.value,
        },
      ]
    })

    return () => {
      return (
        <Tag
          class={footerClasses.value}
          style={footerStyles.value}
        >
          {slots.default?.()}
        </Tag>
      )
    }
  },
})

export default SPLayoutFooter
