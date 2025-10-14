// Utilities
import { toValue } from 'vue'
import {
  destructComputed,
  getForeground,
  isCssColor,
  isParsableColor,
  parseColor,
} from '../utils'

// Types
import type { CSSProperties, MaybeRefOrGetter, Ref } from 'vue'

type ColorValue = string | false | null | undefined

export interface TextColorData {
  textColorClasses: Ref<string[]>
  textColorStyles: Ref<CSSProperties>
}

export interface BackgroundColorData {
  backgroundColorClasses: Ref<string[]>
  backgroundColorStyles: Ref<CSSProperties>
}

// 主题颜色映射
const THEME_COLOR_MAP: Record<string, string> = {
  primary: 'var(--sp-color-primary)',
  secondary: 'var(--sp-color-secondary, #6c757d)',
  success: 'var(--sp-color-success)',
  warning: 'var(--sp-color-warning)',
  error: 'var(--sp-color-error)',
  info: 'var(--sp-color-info, #17a2b8)',
  purple: '#9c27b0',
  blue: '#2196f3',
  green: '#4caf50',
  orange: '#ff9800',
  red: '#f44336',
}

// Composables
export function useColor(
  colors: MaybeRefOrGetter<{ background?: ColorValue; text?: ColorValue }>
) {
  return destructComputed(() => {
    const _colors = toValue(colors)
    const classes: string[] = []
    const styles: CSSProperties = {}

    if (_colors.background) {
      if (isCssColor(_colors.background)) {
        styles.backgroundColor = _colors.background

        if (!_colors.text && isParsableColor(_colors.background)) {
          const backgroundColor = parseColor(_colors.background)
          if (backgroundColor.a == null || backgroundColor.a === 1) {
            const textColor = getForeground(backgroundColor)

            styles.color = textColor
            styles.caretColor = textColor
          }
        }
      } else if (_colors.background && THEME_COLOR_MAP[_colors.background]) {
        // 使用主题颜色变量
        styles.backgroundColor = THEME_COLOR_MAP[_colors.background]

        // 为主题颜色自动设置合适的文字颜色（如果没有设置文字颜色）
        if (!_colors.text) {
          // 根据主题颜色自动选择文字颜色
          if (
            ['primary', 'error', 'info', 'success'].includes(_colors.background)
          ) {
            // 这些通常是深色，使用白色文字
            styles.color = '#fff'
            styles.caretColor = '#fff'
          } else if (['warning'].includes(_colors.background)) {
            // warning通常是黄色，使用白色文字
            styles.color = '#fff'
            styles.caretColor = '#fff'
          } else if (['secondary'].includes(_colors.background)) {
            // secondary通常是灰色，使用白色文字
            styles.color = '#fff'
            styles.caretColor = '#fff'
          }
        }
      } else {
        classes.push(`bg-${_colors.background}`)
      }
    }

    if (_colors.text) {
      if (isCssColor(_colors.text)) {
        styles.color = _colors.text
        styles.caretColor = _colors.text
      } else if (_colors.text && THEME_COLOR_MAP[_colors.text]) {
        // 使用主题颜色变量
        styles.color = THEME_COLOR_MAP[_colors.text]
        styles.caretColor = THEME_COLOR_MAP[_colors.text]
      } else {
        classes.push(`text-${_colors.text}`)
      }
    }

    return { colorClasses: classes, colorStyles: styles }
  })
}

export function useTextColor(
  color: MaybeRefOrGetter<ColorValue>
): TextColorData {
  const { colorClasses: textColorClasses, colorStyles: textColorStyles } =
    useColor(() => ({
      text: toValue(color),
    }))

  return { textColorClasses, textColorStyles }
}

export function useBackgroundColor(
  color: MaybeRefOrGetter<ColorValue>
): BackgroundColorData {
  const {
    colorClasses: backgroundColorClasses,
    colorStyles: backgroundColorStyles,
  } = useColor(() => ({
    background: toValue(color),
  }))

  return { backgroundColorClasses, backgroundColorStyles }
}
