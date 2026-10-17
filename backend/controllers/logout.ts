import type { Context } from "hono";
import { deleteCookie } from "hono/cookie";
import { errors } from "../../shared/index.ts";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";

export const logout = (c: Context) => {
  try {
    const accessKey = Bun.env.ACCESS_TOKEN;
    const refreshKey = Bun.env.REFRESH_TOKEN;

    if (!accessKey || !refreshKey) {
      return handleErrorResponse(c, errors.invalidStandard, 500, true);
    }

    const deleteOptions = { path: "/" };

    deleteCookie(c, accessKey, deleteOptions);
    deleteCookie(c, refreshKey, deleteOptions);

    return c.json({ error: false, message: "Success" }, 200);
  } catch (err) {
    const error = err as Error;
    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
