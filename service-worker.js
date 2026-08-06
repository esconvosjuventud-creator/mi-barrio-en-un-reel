const CACHE='mi-barrio-portal-v3';
const ASSETS=['./','./index.html','./styles.css','./script.js','./manifest.webmanifest','./assets/placa-mi-barrio.webp','./assets/placa-mi-barrio-mobile.webp','./assets/logo-es-con-vos.webp','./assets/logo-intendencia.webp','./assets/qr-inscripcion.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
