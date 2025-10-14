// Components
import Icon from '../components/icon/Icon'
// import { SPIcon } from '../components/SPIcon/SPIcon'

// Composables
import { useLocale } from '../composables/locale'

// Utilities
import { callEvent } from '../utils'

// Types
import type { IconValue } from './icons'
import type { EventProp } from '../utils'

type names = 'clear' | 'prepend' | 'append' | 'appendInner' | 'prependInner'

type InputIconProps<T extends names> = {
  label: string | undefined
} & {
  [K in `${T}Icon`]: IconValue | undefined
} & {
  [K in `onClick:${T}`]: EventProp | undefined
}

type Listeners<
  T extends {},
  U = keyof T
> = U extends `onClick:${infer V extends names}` ? V : never

export function useInputIcon<T extends {}, K extends names = Listeners<T>>(
  props: T & InputIconProps<K>
) {
  const { t } = useLocale()

  function InputIcon({
    name,
    color,
    ...attrs
  }: {
    name: Extract<names, K>
    color?: string
  } & Record<string, any>) {
    const localeKey = {
      prepend: 'prependAction',
      prependInner: 'prependAction',
      append: 'appendAction',
      appendInner: 'appendAction',
      clear: 'clear',
    }[name]
    const listener = props[`onClick:${name}`] as EventProp | undefined

    function onKeydown(e: KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return

      callEvent(listener, new PointerEvent('click', e))
    }

    const label =
      listener && localeKey
        ? t(`$speed.input.${localeKey}`, props.label ?? '')
        : undefined

    const iconName = props[`${name}Icon`] as string

    // 如果没有图标名称，返回 null
    if (!iconName) {
      return null
    }

    return (
      <Icon
        name={iconName}
        aria-label={label}
        onClick={listener}
        color={color}
        clickable={!!listener}
        {...attrs}
        {...(listener && { onKeydown })}
      />
    )
  }

  return { InputIcon }
}
