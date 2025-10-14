// Styles
import './style/SPStretchBtn.scss'

// Utilities
import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useProxiedModel } from '@/composables/proxiedModel'
import { genericComponent, useRender, convertToUnit, animate } from '@/utils'

export const SPStretchBtn = genericComponent()({
  name: 'SPStretchBtn',

  props: {
    tag: { type: String, default: 'button' },
    size: { type: [Number, String], default: 48 },
    expandedWidth: { type: [Number, String], default: 160 },
    expandedHeight: { type: [Number, String], default: undefined }, // 默认与 size 相同
    duration: { type: Number, default: 300 },
    easing: { type: String, default: 'ease' },
    disabled: { type: Boolean, default: false },
    color: { type: String, default: '' }, // 留空则使用继承背景或主题色
    expanded: { type: Boolean, default: false },
    pill: { type: Boolean, default: true }, // 保持胶囊半径=高度/2
    closeOnOutsideClick: { type: Boolean, default: true },
  },

  emits: {
    'update:expanded': (val: boolean) => true,
    click: (e: MouseEvent) => true,
    expand: () => true,
    collapse: () => true,
  },

  setup(props, { slots, emit }) {
    const elRef = ref<HTMLElement>()
    const isAnimating = ref(false)

    const isExpanded = useProxiedModel(props, 'expanded')

    const widthCollapsed = computed(() => Number(props.size) || 48)
    const heightCollapsed = computed(() => Number(props.size) || 48)
    const widthExpanded = computed(() => Number(props.expandedWidth) || 160)
    const heightExpanded = computed(() =>
      props.expandedHeight !== undefined
        ? Number(props.expandedHeight)
        : heightCollapsed.value
    )

    const baseStyles = computed(() => ({
      '--sp-stretch-btn-width': convertToUnit(
        isExpanded.value ? widthExpanded.value : widthCollapsed.value
      ),
      '--sp-stretch-btn-height': convertToUnit(
        isExpanded.value ? heightExpanded.value : heightCollapsed.value
      ),
      '--sp-stretch-btn-radius': props.pill
        ? convertToUnit(
            (isExpanded.value ? heightExpanded.value : heightCollapsed.value) / 2
          )
        : isExpanded.value
          ? convertToUnit(12)
          : '50%',
      background: props.color || undefined,
    }))

    const onClick = (e: MouseEvent) => {
      if (props.disabled || isAnimating.value) return
      emit('click', e)
      // 只有内部点击用于展开；收回由外部点击触发
      if (!isExpanded.value) {
        isExpanded.value = true
        emit('expand')
      }
    }

    // 删除收缩切换逻辑，保持“内点只展开，外点才收回”的交互

    const animateMorph = async (toExpanded: boolean) => {
      if (!elRef.value) return
      const fromW = toExpanded ? widthCollapsed.value : widthExpanded.value
      const toW = toExpanded ? widthExpanded.value : widthCollapsed.value
      const fromH = toExpanded ? heightCollapsed.value : heightExpanded.value
      const toH = toExpanded ? heightExpanded.value : heightCollapsed.value
      const fromR = props.pill
        ? convertToUnit(fromH / 2)
        : toExpanded
          ? '50%'
          : convertToUnit(12)
      const toR = props.pill
        ? convertToUnit(toH / 2)
        : toExpanded
          ? convertToUnit(12)
          : '50%'

      const animation = animate(
        elRef.value,
        [
          { width: convertToUnit(fromW), height: convertToUnit(fromH), borderRadius: fromR },
          { width: convertToUnit(toW), height: convertToUnit(toH), borderRadius: toR },
        ],
        { duration: props.duration, easing: props.easing, fill: 'forwards' }
      )

      return animation.finished
    }

    const onDocumentPointerDown = (e: PointerEvent) => {
      if (!props.closeOnOutsideClick) return
      if (props.disabled || isAnimating.value) return
      const el = elRef.value
      const target = e.target as Node | null
      if (!el || !target) return
      // 若点击在按钮内部则忽略
      if (el.contains(target)) return
      // 点击外部并且已展开，则收回（动画由 watch 触发）
      if (isExpanded.value) {
        emit('collapse')
        isExpanded.value = false
      }
    }

    const __listenerOptions: AddEventListenerOptions = { capture: true }
    onMounted(() => {
      document.addEventListener('pointerdown', onDocumentPointerDown, __listenerOptions)
    })
    onBeforeUnmount(() => {
      document.removeEventListener('pointerdown', onDocumentPointerDown, __listenerOptions)
    })

    watch(
      isExpanded,
      async (val, old) => {
        if (val === old || isAnimating.value) return
        // 在渲染前触发动画，避免 DOM 先应用目标尺寸导致闪动
        isAnimating.value = true
        await animateMorph(!!val)
        isAnimating.value = false
      }
    )

    useRender(() => (
      <props.tag
        ref={elRef}
        class={[
          'sp-stretch-btn',
          { 'sp-stretch-btn--expanded': isExpanded.value, 'sp-stretch-btn--disabled': props.disabled, 'sp-stretch-btn--animating': isAnimating.value },
        ]}
        style={[baseStyles.value]}
        disabled={props.disabled}
        onClick={onClick}
      >
        {!isExpanded.value ? (
          <div class="sp-stretch-btn__default">
            {slots.default?.() || <span class="sp-stretch-btn__icon">+</span>}
          </div>
        ) : (
          <div class="sp-stretch-btn__expanded">
            {slots.expanded?.() || <span class="sp-stretch-btn__expanded-content">展开内容</span>}
          </div>
        )}
        <div class="sp-stretch-btn__background" />
      </props.tag>
    ))

    return {}
  },
})

export type SPStretchBtn = InstanceType<typeof SPStretchBtn>