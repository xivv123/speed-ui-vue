import { computed, defineComponent, inject } from 'vue'
import type { CSSProperties, PropType } from 'vue'

export interface SPLayoutMainProps {
  /**
   * 内边距
   */
  padding?: number | string
  /**
   * 自定义元素标签
   */
  tag?: string
}

const SPLayoutMain = defineComponent({
  name: 'SPLayoutMain',
  props: {
    padding: {
      type: [Number, String] as PropType<number | string>,
      default: 16
    },
    tag: {
      type: String,
      default: 'main'
    }
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
      toggleCollapse: (_pos?: 'left' | 'right' | 'both') => {}
    })

    // 计算主内容区样式
    const mainStyles = computed((): CSSProperties => {
      const styles: CSSProperties = {
        gridArea: 'main',
        overflow: 'auto',
        backgroundColor: '#fff'
      }

      // 设置内边距
      if (typeof props.padding === 'number') {
        styles.padding = `${props.padding}px`
      } else {
        styles.padding = props.padding
      }

      return styles
    })

    // 计算主内容区类名
    const mainClasses = computed(() => {
      return [
        'sp-layout-main',
        {
          'sp-layout-main--mobile': layoutContext.isMobile.value
        }
      ]
    })

    return () => {
      return (
        <Tag
          class={mainClasses.value}
          style={mainStyles.value}
        >
          {slots.default?.()}
        </Tag>
      )
    }
  }
})

export default SPLayoutMain