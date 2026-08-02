import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { domains } from "./question-bank-spec.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));
const listJson = async (folder) => {
  const entries = await readdir(folder, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => entry.isDirectory() ? listJson(path.join(folder, entry.name)) : entry.name.endsWith(".json") ? [path.join(folder, entry.name)] : []));
  return nested.flat();
};
const normalize = (value) => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
const stopWords = new Set("ada adalah agar akan antara apa atau bagi bahwa belum berupa cara dalam dan dapat dari dengan di digunakan dilakukan ditetapkan harus ini itu jika juga kasus karena ketika kepada kembali langkah maka mana melalui menjadi oleh pada paling pihak perlu saat sebagai sebuah sebelum secara sedang sehingga sesuai setelah tetapi tidak untuk yang unit tim pegawai pimpinan keputusan proses tindakan pilihan hasil".split(" "));
const baseTokens = (value) => normalize(value).split(" ").filter((token) => token.length > 2 && !stopWords.has(token));
let corpusStopWords = new Set();
const tokens = (value) => baseTokens(value).filter((token) => !corpusStopWords.has(token));
const jaccard = (left, right) => {
  const a = new Set(tokens(left)); const b = new Set(tokens(right));
  const intersection = [...a].filter((token) => b.has(token)).length;
  return intersection / new Set([...a, ...b]).size;
};
const cosine = (left, right, documentFrequency, documentCount) => {
  const a = new Map(); const b = new Map();
  tokens(left).forEach((token) => a.set(token, (a.get(token) ?? 0) + 1));
  tokens(right).forEach((token) => b.set(token, (b.get(token) ?? 0) + 1));
  for (const [token, value] of a) a.set(token, value * (Math.log((documentCount + 1) / ((documentFrequency.get(token) ?? 0) + 1)) + 1));
  for (const [token, value] of b) b.set(token, value * (Math.log((documentCount + 1) / ((documentFrequency.get(token) ?? 0) + 1)) + 1));
  let dot = 0; let aa = 0; let bb = 0;
  for (const value of a.values()) aa += value * value;
  for (const value of b.values()) bb += value * value;
  for (const [token, value] of a) dot += value * (b.get(token) ?? 0);
  return dot / Math.sqrt(aa * bb || 1);
};
const counts = (items, key) => Object.fromEntries([...new Set(items.map((item) => item[key]))].sort().map((value) => [value, items.filter((item) => item[key] === value).length]));

const manifest = await readJson(path.join(root, "src/data/questions/manifest.json"));
const registry = await readJson(path.join(root, "src/data/sources/source-registry.json"));
const sourceMap = new Map(registry.map((source) => [source.sourceId, source]));
const activeFiles = (await listJson(path.join(root, "src/data/questions"))).filter((file) => !file.endsWith("manifest.json"));
const candidateFiles = await listJson(path.join(root, "src/data/question-candidates"));
const active = (await Promise.all(activeFiles.map(readJson))).flat();
const candidates = (await Promise.all(candidateFiles.map(readJson))).flat();
const stemFrequency = new Map();
for (const question of active) for (const token of new Set(baseTokens(question.stem))) stemFrequency.set(token, (stemFrequency.get(token) ?? 0) + 1);
corpusStopWords = new Set([...stemFrequency].filter(([, frequency]) => frequency / active.length >= 0.15).map(([token]) => token));
const combinedDocuments = active.map((question) => `${question.stem} ${question.options.map((option) => option.text).join(" ")}`);
const combinedFrequency = new Map();
for (const document of combinedDocuments) for (const token of new Set(tokens(document))) combinedFrequency.set(token, (combinedFrequency.get(token) ?? 0) + 1);
const errors = [];
const privacyFindings = [];

if (candidates.length < 1300) errors.push(`Kandidat kurang dari 1.300: ${candidates.length}`);
if (active.length < 1000) errors.push(`Soal aktif kurang dari 1.000: ${active.length}`);
if (manifest.activeCount !== active.length || manifest.candidateCount !== candidates.length) errors.push("Manifest tidak sesuai isi bank");
if (manifest.files.reduce((sum, file) => sum + file.count, 0) !== active.length) errors.push("Jumlah shard pada manifest tidak sesuai");

const allowedStatuses = new Set(["current", "non_normative"]);
const validCognitive = new Set(["remember", "apply", "analyze", "evaluate"]);
const validDifficulty = new Set(["easy", "medium", "hard"]);
const validQuestionStatuses = new Set(["candidate", "under_review", "active", "inactive", "needs_verification", "superseded", "rejected"]);
const ids = new Set(); const exactStems = new Map(); const exactOptions = new Map(); const exactExplanations = new Map();
const piiPatterns = [
  ["NIP/nomor identitas", /\b\d{18}\b/g], ["surel", /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi],
  ["telepon", /\b(?:\+62|62|0)8\d{8,11}\b/g], ["credential", /\b(?:api[_-]?key|password|secret|bearer)\s*[:=]/gi],
];

for (const question of active) {
  if (ids.has(question.id)) errors.push(`ID duplikat: ${question.id}`); ids.add(question.id);
  if (question.status !== "active" || !validQuestionStatuses.has(question.status)) errors.push(`Status soal invalid: ${question.id}`);
  if (!question.stem?.trim() || !Array.isArray(question.options) || question.options.length !== 4) errors.push(`Stem/opsi invalid: ${question.id}`);
  if (!question.explanation?.trim() || !question.keyTakeaway?.trim()) errors.push(`Pembahasan kosong: ${question.id}`);
  if (question.options.some((option) => !option.id || !option.text?.trim() || !option.rationale?.trim())) errors.push(`Rationale opsi kosong: ${question.id}`);
  if (question.options.filter((option) => option.id === question.correctOptionId).length !== 1) errors.push(`Kunci tidak tunggal: ${question.id}`);
  if (!validCognitive.has(question.cognitiveLevel) || !validDifficulty.has(question.difficulty)) errors.push(`Level/kesulitan invalid: ${question.id}`);
  if (!domains.some((domain) => domain.id === question.domain)) errors.push(`Domain tidak terdaftar: ${question.id}`);
  if (question.review?.total < 85 || Object.entries(question.review ?? {}).filter(([, value]) => typeof value === "number").reduce((sum, [key, value]) => key === "total" ? sum : sum + value, 0) !== question.review?.total) errors.push(`Review invalid: ${question.id}`);
  if (!question.sourceRefs?.length) errors.push(`Sumber kosong: ${question.id}`);
  for (const ref of question.sourceRefs ?? []) {
    const source = sourceMap.get(ref.sourceId);
    if (!source) errors.push(`Sumber tidak ada di registry: ${question.id}/${ref.sourceId}`);
    else if (!source.allowedForScoredQuestions || source.containsPersonalData || !allowedStatuses.has(source.status)) errors.push(`Sumber dilarang untuk soal aktif: ${question.id}/${ref.sourceId}`);
    if (!ref.section?.trim() || ref.pageOrSlide !== null) errors.push(`Posisi sumber tidak valid: ${question.id}`);
  }
  const content = `${question.stem} ${question.options.map((option) => `${option.text} ${option.rationale}`).join(" ")} ${question.explanation}`;
  for (const [kind, pattern] of piiPatterns) for (const match of content.matchAll(pattern)) privacyFindings.push({ questionId: question.id, kind, match: match[0] });
  const stemKey = normalize(question.stem); const optionKey = question.options.map((option) => normalize(option.text)).sort().join("|"); const explanationKey = normalize(question.explanation);
  if (exactStems.has(stemKey)) errors.push(`Stem identik: ${exactStems.get(stemKey)}/${question.id}`); else exactStems.set(stemKey, question.id);
  if (exactOptions.has(optionKey)) errors.push(`Set opsi identik: ${exactOptions.get(optionKey)}/${question.id}`); else exactOptions.set(optionKey, question.id);
  if (exactExplanations.has(explanationKey)) errors.push(`Pembahasan identik: ${exactExplanations.get(explanationKey)}/${question.id}`); else exactExplanations.set(explanationKey, question.id);
  const correct = question.options.find((option) => option.id === question.correctOptionId).text.length;
  const distractorAverage = question.options.filter((option) => option.id !== question.correctOptionId).reduce((sum, option) => sum + option.text.length, 0) / 3;
  if (correct / distractorAverage > 1.55 || distractorAverage / correct > 1.55) errors.push(`Panjang opsi memberi petunjuk: ${question.id}`);
}
if (privacyFindings.length) errors.push(`Temuan privasi: ${privacyFindings.length}`);

for (const domain of domains) {
  const actual = active.filter((question) => question.domain === domain.id).length;
  if (actual !== domain.target) errors.push(`Blueprint ${domain.id}: ${actual}, target ${domain.target}`);
}
const cognitiveCounts = counts(active, "cognitiveLevel");
const difficultyCounts = counts(active, "difficulty");
const expectedCognitive = { remember: 150, apply: 350, analyze: 350, evaluate: 150 };
const expectedDifficulty = { easy: 250, medium: 500, hard: 250 };
for (const [key, expected] of Object.entries(expectedCognitive)) if (cognitiveCounts[key] !== expected) errors.push(`Distribusi kognitif ${key}: ${cognitiveCounts[key]}/${expected}`);
for (const [key, expected] of Object.entries(expectedDifficulty)) if (difficultyCounts[key] !== expected) errors.push(`Distribusi kesulitan ${key}: ${difficultyCounts[key]}/${expected}`);
if (active.filter((question) => question.questionType !== "conceptual_mcq").length < 500) errors.push("Soal kasus/penerapan kurang dari 50%");
if (active.filter((question) => question.questionType === "conceptual_mcq").length > 150) errors.push("Soal konseptual melebihi 15%");
const answerCounts = Object.fromEntries(["A", "B", "C", "D"].map((answer) => [answer, active.filter((question) => question.correctOptionId === answer).length]));
if (Math.max(...Object.values(answerCounts)) - Math.min(...Object.values(answerCounts)) > 1) errors.push(`Kunci tidak seimbang: ${JSON.stringify(answerCounts)}`);

const similarityPairs = [];
for (let left = 0; left < active.length; left += 1) {
  for (let right = left + 1; right < active.length; right += 1) {
    const stemScore = jaccard(active[left].stem, active[right].stem);
    if (stemScore >= 0.82) {
      similarityPairs.push({ left: active[left].id, right: active[right].id, stemSimilarity: Number(stemScore.toFixed(4)), combinedSimilarity: null, reason: "stem_jaccard" });
      continue;
    }
    if (active[left].domain !== active[right].domain) continue;
    const leftCombined = `${active[left].stem} ${active[left].options.map((option) => option.text).join(" ")}`;
    const rightCombined = `${active[right].stem} ${active[right].options.map((option) => option.text).join(" ")}`;
    const combinedScore = cosine(leftCombined, rightCombined, combinedFrequency, active.length);
    if (combinedScore >= 0.88) similarityPairs.push({ left: active[left].id, right: active[right].id, stemSimilarity: Number(stemScore.toFixed(4)), combinedSimilarity: Number(combinedScore.toFixed(4)), reason: "combined_cosine" });
  }
}
if (similarityPairs.length) errors.push(`Pasangan kemiripan di atas ambang: ${similarityPairs.length}`);

const similarityReport = { generatedAt: "2026-08-03", method: "Jaccard stem berbasis token substantif + cosine TF-IDF stem/opsi", thresholds: { stem: 0.82, combined: 0.88 }, corpusStopWords: [...corpusStopWords].sort(), comparedPairs: active.length * (active.length - 1) / 2, pairs: similarityPairs };
await writeFile(path.join(root, "reports/question-similarity-report.json"), `${JSON.stringify(similarityReport, null, 2)}\n`);
await writeFile(path.join(root, "reports/privacy-scan-report.json"), `${JSON.stringify({ generatedAt: "2026-08-03", scannedActive: active.length, findings: privacyFindings, excludedSourceIds: registry.filter((source) => source.containsPersonalData).map((source) => source.sourceId) }, null, 2)}\n`);

const summary = { candidates: candidates.length, active: active.length, errors: errors.length, similarityPairs: similarityPairs.length, privacyFindings: privacyFindings.length, byDomain: counts(active, "domain"), cognitive: cognitiveCounts, difficulty: difficultyCounts, answers: answerCounts };
if (process.argv.includes("--stats")) console.log(JSON.stringify(await readJson(path.join(root, "reports/question-bank-statistics.json")), null, 2));
else console.log(JSON.stringify(summary, null, 2));
if (errors.length) {
  console.error(errors.slice(0, 100).join("\n"));
  if (errors.length > 100) console.error(`...dan ${errors.length - 100} error lain.`);
  process.exitCode = 1;
}
