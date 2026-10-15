import { Context } from "@hono/hono";
import { overrideQuery } from "../queries/overrideQuery.ts";
import { client } from "../db.ts";
import { cacheLeagueData } from "../services/cacheLeagueData.ts";
export const override = async (c: Context) => {
  try {
    const body = c.get("updateData");

    const query = overrideQuery(body);

    await client.query(query.text, query.values);

    await cacheLeagueData(body.league, body.season);

    return c.json({ error: false, message: "Success" }, 200);
  } catch (err) {
    const error = err as Error;
    console.log("error ", error.message);
    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
