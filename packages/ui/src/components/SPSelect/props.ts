// Components
import { VDialogTransition } from '@/components/transitions'
import { SPList } from '@/components/SPList'
import { SPMenu } from '@/components/SPMenu'
import { makeSPTextFieldProps } from '@/components/SPTextField'

// Composables
import { IconValue } from '@/composables/icons'
import { makeItemsProps } from '@/composables/list-items'
import { makeTransitionProps } from '@/composables/transition'

// Utilities
import { omit, propsFactory } from '@/utils'

// Types
import type { Component, PropType } from 'vue'

export const makeSelectProps = propsFactory(
  {
    tags: Boolean,
    closableTags: Boolean,
    closeText: {
      type: String,
      default: '$speed.close',
    },
    openText: {
      type: String,
      default: '$speed.open',
    },
    eager: Boolean,
    hideNoData: Boolean,
    hideSelected: Boolean,
    listProps: {
      type: Object as PropType<SPList['$props']>,
    },
    menu: Boolean,
    menuIcon: {
      type: IconValue,
      default: '$dropdown',
    },
    menuProps: {
      type: Object as PropType<SPMenu['$props']>,
    },
    multiple: Boolean,
    noDataText: {
      type: String,
      default: '$speed.noDataText',
    },
    openOnClear: Boolean,
    itemColor: String,
    noAutoScroll: Boolean,

    ...makeItemsProps({ itemChildren: false }),
  },
  'Select'
)

export const makeSPSelectProps = propsFactory(
  {
    ...makeSelectProps(),
    ...omit(
      makeSPTextFieldProps({
        modelValue: null,
        role: 'combobox',
      }),
      ['validationValue', 'dirty', 'appendInnerIcon']
    ),
    ...makeTransitionProps({
      transition: { component: VDialogTransition as Component },
    }),
  },
  'SPSelect'
)

