// Styles
import './SPSidebar.sass'

// Components
import { SPBtn } from '../SPBtn'
import SpIcon from '../icon/Icon'

// Composables
import { useElevation } from '@/composables/elevation'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useRounded } from '@/composables/rounded'
import { provideTheme } from '@/composables/theme'
import { genOverlays } from '@/composables/variant'

// Utilities
import { computed } from 'vue'
import { convertToUnit, genericComponent } from '@/utils'

// Local
import { makeSPSidebarProps } from './props'
import type { SPSidebarSlots } from './types'

export const SPSidebar = genericComponent<SPSidebarSlots>()({
  name: 'SPSidebar',

  props: makeSPSidebarProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup(props, { slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    
    const Tag = props.tag as any

    const { themeClasses } = provideTheme(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props, 'sp-sidebar')

    const sidebarWidth = computed(() => {
      if (!isActive.value && !props.permanent) return '0px'
      if (props.rail && !isActive.value) return convertToUnit(props.railWidth)
      return convertToUnit(props.width)
    })

    const sidebarStyles = computed(() => ({
      width: sidebarWidth.value,
      backgroundColor: props.bgColor,
      color: props.color,
    }))

    const toggleSidebar = () => {
      isActive.value = !isActive.value
    }

    // 默认切换按钮渲染函数
    const renderDefaultToggle = () => {
      const iconName = props.location === 'left'
        ? (isActive.value ? 'ChevronBack' : 'ChevronForward')
        : (isActive.value ? 'ChevronForward' : 'ChevronBack')

      return (
        <SPBtn
          icon
          variant="elevated"
          size="small"
          rounded="circle"
          elevation={2}
        >
          <SpIcon name={iconName} size={20} />
        </SPBtn>
      )
    }

    return () => {
      const hasPrepend = !!slots.prepend
      const hasAppend = !!slots.append
      const hasToggle = !!slots.toggle

      return (
        <Tag
          class={[
            'sp-sidebar',
            {
              [`sp-sidebar--${props.location}`]: true,
              'sp-sidebar--rail': props.rail,
              'sp-sidebar--floating': props.floating,
              'sp-sidebar--closed': !isActive.value && !props.permanent,
            },
            themeClasses.value,
            elevationClasses.value,
            roundedClasses.value,
            props.class,
          ]}
          style={[sidebarStyles.value, props.style]}
          role="complementary"
        >
          {genOverlays(false, 'sp-sidebar')}

          {hasPrepend && (
            <div class="sp-sidebar__prepend">{slots.prepend?.()}</div>
          )}

          <div class="sp-sidebar__content">{slots.default?.()}</div>

          {hasAppend && (
            <div class="sp-sidebar__append">{slots.append?.()}</div>
          )}

          {/* 切换按钮 - 仅在非永久模式下显示 */}
          {!props.permanent && (
            <div
              class={[
                'sp-sidebar__toggle',
                `sp-sidebar__toggle--${props.location}`,
              ]}
              onClick={toggleSidebar}
            >
              {hasToggle
                ? slots.toggle?.({ isOpen: isActive.value, toggle: toggleSidebar })
                : renderDefaultToggle()
              }
            </div>
          )}
        </Tag>
      )
    }
  },
})

export type SPSidebar = InstanceType<typeof SPSidebar>
