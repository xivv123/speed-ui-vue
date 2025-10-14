/**
 * SPProgCir - 圆形进度条组件
 *
 * 这是一个用于显示任务或操作完成进度的圆形进度条组件。
 * 支持确定进度（显示具体百分比）和不确定进度（无限循环动画）两种模式。
 *
 * 主要功能：
 * - 显示0-100%的进度值
 * - 支持不确定进度的循环动画
 * - 可自定义颜色、大小、线条宽度
 * - 支持旋转角度调整
 * - 可在中心显示自定义内容（如百分比文字）
 * - 具备无障碍访问支持
 * - 支持视口交集检测优化性能
 */

// Styles
import './SPProgCir.sass'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { useIntersectionObserver } from '@/composables/intersectionObserver'
import { useResizeObserver } from '@/composables/resizeObserver'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { ref, toRef, watchEffect } from 'vue'
import {
  clamp,
  convertToUnit,
  genericComponent,
  propsFactory,
  useRender,
} from '@/utils'

// Types
import type { PropType } from 'vue'

/**
 * SPProgCir组件的属性定义
 */
export const makeSPProgCirProps = propsFactory(
  {
    /** 背景圆环的颜色 */
    bgColor: String,
    /** 进度圆环的颜色 */
    color: String,
    /**
     * 是否为不确定进度模式
     * - true: 显示无限循环动画
     * - 'disable-shrink': 禁用收缩动画的不确定模式
     * - false: 确定进度模式，显示具体进度值
     */
    indeterminate: [Boolean, String] as PropType<boolean | 'disable-shrink'>,
    /**
     * 进度值，范围0-100
     * 在确定进度模式下表示完成百分比
     */
    modelValue: {
      type: [Number, String],
      default: 0,
    },
    /**
     * 进度条的旋转角度（度数）
     * 可用于调整进度条的起始位置
     */
    rotate: {
      type: [Number, String],
      default: 0,
    },
    /**
     * 进度条线条的宽度（像素）
     * 影响圆环的粗细程度
     */
    width: {
      type: [Number, String],
      default: 4,
    },

    ...makeComponentProps(),
    ...makeSizeProps(),
    ...makeTagProps({ tag: 'div' }),
    ...makeThemeProps(),
  },
  'SPProgCir'
)

/**
 * SPProgCir组件的插槽类型定义
 */
type SPProgCirSlots = {
  /** 默认插槽，用于在进度条中心显示自定义内容，如百分比文字 */
  default: { value: number }
}

/**
 * SPProgCir - 圆形进度条组件实现
 */
export const SPProgCir = genericComponent<SPProgCirSlots>()({
  name: 'SPProgCir',

  props: makeSPProgCirProps(),

  setup(props, { slots }) {
    // SVG圆形的半径常量，用于计算圆周长
    const MAGIC_RADIUS_CONSTANT = 20
    // 圆的周长，用于计算stroke-dasharray和stroke-dashoffset
    const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT

    // 根元素的引用
    const root = ref<HTMLElement>()

    // 使用各种composables获取样式和功能
    const { themeClasses } = provideTheme(props)
    const { sizeClasses, sizeStyles } = useSize(props)
    // 进度条颜色样式
    const { textColorClasses, textColorStyles } = useTextColor(
      () => props.color
    )
    // 背景圆环颜色样式
    const {
      textColorClasses: underlayColorClasses,
      textColorStyles: underlayColorStyles,
    } = useTextColor(() => props.bgColor)
    // 视口交集观察器，用于性能优化
    const { intersectionRef, isIntersecting } = useIntersectionObserver()
    // 尺寸观察器，用于响应式调整大小
    const { resizeRef, contentRect } = useResizeObserver()

    // 将进度值标准化到0-100范围内
    const normalizedValue = toRef(() =>
      String(clamp(parseFloat(String(props.modelValue)), 0, 100))
    )
    // 线条宽度
    const width = toRef(() => Number(props.width))
    // 计算组件的实际尺寸
    const size = toRef(() => {
      // 如果有尺寸样式，使用props.size；否则使用观察到的宽度或最小值32
      return sizeStyles.value
        ? Number(props.size)
        : contentRect.value
        ? contentRect.value.width
        : Math.max(width.value, 32)
    })
    // 计算SVG的直径，考虑线条宽度以避免裁剪
    const diameter = toRef(
      () => (MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value)) * 2
    )
    // 计算实际的stroke宽度
    const strokeWidth = toRef(() => (width.value / size.value) * diameter.value)
    // 计算stroke-dashoffset来显示进度，通过调整虚线偏移量实现进度效果
    const strokeDashOffset = toRef(() =>
      convertToUnit(
        ((100 - Number(normalizedValue.value)) / 100) * CIRCUMFERENCE
      )
    )

    // 监听根元素变化，设置观察器的目标元素
    watchEffect(() => {
      intersectionRef.value = root.value
      resizeRef.value = root.value
    })

    // 渲染组件
    useRender(() => {
      const Tag = props.tag as any

      return (
        <Tag
          ref={root}
          class={[
            'sp-prog-cir',
            {
              // 不确定进度模式的样式类
              'sp-prog-cir--indeterminate': !!props.indeterminate,
              // 当元素在视口中时显示动画
              'sp-prog-cir--visible': isIntersecting.value,
              // 禁用收缩动画的样式类
              'sp-prog-cir--disable-shrink':
                props.indeterminate === 'disable-shrink',
            },
            themeClasses.value,
            sizeClasses.value,
            textColorClasses.value,
            props.class,
          ]}
          style={[sizeStyles.value, textColorStyles.value, props.style]}
          // 无障碍访问属性
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={
            props.indeterminate ? undefined : normalizedValue.value
          }
        >
          {/* SVG圆形进度条 */}
          <svg
            style={{
              // 旋转SVG，默认从顶部开始(-90度)，再加上用户指定的旋转角度
              transform: `rotate(calc(-90deg + ${Number(props.rotate)}deg))`,
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${diameter.value} ${diameter.value}`}
          >
            {/* 背景圆环 - 显示进度条的轨道 */}
            <circle
              class={['sp-prog-cir__underlay', underlayColorClasses.value]}
              style={underlayColorStyles.value}
              fill="transparent"
              cx="50%"
              cy="50%"
              r={MAGIC_RADIUS_CONSTANT}
              stroke-width={strokeWidth.value}
              stroke-dasharray={CIRCUMFERENCE}
              stroke-dashoffset={0}
            />

            {/* 进度圆环 - 显示实际进度 */}
            <circle
              class="sp-prog-cir__overlay"
              fill="transparent"
              cx="50%"
              cy="50%"
              r={MAGIC_RADIUS_CONSTANT}
              stroke-width={strokeWidth.value}
              stroke-dasharray={CIRCUMFERENCE}
              // 通过调整dashoffset来显示进度百分比
              stroke-dashoffset={strokeDashOffset.value}
            />
          </svg>

          {/* 中心内容区域 - 可显示百分比文字等自定义内容 */}
          {slots.default && (
            <div class="sp-prog-cir__content">
              {slots.default({ value: Number(normalizedValue.value) })}
            </div>
          )}
        </Tag>
      )
    })

    return {}
  },
})

/**
 * SPProgCir组件的类型定义
 */
export type SPProgCir = InstanceType<typeof SPProgCir>
