# SIMTALENTA DJBC

Simulator belajar publik untuk Uji Kompetensi Manajerial DJBC. Versi bank aktif `2026.08.drive-categories-v2` memuat 1.560 soal dari 2.107 kandidat dalam 11 kategori yang mengikuti folder materi Google Drive.

## Fitur utama

- 1.560 soal aktif; setiap kategori berisi 100–180 soal
- kategori: Disiplin Pegawai, Kehumasan, Kepatuhan Internal, Kepegawaian, Keuangan, Layanan Informasi, Manajemen Risiko, Organisasi, Pengelolaan Kinerja, Ringkasan, dan Rumah Tangga
- stem langsung ke kasus atau konsep, tanpa kalimat pembuka yang tidak relevan
- pembahasan jawaban benar dan kondisi yang membuat masing-masing opsi B/C/D dapat tepat
- 36 shard JSON yang dimuat sesuai paket sesi; seluruh isi bank tidak masuk bundle awal
- paket simulasi acak bertingkat berdasarkan kategori, kesulitan, dan level kognitif
- filter kelompok sumber, subdomain, kesulitan, jumlah soal, dan waktu
- mode simulasi, pembahasan langsung, Sprint 3 Hari, latihan kategori, serta favorit
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
