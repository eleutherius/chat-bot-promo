import type { ChatStep } from "../content/chats.ts";

/** Data the build embeds as JSON in #page-data for the client script. */
export interface PageData {
  locale: string;
  chats: readonly ChatStep[];
  strings: {
    month: string;
    cheaper: string;
    pricier: string;
  };
}
