// assembles the plugin from registries and options.

import * as components from './components'
import * as directives from './directives'
import { createSpeedUI as _createSpeedUI } from './framework'

// Version (from package.json)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - json import typing
import pkg from '../package.json'

export const createSpeedUI = (options: Parameters<typeof _createSpeedUI>[0] = {}) =>
  _createSpeedUI({ components, directives, ...options })

export const version: string = (pkg as any)?.version ?? '0.0.0'
;(createSpeedUI as any).version = version

export { components, directives }
export * from './composables'
