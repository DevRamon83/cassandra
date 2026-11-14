import type { Context } from "hono";
import { client } from "../db.ts";
import { errors } from "../../shared/index.ts";
import { updateMatchQuery } from "../queries/updateMatchQuery.ts";

export const updateMatch = async (c: Context) => {
  try {
    const body = c.get("matchToFix");

    const query = updateMatchQuery(body);
    if (!query) {
      return c.json({ error: true, errorMsg: errors.invalidStandard }, 500);
    }

    await client.query(query.text, query.values);

    return c.json({ error: false, message: "Success" }, 200);
  } catch (err) {
    const error = err as Error;
    console.log("error ", error.message);
    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
