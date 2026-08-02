import assert from "node:assert/strict";
import test from "node:test";
import { historicalRegulations, questions, sourceCatalog } from "../app/questions.ts";

test("every runtime question has complete current-source metadata", () => {
  assert.equal(questions.length, 227);
  for (const question of questions) {
    assert.equal(question.active, true);
    assert.equal(question.regulationStatus, "current");
    assert.equal(question.options.length, 4);
    assert.equal(question.optionExplanations.length, 4);
    assert.ok(question.sourceTitle && question.sourceUrl.startsWith("http"));
    assert.match(question.lastVerified, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(question.tags.length >= 3 && question.version >= 2);
    assert.equal(sourceCatalog[question.source].status, "current");
  }
});

test("superseded talent regulation is explicit and cannot enter runtime", () => {
  assert.equal(historicalRegulations[0].status, "superseded");
  assert.match(historicalRegulations[0].replacedBy, /PMK 38 Tahun 2025/);
  assert.equal(questions.some(({ source }) => source === "extendedBank"), false);
});

test("canonical answer distribution is balanced", () => {
  const counts = [0, 1, 2, 3].map((answer) => questions.filter((question) => question.answer === answer).length);
  assert.ok(Math.max(...counts) - Math.min(...counts) <= 1, counts.join("/"));
});
