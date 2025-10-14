import { ref, nextTick } from 'vue'
import { SPTextField } from '@/components/SPTextField/SPTextField'

export interface UseTitleEditorOptions {
  titleModel: any
  headerEnabled: boolean
  onTitleUpdate: (title: string) => void
}

export function useTitleEditor(options: UseTitleEditorOptions) {
  const { titleModel, headerEnabled, onTitleUpdate } = options
  
  // 编辑状态
  const isEditingTitle = ref(false)
  const tempTitle = ref('')
  const titleInputRef = ref<InstanceType<typeof SPTextField>>()

  // 开始编辑标题
  function startEditTitle() {
    if (!headerEnabled) return
    isEditingTitle.value = true
    tempTitle.value = titleModel.value || ''
    nextTick(() => {
      const inputElement = titleInputRef.value?.$el?.querySelector('input')
      if (inputElement) {
        inputElement.focus()
        // 设置光标到文本开头，让用户可以自由定位
        // setTimeout(() => {
        //   inputElement.setSelectionRange(0, 0)
        // }, 0)
      }
    })
  }

  // 完成编辑标题
  function finishEditTitle() {
    isEditingTitle.value = false
    if (tempTitle.value !== titleModel.value) {
      titleModel.value = tempTitle.value
      onTitleUpdate(tempTitle.value)
    }
  }

  // 取消编辑标题
  function cancelEditTitle() {
    isEditingTitle.value = false
    tempTitle.value = titleModel.value || ''
  }

  // 处理标题输入键盘事件
  function onTitleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      finishEditTitle()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      cancelEditTitle()
    }
  }

  return {
    // 状态
    isEditingTitle,
    tempTitle,
    titleInputRef,
    
    // 方法
    startEditTitle,
    finishEditTitle,
    cancelEditTitle,
    onTitleKeydown,
  }
}