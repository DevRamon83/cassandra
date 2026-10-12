import { createToken } from "./createToken.ts";
import { Context } from "@hono/hono";
import { setCookie } from "@hono/hono/cookie";

export const cookieSettings = {
  httpOnly: true,
  secure:
    process.env.NODE_ENV === "prod" || Deno.env.get("DENO_ENV") === "prod",
  sameSite: "Strict" as const,
  path: "/",
  maxAge: 3600,
};

interface config {
  username: string;
  expiresIn: string;
  tokenName: string;
  maxAge: number | null;
}

const setTokenAndCookie = async (c: Context, dataConfig: config) => {
  const { username, expiresIn, tokenName } = dataConfig;

  if (dataConfig.maxAge !== null) {
    cookieSettings.maxAge = dataConfig.maxAge;
  }

  const token = await createToken(username, expiresIn);

  if (!token) return false;
  setCookie(c, tokenName, token, cookieSettings);
  return true;
};

export default setTokenAndCookie;
