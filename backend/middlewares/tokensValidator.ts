import { getCookie } from "hono/cookie";
import type { Next, Context } from "hono";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { errors } from "../../shared/index.ts";
import { verify } from "hono/jwt";
import type { CheckTokenResult, tokensInterface } from "../typings/atomics.ts";

const checkToken = async (
  token: string | undefined,
): Promise<CheckTokenResult> => {
  const secret = Bun.env.SECRET;
  if (!secret || !token)
    return { status: ".envMissing", username: null, id: null };

  try {
    const payload = await verify(token, secret, "HS256");
    const user = payload.username as string;
    const userID = payload.id as string;
    return { status: "valid", username: user, id: userID };
  } catch (err) {
    const error = err as Error;
    return { status: error.name, username: null, id: null };
  }
};

const analyzeToken = async (
  tokenName: keyof tokensInterface,
  token: string,
  tokensData: tokensInterface,
) => {
  const myToken = await checkToken(token);

  if (!myToken.username || !myToken.id) {
    tokensData[tokenName] = myToken.status;
  } else {
    tokensData[tokenName] = "valid";
    tokensData.username = myToken.username;
    tokensData.id = myToken.id;
  }
};

export const tokensValidator = async (c: Context, next: Next) => {
  const accessKey = Bun.env.ACCESS_TOKEN;
  const refreshKey = Bun.env.REFRESH_TOKEN;
  const tokensData = {
    access: "",
    refresh: "",
    username: "",
    id: "",
  };

  if (!accessKey || !refreshKey)
    return handleErrorResponse(c, errors.invalidStandard, 400, true);

  const access = getCookie(c, accessKey);
  if (!access)
    return handleErrorResponse(c, errors.invalidStandard, 400, false);

  await analyzeToken("access", access, tokensData);

  if (tokensData.access === "valid") {
    c.set("tokensData", tokensData);
    return next();
  }

  if (tokensData.access === "JwtTokenInvalid") {
    return handleErrorResponse(c, errors.invalidToken, 400, true);
  }

  const refresh = getCookie(c, refreshKey);
  if (!refresh)
    return handleErrorResponse(c, errors.invalidStandard, 400, false);

  await analyzeToken("refresh", refresh, tokensData);

  if (tokensData.username) {
    c.set("tokensData", tokensData);
    return next();
  }

  if (tokensData.refresh === "JwtTokenExpired") {
    return handleErrorResponse(c, errors.sessionExpired, 400, false);
  } else {
    return handleErrorResponse(c, errors.invalidToken, 400, true);
  }
};
