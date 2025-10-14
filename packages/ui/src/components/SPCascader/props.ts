import { makeSPTextFieldProps } from '@/components/SPTextField'
import { makeSelectProps } from '@/components/SPSelect/SPSelect'
import { makeTransitionProps } from '@/composables/transition'
import { omit, propsFactory } from '@/utils'
import type { PropType } from 'vue'
import type { CascaderOption } from './types'

export const makeCascaderProps = propsFactory(
  {
    ...makeSelectProps(),
    separator: {
      type: String,
      default: ' / ',
    },
    showAllLevels: {
      type: Boolean,
      default: true,
    },
    expandTrigger: {
      type: String as PropType<'click' | 'hover'>,
      default: 'click',
    },
    emitPath: {
      type: Boolean,
      default: true,
    },
    checkStrictly: Boolean,
    filterable: Boolean,
    filterMethod: {
      type: Function as PropType<(node: any, keyword: string) => boolean>,
    },
    options: {
      type: Array as PropType<CascaderOption[]>,
      default: () => [],
    },
  },
  'Cascader'
)

export const makeSPCascaderProps = propsFactory(
  {
    ...makeCascaderProps(),
    ...omit(
      makeSPTextFieldProps({
        modelValue: null,
        role: 'combobox',
      }),
      ['validationValue', 'dirty', 'appendInnerIcon']
    ),
    ...makeTransitionProps({}),
  },
  'SPCascader'
)
