import { createToken } from "./createToken.ts";
import type { Context } from "hono";
import { setCookie } from "hono/cookie";

export const cookieSettings = {
  httpOnly: true,
  secure: Bun.env.NODE_ENV === "PROD",
  sameSite: "strict" as const,
  path: "/",
  maxAge: 3600,
};

interface config {
  username: string;
  id: string;
  expiresIn: string;
  tokenName: string;
  maxAge: number | null;
}

const setTokenAndCookie = async (c: Context, dataConfig: config) => {
  const { username, id, expiresIn, tokenName } = dataConfig;

  if (dataConfig.maxAge !== null) {
    cookieSettings.maxAge = dataConfig.maxAge;
  }

  const token = await createToken(username, id, expiresIn);

  if (!token) return false;
  setCookie(c, tokenName, token, cookieSettings);
  return true;
};

export default setTokenAndCookie;
