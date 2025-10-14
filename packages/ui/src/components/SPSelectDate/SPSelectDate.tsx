// Styles
import './SPSelectDate.sass'

// Components
import { SPMenu } from '@/components/SPMenu'
import SpIcon from '../icon/Icon'
import { SPDatePanel } from './SPDatePanel'
import {
  makeSPTextFieldProps,
  SPTextField,
} from '@/components/SPTextField'

// Composables
import { useForm } from '@/composables/form'
import { forwardRefs } from '@/composables/forwardRefs'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeTransitionProps } from '@/composables/transition'
import { useSelectModelUpdate } from '@/components/SPSelect/useSelectModelUpdate'

// Utilities
import { computed, nextTick, ref, shallowRef, watch } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/utils'

// Types
import type { PropType } from 'vue'
import type { SPFieldSlots } from '@/components/SPField/types'
import type { SPInputSlots } from '@/components/SPInput/SPInput'
import type { GenericProps } from '@/utils'

// 日期格式化工具函数
function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
}

function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? null : date
}

export const makeSPSelectDateProps = propsFactory(
  {
    format: {
      type: String,
      default: 'YYYY-MM-DD',
    },
    menuProps: {
      type: Object as PropType<SPMenu['$props']>,
    },
    eager: Boolean,
    ...omit(
      makeSPTextFieldProps({
        modelValue: null,
        role: 'button',
        placeholder: '请选择日期',
      }),
      ['validationValue', 'dirty', 'appendInnerIcon']
    ),
    ...makeTransitionProps(),
  },
  'SPSelectDate'
)

export const SPSelectDate = genericComponent<
  new (
    props: {
      modelValue?: string | null
      'onUpdate:modelValue'?: (value: string | null) => void
    },
    slots: Omit<SPInputSlots & SPFieldSlots, 'default'>
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'SPSelectDate',

  props: makeSPSelectDateProps(),

  emits: {
    'update:focused': (_focused: boolean) => true,
    'update:modelValue': (_value: string | null) => true,
    'update:menu': (_menu: boolean) => true,
  },

  setup(props, { slots }) {
    const { t } = useLocale()
    const SPTextFieldRef = ref<SPTextField>()
    const spMenuRef = ref<SPMenu>()
    const form = useForm(props)
    const isFocused = shallowRef(false)

    // 日期模型
    const model = useProxiedModel(
      props,
      'modelValue',
      null,
      v => v,
      v => v
    )

    // 格式化后的显示值
    const displayValue = computed(() => {
      if (!model.value) return ''
      const date = parseDate(model.value)
      return date ? formatDate(date, props.format) : model.value
    })

    // 菜单状态
    const menuDisabled = computed(
      () => form.isReadonly.value || form.isDisabled.value
    )
    const _menu = useProxiedModel(props, 'menu')
    const menu = computed({
      get: () => _menu.value,
      set: v => {
        if (_menu.value && !v && spMenuRef.value?.ΨopenChildren.size) return
        if (v && menuDisabled.value) return
        _menu.value = v
      },
    })

    // 计算菜单属性
    const computedMenuProps = computed(() => {
      return {
        ...props.menuProps,
        activatorProps: {
          ...(props.menuProps?.activatorProps || {}),
          'aria-haspopup': 'dialog',
        },
      }
    })

    // 事件处理
    function onMousedownControl() {
      if (menuDisabled.value) return
      menu.value = !menu.value
    }

    function onKeydown(e: KeyboardEvent) {
      if (!e.key || form.isReadonly.value) return

      if (['Enter', ' ', 'ArrowDown'].includes(e.key)) {
        e.preventDefault()
        menu.value = true
      }

      if (['Escape', 'Tab'].includes(e.key)) {
        menu.value = false
      }
    }

    function onBlur(e: FocusEvent) {
      if (
        !e.relatedTarget ||
        !spMenuRef.value?.$el.contains(e.relatedTarget as HTMLElement)
      ) {
        menu.value = false
      }
    }

    function onFocusin(_e: FocusEvent) {
      isFocused.value = true
    }

    function onDateSelect(date: string | null) {
      model.value = date
      nextTick(() => {
        menu.value = false
      })
    }

    const onModelUpdate = useSelectModelUpdate({
      textFieldRef: SPTextFieldRef,
      model,
      emptyValue: null as any,
    })

    // 监听菜单状态变化
    watch(menu, (newVal, oldVal) => {
      if (!newVal && oldVal && isFocused.value) {
        nextTick(() => {
          SPTextFieldRef.value?.focus()
        })
      }
    })

    useRender(() => {
      const isDirty = !!model.value
      const textFieldProps = SPTextField.filterProps(props)

      const placeholder =
        isDirty ||
        (!isFocused.value && props.label && !props.persistentPlaceholder)
          ? undefined
          : props.placeholder

      return (
        <SPTextField
          ref={SPTextFieldRef}
          {...textFieldProps}
          modelValue={displayValue.value}
          onUpdate:modelValue={onModelUpdate}
          v-model:focused={isFocused.value}
          validationValue={model.value}
          dirty={isDirty}
          class={[
            'sp-select-date',
            {
              'sp-select-date--active-menu': menu.value,
            },
            props.class,
          ]}
          style={props.style}
          placeholder={placeholder}
          onMousedown:control={onMousedownControl}
          onBlur={onBlur}
          onKeydown={onKeydown}
          readonly
        >
          {{
            ...slots,
            default: () => (
              <SPMenu
                ref={spMenuRef}
                v-model={menu.value}
                activator="parent"
                contentClass="sp-select-date__content"
                disabled={menuDisabled.value}
                eager={props.eager}
                maxHeight={400}
                openOnClick={false}
                closeOnContentClick={false}
                transition={props.transition}
                {...computedMenuProps.value}
              >
                <div
                  class="sp-select-date__panel"
                  onFocusin={onFocusin}
                >
                  <SPDatePanel
                    modelValue={model.value}
                    onUpdate:modelValue={onDateSelect}
                  />
                </div>
              </SPMenu>
            ),
            'prepend-inner': (..._args: any[]) => (
              <>
                <SpIcon
                  class="sp-select-date__calendar-icon"
                  name="calendar"
                />
                {slots['prepend-inner']?.(..._args)}
              </>
            ),
          }}
        </SPTextField>
      )
    })

    return forwardRefs(
      {
        isFocused,
        menu,
      },
      SPTextFieldRef
    )
  },
})

export type SPSelectDate = InstanceType<typeof SPSelectDate>
