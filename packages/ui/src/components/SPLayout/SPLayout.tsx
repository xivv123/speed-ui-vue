import {
  computed,
  defineComponent,
  provide,
  ref,
  onMounted,
  onUnmounted,
} from 'vue'
import type { CSSProperties, PropType } from 'vue'
// import SPGrid from '../SPGrid/SPGrid'

export interface SPLayoutProps {
  /**
   * 布局方向
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * 头部布局模式
   */
  headerMode?: 'full-width' | 'content-only'
  /**
   * 布局高度
   */
  height?: number | string
  /**
   * 是否启用响应式模式
   */
  responsive?: boolean
  /**
   * 响应式断点（px）
   */
  breakpoint?: number
  /**
   * 侧边栏是否可折叠
   */
  collapsible?: boolean
  /**
   * 侧边栏默认是否折叠
   */
  collapsed?: boolean
  /**
   * 侧边栏宽度
   */
  asideWidth?: number | string
  /**
   * 头部高度
   */
  headerHeight?: number | string
  /**
   * 底部高度
   */
  footerHeight?: number | string
  /**
   * 自定义元素标签
   */
  tag?: string
}

const SPLayout = defineComponent({
  name: 'SPLayout',
  props: {
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal',
    },
    headerMode: {
      type: String as PropType<'full-width' | 'content-only'>,
      default: 'full-width',
    },
    height: {
      type: [Number, String] as PropType<number | string>,
      default: '100vh',
    },
    responsive: {
      type: Boolean,
      default: true,
    },
    breakpoint: {
      type: Number,
      default: 768,
    },
    collapsible: {
      type: Boolean,
      default: true,
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
    asideWidth: {
      type: [Number, String] as PropType<number | string>,
      default: 240,
    },
    headerHeight: {
      type: [Number, String] as PropType<number | string>,
      default: 64,
    },
    footerHeight: {
      type: [Number, String] as PropType<number | string>,
      default: 64,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
  emits: ['collapse-change'],
  setup(props, { slots, emit }) {
    // 初始化时检查屏幕尺寸
    const initialIsMobile =
      props.responsive && window.innerWidth < props.breakpoint
    
    // 分别管理左右侧边栏的折叠状态
    const isLeftAsideCollapsed = ref(initialIsMobile ? true : props.collapsed)
    const isRightAsideCollapsed = ref(initialIsMobile ? true : props.collapsed)
    const isMobile = ref(initialIsMobile)

    // 分析子组件类型
    const layoutStructure = computed(() => {
      const children = slots.default?.()
      const structure = {
        hasHeader: false,
        hasLeftAside: false,
        hasRightAside: false,
        hasMain: false,
        hasFooter: false,
      }

      children?.forEach(vnode => {
        if (vnode.type && typeof vnode.type === 'object') {
          const componentName = (vnode.type as any).name
          switch (componentName) {
            case 'SPLayoutHeader':
              structure.hasHeader = true
              break
            case 'SPLayoutAside':
              // 检查侧边栏位置
              const position = vnode.props?.position || 'left'
              if (position === 'left') {
                structure.hasLeftAside = true
              } else {
                structure.hasRightAside = true
              }
              break
            case 'SPLayoutMain':
              structure.hasMain = true
              break
            case 'SPLayoutFooter':
              structure.hasFooter = true
              break
          }
        }
      })

      return structure
    })

    // 响应式检测
    const checkScreenSize = () => {
      if (props.responsive) {
        const width = window.innerWidth
        const newIsMobile = width < props.breakpoint

        if (newIsMobile !== isMobile.value) {
          isMobile.value = newIsMobile
          if (newIsMobile) {
            // 切换到移动端时，折叠所有侧边栏
            if (layoutStructure.value.hasLeftAside) {
              isLeftAsideCollapsed.value = true
            }
            if (layoutStructure.value.hasRightAside) {
              isRightAsideCollapsed.value = true
            }
          } else {
            // 切换到桌面端时，展开所有侧边栏
            if (layoutStructure.value.hasLeftAside) {
              isLeftAsideCollapsed.value = false
            }
            if (layoutStructure.value.hasRightAside) {
              isRightAsideCollapsed.value = false
            }
          }
        }
      }
    }

    // 切换侧边栏状态（可指定左右）
    const toggleCollapse = (position: 'left' | 'right' | 'both' = 'left') => {
      if (!props.collapsible) return
      if (position === 'left') {
        isLeftAsideCollapsed.value = !isLeftAsideCollapsed.value
        emit('collapse-change', isLeftAsideCollapsed.value)
      } else if (position === 'right') {
        isRightAsideCollapsed.value = !isRightAsideCollapsed.value
        emit('collapse-change', isRightAsideCollapsed.value)
      } else {
        // both 的情况：同时切换左右
        const newLeft = !isLeftAsideCollapsed.value
        const newRight = !isRightAsideCollapsed.value
        isLeftAsideCollapsed.value = newLeft
        isRightAsideCollapsed.value = newRight
        emit('collapse-change', newLeft && newRight)
      }
    }

    // 提供给子组件的上下文
    provide('spLayout', {
      direction: computed(() => props.direction),
      isMobile: computed(() => isMobile.value),
      hasAside: computed(
        () =>
          layoutStructure.value.hasLeftAside ||
          layoutStructure.value.hasRightAside
      ),
      // 新增：分别提供左右侧边栏是否存在
      hasLeftAside: computed(() => layoutStructure.value.hasLeftAside),
      hasRightAside: computed(() => layoutStructure.value.hasRightAside),
      // 独立的左右折叠状态
      isLeftCollapsed: computed(() => isLeftAsideCollapsed.value),
      isRightCollapsed: computed(() => isRightAsideCollapsed.value),
      // 切换方法
      toggleCollapse,
    })

    // 计算 Grid 模板区域
    const gridTemplateAreas = computed(() => {
      const { hasHeader, hasLeftAside, hasRightAside, hasMain, hasFooter } =
        layoutStructure.value

      // 在移动端或侧边栏折叠时，不显示侧边栏区域
      const showLeftAside =
        hasLeftAside && !isMobile.value && !isLeftAsideCollapsed.value
      const showRightAside =
        hasRightAside && !isMobile.value && !isRightAsideCollapsed.value

      if (props.direction === 'vertical') {
        // 垂直布局：所有组件垂直排列
        let areas = [] as string[]
        if (hasHeader) areas.push('"header"')
        if (showLeftAside) areas.push('"aside-left"')
        if (hasMain) areas.push('"main"')
        if (showRightAside) areas.push('"aside-right"')
        if (hasFooter) areas.push('"footer"')
        return areas.join(' ')
      } else {
        // 水平布局
        let areas = [] as string[]

        // 构建列模板：左侧边栏 + 主内容 + 右侧边栏
        const buildRowTemplate = (content: string) => {
          let row = ''
          if (showLeftAside) row += 'aside-left '
          row += content
          if (showRightAside) row += ' aside-right'
          return `"${row.trim()}"`
        }

        if (props.headerMode === 'content-only') {
          // content-only 模式：侧边栏占满高度，header/main/footer 在中间
          if (hasHeader) areas.push(buildRowTemplate('header'))
          if (hasMain) areas.push(buildRowTemplate('main'))
          if (hasFooter) areas.push(buildRowTemplate('footer'))
        } else {
          // full-width 模式：header 和 footer 横跨全宽
          if (hasHeader) {
            // Header 横跨所有列
            let headerRow = 'header'
            if (showLeftAside || showRightAside) {
              headerRow = 'header header'
              if (showLeftAside && showRightAside) {
                headerRow = 'header header header'
              }
            }
            areas.push(`"${headerRow}"`)
          }

          // 中间内容区域
          if (hasMain) {
            areas.push(buildRowTemplate('main'))
          } else if (showLeftAside || showRightAside) {
            // 只有侧边栏没有主内容
            areas.push(buildRowTemplate(''))
          }

          // Footer 横跨所有列
          if (hasFooter) {
            let footerRow = 'footer'
            if (showLeftAside || showRightAside) {
              footerRow = 'footer footer'
              if (showLeftAside && showRightAside) {
                footerRow = 'footer footer footer'
              }
            }
            areas.push(`"${footerRow}"`)
          }
        }

        return areas.join(' ')
      }
    })

    // 计算 Grid 模板列
    const gridTemplateColumns = computed(() => {
      const { hasLeftAside, hasRightAside } = layoutStructure.value

      // 垂直布局时，只有一列
      if (props.direction === 'vertical') {
        return '1fr'
      }

      // 水平布局：构建列模板
      let columns: string[] = []

      // 在移动端或侧边栏折叠时，不显示侧边栏区域
      const showLeftAside =
        hasLeftAside && !isMobile.value && !isLeftAsideCollapsed.value
      const showRightAside =
        hasRightAside && !isMobile.value && !isRightAsideCollapsed.value

      // 左侧边栏
      if (showLeftAside) {
        const leftAsideWidth =
          typeof props.asideWidth === 'number'
            ? `${props.asideWidth}px`
            : props.asideWidth
        columns.push(leftAsideWidth)
      }

      // 主内容区域
      columns.push('1fr')

      // 右侧边栏
      if (showRightAside) {
        const rightAsideWidth =
          typeof props.asideWidth === 'number'
            ? `${props.asideWidth}px`
            : props.asideWidth
        columns.push(rightAsideWidth)
      }

      return columns.join(' ')
    })

    // 计算 Grid 模板行
    const gridTemplateRows = computed(() => {
      const { hasHeader, hasFooter } = layoutStructure.value

      if (props.direction === 'horizontal') {
        let rows: string[] = []
        if (hasHeader) {
          const headerHeight =
            typeof props.headerHeight === 'number'
              ? `${props.headerHeight}px`
              : props.headerHeight
          rows.push(headerHeight)
        }
        rows.push('1fr') // main content area
        if (hasFooter) {
          const footerHeight =
            typeof props.footerHeight === 'number'
              ? `${props.footerHeight}px`
              : props.footerHeight
          rows.push(footerHeight)
        }
        return rows.join(' ')
      } else {
        // 垂直布局：每个组件自适应高度
        return 'auto'
      }
    })

    // 计算布局类名
    const layoutClasses = computed(() => {
      return [
        'sp-layout',
        `sp-layout--${props.direction}`,
        {
          'sp-layout--mobile': isMobile.value,
          'sp-layout--has-aside':
            layoutStructure.value.hasLeftAside ||
            layoutStructure.value.hasRightAside,
          'sp-layout--has-left-aside': layoutStructure.value.hasLeftAside,
          'sp-layout--has-right-aside': layoutStructure.value.hasRightAside,
          'sp-layout--left-collapsed': isLeftAsideCollapsed.value,
          'sp-layout--right-collapsed': isRightAsideCollapsed.value,
        },
      ]
    })

    onMounted(() => {
      if (props.responsive) {
        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
      }
    })

    onUnmounted(() => {
      if (props.responsive) {
        window.removeEventListener('resize', checkScreenSize)
      }
    })

    return () => {
      // return (
      //   <SPGrid
      //     class={layoutClasses.value}
      //     templateAreas={gridTemplateAreas.value}
      //     templateColumns={gridTemplateColumns.value}
      //     templateRows={gridTemplateRows.value}
      //     style={{
      //       minHeight:
      //         typeof props.height === 'number'
      //           ? `${props.height}px`
      //           : props.height,
      //       width: '100%',
      //       position: 'relative',
      //     }}
      //   >
      //     {slots.default?.()}
      //   </SPGrid>
      // )
    }
  },
})

export default SPLayout
