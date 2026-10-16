import { Context, Next } from "@hono/hono";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { errors } from "../../shared/index.ts";

export const adminOnly = (c: Context, next: Next) => {
  const tokensData = c.get("tokensData");

  if (tokensData.username !== "admin") {
    const errorMessage = `${tokensData.username} ${errors.notAdmin}`;
    return handleErrorResponse(c, errorMessage, 400, true);
  }

  next();
};
