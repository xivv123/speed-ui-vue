// Speed UI framework factory: centralizes app installation

// Components/directives registries are provided by callers (entry.ts)
import { toKebabCase } from './utils/helpers'

// Composables and symbols
import { createDefaults, DefaultsSymbol } from './composables/defaults'
import { createTheme, ThemeSymbol, type ThemeOptions } from './composables/theme'
import { createLocale, LocaleSymbol, type LocaleOptions, type RtlOptions } from './composables/locale'
import { createIcons, IconSymbol, type IconOptions } from './composables/icons'
import { createDisplay, DisplaySymbol, type DisplayOptions } from './composables/display'
import { createGoTo, GoToSymbol, type GoToOptions } from './composables/goto'

// Core directives (explicitly registered)
import ClickOutside from './directives/click-outside'
import Intersect from './directives/intersect'
import Loading from './directives/loading'
import Tooltip from './directives/tooltip'
import { Badge } from './directives/badge'
import Progbar from './directives/progbar'

import type { App, Plugin } from 'vue'

export type Registry = Record<string, any>

export interface SpeedFrameworkOptions {
  components?: Registry
  directives?: Registry
  theme?: ThemeOptions
  defaults?: Parameters<typeof createDefaults>[0]
  locale?: LocaleOptions & RtlOptions
  icons?: IconOptions
  display?: DisplayOptions
  goto?: GoToOptions
}

function registerComponents(app: App, components?: Registry) {
  if (!components) return
  Object.entries(components).forEach(([exportName, value]) => {
    if (!value) return
    const comp: any = value
    // Heuristic: component must have a name or render/setup
    const name: string | undefined = comp?.name || exportName
    if (!name) return
    try {
      app.component(name, comp)
      const kebab = toKebabCase(name)
      if (kebab !== name) app.component(kebab, comp)
      // Register friendly kebab for SP-prefixed components: SPForm -> sp-form
      if (/^SP[A-Z]/.test(name)) {
        const alt = 'sp-' + toKebabCase(name.slice(2))
        if (alt !== kebab) app.component(alt, comp)
      }
    } catch {
      // ignore non-component exports
    }
  })
}

function registerDirectives(app: App, directives?: Registry) {
  // Built-ins
  app.directive('click-outside', ClickOutside as any)
  app.directive('intersect', Intersect as any)
  if (Loading) app.directive('loading', Loading as any)
  if (Tooltip) app.directive('tooltip', (Tooltip as any).default ?? (Tooltip as any))
  if (Badge) app.directive('badge', Badge as any)
  if (Progbar) app.directive('progbar', (Progbar as any).default ?? (Progbar as any))

  // Additional from registry (optional)
  Object.entries(directives ?? {}).forEach(([name, dir]) => {
    const key = toKebabCase(name)
    try {
      app.directive(key, (dir as any).default ?? (dir as any))
    } catch {
      /* noop */
    }
  })
}

export function createSpeedUI(options: SpeedFrameworkOptions = {}): Plugin {
  const plugin: Plugin = {
    install(app: App) {
      // Provide core instances
      const defaults = createDefaults(options.defaults)
      app.provide(DefaultsSymbol, defaults)

      const locale = createLocale(options.locale)
      app.provide(LocaleSymbol, locale)

      const display = createDisplay(options.display)
      app.provide(DisplaySymbol, display)

      const goTo = createGoTo(options.goto, locale)
      app.provide(GoToSymbol, goTo)

      const icons = createIcons(options.icons)
      app.provide(IconSymbol, icons)

      const theme = createTheme(options.theme)
      app.provide(ThemeSymbol, theme)

      // Register components/directives
      registerComponents(app, options.components)
      registerDirectives(app, options.directives)
    },
  }

  return plugin
}

export type SpeedUI = ReturnType<typeof createSpeedUI>
