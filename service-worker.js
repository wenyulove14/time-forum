// 定义缓存名称和需要缓存的文件列表
const CACHE_NAME = 'shizhi-forum-cache-v1';
const urlsToCache = [
  './index.html', // 缓存主页面
  './', // 缓存根目录，通常会解析为 index.html 或您服务器的默认页面
  // 如果您有外部图标、CSS或JS文件，也需要在这里列出
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

// 监听 install 事件，在安装时缓存核心文件
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 监听 fetch 事件，用于拦截网络请求
self.addEventListener('fetch', event => {
  event.respondWith(
    // 尝试在缓存中查找匹配的请求
    caches.match(event.request)
      .then(response => {
        // 如果缓存中有匹配的资源，则直接返回
        if (response) {
          return response;
        }
        // 如果缓存中没有，则通过网络请求获取，并返回结果
        return fetch(event.request);
      }
    )
  );
});
