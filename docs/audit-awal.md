# Audit awal SIMTALENTA DJBC

Tanggal audit: 3 Agustus 2026.

## Ruang lingkup

- Aplikasi React/vinext statis, GitHub Pages dengan base path `/simtalenta-djbc/`.
- State soal, jawaban, navigasi, timer, hasil, sumber, PWA, dan chatbot lokal.
- Bank aktif sebelum audit: 229 soal; 1.000 soal berpola sudah dikarantina.

## Temuan kritis

1. `isStudyMode` bernilai benar untuk semua sesi, sehingga simulasi membuka kunci/pembahasan saat opsi dipilih.
2. Timer hanya di memori; refresh menghilangkan sesi dan dapat mengulang waktu.
3. Metadata audit sumber/status regulasi belum melekat pada tiap soal.
4. Dua soal extended hanya merujuk anchor lokal dan belum memiliki sumber publik tertelusur.
5. Hasil belum memuat durasi, nilai per kesulitan, atau pengulangan soal salah/kosong.

## Keputusan

- Pisahkan perilaku latihan dan ujian pada state.
- Simpan sesi, jawaban, bendera, indeks, waktu mulai, dan tenggat dengan versi skema.
- Nonaktifkan dua soal `needs_verification`; bank aktif menjadi 227 soal.
- Terapkan metadata wajib, validator otomatis, distribusi kunci seimbang, dan dokumen sumber.
- Labeli jumlah soal, durasi, dan interpretasi nilai sebagai konfigurasi internal, bukan ketentuan kelulusan resmi.

