// Styles
import './style/SPDialog.scss'
import './style/dialog.scss'

// Props & Types
import { makeSPDialogProps } from './props'
import type { SPDialogSlots } from './types'

// Components
// import { SPDialogTransition } from '@/components/transitions'
import { SPDefaultsProvider } from '@/components/SPDefaultsProvider'
import { SPOverlay } from '@/components/SPOverlay'

// Composables
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useScopeId } from '@/composables/scopeId'

// Utilities
import { mergeProps, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { focusableChildren, genericComponent, IN_BROWSER, useRender } from '@/utils'

export const SPDialog = genericComponent<SPDialogSlots>()({
  name: 'SPDialog',

  props: makeSPDialogProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
    afterEnter: () => true,
    afterLeave: () => true,
  },

  setup(props, { emit, slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { scopeId } = useScopeId()

    const overlay = ref<SPOverlay>()
    function onFocusin(e: FocusEvent) {
      const before = e.relatedTarget as HTMLElement | null
      const after = e.target as HTMLElement | null

      if (
        before !== after &&
        overlay.value?.contentEl &&
        // We're the topmost dialog
        overlay.value?.globalTop &&
        // It isn't the document or the dialog body
        ![document, overlay.value.contentEl].includes(after!) &&
        // It isn't inside the dialog body
        !overlay.value.contentEl.contains(after)
      ) {
        const focusable = focusableChildren(overlay.value.contentEl)

        if (!focusable.length) return

        const firstElement = focusable[0]
        const lastElement = focusable[focusable.length - 1]

        if (before === firstElement) {
          lastElement.focus()
        } else {
          firstElement.focus()
        }
      }
    }

    onBeforeUnmount(() => {
      document.removeEventListener('focusin', onFocusin)
    })

    if (IN_BROWSER) {
      watch(
        () => isActive.value && props.retainFocus,
        val => {
          val
            ? document.addEventListener('focusin', onFocusin)
            : document.removeEventListener('focusin', onFocusin)
        },
        { immediate: true }
      )
    }

    function onAfterEnter() {
      emit('afterEnter')
      if (
        (props.scrim || props.retainFocus) &&
        overlay.value?.contentEl &&
        !overlay.value.contentEl.contains(document.activeElement)
      ) {
        overlay.value.contentEl.focus({ preventScroll: true })
      }
    }

    function onAfterLeave() {
      emit('afterLeave')
    }

    watch(isActive, async val => {
      if (!val) {
        await nextTick()
        overlay.value!.activatorEl?.focus({ preventScroll: true })
      }
    })

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
            'sp-dialog',
            {
              'sp-dialog--fullscreen': props.fullscreen,
              'sp-dialog--scrollable': props.scrollable,
            },
            props.class,
          ]}
          style={props.style}
          {...overlayProps}
          v-model={isActive.value}
          aria-modal="true"
          activatorProps={activatorProps}
          contentProps={contentProps}
          height={!props.fullscreen ? props.height : undefined}
          width={!props.fullscreen ? props.width : undefined}
          maxHeight={!props.fullscreen ? props.maxHeight : undefined}
          maxWidth={!props.fullscreen ? props.maxWidth : undefined}
          role="dialog"
          onAfterEnter={onAfterEnter}
          onAfterLeave={onAfterLeave}
          {...scopeId}
        >
          {{
            activator: slots.activator,
            default: (...args: any[]) => (
              <SPDefaultsProvider root="SPDialog">
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

export type SPDialog = InstanceType<typeof SPDialog>

