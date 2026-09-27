import { CALC } from "../content/calc.ts";
import { chats, type ChatStep } from "../content/chats.ts";
import type { Key } from "../content/index.ts";
import { html } from "../html.ts";
import { icons } from "../icons.ts";
import { heading, type Section } from "./common.ts";

/** Chat bubbles for one step. Shared shape with the client renderer. */
export const renderChat = (step: ChatStep): string =>
  step.map(([type, body]) => html`<div class="msg ${type}" style="animation:none">${body}</div>`).join("");

export const flow: Section = ({ lang, t }) => {
  const steps = [
    ["s1.t", "s1.d"], ["s2.t", "s2.d"], ["s3.t", "s3.d"], ["s4.t", "s4.d"], ["s5.t", "s5.d"],
  ] as const;
  return html`
<section class="block" id="how">
  <div class="wrap">
    ${heading("03", t("flow.k"), t("flow.title"), t("flow.intro"))}
    <div class="flow">
      <div class="steps" id="steps">
        ${steps.map(([title, desc], i) => html`
        <div class="step${i === 0 && " active"}" tabindex="0" data-step="${i}"><span class="n">${i + 1}</span><h3>${t(title)}</h3><p>${t(desc)}</p></div>`)}
      </div>
      <div class="phone-wrap">
        <div class="phone">
          <div class="screen">
            <div class="screen-top"><span class="avatar"></span><div>your.shop<small>${t("chat.online")}</small></div></div>
            <div class="chat" id="chat" aria-live="polite">${renderChat(chats[lang][0]!)}</div>
          </div>
        </div>
        <div class="illus-note">${t("chat.note")}</div>
      </div>
    </div>
  </div>
</section>`;
};

export const analytics: Section = ({ t }) => {
  const modules = [
    ["sales", icons.bars, "mod.sales", "mod.sales.d"],
    ["ads", icons.megaphone, "mod.ads", "mod.ads.d"],
    ["chats", icons.chat, "mod.chats", "mod.chats.d"],
    ["products", icons.box, "mod.products", "mod.products.d"],
  ] as const;
  const features: [Key, Key][] = [["an.1.t", "an.1.d"], ["an.2.t", "an.2.d"], ["an.3.t", "an.3.d"]];
  return html`
<section class="block" id="analytics">
  <div class="wrap">
    ${heading("06", t("an.k"), t("an.title"), t("an.intro"))}
    <div class="dash">
      <div class="panel reveal">
        <div class="panel-head"><span>${t("an.panel")}</span><span class="dots"><i></i><i></i><i></i></span></div>
        <div class="modules" id="modules">
          ${modules.map(([id, ico, label], i) => html`
          <button class="module" type="button" data-mod="${id}" aria-pressed="${String(i === 0)}">${ico}<b>${t(label)}</b></button>`)}
        </div>
        ${modules.map(([id, , label, desc], i) => html`
        <div class="module-detail" data-mod-detail="${id}"${i > 0 && " hidden"}><h3>${t(label)}</h3><p>${t(desc)}</p></div>`)}
      </div>
      <div class="feat">
        ${features.map(([title, desc]) => html`
        <div class="reveal"><h3>${t(title)}</h3><p>${t(desc)}</p></div>`)}
      </div>
    </div>
  </div>
</section>`;
};

export const results: Section = ({ t }) => {
  const stats = [
    ["300–400", "res.1.t", "res.1.d"],
    ["204", "res.2.t", "res.2.d"],
    ["24/7", "res.3.t", "res.3.d"],
  ] as const;
  return html`
<section class="block results" id="results">
  <div class="wrap">
    ${heading("07", t("res.k"), t("res.title"), t("res.intro"))}
    <div class="stats">
      ${stats.map(([value, title, desc]) => html`
      <div class="stat reveal"><div class="v">${value}</div><h3>${t(title)}</h3><p>${t(desc)}</p></div>`)}
    </div>
    <div class="source">${t("res.src")}</div>
  </div>
</section>`;
};

export const cost: Section = ({ t }) => {
  const rows: [Key, Key, string][] = [
    ["cmp.r1", "cmp.r1a", t("cmp.r1b")],
    ["cmp.r2", "cmp.r2a", "24/7/365"],
    ["cmp.r3", "cmp.r3a", t("cmp.r3b")],
    ["cmp.r4", "cmp.r4a", t("cmp.r4b")],
  ];
  const range = (id: "conv" | "salary", label: Key) => html`
        <div class="field">
          <label for="${id}"><span>${t(label)}</span><output id="${id}Out"></output></label>
          <input type="range" id="${id}" min="${CALC[id].min}" max="${CALC[id].max}" step="${CALC[id].step}" value="${CALC[id].value}">
        </div>`;
  return html`
<section class="block" id="cost">
  <div class="wrap">
    ${heading("08", t("cost.k"), t("cost.title"), t("cost.intro"))}
    <div class="reveal" style="overflow-x:auto">
      <table class="compare">
        <thead><tr><th>${t("cmp.h0")}</th><th>${t("cmp.h1")}</th><th>${t("cmp.h2")}</th></tr></thead>
        <tbody>
          ${rows.map(([p, human, ai]) => html`
          <tr><th>${t(p)}</th><td>${t(human)}</td><td>${ai}</td></tr>`)}
        </tbody>
      </table>
    </div>
    <div class="callout reveal">${t("cost.callout")}</div>

    <div class="calc reveal" id="calc">
      <div class="calc-in">
        <h3>${t("calc.t")}</h3>
        <p class="muted" style="font-size:15px">${t("calc.d")}</p>
        ${range("conv", "calc.conv")}
        ${range("salary", "calc.salary")}
      </div>
      <div class="calc-out">
        <div class="bars">
          <div class="bar-row"><div class="lbl"><span>${t("calc.human")}</span><b id="hVal"></b></div><div class="track"><div class="fill h" id="hBar"></div></div></div>
          <div class="bar-row"><div class="lbl"><span>${t("calc.ai")}</span><b id="aiVal"></b></div><div class="track"><div class="fill ai" id="aiBar"></div></div></div>
        </div>
        <div class="ratio">
          <div class="big" id="ratio"></div>
          <p id="ratioText"></p>
          <p class="small" style="margin-top:12px">${t("calc.fine")}</p>
        </div>
      </div>
    </div>
  </div>
</section>`;
};
