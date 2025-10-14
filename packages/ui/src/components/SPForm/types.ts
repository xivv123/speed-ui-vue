import type { InjectionKey } from 'vue'

export interface FormDataProvider {
  formData: Record<string, any>
  getFieldValue: (prop: string) => any
  setFieldValue: (prop: string, value: any) => void
}

export interface FormConfigProvider {
  labelPosition?: 'left' | 'right' | 'top'
  labelWidth?: string | number
  labelAlign?: 'left' | 'center' | 'right'
}

export const FormDataKey: InjectionKey<FormDataProvider> = Symbol.for('speed:form-data')

export const FormConfigKey: InjectionKey<FormConfigProvider> = Symbol.for('speed:form-config')
