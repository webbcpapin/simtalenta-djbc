# Audit awal

Tanggal audit: 3 Agustus 2026.

Bank runtime lama berisi 227 soal aktif. Sebanyak 1.000 soal dari workbook lama dikarantina karena pola berulang, distractor lemah, dan pembahasan yang tidak selalu terkait langsung dengan stem. Struktur aplikasi sebelumnya juga memasukkan data soal ke bundle utama dan belum menyimpan versi bank maupun seed sesi.

Perbaikan yang diterapkan:

- bank lama tidak lagi menjadi sumber simulator utama;
- versi terkini membangun 2.107 kandidat dari 100 konsep dan 3.000 unit kasus/fokus;
- tepat 1.560 soal dengan skor review minimal 85 berstatus `active`, dengan minimal 100 soal pada setiap kategori Drive;
- 0 pasangan identik atau kemiripan di atas ambang audit;
- 0 temuan data pribadi/credential pada bank aktif;
- data aktif dipisah menjadi 23 shard dan dimuat per sesi;
- ID, versi bank, seed, riwayat, progres, dan favorit dapat diaudit.

Audit ini tidak mengklaim penelaahan manusia independen. Skor review berasal dari rubrik terotomasi berbasis unit pengetahuan terverifikasi dan seluruh gate struktural dijalankan oleh validator repository.
