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
  assert.match(html, /Mulai simulasi 100 soal/);
  assert.match(html, /Belajar 20 soal adaptif/);
  assert.match(html, /Latihan per Topik/);
  assert.match(html, /Manajemen Kinerja/);
  assert.match(html, /Keuangan &amp; Pengadaan/);
  assert.doesNotMatch(html, /codex-preview|loading skeleton|react-loading-skeleton/i);
});

test("production source replaces all starter preview artifacts", async () => {
  const [page, layout, questions, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/questions.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Simulasi Penuh/);
  assert.match(page, /Mengapa benar/);
  assert.match(page, /Mengapa bukan/);
  assert.match(page, /localStorage/);
  assert.match(layout, /lang="id"/);
  assert.equal((questions.match(/^\s+id:\s+\d+,/gm) ?? []).length, 100);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/", import.meta.url)));
});
