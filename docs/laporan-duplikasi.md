# Laporan duplikasi

Validator membandingkan 499.500 pasangan soal aktif.

- stem identik: 0
- set opsi identik: 0
- pembahasan identik: 0
- Jaccard token substantif stem ≥0,82: 0
- cosine TF-IDF gabungan stem dan opsi ≥0,88: 0

Token generik berfrekuensi tinggi diperlakukan sebagai corpus stop words agar ukuran berfokus pada substansi, bukan frasa instruksional yang memang dipakai lintas soal. Hasil lengkap tersedia di `reports/question-similarity-report.json`.

