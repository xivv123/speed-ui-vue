// Thin root plugin that delegates to the framework factory.
// Keeps the historical default export working while avoiding
// duplication of install logic. For a configurable factory,
// use `@speed-ui/ui/entry`.

import * as components from './components'
import * as directives from './directives'
import { createSpeedUI as _create } from './framework'

const plugin = _create({ components, directives })

// Re-export all component modules (named exports preserved)
export * from './components'

export default plugin

