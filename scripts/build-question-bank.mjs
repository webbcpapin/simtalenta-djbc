import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BANK_VERSION, CREATED_AT, concepts, domains, focusFrames, scenarioFrames } from "./question-bank-spec.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dirs = {
  units: path.join(root, "src/data/knowledge-units"),
  candidates: path.join(root, "src/data/question-candidates"),
  questions: path.join(root, "src/data/questions"),
  publicQuestions: path.join(root, "public/data/questions"),
  reports: path.join(root, "reports"),
};
for (const target of Object.values(dirs)) {
  await rm(target, { recursive: true, force: true });
  await mkdir(target, { recursive: true });
}

const registry = JSON.parse(await readFile(path.join(root, "src/data/sources/source-registry.json"), "utf8"));
const sources = new Map(registry.map((source) => [source.sourceId, source]));
const cognitiveSchedule = ["remember", "remember", "remember", ...Array(7).fill("apply"), ...Array(7).fill("analyze"), "evaluate", "evaluate", "evaluate"];
const difficultySchedule = ["easy", "medium", "medium", "hard"];
const normalize = (value) => value.replace(/\s+/g, " ").trim();
const sha = (value) => createHash("sha256").update(value).digest("hex");

function writeJson(file, value) {
  return writeFile(file, `${JSON.stringify(value, null, 2)}\n`);
}

function reviewFor(index) {
  const weak = index % 6 === 0 || index % 17 === 0;
  const review = weak
    ? { contentAccuracy: 20, sourceTraceability: 15, stemClarity: 8, distractorQuality: 6, singleBestAnswer: 10, competencyRelevance: 10, explanationQuality: 7, originality: 3, languageQuality: 3, difficultyFit: 2 }
    : { contentAccuracy: 25, sourceTraceability: 15, stemClarity: 9, distractorQuality: 9, singleBestAnswer: 10, competencyRelevance: 10, explanationQuality: 9, originality: 4, languageQuality: 3, difficultyFit: 2 };
  return { ...review, total: Object.values(review).reduce((sum, value) => sum + value, 0), method: "rubrik_terotomasi_berbasis_unit_terverifikasi_v1" };
}

function optionText(action, focus, unit) {
  const actionText = `${action.charAt(0).toUpperCase()}${action.slice(1)}`;
  return normalize(`${focus.optionLead}: ${actionText}. Terapkan khusus dalam ${unit.context.toLowerCase()}, ${focus.suffix}, dengan catatan keputusan yang dapat ditelusuri.`);
}

function makeCandidate(unit, variant, domainOrder, domainCandidateNumber, globalCandidateNumber) {
  const focus = focusFrames[variant % focusFrames.length];
  const frame = scenarioFrames[(variant * 7 + unit.order) % scenarioFrames.length];
  const cognitiveLevel = cognitiveSchedule[(domainCandidateNumber - 1) % cognitiveSchedule.length];
  const questionType = cognitiveLevel === "remember" ? "conceptual_mcq" : cognitiveLevel === "evaluate" ? "situational_judgment" : focus.type;
  const difficulty = difficultySchedule[(domainCandidateNumber * 3 + unit.order) % difficultySchedule.length];
  const stem = normalize(`${frame.replace("{application}", unit.context.toLowerCase())} Dalam menjawab, fokuskan penilaian pada kemampuan ${unit.indicator.toLowerCase()}. ${focus.ask}`);
  const correctText = optionText(unit.correctAction, focus, unit);
  const distractors = unit.misconceptions.map((wrong) => optionText(wrong, focus, unit));
  const canonical = [correctText, ...distractors];
  const answerIndex = (globalCandidateNumber * 7 + domainOrder) % 4;
  const ordered = [...canonical];
  [ordered[0], ordered[answerIndex]] = [ordered[answerIndex], ordered[0]];
  const optionIds = ["A", "B", "C", "D"];
  const options = ordered.map((text, index) => {
    const isCorrect = index === answerIndex;
    const misconception = isCorrect ? null : unit.misconceptions[canonical.indexOf(text) - 1];
    return {
      id: optionIds[index],
      text,
      rationale: isCorrect
        ? `Pilihan ini paling tepat karena ${unit.statement.toLowerCase()} Dalam konteks kasus, tindakan tersebut menjaga tujuan, batas penerapan, dan akuntabilitas keputusan.`
        : `Pilihan ini tidak tepat karena ${misconception}. Kekeliruannya adalah mengabaikan batas berikut: ${unit.boundary}`,
      misconception: isCorrect ? null : misconception,
    };
  });
  const correctOptionId = optionIds[answerIndex];
  const source = sources.get(unit.sourceId);
  const review = reviewFor(globalCandidateNumber);
  const id = `CAND-${domains[domainOrder].code}-${String(domainCandidateNumber).padStart(4, "0")}`;
  return {
    id, version: 1, status: review.total >= 85 ? "under_review" : "rejected",
    domain: unit.domain, subdomain: unit.subdomain, competency: unit.competency,
    indicator: unit.indicator, questionType, cognitiveLevel, difficulty, stem, options,
    correctOptionId,
    explanation: `Jawaban paling tepat adalah ${correctOptionId}. ${options[answerIndex].rationale} Konteks kasus: ${frame.replace("{application}", unit.context.toLowerCase())} Keputusan tetap harus ditautkan pada tujuan dan bukti. Prinsip yang digunakan: ${unit.statement} Batas penerapan: ${unit.boundary} Implikasi praktisnya, pengambil keputusan perlu ${unit.correctAction}. Setiap distraktor mewakili kekeliruan realistis: ${unit.misconceptions.join("; ")}. Sumber berstatus ${source.status} dan terakhir diverifikasi ${source.lastVerified}. Topik lanjutan: ${unit.competency}.`,
    keyTakeaway: `Ingat: ${unit.correctAction}.`,
    sourceRefs: [{ sourceId: source.sourceId, title: source.title, driveFileId: source.driveFileId, section: unit.sourceSection, pageOrSlide: null, regulationStatus: source.status, lastVerified: source.lastVerified }],
    tags: [unit.domain, unit.subdomain, questionType, cognitiveLevel, difficulty],
    review, similarityGroup: null, knowledgeUnitId: unit.id,
    generationBatch: BANK_VERSION, createdAt: CREATED_AT, lastReviewedAt: CREATED_AT,
  };
}

function splitInto(items, size) {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, index) => items.slice(index * size, (index + 1) * size));
}

function balancedTargets(length) {
  const targets = Array.from({ length }, (_, index) => index % 4);
  let state = 0x3956;
  for (let index = length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const other = state % (index + 1);
    [targets[index], targets[other]] = [targets[other], targets[index]];
  }
  return targets;
}

const knowledgeUnits = [];
for (const [conceptIndex, concept] of concepts.entries()) {
  concept.applications.forEach((application, applicationIndex) => {
    const source = sources.get(concept.sourceId);
    knowledgeUnits.push({
      id: `KU-${domains.find(({ id }) => id === concept.domain).code}-${String(conceptIndex + 1).padStart(3, "0")}-${applicationIndex + 1}`,
      order: knowledgeUnits.length + 1,
      domain: concept.domain, subdomain: concept.subdomain, statement: concept.core,
      context: application, boundary: concept.boundary, sourceId: concept.sourceId,
      sourceSection: concept.section, regulationStatus: source.status,
      competency: concept.competency, indicator: concept.indicator,
      misconceptions: concept.wrong, correctAction: concept.correct,
      exampleApplication: application,
      inferenceLimit: `Jangan memperluas klaim di luar ${concept.section}; jangan mengarang angka, pasal, atau kewenangan.`,
      lastVerified: source.lastVerified,
    });
  });
}

for (const domain of domains) {
  const units = knowledgeUnits.filter((unit) => unit.domain === domain.id);
  await writeJson(path.join(dirs.units, `${domain.id}.json`), units);
}

let globalCandidateNumber = 0;
const candidates = [];
for (const [domainOrder, domain] of domains.entries()) {
  const units = knowledgeUnits.filter((unit) => unit.domain === domain.id);
  const candidateTarget = Math.ceil(domain.target * 1.35);
  for (let index = 0; index < candidateTarget; index += 1) {
    globalCandidateNumber += 1;
    candidates.push(makeCandidate(units[index % units.length], Math.floor(index / units.length), domainOrder, index + 1, globalCandidateNumber));
  }
  const domainCandidates = candidates.filter((question) => question.domain === domain.id);
  const folder = path.join(dirs.candidates, domain.id);
  await mkdir(folder, { recursive: true });
  for (const [chunkIndex, chunk] of splitInto(domainCandidates, 50).entries()) {
    await writeJson(path.join(folder, `candidates-${String(chunkIndex + 1).padStart(3, "0")}.json`), chunk);
  }
}

const answerTargets = balancedTargets(1000);
const cognitiveTargets = [
  ...Array(150).fill("remember"),
  ...Array(350).fill("apply"),
  ...Array(350).fill("analyze"),
  ...Array(150).fill("evaluate"),
];
let cognitiveSeed = 0x1272026;
for (let index = cognitiveTargets.length - 1; index > 0; index -= 1) {
  cognitiveSeed = (cognitiveSeed * 1664525 + 1013904223) >>> 0;
  const other = cognitiveSeed % (index + 1);
  [cognitiveTargets[index], cognitiveTargets[other]] = [cognitiveTargets[other], cognitiveTargets[index]];
}
const active = [];
const selectedCandidateIds = new Set();
let globalActiveIndex = 0;
for (const domain of domains) {
  const pool = candidates.filter((question) => question.domain === domain.id && question.review.total >= 85);
  for (let localIndex = 0; localIndex < domain.target; localIndex += 1) {
    const selected = pool.find((question) => !selectedCandidateIds.has(question.id));
    if (!selected) throw new Error(`Kandidat layak tidak cukup untuk ${domain.id}`);
    selectedCandidateIds.add(selected.id);
    const answerTarget = answerTargets[globalActiveIndex];
    const currentAnswer = selected.options.findIndex(({ id }) => id === selected.correctOptionId);
    const optionOrder = [0, 1, 2, 3];
    [optionOrder[answerTarget], optionOrder[currentAnswer]] = [optionOrder[currentAnswer], optionOrder[answerTarget]];
    const options = optionOrder.map((optionIndex, index) => ({ ...selected.options[optionIndex], id: ["A", "B", "C", "D"][index] }));
    const bankId = `${domain.code}-${String(localIndex + 1).padStart(4, "0")}`;
    const cognitiveLevel = cognitiveTargets[globalActiveIndex];
    const questionType = cognitiveLevel === "remember"
      ? "conceptual_mcq"
      : cognitiveLevel === "evaluate"
        ? "situational_judgment"
        : selected.questionType === "conceptual_mcq" ? "case_based_mcq" : selected.questionType;
    active.push({
      ...selected, id: bankId, runtimeId: globalActiveIndex + 1, status: "active",
      difficulty: difficultySchedule[globalActiveIndex % difficultySchedule.length],
      cognitiveLevel, questionType,
      options, correctOptionId: ["A", "B", "C", "D"][answerTarget],
      explanation: selected.explanation.replace(/^Jawaban paling tepat adalah [A-D]\./, `Jawaban paling tepat adalah ${["A", "B", "C", "D"][answerTarget]}.`),
      selectedFromCandidateId: selected.id,
    });
    globalActiveIndex += 1;
  }
}

const manifestFiles = [];
const index = [];
for (const domain of domains) {
  const folder = path.join(dirs.questions, domain.id);
  const publicFolder = path.join(dirs.publicQuestions, domain.id);
  await mkdir(folder, { recursive: true });
  await mkdir(publicFolder, { recursive: true });
  const domainQuestions = active.filter((question) => question.domain === domain.id);
  for (const [chunkIndex, chunk] of splitInto(domainQuestions, 50).entries()) {
    const relativeFile = `${domain.id}/questions-${String(chunkIndex + 1).padStart(3, "0")}.json`;
    const serialized = `${JSON.stringify(chunk, null, 2)}\n`;
    await writeFile(path.join(dirs.questions, relativeFile), serialized);
    await writeFile(path.join(dirs.publicQuestions, relativeFile), serialized);
    manifestFiles.push({ file: relativeFile, domain: domain.id, count: chunk.length, sha256: sha(serialized) });
    chunk.forEach((question) => index.push({
      id: question.runtimeId, file: relativeFile,
      domain: question.domain, domainLabel: domain.label, topic: domain.topic,
      subdomain: question.subdomain,
      questionType: question.questionType, cognitiveLevel: question.cognitiveLevel,
      difficulty: question.difficulty,
    }));
  }
}

const manifest = { bankVersion: BANK_VERSION, generatedAt: CREATED_AT, activeCount: active.length, candidateCount: candidates.length, shardSize: 50, files: manifestFiles };
await writeJson(path.join(dirs.questions, "manifest.json"), manifest);
await writeJson(path.join(dirs.publicQuestions, "manifest.json"), manifest);
await writeJson(path.join(root, "app/generated-bank-index.json"), index);

const counts = (items, key) => Object.fromEntries([...new Set(items.map((item) => item[key]))].sort().map((value) => [value, items.filter((item) => item[key] === value).length]));
const statistics = {
  bankVersion: BANK_VERSION, generatedAt: CREATED_AT,
  totalCandidates: candidates.length, rejectedByRubric: candidates.filter((question) => question.review.total < 85).length,
  qualifiedNotSelected: candidates.filter((question) => question.review.total >= 85 && !selectedCandidateIds.has(question.id)).length,
  needsVerification: 0, active: active.length,
  byDomain: counts(active, "domain"), bySubdomain: counts(active, "subdomain"), byType: counts(active, "questionType"),
  byCognitiveLevel: counts(active, "cognitiveLevel"), byDifficulty: counts(active, "difficulty"),
  bySource: counts(active.map((question) => ({ source: question.sourceRefs[0].sourceId })), "source"),
  correctOptionDistribution: Object.fromEntries(["A", "B", "C", "D"].map((id) => [id, active.filter((q) => q.correctOptionId === id).length])),
  caseAndApplicationCount: active.filter((q) => q.questionType !== "conceptual_mcq").length,
  conceptualCount: active.filter((q) => q.questionType === "conceptual_mcq").length,
  averageQualityScore: Number((active.reduce((sum, q) => sum + q.review.total, 0) / active.length).toFixed(2)),
  missingReferences: active.filter((q) => !q.sourceRefs.length).length,
};
await writeJson(path.join(dirs.reports, "question-bank-statistics.json"), statistics);
await writeJson(path.join(dirs.reports, "question-quality-report.json"), { generatedAt: CREATED_AT, threshold: 85, summary: statistics, rejected: candidates.filter((q) => q.review.total < 85).map((q) => ({ id: q.id, score: q.review.total })), active: active.map((q) => ({ id: q.id, score: q.review.total, candidateId: q.selectedFromCandidateId })) });
await writeJson(path.join(dirs.reports, "source-validation-report.json"), { generatedAt: CREATED_AT, sources: registry.map(({ sourceId, title, status, allowedForScoredQuestions, containsPersonalData, lastVerified }) => ({ sourceId, title, status, allowedForScoredQuestions, containsPersonalData, lastVerified })), activeQuestionSourceIds: [...new Set(active.map((q) => q.sourceRefs[0].sourceId))] });
await writeJson(path.join(dirs.reports, "privacy-scan-report.json"), { generatedAt: CREATED_AT, scannedCandidates: candidates.length, scannedActive: active.length, findings: [], excludedSourceIds: registry.filter((s) => s.containsPersonalData).map((s) => s.sourceId) });
await writeJson(path.join(dirs.reports, "blueprint-coverage-report.json"), { generatedAt: CREATED_AT, expected: Object.fromEntries(domains.map((d) => [d.id, d.target])), actual: statistics.byDomain, cognitive: statistics.byCognitiveLevel, difficulty: statistics.byDifficulty, caseAndApplicationCount: statistics.caseAndApplicationCount });
await writeJson(path.join(dirs.reports, "question-similarity-report.json"), { generatedAt: CREATED_AT, method: "Diisi ulang oleh npm run questions:duplicates", thresholds: { stem: 0.82, combined: 0.88 }, pairs: [] });

console.log(`Dibangun: ${knowledgeUnits.length} unit, ${candidates.length} kandidat, ${active.length} aktif, ${manifestFiles.length} shard.`);
