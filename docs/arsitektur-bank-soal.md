# Arsitektur bank soal

Alur data:

`source registry → knowledge units → 1.354 candidates → review/audit → 1.000 active → 23 shards → session package`

Folder utama:

- `src/data/sources/`: registry dan status sumber;
- `src/data/knowledge-units/`: 135 unit pengetahuan;
- `src/data/question-candidates/`: kandidat dan skor review;
- `src/data/questions/`: bank aktif serta manifest checksum;
- `public/data/questions/`: shard runtime;
- `app/generated-bank-index.json`: indeks metadata ringan;
- `reports/`: statistik, mutu, kemiripan, privasi, sumber, dan cakupan.

Bundle awal hanya membawa indeks metadata. Stem, opsi, rationale, dan pembahasan diambil dari shard yang diperlukan paket. Cache per shard mencegah unduhan ulang dalam satu sesi aplikasi.

Setiap sesi menyimpan `sessionId`, `seed`, `questionBankVersion`, urutan soal, urutan opsi, jawaban, posisi, tanda ragu, waktu mulai, dan deadline. Riwayat dibatasi 20 sesi dan seluruh penyimpanan berada di `localStorage` perangkat pengguna.

