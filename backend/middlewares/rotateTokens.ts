import type { Context, Next } from "hono";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { newCookies } from "../services/newCookies.ts";
import { errors } from "../../shared/index.ts";

export const rotateToken = async (c: Context, next: Next) => {
  const tokensData = c.get("tokensData");

  if (tokensData.access !== "JwtTokenExpired") {
    return next();
  }

  const createdCookies = await newCookies(
    c,
    tokensData.username,
    tokensData.id,
  );

  if (!createdCookies)
    return handleErrorResponse(c, errors.invalidStandard, 400, true);

  return next();
};
