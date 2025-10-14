import './SPSegmented.scss'

import { SPSelctrl } from '../SPSelctrl/SPSelctrl'
import { SPSelctrlGroup } from '../SPSelctrlGroup/SPSelctrlGroup'
import { SPThumb } from '../SPThumb/SPThumb'
import { makeSPSegmentedProps } from './props'

import { genericComponent, useRender } from '@/utils'
import { nextTick, onMounted, onBeforeUnmount, ref, watch, toRef } from 'vue'
import { provideDefaults } from '@/composables/defaults'
import { useResizeObserver } from '@/composables/resizeObserver'

export const SPSegmented = genericComponent()({
  name: 'SPSegmented',

  props: makeSPSegmentedProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup(props, { emit }) {
    // Observe container for size changes to keep thumb in sync
    const { resizeRef: root } = useResizeObserver(() => scheduleThumbUpdate(), 'border')
    const thumb = ref<{ el: HTMLElement }>()
    let raf = 0

    const hasOptions = () => Array.isArray(props.options) && props.options.length > 0

    const normalizedOptions = () =>
      (props.options ?? []).map(opt =>
        typeof opt === 'string'
          ? { label: opt, value: opt }
          : opt
      )

    const updateThumb = () => {
      if (!root.el || !thumb.value?.el) return
      const thumbEl = thumb.value.el
      const el = root.el.querySelector(
        '.sp-segmented.sp-selctrl--dirty'
      ) as HTMLElement | null
      const container = root.el
      if (!el) {
        thumbEl.style.opacity = '0'
        return
      }
      const cr = container.getBoundingClientRect()
      const er = el.getBoundingClientRect()
      const x = er.left - cr.left + container.scrollLeft
      const y = er.top - cr.top + container.scrollTop
      thumbEl.style.width = `${er.width}px`
      thumbEl.style.height = `${er.height}px`
      thumbEl.style.transform = `translate(${x}px, ${y}px)`
      thumbEl.style.opacity = '1'

      const wrapper = el.querySelector(
        '.sp-selctrl__wrapper'
      ) as HTMLElement | null
      const computedColor = wrapper
        ? getComputedStyle(wrapper).color
        : getComputedStyle(el).color
      if (computedColor) {
        thumbEl.style.backgroundColor = computedColor
        container.style.setProperty('--sp-segmented-color', computedColor)
      }
    }

    const scheduleThumbUpdate = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => updateThumb())
    }

    const onResize = () => scheduleThumbUpdate()

    onMounted(() => {
      if (hasOptions()) nextTick(scheduleThumbUpdate)
      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })
    // No manual disconnect needed for element observer; composable cleans up

    watch(
      () => props.modelValue,
      () => hasOptions() && nextTick(scheduleThumbUpdate)
    )
    watch(
      () => props.options,
      () => hasOptions() && nextTick(scheduleThumbUpdate)
    )

    // Provide defaults for inner SPSelctrl items
    provideDefaults({
      SPSelctrl: {
        variant: toRef(() => props.itemVariant),
      },
    })

    useRender(() => {
      return (
        <div 
          ref={root} 
          class={['sp-segmented-group', 
            `sp-segmented-group--variant-${props.variant}`,
            props.class
          ]}
          style={props.style}
        >
          <SPThumb 
            ref={thumb}
            class="sp-segmented__thumb"
          />
            <SPSelctrlGroup
              {...SPSelctrlGroup.filterProps?.(props)}
              class="sp-segmented-group__controls"
              defaultsTarget="SPSelctrl"
              type={props.type}
              inline
              modelValue={props.modelValue as any}
              onUpdate:modelValue={(v: any) => emit('update:modelValue', v)}
            >
              {normalizedOptions().map((opt, i) => (
                <SPSelctrl
                  key={i}
                  class={['sp-segmented']}
                  label={opt.label}
                  value={opt.value}
                  baseColor={opt.baseColor ?? (props as any).baseColor}
                  color={(opt as any).color}
                  disabled={opt.disabled ?? props.disabled}
                  trueIcon={opt.trueIcon as any}
                  falseIcon={opt.falseIcon as any}
                  type={props.type}
                />
              ))}
            </SPSelctrlGroup>
        </div>
      )
    })

    return { updateThumb }
  },
})

export type SPSegmented = InstanceType<typeof SPSegmented>
