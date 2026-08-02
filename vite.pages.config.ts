import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/simtalenta-djbc/",
  root: path.resolve(__dirname, "github-pages"),
  publicDir: path.resolve(__dirname, "public"),
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, "docs"),
    // Laporan audit juga disimpan di docs/ dan harus bertahan saat aset Pages dibangun ulang.
    emptyOutDir: false,
  },
});
