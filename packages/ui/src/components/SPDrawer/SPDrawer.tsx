// Styles
import './style/SPDrawer.scss'

// Props & Types
import { makeSPDrawerProps } from './props'
import type { SPDrawerSlots } from './types'

// Components
import { SPDefaultsProvider } from '@/components/SPDefaultsProvider'
import { SPOverlay } from '@/components/SPOverlay'
import {
  VDrawerBottomTransition,
  VDrawerLeftTransition,
  VDrawerRightTransition,
  VDrawerTopTransition,
} from './drawer-transitions'

// Composables
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useScopeId } from '@/composables/scopeId'

// Utilities
import { computed, mergeProps, ref } from 'vue'
import { genericComponent, useRender } from '@/utils'

// Types
import type { Component } from 'vue'

// Transition 映射 - 提到外面避免重复创建
const TRANSITION_MAP: Record<string, Component> = {
  left: VDrawerLeftTransition,
  right: VDrawerRightTransition,
  top: VDrawerTopTransition,
  bottom: VDrawerBottomTransition,
}

export const SPDrawer = genericComponent<SPDrawerSlots>()({
  name: 'SPDrawer',

  props: makeSPDrawerProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
    afterEnter: () => true,
    afterLeave: () => true,
  },

  setup(props, { slots, emit }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { scopeId } = useScopeId()

    const overlay = ref<SPOverlay>()

    const locationClasses = computed(() => `sp-drawer--${props.location}`)

    // 根据位置选择对应的 transition 组件
    const transitionComponent = computed(() => TRANSITION_MAP[props.location])

    // 根据位置计算宽度/高度
    const dimensionProps = computed(() => {
      const isHorizontal =
        props.location === 'left' || props.location === 'right'

      if (isHorizontal) {
        // 左右抽屉：使用 width，默认 256px
        return {
          width: props.width || 256,
          height: undefined,
        }
      } else {
        // 上下抽屉：使用 height，width 默认 100%
        return {
          width: props.width || '100%',
          height: props.height,
        }
      }
    })

    function onAfterEnter() {
      emit('afterEnter')
    }

    function onAfterLeave() {
      emit('afterLeave')
    }

    useRender(() => {
      const overlayProps = SPOverlay.filterProps(props)
      const activatorProps = mergeProps(
        {
          'aria-haspopup': 'dialog',
        },
        props.activatorProps
      )
      const contentProps = mergeProps(
        {
          tabindex: -1,
        },
        props.contentProps
      )

      return (
        <SPOverlay
          ref={overlay}
          class={[
            'sp-drawer',
            locationClasses.value,
            {
              'sp-drawer--temporary': props.temporary,
              'sp-drawer--permanent': props.permanent,
            },
            props.class,
          ]}
          style={props.style}
          {...overlayProps}
          v-model={isActive.value}
          aria-modal="true"
          activatorProps={activatorProps}
          contentProps={contentProps}
          width={dimensionProps.value.width}
          height={dimensionProps.value.height}
          role="navigation"
          transition={{ component: transitionComponent.value }}
          onAfterEnter={onAfterEnter}
          onAfterLeave={onAfterLeave}
          {...scopeId}
        >
          {{
            activator: slots.activator,
            default: (...args: any[]) => (
              <SPDefaultsProvider root="SPDrawer">
                {slots.default?.(...(args as Parameters<typeof slots.default>))}
              </SPDefaultsProvider>
            ),
          }}
        </SPOverlay>
      )
    })

    return forwardRefs({}, overlay)
  },
})

export type SPDrawer = InstanceType<typeof SPDrawer>
