import type { Lang } from "./index.ts";

export type Sender = "in" | "out" | "sys";
/** One chat message: who sent it and its (trusted) HTML. */
export type Message = readonly [Sender, string];
/** Messages shown in the phone mock for one step of the customer journey. */
export type ChatStep = readonly Message[];

/** Illustrative Instagram Direct conversation, one entry per journey step. */
export const chats: Record<Lang, readonly ChatStep[]> = {
  uk: [
    [["in", "<span class='att'></span>Ось ця сукня з реклами, скільки коштує?"], ["out", "Це сукня-сорочка Linen, 1 450 ₴. Є в молочному, оливковому і чорному 🤍"]],
    [["in", "Зріст 168, вага 58, який розмір?"], ["out", "Вам підійде S. Можу оформити в молочному?"], ["in", "Хочу дві — молочну і чорну"], ["out", "Записала: 2 × S — молочна і чорна ✨"]],
    [["out", "Для доставки напишіть ПІБ, телефон і відділення"], ["in", "Олена Коваль 0671234567 київ нп 52"], ["out", "Київ, Нова Пошта №52 — все вірно?"]],
    [["out", "Оплата на картку або накладений платіж?"], ["in", "На картку, оплатила"], ["sys", "✓ оплату 2 900 ₴ підтверджено"], ["out", "Оплату отримали! ТТН надішлю, щойно відправимо 📦"]],
    [["out", "До цих суконь часто беруть лляний пояс — додати?"], ["in", "А він з натурального льону?"], ["out", "Не маю точної інформації — зараз підключу менеджера 🙌"], ["sys", "→ передано менеджеру · сповіщення в Telegram"]]
  ],
  en: [
    [["in", "<span class='att'></span>This dress from the ad — how much?"], ["out", "That's the Linen shirt dress, ₴1,450. Available in milk, olive and black 🤍"]],
    [["in", "I'm 168 cm, 58 kg — which size?"], ["out", "S will fit you. Shall I put it through in milk?"], ["in", "I want two — milk and black"], ["out", "Noted: 2 × S — milk and black ✨"]],
    [["out", "For delivery, send your full name, phone and branch"], ["in", "Olena Koval 0671234567 kyiv np 52"], ["out", "Kyiv, Nova Poshta branch #52 — correct?"]],
    [["out", "Card transfer or cash on delivery?"], ["in", "Card, just paid"], ["sys", "✓ payment of ₴2,900 confirmed"], ["out", "Payment received! I'll send the waybill as soon as it ships 📦"]],
    [["out", "People often add a linen belt to these dresses — want one?"], ["in", "Is it 100% natural linen?"], ["out", "I don't have exact info on that — connecting a manager now 🙌"], ["sys", "→ handed to manager · Telegram alert"]]
  ]
};
