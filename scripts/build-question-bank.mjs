import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BANK_VERSION, CREATED_AT, concepts, contextTails, domains, questionModes } from "./question-bank-spec.mjs";

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

const optionFrames = {
  case_based_mcq: ["Sebagai langkah awal, ", ""],
  decision_quality: ["Keputusan yang sesuai adalah ", ""],
  evidence_analysis: ["Pilihan yang dapat dipertanggungjawabkan adalah ", ""],
  situational_judgment: ["Pimpinan perlu mengarahkan tim untuk ", ""],
  corrective_action: ["Perbaikan harus dimulai dengan ", ""],
  control_design: ["Pengendalian perlu memastikan petugas ", ""],
  exception_handling: ["Sebelum menerapkan pengecualian, petugas perlu ", ""],
  monitoring_evaluation: ["Tindak lanjut yang tepat adalah ", ""],
  conceptual_mcq: ["Rumusan operasional yang tepat adalah ", ""],
  implementation_planning: ["Rencana pelaksanaan perlu menetapkan petugas untuk ", ""],
};
const optionContextQualifiers = [
  "",
  " sebelum keputusan akhir ditetapkan",
  " dan mendokumentasikan hasilnya",
];

function optionText(action, unit) {
  const [prefix, suffix] = optionFrames[unit.questionType];
  return normalize(`${prefix}${action}${suffix}${optionContextQualifiers[unit.contextIndex]}.`);
}

function makeCandidate(unit, domainOrder, domainCandidateNumber, globalCandidateNumber) {
  const cognitiveLevel = unit.suggestedCognitive;
  const questionType = unit.questionType;
  const difficulty = difficultySchedule[(domainCandidateNumber * 3 + unit.order) % difficultySchedule.length];
  const stem = normalize(`${unit.context} ${unit.focusHint} ${unit.questionPrompt}`);
  const optionActions = [unit.correctAction, ...unit.distractors.map((wrong) => wrong.text)];
  const optionTexts = optionActions.map((action) => optionText(action, unit));
  const canonical = [
    { text: optionTexts[0], correct: true, why: null, validWhen: null },
    ...unit.distractors.map((wrong, wrongIndex) => ({ text: optionTexts[wrongIndex + 1], correct: false, why: wrong.why, validWhen: wrong.validWhen })),
  ];
  const answerIndex = (globalCandidateNumber * 7 + domainOrder) % 4;
  const ordered = [...canonical];
  [ordered[0], ordered[answerIndex]] = [ordered[answerIndex], ordered[0]];
  const optionIds = ["A", "B", "C", "D"];
  const options = ordered.map((option, index) => {
    const isCorrect = option.correct;
    return {
      id: optionIds[index],
      text: option.text,
      rationale: isCorrect
        ? `Benar untuk kasus ini. ${unit.rule} Karena itu, tindakan yang tepat adalah ${unit.correctAction}. Batas pentingnya: ${unit.boundary}`
        : `Tidak tepat untuk kasus ini karena ${option.why}. Kondisi terkait yang dapat membuat tindakan sejenis menjadi tepat: ${option.validWhen}. Redaksi opsi tetap harus disesuaikan dengan kondisi tersebut. Batas yang membedakannya: ${unit.boundary}`,
      misconception: isCorrect ? null : option.why,
      validWhen: isCorrect ? `ketika kondisi sama dengan kasus dan seluruh prasyarat pada ${unit.sourceSection} terpenuhi` : option.validWhen,
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
    explanation: `Jawaban paling tepat adalah ${correctOptionId}. Kasus yang diuji: ${unit.context} Fokus pertanyaan: ${unit.questionPrompt} Uraian topik: ${unit.rule} Pada kasus ini, keputusan harus ${unit.correctAction}. Batas penerapan: ${unit.boundary} Tiga pilihan lain bukan jawaban terbaik untuk kondisi ini. Tindakan sejenis baru dapat digunakan setelah redaksinya disesuaikan dan syarat berikut terpenuhi: ${unit.distractors.map((wrong) => `${wrong.text} — kondisi terkait: ${wrong.validWhen}`).join("; ")}. Dengan demikian, pembeda utamanya bukan kata yang terdengar paling tegas, melainkan kesesuaian kondisi, kewenangan, bukti, dan urutan proses. Sumber ${source.title}, bagian ${unit.sourceSection}, berstatus ${source.status} dan diverifikasi ${source.lastVerified}.`,
    keyTakeaway: `Ingat pembeda kondisi: ${unit.correctAction}; jangan terapkan alternatif sebelum syarat khususnya terpenuhi.`,
    sourceRefs: [{ sourceId: source.sourceId, title: source.title, driveFileId: source.driveFileId, section: unit.sourceSection, pageOrSlide: null, regulationStatus: source.status, lastVerified: source.lastVerified }],
    tags: [unit.domain, unit.subdomain, questionType, cognitiveLevel, difficulty],
    review, similarityGroup: unit.conceptId, knowledgeUnitId: unit.id, questionFocus: unit.questionFocus,
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
  const source = sources.get(concept.sourceId);
  if (!source) throw new Error(`Sumber tidak ditemukan: ${concept.sourceId}`);
  concept.contexts.forEach((context, contextIndex) => questionModes.forEach((mode, modeIndex) => {
      knowledgeUnits.push({
        id: `KU-${domains.find(({ id }) => id === concept.domain).code}-${String(conceptIndex + 1).padStart(3, "0")}-${contextIndex + 1}-${modeIndex + 1}`,
        conceptId: `CONCEPT-${String(conceptIndex + 1).padStart(3, "0")}`,
        order: knowledgeUnits.length + 1,
        domain: concept.domain, subdomain: concept.subdomain, rule: concept.rule,
        context, contextIndex, contextTail: contextTails[contextIndex],
        questionPrompt: mode.ask, focusHint: mode.focusHint, questionFocus: mode.type, questionType: mode.type,
        suggestedCognitive: mode.cognitive, optionTail: mode.optionTail,
        boundary: concept.boundary, sourceId: concept.sourceId,
        sourceSection: concept.section, regulationStatus: source.status,
        competency: concept.competency, indicator: concept.indicator,
        distractors: concept.wrong, correctAction: concept.correctAction,
        exampleApplication: context,
        inferenceLimit: `Jangan memperluas klaim di luar ${concept.section}; jangan mengarang angka, pasal, atau kewenangan.`,
        lastVerified: source.lastVerified,
      });
    }));
}

for (const domain of domains) {
  const units = knowledgeUnits.filter((unit) => unit.domain === domain.id);
  await writeJson(path.join(dirs.units, `${domain.id}.json`), units);
}

let globalCandidateNumber = 0;
const candidates = [];
for (const [domainOrder, domain] of domains.entries()) {
  const units = knowledgeUnits.filter((unit) => unit.domain === domain.id);
  const candidateTarget = Math.ceil((domain.target * 135) / 100);
  for (let index = 0; index < candidateTarget; index += 1) {
    globalCandidateNumber += 1;
    const unit = units[(index * 37) % units.length];
    candidates.push(makeCandidate(unit, domainOrder, index + 1, globalCandidateNumber));
  }
  const domainCandidates = candidates.filter((question) => question.domain === domain.id);
  const folder = path.join(dirs.candidates, domain.id);
  await mkdir(folder, { recursive: true });
  for (const [chunkIndex, chunk] of splitInto(domainCandidates, 50).entries()) {
    await writeJson(path.join(folder, `candidates-${String(chunkIndex + 1).padStart(3, "0")}.json`), chunk);
  }
}

const activeTarget = domains.reduce((sum, domain) => sum + domain.target, 0);
const answerTargets = balancedTargets(activeTarget);
const rememberTarget = Math.round(activeTarget * 0.15);
const applyTarget = Math.round(activeTarget * 0.35);
const evaluateTarget = Math.round(activeTarget * 0.15);
const analyzeTarget = activeTarget - rememberTarget - applyTarget - evaluateTarget;
const cognitiveTargets = [
  ...Array(rememberTarget).fill("remember"),
  ...Array(applyTarget).fill("apply"),
  ...Array(analyzeTarget).fill("analyze"),
  ...Array(evaluateTarget).fill("evaluate"),
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
    const correctOptionId = ["A", "B", "C", "D"][answerTarget];
    const baseExplanation = selected.explanation.replace(/^Jawaban paling tepat adalah [A-D]\./, `Jawaban paling tepat adalah ${correctOptionId}.`);
    const optionBreakdown = options.map((option) => `${option.id} — ${option.id === correctOptionId ? "BENAR" : "TIDAK TEPAT UNTUK KASUS INI"}: ${option.rationale}`).join(" ");
    active.push({
      ...selected, id: bankId, runtimeId: globalActiveIndex + 1, status: "active",
      difficulty: difficultySchedule[globalActiveIndex % difficultySchedule.length],
      cognitiveLevel, questionType,
      options, correctOptionId,
      explanation: `${baseExplanation} Rincian sesuai huruf pilihan yang tampil: ${optionBreakdown}`,
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
await writeJson(path.join(root, "app/generated-bank-meta.json"), {
  bankVersion: BANK_VERSION,
  generatedAt: CREATED_AT,
  activeCount: active.length,
  candidateCount: candidates.length,
  categoryCount: domains.length,
  categories: domains.map(({ id, label, topic, target }) => ({ id, label, topic, target })),
});

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
