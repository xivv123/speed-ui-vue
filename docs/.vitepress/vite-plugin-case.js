export function caseFilePlugin() {
  return {
    name: 'case-file-plugin',
    enforce: 'pre',
    transform(code, id) {
      // 只处理 .case.vue 文件
      if (!id.endsWith('.case.vue')) {
        return null
      }
      
      // 提取各个部分 - 正确处理 Vue SFC 的顶层标签
      const textMatch = code.match(/<text>([\s\S]*?)<\/text>/)
      
      // 找到最外层的 template 标签（Vue SFC 的根 template）
      let templateMatch = null
      const templateRegex = /<template[^>]*>([\s\S]*)<\/template>/
      const match = code.match(templateRegex)
      if (match) {
        // 需要找到最后一个 </template> 来确保包含所有嵌套内容
        const templateStart = code.indexOf('<template')
        const templateOpenEnd = code.indexOf('>', templateStart) + 1
        
        // 从后往前找最后一个 </template>
        const lastTemplateEnd = code.lastIndexOf('</template>')
        if (lastTemplateEnd > templateOpenEnd) {
          const templateContent = code.substring(templateOpenEnd, lastTemplateEnd)
          templateMatch = [null, templateContent]
        }
      }
      
      const scriptMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/)
      
      let title = 'Demo'
      let description = ''
      let template = '<div>Empty demo</div>'
      let script = ''
      
      // 解析 text 部分
      if (textMatch) {
        const textContent = textMatch[1].trim()
        const titleMatch = textContent.match(/^#\s+(.+)$/m)
        if (titleMatch) {
          title = titleMatch[1].trim()
        }
        description = textContent
      }
      
      // 解析 template 部分 - 保持原始格式
      if (templateMatch) {
        template = templateMatch[1]
        // 只移除开头和结尾的空行，保持代码的原始缩进
        template = template.replace(/^\n+/, '').replace(/\n+$/, '')
      }
      
      // 解析 script 部分 - 保持原始格式，不使用 trim()
      if (scriptMatch) {
        script = scriptMatch[1]
        // 只移除开头和结尾的空行，保持代码的原始缩进
        script = script.replace(/^\n+/, '').replace(/\n+$/, '')
      }
      
      // 生成标准的 Vue 单文件组件，包含真正的 script 逻辑
      let result = `<template>
${template}
</template>

<script setup lang="ts">
${script}
</script>

<script lang="ts">
// 导出组件定义和元数据
export default {
  name: 'CaseDemo',
  __caseMetadata: {
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(description)},
    template: ${JSON.stringify(template)},
    script: ${JSON.stringify(script)}
  }
}
</script>`
      
      return {
        code: result,
        map: null
      }
    }
  }
} 