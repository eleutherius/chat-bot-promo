/** Cost calculator settings, shared by the page template and the client script. */
export const CALC = {
  conv: { min: 20, max: 1000, step: 10, value: 350 },
  /** Default salary is a placeholder guess, not from the deck; users adjust it. */
  salary: { min: 10000, max: 80000, step: 1000, value: 35000 },
  /** Approximate AI cost per conversation, ₴ (from the pitch deck). */
  costPerConversation: 1,
  daysPerMonth: 30,
} as const;
