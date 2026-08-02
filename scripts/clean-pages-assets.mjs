import { rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const generatedAssets = path.join(root, "docs", "assets");
const generatedQuestions = path.join(root, "docs", "data", "questions");
for (const target of [generatedAssets, generatedQuestions]) {
  const resolvedTarget = path.resolve(target);
  const docsRoot = `${path.resolve(root, "docs")}${path.sep}`;
  if (!resolvedTarget.startsWith(docsRoot)) throw new Error(`Target build di luar docs: ${resolvedTarget}`);
  await rm(resolvedTarget, { recursive: true, force: true });
  console.log(`Aset build lama dibersihkan: ${resolvedTarget}`);
}
