import type { Topic } from "./questions";

export type SummaryCard = {
  id: string;
  topic: Topic;
  title: string;
  memoryCode: string;
  summary: string;
  keyPoints: readonly string[];
  traps: readonly string[];
  sourceLabel: string;
  sourceUrl: string;
};

const drive = {
  kinerja:
    "https://drive.google.com/file/d/15XlEDdUh6PRgP2pIbNxkICnP4J85XCDL/view",
  sdm:
    "https://docs.google.com/presentation/d/1TsYni3hb3kRktqezfURSj92_ZT2kzkrW/edit",
  sdmDevelopment:
    "https://docs.google.com/presentation/d/17vZiwRpgx2nVTPSUCFYAbSi-jc8y6Vd8/edit",
  budget:
    "https://drive.google.com/file/d/1pnxmCo2GmdfnKofQQoLPLpSM1kYWgbIz/view",
  bmn:
    "https://docs.google.com/presentation/d/16byPcXOIv5n_n7AdHWVliznV0DBMRMFP/edit",
  information:
    "https://docs.google.com/presentation/d/1-OPoTQL--obpWy__a-bUW8Dw7pjGmOKn/edit",
  ai: "https://drive.google.com/file/d/1bYLC1QbM2RKDPpH9QWdCfFaYmeKRqeIt/view",
} as const;

export const summaryCards: SummaryCard[] = [
  {
    id: "kinerja-otapt",
    topic: "Manajemen Kinerja",
    title: "Lima prinsip manajemen kinerja",
    memoryCode: "O-TA-PT",
    summary:
      "KMK 127 Tahun 2026 menempatkan lima prinsip sebagai pagar seluruh proses manajemen kinerja.",
    keyPoints: [
      "Objektif: sesuai keadaan sebenarnya.",
      "Terukur: dapat diukur kuantitatif dan/atau kualitatif.",
      "Akuntabel, Partisipatif, dan Transparan.",
    ],
    traps: [
      "Efisien dan fleksibel terdengar baik, tetapi bukan dua dari lima prinsip yang dirumuskan.",
      "Partisipatif tidak sama dengan pasif; pejabat penilai dan pegawai terlibat aktif.",
    ],
    sourceLabel: "KMK 127 Tahun 2026",
    sourceUrl: drive.kinerja,
  },
  {
    id: "kinerja-siklus",
    topic: "Manajemen Kinerja",
    title: "Empat tahap implementasi",
    memoryCode: "Ren-Lak-Eva-Lapor",
    summary:
      "Implementasi bergerak dari perencanaan, pelaksanaan, evaluasi, lalu pelaporan dan pemanfaatan hasil evaluasi.",
    keyPoints: [
      "Perencanaan organisasi menghasilkan PK; perencanaan pegawai menghasilkan SKP.",
      "Pelaksanaan meliputi pencapaian target, pemantauan, pembinaan, dan perubahan PK/SKP.",
      "Pelaporan tidak berdiri sendiri karena hasilnya juga dimanfaatkan.",
    ],
    traps: [
      "Pemantauan dan pembinaan berada pada tahap pelaksanaan, bukan evaluasi.",
      "Urutan tidak dimulai dari pengukuran atau pelaporan.",
    ],
    sourceLabel: "KMK 127 Tahun 2026",
    sourceUrl: drive.kinerja,
  },
  {
    id: "kinerja-pk",
    topic: "Manajemen Kinerja",
    title: "Komponen Perjanjian Kinerja",
    memoryCode: "Pa-I-Ra-Ta + In",
    summary:
      "PK memuat Peta Strategi, IKU, Rincian Anggaran, Rincian Target Kinerja, dan Inisiatif Strategis yang bersifat opsional.",
    keyPoints: [
      "PK adalah kesepakatan pimpinan UPK dengan pimpinan UPK di atasnya.",
      "Disusun pada level Kementerian, UPK-One, UPK-Two, dan UPK-Three.",
      "Inisiatif Strategis adalah komponen opsional.",
    ],
    traps: [
      "Manual IKU wajib dimiliki tiap IKU, tetapi bukan nama salah satu dari lima komponen PK pada daftar ini.",
      "Inisiatif Strategis bukan komponen wajib.",
    ],
    sourceLabel: "Sosialisasi KMK 127 Tahun 2026",
    sourceUrl: drive.kinerja,
  },
  {
    id: "kinerja-iku-limit",
    topic: "Manajemen Kinerja",
    title: "Batas maksimum IKU",
    memoryCode: "One–Two–Three = 25–20–15",
    summary:
      "Semakin ke bawah level UPK, batas maksimum jumlah IKU turun lima: 25, 20, lalu 15.",
    keyPoints: [
      "UPK-One maksimal 25 IKU.",
      "UPK-Two maksimal 20 IKU.",
      "UPK-Three maksimal 15 IKU.",
    ],
    traps: [
      "Angka 20–15–10 adalah pengecoh yang mempertahankan pola turun lima.",
      "Untuk UPK-One, jumlah minimal mengikuti jumlah Sasaran Strategis.",
    ],
    sourceLabel: "Sosialisasi KMK 127 Tahun 2026",
    sourceUrl: drive.kinerja,
  },
  {
    id: "kinerja-nko",
    topic: "Manajemen Kinerja",
    title: "Predikat Nilai Kinerja Organisasi",
    memoryCode: "110–100–90–80",
    summary:
      "Ambang predikat NKO turun per 10 poin, tetapi tanda pertidaksamaannya harus dibaca presisi.",
    keyPoints: [
      "X ≥ 110: Sangat Baik.",
      "100 < X < 110: Baik; 90 < X < 100: Cukup.",
      "80 < X < 90: Kurang; 0 < X < 80: Buruk.",
    ],
    traps: [
      "Nilai tepat 110 masuk Sangat Baik.",
      "Jangan menggeser ambang menjadi 105 atau 95.",
    ],
    sourceLabel: "Sosialisasi KMK 127 Tahun 2026",
    sourceUrl: drive.kinerja,
  },
  {
    id: "kinerja-nkp-bobot-nko",
    topic: "Manajemen Kinerja",
    title: "Matriks lengkap bobot NKO dalam formula NKP",
    memoryCode: "≥ NKO: 50:50 / 30:70 | < NKO: 10:90",
    summary:
      "Tentukan dahulu posisi hasil penghitungan pegawai terhadap NKO, lalu identifikasi kelompok jabatan. Dua keputusan itu menentukan bobot NKO dan hasil penghitungan pegawai.",
    keyPoints: [
      "Hasil penghitungan awal pegawai dibentuk dari Nilai Hasil Kerja (NHK) 75% dan Nilai Perilaku Kerja (NPK) 25%.",
      "Jika hasil penghitungan ≥ NKO: Pimpinan UPK, pegawai satu tingkat di bawahnya, dan JF substansi memakai NKO 50% + hasil penghitungan 50%.",
      "Jika hasil penghitungan ≥ NKO: pegawai dua tingkat atau lebih di bawah Pimpinan UPK serta JF non-substansi memakai NKO 30% + hasil penghitungan 70%.",
      "Jika hasil penghitungan < NKO: formula yang digunakan adalah NKO 10% + hasil penghitungan 90%.",
      "Penghitungan NKP juga memperhatikan Nilai Hukuman Disiplin, Nilai Dampak Pelanggaran Disiplin, dan Nilai Koreksi sesuai kondisi pegawai.",
    ],
    traps: [
      "Tanda sama dengan masuk kondisi ≥ NKO; jangan memakai formula 10:90 ketika hasil sama dengan NKO.",
      "Formula 50:50 tidak hanya untuk JF substansi, tetapi juga Pimpinan UPK dan pegawai satu tingkat di bawahnya.",
      "Formula 30:70 bukan untuk kelompok pimpinan/JF substansi, sedangkan komposisi 70:30 dan 90:10 tidak digunakan pada matriks ini.",
    ],
    sourceLabel: "Sosialisasi KMK 127 Tahun 2026",
    sourceUrl: drive.kinerja,
  },
  {
    id: "sdm-jam-kerja",
    topic: "Disiplin & Kepegawaian",
    title: "Jam kerja reguler DJBC",
    memoryCode: "42:45 | 90 | 09–15.30",
    summary:
      "Jumlah jam kerja reguler 42 jam 45 menit per minggu dengan fleksibilitas total 90 menit di awal dan akhir.",
    keyPoints: [
      "Senin–Kamis: 07.30–17.00.",
      "Core/collaborative hour: 09.00–15.30.",
      "Flexy time: 90 menit pada awal dan akhir.",
    ],
    traps: [
      "42 jam 30 menit dan 37 jam 30 menit adalah angka yang mudah tertukar.",
      "Core hour bukan 08.30–15.00.",
    ],
    sourceLabel: "Peningkatan Kompetensi Teknis Bidang SDM",
    sourceUrl: drive.sdm,
  },
  {
    id: "sdm-presensi",
    topic: "Disiplin & Kepegawaian",
    title: "Konversi pelanggaran presensi",
    memoryCode: "3:45 | 7:30",
    summary:
      "Tidak mengisi salah satu presensi dikonversi 3 jam 45 menit; akumulasi 7 jam 30 menit menjadi satu hari tidak masuk.",
    keyPoints: [
      "Tidak absen masuk atau pulang: 3 jam 45 menit.",
      "Tidak absen masuk dan pulang: satu hari tidak masuk.",
      "Akumulasi 7 jam 30 menit: satu hari tidak masuk.",
    ],
    traps: [
      "3 jam 30 menit dan 7 jam 45 menit adalah pengecoh numerik.",
      "Konversi tidak meniadakan penelitian atas unsur kesengajaan.",
    ],
    sourceLabel: "Peningkatan Kompetensi Teknis Bidang SDM",
    sourceUrl: drive.sdm,
  },
  {
    id: "sdm-cuti",
    topic: "Disiplin & Kepegawaian",
    title: "Angka inti cuti",
    memoryCode: "Tahunan 1–12 | Besar 5–3 | Sakit 12+6",
    summary:
      "Cuti tahunan mensyaratkan satu tahun kerja dan memberi 12 hari kerja; cuti besar 5 tahun dan maksimal 3 bulan.",
    keyPoints: [
      "Cuti tahunan: bekerja paling kurang 1 tahun terus-menerus; hak 12 hari kerja.",
      "Cuti besar: bekerja paling singkat 5 tahun terus-menerus; maksimal 3 bulan.",
      "Cuti sakit: maksimal 1 tahun, dapat ditambah maksimal 6 bulan berdasarkan tim penguji kesehatan.",
    ],
    traps: [
      "Cuti besar keagamaan hanya untuk haji pertama.",
      "Satuan cuti tahunan adalah hari kerja, sedangkan tambahan tertentu dapat dinyatakan hari kalender.",
    ],
    sourceLabel: "Peningkatan Kompetensi Teknis Bidang SDM",
    sourceUrl: drive.sdm,
  },
  {
    id: "sdm-cltn",
    topic: "Disiplin & Kepegawaian",
    title: "Cuti di Luar Tanggungan Negara",
    memoryCode: "5 → 3 + 1",
    summary:
      "Untuk alasan pribadi dan mendesak, CLTN mensyaratkan masa kerja paling singkat 5 tahun, diberikan maksimal 3 tahun, dan dapat diperpanjang maksimal 1 tahun.",
    keyPoints: [
      "Masa kerja minimum: 5 tahun terus-menerus.",
      "Durasi awal maksimum: 3 tahun.",
      "Perpanjangan maksimum: 1 tahun.",
    ],
    traps: [
      "Pola 5–2–1 atau 3–3–1 bukan rumusan materi.",
      "Hak cuti tahunan setelah aktif kembali baru diperoleh setelah 1 tahun bekerja.",
    ],
    sourceLabel: "Peningkatan Kompetensi Teknis Bidang SDM",
    sourceUrl: drive.sdm,
  },
  {
    id: "sdm-learning",
    topic: "Disiplin & Kepegawaian",
    title: "Model pengembangan 70:20:10",
    memoryCode: "70 pengalaman – 20 orang – 10 kelas",
    summary:
      "Porsi terbesar pengembangan berasal dari pengalaman kerja, disusul pembelajaran sosial, lalu pembelajaran terstruktur.",
    keyPoints: [
      "70% learning from experience/while working.",
      "20% social learning/learning from others.",
      "10% structured learning.",
    ],
    traps: [
      "Urutan 70:20:10 tidak berarti pendidikan formal menjadi porsi 70%.",
      "Model ini mendukung, bukan menggantikan, analisis kebutuhan pembelajaran.",
    ],
    sourceLabel: "Manajemen Pengembangan SDM DJBC",
    sourceUrl: drive.sdmDevelopment,
  },
  {
    id: "sdm-tubel",
    topic: "Disiplin & Kepegawaian",
    title: "Tugas belajar: sisa masa kerja dan ikatan dinas",
    memoryCode: "Syarat 3n/2n | Ikatan 2n/1n",
    summary:
      "Bedakan angka pada syarat sisa masa kerja dari angka ikatan dinas setelah selesai tugas belajar.",
    keyPoints: [
      "Sisa masa kerja: dibiayai diberhentikan 3n; tidak diberhentikan 2n.",
      "Ikatan dinas: dibiayai diberhentikan 2n; tidak diberhentikan 1n.",
      "n adalah masa pendidikan normatif program studi.",
    ],
    traps: [
      "3n/2n adalah syarat sisa masa kerja, bukan langsung masa ikatan dinas.",
      "Jangan membalik pasangan diberhentikan dan tidak diberhentikan.",
    ],
    sourceLabel: "Manajemen Pengembangan SDM DJBC",
    sourceUrl: drive.sdmDevelopment,
  },
  {
    id: "anggaran-pilar",
    topic: "Keuangan & Pengadaan",
    title: "Tiga pilar sistem penganggaran",
    memoryCode: "Terpadu – Kinerja – Menengah",
    summary:
      "Tiga pilarnya adalah Penganggaran Terpadu, Penganggaran Berbasis Kinerja, dan Kerangka Pengeluaran Jangka Menengah.",
    keyPoints: [
      "Terpadu mencegah duplikasi penyediaan maupun penggunaan dana.",
      "PBK berorientasi output dan outcome, money follow program, dan let the manager manages.",
      "KPJM melihat implikasi anggaran tiga tahun ke depan.",
    ],
    traps: [
      "Top-down dan bottom-up adalah metode alokasi, bukan nama tiga pilar.",
      "Value for money adalah prinsip penting, tetapi bukan pengganti salah satu pilar.",
    ],
    sourceLabel: "Materi Pengelolaan Anggaran DJBC 2026",
    sourceUrl: drive.budget,
  },
  {
    id: "anggaran-prioritas",
    topic: "Keuangan & Pengadaan",
    title: "Tangga prioritas anggaran",
    memoryCode: "Dasar – Utama – Wajib – Inovasi – Dukung",
    summary:
      "Kebutuhan level dasar harus dipenuhi sebelum level di atasnya; materi mengadaptasi logika hierarki kebutuhan.",
    keyPoints: [
      "Kebutuhan dasar mencakup belanja operasional dan layanan perkantoran komponen 001/002.",
      "Layanan utama berorientasi pada tusi nonkesekretariatan dan capaian program.",
      "Mandatory mencakup antara lain prioritas nasional, TIK strategis, dan kontrak tahun jamak.",
    ],
    traps: [
      "Mandatory tidak otomatis identik dengan seluruh belanja operasional.",
      "Pendukung tusi tidak didahulukan dari kebutuhan dasar.",
    ],
    sourceLabel: "Materi Pengelolaan Anggaran DJBC 2026",
    sourceUrl: drive.budget,
  },
  {
    id: "anggaran-kpa",
    topic: "Keuangan & Pengadaan",
    title: "KPA: formil dan materiil",
    memoryCode: "Formil = tugas | Materiil = uang + keluaran",
    summary:
      "KPA bertanggung jawab formil atas pelaksanaan tugas/wewenang dan materiil atas penggunaan anggaran serta keluaran.",
    keyPoints: [
      "KPA menyusun DIPA serta menetapkan PPK dan PPSPM.",
      "Tanggung jawab formil melekat pada pelaksanaan tugas dan wewenang.",
      "Tanggung jawab materiil mencakup penggunaan anggaran dan keluaran.",
    ],
    traps: [
      "PPK menerbitkan SPP; PPSPM menguji SPP dan menerbitkan SPM.",
      "KPA bukan Bendahara Pengeluaran.",
    ],
    sourceLabel: "Materi Pengelolaan Anggaran DJBC 2026",
    sourceUrl: drive.budget,
  },
  {
    id: "anggaran-ppk",
    topic: "Keuangan & Pengadaan",
    title: "Beda PPK dan PPSPM",
    memoryCode: "PPK → SPP | PPSPM → SPM",
    summary:
      "PPK melakukan komitmen dan menerbitkan SPP; PPSPM menguji SPP lalu menerbitkan SPM.",
    keyPoints: [
      "PPK menandatangani perjanjian, mengendalikan perikatan, dan menguji bukti hak tagih.",
      "PPSPM menolak serta mengembalikan SPP yang tidak memenuhi syarat.",
      "PPSPM memantau pagu, realisasi belanja, dan penggunaan UP/TUP.",
    ],
    traps: [
      "SPP dan SPM hanya berbeda satu huruf, tetapi pejabat penerbitnya berbeda.",
      "PPK tidak menerbitkan SP2D; itu berada pada ranah Kuasa BUN/KPPN.",
    ],
    sourceLabel: "Materi Pengelolaan Anggaran DJBC 2026",
    sourceUrl: drive.budget,
  },
  {
    id: "bmn-definisi",
    topic: "Umum, Rumah Tangga & BMN",
    title: "Definisi dan lingkup BMN",
    memoryCode: "APBN + perolehan sah",
    summary:
      "BMN adalah semua barang yang dibeli/diperoleh atas beban APBN atau berasal dari perolehan lain yang sah.",
    keyPoints: [
      "Perolehan sah dapat berasal dari hibah/sumbangan, kontrak, ketentuan peraturan, atau putusan pengadilan berkekuatan hukum tetap.",
      "Klasifikasi meliputi aset lancar, aset tetap, dan aset lainnya.",
      "Persediaan merupakan aset lancar.",
    ],
    traps: [
      "BMN tidak terbatas pada belanja modal kode 53.",
      "Aset tak berwujud berada pada kelompok aset lainnya, bukan persediaan.",
    ],
    sourceLabel: "Bahan Siklus Pengelolaan BMN",
    sourceUrl: drive.bmn,
  },
  {
    id: "bmn-rkbmn",
    topic: "Umum, Rumah Tangga & BMN",
    title: "RKBMN dan angka kuncinya",
    memoryCode: "Dokumen 1 tahun, kebutuhan T-2",
    summary:
      "RKBMN adalah dokumen perencanaan satu tahun yang merinci kebutuhan BMN untuk diadakan dua tahun ke depan.",
    keyPoints: [
      "Persetujuan RKBMN menjadi salah satu dasar penyusunan RKA-K/L.",
      "Objek tertentu menggunakan ambang nilai usulan paket di atas Rp500 juta.",
      "Perencanaan kebutuhan diselaraskan dengan RP4 tiga tahun ke depan.",
    ],
    traps: [
      "Periode dokumen satu tahun tidak sama dengan horizon pengadaan dua tahun ke depan.",
      "Ambangnya di atas Rp500 juta, bukan minimal Rp500 juta.",
    ],
    sourceLabel: "Bahan Siklus Pengelolaan BMN",
    sourceUrl: drive.bmn,
  },
  {
    id: "bmn-pemeliharaan",
    topic: "Umum, Rumah Tangga & BMN",
    title: "Objek RKBMN pemeliharaan",
    memoryCode: "T/B – Angkutan – >100 juta",
    summary:
      "Objek pemeliharaan mencakup tanah/bangunan, alat angkutan bermotor, serta BMN dengan nilai perolehan per satuan di atas Rp100 juta.",
    keyPoints: [
      "Nilai dilihat per satuan.",
      "Batasnya lebih dari Rp100.000.000.",
      "Asuransi BMN termasuk dalam perencanaan pemeliharaan.",
    ],
    traps: [
      "Jangan mengganti 'lebih dari' dengan 'paling sedikit'.",
      "Ambang Rp500 juta adalah angka yang muncul pada project selection, bukan ambang ini.",
    ],
    sourceLabel: "Bahan Siklus Pengelolaan BMN",
    sourceUrl: drive.bmn,
  },
  {
    id: "bmn-ppk-type",
    topic: "Keuangan & Pengadaan",
    title: "Tipologi PPK",
    memoryCode: "A kompleks – B umum – C sederhana",
    summary:
      "PPK Tipe A menangani kontrak kompleks, Tipe B kontrak umum/lazim, dan Tipe C kontrak sederhana/rutin.",
    keyPoints: [
      "Tipe A: risiko/teknologi tinggi, desain khusus, penyedia asing, atau sulit didefinisikan teknis.",
      "Tipe B: umum atau lazim, bukan kompleks dan bukan sederhana.",
      "Tipe C: operasional, rutin, standar, dan/atau berulang.",
    ],
    traps: [
      "Huruf A tidak berarti pekerjaan paling sederhana.",
      "Tipe B bukan kategori peralihan tanpa definisi; kriterianya umum/lazim.",
    ],
    sourceLabel: "Bahan Siklus Pengelolaan BMN",
    sourceUrl: drive.bmn,
  },
  {
    id: "layanan-jenis",
    topic: "Layanan Informasi",
    title: "Tiga keluarga layanan informasi",
    memoryCode: "Kedinasan – K&C – Publik",
    summary:
      "Materi membedakan bantuan kedinasan, layanan informasi kepabeanan dan cukai, serta layanan informasi publik.",
    keyPoints: [
      "Bantuan kedinasan berkaitan dengan UU Administrasi Pemerintahan.",
      "Layanan informasi publik berkaitan dengan UU Keterbukaan Informasi Publik.",
      "Layanan kepabeanan dan cukai mengikuti SE-15/BC/2025.",
    ],
    traps: [
      "Ketiganya berdekatan dalam praktik, tetapi dasar dan konteks layanannya berbeda.",
      "Informasi publik tidak identik dengan seluruh informasi kepabeanan dan cukai.",
    ],
    sourceLabel: "Layanan Informasi Bravo",
    sourceUrl: drive.information,
  },
  {
    id: "layanan-channel",
    topic: "Layanan Informasi",
    title: "Tujuh saluran layanan",
    memoryCode: "Kontak–Tel–Medsos–Email–Desk–Surat–Resmi",
    summary:
      "Saluran layanan mencakup contact center, telepon, media sosial, surat elektronik, information desk, surat, dan jalur resmi lainnya.",
    keyPoints: [
      "Contact center adalah pusat interaksi layanan organisasi.",
      "Dalam arti luas, interaksi tidak hanya melalui telepon.",
      "Contact center merupakan bagian dari Customer Relationship Management.",
    ],
    traps: [
      "Webchat disebut sebagai bentuk komunikasi luas, tetapi daftar tujuh saluran menempatkannya dalam kanal layanan yang dikelola.",
      "Information desk dan contact center bukan istilah yang selalu dapat saling menggantikan.",
    ],
    sourceLabel: "Layanan Informasi Bravo",
    sourceUrl: drive.information,
  },
  {
    id: "layanan-split",
    topic: "Layanan Informasi",
    title: "Aplikasi SPLIT",
    memoryCode: "Aturan – FAQ – Catat",
    summary:
      "SPLIT mendukung pencarian peraturan, basis FAQ, serta pencatatan dan kategorisasi layanan informasi.",
    keyPoints: [
      "Dasar yang disebut materi: SE-16/BC/2020.",
      "Basis FAQ terintegrasi dengan Kemenkeupedia.",
      "SPLIT bukan sekadar aplikasi pencatatan panggilan.",
    ],
    traps: [
      "SE-15/BC/2025 adalah dasar layanan informasi; SE-16/BC/2020 disebut pada fungsi SPLIT.",
      "Jangan menukar FAQ dengan database peraturan.",
    ],
    sourceLabel: "Layanan Informasi Bravo",
    sourceUrl: drive.information,
  },
  {
    id: "layanan-quality",
    topic: "Layanan Informasi",
    title: "Bobot kualitas layanan inbound",
    memoryCode: "A-S-K = 30-45-25",
    summary:
      "Penilaian layanan inbound memisahkan Attitude, Skill, dan Knowledge dengan total maksimum 100.",
    keyPoints: [
      "Attitude: maksimum 30.",
      "Skill: maksimum 45.",
      "Knowledge: maksimum 25.",
    ],
    traps: [
      "Bagian materi menampilkan angka 45 dekat judul Knowledge, tetapi rumus total menegaskan 30 + 45 + 25.",
      "Bobot e-mail berbeda dari struktur inbound.",
    ],
    sourceLabel: "Layanan Informasi Bravo",
    sourceUrl: drive.information,
  },
  {
    id: "layanan-hold",
    topic: "Layanan Informasi",
    title: "Standar hold time",
    memoryCode: "3,5 lalu minta izin",
    summary:
      "Standar hold adalah 3,5 menit; jika perlu lebih lama, petugas meminta kesediaan pengguna layanan.",
    keyPoints: [
      "Jangan menggunakan mute sebagai pengganti prosedur hold.",
      "Waktu tambahan memerlukan kesediaan pengguna layanan.",
      "Mengelola hold time berada pada parameter Skill.",
    ],
    traps: [
      "Angka tepatnya 3,5 menit, bukan 3 atau 5 menit.",
      "Kesediaan diminta ketika melebihi standar, bukan setelah percakapan berakhir.",
    ],
    sourceLabel: "Layanan Informasi Bravo",
    sourceUrl: drive.information,
  },
  {
    id: "layanan-email",
    topic: "Layanan Informasi",
    title: "Skor kualitas e-mail",
    memoryCode: "25 + 15 + 35 + 10 + 15",
    summary:
      "Komponen penilaian e-mail menjumlah menjadi 100: waktu, sistematika, ketepatan, dasar hukum, dan atribut interaksi.",
    keyPoints: [
      "Waktu maksimal 25.",
      "Format sistematis/ringkas/jelas 15; ketepatan informasi 35.",
      "Dasar hukum 10; atribut interaksi 15.",
    ],
    traps: [
      "Ketepatan informasi adalah bobot terbesar, 35.",
      "Dasar hukum bukan 15; nilainya 10.",
    ],
    sourceLabel: "Layanan Informasi Bravo",
    sourceUrl: drive.information,
  },
  {
    id: "ai-verifikasi",
    topic: "AI dalam Probis",
    title: "AI membantu, manusia memutuskan",
    memoryCode: "Minta – Uji – Rujuk – Putus",
    summary:
      "Gunakan AI untuk mempercepat analisis, tetapi verifikasi fakta, angka, dan dasar hukum sebelum hasil dipakai dalam proses bisnis.",
    keyPoints: [
      "Pisahkan fakta sumber, analisis, dan asumsi.",
      "Cocokkan nomor, tahun, status berlaku, serta bunyi ketentuan dengan sumber resmi.",
      "Keputusan dan akuntabilitas tetap pada pejabat/pegawai yang berwenang.",
    ],
    traps: [
      "Jawaban yang fasih belum tentu benar atau terbaru.",
      "AI bukan sumber hukum dan tidak menggantikan kewenangan formal.",
    ],
    sourceLabel: "Sharing Session AI dalam Probis Kepabeanan dan Cukai",
    sourceUrl: drive.ai,
  },
  {
    id: "ai-data",
    topic: "AI dalam Probis",
    title: "Pagar data saat memakai AI",
    memoryCode: "Minimalkan – Samarkan – Batasi",
    summary:
      "Masukkan hanya data yang diperlukan, hindari data rahasia/pribadi yang tidak relevan, dan ikuti kanal serta kebijakan organisasi.",
    keyPoints: [
      "Data minimization: hanya data minimum untuk tujuan yang jelas.",
      "Anonimisasi atau samarkan identitas bila konteks tidak memerlukannya.",
      "Periksa hak akses, klasifikasi informasi, dan tujuan penggunaan.",
    ],
    traps: [
      "Menghapus nama belum selalu cukup bila kombinasi data masih mengidentifikasi orang.",
      "Kemudahan teknis tidak sama dengan izin pemrosesan.",
    ],
    sourceLabel: "Sharing Session AI dalam Probis Kepabeanan dan Cukai",
    sourceUrl: drive.ai,
  },
  {
    id: "ppid-waktu",
    topic: "PPID",
    title: "Pola waktu layanan informasi publik",
    memoryCode: "10 + 7 hari kerja",
    summary:
      "Permohonan informasi publik dijawab paling lambat 10 hari kerja dan dapat diperpanjang 7 hari kerja dengan alasan tertulis.",
    keyPoints: [
      "Satuan waktu adalah hari kerja.",
      "Perpanjangan bukan otomatis; harus disertai alasan tertulis.",
      "Keberatan memiliki jalur dan tenggat tersendiri.",
    ],
    traps: [
      "10 + 7 bukan 10 + 14.",
      "Hari kalender adalah pengecoh yang sering muncul.",
    ],
    sourceLabel: "UU 14 Tahun 2008 dan PMK 110/PMK.01/2022",
    sourceUrl:
      "https://drive.google.com/file/d/14DH721LnIZv8oa1F6zpWOVrJVEBt5Q8c/view",
  },
  {
    id: "ki-three-lines",
    topic: "Kepatuhan Internal",
    title: "Tiga lini pertahanan",
    memoryCode: "Pemilik – Pengawas – Penjamin",
    summary:
      "Lini pertama memiliki dan mengelola risiko; lini kedua membina serta memantau; lini ketiga memberi assurance independen.",
    keyPoints: [
      "Lini pertama: unit operasional/pemilik risiko.",
      "Lini kedua: fungsi manajemen risiko dan kepatuhan internal.",
      "Lini ketiga: audit internal.",
    ],
    traps: [
      "UKI bukan pengganti tanggung jawab pemilik risiko.",
      "Audit internal tidak menjadi pelaksana kontrol harian.",
    ],
    sourceLabel: "Materi Tugas dan Fungsi UKI DJBC",
    sourceUrl:
      "https://docs.google.com/presentation/d/1i0uBbYekqDf2zVSNNqfrgEj864y_Q9PX/edit",
  },
  {
    id: "organisasi-peran",
    topic: "Organisasi, Sejarah & Logo",
    title: "Empat peran utama DJBC",
    memoryCode: "Fasilitasi – Industri – Lindungi – Pungut",
    summary:
      "Peran DJBC diringkas sebagai trade facilitator, industrial assistance, community protector, dan revenue collector.",
    keyPoints: [
      "Trade facilitator memfasilitasi perdagangan.",
      "Industrial assistance mendukung industri.",
      "Community protector melindungi masyarakat; revenue collector mengoptimalkan penerimaan.",
    ],
    traps: [
      "Community protector bukan sekadar penegakan hukum tanpa dimensi perlindungan.",
      "Revenue collector bukan satu-satunya peran DJBC.",
    ],
    sourceLabel: "Semua Tentang Bea Cukai",
    sourceUrl:
      "https://drive.google.com/file/d/1F-2tFGm65n981KMF0smPNg2hZPnNkJ3U/view",
  },
  {
    id: "komunikasi-se15",
    topic: "Komunikasi & Penyuluhan",
    title: "Bedakan SE-14 dan SE-15 Tahun 2025",
    memoryCode: "14 Internal – 15 Informasi",
    summary:
      "SE-14/BC/2025 mengatur komunikasi internal; SE-15/BC/2025 mengatur pemberian dan layanan informasi DJBC.",
    keyPoints: [
      "Nomornya berurutan dan sangat mudah tertukar.",
      "SE-15 menjadi rujukan definisi dan jenis layanan informasi dalam materi Bravo.",
      "Baca nomor sekaligus judul, bukan nomor saja.",
    ],
    traps: [
      "Menukar angka 14 dan 15 mengubah ruang lingkup aturan.",
      "Komunikasi internal tidak identik dengan layanan informasi kepada pengguna jasa.",
    ],
    sourceLabel: "SE-14/BC/2025 dan SE-15/BC/2025",
    sourceUrl:
      "https://drive.google.com/file/d/1V31w7_BRSAfdhmqTEvkZQ22eO46Kqldk/view",
  },
];
