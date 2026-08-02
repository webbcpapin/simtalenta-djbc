export type ScorableQuestion = {
  id: number;
  topic: string;
  difficulty: string;
  answer: number;
};

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
