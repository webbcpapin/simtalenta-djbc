# Audit awal

Tanggal audit: 3 Agustus 2026.

Bank runtime lama berisi 227 soal aktif. Sebanyak 1.000 soal dari workbook lama dikarantina karena pola berulang, distractor lemah, dan pembahasan yang tidak selalu terkait langsung dengan stem. Struktur aplikasi sebelumnya juga memasukkan data soal ke bundle utama dan belum menyimpan versi bank maupun seed sesi.

Perbaikan yang diterapkan:

- bank lama tidak lagi menjadi sumber simulator utama;
- 1.354 kandidat baru dibangun dari registry sumber dan 135 unit pengetahuan;
- hanya 1.000 soal dengan skor review minimal 85 yang berstatus `active`;
- 0 pasangan identik atau kemiripan di atas ambang audit;
- 0 temuan data pribadi/credential pada bank aktif;
- data aktif dipisah menjadi 23 shard dan dimuat per sesi;
- ID, versi bank, seed, riwayat, progres, dan favorit dapat diaudit.

Audit ini tidak mengklaim penelaahan manusia independen. Skor review berasal dari rubrik terotomasi berbasis unit pengetahuan terverifikasi dan seluruh gate struktural dijalankan oleh validator repository.

