# Audit bank soal

Audit otomatis dijalankan dengan `npm run validate:questions`; rincian per soal tersimpan pada `docs/audit-bank-soal.json`.

## Status bank

- 227 soal aktif dengan metadata skema versi 2.
- Bank workbook lama dipertahankan sebagai arsip karantina dan tidak masuk runtime baru.
- 24 soal hasil revisi audit aktif.
- 2 soal extended berstatus `needs_verification` dan dikeluarkan dari runtime.

Validator memeriksa ID/konten duplikat, data kosong, jumlah opsi, indeks kunci, metadata wajib, URL/status sumber, larangan soal non-current aktif, distribusi/rangkaian kunci, dan kemiripan tinggi stem.

Lolos validator berarti lengkap dan konsisten secara struktural; bukan pengesahan resmi materi. Distraktor dan pembahasan tetap perlu ditelaah saat sumber berubah.
