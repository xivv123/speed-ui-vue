export default [
  {
    '插槽名': 'default',
    '说明': '默认插槽，提供表单内容和状态管理功能',
    '作用域参数': '`{ isValid: boolean | null, isValidating: boolean, errors: Array<{ id: string, errorMessages: string[] }>, validate: () => Promise<{ valid: boolean, errors: any[] }>, reset: () => void, resetValidation: () => void }`'
  }
]