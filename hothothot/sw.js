self.addEventListener('install', (e) => {

    e.waitUntil(
  
      caches.open('my-custom-pwa').then((cache) => cache.addAll([
  
          "accueil.html",
  
          "main.js",
  
          "sw.js",
  
          // ... ajouter les autres ressources à mettre en cache
  
      ])), 
  
    );
  
  });
    
  self.addEventListener('fetch', (e) => {

    e.respondWith(
  
      caches.match(e.request).then((response) => response || fetch(e.request)),
  
    );
  
  });