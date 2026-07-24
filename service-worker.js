const CACHE_NAME = 'digital-school-pocket-v2'; // Ubah ke v2 agar sistem memperbarui cache
const urlsToCache = [
  './',             // Tambahkan baris ini (Halaman utama)
  './index.html',
  './manifest.json'
  // Jika ada file gambar, CSS, atau JavaScript, tambahkan juga di sini
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch dari Cache / Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Ambil dari cache jika ada
        }
        return fetch(event.request); // Ambil dari internet jika tidak ada di cache
      })
  );
});

// Activate & Cleanup Old Caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Hapus cache versi lama (v1)
          }
        })
      );
    })
  );
});