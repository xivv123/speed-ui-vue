// Composables
import { createForm } from '@/composables/form'
import { forwardRefs } from '@/composables/forwardRefs'
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { ref, provide, toRef } from 'vue'
import { genericComponent, useRender } from '@/utils'

// Props
import { makeSPFormProps } from './props'

// Types
import type { SubmitEventPromise } from '@/composables/form'
import { FormConfigKey, FormDataKey, type FormConfigProvider, type FormDataProvider } from './types'

type SPFormSlots = {
  default: ReturnType<typeof createForm>
}

export const SPForm = genericComponent<SPFormSlots>()({
  name: 'SPForm',

  props: makeSPFormProps(),

  emits: {
    'update:modelValue': (val: boolean | null) => true,
    submit: (e: SubmitEventPromise) => true,
  },

  setup(props, { slots, emit }) {
    const form = createForm(props)
    const formRef = ref<HTMLFormElement>()

    // Form data bindings for child controls
    const formDataProvider: FormDataProvider = {
      formData: props.model || {},
      getFieldValue: (prop: string) => {
        return props.model?.[prop]
      },
      setFieldValue: (prop: string, value: any) => {
        if (props.model) {
          props.model[prop] = value
        }
      },
    }

    // Shared label configuration for form items
    const formConfigProvider: FormConfigProvider = {
      labelPosition: props.labelPosition,
      labelWidth: props.labelWidth,
      labelAlign: props.labelAlign,
    }

    provide(FormDataKey, formDataProvider)
    provide(FormConfigKey, formConfigProvider)

    // Surface density as a default for children, overridable per component
    provideDefaults({
      global: {
        density: toRef(() => props.density),
      },
    })

    function onReset(e: Event) {
      e.preventDefault()
      form.reset()
    }

    function onSubmit(_e: Event) {
      const e = _e as SubmitEventPromise

      const ready = form.validate()
      e.then = ready.then.bind(ready)
      e.catch = ready.catch.bind(ready)
      e.finally = ready.finally.bind(ready)

      emit('submit', e)

      if (!e.defaultPrevented) {
        ready.then(({ valid }) => {
          if (valid) {
            formRef.value?.submit()
          }
        })
      }

      e.preventDefault()
    }

    useRender(() => (
      <form
        ref={formRef}
        class={['sp-form', props.class]}
        style={props.style}
        novalidate
        onReset={onReset}
        onSubmit={onSubmit}
      >
        {slots.default?.(form)}
      </form>
    ))

    return forwardRefs(form, formRef)
  },
})

export type SPForm = InstanceType<typeof SPForm>

export { FormConfigKey, FormDataKey } from './types'
export type { FormConfigProvider, FormDataProvider } from './types'
export { makeSPFormProps } from './props'
