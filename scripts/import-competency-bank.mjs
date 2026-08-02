import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const [primaryPath, extendedPath, outputPath] = process.argv.slice(2);
const artifactToolEntry = process.env.ARTIFACT_TOOL_ENTRY;

if (!primaryPath || !extendedPath || !outputPath || !artifactToolEntry) {
  throw new Error(
    "Usage: ARTIFACT_TOOL_ENTRY=<artifact_tool.mjs> node scripts/import-competency-bank.mjs <primary.xlsx> <extended.xlsx> <output.json>",
  );
}

const { FileBlob, SpreadsheetFile } = await import(
  pathToFileURL(artifactToolEntry).href
);

const topicByCategory = {
  "Manajemen Kinerja": "Manajemen Kinerja",
  "Pengelolaan SDM": "Manajemen Talenta & SDM",
  "Manajemen Talenta": "Manajemen Talenta & SDM",
  "Disiplin Pegawai": "Disiplin & Kepegawaian",
  "Disiplin PNS": "Disiplin & Kepegawaian",
  "Penganggaran dan Perbendaharaan": "Keuangan & Pengadaan",
  "Pengelolaan BMN": "Umum, Rumah Tangga & BMN",
  "PPID dan Keterbukaan Informasi": "PPID",
  "Kehumasan dan Komunikasi Internal": "Komunikasi & Penyuluhan",
  "Layanan Informasi": "Layanan Informasi",
  "Organisasi dan Tusi DJBC": "Organisasi, Sejarah & Logo",
  "Kepatuhan Internal dan UKI": "Kepatuhan Internal",
  "Kepatuhan Internal": "Kepatuhan Internal",
  "AI dalam Proses Bisnis Kepabeanan": "AI dalam Probis",
};

const sourceByLabel = {
  "KMK 127 Tahun 2026": "kinerja2026",
  "Peningkatan Kompetensi Bidang SDM": "sdmAdmin",
  "Internalisasi PMK 38 Tahun 2025": "talenta38",
  "PMK 123 Tahun 2023": "pmk123",
  "PMK 41 Tahun 2026": "anggaran",
  "Siklus Pengelolaan BMN": "bmn2026",
  "PMK 110 Tahun 2022": "ppid",
  "Pedoman Pengelolaan Komunikasi Kemenkeu": "komunikasi",
  "SE-14/BC/2025 Komunikasi Internal": "se14",
  "SE-15/BC/2025 Pemberian dan Layanan Informasi": "se15",
  "Semua Tentang Bea Cukai": "organisasi",
  "Tusi UKI": "uki",
  "Sharing Session AI - Transformasi Digital dan Penerapan AI di Lingkungan Kepabeanan":
    "aiProbis",
};

function text(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function normalizeStem(value) {
  return text(value).replace(
    /^Seorang peserta merangkum materi [^.]+\.\s*/i,
    "",
  );
}

function makeOptionExplanation({ correct, key, discussion }) {
  if (correct) return discussion;
  return `Keliru. Kunci yang tepat adalah ${key}. ${discussion}`;
}

async function readSheetRows(filePath) {
  const input = await FileBlob.load(filePath);
  const workbook = await SpreadsheetFile.importXlsx(input);
  const sheet = workbook.worksheets.getItem("Bank Soal");
  const values = sheet.getUsedRange(true).values;
  const headers = values[0].map(text);
  return values.slice(1).map((row) =>
    Object.fromEntries(headers.map((header, index) => [header, row[index]])),
  );
}

function normalizePrimary(row, index) {
  const category = text(row.Kategori);
  const key = text(row.Kunci).toUpperCase();
  const answer = "ABCD".indexOf(key);
  const discussion = text(row.Pembahasan);
  const sourceLabel = text(row.Sumber);
  const topic = topicByCategory[category];
  const source = sourceByLabel[sourceLabel];

  if (!topic || !source || answer < 0) {
    throw new Error(`Baris bank utama ${index + 2} tidak dapat dipetakan.`);
  }

  return {
    bankId: `utama-${text(row.No)}`,
    topic,
    difficulty: "Menjebak",
    stem: normalizeStem(row.Soal),
    options: "ABCD".split("").map((letter, optionIndex) => [
      text(row[letter]),
      makeOptionExplanation({
        correct: optionIndex === answer,
        key,
        discussion,
      }),
    ]),
    answer,
    source,
    reference: [text(row.Lokasi), text(row["Tipologi Jebakan"])]
      .filter(Boolean)
      .join(" · "),
    originalSource: sourceLabel,
    originalUrl: text(row["URL Sumber"]),
  };
}

function normalizeExtended(row, index) {
  const category = text(row.Kompetensi);
  const key = text(row.Kunci).toUpperCase();
  const answer = "ABCD".indexOf(key);
  const discussion = text(row.Pembahasan);
  const topic = topicByCategory[category];

  if (!topic || answer < 0) {
    throw new Error(`Baris bank tambahan ${index + 2} tidak dapat dipetakan.`);
  }

  return {
    bankId: `tambahan-${text(row.No)}`,
    topic,
    difficulty: "Analitik",
    stem: normalizeStem(row.Soal),
    options: "ABCD".split("").map((letter, optionIndex) => [
      text(row[letter]),
      makeOptionExplanation({
        correct: optionIndex === answer,
        key,
        discussion,
      }),
    ]),
    answer,
    source: "extendedBank",
    reference: text(row.Referensi),
    originalSource: text(row.Referensi),
    originalUrl: "",
  };
}

const primaryRows = await readSheetRows(primaryPath);
const extendedRows = await readSheetRows(extendedPath);
const normalized = [
  ...primaryRows.map(normalizePrimary),
  ...extendedRows.map(normalizeExtended),
];

const exactKeys = new Set();
for (const [index, question] of normalized.entries()) {
  if (!question.stem || question.options.some(([option]) => !option)) {
    throw new Error(`Soal ${question.bankId} tidak lengkap.`);
  }
  if (new Set(question.options.map(([option]) => option)).size !== 4) {
    throw new Error(`Soal ${question.bankId} memiliki opsi duplikat.`);
  }
  if (!question.options.every(([, explanation]) => explanation)) {
    throw new Error(`Soal ${question.bankId} tidak memiliki pembahasan lengkap.`);
  }

  const exactKey = JSON.stringify([
    question.stem.toLocaleLowerCase("id-ID"),
    question.options.map(([option]) => option.toLocaleLowerCase("id-ID")),
  ]);
  if (exactKeys.has(exactKey)) {
    throw new Error(`Duplikasi identik ditemukan pada soal ${index + 1}.`);
  }
  exactKeys.add(exactKey);
}

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");

console.log(
  JSON.stringify({
    primary: primaryRows.length,
    extended: extendedRows.length,
    total: normalized.length,
    output: path.resolve(outputPath),
  }),
);
