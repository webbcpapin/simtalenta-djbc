import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));
async function listJson(folder) {
  const entries = await readdir(folder, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory()
    ? listJson(path.join(folder, entry.name))
    : entry.name.endsWith(".json") ? [path.join(folder, entry.name)] : []))).flat();
}

test("manifest and active shards contain exactly 1,000 traceable questions", async () => {
  const manifest = await readJson(path.join(root, "src/data/questions/manifest.json"));
  const registry = await readJson(path.join(root, "src/data/sources/source-registry.json"));
  const sourceMap = new Map(registry.map((source) => [source.sourceId, source]));
  const files = (await listJson(path.join(root, "src/data/questions"))).filter((file) => !file.endsWith("manifest.json"));
  const active = (await Promise.all(files.map(readJson))).flat();

  assert.equal(manifest.activeCount, 1000);
  assert.equal(active.length, 1000);
  assert.equal(new Set(active.map((question) => question.id)).size, 1000);
  assert.equal(manifest.files.length, 23);
  for (const entry of manifest.files) {
    const serialized = await readFile(path.join(root, "src/data/questions", entry.file), "utf8");
    assert.equal(createHash("sha256").update(serialized).digest("hex"), entry.sha256);
  }
  for (const question of active) {
    assert.equal(question.status, "active");
    assert.equal(question.options.length, 4);
    assert.equal(question.options.filter((option) => option.id === question.correctOptionId).length, 1);
    assert.ok(question.options.every((option) => option.text && option.rationale));
    assert.ok(question.explanation && question.keyTakeaway);
    assert.ok(question.review.total >= 85);
    assert.equal(question.sourceRefs.length, 1);
    const source = sourceMap.get(question.sourceRefs[0].sourceId);
    assert.ok(source?.allowedForScoredQuestions);
    assert.equal(source?.containsPersonalData, false);
    assert.ok(["current", "non_normative"].includes(source?.status));
  }
});
test("blueprint, difficulty, cognition, and answer keys are exact", async () => {
  const stats = await readJson(path.join(root, "reports/question-bank-statistics.json"));
  assert.deepEqual(stats.byDomain, {
    karier_bidang_penugasan: 110,
    kepatuhan_integritas_disiplin: 140,
    kompetensi_kepemimpinan: 150,
    learning_knowledge: 50,
    manajemen_kinerja: 120,
    manajemen_talenta: 180,
    pengembangan_sdm: 130,
    sop_kesiapan: 30,
    tata_kelola_risiko: 90,
  });
  assert.deepEqual(stats.byCognitiveLevel, { analyze: 350, apply: 350, evaluate: 150, remember: 150 });
  assert.deepEqual(stats.byDifficulty, { easy: 250, hard: 250, medium: 500 });
  assert.deepEqual(stats.correctOptionDistribution, { A: 250, B: 250, C: 250, D: 250 });
  assert.equal(stats.caseAndApplicationCount, 850);
  assert.equal(stats.conceptualCount, 150);
});

test("candidate pool and privacy exclusions remain auditable", async () => {
  const candidates = (await Promise.all((await listJson(path.join(root, "src/data/question-candidates"))).map(readJson))).flat();
  const privacy = await readJson(path.join(root, "reports/privacy-scan-report.json"));
  assert.equal(candidates.length, 1354);
  assert.ok(candidates.some((question) => question.status === "rejected"));
  assert.ok(candidates.filter((question) => question.review.total >= 85).length >= 1000);
  assert.equal(privacy.findings.length, 0);
  assert.deepEqual(privacy.excludedSourceIds.sort(), ["SRC-PERSONAL-CANDIDATES", "SRC-PERSONAL-STATEMENTS"]);
});
