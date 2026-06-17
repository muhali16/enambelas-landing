# Panduan SEO — EnamBelas.Dev

Dokumen ini berisi (1) ringkasan yang sudah dikerjakan di kode, dan (2) langkah
yang **harus Anda lakukan sendiri** agar website terindeks Google dan rank #1
untuk kata kunci brand "enambelas" / "enambelas dev".

> Domain: **https://enambelas.dev** · Hosting: **VPS + nginx**

---

## 1. Yang sudah dikerjakan di kode (selesai)

- **Title & meta description** kaya keyword di `index.html` & `console.html`.
- **Canonical URL** (`https://enambelas.dev/`) — mencegah duplikat.
- **Open Graph + Twitter Card** — saat link di-share (WhatsApp, X, LinkedIn,
  Telegram, FB) muncul kartu dengan logo: `public/og-image.png` (1200×630).
- **JSON-LD structured data** (`WebSite` + `Organization`) dengan
  `alternateName` = enambelas / enambelas dev → membantu Google memahami brand.
- **`robots.txt`** — mengizinkan semua crawler + menunjuk ke sitemap.
- **`sitemap.xml`** — daftar halaman untuk Google.
- **`site.webmanifest`** — PWA/branding + ikon.
- Frasa "WEB DEVELOPMENT" ditampilkan visible di hero untuk relevansi keyword.

---

## 2. Langkah WAJIB Anda lakukan setelah deploy

### Langkah 0 — Deploy & rebuild
```bash
npm run build          # build ulang CSS Tailwind
git add -A && git commit -m "SEO: meta, OG, sitemap, structured data"
git push
```
Lalu pull/deploy di VPS sehingga file baru ikut ter-serve:
`robots.txt`, `sitemap.xml`, `site.webmanifest`, `public/og-image.png`.

**Pastikan via browser bisa diakses:**
- https://enambelas.dev/robots.txt
- https://enambelas.dev/sitemap.xml
- https://enambelas.dev/public/og-image.png

### Langkah 1 — Konfigurasi nginx (penting)
Tambahkan/pastikan di server block:
```nginx
# MIME type untuk manifest (default nginx kadang belum ada)
location ~* \.webmanifest$ { default_type application/manifest+json; }

# Paksa HTTPS + satu host kanonik (pilih tanpa www)
server {
    listen 80;
    server_name enambelas.dev www.enambelas.dev;
    return 301 https://enambelas.dev$request_uri;
}
server {
    listen 443 ssl http2;
    server_name www.enambelas.dev;
    return 301 https://enambelas.dev$request_uri;   # www -> non-www
}
# server block utama: server_name enambelas.dev; (sajikan situs di sini)

# Opsional: gzip untuk skor kecepatan (Core Web Vitals)
gzip on;
gzip_types text/css application/javascript image/svg+xml application/json;
```
Pastikan **SSL/HTTPS aktif** (Let's Encrypt / certbot). HTTPS adalah faktor
ranking dan syarat tampil normal.

### Langkah 2 — Google Search Console (paling penting untuk indexing)
1. Buka https://search.google.com/search-console
2. Add property → **Domain** `enambelas.dev` (verifikasi lewat **DNS TXT** di
   panel domain Anda) — ini mencakup semua subdomain & protokol.
3. Menu **Sitemaps** → submit: `sitemap.xml`
4. Menu **URL Inspection** → tempel `https://enambelas.dev/` → **Request
   Indexing**. Ulangi untuk `https://enambelas.dev/console.html`.

> Indexing biasanya 1–7 hari. Untuk brand unik seperti "enambelas" yang nyaris
> tanpa kompetitor, setelah terindeks Anda hampir pasti rank #1 untuk nama brand.

### Langkah 3 — Bing Webmaster Tools (bonus, mudah)
https://www.bing.com/webmasters → import dari Search Console → submit sitemap.
(Bing juga menyuplai DuckDuckGo, Yahoo, dan jawaban Copilot/ChatGPT.)

### Langkah 4 — Verifikasi tampilan share (logo saat link di-attach)
Setelah deploy, tes di:
- **Facebook/WhatsApp/Instagram**: https://developers.facebook.com/tools/debug/
  → masukkan URL → **Scrape Again** (memaksa refresh cache OG).
- **X / Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/
- **Rich Results / structured data**: https://search.google.com/test/rich-results
  dan https://validator.schema.org/

> Penting: platform sosial **men-cache** OG image. Kalau logo belum muncul/masih
> versi lama, jalankan "Scrape Again" di debugger di atas.

### Langkah 5 — Bangun sinyal brand (mempercepat & mengunci ranking)
Google lebih percaya brand yang muncul konsisten di banyak tempat:
- Buat profil & cantumkan `https://enambelas.dev` di: **GitHub** (bio + pin repo),
  **LinkedIn**, **Instagram/X**, **Threads**, dll.
- Daftarkan ke direktori relevan (Product Hunt nanti saat launch, dll).
- Sebar 1–2 backlink awal (postingan sosial yang menautkan domain).

Setelah punya akun-akun tersebut, **tambahkan `sameAs`** ke JSON-LD di
`index.html` (di node `Organization`) agar Google mengaitkannya, contoh:
```json
"sameAs": [
  "https://github.com/muhali16",
  "https://www.linkedin.com/in/USERNAME",
  "https://instagram.com/USERNAME"
]
```

### Langkah 6 — Konten (faktor jangka panjang terkuat)
Halaman "coming soon" memang minim konten. Begitu siap, tambahkan konten asli
yang memuat kata kunci secara natural: layanan, portfolio/karya, halaman About,
atau blog. Makin banyak konten relevan & unik, makin kuat ranking untuk kata di
luar nama brand (mis. "web developer Jakarta").

---

## 3. Checklist cepat

- [ ] `npm run build` lalu deploy ke VPS
- [ ] robots.txt, sitemap.xml, og-image.png bisa diakses publik
- [ ] HTTPS aktif + redirect www→non-www & http→https
- [ ] Search Console: verifikasi domain + submit sitemap + request indexing
- [ ] Bing Webmaster: submit sitemap
- [ ] Tes OG di FB/X/LinkedIn debugger (Scrape Again)
- [ ] Tes Rich Results (structured data valid)
- [ ] Pasang link enambelas.dev di GitHub/LinkedIn/IG, lalu isi `sameAs`
- [ ] (Saat siap) tambah konten/portfolio asli

---

## Catatan pemeliharaan
- Jika menambah halaman baru → tambahkan ke `sitemap.xml` & update `lastmod`.
- Jika ganti desain OG → ganti `public/og-image.png` (tetap 1200×630) lalu
  jalankan "Scrape Again" di tiap debugger sosial.
