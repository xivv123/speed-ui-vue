/**
 * Service Worker 注册脚本
 * 在客户端注册 Service Worker
 */

export function registerServiceWorker() {
  if (typeof window === 'undefined') {
    return
  }
  
  // 检查浏览器是否支持 Service Worker
  if (!('serviceWorker' in navigator)) {
    return
  }
  
  // 仅在生产环境启用
  if (import.meta.env.MODE !== 'production') {
    return
  }
  
  // 页面加载完成后注册
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      })
      
      // 监听更新
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        
        newWorker?.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // 新版本可用，提示用户刷新
            // 可以在这里显示更新提示
            showUpdateNotification(newWorker)
          }
        })
      })
      
      // 定期检查更新（每小时）
      setInterval(() => {
        registration.update()
      }, 60 * 60 * 1000)
      
    } catch (error) {
      console.error('[SW] Registration failed:', error)
    }
  })
}

/**
 * 显示更新通知
 */
function showUpdateNotification(worker) {
  // 简单的更新提示
  const shouldUpdate = confirm(
    '发现新版本！点击确定刷新页面以获取最新内容。'
  )
  
  if (shouldUpdate) {
    worker.postMessage('SKIP_WAITING')
    window.location.reload()
  }
}

/**
 * 手动清除缓存（用于调试）
 */
export function clearServiceWorkerCache() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.controller?.postMessage('CLEAR_CACHE')
  }
}
