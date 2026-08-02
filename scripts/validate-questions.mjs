import { mkdir, writeFile } from "node:fs/promises";
import { questions, sourceCatalog } from "../app/questions.ts";

const allowedStatuses = new Set(["current", "superseded", "revoked", "unclear", "needs_verification"]);
const required = ["subtopic", "competency", "questionType", "cognitiveLevel", "explanation", "sourceTitle", "sourceUrl", "sourcePage", "sourceDate", "lastVerified"];
const errors = [];
const warnings = [];
const seenIds = new Set();
const seenContent = new Map();
const normalize = (value) => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, " ").trim();

for (const question of questions) {
  if (seenIds.has(question.id)) errors.push(`ID duplikat: ${question.id}`);
  seenIds.add(question.id);
  if (!question.stem?.trim()) errors.push(`Stem kosong: ${question.id}`);
  if (!Array.isArray(question.options) || question.options.length !== 4) errors.push(`Opsi bukan 4: ${question.id}`);
  if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer > 3) errors.push(`Kunci invalid: ${question.id}`);
  if (question.options?.some(([text, explanation]) => !text?.trim() || !explanation?.trim())) errors.push(`Opsi/penjelasan kosong: ${question.id}`);
  for (const field of required) if (typeof question[field] !== "string" || !question[field].trim()) errors.push(`Metadata ${field} kosong: ${question.id}`);
  if (!allowedStatuses.has(question.regulationStatus)) errors.push(`Status invalid: ${question.id}`);
  if (question.active && question.regulationStatus !== "current") errors.push(`Soal aktif memakai status ${question.regulationStatus}: ${question.id}`);
  if (!sourceCatalog[question.source]) errors.push(`Sumber tidak dikenal: ${question.id}`);
  if (!/^https?:\/\//.test(question.sourceUrl)) errors.push(`URL sumber tidak publik: ${question.id}`);
  if (!Array.isArray(question.tags) || !question.tags.length || question.version < 1) errors.push(`Tags/versi invalid: ${question.id}`);
  const contentKey = JSON.stringify([normalize(question.stem), question.options.map(([text]) => normalize(text)).sort()]);
  if (seenContent.has(contentKey)) errors.push(`Konten duplikat: ${seenContent.get(contentKey)} dan ${question.id}`);
  seenContent.set(contentKey, question.id);
}

const answerCounts = [0, 1, 2, 3].map((answer) => questions.filter((q) => q.answer === answer).length);
if (Math.max(...answerCounts) - Math.min(...answerCounts) > 1) errors.push(`Distribusi kunci tidak seimbang: ${answerCounts.join("/")}`);
let longestRun = 1;
let run = 1;
for (let index = 1; index < questions.length; index += 1) {
  run = questions[index].answer === questions[index - 1].answer ? run + 1 : 1;
  longestRun = Math.max(longestRun, run);
}
if (longestRun > 4) errors.push(`Pola kunci beruntun terlalu panjang: ${longestRun}`);

const tokenSets = questions.map((question) => new Set(normalize(question.stem).split(" ").filter((token) => token.length > 3)));
for (let left = 0; left < questions.length; left += 1) {
  for (let right = left + 1; right < questions.length; right += 1) {
    const a = tokenSets[left]; const b = tokenSets[right];
    const intersection = [...a].filter((token) => b.has(token)).length;
    const union = new Set([...a, ...b]).size;
    if (union >= 8 && intersection / union >= 0.9) warnings.push(`Kemiripan tinggi: ${questions[left].id}/${questions[right].id}`);
  }
}

const audit = {
  generatedAt: "2026-08-03",
  summary: { active: questions.length, errors: errors.length, warnings: warnings.length, answerCounts, longestAnswerRun: longestRun },
  questions: questions.map((question) => ({
    id: question.id, topic: question.topic, subtopic: question.subtopic,
    competency: question.competency, questionType: question.questionType,
    cognitiveLevel: question.cognitiveLevel, difficulty: question.difficulty,
    sourceTitle: question.sourceTitle, sourceUrl: question.sourceUrl,
    sourcePage: question.sourcePage, sourceDate: question.sourceDate,
    lastVerified: question.lastVerified, regulationStatus: question.regulationStatus,
    tags: question.tags, version: question.version, active: question.active,
  })),
  warnings,
};

if (process.argv.includes("--write-audit")) {
  await mkdir(new URL("../docs/", import.meta.url), { recursive: true });
  await writeFile(new URL("../docs/audit-bank-soal.json", import.meta.url), `${JSON.stringify(audit, null, 2)}\n`);
}
if (warnings.length) console.warn(`Peringatan audit: ${warnings.length}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Valid: ${questions.length} soal aktif; kunci ${answerCounts.join("/")}; run maks ${longestRun}.`);
}
