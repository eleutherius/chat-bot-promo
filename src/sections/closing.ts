import { html } from "../html.ts";
import { icons } from "../icons.ts";
import { heading, type Section } from "./common.ts";

export const pricing: Section = ({ t }) => html`
<section class="block" id="pricing">
  <div class="wrap">
    ${heading("09", t("pr.k"), t("pr.title"))}
    <div class="grid g2" style="margin-top:40px">
      <div class="card price reveal">
        <span class="price-tag">${t("pr.1.tag")}</span>
        <div class="amt">$700<small>${t("pr.1.once")}</small></div>
        <p>${t("pr.1.d")}</p>
      </div>
      <div class="card price feat-card reveal">
        <span class="price-tag">${t("pr.2.tag")}</span>
        <div class="amt">×2<small>${t("pr.2.unit")}</small></div>
        <p>${t("pr.2.d")}</p>
      </div>
    </div>
    <div class="note reveal">${icons.check}<span>${t("pr.note")}</span></div>
  </div>
</section>`;

export const closing: Section = ({ t }) => html`
<section class="closing">
  <canvas id="waves2" aria-hidden="true"></canvas>
  <div class="wrap">
    <h2>${t("end.title")}</h2>
    <p>${t("end.d")}</p>
    <div class="ctas" style="margin-top:28px"><a class="btn btn-light" href="#top">${t("end.cta")}</a></div>
  </div>
</section>`;

export const footer: Section = ({ t }) => html`
<footer>
  <div class="wrap"><span>© 2026 Fineko</span><span>${t("foot")}</span></div>
</footer>`;
