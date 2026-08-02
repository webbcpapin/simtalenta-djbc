import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the production landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /SIMTALENTA DJBC/i);
  assert.match(html, /1\.000/);
  assert.match(html, /1\.354/);
  assert.match(html, /Simulasi penuh/);
  assert.match(html, /Sprint 3 Hari/);
  assert.match(html, /Manajemen Talenta/);
  assert.match(html, /Statement of Purpose/);
  assert.match(html, /manifest\.webmanifest/);
  assert.match(html, /© 2026 agung3956/);
  assert.match(html, /Semoga setiap ikhtiar belajar diberi kemudahan/);
  assert.doesNotMatch(html, /loading skeleton|react-loading-skeleton/i);
});
test("runtime uses lazy shards, versioned sessions, filters, history, and favorites", async () => {
  const [page, bank, core, config, packageJson, manifest, index] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/question-bank.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/quiz-core.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/quiz-config.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../public/data/questions/manifest.json", import.meta.url), "utf8"),
    readFile(new URL("../app/generated-bank-index.json", import.meta.url), "utf8"),
  ]);
  assert.equal(JSON.parse(manifest).activeCount, 1000);
  assert.equal(JSON.parse(index).length, 1000);
  assert.match(bank, /loadQuestionsByIds/);
  assert.match(bank, /shardCache/);
  assert.match(page, /buildBalancedPackage/);
  assert.match(page, /balancedOptionOrders/);
  assert.match(page, /questionBankVersion/);
  assert.match(page, /domainFilter/);
  assert.match(page, /subdomainFilter/);
  assert.match(page, /difficultyFilter/);
  assert.match(page, /FAVORITES_KEY/);
  assert.match(page, /HISTORY_KEY/);
  assert.match(page, /RECENT_IDS_KEY/);
  assert.match(page, /Mengapa benar/);
  assert.match(page, /Mengapa bukan/);
  assert.match(page, /Uraian topik/);
  assert.match(core, /seededRandom/);
  assert.match(config, /schemaVersion:\s*3/);
  assert.match(packageJson, /questions:duplicates/);
  assert.match(packageJson, /questions:privacy/);
});

test("mobile install assets and required documentation are complete", async () => {
  const manifest = JSON.parse(await readFile(new URL("../public/manifest.webmanifest", import.meta.url), "utf8"));
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.start_url, "./");
  assert.deepEqual(manifest.icons.map(({ sizes }) => sizes), ["192x192", "512x512"]);
  await Promise.all([
    "favicon-32.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png",
  ].map((file) => access(new URL(`../public/${file}`, import.meta.url))));
  await Promise.all([
    "audit-awal.md", "blueprint-1000-soal.md", "metodologi-penyusunan-soal.md",
    "standar-review-soal.md", "sumber-dan-validasi.md", "laporan-duplikasi.md",
    "arsitektur-bank-soal.md", "panduan-simulasi.md", "perubahan.md",
  ].map((file) => access(new URL(`../docs/${file}`, import.meta.url))));
});
