import type { Question, QuizOption } from "./questions";

type Flashcard = { stem: string; answer: string };

const flashcards: Flashcard[] = [{"stem":"Apa tujuan utama dari manajemen kinerja di lingkungan Kementerian Keuangan berdasarkan KMK 127/2026?","answer":"Mengoptimalkan sumber daya untuk meningkatkan kinerja organisasi dan pegawai dalam rangka mencapai tujuan organisasi."},{"stem":"Sebutkan 5 prinsip manajemen kinerja di lingkungan Kementerian Keuangan.","answer":"Objektif, Terukur, Akuntabel, Partisipatif, dan Transparan."},{"stem":"Prinsip manajemen kinerja yang menyatakan bahwa proses harus sesuai dengan keadaan yang sebenarnya disebut prinsip _____.","answer":"Objektif"},{"stem":"Apa perbedaan antara manajemen kinerja organisasi dan manajemen kinerja pegawai?","answer":"Manajemen kinerja organisasi fokus pada pencapaian tujuan organisasi, sedangkan manajemen kinerja pegawai fokus pada tugas, perilaku, dan disiplin kerja pegawai."},{"stem":"Berdasarkan strukturnya, Komite Manajemen Kinerja terdiri atas tiga bagian, yaitu _____.","answer":"Komite Eksekutif, Komite Pelaksana, dan Sekretariat Komite."},{"stem":"Siapakah yang menjabat sebagai Ketua Komite Eksekutif Manajemen Kinerja?","answer":"Menteri Keuangan"},{"stem":"Siapakah yang menjabat sebagai Ketua Komite Pelaksana Manajemen Kinerja?","answer":"Sekretaris Jenderal"},{"stem":"Sebutkan dua jabatan dalam Sekretariat Komite yang masing-masing membidangi manajemen kinerja organisasi dan pegawai.","answer":"Kepala Biro Perencanaan dan Keuangan (Organisasi) dan Kepala Biro Sumber Daya Manusia (Pegawai)."},{"stem":"Kepanjangan dari UPK dalam struktur manajemen kinerja adalah _____.","answer":"Unit Pemilik Kinerja"},{"stem":"Unit organisasi tingkat apa yang diklasifikasikan sebagai UPK-One?","answer":"Unit organisasi yang dipimpin oleh Pejabat Pimpinan Tinggi Madya atau Unit Organisasi Non Eselon di bawah Menteri."},{"stem":"Unit organisasi tingkat apa yang diklasifikasikan sebagai UPK-Three?","answer":"Kantor pelayanan dan Unit Pelaksana Teknis yang dipimpin oleh Pejabat Administrator."},{"stem":"Sebutkan tiga tahapan dalam kerangka kerja sistem manajemen kinerja.","answer":"Perumusan sistem, implementasi, serta pemantauan dan evaluasi sistem."},{"stem":"Implementasi manajemen kinerja terdiri atas empat proses utama, yaitu _____.","answer":"Perencanaan, pelaksanaan, evaluasi, serta pelaporan dan pemanfaatan."},{"stem":"Dokumen perencanaan kinerja untuk tingkat organisasi disebut _____, sedangkan untuk tingkat pegawai disebut _____.","answer":"Perjanjian Kinerja (PK); Sasaran Kinerja Pegawai (SKP)."},{"stem":"Apa output utama dari evaluasi kinerja organisasi?","answer":"Nilai Kinerja Organisasi (NKO) dan Predikat NKO."},{"stem":"Apa output utama dari penilaian kinerja pegawai?","answer":"Nilai Kinerja Pegawai (NKP) dan Predikat Kinerja Pegawai."},{"stem":"Dalam menghitung NKP, faktor apa saja yang diperhatikan selain hasil kerja pegawai?","answer":"Nilai Hukuman Disiplin, Nilai Dampak Pelanggaran Disiplin, Nilai Koreksi, dan NKO."},{"stem":"Sistem manajemen kinerja organisasi di Kementerian Keuangan menggunakan basis kerangka kerja _____.","answer":"Balanced Scorecard (BSC)"},{"stem":"Sebutkan empat perspektif dalam Peta Strategi Balanced Scorecard (BSC) Kementerian Keuangan.","answer":"Stakeholder, Customer, Internal Business Process, dan Learning and Growth."},{"stem":"Apa definisi dari Sasaran Strategis (SS)?","answer":"Pernyataan mengenai apa yang harus dimiliki, dijalankan, dihasilkan, atau dicapai oleh organisasi."},{"stem":"Apa syarat perumusan Sasaran Strategis (SS) yang baik?","answer":"Singkat dan jelas, merefleksikan kondisi ideal/realistis, dan ditulis dalam bentuk pernyataan kondisional (kualitatif)."},{"stem":"Prinsip penyusunan Indikator Kinerja Utama (IKU) harus memenuhi kriteria SMART-C. Apa kepanjangan dari SMART-C?","answer":"Specific, Measurable, Agreeable, Realistic, Time-bounded, dan Continuously Improved."},{"stem":"Dalam kualitas IKU, validitas dibagi menjadi tiga tingkat, yaitu _____.","answer":"Exact, Proxy, dan Activity."},{"stem":"Apa perbedaan antara validitas IKU tingkat 'Exact' dan 'Proxy'?","answer":"Exact mengukur langsung keberhasilan Sasaran Strategis, sedangkan Proxy mengukur secara tidak langsung atau hanya sebagian."},{"stem":"Tingkat kendali IKU dibagi menjadi tiga tingkatan, yaitu _____.","answer":"High, Moderate, dan Low."},{"stem":"Berapakah jumlah maksimal IKU yang diperbolehkan dalam PK tingkat UPK-One?","answer":"25 IKU"},{"stem":"Jenis konsolidasi periode yang menjumlahkan target atau realisasi sampai dengan periode pelaporan disebut _____.","answer":"Sum"},{"stem":"Jenis konsolidasi periode 'Take Last Known Value' (TLKV) berarti _____.","answer":"Kinerja sampai dengan periode pelaporan sama dengan kinerja pada periode terakhir tersebut (akumulatif/progresif)."},{"stem":"Sebutkan tiga jenis polarisasi data IKU.","answer":"Maximize, Minimize, dan Stabilize."},{"stem":"Polarisasi IKU yang menganggap capaian semakin baik jika realisasi mendekati target dalam rentang tertentu disebut _____.","answer":"Stabilize"},{"stem":"Apa tujuan dari penyusunan Manual IKU?","answer":"Memberikan penjelasan detail mengenai definisi, formula, tujuan, dan mekanisme pengukuran suatu IKU."},{"stem":"Kegiatan terobosan yang digunakan untuk mencapai target IKU dan berimplikasi pada pencapaian Sasaran Strategis disebut _____.","answer":"Inisiatif Strategis (IS)"},{"stem":"Proses penjabaran Sasaran Strategis atau IKU secara vertikal dari level unit yang lebih tinggi ke level yang lebih rendah disebut _____.","answer":"Cascading"},{"stem":"Apa perbedaan antara 'Fully Cascading' dan 'Partially Cascading'?","answer":"Fully cascading adalah penurunan IKU secara penuh dengan nama/target identik, sedangkan partially cascading adalah pendistribusian target ke beberapa unit di bawahnya."},{"stem":"IKU yang berasal dari mandat UPK di atasnya dan wajib dimasukkan dalam PK unit di bawahnya disebut _____.","answer":"IKU Mandatory"},{"stem":"Apa tujuan dari proses 'Alignment' dalam manajemen kinerja?","answer":"Menyelaraskan Sasaran Strategis atau IKU secara horizontal antar unit yang selevel agar tercipta sinergi."},{"stem":"Berapa kali minimal Dialog Kinerja dan Risiko Organisasi harus dilaksanakan dalam setahun pada level UPK?","answer":"Paling sedikit setiap triwulan."},{"stem":"Perubahan sebagian informasi pada PK yang telah ditandatangani, seperti target atau trajectory, disebut _____.","answer":"Adendum Perjanjian Kinerja"},{"stem":"Berapakah nilai maksimum capaian sebuah IKU?","answer":"120"},{"stem":"Apa itu Nilai Kualitas Komitmen Kinerja (K3)?","answer":"Nilai rata-rata dari bobot kualitas IKU dan bobot kualitas target IKU."},{"stem":"Bagaimana kriteria Nilai K3 dikelompokkan?","answer":"Sangat berkualitas (X > 1), Berkualitas (X = 1), dan Cukup berkualitas (X < 1)."},{"stem":"Formula umum Nilai Kinerja Organisasi (NKO) adalah _____.","answer":"NKO = jumlah dari Nilai Perspektif dikali Bobot Perspektif."},{"stem":"Predikat NKO 'Sangat Baik' diberikan jika nilai NKO mencapai _____.","answer":"X ≥ 110"},{"stem":"Predikat NKO 'Buruk' diberikan jika nilai NKO berada pada rentang _____.","answer":"0 < X < 80"},{"stem":"Aspek perilaku kerja pegawai di Kementerian Keuangan didasarkan pada Core Values ASN, yaitu _____.","answer":"BerAKHLAK (Berorientasi Pelayanan, Akuntabel, Kompeten, Harmonis, Loyal, Adaptif, dan Kolaboratif)."},{"stem":"Sebutkan empat aspek indikator yang dapat digunakan untuk mengukur Indikator Kinerja Individu (IKI).","answer":"Kuantitas, Kualitas, Waktu, dan Biaya."},{"stem":"Berapakah jumlah maksimal IKI dalam SKP untuk pejabat Pelaksana?","answer":"6 IKI"},{"stem":"Batas waktu penetapan SKP di lingkungan Kementerian Keuangan setiap tahunnya adalah _____.","answer":"Paling lambat tanggal 31 Januari."},{"stem":"Bagi pegawai Tugas Belajar (TB), apa saja jenis IKI yang wajib dimiliki?","answer":"Penugasan terkait program pembelajaran, hasil evaluasi akademik (IP/IPK), dan ketepatan waktu kelulusan."},{"stem":"Berapakah target indeks untuk IKI 'Ketepatan Waktu Kelulusan' bagi pegawai Tugas Belajar?","answer":"100"},{"stem":"Apa yang dimaksud dengan 'Re-Entry Program' bagi pegawai yang selesai Tugas Belajar?","answer":"Program penugasan kembali ke unit kerja, seperti magang atau secondment, sebelum menempati jabatan tetap."},{"stem":"Siapa yang berwenang menetapkan NKO dan Predikat NKO untuk tingkat UPK-One?","answer":"Sekretaris Jenderal atas nama Menteri Keuangan."},{"stem":"Kapan Laporan Kinerja Instansi Pemerintah tingkat Kementerian wajib disampaikan kepada instansi terkait?","answer":"Maksimal 2 bulan setelah tahun anggaran berakhir."},{"stem":"Dalam BSC, perspektif apa yang merefleksikan perbaikan proses internal untuk memberikan nilai tambah bagi stakeholder?","answer":"Perspektif Internal Business Process."},{"stem":"Dalam SKP Pimpinan UPK, perspektif 'Learning and Growth' pada Peta Strategi berubah nama menjadi perspektif _____.","answer":"Penguatan Internal dan Anggaran"},{"stem":"Berapakah bobot perspektif 'Stakeholder' dalam penghitungan NKO?","answer":"30%"},{"stem":"Jika realisasi IKU melebihi target pada polarisasi 'Minimize', bagaimana dampaknya terhadap capaian kinerja?","answer":"Capaian kinerja dianggap semakin buruk."},{"stem":"Dalam Manual IKU, apa fungsi dari kolom 'Tujuan'?","answer":"Menjelaskan alasan mengapa IKU tersebut perlu diukur."},{"stem":"Apa kriteria IKU yang memiliki validitas 'Activity'?","answer":"IKU yang keterkaitannya masih jauh dengan Sasaran Strategis dan umumnya mengukur proses atau input."},{"stem":"Tingkat kendali 'Low' pada IKU berarti _____.","answer":"Pencapaian target dipengaruhi secara dominan oleh pihak selain pemilik IKU."},{"stem":"Apa konsekuensi negatif yang dapat disepakati dalam SKP jika hasil kerja tidak memenuhi ekspektasi?","answer":"Pemberian teguran dan/atau pengalihan penugasan."},{"stem":"Berapakah angka minimum capaian suatu IKU atau subIKU?","answer":"0"},{"stem":"Siapa yang menjabat sebagai Administrator Kinerja Organisasi Pusat (AKOP)?","answer":"Pejabat Administrator atau Fungsional setara yang menangani manajemen kinerja organisasi di Biro Perencanaan dan Keuangan."},{"stem":"Apa yang dimaksud dengan 'Refinement' dalam penyusunan PK?","answer":"Proses perbaikan dan peningkatan kualitas perumusan kinerja melalui diskusi dan analisis."},{"stem":"Dokumen yang memuat data informasi terkait kinerja dan risiko unit secara terintegrasi disebut _____.","answer":"Laporan Pemantauan Kinerja dan Risiko (LPKR)"},{"stem":"Status kinerja 'Hijau' diberikan jika nilai capaian (X) adalah _____.","answer":"X ≥ 100"},{"stem":"Berapa lama jangka waktu penyimpanan dokumen manajemen kinerja organisasi?","answer":"3 tahun"}];

function answerKind(answer: string) {
  if (/\d|%|≥|<|>/.test(answer)) return "number";
  if (answer.includes(",") || answer.includes(" dan ") || answer.includes(";")) return "list";
  return answer.split(/\s+/).length <= 6 ? "term" : "definition";
}

function semanticGroup(stem: string) {
  const text = stem.toLowerCase();
  if (/prinsip manajemen|objektif|terukur|akuntabel|partisipatif|transparan/.test(text)) return "principles";
  if (/komite|ketua|sekretariat|upk|unit pemilik|akop|kewenangan/.test(text)) return "governance";
  if (/tahapan|implementasi|dokumen perencanaan|pk dan skp/.test(text)) return "cycle";
  if (/nko|nkp|hasil kerja|hukuman disiplin|nilai koreksi|predikat|status kinerja/.test(text)) return "evaluation";
  if (/balanced scorecard|bsc|perspektif/.test(text)) return "strategy-bsc";
  if (/sasaran strategis/.test(text)) return "strategy-ss";
  if (/smart-c|validitas|kendali|jumlah maksimal iku|kualitas komitmen|k3/.test(text)) return "iku-quality";
  if (/konsolidasi|polarisasi|manual iku|nilai maksimum capaian|angka minimum capaian/.test(text)) return "iku-measurement";
  if (/cascading|alignment|mandatory|refinement|inisiatif strategis|adendum/.test(text)) return "alignment";
  if (/dialog kinerja|laporan kinerja|lpkr|penyimpanan dokumen/.test(text)) return "monitoring";
  if (/iki|skp|tugas belajar|re-entry|perilaku kerja|berakhlak/.test(text)) return "employee";
  return "general";
}

const distractorLibrary: Record<string, Flashcard[]> = {
  principles: [
    { stem: "Daftar pengecoh yang mengganti prinsip Akuntabel dengan Efisien.", answer: "Objektif, Terukur, Efisien, Partisipatif, dan Transparan." },
    { stem: "Daftar pengecoh yang mengganti prinsip Partisipatif dengan Fleksibel.", answer: "Objektif, Terukur, Akuntabel, Fleksibel, dan Transparan." },
    { stem: "Daftar pengecoh yang mengganti prinsip Transparan dengan Adaptif.", answer: "Objektif, Terukur, Akuntabel, Partisipatif, dan Adaptif." },
    { stem: "Prinsip yang menekankan kemampuan mengukur kinerja secara kuantitatif atau kualitatif.", answer: "Terukur" },
    { stem: "Prinsip yang menekankan pertanggungjawaban hasil kepada pejabat berwenang.", answer: "Akuntabel" },
    { stem: "Prinsip yang menekankan keterbukaan proses dan hasil.", answer: "Transparan" },
  ],
  governance: [
    { stem: "Daftar pengecoh struktur Komite yang mengganti Sekretariat Komite.", answer: "Komite Eksekutif, Komite Pelaksana, dan Komite Pengawas." },
    { stem: "Daftar pengecoh struktur Komite yang mengganti Komite Eksekutif.", answer: "Komite Pengarah, Komite Pelaksana, dan Sekretariat Komite." },
    { stem: "Daftar pengecoh struktur Komite yang menambah satu unsur.", answer: "Komite Eksekutif, Komite Pelaksana, Sekretariat Komite, dan Tim Penilai." },
    { stem: "Ketua Komite Eksekutif Manajemen Kinerja.", answer: "Menteri Keuangan" },
    { stem: "Ketua Komite Pelaksana Manajemen Kinerja.", answer: "Sekretaris Jenderal" },
    { stem: "Unit pimpinan Pejabat Pimpinan Tinggi Pratama, termasuk Kantor Wilayah.", answer: "UPK-Two" },
    { stem: "Unit kantor pelayanan atau UPT yang dipimpin Pejabat Administrator.", answer: "UPK-Three" },
    { stem: "Pejabat yang menangani kinerja organisasi pada Sekretariat Komite.", answer: "Kepala Biro Perencanaan dan Keuangan" },
  ],
  cycle: [
    { stem: "Empat proses implementasi manajemen kinerja.", answer: "Perencanaan, pelaksanaan, evaluasi, serta pelaporan dan pemanfaatan." },
    { stem: "Tiga tahap kerangka kerja sistem manajemen kinerja.", answer: "Perumusan sistem, implementasi, serta pemantauan dan evaluasi sistem." },
    { stem: "Dokumen perencanaan organisasi dan pegawai.", answer: "Perjanjian Kinerja (PK) dan Sasaran Kinerja Pegawai (SKP)." },
    { stem: "Daftar pengecoh yang menukar urutan implementasi.", answer: "Evaluasi, perencanaan, pelaporan, lalu pelaksanaan." },
  ],
  evaluation: [
    { stem: "Bobot awal hasil dan perilaku kerja pegawai.", answer: "NHK 75% + NPK 25%." },
    { stem: "Hasil ≥ NKO untuk pimpinan, satu tingkat di bawah, dan JF substansi.", answer: "NKO 50% + hasil penghitungan 50%." },
    { stem: "Hasil ≥ NKO untuk dua tingkat atau lebih di bawah dan JF non-substansi.", answer: "NKO 30% + hasil penghitungan 70%." },
    { stem: "Hasil penghitungan pegawai lebih rendah daripada NKO.", answer: "NKO 10% + hasil penghitungan 90%." },
    { stem: "Batas predikat NKO Sangat Baik.", answer: "X ≥ 110" },
  ],
  "strategy-bsc": [
    { stem: "Empat perspektif BSC Kementerian Keuangan.", answer: "Stakeholder, Customer, Internal Business Process, dan Learning and Growth." },
    { stem: "Daftar pengecoh yang mengganti perspektif Customer.", answer: "Stakeholder, Public Service, Internal Business Process, dan Learning and Growth." },
    { stem: "Daftar pengecoh yang mengganti perspektif Learning and Growth.", answer: "Stakeholder, Customer, Internal Business Process, dan Financial." },
    { stem: "Daftar pengecoh yang menukar dua perspektif dengan fungsi manajemen.", answer: "Stakeholder, Customer, Risk Management, dan Human Resources." },
    { stem: "Perspektif untuk sumber daya dan kapabilitas internal.", answer: "Learning and Growth" },
    { stem: "Perspektif untuk proses internal pemberi nilai tambah.", answer: "Internal Business Process" },
  ],
  "strategy-ss": [
    { stem: "Pernyataan kondisi ideal yang ingin dicapai organisasi.", answer: "Sasaran Strategis" },
    { stem: "Syarat pengecoh yang membuat Sasaran Strategis terlalu prosedural.", answer: "Rinci dan teknis, menggambarkan tahapan kerja, serta ditulis secara kuantitatif." },
    { stem: "Syarat pengecoh yang membuat Sasaran Strategis normatif.", answer: "Panjang dan normatif, memuat banyak kegiatan, serta dinyatakan dengan angka target." },
    { stem: "Syarat pengecoh yang mencampur Sasaran Strategis dengan IKU.", answer: "Spesifik dan numerik, memuat formula penghitungan, serta dinyatakan dalam satuan ukur." },
  ],
  "iku-quality": [
    { stem: "Validitas yang mengukur Sasaran Strategis secara langsung.", answer: "Exact" },
    { stem: "Validitas yang hanya mewakili sebagian pencapaian Sasaran Strategis.", answer: "Proxy" },
    { stem: "Validitas yang umumnya mengukur proses atau input.", answer: "Activity" },
    { stem: "Kendali yang dominan berada pada pemilik IKU.", answer: "High" },
    { stem: "Kendali yang dominan dipengaruhi pihak selain pemilik IKU.", answer: "Low" },
    { stem: "Batas maksimal IKU UPK-One, UPK-Two, dan UPK-Three.", answer: "25, 20, dan 15 IKU." },
  ],
  "iku-measurement": [
    { stem: "Konsolidasi periode yang menjumlahkan nilai setiap periode.", answer: "Sum" },
    { stem: "Konsolidasi periode yang mengambil nilai periode terakhir secara akumulatif.", answer: "Take Last Known Value (TLKV)" },
    { stem: "Polarisasi saat realisasi yang lebih tinggi dinilai lebih baik.", answer: "Maximize" },
    { stem: "Polarisasi saat realisasi yang lebih rendah dinilai lebih baik.", answer: "Minimize" },
    { stem: "Polarisasi saat realisasi yang mendekati target dinilai lebih baik.", answer: "Stabilize" },
  ],
  alignment: [
    { stem: "Penjabaran vertikal sasaran atau IKU ke unit lebih rendah.", answer: "Cascading" },
    { stem: "Penyelarasan horizontal antarunit yang setingkat.", answer: "Alignment" },
    { stem: "Perbaikan kualitas perumusan kinerja melalui diskusi dan analisis.", answer: "Refinement" },
    { stem: "Perubahan sebagian informasi PK setelah ditandatangani.", answer: "Adendum Perjanjian Kinerja" },
    { stem: "Kegiatan terobosan untuk mempersempit celah pencapaian IKU.", answer: "Inisiatif Strategis" },
  ],
  monitoring: [
    { stem: "Dokumen terintegrasi mengenai kinerja dan risiko unit.", answer: "Laporan Pemantauan Kinerja dan Risiko (LPKR)" },
    { stem: "Frekuensi minimum Dialog Kinerja dan Risiko Organisasi.", answer: "Paling sedikit setiap triwulan." },
    { stem: "Batas penyampaian Laporan Kinerja Instansi Pemerintah tingkat Kementerian.", answer: "Maksimal 2 bulan setelah tahun anggaran berakhir." },
    { stem: "Jangka penyimpanan dokumen manajemen kinerja organisasi.", answer: "3 tahun" },
  ],
  employee: [
    { stem: "Empat aspek indikator IKI.", answer: "Kuantitas, Kualitas, Waktu, dan Biaya." },
    { stem: "Jumlah maksimal IKI bagi Pelaksana.", answer: "6 IKI" },
    { stem: "Batas penetapan SKP tahunan.", answer: "Paling lambat tanggal 31 Januari." },
    { stem: "IKI wajib bagi pegawai Tugas Belajar.", answer: "Penugasan pembelajaran, hasil akademik, dan ketepatan waktu kelulusan." },
    { stem: "Daftar pengecoh IKI Tugas Belajar yang mengganti hasil akademik.", answer: "Penugasan pembelajaran, jumlah kehadiran, dan ketepatan waktu kelulusan." },
    { stem: "Daftar pengecoh IKI Tugas Belajar yang mengganti ketepatan kelulusan.", answer: "Penugasan pembelajaran, hasil akademik, dan jumlah kegiatan organisasi." },
    { stem: "Penugasan kembali setelah selesai Tugas Belajar.", answer: "Re-Entry Program" },
  ],
  general: [
    { stem: "Tujuan manajemen kinerja.", answer: "Mengoptimalkan sumber daya untuk meningkatkan kinerja organisasi dan pegawai." },
    { stem: "Fokus manajemen kinerja organisasi.", answer: "Pencapaian tujuan organisasi dalam periode tertentu." },
    { stem: "Fokus manajemen kinerja pegawai.", answer: "Tugas individu, perilaku kerja, dan disiplin pegawai." },
    { stem: "Kerangka utama sistem kinerja organisasi.", answer: "Balanced Scorecard" },
    { stem: "Tujuan pengecoh yang hanya berorientasi administrasi.", answer: "Menyeragamkan dokumen administratif tanpa mengaitkannya dengan pencapaian tujuan organisasi." },
    { stem: "Tujuan pengecoh yang hanya berorientasi individu.", answer: "Mengukur perilaku pegawai tanpa memperhitungkan kinerja organisasi dan hasil kerja." },
    { stem: "Tujuan pengecoh yang hanya berorientasi anggaran.", answer: "Mengoptimalkan penyerapan anggaran tanpa mengukur efektivitas pencapaian sasaran." },
  ],
};

function numericDistractors(card: Flashcard): Flashcard[] {
  const match = card.answer.match(/\d+/);
  if (!match || Number(match[0]) === 0) return [];
  const value = Number(match[0]);
  const step = value >= 100 ? 10 : value >= 20 ? 5 : value >= 10 ? 2 : 1;
  const values = [Math.max(0, value - step), value + step, value + step * 2];
  return values.map((candidate) => ({
    stem: `Angka pengecoh; ketentuan yang benar untuk kondisi pada soal adalah ${card.answer}.`,
    answer: card.answer.replace(match[0], String(candidate)),
  }));
}

function distractorsFor(card: Flashcard) {
  const kind = answerKind(card.answer);
  const group = semanticGroup(card.stem);
  const uniqueCandidates = (candidates: Flashcard[]) => candidates.filter(
    (candidate, candidateIndex) =>
      candidates.findIndex(({ answer }) => answer === candidate.answer) === candidateIndex,
  );
  const sameGroup = uniqueCandidates([
    ...(distractorLibrary[group] ?? []),
    ...flashcards.filter((candidate) => semanticGroup(candidate.stem) === group),
  ].filter((candidate) => candidate.answer !== card.answer));
  const sameKind = sameGroup.filter((candidate) => answerKind(candidate.answer) === kind);
  const kindFallback = uniqueCandidates(flashcards.filter(
    (candidate) => candidate.answer !== card.answer && answerKind(candidate.answer) === kind,
  ));
  const numericPool = numericDistractors(card);
  const pool = numericPool.length >= 3
    ? numericPool
    : sameKind.length >= 3
    ? sameKind
    : sameGroup.length >= 3
      ? sameGroup
      : kindFallback;
  const selected: Flashcard[] = [];
  for (let step = 0; selected.length < 3 && step < pool.length * 2; step += 1) {
    const candidate = pool[step % pool.length];
    if (!selected.some(({ answer }) => answer === candidate.answer)) selected.push(candidate);
  }
  return selected;
}

export const kmk127FlashcardQuestions: Question[] = flashcards.map((card, index) => {
  const notebookSources = [
    "notebookFlashcards",
    "notebookQuiz15",
    "notebookQuiz30",
  ] as const;
  const options: QuizOption[] = [
    [card.answer, `Benar. ${card.answer}`],
    ...distractorsFor(card).map(
      (distractor) => [
        distractor.answer,
        `Keliru. Jawaban tersebut tepat untuk pertanyaan “${distractor.stem}”. Untuk soal ini, jawaban yang tepat adalah: ${card.answer}`,
      ] as const,
    ),
  ];
  return {
    id: 2001 + index,
    topic: "Manajemen Kinerja",
    difficulty: index % 3 === 0 ? "Analitik" : "Menjebak",
    stem: card.stem,
    options,
    answer: 0,
    source: notebookSources[index % notebookSources.length],
    reference: `NotebookLM Kinerja dan Panduan Belajar KMK 127/2026 · kartu ${index + 1}`,
  };
});

export const kmk127FlashcardCount = flashcards.length;
