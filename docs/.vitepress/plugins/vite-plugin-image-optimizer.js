/**
 * Vite 图片优化插件
 * 自动为图片添加懒加载和响应式支持
 */
export function imageOptimizerPlugin() {
  return {
    name: 'vite-plugin-image-optimizer',
    
    transformIndexHtml(html) {
      // 为所有 img 标签添加 loading="lazy"
      html = html.replace(
        /<img\s+([^>]*?)(?<!loading=["'][^"']*["'])\s*>/gi,
        (match, attrs) => {
          // 如果已经有 loading 属性，不添加
          if (/loading\s*=/.test(attrs)) {
            return match
          }
          return `<img ${attrs} loading="lazy">`
        }
      )
      
      return html
    },
    
    transform(code, id) {
      // 处理 Vue 组件中的图片
      if (id.endsWith('.vue') || id.endsWith('.md')) {
        // 为 img 标签添加 loading="lazy"
        code = code.replace(
          /<img\s+([^>]*?)(?<!loading=["'][^"']*["'])\s*>/gi,
          (match, attrs) => {
            if (/loading\s*=/.test(attrs)) {
              return match
            }
            return `<img ${attrs} loading="lazy">`
          }
        )
      }
      
      return code
    }
  }
}
