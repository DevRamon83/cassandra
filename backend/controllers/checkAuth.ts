import type { Context } from "hono";

export const checkAuth = (c: Context) => {
  const tokensData = c.get("tokensData");
  return c.json({ error: false, username: tokensData.username }, 200);
};
