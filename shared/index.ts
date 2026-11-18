import { notAString } from "./guards/typeCheckers.ts";
import { emptyData } from "./guards/emptyData.ts";
import { z } from "zod";

export const guards = {
  notAString,
  emptyData,
};

export { serieA } from "./dictionaries/serieA.ts";
export { liga } from "./dictionaries/liga.ts";
export { premier } from "./dictionaries/premier.ts";
export { ligue1 } from "./dictionaries/ligue1.ts";
export { bundesliga } from "./dictionaries/bundesliga.ts";

export * from "./constants/atomics.ts";
export * as errors from "./constants/errors.ts";
export * as messages from "./constants/messages.ts";
export * as scopes from "./constants/scopes.ts";
export * from "./helpers.ts";
export * from "./schemas/authSchema.ts";
export { z };

export type * from "./typings/atomics.ts";
export type * from "./typings/AllMatches.ts";
