import { propsFactory } from '@/utils'
import { makeSPSelctrlGroupProps } from '../SPSelctrlGroup/SPSelctrlGroup'

import type { PropType } from 'vue'
import type { SegmentedOption, SegmentedItemVariant, SegmentedVariant } from './types'

export const makeSPSegmentedProps = propsFactory(
  {
    ...makeSPSelctrlGroupProps({
      defaultsTarget: 'SPSelctrl',
      inline: true,
      type: 'radio',
    }),
    // 统一用法：通过 options 渲染各个分段项
    options: {
      type: Array as PropType<SegmentedOption[]>,
      required: true,
    },
    // 视觉：单项仍使用 outlined 胶囊外观
    itemVariant: {
      type: String as PropType<SegmentedItemVariant>,
      default: 'outlined',
    },
    // group visual variants
    variant: {
      type: String as PropType<SegmentedVariant>,
      default: 'filled',
      validator: (v: any) => ['filled', 'outlined', 'solo'].includes(v),
    },
  },
  'SPSegmented'
)
