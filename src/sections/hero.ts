import { LANGS, type Lang } from "../content/index.ts";
import { html } from "../html.ts";
import type { Section } from "./common.ts";

/** Relative link from the page of `from` to the page of `to`. */
const langHref = (from: Lang, to: Lang): string => {
  const up = LANGS[from].dir ? "../" : "./";
  return up + (LANGS[to].dir ? `${LANGS[to].dir}/` : "");
};

export const nav: Section = ({ lang, t }) => html`
<nav class="nav" id="nav">
  <div class="wrap">
    <a class="logo" href="#top"><span class="logo-dot"></span>Fineko</a>
    <div class="nav-links">
      <a href="#how">${t("nav.how")}</a>
      <a href="#crm">${t("nav.crm")}</a>
      <a href="#results">${t("nav.results")}</a>
      <a href="#pricing">${t("nav.pricing")}</a>
    </div>
    <div class="lang" role="group" aria-label="Language">
      ${(Object.keys(LANGS) as Lang[]).map(l => html`
      <a href="${langHref(lang, l)}" hreflang="${LANGS[l].code}" lang="${LANGS[l].code}" data-lang-link${l === lang && ` aria-current="true"`}>${LANGS[l].label}</a>`)}
    </div>
  </div>
</nav>`;

export const hero: Section = ({ t }) => html`
<header class="hero" id="top">
  <canvas id="waves" aria-hidden="true"></canvas>
  <div class="wrap">
    <span class="badge"><i></i><span>${t("hero.badge")}</span></span>
    <h1>${t("hero.title")}</h1>
    <p class="lede">${t("hero.lede")}</p>
    <div class="ctas">
      <a class="btn btn-light" href="#how">${t("hero.cta1")}</a>
      <a class="btn btn-ghost" href="#cost">${t("hero.cta2")}</a>
    </div>
  </div>
  <div class="scroll-hint">${t("hero.scroll")}</div>
</header>`;
