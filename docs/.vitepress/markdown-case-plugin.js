import markdownItContainer from 'markdown-it-container'

export function markdownCasePlugin(md) {
  // 注册自定义容器渲染器，支持 ::: switch/basic 语法（自闭合）
  md.use(markdownItContainer, '', {
    validate: function (params) {
      // 匹配组件名/case名的格式，如 switch/basic
      const trimmed = params.trim()
      return trimmed.match(/^[A-Za-z]+\/[a-z-]+$/)
    },

    render: function (tokens, idx) {
      const token = tokens[idx]

      if (token.nesting === 1) {
        // 开始标签 - 直接渲染完整的组件，不需要结束标签
        const info = token.info.trim()
        const [component, caseName] = info.split('/')
        // 保持使用 /docs/cases/ 路径，DemoShowcase 组件会处理转换
        const caseFile = `/docs/cases/${component.toLowerCase()}/${component.toLowerCase()}-${caseName}.case.vue`

        return `<DemoShowcase case-file="${caseFile}"></DemoShowcase>\n`
      } else {
        // 结束标签 - 返回空字符串，因为我们已经在开始标签中完成了渲染
        return ''
      }
    },
  })

  // 注册 API 表格渲染器，支持 :::api/component/type 语法
  md.use(markdownItContainer, 'api', {
    validate: function (params) {
      // 匹配 api/component/type 格式，如 api/collapse/props 或 api/grid/row-props
      const trimmed = params.trim().replace(/^api\//, '')
      return trimmed.match(/^[a-z]+\/[a-z-]+$/)
    },

    render: function (tokens, idx) {
      const token = tokens[idx]

      if (token.nesting === 1) {
        // 开始标签
        const info = token.info.trim().replace(/^api\//, '')
        const [component, type] = info.split('/')
        // API 文件路径，现在放在 cases 目录下
        const apiFile = `/docs/cases/${component.toLowerCase()}/${component.toLowerCase()}-${type}.api.js`

        return `<ApiTable api-file="${apiFile}" type="${type}"></ApiTable>\n`
      } else {
        // 结束标签
        return ''
      }
    },
  })
}
