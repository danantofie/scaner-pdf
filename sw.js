// Păstrează aplicația pe telefon, ca să meargă și fără internet.
const VERSIUNE = "scaner-pdf-v2";
const FISIERE = ["./", "index.html", "jspdf.umd.min.js", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSIUNE).then(c => c.addAll(FISIERE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSIUNE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // fișierele aplicației: întâi internetul (ca să vină versiunea nouă), apoi copia salvată
  if (url.origin === location.origin) {
    e.respondWith(fetch(req)
      .then(r => { const copy = r.clone(); caches.open(VERSIUNE).then(c => c.put(req, copy)); return r; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("index.html"))));
    return;
  }
  // fonturile Google: copia salvată, altfel internetul
  if (url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSIUNE).then(c => c.put(req, copy)); return res;
    })));
  }
});
