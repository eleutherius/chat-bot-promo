import { CALC } from "../content/calc.ts";
import type { ChatStep } from "../content/chats.ts";
import type { PageData } from "./data.ts";
import { waves } from "./waves.ts";

const data = JSON.parse(document.getElementById("page-data")!.textContent!) as PageData;
const $ = <T extends Element = HTMLElement>(sel: string) => document.querySelector<T>(sel)!;
const $$ = <T extends Element = HTMLElement>(sel: string) => [...document.querySelectorAll<T>(sel)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Language links: keep the current section when switching language. */
$$<HTMLAnchorElement>("[data-lang-link]").forEach(a =>
  a.addEventListener("click", () => { a.hash = location.hash; }));

/* Customer journey: scroll-driven steps with a chat in the phone mock. */
const chatEl = $("#chat");
function renderChat(step: ChatStep): void {
  chatEl.replaceChildren(...step.map(([type, body], i) => {
    const m = document.createElement("div");
    m.className = `msg ${type}`;
    m.innerHTML = body;
    m.style.animationDelay = `${i * 0.25}s`;
    return m;
  }));
}

const steps = $$(".step");
let currentStep = 0;
function setStep(i: number): void {
  if (i === currentStep) return;
  currentStep = i;
  steps.forEach((s, j) => s.classList.toggle("active", j === i));
  renderChat(data.chats[i]!);
}
steps.forEach((s, i) => {
  s.addEventListener("click", () => setStep(i));
  s.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setStep(i); }
  });
});
const stepObserver = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.step));
}, { rootMargin: "-45% 0px -45% 0px" });
steps.forEach(s => stepObserver.observe(s));

/* Analytics dashboard: module tabs. */
$$<HTMLButtonElement>(".module").forEach(btn => btn.addEventListener("click", () => {
  const id = btn.dataset.mod;
  $$(".module").forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
  $$("[data-mod-detail]").forEach(d => { d.hidden = d.dataset.modDetail !== id; });
}));

/* Cost calculator. */
const conv = $<HTMLInputElement>("#conv");
const salary = $<HTMLInputElement>("#salary");
const fmt = (n: number) => new Intl.NumberFormat(data.locale).format(Math.round(n));

function calc(): void {
  const c = Number(conv.value), s = Number(salary.value);
  const ai = c * CALC.daysPerMonth * CALC.costPerConversation;
  const max = Math.max(s, ai);
  const { month, cheaper, pricier } = data.strings;
  $("#convOut").textContent = fmt(c);
  $("#salaryOut").textContent = `${fmt(s)} ₴`;
  $("#hVal").textContent = `${fmt(s)} ${month}`;
  $("#aiVal").textContent = `≈ ${fmt(ai)} ${month}`;
  $("#hBar").style.width = `${(s / max) * 100}%`;
  $("#aiBar").style.width = `${Math.max((ai / max) * 100, 1.5)}%`;
  const r = s / ai;
  $("#ratio").textContent = r >= 1 ? `${r >= 10 ? Math.round(r) : r.toFixed(1)}×` : "—";
  $("#ratioText").textContent = r >= 1 ? cheaper : pricier;
}
conv.addEventListener("input", calc);
salary.addEventListener("input", calc);
calc();

/* Nav background after the hero, and reveal-on-scroll. */
const nav = $("#nav");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > innerHeight * 0.85);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

const revealObserver = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); }
}), { threshold: 0.12 });
$$(".reveal").forEach(el => revealObserver.observe(el));

waves($<HTMLCanvasElement>("#waves"), { lines: 60, start: 0.25 }, !reduceMotion);
waves($<HTMLCanvasElement>("#waves2"), { lines: 36, start: 0 }, !reduceMotion);
