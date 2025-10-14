// Styles
import './style/SPMenu.sass'

// Components
import { SPDefaultsProvider } from '../SPDefaultsProvider'
import { SPOverlay } from '../SPOverlay'

// Composables
import { forwardRefs } from '@/composables/forwardRefs'
import { useRtl } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useScopeId } from '@/composables/scopeId'

// Utilities
import {
  computed,
  inject,
  mergeProps,
  nextTick,
  onBeforeUnmount,
  onDeactivated,
  provide,
  ref,
  shallowRef,
  toRef,
  useId,
  watch,
} from 'vue'
import {
  focusableChildren,
  focusChild,
  genericComponent,
  getNextElement,
  IN_BROWSER,
  isClickInsideElement,
  useRender,
} from '@/utils'

// Local
import { makeSPMenuProps } from './props'
import { SPMenuSymbol } from './types'
import type { SPMenuSlots } from './types'

/**
 * SPMenu - 菜单组件实现
 */
export const SPMenu = genericComponent<SPMenuSlots>()({
  name: 'SPMenu',

  props: makeSPMenuProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
    afterEnter: () => true,
    afterLeave: () => true,
  },

  setup(props, { slots, attrs }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { scopeId } = useScopeId()
    const { isRtl } = useRtl()

    const uid = useId()
    const id = toRef(() => props.id || `sp-menu-${uid}`)

    const overlay = ref<SPOverlay>()

    const parent = inject(SPMenuSymbol, null)
    const openChildren = shallowRef(new Set<string>())
    provide(SPMenuSymbol, {
      register() {
        openChildren.value.add(uid)
      },
      unregister() {
        openChildren.value.delete(uid)
      },
      closeParents(e) {
        setTimeout(() => {
          if (
            !openChildren.value.size &&
            !props.persistent &&
            (e == null ||
              (overlay.value?.contentEl &&
                !isClickInsideElement(e, overlay.value.contentEl)))
          ) {
            isActive.value = false
            parent?.closeParents()
          }
        }, 40)
      },
    })

    onBeforeUnmount(() => {
      parent?.unregister()
      document.removeEventListener('focusin', onFocusIn)
    })
    onDeactivated(() => (isActive.value = false))

    async function onFocusIn(e: FocusEvent) {
      const before = e.relatedTarget as HTMLElement | null
      const after = e.target as HTMLElement | null

      await nextTick()

      if (
        isActive.value &&
        before !== after &&
        overlay.value?.contentEl &&
        // We're the topmost menu
        overlay.value?.globalTop &&
        // It isn't the document or the menu body
        ![document, overlay.value.contentEl].includes(after!) &&
        // It isn't inside the menu body
        !overlay.value.contentEl.contains(after)
      ) {
        const focusable = focusableChildren(overlay.value.contentEl)
        focusable[0]?.focus()
      }
    }

    watch(
      isActive,
      val => {
        if (val) {
          parent?.register()
          if (IN_BROWSER && !props.disableInitialFocus) {
            document.addEventListener('focusin', onFocusIn, { once: true })
          }
        } else {
          parent?.unregister()
          if (IN_BROWSER) {
            document.removeEventListener('focusin', onFocusIn)
          }
        }
      },
      { immediate: true }
    )

    function onClickOutside(e: MouseEvent) {
      parent?.closeParents(e)
    }

    function onKeydown(e: KeyboardEvent) {
      if (props.disabled) return

      if (
        e.key === 'Tab' ||
        (e.key === 'Enter' && !props.closeOnContentClick)
      ) {
        if (
          e.key === 'Enter' &&
          (e.target instanceof HTMLTextAreaElement ||
            (e.target instanceof HTMLInputElement &&
              !!e.target.closest('form')))
        )
          return
        if (e.key === 'Enter') e.preventDefault()

        const nextElement = getNextElement(
          focusableChildren(overlay.value?.contentEl as Element, false),
          e.shiftKey ? 'prev' : 'next',
          (el: HTMLElement) => el.tabIndex >= 0
        )
        if (!nextElement) {
          isActive.value = false
          overlay.value?.activatorEl?.focus()
        }
      } else if (
        props.submenu &&
        e.key === (isRtl.value ? 'ArrowRight' : 'ArrowLeft')
      ) {
        isActive.value = false
        overlay.value?.activatorEl?.focus()
      }
    }

    function onActivatorKeydown(e: KeyboardEvent) {
      if (props.disabled) return

      const el = overlay.value?.contentEl
      if (el && isActive.value) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          e.stopImmediatePropagation()
          focusChild(el, 'next')
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          e.stopImmediatePropagation()
          focusChild(el, 'prev')
        } else if (props.submenu) {
          if (e.key === (isRtl.value ? 'ArrowRight' : 'ArrowLeft')) {
            isActive.value = false
          } else if (e.key === (isRtl.value ? 'ArrowLeft' : 'ArrowRight')) {
            e.preventDefault()
            focusChild(el, 'first')
          }
        }
      } else if (
        props.submenu
          ? e.key === (isRtl.value ? 'ArrowLeft' : 'ArrowRight')
          : ['ArrowDown', 'ArrowUp'].includes(e.key)
      ) {
        isActive.value = true
        e.preventDefault()
        // Wait for menu to open and render before handling keyboard navigation
        nextTick(() => {
          nextTick(() => onActivatorKeydown(e))
        })
      }
    }

    const activatorProps = computed(() =>
      mergeProps(
        {
          'aria-haspopup': 'menu',
          'aria-expanded': String(isActive.value),
          'aria-controls': id.value,
          onKeydown: onActivatorKeydown,
        },
        props.activatorProps
      )
    )

    useRender(() => {
      const overlayProps = SPOverlay.filterProps(props)

      return (
        <SPOverlay
          ref={overlay}
          id={id.value}
          class={['sp-menu', props.class]}
          style={props.style}
          {...attrs}
          {...overlayProps}
          v-model={isActive.value}
          absolute
          activatorProps={activatorProps.value}
          location={props.location ?? (props.submenu ? 'end' : 'bottom')}
          onClick:outside={onClickOutside}
          onKeydown={onKeydown}
          {...scopeId}
        >
          {{
            activator: slots.activator,
            default: (...args: any[]) => (
              <SPDefaultsProvider root="SPMenu">
                {slots.default?.(args[0])}
              </SPDefaultsProvider>
            ),
          }}
        </SPOverlay>
      )
    })

    return forwardRefs({ id, ΨopenChildren: openChildren }, overlay)
  },
})

export type SPMenu = InstanceType<typeof SPMenu>
