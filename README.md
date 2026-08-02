# SIMTALENTA DJBC

Simulator belajar Manajemen Talenta DJBC untuk bidang Dukungan Manajemen.

## Fitur

- bank aktif 229 soal pilihan ganda unik dan analitik dalam 11 rumpun materi
- 1.000 soal berpola dikarantina setelah audit mutu; 24 soal revisi multi-ketentuan diaktifkan
- simulasi 100 soal unik acak dari seluruh bank dengan batas waktu 120 menit
- ringkasan hafalan dengan angka kunci, kode ingatan, dan jebakan ujian
- mode pembahasan langsung setelah setiap jawaban
- belajar adaptif 20 soal berdasarkan progres pengguna
- Sprint 3 Hari dengan 33 soal berimbang dari seluruh 11 rumpun
- rencana belajar harian dan rekomendasi topik prioritas dari progres lokal
- chatbot knowledge base dengan pencarian pembahasan, ringkasan, serta tautan sumber Drive dan regulasi
- latihan per topik
- pembahasan jawaban benar dan seluruh opsi pengecoh
- tautan rujukan materi Drive dan regulasi resmi
- progres tersimpan lokal pada perangkat
- versi statis untuk GitHub Pages tanpa autentikasi OpenAI

## Pengembangan

Memerlukan Node.js `>=22.13.0`.

```bash
npm install
npm run dev
npm run lint
npm test
npm run build:pages
```

GitHub Pages dibangun ke folder `docs/` dan disajikan dari cabang `main`.
