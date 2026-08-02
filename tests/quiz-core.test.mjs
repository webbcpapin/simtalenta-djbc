import assert from "node:assert/strict";
import test from "node:test";
import { balancedOptionOrders, buildBalancedPackage, groupedResults, isRestorableSession, parseStoredJson, remainingSeconds, reorderAnswer, scoreQuestions, shuffleWithRandom } from "../app/quiz-core.ts";

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

test("seeded packages are deterministic, unique, filtered, and avoid recent IDs", () => {
  const index = Array.from({ length: 60 }, (_, offset) => ({
    id: offset + 1,
    domain: `d${offset % 3}`,
    subdomain: `s${offset % 5}`,
    difficulty: ["easy", "medium", "hard"][offset % 3],
    cognitiveLevel: ["remember", "apply", "analyze", "evaluate"][offset % 4],
    questionType: offset % 4 ? "case_based_mcq" : "conceptual_mcq",
  }));
  const settings = { count: 15, seed: "paket-uji", domains: ["d1"], avoidIds: [2, 5, 8] };
  const first = buildBalancedPackage(index, settings);
  const second = buildBalancedPackage(index, settings);
  assert.deepEqual(first.map(({ id }) => id), second.map(({ id }) => id));
  assert.equal(first.length, 15);
  assert.equal(new Set(first.map(({ id }) => id)).size, 15);
  assert.ok(first.every(({ domain }) => domain === "d1"));
  assert.ok(first.every(({ id }) => !settings.avoidIds.includes(id)));
});

test("option orders preserve every option and balance resulting key positions", () => {
  const questions = Array.from({ length: 20 }, (_, index) => ({ id: index + 1, answer: (index * 3) % 4 }));
  const orders = balancedOptionOrders(questions, "opsi-uji");
  const targets = questions.map((question) => orders[question.id].indexOf(question.answer));
  assert.deepEqual(targets.map((answer) => targets.filter((value) => value === answer).length), Array(20).fill(5));
  assert.ok(Object.values(orders).every((order) => [...order].sort().join("") === "0123"));
});
