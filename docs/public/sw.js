/**
 * Service Worker for Speed UI Docs
 * 提供离线缓存和资源预缓存
 */

const CACHE_VERSION = 'speed-ui-docs-v2' // 更新版本号以清除旧缓存
const CACHE_NAME = `${CACHE_VERSION}-${Date.now()}`

// 需要预缓存的关键资源
// 注意：这些路径会自动加上 base 路径
const BASE_PATH = '/speed-ui-vue/'
const PRECACHE_URLS = [
  BASE_PATH,
  `${BASE_PATH}guide/`,
  `${BASE_PATH}components/`,
]

// 缓存策略配置
const CACHE_STRATEGIES = {
  // 静态资源：缓存优先
  static: /\.(js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|webp)$/,
  // HTML：网络优先，失败时使用缓存
  html: /\.html$/,
  // API：网络优先
  api: /\/api\//,
}

// 安装事件：预缓存关键资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(PRECACHE_URLS)
      })
      .then(() => {
        // 立即激活新的 Service Worker
        return self.skipWaiting()
      })
  )
})

// 激活事件：清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (
              cacheName !== CACHE_NAME &&
              cacheName.startsWith('speed-ui-docs-')
            ) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        // 立即控制所有客户端
        return self.clients.claim()
      })
  )
})

// 请求拦截：实施缓存策略
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // 只处理同源请求
  if (url.origin !== location.origin) {
    return
  }

  // 静态资源：缓存优先
  if (CACHE_STRATEGIES.static.test(url.pathname)) {
    event.respondWith(cacheFirst(request))
    return
  }

  // HTML：网络优先
  if (CACHE_STRATEGIES.html.test(url.pathname) || url.pathname.endsWith('/')) {
    event.respondWith(networkFirst(request))
    return
  }

  // 默认：网络优先
  event.respondWith(networkFirst(request))
})

/**
 * 缓存优先策略
 * 适用于：静态资源（JS、CSS、图片、字体等）
 */
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(request)

  if (cached) {
    return cached
  }

  try {
    const response = await fetch(request)

    // 只缓存成功的响应
    if (response.ok) {
      cache.put(request, response.clone())
    }

    return response
  } catch (error) {
    console.error('[SW] Fetch failed:', error)
    throw error
  }
}

/**
 * 网络优先策略
 * 适用于：HTML 页面、API 请求
 */
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME)

  try {
    const response = await fetch(request)

    // 缓存成功的响应
    if (response.ok) {
      cache.put(request, response.clone())
    }

    return response
  } catch (error) {
    const cached = await cache.match(request)
    if (cached) {
      return cached
    }

    throw error
  }
}

// 消息处理：支持手动清除缓存
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting()
  }

  if (event.data === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        )
      })
    )
  }
})
