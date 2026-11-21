import type { Context, Next } from "hono";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { errors, validateBet, type BetData } from "../../shared/index.ts";
import { getBody } from "../helpers/getBody.ts";

export const betValidator = async (c: Context, next: Next) => {
  const body = await getBody(c);
  const isValidBet = validateBet(body);
  if (isValidBet.error)
    return handleErrorResponse(c, errors.invalidBet, 400, true);

  c.set("bet", body);

  return next();
};
