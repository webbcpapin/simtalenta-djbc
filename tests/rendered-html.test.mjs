import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the SIMTALENTA landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>SIMTALENTA DJBC · Simulator Dukungan Manajemen<\/title>/i,
  );
  assert.match(html, /Simulasi penuh 100 soal/i);
  assert.match(html, /Mulai Sprint 3 Hari/);
  assert.match(html, /Kuasai yang paling menentukan dalam 3 hari/);
  assert.match(html, /manifest\.webmanifest/);
  assert.match(html, /apple-touch-icon\.png/);
  assert.match(html, /Tanya materi/);
  assert.match(html, /© 2026 agung3956/);
  assert.match(html, /Semoga setiap ikhtiar belajar diberi kemudahan/);
  assert.match(html, /Ringkasan Materi/);
  assert.match(html, /Latihan per Topik/);
  assert.match(html, /Manajemen Kinerja/);
  assert.match(html, /Manajemen Talenta &amp; SDM/);
  assert.match(html, /Keuangan &amp; Pengadaan/);
  assert.match(html, /AI dalam Probis/);
  assert.doesNotMatch(html, /codex-preview|loading skeleton|react-loading-skeleton/i);
});

test("production source replaces all starter preview artifacts", async () => {
  const [
    page,
    layout,
    questions,
    hardOptions,
    supplemental,
    kmkFlashcards,
    summaries,
    knowledgeChat,
    packageJson,
    competencyJson,
  ] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/questions.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/hard-options.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/supplemental-questions.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/kmk127-flashcard-questions.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/summaries.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/knowledge-chat.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/generated-competency-questions.json", import.meta.url), "utf8"),
  ]);
  const competencyQuestions = JSON.parse(competencyJson);

  assert.match(page, /Simulasi Penuh/);
  assert.match(page, /Sprint 3 Hari/);
  assert.match(page, /topics\.flatMap/);
  assert.match(page, /distinctQuestions\(questions\)/);
  assert.match(page, /100 soal unik ditarik acak/);
  assert.match(page, /Mengapa benar/);
  assert.match(page, /Mengapa bukan/);
  assert.match(page, /Pembahasan menyeluruh/);
  assert.match(page, /explained-option/);
  assert.match(page, /score >= 6/);
  assert.match(page, /\.slice\(0, 1\)/);
  assert.match(page, /Pokok yang wajib dipahami/);
  assert.match(page, /Jebakan yang perlu dihindari/);
  assert.match(page, /const isStudyMode = Boolean\(session\)/);
  assert.doesNotMatch(page, /tanpa pembahasan sebelum dikumpulkan/);
  assert.match(page, /localStorage/);
  assert.match(page, /optionOrders/);
  assert.match(page, /Ringkasan Hafalan/);
  assert.match(page, /setRevealed/);
  assert.match(layout, /lang="id"/);
  assert.match(questions, /uniqueQuestionCount = seedQuestions\.length/);
  assert.match(questions, /\.\.\.competencyQuestions/);
  assert.match(questions, /seedQuestions\.map/);
  assert.match(questions, /notebookQuiz15/);
  assert.match(questions, /notebookQuiz30/);
  assert.doesNotMatch(questions, /const stemFrames/);
  assert.doesNotMatch(
    questions,
    /Seorang penelaah menemukan opsi yang hanya berbeda angka atau istilah/,
  );
  assert.equal((questions.match(/^\s+id:\s+\d+,/gm) ?? []).length, 100);
  assert.equal((hardOptions.match(/^\s+\d+:\s+\[$/gm) ?? []).length, 100);
  assert.equal((supplemental.match(/^\s+q\(/gm) ?? []).length, 36);
  assert.equal((kmkFlashcards.match(/\{"stem":/g) ?? []).length, 67);
  assert.match(kmkFlashcards, /SMART-C/);
  assert.match(kmkFlashcards, /Balanced Scorecard/);
  assert.match(kmkFlashcards, /semanticGroup/);
  assert.match(kmkFlashcards, /Jawaban tersebut tepat untuk pertanyaan/);
  assert.ok((summaries.match(/^\s+id:\s*"/gm) ?? []).length >= 25);
  assert.match(hardOptions, /hari kerja/);
  assert.match(hardOptions, /PP Nomor 94 Tahun 2021/);
  assert.match(supplemental, /3 jam 45 menit/);
  assert.match(summaries, /25–20–15/);
  assert.match(knowledgeChat, /questions\.length\.toLocaleString\("id-ID"\)/);
  assert.match(knowledgeChat, /Saya belum menemukan dasar yang cukup kuat/);
  assert.match(knowledgeChat, /Sumber jawaban/);
  assert.equal(competencyQuestions.length, 1002);
  assert.equal(
    competencyQuestions.filter(({ bankId }) => bankId.startsWith("utama-")).length,
    1000,
  );
  assert.equal(
    competencyQuestions.filter(({ bankId }) => bankId.startsWith("tambahan-")).length,
    2,
  );
  const exactQuestionKeys = new Set();
  for (const question of competencyQuestions) {
    assert.equal(question.options.length, 4);
    assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4);
    assert.ok(question.stem.trim());
    assert.doesNotMatch(question.stem, /^Seorang peserta merangkum materi /i);
    assert.ok(question.options.every(([option, explanation]) => option && explanation));
    const key = JSON.stringify([
      question.stem.toLowerCase(),
      question.options.map(([option]) => option.toLowerCase()),
    ]);
    assert.ok(!exactQuestionKeys.has(key), `soal identik: ${question.bankId}`);
    exactQuestionKeys.add(key);
  }
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/", import.meta.url)));
});

test("mobile install assets are complete", async () => {
  const manifest = JSON.parse(
    await readFile(new URL("../public/manifest.webmanifest", import.meta.url), "utf8"),
  );

  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.start_url, "./");
  assert.deepEqual(
    manifest.icons.map(({ sizes }) => sizes),
    ["192x192", "512x512"],
  );

  await Promise.all([
    access(new URL("../public/favicon-32.png", import.meta.url)),
    access(new URL("../public/apple-touch-icon.png", import.meta.url)),
    access(new URL("../public/icon-192.png", import.meta.url)),
    access(new URL("../public/icon-512.png", import.meta.url)),
  ]);
});
