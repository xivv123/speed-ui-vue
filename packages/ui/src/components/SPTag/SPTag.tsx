import './style/SPTag.sass'

// Components
import { VExpandXTransition } from '@/components/transitions'
import { SPTagGroupSymbol } from '../SPTagGroup/SPTagGroup'
import { SPDefaultsProvider } from '../SPDefaultsProvider'
import SpIcon from '../icon/Icon'

// Composables
import { useBorder } from '@/composables/border'
import { useDensity } from '@/composables/density'
import { useElevation } from '@/composables/elevation'
import { useGroupItem } from '@/composables/group'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useRounded } from '@/composables/rounded'
import { useSize } from '@/composables/size'
import { provideTheme } from '@/composables/theme'
import {
  genOverlays,
  useVariant,
} from '@/composables/variant'

// Utilities
import { computed, toDisplayString, toRef } from 'vue'
import { genericComponent } from '@/utils'

// Types & Props
import { makeVChipProps } from './props'
import type { VChipSlots } from './types'

export const SPTag = genericComponent<VChipSlots>()(({
  name: 'SPTag',

  props: makeVChipProps(),

  emits: {
    'click:close': (e: MouseEvent) => true,
    'update:modelValue': (value: boolean) => true,
    'group:selected': (val: { value: boolean }) => true,
    click: (e: MouseEvent | KeyboardEvent) => true,
  },

  setup(props, { attrs, emit, slots }) {
    const { t } = useLocale()
    const { borderClasses } = useBorder(props, 'sp-tag')
    const { densityClasses } = useDensity(props, 'sp-tag')
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props, 'sp-tag')
    const { sizeClasses } = useSize(props, 'sp-tag')
    const { themeClasses } = provideTheme(props)

    const isActive = useProxiedModel(props, 'modelValue')
    const group = useGroupItem(props, SPTagGroupSymbol, false)
    const link = {
      isLink: { value: false },
      isActive: { value: false },
      linkProps: {},
      navigate: undefined,
      isClickable: { value: false },
    }
    const isLink = toRef(() => props.link !== false && link.isLink.value)
    const isClickable = computed(
      () => !props.disabled && props.link !== false && (!!group || props.link)
    )
    const closeProps = toRef(() => ({
      'aria-label': t(props.closeLabel),
      disabled: props.disabled,
      onClick(e: MouseEvent) {
        e.preventDefault()
        e.stopPropagation()

        isActive.value = false

        emit('click:close', e)
      },
    }))

    const { colorClasses, colorStyles, variantClasses } = useVariant(() => {
      const showColor = !group || group.isSelected.value
      return {
        color: showColor ? props.color ?? props.baseColor : props.baseColor,
        variant: props.variant,
      }
    }, 'sp-tag')

    function onClick(e: MouseEvent) {
      emit('click', e)

      if (!isClickable.value) return

      group?.toggle()
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick(e as any as MouseEvent)
      }
    }

    return () => {
      const Tag = props.tag as any
      const hasAppendMedia = !!(props.appendIcon || props.appendAvatar)
      const hasAppend = !!(hasAppendMedia || slots.append)
      const hasClose = !!(slots.close || props.closable)
      const hasFilter = !!(slots.filter || props.filter) && group
      const hasPrependMedia = !!(props.prependIcon || props.prependAvatar)
      const hasPrepend = !!(hasPrependMedia || slots.prepend)

      return (
        isActive.value && (
          <Tag
            class={[
              'sp-tag',
              {
                'sp-tag--disabled': props.disabled,
                'sp-tag--label': props.label,
                'sp-tag--link': isClickable.value,
                'sp-tag--filter': hasFilter,
                'sp-tag--pill': props.pill,
                [`${props.activeClass}`]: props.activeClass,
              },
              themeClasses.value,
              borderClasses.value,
              colorClasses.value,
              densityClasses.value,
              elevationClasses.value,
              roundedClasses.value,
              sizeClasses.value,
              variantClasses.value,
              group?.selectedClass.value,
              props.class,
            ]}
            style={[colorStyles.value, props.style]}
            disabled={props.disabled || undefined}
            draggable={props.draggable}
            tabindex={isClickable.value ? 0 : undefined}
            onClick={onClick}
            onKeydown={isClickable.value && !isLink.value && onKeyDown}
          >
            {genOverlays(!!isClickable.value, 'sp-tag')}

            { hasFilter && (
            <VExpandXTransition key="filter">
              <div
                class="sp-tag__filter"
                v-show={ group.isSelected.value }
              >
                { !slots.filter ? (
                  <SpIcon
                    key="filter-icon"
                    name={ props.filterIcon }
                  />
                ) : (
                  <SPDefaultsProvider
                    key="filter-defaults"
                    disabled={ !props.filterIcon }
                    defaults={{
                      SpIcon: { name: props.filterIcon },
                    }}
                    v-slots:default={ slots.filter }
                  />
                )}
              </div>
            </VExpandXTransition>
          )}

            {hasPrepend && (
              <div
                key="prepend"
                class="sp-tag__prepend"
              >
                {!slots.prepend ? (
                  <>
                    {props.prependIcon && (
                      <SpIcon
                        key="prepend-icon"
                        name={
                          typeof props.prependIcon === 'string'
                            ? props.prependIcon
                            : String(props.prependIcon || '')
                        }
                      ></SpIcon>
                    )}
                  </>
                ) : (
                  <SPDefaultsProvider
                    key="prepend-defaults"
                    disabled={!hasPrependMedia}
                    defaults={{
                      VAvatar: {
                        image: props.prependAvatar,
                        start: true,
                      },
                      SpIcon: {
                        name: props.prependIcon,
                        start: true,
                      },
                    }}
                    v-slots:default={slots.prepend}
                  />
                )}
              </div>
            )}

            <div
              class="sp-tag__content"
              data-no-activator=""
            >
              {slots.default?.({
                isSelected: group?.isSelected.value,
                selectedClass: group?.selectedClass.value,
                select: group?.select,
                toggle: group?.toggle,
                value: group?.value.value,
                disabled: props.disabled,
              }) ?? toDisplayString(props.text)}
            </div>

            {hasAppend && (
              <div
                key="append"
                class="sp-tag__append"
              >
                {!slots.append ? (
                  <>
                    {props.appendIcon && (
                      <SpIcon
                        key="append-icon"
                        name={
                          typeof props.appendIcon === 'string'
                            ? props.appendIcon
                            : String(props.appendIcon || '')
                        }
                      ></SpIcon>
                    )}
                  </>
                ) : (
                  <SPDefaultsProvider
                    key="append-defaults"
                    disabled={!hasAppendMedia}
                    defaults={{
                      VAvatar: {
                        end: true,
                        image: props.appendAvatar,
                      },
                      SpIcon: {
                        end: true,
                        name: props.appendIcon,
                      },
                    }}
                    v-slots:default={slots.append}
                  />
                )}
              </div>
            )}

            {hasClose && (
              <button
                key="close"
                class="sp-tag__close"
                type="button"
                data-testid="close-chip"
                {...closeProps.value}
              >
                {!slots.close ? (
                  <SpIcon
                    key="close-icon"
                    name="close"
                  />
                ) : (
                  <SPDefaultsProvider
                    key="close-defaults"
                    defaults={{
                      SpIcon: {
                        name: props.closeIcon,
                        size: 'x-small',
                      },
                    }}
                    v-slots:default={slots.close}
                  />
                )}
              </button>
            )}
          </Tag>
        )
      )
    }
  },
}))

export type SPTag = InstanceType<typeof SPTag>
