import { computed, defineComponent, inject } from 'vue'
import type { CSSProperties, PropType } from 'vue'

export interface SPLayoutAsideProps {
  /**
   * 侧边栏宽度
   */
  width?: number | string
  /**
   * 折叠时的宽度
   */
  collapsedWidth?: number | string
  /**
   * 是否可折叠
   */
  collapsible?: boolean
  /**
   * 侧边栏位置
   */
  position?: 'left' | 'right'
  /**
   * 背景色
   */
  backgroundColor?: string
  /**
   * 自定义元素标签
   */
  tag?: string
}

const SPLayoutAside = defineComponent({
  name: 'SPLayoutAside',
  props: {
    width: {
      type: [Number, String] as PropType<number | string>,
      default: 240,
    },
    collapsedWidth: {
      type: [Number, String] as PropType<number | string>,
      default: 64,
    },
    collapsible: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String as PropType<'left' | 'right'>,
      default: 'left',
    },
    backgroundColor: {
      type: String,
      default: undefined,
    },
    tag: {
      type: String,
      default: 'aside',
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

    const isCollapsedByPosition = computed(() =>
      props.position === 'left'
        ? layoutContext.isLeftCollapsed.value
        : layoutContext.isRightCollapsed.value
    )

    // 计算当前宽度
    const currentWidth = computed(() => {
      if (isCollapsedByPosition.value && props.collapsible) {
        return typeof props.collapsedWidth === 'number'
          ? `${props.collapsedWidth}px`
          : props.collapsedWidth
      }
      return typeof props.width === 'number' ? `${props.width}px` : props.width
    })

    // 计算侧边栏样式
    const asideStyles = computed((): CSSProperties => {
      const styles: CSSProperties = {
        transition: 'width 0.3s ease, transform 0.3s ease',
        overflow: 'hidden',
        zIndex: 99,
      }

      // 设置背景色（如果提供）
      if (props.backgroundColor) {
        styles.backgroundColor = props.backgroundColor
      }

      // 根据位置设置边框
      if (props.position === 'left') {
        styles.borderRight = '1px solid #e8e8e8'
      } else {
        styles.borderLeft = '1px solid #e8e8e8'
      }

      // 在移动端时，侧边栏绝对定位（相对于容器）
      if (layoutContext.isMobile.value) {
        styles.position = 'absolute'
        styles.top = '0'
        styles.height = '100%'
        styles.width =
          typeof props.width === 'number' ? `${props.width}px` : props.width

        // 根据位置设置定位
        if (props.position === 'left') {
          styles.left = '0'
          // 折叠时隐藏
          if (isCollapsedByPosition.value) {
            styles.transform = 'translateX(-100%)'
          }
        } else {
          styles.right = '0'
          // 折叠时隐藏
          if (isCollapsedByPosition.value) {
            styles.transform = 'translateX(100%)'
          }
        }
      } else {
        // 桌面端使用 Grid 定位
        styles.gridArea =
          props.position === 'left' ? 'aside-left' : 'aside-right'
        // 桌面端宽度
        styles.width = currentWidth.value
      }

      return styles
    })

    // 计算侧边栏类名
    const asideClasses = computed(() => {
      return [
        'sp-layout-aside',
        `sp-layout-aside--${props.position}`,
        {
          'sp-layout-aside--collapsed': isCollapsedByPosition.value,
          'sp-layout-aside--mobile': layoutContext.isMobile.value,
          'sp-layout-aside--collapsible': props.collapsible,
        },
      ]
    })

    // 移动端遮罩层点击事件（分别控制左右）
    const handleMaskClick = () => {
      if (layoutContext.isMobile.value && !isCollapsedByPosition.value) {
        layoutContext.toggleCollapse(props.position)
      }
    }

    // 渲染移动端遮罩层
    const renderMask = () => {
      if (!layoutContext.isMobile.value || isCollapsedByPosition.value) {
        return null
      }

      return (
        <div
          class="sp-layout-aside__mask"
          onClick={handleMaskClick}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 98,
          }}
        />
      )
    }

    return () => {
      return (
        <>
          {renderMask()}
          <Tag
            class={asideClasses.value}
            style={asideStyles.value}
          >
            <div class="sp-layout-aside__content">{slots.default?.()}</div>
          </Tag>
        </>
      )
    }
  },
})

export default SPLayoutAside
