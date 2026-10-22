import type { Context, Next } from "hono";
import { getBody } from "../helpers/getBody.ts";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { authSchema, errors } from "../../shared/index.ts";

export const authValidator = async (c: Context, next: Next) => {
  const body = await getBody(c);
  if (!body) return handleErrorResponse(c, errors.bodyMissing, 400, true);

  const result = authSchema.safeParse(body);
  if (!result.success)
    return handleErrorResponse(c, errors.invalidStandard, 400, true);

  c.set("updateData", body);

  return next();
};
