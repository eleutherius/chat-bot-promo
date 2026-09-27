import { html } from "../html.ts";
import { icons } from "../icons.ts";
import { heading, type Section } from "./common.ts";
import type { Key } from "../content/index.ts";

export const problem: Section = ({ t }) => {
  const clock: [string, Key, boolean?][] = [
    ["23:47", "clock.1"], ["23:48", "clock.2"], ["00:30", "clock.3", true], ["09:15", "clock.4"],
  ];
  const pains = [
    ["p1.t", "p1.d"], ["p2.t", "p2.d"], ["p3.t", "p3.d"], ["p4.t", "p4.d"], ["p5.t", "p5.d"],
  ] as const;
  return html`
<section class="block" id="problem">
  <div class="wrap">
    <div class="kicker reveal"><span>01</span><b>${t("problem.k")}</b></div>
    <div class="story">
      <div class="reveal">
        <h2>${t("problem.title")}</h2>
        <p class="intro" style="margin-bottom:0">${t("problem.intro")}</p>
      </div>
      <div class="clock reveal">
        ${clock.map(([time, key, lost]) => html`
        <div class="clock-row${lost && " lost"}"><time>${time}</time><span>${t(key)}</span></div>`)}
      </div>
    </div>
    <div class="grid problems">
      ${pains.map(([title, desc], i) => html`
      <div class="card reveal"><span class="num">0${i + 1}</span><h3>${t(title)}</h3><p>${t(desc)}</p></div>`)}
    </div>
  </div>
</section>`;
};

export const system: Section = ({ t }) => {
  const engine = (cls: string, name: string, keys: readonly [Key, Key, Key, Key, Key]) => html`
      <div class="card engine${cls} reveal">
        <span class="tag">${t(keys[0])}</span>
        <h3>${name}</h3>
        <p>${t(keys[1])}</p>
        <ul>${keys.slice(2).map(k => html`<li>${t(k)}</li>`)}</ul>
      </div>`;
  return html`
<section class="block" id="system">
  <div class="wrap">
    ${heading("02", t("sys.k"), t("sys.title"), t("sys.intro"))}
    <div class="grid g2 engines">
      ${engine("", "Fineko Flows", ["sys.a.tag", "sys.a.d", "sys.a.l1", "sys.a.l2", "sys.a.l3"])}
      <div class="plus" aria-hidden="true">+</div>
      ${engine(" crm", "Fineko CRM", ["sys.b.tag", "sys.b.d", "sys.b.l1", "sys.b.l2", "sys.b.l3"])}
    </div>
  </div>
</section>`;
};

export const handoff: Section = ({ t }) => {
  const cards = [
    [icons.user, "ho.1.t", "ho.1.d"],
    [icons.question, "ho.2.t", "ho.2.d"],
    [icons.refresh, "ho.3.t", "ho.3.d"],
  ] as const;
  const loop = ["loop.1", "loop.2", "loop.3", "loop.4", "loop.5"] as const;
  return html`
<section class="block" id="handoff">
  <div class="wrap">
    ${heading("04", t("ho.k"), t("ho.title"), t("ho.intro"))}
    <div class="handoff reveal">
      ${cards.map(([ico, title, desc]) => html`
      <div class="card"><div class="ico">${ico}</div><h3>${t(title)}</h3><p>${t(desc)}</p></div>`)}
    </div>
    <div class="loop reveal">
      ${loop.map((k, i) => i < loop.length - 1
        ? html`<span>${t(k)}</span><span class="arr">→</span>`
        : html`<span class="hl">${t(k)}</span>`)}
    </div>
  </div>
</section>`;
};

export const catalog: Section = ({ t }) => {
  const cards = [
    [icons.tag, "cat.1.t", "cat.1.d"],
    [icons.book, "cat.2.t", "cat.2.d"],
    [icons.trend, "cat.3.t", "cat.3.d"],
    [icons.lock, "cat.4.t", "cat.4.d"],
  ] as const;
  return html`
<section class="block" id="crm">
  <div class="wrap">
    ${heading("05", t("cat.k"), t("cat.title"), t("cat.intro"))}
    <div class="grid g4">
      ${cards.map(([ico, title, desc]) => html`
      <div class="card reveal"><div class="ico">${ico}</div><h3>${t(title)}</h3><p>${t(desc)}</p></div>`)}
    </div>
  </div>
</section>`;
};
