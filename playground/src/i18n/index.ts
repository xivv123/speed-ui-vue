import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

// 语言包
const messages = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

// 支持的语言类型
export type Locale = keyof typeof messages

// 默认语言
export const DEFAULT_LOCALE: Locale = 'zh-CN'

// 支持的语言列表
export const SUPPORTED_LOCALES: Locale[] = ['zh-CN', 'en-US']

// 语言显示名称
export const LOCALE_NAMES = {
  'zh-CN': '简体中文',
  'en-US': 'English',
} as const

// 检测浏览器语言
export function detectBrowserLanguage(): Locale {
  const browserLang = navigator.language || navigator.languages?.[0] || ''
  
  if (browserLang.startsWith('zh')) {
    return 'zh-CN'
  }
  
  return 'en-US'
}

// 从 URL 获取语言
export function getLocaleFromUrl(): Locale | null {
  const pathLocale = window.location.pathname.split('/')[1]
  
  if (pathLocale && SUPPORTED_LOCALES.includes(pathLocale as Locale)) {
    return pathLocale as Locale
  }
  
  return null
}

// 从 localStorage 获取语言
export function getLocaleFromStorage(): Locale | null {
  const saved = localStorage.getItem('speed-ui-locale')
  
  if (saved && SUPPORTED_LOCALES.includes(saved as Locale)) {
    return saved as Locale
  }
  
  return null
}

// 获取初始语言
function getInitialLocale(): Locale {
  return getLocaleFromUrl() || getLocaleFromStorage() || detectBrowserLanguage()
}

// 创建 i18n 实例
export const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: getInitialLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages,
})

// 保存语言到 localStorage
export function saveLocaleToStorage(locale: Locale): void {
  localStorage.setItem('speed-ui-locale', locale)
}

// 更新 URL
export function updateUrlWithLocale(locale: Locale): void {
  const newUrl = `${window.location.origin}/${locale}`
  window.history.replaceState({}, '', newUrl)
}

// 更新 HTML lang 属性
export function updateHtmlLang(locale: Locale): void {
  document.querySelector('html')?.setAttribute('lang', locale)
} 