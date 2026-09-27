/**
 * Minimal tagged template for building HTML strings.
 * Arrays are joined, null/undefined/false render as nothing.
 * Interpolated values are NOT escaped: all content comes from this repo
 * and may contain markup. Use `esc` for anything that must be plain text.
 */
type Value = string | number | false | null | undefined | readonly Value[];

const render = (v: Value): string =>
  Array.isArray(v) ? v.map(render).join("") : v === false || v == null ? "" : String(v);

export const html = (strings: TemplateStringsArray, ...values: Value[]): string =>
  strings.reduce((out, s, i) => out + s + (i < values.length ? render(values[i]) : ""), "");

export const esc = (s: string): string =>
  s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Strip tags, for places like <title> that need plain text. */
export const text = (s: string): string => esc(s.replace(/<[^>]*>/g, ""));
