// Styles
import './SPInputTel.sass'

// Components
import { SPBtn } from '@/components/SPBtn'
import { SPDefaultsProvider } from '@/components/SPDefaultsProvider'
import { SPDivider } from '@/components/SPDivider'
import { SPList, SPListItem } from '@/components/SPList'
import { SPMenu } from '@/components/SPMenu'
import {
  makeSPTextFieldProps,
  SPTextField,
} from '@/components/SPTextField'

// Composables
import { useForm } from '@/composables/form'
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, nextTick, ref, shallowRef, watch } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/utils'

// Types
import type { PropType } from 'vue'
import type { SPTextFieldSlots } from '@/components/SPTextField'

// Country codes data
interface CountryCode {
  code: string
  name: string
  dialCode: string
  flag?: string
  pattern?: RegExp
  example?: string
}

const defaultCountryCodes: CountryCode[] = [
  {
    code: 'CN',
    name: '中国',
    dialCode: '+86',
    flag: '🇨🇳',
    pattern: /^1[3-9]\d{9}$/,
    example: '138 0013 8000',
  },
  {
    code: 'HK',
    name: '香港',
    dialCode: '+852',
    flag: '🇭🇰',
    pattern: /^[2-9]\d{7}$/,
    example: '2123 4567',
  },
  {
    code: 'TW',
    name: '台湾',
    dialCode: '+886',
    flag: '🇹🇼',
    pattern: /^9\d{8}$/,
    example: '912 345 678',
  },
  {
    code: 'US',
    name: '美国',
    dialCode: '+1',
    flag: '🇺🇸',
    pattern: /^\d{10}$/,
    example: '(555) 123-4567',
  },
  {
    code: 'GB',
    name: '英国',
    dialCode: '+44',
    flag: '🇬🇧',
    pattern: /^[1-9]\d{8,9}$/,
    example: '7911 123456',
  },
  {
    code: 'JP',
    name: '日本',
    dialCode: '+81',
    flag: '🇯🇵',
    pattern: /^[789]0\d{8}$/,
    example: '90-1234-5678',
  },
  {
    code: 'KR',
    name: '韩国',
    dialCode: '+82',
    flag: '🇰🇷',
    pattern: /^1[0-9]\d{8}$/,
    example: '10-1234-5678',
  },
  {
    code: 'SG',
    name: '新加坡',
    dialCode: '+65',
    flag: '🇸🇬',
    pattern: /^[689]\d{7}$/,
    example: '9123 4567',
  },
  {
    code: 'AU',
    name: '澳大利亚',
    dialCode: '+61',
    flag: '🇦🇺',
    pattern: /^4\d{8}$/,
    example: '0412 345 678',
  },
  {
    code: 'CA',
    name: '加拿大',
    dialCode: '+1',
    flag: '🇨🇦',
    pattern: /^\d{10}$/,
    example: '(604) 123-4567',
  },
  {
    code: 'DE',
    name: '德国',
    dialCode: '+49',
    flag: '🇩🇪',
    pattern: /^1[5-7]\d{8}$/,
    example: '151 23456789',
  },
  {
    code: 'FR',
    name: '法国',
    dialCode: '+33',
    flag: '🇫🇷',
    pattern: /^[67]\d{8}$/,
    example: '06 12 34 56 78',
  },
  {
    code: 'IT',
    name: '意大利',
    dialCode: '+39',
    flag: '🇮🇹',
    pattern: /^3\d{8,9}$/,
    example: '312 345 6789',
  },
  {
    code: 'ES',
    name: '西班牙',
    dialCode: '+34',
    flag: '🇪🇸',
    pattern: /^[67]\d{8}$/,
    example: '612 34 56 78',
  },
  {
    code: 'RU',
    name: '俄罗斯',
    dialCode: '+7',
    flag: '🇷🇺',
    pattern: /^9\d{9}$/,
    example: '912 345-67-89',
  },
  {
    code: 'IN',
    name: '印度',
    dialCode: '+91',
    flag: '🇮🇳',
    pattern: /^[6-9]\d{9}$/,
    example: '98765 43210',
  },
  {
    code: 'BR',
    name: '巴西',
    dialCode: '+55',
    flag: '🇧🇷',
    pattern: /^[1-9]\d{8,9}$/,
    example: '11 91234-5678',
  },
  {
    code: 'MX',
    name: '墨西哥',
    dialCode: '+52',
    flag: '🇲🇽',
    pattern: /^[1-9]\d{9}$/,
    example: '55 1234 5678',
  },
  {
    code: 'TH',
    name: '泰国',
    dialCode: '+66',
    flag: '🇹🇭',
    pattern: /^[689]\d{8}$/,
    example: '08-1234-5678',
  },
  {
    code: 'MY',
    name: '马来西亚',
    dialCode: '+60',
    flag: '🇲🇾',
    pattern: /^1[0-9]\d{7,8}$/,
    example: '012-345 6789',
  },
]

type SPInputTelSlots = SPTextFieldSlots & {
  'country-code': {
    country: CountryCode
    props: Record<string, unknown>
  }
}

const makeSPInputTelProps = propsFactory(
  {
    countryCodes: {
      type: Array as PropType<CountryCode[]>,
      default: () => defaultCountryCodes,
    },
    countryCode: {
      type: String,
      default: '+86',
    },
    modelValue: {
      type: String,
      default: '',
    },
    inset: Boolean,
    validatePhone: Boolean,
    formatPhone: {
      type: Boolean,
      default: true,
    },
    menuProps: {
      type: Object as PropType<SPMenu['$props']>,
    },

    ...omit(makeSPTextFieldProps(), ['modelValue', 'validationValue']),
  },
  'SPInputTel'
)

export const SPInputTel = genericComponent<SPInputTelSlots>()({
  name: 'SPInputTel',

  props: {
    ...makeSPInputTelProps(),
  },

  emits: {
    'update:focused': (_val: boolean) => true,
    'update:modelValue': (_val: string) => true,
    'update:countryCode': (_val: string) => true,
  },

  setup(props, { slots, emit }) {
    const vTextFieldRef = ref<SPTextField>()
    const spMenuRef = ref<SPMenu>()

    const form = useForm(props)
    const isFocused = shallowRef(props.focused)
    const isMenuOpen = shallowRef(false)

    const selectedCountry = computed(() => {
      return (
        props.countryCodes.find(
          country => country.dialCode === props.countryCode
        ) || props.countryCodes[0]
      )
    })

    const model = useProxiedModel(
      props,
      'modelValue',
      '',
      val => val ?? '',
      val => val ?? ''
    )

    const countryCodeModel = useProxiedModel(props, 'countryCode', '+86')

    const menuDisabled = computed(
      () => form.isReadonly.value || form.isDisabled.value
    )

    const computedMenuProps = computed(() => {
      return {
        ...props.menuProps,
        activatorProps: {
          ...(props.menuProps?.activatorProps || {}),
          'aria-haspopup': 'listbox',
        },
      }
    })

    // 电话号码格式化
    function formatPhoneNumber(value: string, country: CountryCode): string {
      if (!props.formatPhone || !value) return value

      const cleaned = value.replace(/\D/g, '')
      if (cleaned.length === 0) return ''

      // 不同国家的格式化规则
      switch (country.code) {
        case 'CN':
          if (cleaned.length <= 3) return cleaned
          if (cleaned.length <= 7)
            return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`
          return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(
            7,
            11
          )}`
        case 'US':
        case 'CA':
          if (cleaned.length <= 3) return cleaned
          if (cleaned.length <= 6)
            return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
          return `(${cleaned.slice(0, 3)}) ${cleaned.slice(
            3,
            6
          )}-${cleaned.slice(6, 10)}`
        default:
          // 默认格式化：每4位添加空格
          return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ')
      }
    }

    // 电话号码验证
    function validatePhoneNumber(
      value: string,
      country: CountryCode
    ): string[] {
      const errors: string[] = []
      if (!props.validatePhone || !value) return errors

      const cleaned = value.replace(/\D/g, '')

      if (country.pattern && !country.pattern.test(cleaned)) {
        errors.push(`请输入有效的${country.name}电话号码`)
        if (country.example) {
          errors.push(`格式示例：${country.example}`)
        }
      }

      return errors
    }

    const validationErrors = computed(() => {
      return validatePhoneNumber(model.value, selectedCountry.value)
    })

    const computedPlaceholder = computed(() => {
      if (props.placeholder) return props.placeholder
      return (
        selectedCountry.value.example ||
        `请输入${selectedCountry.value.name}电话号码`
      )
    })

    function onCountrySelect(country: CountryCode) {
      countryCodeModel.value = country.dialCode
      emit('update:countryCode', country.dialCode)
      isMenuOpen.value = false
      // 移除自动聚焦，保持输入框原有状态
    }

    function onMenuToggle() {
      if (menuDisabled.value) return
      isMenuOpen.value = !isMenuOpen.value
    }

    function onKeydown(e: KeyboardEvent) {
      if (e.key === 'ArrowDown' && e.altKey) {
        e.preventDefault()
        isMenuOpen.value = true
      } else if (e.key === 'Escape') {
        isMenuOpen.value = false
      }
    }

    // 监听输入值变化，进行格式化
    watch(model, (newValue, oldValue) => {
      if (newValue !== oldValue && newValue) {
        // 只允许数字、空格、短横线、括号和加号
        const cleaned = newValue.replace(/[^\d\s\-\(\)\+]/g, '')
        const formatted = props.formatPhone
          ? formatPhoneNumber(cleaned, selectedCountry.value)
          : cleaned
        if (formatted !== newValue) {
          model.value = formatted
        }
      }
    })

    // 监听国家代码变化，重新格式化电话号码
    watch(selectedCountry, newCountry => {
      if (props.formatPhone && model.value) {
        model.value = formatPhoneNumber(model.value, newCountry)
      }
    })

    useRender(() => {
      const textFieldProps = omit(props, [
        'modelValue',
        'countryCode',
        'countryCodes',
        'validatePhone',
        'formatPhone',
        'menuProps',
      ])

      function countryCodeButton() {
        return !slots['country-code'] ? (
          <SPBtn
            aria-label={`选择国家: ${selectedCountry.value.name} ${selectedCountry.value.dialCode}`}
            disabled={menuDisabled.value}
            flat
            height="100%"
            key="country-code-btn"
            size="small"
            class="sp-input-tel__country-btn"
            // tabindex="-1"
          >
            <span class="sp-input-tel__dial-code">
              {selectedCountry.value.dialCode}
            </span>
          </SPBtn>
        ) : (
          <SPDefaultsProvider
            key="country-code-defaults"
            defaults={{
              SPBtn: {
                disabled: menuDisabled.value,
                flat: true,
                height: '100%',
                size: 'small',
                tabindex: -1,
              },
            }}
          >
            {slots['country-code']({
              country: selectedCountry.value,
              props: {
                disabled: menuDisabled.value,
              },
            })}
          </SPDefaultsProvider>
        )
      }

      function countryCodeControl() {
        return (
          <div
            class="sp-input-tel__control"
            onMousedown={(e: MouseEvent) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            onPointerdown={(e: PointerEvent) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            onClick={(e: MouseEvent) => {
              e.preventDefault()
              e.stopPropagation()
              onMenuToggle()
            }}
          >
            {countryCodeButton()}
            <SPDivider vertical />
          </div>
        )
      }

      const prependInnerControl = countryCodeControl()
      const hasPrependInner = slots['prepend-inner'] || prependInnerControl

      return (
        <SPTextField
          ref={vTextFieldRef}
          {...textFieldProps}
          v-model={model.value}
          v-model:focused={isFocused.value}
          validationValue={model.value}
          errorMessages={
            props.validatePhone ? validationErrors.value : undefined
          }
          placeholder={computedPlaceholder.value}
          onKeydown={onKeydown}
          class={[
            'sp-input-tel',
            {
              'sp-input-tel--inset': props.inset,
              'sp-input-tel--menu-active': isMenuOpen.value,
            },
            props.class,
          ]}
          style={props.style}
          type="tel"
        >
          {{
            ...slots,
            'prepend-inner': hasPrependInner
              ? (slotProps: any) => (
                  <>
                    {prependInnerControl}
                    {slots['prepend-inner']?.(slotProps)}

                    <SPMenu
                      ref={spMenuRef}
                      v-model={isMenuOpen.value}
                      activator="parent"
                      contentClass="sp-input-tel__menu-content"
                      disabled={menuDisabled.value}
                      maxHeight={300}
                      openOnClick={false}
                      closeOnContentClick={false}
                      {...computedMenuProps.value}
                    >
                      <SPList
                        selected={[selectedCountry.value.dialCode]}
                        selectStrategy="single-independent"
                        aria-label="选择国家代码"
                        density="compact"
                      >
                        {props.countryCodes.map(country => (
                          <SPListItem
                            key={country.code}
                            value={country.dialCode}
                            title={`${country.flag ? country.flag + ' ' : ''}${
                              country.name
                            } ${country.dialCode}`}
                            onClick={() => onCountrySelect(country)}
                          >
                            {{
                              prepend: () =>
                                country.flag && (
                                  <span class="sp-input-tel__menu-flag">
                                    {country.flag}
                                  </span>
                                ),
                            }}
                          </SPListItem>
                        ))}
                      </SPList>
                    </SPMenu>
                  </>
                )
              : undefined,
          }}
        </SPTextField>
      )
    })

    return forwardRefs({}, vTextFieldRef)
  },
})

export type SPInputTel = InstanceType<typeof SPInputTel>
