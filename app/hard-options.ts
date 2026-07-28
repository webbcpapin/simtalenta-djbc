export type HardOption = readonly [text: string, explanation: string];
export type HardOptionSet = readonly [
  HardOption,
  HardOption,
  HardOption,
  HardOption,
];

export const hardOptions: Record<number, HardOptionSet> = {
  1: [
    [
      "Tidak tepat; DKI mencakup perencanaan, pelaksanaan, dan evaluasi, tetapi tidak mencakup tindak lanjut.",
      "Keliru. Jebakannya ada pada penghilangan tahap tindak lanjut; DKI mencakup keempat tahap siklus kinerja.",
    ],
    [
      "Tidak tepat; DKI mencakup perencanaan, pelaksanaan, evaluasi, dan tindak lanjut serta dapat melibatkan ketua tim.",
      "Benar. DKI berlangsung sepanjang siklus kinerja dan, dalam kerja kolaboratif, dapat melibatkan ketua tim atau atasan unit penugasan.",
    ],
    [
      "Tidak tepat; DKI mencakup perencanaan, pelaksanaan, evaluasi, dan tindak lanjut, tetapi hanya dilakukan pada akhir periode.",
      "Keliru. Cakupan tahapnya benar, tetapi DKI tidak dibatasi hanya pada akhir periode; DKI dapat periodik maupun insidental.",
    ],
    [
      "Tidak tepat; DKI mencakup perencanaan, pelaksanaan, evaluasi, dan tindak lanjut, tetapi hanya melibatkan pengelola kinerja.",
      "Keliru. Pihak utama DKI ialah Pejabat Penilai Kinerja dan pegawai; pengelola kinerja bukan satu-satunya pihak yang boleh terlibat.",
    ],
  ],
  2: [
    [
      "Paling sedikit sekali dalam satu bulan.",
      "Keliru. Satu bulan dapat menjadi frekuensi pelaksanaan, tetapi bukan batas minimum pelaporan yang ditetapkan.",
    ],
    [
      "Paling sedikit sekali dalam enam bulan.",
      "Keliru. Enam bulan terlalu jarang dibanding batas minimum yang ditentukan.",
    ],
    [
      "Paling sedikit sekali dalam tiga bulan.",
      "Benar. Laporan DKI disampaikan paling sedikit satu kali dalam setiap tiga bulan.",
    ],
    [
      "Paling sedikit sekali dalam empat bulan.",
      "Keliru. Angka empat bulan tidak menjadi ambang minimum dalam ketentuan.",
    ],
  ],
  3: [
    [
      "Hasil Kerja, Perilaku Kerja, dan Lampiran SKP.",
      "Benar. Tiga komponen SKP ialah Hasil Kerja, Perilaku Kerja, dan Lampiran SKP.",
    ],
    [
      "Hasil Kerja, Perilaku Kinerja, dan Lampiran SKP.",
      "Keliru. Istilah normatifnya adalah Perilaku Kerja, bukan Perilaku Kinerja.",
    ],
    [
      "Hasil Kinerja, Perilaku Kerja, dan Lampiran SKP.",
      "Keliru. Komponen pertama bernama Hasil Kerja, bukan Hasil Kinerja.",
    ],
    [
      "Hasil Kerja, Perilaku Kerja, dan Lampiran Kinerja.",
      "Keliru. Komponen ketiga adalah Lampiran SKP, bukan Lampiran Kinerja.",
    ],
  ],
  4: [
    [
      "NHK 70% dan NPK 30%.",
      "Keliru. Komposisi 70:30 muncul pada formula NKO tertentu, bukan bobot awal NHK dan NPK.",
    ],
    [
      "NHK 75% dan NPK 20%.",
      "Keliru. Bobot NHK benar, tetapi bobot NPK seharusnya 25%, sehingga jumlahnya 100%.",
    ],
    [
      "NHK 80% dan NPK 20%.",
      "Keliru. KMK 127/2026 tidak menggunakan komposisi 80:20 untuk NHK dan NPK.",
    ],
    [
      "NHK 75% dan NPK 25%.",
      "Benar. Nilai Hasil Kerja berbobot 75% dan Nilai Perilaku Kerja berbobot 25%.",
    ],
  ],
  5: [
    [
      "120 untuk Menteri/Wakil Menteri/JPT Madya/JPT Pratama; 115 untuk Administrator, Pengawas, JF, dan Pelaksana.",
      "Keliru. JPT Pratama masuk kelompok batas 115, bukan kelompok batas 120.",
    ],
    [
      "120 untuk Menteri/Wakil Menteri/JPT Madya; 115 untuk JPT Pratama, Administrator, Pengawas, JF, dan Pelaksana.",
      "Benar. Pembeda kritisnya ialah JPT Madya berbatas 120, sedangkan JPT Pratama berbatas 115.",
    ],
    [
      "115 untuk Menteri/Wakil Menteri/JPT Madya; 120 untuk JPT Pratama, Administrator, Pengawas, JF, dan Pelaksana.",
      "Keliru. Kedua batas kelompok jabatan tersebut tertukar.",
    ],
    [
      "120 untuk Menteri/Wakil Menteri/JPT Madya; 110 untuk JPT Pratama, Administrator, Pengawas, JF, dan Pelaksana.",
      "Keliru. Kelompok kedua berbatas maksimum 115, bukan 110.",
    ],
  ],
  6: [
    [
      "Agar kinerja dapat diukur bulanan saja dan evaluasi triwulanan ditiadakan.",
      "Keliru. Trajectory dapat bulanan atau triwulanan dan tidak meniadakan evaluasi periodik.",
    ],
    [
      "Agar kinerja dapat diukur periodik, tetapi deteksi dini hanya dilakukan pada akhir tahun.",
      "Keliru. Salah satu tujuannya justru mendeteksi deviasi sedini mungkin, bukan menunggu akhir tahun.",
    ],
    [
      "Agar kinerja dapat diukur dan dievaluasi secara periodik serta deviasi dideteksi lebih dini.",
      "Benar. Trajectory menguraikan target tahunan ke titik ukur periodik untuk pemantauan dan deteksi dini.",
    ],
    [
      "Agar kinerja dapat diukur secara periodik dengan menggantikan target tahunan.",
      "Keliru. Trajectory memecah target tahunan, bukan menggantikannya.",
    ],
  ],
  7: [
    [
      "Kualitas indikator dan kualitas target.",
      "Benar. Reviu K3 menguji mutu indikator sekaligus mutu targetnya.",
    ],
    [
      "Kualitas indikator dan kuantitas target.",
      "Keliru. Istilah kelompok penilaiannya ialah kualitas target, bukan kuantitas target.",
    ],
    [
      "Kuantitas indikator dan kualitas target.",
      "Keliru. Yang direviu adalah kualitas indikator, bukan sekadar jumlah indikator.",
    ],
    [
      "Kualitas indikasi dan kualitas target.",
      "Keliru. Istilah normatifnya indikator, bukan indikasi.",
    ],
  ],
  8: [
    [
      "Nilai Koreksi, Nilai Dampak Hukuman Disiplin, dan Nilai Dampak Perilaku.",
      "Keliru. Istilah yang digunakan adalah Nilai Dampak Pelanggaran Disiplin, bukan Nilai Dampak Hukuman Disiplin.",
    ],
    [
      "Nilai Koreksi, Nilai Dampak Pelanggaran Disiplin, dan Nilai Perilaku.",
      "Keliru. Komponen ketiga ialah Nilai Dampak Perilaku, bukan Nilai Perilaku.",
    ],
    [
      "Nilai Koreksi, Nilai Dampak Pelanggaran Disiplin, dan Nilai Dampak Perilaku.",
      "Benar. Ketiga nilai inilah yang ditetapkan melalui Sidang TPK.",
    ],
    [
      "Nilai Koreksi, Nilai Pelanggaran Disiplin, dan Nilai Dampak Perilaku.",
      "Keliru. Komponen kedua harus memuat unsur dampak: Nilai Dampak Pelanggaran Disiplin.",
    ],
  ],
  9: [
    [
      "NKO, Nilai Hukuman Disiplin, Nilai Dampak Perilaku, dan Nilai Koreksi.",
      "Keliru. Komponen yang diperhitungkan ialah Nilai Dampak Pelanggaran Disiplin; istilah Nilai Hukuman Disiplin tidak menggantikannya.",
    ],
    [
      "NKO, Nilai Hukuman Disiplin, Nilai Dampak Pelanggaran Disiplin, dan Nilai Koreksi.",
      "Benar. Keempat unsur tersebut memperkuat perhitungan NKP dalam kebijakan baru.",
    ],
    [
      "NKO, Nilai Hukuman Disiplin, Nilai Dampak Pelanggaran Disiplin, dan Nilai Komitmen.",
      "Keliru. Komponen terakhir adalah Nilai Koreksi, bukan Nilai Komitmen.",
    ],
    [
      "NKO, Nilai Hukuman Disiplin, Nilai Pelanggaran Disiplin, dan Nilai Koreksi.",
      "Keliru. Unsur ketiga harus berupa Nilai Dampak Pelanggaran Disiplin.",
    ],
  ],
  10: [
    [
      "NKO 10% + hasil penghitungan 90%.",
      "Keliru. Formula 10:90 digunakan ketika hasil penghitungan pegawai lebih rendah daripada NKO.",
    ],
    [
      "NKO 30% + hasil penghitungan 70%.",
      "Keliru. Formula ini berlaku untuk pegawai dua tingkat atau lebih di bawah Pimpinan UPK dan JF non-substansi ketika hasilnya ≥ NKO.",
    ],
    [
      "NKO 50% + hasil penghitungan 50%, hanya untuk JF substansi.",
      "Keliru. Formula 50:50 juga berlaku bagi Pimpinan UPK dan pegawai satu tingkat di bawahnya, bukan hanya JF substansi.",
    ],
    [
      "NKO 50% + hasil penghitungan 50%.",
      "Benar. Untuk kelompok jabatan dalam soal dan kondisi hasil ≥ NKO, bobotnya 50:50.",
    ],
  ],
  11: [
    [
      "NKO 30% + hasil penghitungan 70%.",
      "Benar. Formula ini berlaku bagi pegawai dua tingkat atau lebih di bawah Pimpinan UPK serta JF non-substansi ketika hasil ≥ NKO.",
    ],
    [
      "NKO 50% + hasil penghitungan 50%.",
      "Keliru. Formula 50:50 diperuntukkan kelompok yang lebih dekat dengan Pimpinan UPK dan JF substansi.",
    ],
    [
      "NKO 10% + hasil penghitungan 90%.",
      "Keliru. Formula 10:90 digunakan ketika hasil penghitungan lebih rendah daripada NKO.",
    ],
    [
      "NKO 30% + hasil penghitungan 75%.",
      "Keliru. Bagian hasil penghitungan adalah 70%; opsi ini juga menghasilkan total bobot 105%.",
    ],
  ],
  12: [
    [
      "NKO 10% + hasil penghitungan 90%, jika hasil penghitungan sama dengan NKO.",
      "Keliru. Formula 10:90 dipicu ketika hasil penghitungan lebih rendah daripada NKO, bukan ketika sama.",
    ],
    [
      "NKO 30% + hasil penghitungan 70%.",
      "Keliru. Formula 30:70 digunakan pada kelompok tertentu ketika hasil penghitungan ≥ NKO.",
    ],
    [
      "NKO 10% + hasil penghitungan 90%.",
      "Benar. Ketika hasil penghitungan pegawai < NKO, bobot NKO diperkecil menjadi 10%.",
    ],
    [
      "NKO 15% + hasil penghitungan 85%.",
      "Keliru. Ketentuan menggunakan 10:90, bukan 15:85.",
    ],
  ],
  13: [
    [
      "Atasan langsung, rekan kerja, dan pengguna jasa eksternal yang relevan.",
      "Keliru. Instrumen 360° dalam konteks ini memasukkan anggota atau bawahan, bukan secara normatif pengguna jasa eksternal.",
    ],
    [
      "Atasan tidak langsung, rekan kerja, dan anggota/bawahan yang relevan.",
      "Keliru. Unsur atasannya adalah atasan langsung.",
    ],
    [
      "Atasan langsung, rekan kerja, dan/atau anggota/bawahan yang relevan.",
      "Benar. Kombinasi ini merepresentasikan penilaian perilaku dari berbagai arah hubungan kerja.",
    ],
    [
      "Atasan langsung, pengelola kinerja, dan/atau anggota/bawahan yang relevan.",
      "Keliru. Rekan kerja merupakan unsur penilai 360° yang hilang pada opsi ini.",
    ],
  ],
  14: [
    [
      "Kompeten.",
      "Keliru sebagai jawaban karena Kompeten termasuk nilai dasar ASN BerAKHLAK.",
    ],
    [
      "Kolaboratif.",
      "Keliru sebagai jawaban karena Kolaboratif termasuk nilai dasar ASN BerAKHLAK.",
    ],
    [
      "Kompetitif.",
      "Benar sebagai pilihan 'bukan'. Kompetitif tidak termasuk tujuh nilai BerAKHLAK maupun aspek Kepemimpinan.",
    ],
    [
      "Kepemimpinan.",
      "Keliru sebagai jawaban karena Kepemimpinan turut disebut sebagai aspek dalam instrumen perilaku.",
    ],
  ],
  15: [
    [
      "Satu bulan setelah SKP ditetapkan dan sebelum masa reviu K3 periode berakhir.",
      "Benar. Kedua batas tersebut harus dipenuhi secara kumulatif.",
    ],
    [
      "Satu bulan setelah SKP ditetapkan dan setelah masa reviu K3 periode berakhir.",
      "Keliru. Manual IKI harus tersedia sebelum, bukan setelah, masa reviu K3 berakhir.",
    ],
    [
      "Tiga bulan setelah SKP ditetapkan dan sebelum masa reviu K3 periode berakhir.",
      "Keliru. Batas waktunya satu bulan setelah SKP ditetapkan, bukan tiga bulan.",
    ],
    [
      "Satu bulan setelah PK ditetapkan dan sebelum masa reviu K3 periode berakhir.",
      "Keliru. Titik awalnya penetapan SKP, bukan penetapan PK.",
    ],
  ],
  16: [
    [
      "Dialog bersama atasan definitif dan ketua tim, dengan minimal satu IKU sesuai output penugasan.",
      "Keliru. Untuk pegawai, indikator minimal pada penugasan squad adalah IKI, bukan IKU.",
    ],
    [
      "Dialog bersama atasan definitif dan ketua tim, dengan minimal dua IKI sesuai output penugasan.",
      "Keliru. Batas minimumnya satu IKI, bukan dua.",
    ],
    [
      "Dialog bersama atasan definitif dan pemilik kinerja/ketua tim, dengan minimal satu IKI sesuai output/outcome penugasan.",
      "Benar. Tata kelola ini menjaga keterhubungan atasan definitif, ketua tim, dan hasil penugasan.",
    ],
    [
      "Dialog bersama pemilik kinerja/ketua tim tanpa atasan definitif, dengan minimal satu IKI sesuai output/outcome penugasan.",
      "Keliru. Atasan definitif tetap terlibat dalam dialog kinerja pegawai yang ditugaskan penuh waktu.",
    ],
  ],
  17: [
    [
      "Periodik mengevaluasi periode tertentu; tahunan mengevaluasi dan merekap satu tahun kinerja.",
      "Benar. Pembeda utamanya adalah cakupan waktu evaluasi.",
    ],
    [
      "Periodik merekap satu tahun kinerja; tahunan mengevaluasi periode tertentu.",
      "Keliru. Cakupan waktunya tertukar.",
    ],
    [
      "Periodik mengevaluasi periode tertentu; tahunan hanya menjumlahkan nilai perilaku satu tahun.",
      "Keliru. Evaluasi tahunan tidak hanya menilai perilaku, tetapi keseluruhan kinerja tahunan.",
    ],
    [
      "Periodik mengevaluasi periode tertentu; tahunan mengevaluasi tiga bulan terakhir.",
      "Keliru. Tahunan mencakup satu tahun kinerja, bukan hanya triwulan terakhir.",
    ],
  ],
  18: [
    [
      "Organisasi: NKP dan Predikat NKO; Pegawai: NKO dan Predikat Kinerja Pegawai.",
      "Keliru. Singkatan nilai organisasi dan nilai pegawai tertukar.",
    ],
    [
      "Organisasi: NKO dan Predikat NKO; Pegawai: NKP dan Predikat Kinerja Pegawai.",
      "Benar. NKO menjadi keluaran organisasi, sedangkan NKP menjadi keluaran pegawai.",
    ],
    [
      "Organisasi: NKO dan Predikat NKP; Pegawai: NKP dan Predikat Kinerja Organisasi.",
      "Keliru. Kedua predikat dipasangkan pada subjek yang salah.",
    ],
    [
      "Organisasi: NKO dan Predikat Kinerja Pegawai; Pegawai: NKP dan Predikat NKO.",
      "Keliru. Nilainya benar, tetapi predikat organisasi dan pegawai tertukar.",
    ],
  ],
  19: [
    [
      "PP Nomor 94 Tahun 2021.",
      "Benar. PP 94/2021 menggantikan PP 53/2010 sebagai regulasi disiplin PNS.",
    ],
    [
      "PP Nomor 79 Tahun 2021.",
      "Keliru. PP 79/2021 mengatur Upaya Administratif dan BPASN.",
    ],
    [
      "PP Nomor 53 Tahun 2021.",
      "Keliru. Nomor 53 adalah regulasi lama Tahun 2010, bukan PP Tahun 2021.",
    ],
    [
      "PP Nomor 94 Tahun 2010.",
      "Keliru. Kombinasi nomor dan tahun ini salah; regulasi pengganti ialah PP 94 Tahun 2021.",
    ],
  ],
  20: [
    [
      "Teguran lisan, teguran tertulis, atau pemotongan tunjangan kinerja 25% selama 6 bulan.",
      "Keliru. Pemotongan tunjangan kinerja 25% selama 6 bulan termasuk hukuman sedang.",
    ],
    [
      "Teguran lisan, pernyataan tidak puas secara lisan, atau pernyataan tidak puas secara tertulis.",
      "Keliru. Jenis yang benar mencakup teguran tertulis; tidak ada jenis pernyataan tidak puas secara lisan.",
    ],
    [
      "Teguran lisan, teguran tertulis, atau pernyataan tidak puas secara tertulis.",
      "Benar. Inilah tiga jenis hukuman disiplin ringan.",
    ],
    [
      "Teguran tertulis, pernyataan tidak puas secara tertulis, atau pemotongan tunjangan kinerja 25% selama 6 bulan.",
      "Keliru. Opsi mencampurkan dua hukuman ringan dengan satu hukuman sedang dan menghilangkan teguran lisan.",
    ],
  ],
  21: [
    [
      "Pemotongan tunjangan kinerja 25% selama 6, 9, atau 12 bulan.",
      "Benar. Tingkat hukuman sedang dibedakan menurut lama pemotongan 25%: 6, 9, atau 12 bulan.",
    ],
    [
      "Pemotongan tunjangan kinerja 20% selama 6, 9, atau 12 bulan.",
      "Keliru. Persentasenya 25%, bukan 20%.",
    ],
    [
      "Pemotongan tunjangan kinerja 25% selama 3, 6, atau 9 bulan.",
      "Keliru. Deret lamanya adalah 6, 9, dan 12 bulan.",
    ],
    [
      "Pemotongan tunjangan kinerja 25% selama 6, 8, atau 12 bulan.",
      "Keliru. Tingkat tengah berlangsung 9 bulan, bukan 8 bulan.",
    ],
  ],
  22: [
    [
      "Penurunan jabatan setingkat lebih rendah selama 12 bulan.",
      "Keliru sebagai jawaban 'bukan' karena ini merupakan hukuman disiplin berat.",
    ],
    [
      "Pembebasan dari jabatan menjadi jabatan pelaksana selama 12 bulan.",
      "Keliru sebagai jawaban 'bukan' karena ini merupakan hukuman disiplin berat.",
    ],
    [
      "Pemberhentian dengan hormat tidak atas permintaan sendiri sebagai PNS.",
      "Keliru sebagai jawaban 'bukan' karena ini merupakan hukuman disiplin berat.",
    ],
    [
      "Pemotongan tunjangan kinerja 25% selama 12 bulan.",
      "Benar sebagai pilihan 'bukan'. Hukuman ini termasuk tingkat sedang, bukan tingkat berat.",
    ],
  ],
  23: [
    [
      "Dapat diterima jika diberikan setelah layanan selesai dan nilainya di bawah batas pelaporan.",
      "Keliru. Keterkaitan hadiah dengan jabatan atau layanan tidak hilang hanya karena diberikan setelah layanan atau bernilai kecil.",
    ],
    [
      "Dapat diterima jika diberikan setelah layanan selesai, kemudian dicatat sebagai hadiah kedinasan.",
      "Keliru. Pencatatan internal tidak mengubah hadiah terkait jabatan menjadi penerimaan yang boleh diterima.",
    ],
    [
      "Harus ditolak dan ditangani sesuai ketentuan gratifikasi karena berkaitan dengan jabatan/pekerjaan.",
      "Benar. Titik penentunya ialah hubungan pemberian dengan jabatan atau pekerjaan pegawai.",
    ],
    [
      "Harus ditolak hanya jika diberikan sebelum layanan selesai; setelah layanan boleh diterima.",
      "Keliru. Waktu pemberian bukan pembeda utama; keterkaitannya dengan jabatan atau layanan yang menentukan.",
    ],
  ],
  24: [
    [
      "Pengenaan biaya yang tidak tercantum dalam standar layanan, sepanjang disetor sebagai PNBP.",
      "Keliru. Penyetoran tidak otomatis melegalkan biaya yang tidak memiliki dasar ketentuan.",
    ],
    [
      "Pengenaan biaya yang seharusnya tidak dikenakan atau penyalahgunaan wewenang untuk memperoleh uang/barang bagi diri atau pihak lain.",
      "Benar. Definisi mencakup pungutan tanpa dasar dan penyalahgunaan wewenang untuk keuntungan diri atau pihak lain.",
    ],
    [
      "Pengenaan biaya yang seharusnya dikenakan tetapi diterima melalui kanal pembayaran nonresmi.",
      "Keliru. Itu menggambarkan penyimpangan kanal pembayaran; definisi dalam soal lebih luas dan menekankan biaya yang tidak semestinya atau penyalahgunaan wewenang.",
    ],
    [
      "Pengenaan biaya yang seharusnya tidak dikenakan hanya jika uang diterima untuk diri sendiri.",
      "Keliru. Cakupannya juga meliputi perolehan bagi pihak lain dan dapat berupa uang maupun barang.",
    ],
  ],
  25: [
    [
      "Hadir dan melaksanakan tugas kedinasan di dalam kantor pada jam kerja.",
      "Keliru. Masuk Kerja tidak terbatas pada pelaksanaan tugas di dalam kantor.",
    ],
    [
      "Melaksanakan tugas kedinasan, baik di dalam maupun di luar kantor.",
      "Benar. Definisi Masuk Kerja berorientasi pada pelaksanaan tugas kedinasan di dalam atau luar kantor.",
    ],
    [
      "Melaksanakan tugas kedinasan di luar kantor hanya jika didahului pengisian daftar hadir elektronik.",
      "Keliru. Pengertian Masuk Kerja tidak digantungkan semata-mata pada satu mekanisme daftar hadir.",
    ],
    [
      "Hadir di dalam atau di luar kantor, meskipun tidak melaksanakan tugas kedinasan.",
      "Keliru. Unsur pelaksanaan tugas kedinasan tetap esensial.",
    ],
  ],
  26: [
    [
      "Menerbitkan panggilan kedua paling lambat tujuh hari kalender sejak tanggal seharusnya hadir pada panggilan pertama.",
      "Keliru. Satuan waktunya adalah hari kerja, bukan hari kalender.",
    ],
    [
      "Menerbitkan panggilan kedua paling cepat tujuh hari kerja sejak tanggal seharusnya hadir pada panggilan pertama.",
      "Keliru. Ketentuannya menggunakan batas paling lambat, bukan paling cepat.",
    ],
    [
      "Menerbitkan panggilan kedua paling lambat tujuh hari kerja sejak tanggal seharusnya hadir pada panggilan pertama.",
      "Benar. Pembeda kuncinya ialah paling lambat tujuh hari kerja yang dihitung dari tanggal seharusnya hadir.",
    ],
    [
      "Menerbitkan panggilan kedua paling lambat tujuh hari kerja sejak tanggal panggilan pertama diterbitkan.",
      "Keliru. Titik hitungnya adalah tanggal pegawai seharusnya hadir, bukan tanggal surat panggilan pertama diterbitkan.",
    ],
  ],
  27: [
    [
      "Pejabat berwenang dapat menjatuhkan hukuman berdasarkan alat bukti dan keterangan yang ada setelah panggilan pertama.",
      "Keliru. Kewenangan ini relevan setelah pegawai tidak memenuhi panggilan kedua tanpa alasan sah.",
    ],
    [
      "Pejabat berwenang dapat menjatuhkan hukuman berdasarkan alat bukti dan keterangan yang ada.",
      "Benar. Ketidakhadiran pada panggilan kedua tidak menghentikan proses pemeriksaan dan penjatuhan hukuman.",
    ],
    [
      "Pejabat berwenang wajib menjatuhkan hukuman terberat berdasarkan ketidakhadiran pada panggilan kedua.",
      "Keliru. Hukuman tetap didasarkan pada bukti dan pelanggaran, bukan otomatis hukuman terberat.",
    ],
    [
      "Pejabat berwenang dapat menjatuhkan hukuman hanya berdasarkan surat panggilan dan daftar hadir.",
      "Keliru. Dasarnya adalah alat bukti dan keterangan yang tersedia secara keseluruhan, bukan dibatasi dua dokumen tersebut.",
    ],
  ],
  28: [
    [
      "Pemeriksaan dilakukan terbuka dan hasilnya dituangkan dalam berita acara pemeriksaan.",
      "Keliru. Pemeriksaan dugaan pelanggaran disiplin dilakukan secara tertutup.",
    ],
    [
      "Pemeriksaan dilakukan tertutup dan hasilnya dituangkan dalam berita acara pemeriksaan.",
      "Benar. Sifat tertutup dan kewajiban berita acara merupakan dua unsur prosedural yang harus dipenuhi.",
    ],
    [
      "Pemeriksaan dilakukan tertutup dan hasilnya cukup dituangkan dalam catatan pemeriksaan.",
      "Keliru. Dokumen formalnya adalah berita acara pemeriksaan, bukan sekadar catatan pemeriksaan.",
    ],
    [
      "Pemeriksaan dilakukan tertutup dan hasilnya dituangkan dalam berita acara klarifikasi.",
      "Keliru. Istilah dokumen normatifnya adalah berita acara pemeriksaan.",
    ],
  ],
  29: [
    [
      "Tim dapat dibentuk untuk ancaman ringan dan wajib dibentuk untuk ancaman sedang.",
      "Keliru. Ambang opsional dimulai pada ancaman sedang dan ambang wajib pada ancaman berat.",
    ],
    [
      "Tim wajib dibentuk untuk ancaman sedang dan dapat dibentuk untuk ancaman berat.",
      "Keliru. Status dapat dan wajib tertukar.",
    ],
    [
      "Tim dapat dibentuk untuk ancaman sedang dan wajib dibentuk untuk ancaman berat.",
      "Benar. Kata pembeda penentunya adalah dapat untuk sedang dan wajib untuk berat.",
    ],
    [
      "Tim dapat dibentuk untuk ancaman sedang dan berat tanpa kewajiban pada salah satunya.",
      "Keliru. Untuk ancaman hukuman berat, pembentukan tim bersifat wajib.",
    ],
  ],
  30: [
    [
      "Teguran lisan.",
      "Benar. Ketidakhadiran kumulatif tiga hari kerja tanpa alasan sah dikenai teguran lisan.",
    ],
    [
      "Teguran tertulis.",
      "Keliru. Teguran tertulis berlaku pada ambang ketidakhadiran yang lebih tinggi daripada tiga hari.",
    ],
    [
      "Pernyataan tidak puas secara tertulis.",
      "Keliru. Hukuman ringan ini berada pada ambang kumulatif berikutnya, bukan tiga hari.",
    ],
    [
      "Pemotongan tunjangan kinerja 25% selama 6 bulan.",
      "Keliru. Ini hukuman sedang dan tidak sesuai dengan ambang tiga hari.",
    ],
  ],
  31: [
    [
      "Pembebasan dari jabatan menjadi jabatan pelaksana selama 12 bulan.",
      "Keliru. Untuk tidak masuk kerja sepuluh hari berturut-turut, konsekuensi khususnya adalah pemberhentian.",
    ],
    [
      "Pemberhentian dengan hormat tidak atas permintaan sendiri sebagai PNS.",
      "Benar. Sepuluh hari kerja berturut-turut tanpa alasan sah menjadi ambang pemberhentian tersebut.",
    ],
    [
      "Pemberhentian tidak dengan hormat sebagai PNS.",
      "Keliru. Rumusan jenis hukuman dalam PP 94/2021 adalah pemberhentian dengan hormat tidak atas permintaan sendiri.",
    ],
    [
      "Penurunan jabatan setingkat lebih rendah selama 12 bulan.",
      "Keliru. Opsi ini merupakan hukuman berat lain, tetapi bukan konsekuensi khusus untuk ambang sepuluh hari berturut-turut.",
    ],
  ],
  32: [
    [
      "Pemberhentian dengan hormat atas permintaan sendiri sebagai PNS.",
      "Keliru. Hukuman bukan pemberhentian atas permintaan pegawai.",
    ],
    [
      "Pemberhentian tidak dengan hormat sebagai PNS.",
      "Keliru. Rumusan yang digunakan ialah dengan hormat tidak atas permintaan sendiri.",
    ],
    [
      "Pemberhentian dengan hormat tidak atas permintaan sendiri sebagai PNS.",
      "Benar. Ketidakhadiran kumulatif 28 hari kerja atau lebih dalam satu tahun mencapai ambang pemberhentian ini.",
    ],
    [
      "Pembebasan dari jabatan menjadi jabatan pelaksana selama 12 bulan.",
      "Keliru. Pada ambang 28 hari atau lebih, konsekuensinya telah mencapai pemberhentian.",
    ],
  ],
  33: [
    [
      "PP 79/2021 — Upaya Administratif dan Badan Pertimbangan ASN.",
      "Benar. PP 79/2021 mengatur Upaya Administratif dan Badan Pertimbangan ASN.",
    ],
    [
      "PP 79/2021 — Disiplin PNS dan Badan Pertimbangan ASN.",
      "Keliru. Disiplin PNS diatur PP 94/2021; PP 79/2021 berfokus pada Upaya Administratif dan BPASN.",
    ],
    [
      "PP 94/2021 — Upaya Administratif dan Badan Pertimbangan ASN.",
      "Keliru. Nomor regulasinya tertukar; pokok tersebut diatur PP 79/2021.",
    ],
    [
      "PP 79/2021 — Upaya Administratif dan Badan Pertimbangan PNS.",
      "Keliru. Nama badan yang tepat adalah Badan Pertimbangan ASN, bukan Badan Pertimbangan PNS.",
    ],
  ],
  34: [
    [
      "Diumumkan secara berkala, diumumkan secara serta merta, dan tersedia setiap saat.",
      "Benar. Ketiga frasa ini merupakan kategori informasi yang wajib dibuka.",
    ],
    [
      "Diumumkan secara berkala, diumumkan secara serta-merta, dan tersedia setiap waktu.",
      "Keliru. Istilah normatif kategori ketiga adalah tersedia setiap saat, bukan setiap waktu.",
    ],
    [
      "Diumumkan secara berkala, diumumkan secara seketika, dan tersedia setiap saat.",
      "Keliru. Istilah normatif kategori kedua adalah serta merta, bukan seketika.",
    ],
    [
      "Diumumkan secara periodik, diumumkan secara serta merta, dan tersedia setiap saat.",
      "Keliru. Istilah kategori pertama dalam ketentuan adalah berkala, bukan periodik.",
    ],
  ],
  35: [
    [
      "Paling sedikit tiga bulan sekali.",
      "Keliru. Ketentuan minimum pengumuman berkala adalah enam bulan sekali.",
    ],
    [
      "Paling banyak enam bulan sekali.",
      "Keliru. Rumusannya paling sedikit, bukan paling banyak.",
    ],
    [
      "Paling sedikit enam bulan sekali.",
      "Benar. Informasi berkala diumumkan sekurang-kurangnya setiap enam bulan.",
    ],
    [
      "Paling sedikit satu tahun sekali.",
      "Keliru. Satu tahun lebih jarang daripada frekuensi minimum yang diwajibkan.",
    ],
  ],
  36: [
    [
      "Diumumkan secara berkala dengan cara yang mudah dijangkau dan dipahami.",
      "Keliru. Informasi yang mengancam hajat hidup orang banyak masuk kategori serta merta, bukan berkala.",
    ],
    [
      "Diumumkan secara serta merta dengan cara yang mudah dijangkau dan dipahami.",
      "Benar. Urgensi ancaman mengharuskan pengumuman tanpa menunggu permohonan.",
    ],
    [
      "Diumumkan secara serta merta dengan cara yang mudah dijangkau setelah permohonan diterima.",
      "Keliru. Pengumuman serta merta tidak bergantung pada adanya permohonan.",
    ],
    [
      "Disediakan setiap saat dengan cara yang mudah dijangkau dan dipahami.",
      "Keliru. Kategori yang tepat adalah serta merta, bukan tersedia setiap saat.",
    ],
  ],
  37: [
    [
      "Daftar Informasi Publik, keputusan beserta pertimbangan, dan kebijakan berikut dokumen pendukung.",
      "Benar. Ketiga contoh tersebut termasuk informasi yang wajib tersedia setiap saat.",
    ],
    [
      "Daftar Informasi Publik, keputusan tanpa pertimbangan, dan kebijakan berikut dokumen pendukung.",
      "Keliru. Keputusan yang tersedia harus disertai pertimbangannya.",
    ],
    [
      "Daftar Informasi Publik, keputusan beserta pertimbangan, dan kebijakan tanpa dokumen pendukung.",
      "Keliru. Dokumen pendukung kebijakan juga termasuk yang harus tersedia.",
    ],
    [
      "Daftar Informasi Publik, keputusan beserta pertimbangan, dan rancangan kebijakan tanpa dokumen pendukung.",
      "Keliru. Opsi mengubah kebijakan beserta pendukungnya menjadi rancangan tanpa pendukung.",
    ],
  ],
  38: [
    [
      "10 hari kalender sejak permintaan diterima.",
      "Keliru. Satuan waktunya adalah hari kerja.",
    ],
    [
      "7 hari kerja sejak permintaan diterima.",
      "Keliru. Tujuh hari kerja adalah batas perpanjangan, bukan batas awal.",
    ],
    [
      "10 hari kerja sejak permintaan diterima.",
      "Benar. Badan Publik menyampaikan pemberitahuan tertulis paling lambat sepuluh hari kerja.",
    ],
    [
      "10 hari kerja sejak permintaan diregistrasi lengkap.",
      "Keliru. Rumusan umum menghitung sejak permintaan diterima, bukan sejak dinilai lengkap.",
    ],
  ],
  39: [
    [
      "Paling lama 7 hari kerja berikutnya disertai alasan tertulis.",
      "Benar. Perpanjangan harus dibatasi tujuh hari kerja dan diberi alasan tertulis.",
    ],
    [
      "Paling lama 7 hari kalender berikutnya disertai alasan tertulis.",
      "Keliru. Satuan waktunya hari kerja, bukan hari kalender.",
    ],
    [
      "Paling lama 10 hari kerja berikutnya disertai alasan tertulis.",
      "Keliru. Batas tambahan waktunya tujuh hari kerja.",
    ],
    [
      "Paling lama 7 hari kerja berikutnya tanpa kewajiban alasan tertulis.",
      "Keliru. Perpanjangan wajib disertai alasan tertulis.",
    ],
  ],
  40: [
    [
      "Pemohon 30 hari kalender; Atasan PPID menjawab 30 hari kerja.",
      "Keliru. Batas pengajuan keberatan oleh pemohon juga menggunakan hari kerja.",
    ],
    [
      "Pemohon paling lambat 30 hari kerja sejak alasan ditemukan; Atasan PPID menjawab paling lambat 30 hari kerja.",
      "Benar. Kedua tahap memiliki batas 30 hari kerja, dengan titik awal masing-masing.",
    ],
    [
      "Pemohon paling lambat 30 hari kerja sejak alasan ditemukan; Atasan PPID menjawab paling lambat 10 hari kerja.",
      "Keliru. Atasan PPID memiliki waktu paling lama 30 hari kerja.",
    ],
    [
      "Pemohon paling lambat 14 hari kerja sejak alasan ditemukan; Atasan PPID menjawab paling lambat 30 hari kerja.",
      "Keliru. Batas pemohon ialah 30 hari kerja; angka 14 terkait pengajuan sengketa ke Komisi Informasi.",
    ],
  ],
  41: [
    [
      "14 hari kerja sejak tanggapan Atasan PPID diterima atau batas waktu tanggapan berakhir.",
      "Benar. Dua kemungkinan titik awal tersebut sama-sama menggunakan jangka 14 hari kerja.",
    ],
    [
      "14 hari kalender sejak tanggapan Atasan PPID diterima atau batas waktu tanggapan berakhir.",
      "Keliru. Satuan waktunya adalah hari kerja.",
    ],
    [
      "30 hari kerja sejak tanggapan Atasan PPID diterima atau batas waktu tanggapan berakhir.",
      "Keliru. Batas ke Komisi Informasi adalah 14 hari kerja, bukan 30.",
    ],
    [
      "14 hari kerja sejak permintaan informasi pertama kali diterima PPID.",
      "Keliru. Titik awalnya berkaitan dengan tanggapan Atasan PPID atau berakhirnya batas tanggapan.",
    ],
  ],
  42: [
    [
      "PPID Pelaksana Tingkat I, Tingkat II, dan Tingkat III.",
      "Benar. Lingkungan Kementerian Keuangan mengenal tiga tingkat PPID Pelaksana.",
    ],
    [
      "PPID Utama Tingkat I, Tingkat II, dan Tingkat III.",
      "Keliru. Istilahnya PPID Pelaksana, bukan PPID Utama.",
    ],
    [
      "PPID Pelaksana Tingkat I, Tingkat II, dan Tingkat IV.",
      "Keliru. Tingkat tertingginya dalam susunan ini adalah Tingkat III, bukan IV.",
    ],
    [
      "PPID Pelaksana Tingkat I, Tingkat III, dan Tingkat IV.",
      "Keliru. Opsi menghilangkan Tingkat II dan menambahkan Tingkat IV.",
    ],
  ],
  43: [
    [
      "Unit eselon I/unit pimpinan tinggi madya dan unit non-eselon yang langsung bertanggung jawab kepada Menteri.",
      "Benar. Inilah cakupan utama PPID Tingkat I.",
    ],
    [
      "Unit eselon I/unit pimpinan tinggi pratama dan unit non-eselon yang langsung bertanggung jawab kepada Menteri.",
      "Keliru. Tingkat jabatan yang tepat adalah pimpinan tinggi madya, bukan pratama.",
    ],
    [
      "Unit eselon II/unit pimpinan tinggi madya dan unit non-eselon yang langsung bertanggung jawab kepada Menteri.",
      "Keliru. Cakupannya unit eselon I, bukan eselon II.",
    ],
    [
      "Unit eselon I/unit pimpinan tinggi madya dan unit non-eselon yang langsung bertanggung jawab kepada Sekretaris Jenderal.",
      "Keliru. Rumusan cakupannya langsung bertanggung jawab kepada Menteri.",
    ],
  ],
  44: [
    [
      "Kantor wilayah dan kantor pelayanan yang dipimpin pejabat pimpinan tinggi pratama.",
      "Benar. PPID Tingkat II berada pada Kanwil dan kantor pelayanan yang dipimpin JPT Pratama.",
    ],
    [
      "Kantor wilayah dan kantor pelayanan yang dipimpin pejabat administrator.",
      "Keliru. Kantor pelayanan yang dipimpin administrator masuk cakupan Tingkat III.",
    ],
    [
      "Kantor wilayah yang dipimpin pejabat pimpinan tinggi madya dan kantor pelayanan yang dipimpin pejabat pimpinan tinggi pratama.",
      "Keliru. Pimpinan Kanwil pada cakupan ini adalah JPT Pratama, bukan JPT Madya.",
    ],
    [
      "Kantor wilayah dan unit pelaksana teknis yang dipimpin pejabat pimpinan tinggi pratama.",
      "Keliru. Rumusan cakupan menyebut kantor wilayah dan kantor pelayanan; UPT beradministrator masuk Tingkat III.",
    ],
  ],
  45: [
    [
      "Kantor pelayanan dan/atau UPT yang dipimpin pejabat pimpinan tinggi pratama.",
      "Keliru. Tingkat pimpinan untuk PPID Tingkat III adalah pejabat administrator.",
    ],
    [
      "Kantor wilayah dan/atau UPT yang dipimpin pejabat administrator.",
      "Keliru. Cakupan menyebut kantor pelayanan dan/atau UPT, bukan kantor wilayah.",
    ],
    [
      "Kantor pelayanan dan/atau UPT yang dipimpin pejabat administrator.",
      "Benar. Pembeda penentunya ialah jenis unit dan tingkat pejabat pemimpinnya.",
    ],
    [
      "Kantor pelayanan dan/atau UPT yang dipimpin pejabat pengawas.",
      "Keliru. Tingkat pejabatnya administrator, bukan pengawas.",
    ],
  ],
  46: [
    [
      "Membantu pengisian formulir dan mengganti verifikasi identitas dengan pernyataan lisan pemohon.",
      "Keliru. Akomodasi tidak menghapus persyaratan verifikasi identitas.",
    ],
    [
      "Membantu pengisian formulir tanpa mengurangi hak dan verifikasi identitas pemohon.",
      "Benar. Bantuan merupakan akomodasi layanan, sedangkan verifikasi identitas tetap dijalankan.",
    ],
    [
      "Membantu pengisian formulir hanya setelah identitas pemohon diwakilkan kepada pendamping.",
      "Keliru. Penyandang disabilitas tidak wajib mengalihkan kedudukannya kepada pendamping.",
    ],
    [
      "Membantu verifikasi identitas, tetapi formulir wajib tetap diisi sendiri oleh pemohon.",
      "Keliru. Petugas justru dapat membantu pengisian formulir saat pemohon mengalami kesulitan.",
    ],
  ],
  47: [
    [
      "3 hari kerja sejak surat ketidaklengkapan diterima.",
      "Benar. Kekurangan persyaratan harus dilengkapi dalam tiga hari kerja sejak surat diterima.",
    ],
    [
      "3 hari kalender sejak surat ketidaklengkapan diterima.",
      "Keliru. Satuan waktunya hari kerja.",
    ],
    [
      "3 hari kerja sejak surat ketidaklengkapan diterbitkan.",
      "Keliru. Titik awalnya saat surat diterima, bukan saat diterbitkan.",
    ],
    [
      "7 hari kerja sejak surat ketidaklengkapan diterima.",
      "Keliru. Batas pelengkapan adalah tiga hari kerja, bukan tujuh.",
    ],
  ],
  48: [
    [
      "SPLIT untuk layanan/basis pengetahuan kepabeanan-cukai; SIPPID untuk pelayanan dan dokumentasi Informasi Publik.",
      "Benar. SPLIT menangani informasi teknis kepabeanan-cukai, sedangkan SIPPID menangani layanan KIP.",
    ],
    [
      "SPLIT untuk pelayanan dan dokumentasi Informasi Publik; SIPPID untuk layanan/basis pengetahuan kepabeanan-cukai.",
      "Keliru. Fungsi kedua aplikasi tertukar.",
    ],
    [
      "SPLIT untuk layanan/basis pengetahuan kepabeanan-cukai; SIPPID untuk komunikasi internal pegawai.",
      "Keliru. SIPPID digunakan untuk pelayanan dan dokumentasi Informasi Publik, bukan komunikasi internal.",
    ],
    [
      "SPLIT untuk basis pengetahuan Informasi Publik; SIPPID untuk pelayanan informasi kepabeanan-cukai.",
      "Keliru. Objek layanan kedua aplikasi dipasangkan secara terbalik.",
    ],
  ],
  49: [
    [
      "Pemberitahuan lisan disertai keputusan klasifikasi informasi.",
      "Keliru. Penolakan harus disampaikan melalui pemberitahuan tertulis.",
    ],
    [
      "Pemberitahuan tertulis disertai daftar informasi yang dikecualikan.",
      "Keliru. Dokumen pendukungnya adalah keputusan klasifikasi dan/atau lembar Pengujian Konsekuensi, bukan sekadar daftar.",
    ],
    [
      "Pemberitahuan tertulis disertai keputusan klasifikasi dan/atau lembar Pengujian Konsekuensi.",
      "Benar. Penolakan harus transparan mengenai dasar pengecualiannya.",
    ],
    [
      "Pemberitahuan tertulis disertai keputusan klasifikasi tanpa kemungkinan lembar Pengujian Konsekuensi.",
      "Keliru. Ketentuan juga mengenal penyertaan lembar Pengujian Konsekuensi sesuai dasar pengecualian.",
    ],
  ],
  50: [
    [
      "Kondisi kesehatan, aset, pendapatan, dan daftar jabatan seseorang.",
      "Keliru. Daftar jabatan tidak identik dengan rahasia pribadi; opsi yang tepat memuat rekening bank.",
    ],
    [
      "Kondisi kesehatan, aset, pendapatan, dan rekening bank seseorang.",
      "Benar. Keempatnya merupakan informasi pribadi yang tidak otomatis dapat dibuka.",
    ],
    [
      "Kondisi kesehatan, daftar kebijakan, pendapatan, dan rekening bank seseorang.",
      "Keliru. Daftar kebijakan badan publik bukan rahasia pribadi seseorang.",
    ],
    [
      "Kondisi kesehatan, aset, laporan keuangan badan publik, dan rekening bank seseorang.",
      "Keliru. Laporan keuangan badan publik yang wajib diumumkan tidak menjadi rahasia pribadi.",
    ],
  ],
  51: [
    [
      "Pemberian Informasi melalui Media Massa, Edukasi Publik, dan Layanan Informasi.",
      "Benar. Ketiga ranah tersebut membentuk ruang lingkup SE-15/BC/2025.",
    ],
    [
      "Pemberian Informasi melalui Media Massa, Edukasi Internal, dan Layanan Informasi.",
      "Keliru. Istilahnya Edukasi Publik; komunikasi internal diatur tersendiri.",
    ],
    [
      "Pemberian Informasi melalui Media Sosial, Edukasi Publik, dan Layanan Informasi.",
      "Keliru. Ruang lingkupnya Media Massa, yang mencakup tetapi tidak terbatas pada media sosial.",
    ],
    [
      "Pemberian Informasi melalui Media Massa, Edukasi Publik, dan Layanan Komunikasi.",
      "Keliru. Komponen ketiganya bernama Layanan Informasi, bukan Layanan Komunikasi.",
    ],
  ],
  52: [
    [
      "Media cetak, elektronik, online, dan/atau media sosial.",
      "Benar. Keempat bentuk tersebut masuk pengertian Media Massa dalam pedoman.",
    ],
    [
      "Media cetak, elektronik, offline, dan/atau media sosial.",
      "Keliru. Istilah yang digunakan adalah media online, bukan offline.",
    ],
    [
      "Media cetak, elektronik, online, dan/atau media internal.",
      "Keliru. Komponen terakhirnya media sosial, bukan media internal.",
    ],
    [
      "Media cetak, digital, online, dan/atau media sosial.",
      "Keliru. Kategori normatifnya media elektronik; penggantian dengan digital mengubah rumusan.",
    ],
  ],
  53: [
    [
      "Tingkat I: pimpinan Unit Eselon I; Tingkat II: pimpinan KPPBC/BLBC/PSO; Tingkat III: pimpinan Kanwil/KPU.",
      "Keliru. Tingkat II dan Tingkat III tertukar.",
    ],
    [
      "Tingkat I: pimpinan Unit Eselon I/pejabat yang ditunjuk; Tingkat II: pimpinan Kanwil/KPU atau pejabat yang ditunjuk; Tingkat III: pimpinan KPPBC/BLBC/PSO atau pejabat yang ditunjuk.",
      "Benar. Jenjang juru bicara mengikuti tiga tingkat organisasi tersebut.",
    ],
    [
      "Tingkat I: pimpinan Unit Eselon I/pejabat yang ditunjuk; Tingkat II: pimpinan Kanwil/KPPBC; Tingkat III: pimpinan KPU/BLBC/PSO.",
      "Keliru. KPPBC berada pada Tingkat III, sedangkan KPU berada pada Tingkat II.",
    ],
    [
      "Tingkat I: pimpinan Unit Eselon I; Tingkat II: pimpinan Kanwil/KPU; Tingkat III: seluruh pimpinan dan pelaksana KPPBC/BLBC/PSO.",
      "Keliru. Pelaksana tidak otomatis menjadi juru bicara; kewenangan berada pada pimpinan atau pejabat yang ditunjuk.",
    ],
  ],
  54: [
    [
      "Perencanaan, pelaksanaan, dan evaluasi.",
      "Benar. Komunikasi internal dikelola melalui tiga tahap tersebut.",
    ],
    [
      "Perencanaan, penerapan, dan evaluasi.",
      "Keliru. Istilah tahap kedua adalah pelaksanaan, bukan penerapan.",
    ],
    [
      "Perencanaan, pelaksanaan, dan validasi.",
      "Keliru. Tahap ketiganya evaluasi, bukan validasi.",
    ],
    [
      "Perencanaan, pemantauan, dan evaluasi.",
      "Keliru. Pemantauan dapat menjadi bagian proses, tetapi siklus utamanya menyebut pelaksanaan.",
    ],
  ],
  55: [
    [
      "Menjamin informasi konsisten, aktual, tepat sasaran, dan memperkuat pusat koordinasi.",
      "Keliru. Pedoman menekankan informasi yang akurat, bukan sekadar aktual.",
    ],
    [
      "Menjamin informasi konsisten, akurat, tepat sasaran, dan memperkuat pusat koordinasi.",
      "Benar. Empat unsur tersebut mencegah perbedaan pesan antarunit.",
    ],
    [
      "Menjamin informasi konsisten, akurat, tepat saluran, dan memperkuat pusat koordinasi.",
      "Keliru. Rumusannya tepat sasaran; ketepatan saluran saja tidak menjamin sasaran pesan.",
    ],
    [
      "Menjamin informasi konsisten, akurat, tepat sasaran, dan memperkuat pusat komunikasi.",
      "Keliru. Unsur yang ditekankan adalah pusat koordinasi, bukan sekadar pusat komunikasi.",
    ],
  ],
  56: [
    [
      "Pegawai secara bertanggung jawab menguatkan pesan dan reputasi organisasi sesuai pedoman.",
      "Benar. Employee advocacy tetap terikat tanggung jawab dan pedoman komunikasi organisasi.",
    ],
    [
      "Pegawai secara sukarela menguatkan seluruh pesan organisasi tanpa memerlukan pedoman.",
      "Keliru. Advokasi pegawai tidak menghapus kewajiban mengikuti pedoman.",
    ],
    [
      "Pegawai yang ditunjuk menggantikan kewenangan juru bicara untuk menguatkan reputasi organisasi.",
      "Keliru. Employee advocacy tidak memindahkan kewenangan resmi juru bicara.",
    ],
    [
      "Pegawai secara bertanggung jawab menguatkan pesan pribadi yang mendukung reputasi organisasi.",
      "Keliru. Yang dikuatkan adalah pesan organisasi, bukan pesan pribadi.",
    ],
  ],
  57: [
    [
      "Internal primer, internal sekunder, eksternal primer, dan eksternal sekunder.",
      "Benar. Target komunikasi dibagi menurut dimensi internal-eksternal dan primer-sekunder.",
    ],
    [
      "Internal primer, internal sekunder, eksternal utama, dan eksternal sekunder.",
      "Keliru. Istilah pasangannya adalah eksternal primer, bukan eksternal utama.",
    ],
    [
      "Internal primer, internal tersier, eksternal primer, dan eksternal sekunder.",
      "Keliru. Kategori internal kedua adalah sekunder, bukan tersier.",
    ],
    [
      "Internal utama, internal sekunder, eksternal primer, dan eksternal sekunder.",
      "Keliru. Istilah kategori pertama adalah internal primer.",
    ],
  ],
  58: [
    [
      "Informasi satu suara, aktual, konsisten, cepat, transparan, dan berbasis data.",
      "Keliru. Prinsipnya akurat, bukan sekadar aktual.",
    ],
    [
      "Informasi satu suara, akurat, konsisten, cepat, transparan, dan berbasis data.",
      "Benar. Unsur-unsur ini menjaga kredibilitas komunikasi pada situasi krisis.",
    ],
    [
      "Informasi satu sumber, akurat, konsisten, cepat, transparan, dan berbasis data.",
      "Keliru. Prinsip yang digunakan adalah satu suara; sumber data dapat beragam tetapi harus tervalidasi.",
    ],
    [
      "Informasi satu suara, akurat, konsisten, tepat, transparan, dan berbasis data.",
      "Keliru. Dalam krisis, unsur kecepatan secara eksplisit penting; opsi menggantinya dengan tepat.",
    ],
  ],
  59: [
    [
      "Peraturan pada portal INSW.",
      "Keliru sebagai jawaban 'kecuali' karena portal INSW merupakan salah satu sumber jawaban tervalidasi.",
    ],
    [
      "Basis pengetahuan bea dan cukai serta data tervalidasi pada SKP.",
      "Keliru sebagai jawaban 'kecuali' karena keduanya termasuk sumber yang dapat digunakan.",
    ],
    [
      "Standar pelayanan ICECSC.",
      "Keliru sebagai jawaban 'kecuali' karena standar pelayanan tersebut menjadi rujukan layanan.",
    ],
    [
      "Interpretasi pribadi atas peraturan yang belum divalidasi.",
      "Benar sebagai pilihan 'kecuali'. Pendapat atau interpretasi yang belum divalidasi tidak boleh dijadikan sumber jawaban resmi.",
    ],
  ],
  60: [
    [
      "Merekam permohonan informasi kepabeanan-cukai dan memvalidasi jawaban oleh pejabat yang menangani layanan.",
      "Benar. SPLIT mendukung pencatatan permohonan sekaligus validasi jawaban teknis.",
    ],
    [
      "Merekam permohonan Informasi Publik dan memvalidasi jawaban oleh PPID.",
      "Keliru. Layanan Informasi Publik dan PPID menggunakan SIPPID, bukan SPLIT.",
    ],
    [
      "Merekam permohonan informasi kepabeanan-cukai tanpa proses validasi jawaban.",
      "Keliru. Validasi oleh pejabat yang menangani layanan merupakan bagian penting penggunaan SPLIT.",
    ],
    [
      "Merekam pengaduan kepabeanan-cukai dan memvalidasi keputusan keberatan.",
      "Keliru. Objek utamanya permohonan informasi dan jawaban layanan, bukan keputusan keberatan.",
    ],
  ],
  61: [
    [
      "Acara, pameran, atau kegiatan sejenis terkait keuangan negara serta tugas dan fungsi DJBC.",
      "Benar. Bentuk kegiatan dan substansi tersebut sesuai pengertian Edukasi Publik.",
    ],
    [
      "Acara, pameran, atau kegiatan sejenis terkait kepegawaian internal serta tugas dan fungsi DJBC.",
      "Keliru. Edukasi Publik berorientasi kepada publik dan terkait keuangan negara/tugas fungsi DJBC, bukan kepegawaian internal.",
    ],
    [
      "Acara, publikasi, atau kegiatan sejenis terkait keuangan negara serta tugas dan fungsi DJBC.",
      "Keliru. Contoh normatifnya menyebut pameran; publikasi lebih dekat pada pemberian informasi melalui media.",
    ],
    [
      "Acara, pameran, atau kegiatan sejenis terkait keuangan daerah serta tugas dan fungsi DJBC.",
      "Keliru. Substansi yang disebut adalah keuangan negara, bukan dibatasi keuangan daerah.",
    ],
  ],
  62: [
    [
      "Meneruskan permintaan kepada Juru Bicara setelah memberi jawaban sementara dari sumber yang dianggap benar.",
      "Keliru. Pelaksana tidak seharusnya memberi pernyataan sementara atas kebijakan sensitif sebelum kewenangan dan pesan terkoordinasi.",
    ],
    [
      "Mengarahkan wartawan kepada Juru Bicara yang berwenang dan meneruskan permintaan melalui kanal koordinasi.",
      "Benar. Tindakan ini menjaga otorisasi, akurasi, dan konsistensi pesan.",
    ],
    [
      "Mengarahkan wartawan kepada pejabat layanan informasi dan meneruskan permintaan melalui SPLIT.",
      "Keliru. Permintaan pernyataan media sensitif harus diarahkan kepada Juru Bicara, bukan diperlakukan sebagai layanan informasi teknis biasa.",
    ],
    [
      "Mengarahkan wartawan kepada Juru Bicara setelah mengonfirmasi bahwa dokumen internal boleh dibagikan.",
      "Keliru. Pelaksana tidak perlu dan tidak berwenang mendahului juru bicara dengan proses pembagian dokumen internal.",
    ],
  ],
  63: [
    [
      "Kesesuaian pelaksanaan tugas unit serta perilaku, ucapan, dan tindakan pegawai terhadap ketentuan.",
      "Benar. Definisi mencakup dimensi pelaksanaan tugas unit dan dimensi perilaku pegawai.",
    ],
    [
      "Kesesuaian pelaksanaan tugas pegawai serta perilaku, ucapan, dan tindakan unit terhadap ketentuan.",
      "Keliru. Subjek kedua unsur tertukar: tugas melekat pada unit, sedangkan perilaku/ucapan/tindakan melekat pada pegawai.",
    ],
    [
      "Kesesuaian pelaksanaan tugas unit serta perilaku, ucapan, dan keputusan pegawai terhadap ketentuan.",
      "Keliru. Rumusan materi menyebut tindakan pegawai, bukan keputusan pegawai.",
    ],
    [
      "Kesesuaian pelaksanaan fungsi unit serta perilaku, ucapan, dan tindakan pegawai terhadap kebijakan.",
      "Keliru. Definisi mengacu pada tugas unit dan kesesuaian terhadap ketentuan.",
    ],
  ],
  64: [
    [
      "Mendampingi pimpinan unit dalam pengendalian tugas dan menggantikan penegakan ketentuan perilaku pegawai.",
      "Keliru. UKI mendukung, bukan menggantikan, tanggung jawab pimpinan dalam penegakan ketentuan.",
    ],
    [
      "Mendukung pimpinan unit dalam pengendalian pelaksanaan tugas dan penegakan ketentuan perilaku pegawai.",
      "Benar. UKI merupakan fungsi dukungan pengendalian bagi pimpinan unit.",
    ],
    [
      "Mendukung pengelola kinerja dalam pengendalian pelaksanaan tugas dan penegakan ketentuan perilaku pegawai.",
      "Keliru. Peran utamanya mendukung pimpinan unit, bukan hanya pengelola kinerja.",
    ],
    [
      "Mendukung pimpinan unit dalam pengendalian perilaku dan penegakan ketentuan pelaksanaan tugas pegawai.",
      "Keliru. Rumusan cakupannya pengendalian pelaksanaan tugas unit dan penegakan ketentuan perilaku pegawai.",
    ],
  ],
  65: [
    [
      "Pencegahan, Pengawasan, Penjaminan Kualitas, dan Pengelolaan Kinerja.",
      "Benar. Keempatnya merupakan portofolio fungsi Kepatuhan Internal.",
    ],
    [
      "Pencegahan, Pengendalian, Penjaminan Kualitas, dan Pengelolaan Kinerja.",
      "Keliru. Fungsi kedua bernama Pengawasan, bukan Pengendalian.",
    ],
    [
      "Pencegahan, Pengawasan, Penjaminan Kepatuhan, dan Pengelolaan Kinerja.",
      "Keliru. Fungsi ketiga bernama Penjaminan Kualitas.",
    ],
    [
      "Pencegahan, Pengawasan, Penjaminan Kualitas, dan Penilaian Kinerja.",
      "Keliru. Fungsi keempat bernama Pengelolaan Kinerja, bukan Penilaian Kinerja.",
    ],
  ],
  66: [
    [
      "Pengendalian gratifikasi dan pemantauan pelaporan harta kekayaan/perpajakan pegawai.",
      "Benar. Kegiatan ini mencegah pelanggaran sebelum terjadi atau berkembang.",
    ],
    [
      "Evaluasi RCM dan pemantauan penerapan sistem pengendalian intern.",
      "Keliru. Kegiatan ini berada pada fungsi Penjaminan Kualitas.",
    ],
    [
      "PKPT, investigasi internal, pemeriksaan mendadak, dan surveillance.",
      "Keliru. Rangkaian ini merupakan fungsi Pengawasan.",
    ],
    [
      "Perhitungan NKO berdasarkan K3 dan penetapan predikat organisasi.",
      "Keliru. Kegiatan tersebut masuk ranah Pengelolaan Kinerja.",
    ],
  ],
  67: [
    [
      "Pencegahan.",
      "Keliru. Pencegahan mencakup antara lain pengendalian gratifikasi dan kepatuhan pelaporan pegawai.",
    ],
    [
      "Pengawasan.",
      "Benar. PKPT, investigasi internal, pemeriksaan mendadak, dan surveillance merupakan instrumen pengawasan.",
    ],
    [
      "Penjaminan Kualitas.",
      "Keliru. Penjaminan Kualitas berfokus antara lain pada RCM, SPI, dan reviu manajemen risiko.",
    ],
    [
      "Pengelolaan Kinerja.",
      "Keliru. Pengelolaan Kinerja berhubungan dengan penilaian dan output kinerja organisasi.",
    ],
  ],
  68: [
    [
      "Penjaminan Kualitas.",
      "Benar. Evaluasi RCM dan pemantauan SPI menguji kualitas desain serta penerapan pengendalian.",
    ],
    [
      "Penjaminan Kepatuhan.",
      "Keliru. Nama fungsi resminya Penjaminan Kualitas.",
    ],
    [
      "Pengawasan Kualitas.",
      "Keliru. Istilah ini bukan salah satu dari empat fungsi UKI.",
    ],
    [
      "Pengelolaan Kualitas.",
      "Keliru. Fungsi yang tepat menggunakan istilah Penjaminan, bukan Pengelolaan.",
    ],
  ],
  69: [
    [
      "Mereviu kepatuhan penyusunan profil/mitigasi risiko, pelaksanaan mitigasi, serta tindak lanjut reviu/audit.",
      "Benar. Reviu mencakup desain, pelaksanaan, dan tindak lanjut pengelolaan risiko.",
    ],
    [
      "Mereviu kepatuhan penyusunan profil/mitigasi risiko dan pelaksanaan mitigasi, tanpa tindak lanjut reviu/audit.",
      "Keliru. Tindak lanjut hasil reviu atau audit juga termasuk cakupan.",
    ],
    [
      "Mereviu efektivitas penyusunan profil/mitigasi risiko, pelaksanaan mitigasi, serta tindak lanjut reviu/audit.",
      "Keliru. Rumusan kegiatan yang ditekankan dalam materi adalah reviu kepatuhan.",
    ],
    [
      "Mereviu kepatuhan penyusunan profil risiko, tetapi menetapkan mitigasi dan tindak lanjut untuk pemilik risiko.",
      "Keliru. UKI melakukan reviu; tanggung jawab menetapkan dan menjalankan mitigasi tetap pada pemilik risiko.",
    ],
  ],
  70: [
    [
      "NKO, NKO berdasarkan K3, dan Predikat Kinerja Organisasi.",
      "Benar. Ketiganya merupakan output penilaian kinerja organisasi dalam materi UKI.",
    ],
    [
      "NKO, NKP berdasarkan K3, dan Predikat Kinerja Organisasi.",
      "Keliru. Komponen kedua tetap NKO berdasarkan K3, bukan NKP.",
    ],
    [
      "NKO, NKO berdasarkan K3, dan Predikat Kinerja Pegawai.",
      "Keliru. Predikat yang dihasilkan pada konteks ini adalah Predikat Kinerja Organisasi.",
    ],
    [
      "NKP, NKO berdasarkan K3, dan Predikat Kinerja Organisasi.",
      "Keliru. Komponen pertama adalah NKO, bukan NKP.",
    ],
  ],
  71: [
    [
      "Kantor Pusat: Direktorat KI; Kanwil/KPU: Bidang KI/KILI; KPPBC: Seksi KI/KIP; PSO/BLBC: Subbagian Umum dan KI.",
      "Benar. Pasangan level organisasi dan wadah fungsi KI seluruhnya tepat.",
    ],
    [
      "Kantor Pusat: Direktorat KI; Kanwil/KPU: Bagian KI/KILI; KPPBC: Seksi KI/KIP; PSO/BLBC: Subbagian Umum dan KI.",
      "Keliru. Pada Kanwil/KPU kedudukannya Bidang, bukan Bagian.",
    ],
    [
      "Kantor Pusat: Direktorat KI; Kanwil/KPU: Bidang KI/KILI; KPPBC: Subbagian KI/KIP; PSO/BLBC: Subbagian Umum dan KI.",
      "Keliru. Pada KPPBC kedudukannya Seksi, bukan Subbagian.",
    ],
    [
      "Kantor Pusat: Biro KI; Kanwil/KPU: Bidang KI/KILI; KPPBC: Seksi KI/KIP; PSO/BLBC: Subbagian Umum dan KI.",
      "Keliru. Pada Kantor Pusat fungsi tersebut berada pada Direktorat KI, bukan Biro KI.",
    ],
  ],
  72: [
    [
      "Pegawai dan unit Kanwil serta KPPBC dan PSO BC di wilayah kerjanya, tidak termasuk BLBC.",
      "Keliru. BLBC di wilayah kerja juga masuk cakupan UKI Kanwil.",
    ],
    [
      "Pegawai dan unit Kanwil serta KPPBC, PSO BC, dan BLBC di wilayah kerjanya.",
      "Benar. Cakupannya meliputi Kanwil dan seluruh unit vertikal terkait di wilayahnya.",
    ],
    [
      "Pegawai Kanwil serta unit KPPBC, PSO BC, dan BLBC di wilayah kerjanya.",
      "Keliru. Opsi menghilangkan unit Kanwil dan pegawai pada unit-unit vertikal dari rumusan cakupan.",
    ],
    [
      "Pegawai dan unit Kanwil serta KPPBC, PSO BC, dan BLBC di seluruh wilayah Indonesia.",
      "Keliru. Kewenangannya dibatasi pada wilayah kerja Kanwil yang bersangkutan.",
    ],
  ],
  73: [
    [
      "1 Oktober 1946 — pembentukan Pejabatan Bea dan Cukai.",
      "Benar. Kombinasi tanggal dan nama institusi inilah tonggak hari lahir Bea Cukai Indonesia.",
    ],
    [
      "30 Oktober 1946 — pembentukan Pejabatan Bea dan Cukai.",
      "Keliru. Tanggal lahir Bea Cukai adalah 1 Oktober; 30 Oktober berkaitan dengan Hari Oeang.",
    ],
    [
      "1 Oktober 1948 — pembentukan Jawatan Bea dan Cukai.",
      "Keliru. Perubahan menjadi Jawatan terjadi pada 1948, tetapi hari lahir ditarik dari pembentukan Pejabatan pada 1946.",
    ],
    [
      "1 Oktober 1965 — pembentukan Direktorat Jenderal Bea dan Cukai.",
      "Keliru. Nama DJBC digunakan sejak 1965, tetapi hari lahir institusi adalah 1 Oktober 1946.",
    ],
  ],
  74: [
    [
      "R.A. Kartadjoemana.",
      "Keliru. Ejaan nama yang tercantum dalam sejarah adalah Kartadjoemena.",
    ],
    [
      "R.A. Kartadjoemena.",
      "Benar. R.A. Kartadjoemena adalah Kepala Pejabatan Bea dan Cukai yang pertama.",
    ],
    [
      "R.A. Kartadjoemeno.",
      "Keliru. Huruf akhir nama yang tepat adalah -mena, bukan -meno.",
    ],
    [
      "R.M. Kartadjoemena.",
      "Keliru. Inisial gelar yang tepat adalah R.A., bukan R.M.",
    ],
  ],
  75: [
    [
      "Pejabatan Bea dan Cukai (1946) → Jawatan Bea dan Cukai (1965) → DJBC (1948).",
      "Keliru. Tahun Jawatan dan DJBC tertukar.",
    ],
    [
      "Pejabatan Bea dan Cukai (1946) → Jawatan Bea dan Cukai (1948) → DJBC (1965).",
      "Benar. Urutan nama dan tahunnya konsisten dengan perkembangan pascakemerdekaan.",
    ],
    [
      "Pejabatan Bea dan Cukai (1948) → Jawatan Bea dan Cukai (1946) → DJBC (1965).",
      "Keliru. Tahun Pejabatan dan Jawatan tertukar.",
    ],
    [
      "Pejabatan Bea dan Cukai (1946) → Jawatan Bea Cukai (1948) → DJBC (1965).",
      "Keliru. Nama institusi 1948 adalah Jawatan Bea dan Cukai; kata 'dan' tidak dihilangkan.",
    ],
  ],
  76: [
    [
      "Bea masuk saja.",
      "Keliru. Pada masa pendudukan Jepang, fungsi kepabeanan impor-ekspor tidak menjadi fokus sementara.",
    ],
    [
      "Cukai saja.",
      "Benar. Dalam periode tersebut, tugas Bea Cukai sementara berfokus pada cukai.",
    ],
    [
      "Bea keluar saja.",
      "Keliru. Fokus sementaranya bukan bea keluar.",
    ],
    [
      "Bea masuk dan cukai saja.",
      "Keliru. Penambahan bea masuk menjadikan opsi ini tidak sesuai; materi menyebut cukai saja.",
    ],
  ],
  77: [
    [
      "Dinas Bea Impor dan Bea Ekspor serta Cukai.",
      "Benar. Invoerrechten, Uitvoerrechten, dan Accijnzen merujuk pada bea impor, bea ekspor, dan cukai.",
    ],
    [
      "Dinas Bea Impor dan Bea Ekspor serta Pajak.",
      "Keliru. Accijnzen diterjemahkan sebagai cukai, bukan pajak secara umum.",
    ],
    [
      "Dinas Bea Masuk dan Bea Keluar tanpa Cukai.",
      "Keliru. Nama tersebut secara eksplisit juga memuat Accijnzen atau Cukai.",
    ],
    [
      "Dinas Impor dan Ekspor serta Bea Cukai.",
      "Keliru. Unsur rechten melekat pada bea impor dan bea ekspor, bukan sekadar kegiatan impor-ekspor.",
    ],
  ],
  78: [
    [
      "Bea dari Sanskerta; cukai dari bahasa India.",
      "Benar. Materi sejarah menelusuri kedua istilah pada asal bahasa tersebut.",
    ],
    [
      "Bea dari bahasa India; cukai dari Sanskerta.",
      "Keliru. Asal kedua istilah tertukar.",
    ],
    [
      "Bea dari Sanskerta; cukai dari bahasa Hindia.",
      "Keliru. Materi menyebut bahasa India, bukan istilah bahasa Hindia.",
    ],
    [
      "Bea dari Sansekerta; cukai dari bahasa Belanda.",
      "Keliru. Asal istilah cukai disebut dari bahasa India, bukan Belanda.",
    ],
  ],
  79: [
    [
      "Hubungan perdagangan nasional Indonesia dengan daerah dari delapan penjuru mata angin.",
      "Keliru. Maknanya perdagangan internasional dengan mancanegara, bukan perdagangan nasional antardaerah.",
    ],
    [
      "Hubungan perdagangan internasional Indonesia dengan mancanegara dari delapan penjuru mata angin.",
      "Benar. Delapan ulir berkaitan dengan delapan penjuru dan konektivitas perdagangan internasional.",
    ],
    [
      "Hubungan pelayaran internasional Indonesia dengan mancanegara dari delapan penjuru mata angin.",
      "Keliru. Filosofi resminya hubungan perdagangan internasional, bukan dibatasi pada pelayaran.",
    ],
    [
      "Hubungan perdagangan internasional Indonesia dengan mancanegara dari delapan wilayah kepabeanan.",
      "Keliru. Angka delapan merujuk pada penjuru mata angin, bukan wilayah kepabeanan.",
    ],
  ],
  80: [
    [
      "Hari Oeang Republik Indonesia, 30 Oktober, serta kedudukan DJBC sebagai unsur pelaksana Kementerian Keuangan.",
      "Benar. Tiga puluh sayap kecil dan sepuluh sayap besar menyusun penanda tanggal 30 Oktober.",
    ],
    [
      "Hari lahir Bea Cukai Indonesia, 30 Oktober, serta kedudukan DJBC sebagai unsur pelaksana Kementerian Keuangan.",
      "Keliru. Tanggal 30 Oktober memperingati Hari Oeang, bukan hari lahir Bea Cukai.",
    ],
    [
      "Hari Oeang Republik Indonesia, 1 Oktober, serta kedudukan DJBC sebagai unsur pelaksana Kementerian Keuangan.",
      "Keliru. Hari Oeang diperingati 30 Oktober; 1 Oktober adalah hari lahir Bea Cukai.",
    ],
    [
      "Hari Oeang Republik Indonesia, 30 Oktober, serta kedudukan DJBC sebagai unsur pengawas Kementerian Keuangan.",
      "Keliru. Makna kedudukannya sebagai unsur pelaksana, bukan unsur pengawas.",
    ],
  ],
  81: [
    [
      "Tujuan tugas DJBC berupa kemakmuran dan kesejahteraan pegawai selama 24 jam.",
      "Keliru. Kemakmuran dan kesejahteraan ditujukan bagi Indonesia/masyarakat, bukan khusus pegawai atau penanda 24 jam.",
    ],
    [
      "Tujuan pelaksanaan tugas DJBC berupa kemakmuran dan kesejahteraan Indonesia.",
      "Benar. Malai padi merupakan simbol kemakmuran dan kesejahteraan yang menjadi tujuan tugas DJBC.",
    ],
    [
      "Tujuan pelaksanaan fungsi DJBC berupa keamanan dan ketertiban Indonesia.",
      "Keliru. Unsur padi secara khusus melambangkan kemakmuran dan kesejahteraan.",
    ],
    [
      "Tujuan pelaksanaan tugas Kementerian Keuangan berupa kemakmuran dan kesejahteraan DJBC.",
      "Keliru. Arah maknanya tertukar; DJBC bekerja untuk kemakmuran dan kesejahteraan Indonesia.",
    ],
  ],
  82: [
    [
      "Kuning—penjaga keuangan negara; putih—kesucian pengabdian; hitam—keteguhan menjaga wilayah RI.",
      "Benar. Ketiga warna dipasangkan dengan makna filosofis yang tepat.",
    ],
    [
      "Kuning—penjaga kekayaan negara; putih—kesucian pengabdian; hitam—keteguhan menjaga wilayah RI.",
      "Keliru. Rumusan makna warna kuning adalah penjaga keuangan negara.",
    ],
    [
      "Kuning—penjaga keuangan negara; putih—ketulusan pengabdian; hitam—keteguhan menjaga wilayah RI.",
      "Keliru. Makna warna putih menggunakan istilah kesucian pengabdian.",
    ],
    [
      "Kuning—penjaga keuangan negara; putih—kesucian pengabdian; hitam—ketegasan menjaga wilayah RI.",
      "Keliru. Makna warna hitam adalah keteguhan, bukan ketegasan.",
    ],
  ],
  83: [
    [
      "Jujur, Korsa, Loyal, Inisiatif, Korektif.",
      "Benar. Kelima istilah dan urutannya sesuai Lima Sikap Dasar Pegawai DJBC.",
    ],
    [
      "Jujur, Korsa, Loyal, Inovatif, Korektif.",
      "Keliru. Sikap keempat adalah Inisiatif, bukan Inovatif.",
    ],
    [
      "Jujur, Korsa, Loyal, Inisiatif, Kolaboratif.",
      "Keliru. Sikap kelima adalah Korektif, bukan Kolaboratif.",
    ],
    [
      "Jujur, Karya, Loyal, Inisiatif, Korektif.",
      "Keliru. Sikap kedua adalah Korsa, bukan Karya.",
    ],
  ],
  84: [
    [
      "Trade Facilitator dan Industrial Assistance.",
      "Benar. Fasilitasi perdagangan dan asistensi industri adalah dua peran yang tepat untuk skenario tersebut.",
    ],
    [
      "Trade Facilitator dan Industrial Protection.",
      "Keliru. Istilah peran resminya Industrial Assistance, bukan Industrial Protection.",
    ],
    [
      "Trade Collector dan Industrial Assistance.",
      "Keliru. Istilah peran pertama adalah Trade Facilitator, bukan Trade Collector.",
    ],
    [
      "Revenue Facilitator dan Industrial Assistance.",
      "Keliru. Revenue Collector merupakan peran lain; fasilitasi perdagangan disebut Trade Facilitator.",
    ],
  ],
  85: [
    [
      "Jenis, format, penyiapan, pengamanan, pengabsahan, pendistribusian, penyimpanan, dan media komunikasi kedinasan.",
      "Benar. Rangkaian tersebut mencakup unsur pengelolaan Tata Naskah Dinas.",
    ],
    [
      "Jenis, format, penyiapan, pengamanan, pengesahan, pendistribusian, penyimpanan, dan media komunikasi kedinasan.",
      "Keliru. Istilah dalam cakupan TND adalah pengabsahan, bukan pengesahan.",
    ],
    [
      "Jenis, format, penyiapan, pengamanan, pengabsahan, pendistribusian, pengarsipan, dan media komunikasi kedinasan.",
      "Keliru. Rumusan cakupannya menggunakan penyimpanan; penggantian satu istilah mengubah redaksi normatif.",
    ],
    [
      "Jenis, format, penyiapan, pengamanan, pengabsahan, pendistribusian, penyimpanan, dan sarana komunikasi kedinasan.",
      "Keliru. Unsur terakhirnya media komunikasi kedinasan, bukan sarana komunikasi.",
    ],
  ],
  86: [
    [
      "Kepala, batang tubuh, dan kaki.",
      "Benar. Ini tiga susunan dasar Naskah Dinas.",
    ],
    [
      "Kepala, badan tubuh, dan kaki.",
      "Keliru. Istilah bagian tengahnya batang tubuh, bukan badan tubuh.",
    ],
    [
      "Kepala, batang tubuh, dan penutup.",
      "Keliru. Istilah bagian akhirnya kaki, bukan penutup.",
    ],
    [
      "Kop, batang tubuh, dan kaki.",
      "Keliru. Susunan dasarnya menggunakan istilah kepala; kop dapat menjadi unsur pada bagian kepala.",
    ],
  ],
  87: [
    [
      "Arahan—peraturan/instruksi/SE/SOP; Korespondensi intern—nota dinas; Khusus—berita acara/notula.",
      "Benar. Setiap contoh ditempatkan dalam kelompok Naskah Dinas yang tepat.",
    ],
    [
      "Arahan—peraturan/instruksi/SE/SOP; Korespondensi intern—surat dinas; Khusus—berita acara/notula.",
      "Keliru. Korespondensi intern menggunakan nota dinas; surat dinas digunakan untuk korespondensi ekstern.",
    ],
    [
      "Arahan—peraturan/instruksi/SE/SOP; Korespondensi intern—nota dinas; Khusus—laporan/notula.",
      "Keliru. Pasangan contoh khusus dalam rumusan soal adalah berita acara dan notula.",
    ],
    [
      "Arahan—peraturan/instruksi/SE/SOP; Korespondensi ekstern—nota dinas; Khusus—berita acara/notula.",
      "Keliru. Nota dinas merupakan korespondensi intern, bukan ekstern.",
    ],
  ],
  88: [
    [
      "Jabatan Menteri Keuangan menggunakan Lambang Negara; unit organisasi menggunakan Logo Kementerian Keuangan.",
      "Benar. Identitas kepala naskah dibedakan menurut pejabat dan unit penerbit.",
    ],
    [
      "Jabatan Menteri Keuangan menggunakan Logo Kementerian Keuangan; unit organisasi menggunakan Lambang Negara.",
      "Keliru. Penggunaan kedua identitas tertukar.",
    ],
    [
      "Jabatan Menteri Keuangan menggunakan Lambang Negara; unit organisasi menggunakan Lambang Kementerian Keuangan.",
      "Keliru. Unit organisasi menggunakan Logo Kementerian Keuangan, bukan istilah Lambang Kementerian.",
    ],
    [
      "Jabatan Menteri Keuangan dan unit organisasi sama-sama menggunakan Logo Kementerian Keuangan.",
      "Keliru. Naskah jabatan Menteri Keuangan menggunakan Lambang Negara.",
    ],
  ],
  89: [
    [
      "Memproses manual dengan media rekam digital serta pencatatan dan pendokumentasian yang dipersyaratkan.",
      "Keliru. Proses manual menggunakan media rekam kertas.",
    ],
    [
      "Memproses manual dengan media rekam kertas serta pencatatan dan pendokumentasian yang dipersyaratkan.",
      "Benar. Gangguan aplikasi tidak menghapus tata kelola; jalur manual tetap harus terekam dan terdokumentasi.",
    ],
    [
      "Memproses manual dengan media rekam kertas serta pencatatan tanpa kewajiban pendokumentasian.",
      "Keliru. Pencatatan dan pendokumentasian sama-sama harus dipenuhi.",
    ],
    [
      "Memproses elektronik melalui media pribadi serta pencatatan dan pendokumentasian yang dipersyaratkan.",
      "Keliru. Alternatif resminya proses manual dengan media rekam kertas, bukan media pribadi.",
    ],
  ],
  90: [
    [
      "Semua barang yang dibeli atau diperoleh atas beban APBN atau berasal dari perolehan lain yang sah.",
      "Benar. Definisi BMN mencakup sumber APBN dan perolehan lain yang sah.",
    ],
    [
      "Semua barang yang dibeli atau diperoleh atas beban APBN dan berasal dari perolehan lain yang sah.",
      "Keliru. Kata penghubung yang tepat adalah atau; barang tidak harus memenuhi kedua sumber sekaligus.",
    ],
    [
      "Semua barang yang dibeli atau diperoleh atas beban APBD atau berasal dari perolehan lain yang sah.",
      "Keliru. BMN menggunakan APBN; barang dari APBD pada dasarnya merupakan barang milik daerah.",
    ],
    [
      "Semua barang yang dibeli atas beban APBN, tidak termasuk barang dari perolehan lain yang sah.",
      "Keliru. Perolehan lain yang sah secara eksplisit termasuk definisi BMN.",
    ],
  ],
  91: [
    [
      "PMK 40 Tahun 2024—Tata Cara Penggunaan BMN; menggantikan PMK 246/PMK.06/2014 beserta perubahannya.",
      "Benar. Nomor, tahun, substansi, dan regulasi yang digantikan seluruhnya tepat.",
    ],
    [
      "PMK 40 Tahun 2024—Tata Cara Pemanfaatan BMN; menggantikan PMK 246/PMK.06/2014 beserta perubahannya.",
      "Keliru. PMK 40/2024 secara khusus mengatur Penggunaan BMN, bukan Pemanfaatan BMN.",
    ],
    [
      "PMK 40 Tahun 2024—Tata Cara Penggunaan BMN; menggantikan PMK 240/PMK.06/2014 beserta perubahannya.",
      "Keliru. Nomor regulasi lama adalah PMK 246, bukan PMK 240.",
    ],
    [
      "PMK 40 Tahun 2024—Tata Cara Penggunaan BMN; mengubah PMK 246/PMK.06/2014 beserta perubahannya.",
      "Keliru. PMK baru menggantikan ketentuan lama, bukan sekadar mengubahnya.",
    ],
  ],
  92: [
    [
      "PMK 120 Tahun 2024.",
      "Benar. PMK 120/2024 menjadi rujukan khusus pengelolaan BMN yang tidak digunakan untuk tugas dan fungsi.",
    ],
    [
      "PMK 120 Tahun 2025.",
      "Keliru. Nomornya benar, tetapi tahunnya 2024.",
    ],
    [
      "PMK 40 Tahun 2024.",
      "Keliru. PMK 40/2024 mengatur penggunaan BMN secara umum, bukan fokus BMN yang tidak digunakan.",
    ],
    [
      "PMK 120 Tahun 2024 tentang Tata Cara Penggunaan BMN.",
      "Keliru. Nomor regulasinya tepat, tetapi judul/substansinya bukan Tata Cara Penggunaan BMN.",
    ],
  ],
  93: [
    [
      "Standar Barang adalah spesifikasi; Standar Kebutuhan adalah jumlah yang dibutuhkan.",
      "Benar. Pembeda konseptualnya adalah mutu/spesifikasi barang versus kuantitas kebutuhan.",
    ],
    [
      "Standar Barang adalah spesifikasi; Standar Kebutuhan adalah harga yang dibutuhkan.",
      "Keliru. Standar Kebutuhan berkaitan dengan jumlah, bukan harga.",
    ],
    [
      "Standar Barang adalah jumlah; Standar Kebutuhan adalah spesifikasi yang dibutuhkan.",
      "Keliru. Kedua definisi tertukar.",
    ],
    [
      "Standar Barang adalah spesifikasi dan jumlah; Standar Kebutuhan adalah jumlah yang tersedia.",
      "Keliru. Standar Barang berfokus pada spesifikasi, sedangkan Standar Kebutuhan pada jumlah yang dibutuhkan.",
    ],
  ],
  94: [
    [
      "PMK 124 Tahun 2024 sebagaimana diubah dengan PMK 117 Tahun 2025.",
      "Benar. Kombinasi aturan induk dan perubahannya merupakan rujukan OTK mutakhir per Juli 2026.",
    ],
    [
      "PMK 124 Tahun 2025 sebagaimana diubah dengan PMK 117 Tahun 2024.",
      "Keliru. Tahun aturan induk dan aturan perubahan tertukar.",
    ],
    [
      "PMK 124 Tahun 2024 sebagaimana diubah dengan PMK 118 Tahun 2025.",
      "Keliru. Nomor perubahan adalah PMK 117, bukan PMK 118.",
    ],
    [
      "PMK 118 Tahun 2021 sebagaimana diubah dengan PMK 117 Tahun 2025.",
      "Keliru. PMK 118/2021 telah dicabut; aturan induk mutakhirnya PMK 124/2024.",
    ],
  ],
  95: [
    [
      "PMK 62 Tahun 2023 sebagaimana diubah terakhir dengan PMK 41 Tahun 2026.",
      "Benar. PMK 41/2026 merupakan perubahan terbaru atas PMK 62/2023.",
    ],
    [
      "PMK 62 Tahun 2023 sebagaimana diubah terakhir dengan PMK 41 Tahun 2025.",
      "Keliru. Nomor perubahannya benar, tetapi tahunnya 2026.",
    ],
    [
      "PMK 62 Tahun 2023 sebagaimana diubah terakhir dengan PMK 107 Tahun 2024.",
      "Keliru. PMK 107/2024 bukan perubahan terakhir karena telah diubah lagi oleh PMK 41/2026.",
    ],
    [
      "PMK 41 Tahun 2026 sebagaimana diubah terakhir dengan PMK 62 Tahun 2023.",
      "Keliru. Hubungan aturan induk dan aturan perubahan tertukar.",
    ],
  ],
  96: [
    [
      "PMK 32 Tahun 2025.",
      "Benar. SBM TA 2026 ditetapkan pada tahun sebelumnya melalui PMK 32/2025.",
    ],
    [
      "PMK 32 Tahun 2026.",
      "Keliru. Nomornya benar, tetapi tahun penetapannya 2025.",
    ],
    [
      "PMK 39 Tahun 2024.",
      "Keliru. PMK 39/2024 menetapkan SBM untuk TA 2025.",
    ],
    [
      "PMK 79 Tahun 2025.",
      "Keliru. PMK 79/2025 mengatur Standar Struktur Biaya, bukan SBM TA 2026.",
    ],
  ],
  97: [
    [
      "Mencabut PMK 195/PMK.02/2014 dan PMK 140/PMK.02/2021.",
      "Benar. Kedua regulasi lama tersebut dinyatakan dicabut oleh PMK 79/2025.",
    ],
    [
      "Mencabut PMK 195/PMK.02/2014 dan PMK 140/PMK.02/2020.",
      "Keliru. Tahun regulasi kedua adalah 2021, bukan 2020.",
    ],
    [
      "Mencabut PMK 159/PMK.02/2014 dan PMK 140/PMK.02/2021.",
      "Keliru. Nomor regulasi pertama adalah 195, bukan 159.",
    ],
    [
      "Mengubah PMK 195/PMK.02/2014 dan mencabut PMK 140/PMK.02/2021.",
      "Keliru. Keduanya dicabut, bukan satu diubah dan satu dicabut.",
    ],
  ],
  98: [
    [
      "PMK 113/PMK.05/2012 sebagaimana diubah dengan PMK 119 Tahun 2023.",
      "Benar. Aturan induk 2012 harus dibaca bersama perubahan tahun 2023.",
    ],
    [
      "PMK 113/PMK.05/2012 sebagaimana diubah dengan PMK 119 Tahun 2024.",
      "Keliru. Tahun aturan perubahannya 2023, bukan 2024.",
    ],
    [
      "PMK 119/PMK.05/2012 sebagaimana diubah dengan PMK 113 Tahun 2023.",
      "Keliru. Nomor aturan induk dan perubahan tertukar.",
    ],
    [
      "PMK 113/PMK.05/2013 sebagaimana diubah dengan PMK 119 Tahun 2023.",
      "Keliru. Tahun aturan induknya 2012, bukan 2013.",
    ],
  ],
  99: [
    [
      "Perubahan kedua atas Perpres 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah.",
      "Benar. Perpres 46/2025 berkedudukan sebagai perubahan kedua.",
    ],
    [
      "Perubahan pertama atas Perpres 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah.",
      "Keliru. Perubahan pertama adalah Perpres 12/2021.",
    ],
    [
      "Perubahan kedua atas Perpres 12 Tahun 2021 tentang Pengadaan Barang/Jasa Pemerintah.",
      "Keliru. Aturan induknya Perpres 16/2018; Perpres 12/2021 adalah perubahan pertama.",
    ],
    [
      "Perubahan ketiga atas Perpres 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah.",
      "Keliru. Kedudukannya perubahan kedua, bukan ketiga.",
    ],
  ],
  100: [
    [
      "Perkiraan harga barang/jasa yang ditetapkan PPK dengan memperhitungkan biaya tidak langsung, keuntungan, dan PPN.",
      "Benar. PPK menetapkan HPS dengan unsur biaya dan pajak yang relevan.",
    ],
    [
      "Perkiraan harga barang/jasa yang ditetapkan PA/KPA dengan memperhitungkan biaya tidak langsung, keuntungan, dan PPN.",
      "Keliru. Pejabat yang menetapkan HPS adalah PPK, bukan PA/KPA.",
    ],
    [
      "Perkiraan harga barang/jasa yang ditetapkan PPK dengan memperhitungkan biaya langsung, keuntungan, dan PPN.",
      "Keliru. Rumusan pentingnya mencakup biaya tidak langsung; opsi menggantinya dengan biaya langsung.",
    ],
    [
      "Perkiraan harga barang/jasa yang ditetapkan PPK dengan memperhitungkan biaya tidak langsung, keuntungan, tanpa PPN.",
      "Keliru. HPS memperhitungkan PPN sesuai ketentuan, bukan mengecualikannya.",
    ],
  ],
};
