// Components
import { VExpandTransition } from '@/components/transitions'
import { SPDefaultsProvider } from '@/components/SPDefaultsProvider'

// Composables
import { useList } from '../list'
import { makeComponentProps } from '@/composables/component'
import { IconValue } from '@/composables/icons'
import { useNestedGroupActivator, useNestedItem } from '@/composables/nested/nested'
import { useSsrBoot } from '@/composables/ssrBoot'
import { makeTagProps } from '@/composables/tag'
import { MaybeTransition } from '@/composables/transition'

// Utilities
import { computed } from 'vue'
import { defineComponent, genericComponent, propsFactory, useRender } from '@/utils'

export type SPListGroupSlots = {
  default: never
  activator: { isOpen: boolean, props: Record<string, unknown> }
}

const SPListGroupActivator = defineComponent({
  name: 'SPListGroupActivator',

  setup (_, { slots }) {
    useNestedGroupActivator()

    return () => slots.default?.()
  },
})

export const makeSPListGroupProps = propsFactory({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: IconValue,
    default: '$collapse',
  },
  disabled: Boolean,
  expandIcon: {
    type: IconValue,
    default: '$expand',
  },
  rawId: [String, Number],
  prependIcon: IconValue,
  appendIcon: IconValue,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'SPListGroup')

export const SPListGroup = genericComponent<SPListGroupSlots>()({
  name: 'SPListGroup',

  props: makeSPListGroupProps(),

  setup (props, { slots }) {
    const { isOpen, open, id: _id } = useNestedItem(() => props.value, () => props.disabled, true)
    const id = computed(() => `sp-list-group--id-${String(props.rawId ?? _id.value)}`)
    const list = useList()
    const { isBooted } = useSsrBoot()

    function onClick (e: Event) {
      if (['INPUT', 'TEXTAREA'].includes((e.target as Element)?.tagName)) return
      open(!isOpen.value, e)
    }

    const activatorProps = computed(() => ({
      onClick,
      class: 'sp-list-group__header',
      id: id.value,
    }))

    const toggleIcon = computed(() => isOpen.value ? props.collapseIcon : props.expandIcon)
    const activatorDefaults = computed(() => ({
      SPListItem: {
        activeColor: props.activeColor,
        baseColor: props.baseColor,
        color: props.color,
        prependIcon: props.prependIcon || (props.subgroup && toggleIcon.value),
        appendIcon: props.appendIcon || (!props.subgroup && toggleIcon.value),
        title: props.title,
        value: props.value,
      },
    }))

    useRender(() => {
      const Tag = props.tag as any
      return (
        <Tag
          class={[
            'sp-list-group',
            {
              'sp-list-group--prepend': list?.hasPrepend.value,
              'sp-list-group--fluid': props.fluid,
            'sp-list-group--subgroup': props.subgroup,
            'sp-list-group--open': isOpen.value,
          },
          props.class,
        ]}
        style={ props.style }
      >
        { slots.activator && (
          <SPDefaultsProvider defaults={ activatorDefaults.value }>
            <SPListGroupActivator>
              { slots.activator({ props: activatorProps.value, isOpen: isOpen.value }) }
            </SPListGroupActivator>
          </SPDefaultsProvider>
        )}

        <MaybeTransition transition={{ component: VExpandTransition }} disabled={ !isBooted.value }>
          <div class="sp-list-group__items" role="group" aria-labelledby={ id.value } v-show={ isOpen.value }>
            { slots.default?.() }
          </div>
        </MaybeTransition>
        </Tag>
      )
    })

    return {
      isOpen,
    }
  },
})

export type SPListGroup = InstanceType<typeof SPListGroup>
