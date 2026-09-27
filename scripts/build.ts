/**
 * Static site build: bundles the client TypeScript, inlines CSS and JS,
 * and renders one pre-translated HTML page per language into dist/.
 *
 *   npm run build            → dist/index.html, dist/en/index.html
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild, transform } from "esbuild";
import { LANGS, type Lang } from "../src/content/index.ts";
import { renderPage } from "../src/page.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "dist");

export async function build(): Promise<string[]> {
  const bundle = await esbuild({
    entryPoints: [join(root, "src/client/main.ts")],
    bundle: true,
    minify: true,
    format: "iife",
    target: "es2020",
    write: false,
  });
  const js = bundle.outputFiles[0]!.text.trim();

  const rawCss = await readFile(join(root, "src/styles.css"), "utf8");
  const css = (await transform(rawCss, { loader: "css", minify: true })).code.trim();

  await rm(outDir, { recursive: true, force: true });
  const written: string[] = [];
  for (const lang of Object.keys(LANGS) as Lang[]) {
    const file = join(outDir, LANGS[lang].dir, "index.html");
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, renderPage(lang, { css, js }));
    written.push(file);
  }
  return written;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const files = await build();
  for (const f of files) console.log("✓", f.slice(root.length + 1));
}
