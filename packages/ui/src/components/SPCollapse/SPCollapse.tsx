// Styles
import './style/SPCollapse.scss'

// Props & Types
import { makeSPCollapseProps } from './props'
import type { SPCollapseSlots, SPCollapseContext } from './types'
import { SPCollapseSymbol as CollapseSymbol } from './types'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import { provideTheme } from '@/composables/theme'

// Utilities
import { computed, provide, toRef } from 'vue'
import { genericComponent, useRender, wrapInArray } from '@/utils'

export const SPCollapse = genericComponent<SPCollapseSlots>()({
  name: 'SPCollapse',

  props: makeSPCollapseProps(),

  emits: {
    'update:modelValue': (value: readonly (string | number)[] | string | number) => true,
    change: (value: readonly (string | number)[] | string | number) => true,
  },

  setup(props, { emit, slots }) {
    const { themeClasses } = provideTheme(props)

    const model = useProxiedModel(
      props,
      'modelValue',
      props.modelValue,
      v => {
        if (props.accordion) {
          return v == null ? [] : wrapInArray(v)
        }
        return wrapInArray(v ?? [])
      },
      v => {
        if (props.accordion) {
          return (v.length ? v[0] : undefined) as string | number | readonly (string | number)[]
        }
        return v as string | number | readonly (string | number)[]
      }
    )

    const openPanels = computed(() => new Set(Array.isArray(model.value) ? model.value : [model.value]))

    function isOpen(name: string | number): boolean {
      return openPanels.value.has(name)
    }

    async function toggle(name: string | number, value?: boolean): Promise<void> {
      const currentlyOpen = isOpen(name)
      const newValue = value ?? !currentlyOpen

      // 调用 beforeChange 钩子
      if (props.beforeChange) {
        try {
          const result = await props.beforeChange(name, newValue)
          if (result === false) return
        } catch {
          return
        }
      }

      let newModel: (string | number)[]

      if (props.accordion) {
        newModel = newValue ? [name] : []
      } else {
        newModel = [...(Array.isArray(model.value) ? model.value : [model.value])]
        if (newValue) {
          if (!newModel.includes(name)) {
            newModel.push(name)
          }
        } else {
          const index = newModel.indexOf(name)
          if (index > -1) {
            newModel.splice(index, 1)
          }
        }
      }

      model.value = newModel
      const changeValue = props.accordion ? (newModel.length ? newModel[0] : undefined) : newModel
      emit('change', changeValue as string | number | readonly (string | number)[])
    }

    const collapseContext: SPCollapseContext = {
      isOpen,
      toggle,
      accordion: toRef(props, 'accordion'),
      expandIconPosition: toRef(props, 'expandIconPosition'),
      beforeChange: toRef(props, 'beforeChange'),
    }

    provide(CollapseSymbol, collapseContext)

    useRender(() => (
      <div
        class={[
          'sp-collapse',
          themeClasses.value,
          props.class,
        ]}
        style={props.style}
      >
        {slots.default?.()}
      </div>
    ))

    return {}
  },
})

export type SPCollapse = InstanceType<typeof SPCollapse>
