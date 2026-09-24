// ================================================================
// GO RUN 2.0 Service Worker（PWA 全屏支持）
// 规矩：发版必须 CACHE_VER +1（例：gorun2-v1 → gorun2-v2）
// 策略：页面 network-first（保发版即最新）；素材 stale-while-revalidate
// 注意：SW 只在 HTTPS 或 localhost 生效，file:// 打开自动跳过（页面侧已做判断）
// ================================================================
const CACHE_VER = 'gorun2-v1';
const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './css/style.css',
  './js/data.js',
  './js/app.js',
  './js/modules/publish.js',
  './js/modules/health.js',
  './js/modules/profile.js',
  './img/cover/1.jpg',
  './img/cover/2.jpg',
  './img/cover/3.jpg',
  './img/cover/4.jpg',
  './img/cover/5.jpg',
  './img/cover/6.jpg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_VER)
      .then((c) => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VER).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return; // 不拦跨域（B站封面等走自身缓存策略）

  // 页面导航：network-first，断网回落缓存
  if (e.request.mode === 'navigate' || (e.request.headers.get('accept') || '').includes('text/html')) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VER).then((c) => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // 其余素材：stale-while-revalidate（缓存秒开，后台静默更新）
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fresh = fetch(e.request)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_VER).then((c) => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fresh;
    })
  );
});
