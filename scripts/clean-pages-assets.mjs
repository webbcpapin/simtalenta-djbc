import { rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const generatedAssets = path.join(root, "docs", "assets");
await rm(generatedAssets, { recursive: true, force: true });
console.log(`Aset build lama dibersihkan: ${generatedAssets}`);

