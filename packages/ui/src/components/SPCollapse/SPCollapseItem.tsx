// Styles
import './style/SPCollapse.scss'

// Components
import SpIcon from '@/components/icon'
import { VExpandTransition } from '@/components/transitions'
import { SPDivider } from '@/components/SPDivider'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, inject, ref } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/utils'

// Types
import type { PropType } from 'vue'
import { SPCollapseSymbol } from './types'

export interface SPCollapseItemSlots {
  default: never
  title: { isActive: boolean }
  icon: { isActive: boolean }
  underline: { isActive: boolean }
  [key: string]: unknown
}

export const makeSPCollapseItemProps = propsFactory(
  {
    name: {
      type: [String, Number] as PropType<string | number>,
      required: true,
    },
    title: String,
    // Use SpIcon only; accept string icon names
    icon: String as PropType<string>,
    disabled: Boolean,

    ...makeComponentProps(),
    ...makeThemeProps(),
  },
  'SPCollapseItem'
)

export const SPCollapseItem = genericComponent<SPCollapseItemSlots>()({
  name: 'SPCollapseItem',

  props: makeSPCollapseItemProps(),

  setup(props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const collapse = inject(SPCollapseSymbol)!

    if (!collapse) {
      throw new Error(
        '[SPCollapse] SPCollapseItem must be used inside SPCollapse'
      )
    }

    const isActive = computed(() => collapse.isOpen(props.name))
    const contentRef = ref<HTMLElement>()

    function handleHeaderClick() {
      if (props.disabled) return
      collapse.toggle(props.name)
    }

    function handleKeydown(e: KeyboardEvent) {
      if (props.disabled) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        collapse.toggle(props.name)
      }
    }

    const expandIconName = computed<string>(() => 'chevronRight')

    useRender(() => (
      <div
        class={[
          'sp-collapse-item',
          {
            'sp-collapse-item--active': isActive.value,
            'sp-collapse-item--disabled': props.disabled,
            'sp-collapse-item--custom-underline': Boolean(slots.underline),
          },
          themeClasses.value,
          props.class,
        ]}
        style={props.style}
      >
        <div
          class={[
            'sp-collapse-item__header',
            {
              'sp-collapse-item__header--icon-left':
                collapse.expandIconPosition.value === 'left',
            },
          ]}
          role="button"
          tabindex={props.disabled ? -1 : 0}
          aria-expanded={isActive.value}
          aria-disabled={props.disabled}
          id={`sp-collapse-item-${props.name}`}
          aria-controls={`sp-collapse-panel-${props.name}`}
          onClick={handleHeaderClick}
          onKeydown={handleKeydown}
        >
          {collapse.expandIconPosition.value === 'left' && (
            <div class="sp-collapse-item__icon sp-collapse-item__icon--left">
              {slots.icon ? (
                slots.icon({ isActive: isActive.value })
              ) : props.icon ? (
                <SpIcon
                  name={props.icon}
                  class={{
                    'sp-collapse-item__expand-icon': true,
                    'sp-collapse-item__expand-icon--active': isActive.value,
                  }}
                />
              ) : (
                <SpIcon
                  name={expandIconName.value}
                  class={{
                    'sp-collapse-item__expand-icon': true,
                    'sp-collapse-item__expand-icon--rotatable': true,
                    'sp-collapse-item__expand-icon--active': isActive.value,
                  }}
                />
              )}
            </div>
          )}

          <div class="sp-collapse-item__title">
            {slots.title
              ? slots.title({ isActive: isActive.value })
              : props.title}
          </div>

          {collapse.expandIconPosition.value === 'right' && (
            <div class="sp-collapse-item__icon sp-collapse-item__icon--right">
              {slots.icon ? (
                slots.icon({ isActive: isActive.value })
              ) : props.icon ? (
                <SpIcon
                  name={props.icon}
                  class={{
                    'sp-collapse-item__expand-icon': true,
                    'sp-collapse-item__expand-icon--active': isActive.value,
                  }}
                />
              ) : (
                <SpIcon
                  name={expandIconName.value}
                  class={{
                    'sp-collapse-item__expand-icon': true,
                    'sp-collapse-item__expand-icon--rotatable': true,
                    'sp-collapse-item__expand-icon--active': isActive.value,
                  }}
                />
              )}
            </div>
          )}
        </div>

        <VExpandTransition>
          {isActive.value && (
            <div
              ref={contentRef}
              class="sp-collapse-item__content"
              role="region"
              id={`sp-collapse-panel-${props.name}`}
              aria-labelledby={`sp-collapse-item-${props.name}`}
            >
              <div class="sp-collapse-item__content-wrapper">
                {slots.default?.()}
              </div>
            </div>
          )}
        </VExpandTransition>

        <div class="sp-collapse-item__underline">
          {slots.underline ? (
            slots.underline({ isActive: isActive.value })
          ) : (
            <SPDivider class="sp-collapse-item__divider" />
          )}
        </div>
      </div>
    ))

    return {
      isActive,
    }
  },
})

export type SPCollapseItem = InstanceType<typeof SPCollapseItem>
