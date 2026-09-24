import { Context } from "@hono/hono";
import { getBody } from "../helpers/getBody.ts";
import { apiFootball } from "../services/apiFootball.ts";

export const createMatch = async (c: Context) => {
  try {
    const body = await getBody(c);
    if (!body) {
      // handle return
    }

    const matchesData = await apiFootball(body);

    console.log(matchesData);
    return c.json({ error: false, data: matchesData }, 200);
  } catch (err) {
    const error = err as Error;

    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
