# Arsitektur bank soal

Alur data:

`37 sumber terdaftar → 100 konsep → 3.000 unit kasus/fokus → 2.107 kandidat → audit → 1.560 aktif → 36 shard → paket sesi`

Folder utama:

- `src/data/sources/`: registry sumber, status, dan tanggal verifikasi;
- `src/data/knowledge-units/`: unit pengetahuan per kategori;
- `src/data/question-candidates/`: kandidat beserta skor review;
- `src/data/questions/`: bank aktif serta manifest checksum;
- `public/data/questions/`: shard runtime;
- `app/generated-bank-index.json`: indeks metadata ringan;
- `app/generated-bank-meta.json`: jumlah dan daftar kategori;
- `reports/`: statistik, mutu, kemiripan, privasi, sumber, dan cakupan.

Bundle awal hanya membawa indeks metadata. Stem, opsi, rationale, dan pembahasan diambil dari shard yang diperlukan paket. Cache per shard mencegah unduhan ulang dalam satu sesi aplikasi.

Setiap sesi menyimpan `sessionId`, `seed`, `questionBankVersion`, urutan soal, urutan opsi, jawaban, posisi, tanda ragu, waktu mulai, dan tenggat. Riwayat dibatasi 20 sesi dan seluruh penyimpanan berada di `localStorage` perangkat pengguna.
