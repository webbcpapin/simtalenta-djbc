export type ScorableQuestion = {
  id: number;
  topic: string;
  difficulty: string;
  answer: number;
};

export type PackageQuestion = {
  id: number;
  domain: string;
  subdomain: string;
  difficulty: "easy" | "medium" | "hard";
  cognitiveLevel: "remember" | "apply" | "analyze" | "evaluate";
  questionType: string;
};

export type PackageSettings = {
  count: number;
  seed: string;
  domains?: readonly string[];
  subdomains?: readonly string[];
  difficulties?: readonly PackageQuestion["difficulty"][];
  avoidIds?: readonly number[];
  progress?: Record<number, { attempts: number; correct: number; wrong: number }>;
};

function hashSeed(seed: string) {
  let state = 2166136261;
  for (const char of seed) {
    state ^= char.charCodeAt(0);
    state = Math.imul(state, 16777619);
  }
  return state >>> 0;
}

export function seededRandom(seed: string) {
  let state = hashSeed(seed) || 0x3956;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function proportionalTargets<T extends string>(items: readonly PackageQuestion[], key: (item: PackageQuestion) => T, count: number) {
  const frequencies = new Map<T, number>();
  items.forEach((item) => frequencies.set(key(item), (frequencies.get(key(item)) ?? 0) + 1));
  const total = items.length || 1;
  const rows = [...frequencies].map(([name, frequency]) => ({ name, exact: frequency / total * count, value: Math.floor(frequency / total * count) }));
  const remaining = count - rows.reduce((sum, row) => sum + row.value, 0);
  rows.sort((left, right) => (right.exact - right.value) - (left.exact - left.value));
  for (let index = 0; index < remaining; index += 1) rows[index % rows.length].value += 1;
  return new Map(rows.map(({ name, value }) => [name, value]));
}

export function buildBalancedPackage(index: readonly PackageQuestion[], settings: PackageSettings) {
  const random = seededRandom(settings.seed);
  const allowedDomains = new Set(settings.domains ?? []);
  const allowedSubdomains = new Set(settings.subdomains ?? []);
  const allowedDifficulties = new Set(settings.difficulties ?? []);
  const recentlySeen = new Set(settings.avoidIds ?? []);
  const filtered = index.filter((question) =>
    (!allowedDomains.size || allowedDomains.has(question.domain)) &&
    (!allowedSubdomains.size || allowedSubdomains.has(question.subdomain)) &&
    (!allowedDifficulties.size || allowedDifficulties.has(question.difficulty))
  );
  const targetCount = Math.min(settings.count, filtered.length);
  const preferred = filtered.filter((question) => !recentlySeen.has(question.id));
  const pool = shuffleWithRandom(preferred.length >= targetCount ? preferred : filtered, random);
  const domainTargets = proportionalTargets(pool, (question) => question.domain, targetCount);
  const difficultyTargets = proportionalTargets(pool, (question) => question.difficulty, targetCount);
  const cognitiveTargets = proportionalTargets(pool, (question) => question.cognitiveLevel, targetCount);
  const used = new Set<number>();
  const counts = { domain: new Map<string, number>(), difficulty: new Map<string, number>(), cognitive: new Map<string, number>() };
  const selected: PackageQuestion[] = [];

  while (selected.length < targetCount) {
    const candidates = pool.filter((question) => !used.has(question.id));
    if (!candidates.length) break;
    candidates.sort((left, right) => {
      const score = (question: PackageQuestion) => {
        const domainNeed = (domainTargets.get(question.domain) ?? 0) - (counts.domain.get(question.domain) ?? 0);
        const difficultyNeed = (difficultyTargets.get(question.difficulty) ?? 0) - (counts.difficulty.get(question.difficulty) ?? 0);
        const cognitiveNeed = (cognitiveTargets.get(question.cognitiveLevel) ?? 0) - (counts.cognitive.get(question.cognitiveLevel) ?? 0);
        const progress = settings.progress?.[question.id];
        const adaptive = !progress ? 3 : progress.wrong * 2 - progress.correct - progress.attempts * 0.1;
        return domainNeed * 8 + difficultyNeed * 4 + cognitiveNeed * 4 + adaptive;
      };
      return score(right) - score(left);
    });
    const chosen = candidates[0];
    selected.push(chosen);
    used.add(chosen.id);
    counts.domain.set(chosen.domain, (counts.domain.get(chosen.domain) ?? 0) + 1);
    counts.difficulty.set(chosen.difficulty, (counts.difficulty.get(chosen.difficulty) ?? 0) + 1);
    counts.cognitive.set(chosen.cognitiveLevel, (counts.cognitive.get(chosen.cognitiveLevel) ?? 0) + 1);
  }
  return shuffleWithRandom(selected, random);
}

export function balancedOptionOrders(
  questions: readonly { id: number; answer: number }[],
  seed: string,
) {
  const random = seededRandom(`${seed}:options`);
  const targets = shuffleWithRandom(questions.map((_, index) => index % 4), random);
  return Object.fromEntries(questions.map((question, index) => {
    const order = shuffleWithRandom([0, 1, 2, 3], random);
    const current = order.indexOf(question.answer);
    const target = targets[index];
    [order[current], order[target]] = [order[target], order[current]];
    return [question.id, order];
  }));
}

export function shuffleWithRandom<T>(input: readonly T[], random = Math.random) {
  const next = [...input];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function reorderAnswer(answer: number, order: readonly number[]) {
  return order.indexOf(answer);
}

export function scoreQuestions(
  questions: readonly ScorableQuestion[],
  answers: Record<number, number>,
) {
  const correct = questions.filter(
    (question) => answers[question.id] === question.answer,
  ).length;
  const unanswered = questions.filter(
    (question) => answers[question.id] === undefined,
  ).length;
  return {
    correct,
    wrong: questions.length - correct - unanswered,
    unanswered,
    total: questions.length,
  };
}

export function groupedResults(
  questions: readonly ScorableQuestion[],
  answers: Record<number, number>,
  groupBy: "topic" | "difficulty",
) {
  const groups = new Map<string, { total: number; correct: number }>();
  questions.forEach((question) => {
    const key = question[groupBy];
    const current = groups.get(key) ?? { total: 0, correct: 0 };
    current.total += 1;
    if (answers[question.id] === question.answer) current.correct += 1;
    groups.set(key, current);
  });
  return [...groups].map(([name, values]) => ({ name, ...values }));
}

export function remainingSeconds(deadlineAt: number, now = Date.now()) {
  return Math.max(0, Math.ceil((deadlineAt - now) / 1000));
}

export function parseStoredJson<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function isRestorableSession(
  value: unknown,
  schemaVersion: number,
  validQuestionIds: Set<number>,
) {
  if (!value || typeof value !== "object") return false;
  const candidate = value as {
    schemaVersion?: number;
    session?: { questionIds?: unknown };
    answers?: unknown;
    currentIndex?: unknown;
  };
  return (
    candidate.schemaVersion === schemaVersion &&
    Array.isArray(candidate.session?.questionIds) &&
    candidate.session.questionIds.length > 0 &&
    candidate.session.questionIds.every(
      (id) => typeof id === "number" && validQuestionIds.has(id),
    ) &&
    typeof candidate.answers === "object" &&
    typeof candidate.currentIndex === "number"
  );
}
