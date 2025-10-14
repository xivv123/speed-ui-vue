import { computed, defineComponent, inject } from 'vue'
import type { CSSProperties, PropType } from 'vue'

export interface SPLayoutHeaderProps {
  /**
   * 头部高度
   */
  height?: number | string
  /**
   * 是否显示汉堡菜单按钮（若指定，则两个按钮都显示/隐藏由外部控制）
   */
  showMenuButton?: boolean
  /**
   * 自定义元素标签
   */
  tag?: string
}

const SPLayoutHeader = defineComponent({
  name: 'SPLayoutHeader',
  props: {
    height: {
      type: [Number, String] as PropType<number | string>,
      default: 64
    },
    showMenuButton: {
      type: Boolean,
      default: undefined // 默认根据布局上下文自动判断
    },
    tag: {
      type: String,
      default: 'header'
    }
  },
  setup(props, { slots }) {
    const Tag = props.tag as any
    
    // 注入布局上下文（提供默认值，确保独立开发时类型安全）
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

    // 计算是否显示左右菜单按钮
    const shouldShowLeftMenu = computed(() => {
      if (props.showMenuButton !== undefined) return props.showMenuButton
      return layoutContext.hasLeftAside.value && layoutContext.isMobile.value
    })
    const shouldShowRightMenu = computed(() => {
      if (props.showMenuButton !== undefined) return props.showMenuButton
      return layoutContext.hasRightAside.value && layoutContext.isMobile.value
    })

    // 计算头部样式
    const headerStyles = computed((): CSSProperties => {
      const styles: CSSProperties = {
        gridArea: 'header',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e8e8e8'
      }

      // 设置高度
      if (typeof props.height === 'number') {
        styles.height = `${props.height}px`
      } else {
        styles.height = props.height
      }

      return styles
    })

    // 计算头部类名
    const headerClasses = computed(() => {
      return [
        'sp-layout-header',
        {
          'sp-layout-header--with-menu': shouldShowLeftMenu.value || shouldShowRightMenu.value
        }
      ]
    })

    // 汉堡菜单按钮点击事件
    const handleLeftMenuClick = () => {
      layoutContext.toggleCollapse('left')
    }
    const handleRightMenuClick = () => {
      layoutContext.toggleCollapse('right')
    }

    // 渲染左侧汉堡菜单按钮
    const renderLeftMenuButton = () => {
      if (!shouldShowLeftMenu.value) return null
      return (
        <button
          class="sp-layout-header__menu-button sp-layout-header__menu-button--left"
          onClick={handleLeftMenuClick}
          aria-label="Toggle left menu"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4.5h14M2 9h14M2 13.5h14"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
      )
    }

    // 渲染右侧汉堡菜单按钮
    const renderRightMenuButton = () => {
      if (!shouldShowRightMenu.value) return null
      return (
        <button
          class="sp-layout-header__menu-button sp-layout-header__menu-button--right"
          onClick={handleRightMenuClick}
          aria-label="Toggle right menu"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4.5h14M2 9h14M2 13.5h14"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
      )
    }

    return () => {
      return (
        <Tag
          class={headerClasses.value}
          style={headerStyles.value}
        >
          <div class="sp-layout-header__left">
            {renderLeftMenuButton()}
          </div>
          <div class="sp-layout-header__content">
            {slots.default?.()}
          </div>
          <div class="sp-layout-header__right">
            {renderRightMenuButton()}
          </div>
        </Tag>
      )
    }
  }
})

export default SPLayoutHeader