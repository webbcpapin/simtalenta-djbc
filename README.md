# SIMTALENTA DJBC

Simulator belajar publik untuk Uji Kompetensi Manajerial DJBC. Versi bank aktif `2026.08.1000-v1` memuat tepat 1.000 soal dari 1.354 kandidat, terdistribusi ke sembilan domain.

## Fitur utama

- 1.000 soal aktif dengan ID stabil, metadata sumber, skor review, dan pembahasan keempat opsi
- 23 shard JSON yang dimuat sesuai paket sesi; seluruh isi bank tidak masuk bundle awal
- paket simulasi acak bertingkat berdasarkan domain, kesulitan, dan level kognitif
- filter domain, subdomain, kesulitan, jumlah soal, dan waktu
- mode simulasi, pembahasan langsung, Sprint 3 Hari, latihan topik, serta favorit
- progres, sesi aktif, riwayat 20 sesi, seed, dan versi bank tersimpan lokal
- chatbot knowledge base, kartu ringkasan, PWA/Add to Home Screen, dan sumber Drive
- pemeriksaan skema, sumber, kualitas, kemiripan, distribusi kunci, serta privasi

## Perintah

```bash
npm run questions:build
npm run questions:stats
npm run questions:duplicates
npm run questions:privacy
npm run questions:sources
npm run validate:questions
npm test
npm run build:pages
```

GitHub Pages dibangun ke `docs/` dan dipublikasikan dari cabang `main`.
