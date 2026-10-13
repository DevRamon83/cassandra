import { getCookie } from "@hono/hono/cookie";
import { Context, Next } from "@hono/hono";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { errors } from "../../shared/index.ts";
import { verify } from "@hono/hono/jwt";
import { CheckTokenResult, tokensInterface } from "../typings/atomics.ts";

const checkToken = async (
  token: string | undefined,
): Promise<CheckTokenResult> => {
  const secret = Deno.env.get("SECRET");
  if (!secret || !token)
    return { error: ".envMissing", username: null, id: null };

  try {
    const payload = await verify(token, secret, "HS256");
    const user = payload.username as string;
    const userID = payload.id as string;
    return { error: false, username: user, id: userID };
  } catch (err) {
    const error = err as Error;
    return { error: error.name, username: null, id: null };
  }
};

const analyzeToken = async (
  tokenName: keyof tokensInterface,
  token: string,
  tokensData: tokensInterface,
) => {
  const myToken = await checkToken(token);

  if (!myToken.username || !myToken.id) {
    tokensData[tokenName] = `${myToken.error}`;
  } else {
    tokensData[tokenName] = "valid";
    tokensData.username = myToken.username;
    tokensData.id = myToken.id;
  }
};

export const tokensValidator = async (c: Context, next: Next) => {
  const accessKey = Deno.env.get("ACCESS_TOKEN");
  const refreshKey = Deno.env.get("REFRESH_TOKEN");
  const tokensData = {
    access: "",
    refresh: "",
    username: "",
    id: "",
  };

  if (!accessKey || !refreshKey)
    return handleErrorResponse(c, errors.invalidStandard, 400);

  const access = getCookie(c, accessKey);
  if (!access) return handleErrorResponse(c, errors.invalidStandard, 400);

  await analyzeToken("access", access, tokensData);

  if (tokensData.access === "valid") {
    c.set("tokensData", tokensData);
    return next();
  }

  if (tokensData.access === "JwtTokenInvalid") {
    // must have a log system
    console.error("malformed token");
    return handleErrorResponse(c, errors.invalidStandard, 400);
  }

  const refresh = getCookie(c, refreshKey);
  if (!refresh) return handleErrorResponse(c, errors.invalidStandard, 400);

  await analyzeToken("refresh", refresh, tokensData);

  if (tokensData.username) {
    c.set("tokensData", tokensData);
    return next();
  }

  if (tokensData.refresh === "JwtTokenExpired") {
    return handleErrorResponse(c, errors.sessionExpired, 400);
  } else {
    console.error("malformed token");
    return handleErrorResponse(c, errors.invalidStandard, 400);
  }
};
