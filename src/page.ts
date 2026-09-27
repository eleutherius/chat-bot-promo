import { chats } from "./content/chats.ts";
import { LANGS, translator, type Lang } from "./content/index.ts";
import type { PageData } from "./client/data.ts";
import { html, text } from "./html.ts";
import type { Ctx } from "./sections/common.ts";
import { closing, footer, pricing } from "./sections/closing.ts";
import { hero, nav } from "./sections/hero.ts";
import { analytics, cost, flow, results } from "./sections/interactive.ts";
import { catalog, handoff, problem, system } from "./sections/story.ts";

export interface Assets {
  css: string;
  js: string;
}

const FONTS =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&display=swap";

/** JSON for an inline <script>; escapes "<" so content can't close the tag. */
const inlineJson = (data: unknown): string => JSON.stringify(data).replace(/</g, "\\u003c");

/** Render the full HTML document for one language. */
export function renderPage(lang: Lang, assets: Assets): string {
  const t = translator(lang);
  const ctx: Ctx = { lang, t };
  const cfg = LANGS[lang];
  const up = cfg.dir ? "../" : "./";

  const data: PageData = {
    locale: cfg.locale,
    chats: chats[lang],
    strings: {
      month: t("calc.month"),
      cheaper: t("calc.cheaper"),
      pricier: t("calc.pricier"),
    },
  };

  return html`<!doctype html>
<html lang="${cfg.code}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>document.documentElement.classList.add("js")</script>
<title>${text(t("meta.title"))}</title>
<meta name="description" content="${text(t("hero.lede"))}">
<meta property="og:title" content="${text(t("meta.title"))}">
<meta property="og:description" content="${text(t("hero.lede"))}">
${(Object.keys(LANGS) as Lang[]).map(l => html`
<link rel="alternate" hreflang="${LANGS[l].code}" href="${up}${LANGS[l].dir && `${LANGS[l].dir}/`}">`)}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<style>
${assets.css}
</style>
</head>
<body>
${nav(ctx)}
${hero(ctx)}
<main>
${problem(ctx)}
${system(ctx)}
${flow(ctx)}
${handoff(ctx)}
${catalog(ctx)}
${analytics(ctx)}
${results(ctx)}
${cost(ctx)}
${pricing(ctx)}
${closing(ctx)}
</main>
${footer(ctx)}
<script id="page-data" type="application/json">${inlineJson(data)}</script>
<script>${assets.js}</script>
</body>
</html>
`;
}
