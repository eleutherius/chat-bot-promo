import type { Lang, T } from "../content/index.ts";
import { html } from "../html.ts";

/** Everything a section needs to render itself in one language. */
export interface Ctx {
  lang: Lang;
  t: T;
}

export type Section = (ctx: Ctx) => string;

/** Standard section opening: "01  LABEL" kicker, h2 title and optional intro. */
export const heading = (num: string, label: string, title: string, intro?: string): string => html`
    <div class="kicker reveal"><span>${num}</span><b>${label}</b></div>
    <h2 class="reveal">${title}</h2>
    ${intro && html`<p class="intro reveal">${intro}</p>`}`;
