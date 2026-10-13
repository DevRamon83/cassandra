import { Context } from "@hono/hono";
import { errors } from "../../shared/index.ts";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import createTokenConfigs from "../tokens/createTokenConfig.ts";
import setTokenAndCookie from "../tokens/setTokenAndCookie.ts";

export const newCookies = async (c: Context, username: string, id: string) => {
  const { accessConfig, refreshConfig } = createTokenConfigs(username, id);

  if (!accessConfig || !refreshConfig) {
    return handleErrorResponse(c, errors.invalidStandard, 500);
  }

  try {
    await setTokenAndCookie(c, accessConfig);
    await setTokenAndCookie(c, refreshConfig);
    return true;
  } catch {
    return false;
  }
};
