import assert from "node:assert/strict";
import test from "node:test";
import { groupedResults, isRestorableSession, parseStoredJson, remainingSeconds, reorderAnswer, scoreQuestions, shuffleWithRandom } from "../app/quiz-core.ts";

const sample = [
  { id: 1, topic: "A", difficulty: "Analitik", answer: 2 },
  { id: 2, topic: "A", difficulty: "Menjebak", answer: 0 },
  { id: 3, topic: "B", difficulty: "Analitik", answer: 1 },
];

test("scoring distinguishes correct, wrong, and unanswered", () => {
  assert.deepEqual(scoreQuestions(sample, { 1: 2, 2: 3 }), { correct: 1, wrong: 1, unanswered: 1, total: 3 });
});
test("shuffle and answer reordering preserve key linkage", () => {
  const order = shuffleWithRandom([0, 1, 2, 3], () => 0);
  assert.deepEqual(order, [1, 2, 3, 0]);
  assert.equal(reorderAnswer(2, order), 1);
});
test("deadline timer never becomes negative", () => {
  assert.equal(remainingSeconds(10_500, 10_000), 1);
  assert.equal(remainingSeconds(9_000, 10_000), 0);
});
test("storage parser and recovery reject incompatible sessions", () => {
  assert.equal(parseStoredJson("{"), null);
  const valid = { schemaVersion: 2, session: { questionIds: [1] }, answers: {}, currentIndex: 0 };
  assert.equal(isRestorableSession(valid, 2, new Set([1])), true);
  assert.equal(isRestorableSession(valid, 3, new Set([1])), false);
  assert.equal(isRestorableSession({ ...valid, session: { questionIds: [99] } }, 2, new Set([1])), false);
});
test("results group by topic and difficulty", () => {
  assert.deepEqual(groupedResults(sample, { 1: 2, 2: 1, 3: 1 }, "topic"), [
    { name: "A", total: 2, correct: 1 }, { name: "B", total: 1, correct: 1 },
  ]);
});
