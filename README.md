# Fineko landing

Лендинг Fineko (AI-продавець і CRM для Instagram-магазинів) українською та англійською.
Написаний на TypeScript. Збірка генерує статичні HTML-сторінки, окрему для кожної мови.

```bash
npm install
npm run dev        # http://localhost:5173, перезбирається при змінах у src/
npm run build      # → dist/index.html (UA), dist/en/index.html (EN)
npm run typecheck
```

`dist/` — готовий статичний сайт: його можна викласти на GitHub Pages, Netlify, Vercel або будь-який веб-сервер.

## Структура

| Шлях | Що там |
| --- | --- |
| `src/content/uk.ts`, `en.ts` | Усі тексти. `uk.ts` — еталон ключів; якщо в `en.ts` бракує ключа, `typecheck` впаде |
| `src/content/chats.ts` | Ілюстративний діалог у макеті телефона |
| `src/content/calc.ts` | Параметри калькулятора економії |
| `src/sections/*.ts` | Шаблони розділів сторінки (функції, що повертають HTML) |
| `src/page.ts` | Збирає документ: `<head>`, розділи, вбудовані CSS/JS |
| `src/client/*.ts` | Код для браузера: прокрутка з чатом, калькулятор, вкладки дашборда, анімація хвиль |
| `src/styles.css` | Стилі (мініфікуються й вбудовуються в HTML) |
| `scripts/build.ts`, `dev.ts` | Збірка і локальний сервер |

Щоб додати мову: створіть `src/content/<lang>.ts` з типом `Record<Key, string>`, додайте її в `LANGS` у `src/content/index.ts` і в `chats.ts`.

## Деплой

Кожен push у `main` автоматично збирає сайт і публікує `dist/` на GitHub Pages (`.github/workflows/deploy.yml`).
Одноразово потрібно ввімкнути: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
Адреса: https://eleutherius.github.io/chat-bot-promo/ (англійська — `/en/`).
