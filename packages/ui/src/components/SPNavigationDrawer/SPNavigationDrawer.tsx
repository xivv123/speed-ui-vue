// Styles
import './SPNavigationDrawer.sass'

// Components
// import { SPDefaultsProvider } from '@/components/SPDefaultsProvider'
// import { VImg } from '@/components/VImg'

// Composables
import { useSticky } from './sticky'
import { useTouch } from './touch'
import { useRtl } from '@/composables/locale'
import { makeBorderProps, useBorder } from '@/composables/border'
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeDelayProps, useDelay } from '@/composables/delay'
import { makeDisplayProps, useDisplay } from '@/composables/display'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { useRouter } from '@/composables/router'
import { useScopeId } from '@/composables/scopeId'
import { useSsrBoot } from '@/composables/ssrBoot'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { computed, nextTick, ref, shallowRef, toRef, Transition, watch } from 'vue'
import { genericComponent, propsFactory, toPhysical, useRender } from '@/utils'

// Types
import type { PropType } from 'vue'

export type SPNavigationDrawerImageSlot = {
  image: string | undefined
}

export type SPNavigationDrawerSlots = {
  default: never
  prepend: never
  append: never
  image: SPNavigationDrawerImageSlot
}

const locations = ['start', 'end', 'left', 'right', 'top', 'bottom'] as const

export const makeSPNavigationDrawerProps = propsFactory({
  color: String,
  disableResizeWatcher: Boolean,
  disableRouteWatcher: Boolean,
  expandOnHover: Boolean,
  floating: Boolean,
  modelValue: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
  permanent: Boolean,
  rail: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
  railWidth: {
    type: [Number, String],
    default: 56,
  },
  scrim: {
    type: [Boolean, String],
    default: true,
  },
  image: String,
  temporary: Boolean,
  persistent: Boolean,
  touchless: Boolean,
  width: {
    type: [Number, String],
    default: 256,
  },
  location: {
    type: String as PropType<typeof locations[number]>,
    default: 'start',
    validator: (value: any) => locations.includes(value),
  },
  sticky: Boolean,

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDelayProps(),
  ...makeDisplayProps({ mobile: null }),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({ tag: 'nav' }),
  ...makeThemeProps(),
}, 'SPNavigationDrawer')

export const SPNavigationDrawer = genericComponent<SPNavigationDrawerSlots>()({
  name: 'SPNavigationDrawer',

  props: makeSPNavigationDrawerProps(),

  emits: {
    'update:modelValue': (val: boolean) => true,
    'update:rail': (val: boolean) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { isRtl } = useRtl()
    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.color)
    const { elevationClasses } = useElevation(props)
    const { displayClasses, mobile } = useDisplay(props)
    const { roundedClasses } = useRounded(props)
    const router = useRouter()
    const isActive = useProxiedModel(props, 'modelValue', null, v => !!v)
    const { ssrBootStyles } = useSsrBoot()
    const { scopeId } = useScopeId()

    const rootEl = ref<HTMLElement>()
    const isHovering = shallowRef(false)

    const { runOpenDelay, runCloseDelay } = useDelay(props, value => {
      isHovering.value = value
    })

    const width = computed(() => {
      return (props.rail && props.expandOnHover && isHovering.value)
        ? Number(props.width)
        : Number(props.rail ? props.railWidth : props.width)
    })
    const location = computed(() => {
      return toPhysical(props.location, isRtl.value) as 'left' | 'right' | 'bottom'
    })
    const isPersistent = toRef(() => props.persistent)
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary))
    const isSticky = computed(() =>
      props.sticky &&
      !isTemporary.value &&
      location.value !== 'bottom'
    )

    useToggleScope(() => props.expandOnHover && props.rail != null, () => {
      watch(isHovering, val => emit('update:rail', !val))
    })

    useToggleScope(() => !props.disableResizeWatcher, () => {
      watch(isTemporary, val => !props.permanent && (nextTick(() => isActive.value = !val)))
    })

    useToggleScope(() => !props.disableRouteWatcher && !!router, () => {
      watch(router!.currentRoute, () => isTemporary.value && (isActive.value = false))
    })

    watch(() => props.permanent, val => {
      if (val) isActive.value = true
    })

    if (props.modelValue == null && !isTemporary.value) {
      isActive.value = props.permanent || !mobile.value
    }

    const { isDragging, dragProgress } = useTouch({
      el: rootEl,
      isActive,
      isTemporary,
      width,
      touchless: toRef(() => props.touchless),
      position: location,
    })

    // layoutSize 控制主内容区域需要留出多少空间
    // - rail 模式：始终占据 railWidth 空间
    // - permanent 模式（非 rail）：打开时占据空间，关闭时不占据空间
    // - 非 permanent 模式：不占据空间（通过绝对定位浮动在上面）
    const layoutSize = computed(() => {
      // 临时模式：不占据空间
      if (isTemporary.value) return 0

      // rail 模式：始终占据 railWidth 空间（即使关闭）
      if (props.rail) {
        return Number(props.railWidth)
      }

      // permanent 模式（非 rail）：只有打开时才占据空间
      if (props.permanent && isActive.value) {
        return width.value
      }

      // 其他情况：不占据布局空间
      return 0
    })

    const absoluteValue = computed(() => {
      // rail 模式或 permanent 模式下不使用绝对定位，让导航抽屉占据布局空间
      if (!isTemporary.value && (props.rail || props.permanent)) return false
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return props.absolute || (isSticky.value && typeof isStuck.value !== 'string')
    })

    const { layoutItemStyles, layoutItemScrimStyles } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(String(props.order), 10)),
      position: location,
      layoutSize,
      elementSize: width,
      // rail 模式：始终显示，所以 active 始终为 true
      // permanent 模式和其他模式：使用 isActive 控制
      active: computed(() => {
        if (props.rail && !isTemporary.value) return true
        return isActive.value
      }),
      disableTransitions: toRef(() => isDragging.value),
      absolute: absoluteValue,
    })

    const { isStuck, stickyStyles } = useSticky({ rootEl, isSticky, layoutItemStyles })

    const scrimColor = useBackgroundColor(() => {
      return typeof props.scrim === 'string' ? props.scrim : null
    })
    const scrimStyles = computed(() => ({
      ...isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: 'none',
      } : undefined,
      ...layoutItemScrimStyles.value,
    }))

    provideDefaults({
      SPList: {
        bgColor: 'transparent',
      },
    })

    useRender(() => {
      const hasImage = (slots.image || props.image)

      return (
        <>
          <props.tag
            ref={ rootEl }
            onMouseenter={ runOpenDelay }
            onMouseleave={ runCloseDelay }
            class={[
              'sp-navigation-drawer',
              `sp-navigation-drawer--${location.value}`,
              {
                'sp-navigation-drawer--expand-on-hover': props.expandOnHover,
                'sp-navigation-drawer--floating': props.floating,
                'sp-navigation-drawer--is-hovering': isHovering.value,
                'sp-navigation-drawer--rail': props.rail,
                'sp-navigation-drawer--temporary': isTemporary.value,
                'sp-navigation-drawer--persistent': isPersistent.value,
                'sp-navigation-drawer--active': isActive.value,
                'sp-navigation-drawer--sticky': isSticky.value,
              },
              themeClasses.value,
              backgroundColorClasses.value,
              borderClasses.value,
              displayClasses.value,
              elevationClasses.value,
              roundedClasses.value,
              props.class,
            ]}
            style={[
              backgroundColorStyles.value,
              layoutItemStyles.value,
              ssrBootStyles.value,
              stickyStyles.value,
              props.style,
            ]}
            { ...scopeId }
            { ...attrs }
          >
            

            { slots.prepend && (
              <div class="sp-navigation-drawer__prepend">
                { slots.prepend?.() }
              </div>
            )}

            <div class="sp-navigation-drawer__content">
              { slots.default?.() }
            </div>

            { slots.append && (
              <div class="sp-navigation-drawer__append">
                { slots.append?.() }
              </div>
            )}
          </props.tag>

          <Transition name="fade-transition">
            { isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && (
              <div
                class={['sp-navigation-drawer__scrim', scrimColor.backgroundColorClasses.value]}
                style={[scrimStyles.value, scrimColor.backgroundColorStyles.value]}
                onClick={ () => {
                  if (isPersistent.value) return
                  isActive.value = false
                }}
                { ...scopeId }
              />
            )}
          </Transition>
        </>
      )
    })

    return {
      isStuck,
    }
  },
})

export type SPNavigationDrawer = InstanceType<typeof SPNavigationDrawer>
