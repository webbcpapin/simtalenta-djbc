import bankIndexData from "./generated-bank-index.json";
import bankMetaData from "./generated-bank-meta.json";
import sourceRegistryData from "../src/data/sources/source-registry.json";

export const BANK_VERSION = "2026.08.drive-categories-v2";

export const BANK_TOPICS = [
  "Disiplin Pegawai",
  "Kehumasan",
  "Kepatuhan Internal",
  "Kepegawaian",
  "Keuangan",
  "Layanan Informasi",
  "Manajemen Risiko",
  "Organisasi",
  "Pengelolaan Kinerja",
  "Ringkasan",
  "Rumah Tangga",
] as const;

export type BankTopic = typeof BANK_TOPICS[number];
export type BankDifficulty = "easy" | "medium" | "hard";
export type DisplayDifficulty = "Dasar" | "Analitik" | "Menjebak";
export type CognitiveLevel = "remember" | "apply" | "analyze" | "evaluate";

export type QuestionIndexItem = {
  id: number;
  file: string;
  domain: string;
  domainLabel: string;
  topic: BankTopic;
  subdomain: string;
  questionType: string;
  cognitiveLevel: CognitiveLevel;
  difficulty: BankDifficulty;
};

type RawOption = {
  id: "A" | "B" | "C" | "D";
  text: string;
  rationale: string;
  misconception: string | null;
};

type RawQuestion = {
  id: string;
  runtimeId: number;
  status: "active";
  domain: string;
  subdomain: string;
  competency: string;
  indicator: string;
  questionType: string;
  cognitiveLevel: CognitiveLevel;
  difficulty: BankDifficulty;
  stem: string;
  options: RawOption[];
  correctOptionId: "A" | "B" | "C" | "D";
  explanation: string;
  keyTakeaway: string;
  sourceRefs: Array<{
    sourceId: string;
    title: string;
    section: string;
    regulationStatus: string;
    lastVerified: string;
  }>;
  tags: string[];
  review: { total: number };
  generationBatch: string;
};

export type BankQuestion = {
  id: number;
  bankId: string;
  topic: BankTopic;
  domain: string;
  subdomain: string;
  competency: string;
  indicator: string;
  questionType: string;
  cognitiveLevel: CognitiveLevel;
  difficulty: DisplayDifficulty;
  rawDifficulty: BankDifficulty;
  stem: string;
  options: Array<readonly [string, string]>;
  answer: number;
  explanation: string;
  keyTakeaway: string;
  reference: string;
  sourceTitle: string;
  sourceUrl: string;
  sourceDate: string;
  lastVerified: string;
  regulationStatus: string;
  tags: readonly string[];
  reviewScore: number;
  questionBankVersion: string;
  active: true;
};

export type SourceRegistryItem = {
  sourceId: string;
  title: string;
  issuer: string;
  driveUrl: string;
  status: string;
  lastVerified: string;
  allowedForScoredQuestions: boolean;
  containsPersonalData: boolean;
};

export const questionIndex = bankIndexData as QuestionIndexItem[];
export const activeQuestionCount = questionIndex.length;
export const candidateQuestionCount = bankMetaData.candidateCount;
export const bankCategoryCount = bankMetaData.categoryCount;
export const publicSourceRegistry = (sourceRegistryData as SourceRegistryItem[])
  .filter((source) => !source.containsPersonalData);

const indexById = new Map(questionIndex.map((question) => [question.id, question]));
const shardCache = new Map<string, Promise<RawQuestion[]>>();

function displayDifficulty(value: BankDifficulty): DisplayDifficulty {
  return value === "easy" ? "Dasar" : value === "medium" ? "Analitik" : "Menjebak";
}

function publicBaseUrl() {
  const environment = (import.meta as ImportMeta & { env?: { BASE_URL?: string } }).env;
  const base = environment?.BASE_URL ?? "/";
  return base.endsWith("/") ? base : `${base}/`;
}

async function loadShard(file: string) {
  const cached = shardCache.get(file);
  if (cached) return cached;
  const request = fetch(`${publicBaseUrl()}data/questions/${file}`).then(async (response) => {
    if (!response.ok) throw new Error(`Gagal memuat bank soal (${response.status})`);
    return response.json() as Promise<RawQuestion[]>;
  });
  shardCache.set(file, request);
  return request;
}

function mapRawQuestion(raw: RawQuestion): BankQuestion {
  const index = indexById.get(raw.runtimeId);
  if (!index) throw new Error(`Indeks soal ${raw.runtimeId} tidak ditemukan`);
  const source = raw.sourceRefs[0];
  const answer = raw.options.findIndex((option) => option.id === raw.correctOptionId);
  return {
    id: raw.runtimeId,
    bankId: raw.id,
    topic: index.topic,
    domain: raw.domain,
    subdomain: raw.subdomain,
    competency: raw.competency,
    indicator: raw.indicator,
    questionType: raw.questionType,
    cognitiveLevel: raw.cognitiveLevel,
    difficulty: displayDifficulty(raw.difficulty),
    rawDifficulty: raw.difficulty,
    stem: raw.stem,
    options: raw.options.map((option) => [option.text, option.rationale] as const),
    answer,
    explanation: raw.explanation,
    keyTakeaway: raw.keyTakeaway,
    reference: `${source.title} · ${source.section}`,
    sourceTitle: source.title,
    sourceUrl: (sourceRegistryData as SourceRegistryItem[]).find((item) => item.sourceId === source.sourceId)?.driveUrl ?? "#",
    sourceDate: source.lastVerified,
    lastVerified: source.lastVerified,
    regulationStatus: source.regulationStatus,
    tags: raw.tags,
    reviewScore: raw.review.total,
    questionBankVersion: raw.generationBatch,
    active: true,
  };
}

export async function loadQuestionsByIds(ids: readonly number[]) {
  const requested = ids.map((id) => indexById.get(id)).filter((item): item is QuestionIndexItem => Boolean(item));
  const files = [...new Set(requested.map((item) => item.file))];
  const shards = (await Promise.all(files.map(loadShard))).flat();
  const byId = new Map(shards.map((question) => [question.runtimeId, mapRawQuestion(question)]));
  return ids.map((id) => byId.get(id)).filter((question): question is BankQuestion => Boolean(question));
}
