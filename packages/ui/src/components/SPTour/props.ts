// Utilities
import { propsFactory, omit } from '@/utils'
import { makeRoundedProps } from '@/composables/rounded'
import { makeElevationProps } from '@/composables/elevation'
import { makeSPOverlayProps } from '@/components/SPOverlay/SPOverlay'
import { IconValue } from '@/composables/icons'

// Types
import type { PropType } from 'vue'
import type { TourStep } from './types'

export const makeSPTourProps = propsFactory(
  {
    modelValue: Boolean,
    current: {
      type: Number,
      default: 0,
    },
    steps: {
      type: Array as PropType<TourStep[]>,
      default: () => [],
    },
    mask: {
      type: [Boolean, String] as PropType<boolean | string>,
      default: true,
    },
    zIndex: {
      type: Number,
      default: 2001,
    },
    closable: Boolean,
    closeIcon: {
      type: IconValue,
      default: 'close',
    },
    type: {
      type: String as PropType<'default' | 'primary'>,
      default: 'primary',
    },
    nextText: {
      type: String,
      default: '下一步',
    },
    prevText: {
      type: String,
      default: '上一步',
    },
    finishText: {
      type: String,
      default: '完成',
    },
    skipText: {
      type: String,
      default: '跳过',
    },
    showIndicator: {
      type: Boolean,
      default: true,
    },
    targetRadius: {
      type: [String, Number],
      default: 6,
    },
    targetPadding: {
      type: [String, Number],
      default: 4,
    },
    highlightTarget: {
      type: Boolean,
      default: true,
    },
    targetClass: {
      type: String,
      default: 'sp-tour-target',
    },
    keyboard: {
      type: Boolean,
      default: true,
    },
    scrollSmooth: {
      type: Boolean,
      default: true,
    },
    smoothWait: {
      type: Number,
      default: 200,
    },

    ...makeRoundedProps(),
    ...makeElevationProps(),
    ...omit(
      makeSPOverlayProps({
        persistent: true,
        noClickAnimation: true,
        scrim: false,
        zIndex: 2001,
      }),
      ['modelValue', 'zIndex']
    ),
  },
  'SPTour'
)

