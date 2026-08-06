const CACHE='mi-barrio-v2';
const ASSETS=['./','./index.html','./styles.css','./script.js','./manifest.webmanifest','./assets/placa-mi-barrio.webp','./assets/placa-mi-barrio-mobile.webp','./assets/logo-es-con-vos.webp','./assets/logo-intendencia.webp'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',event=>event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request))));
