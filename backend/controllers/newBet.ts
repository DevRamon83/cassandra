import type { Context } from "hono";
import { client } from "../db.ts";
import { errors } from "../../shared/index.ts";
import { newBetQuery } from "../queries/newBetQuery.ts";

export const newBet = async (c: Context) => {
  try {
    const body = c.get("bet");
    const tokensData = c.get("tokensData");
    const { id: userID } = tokensData;

    const query = newBetQuery(body, userID);
    if (!query) {
      return c.json({ error: true, errorMsg: errors.invalidStandard }, 500);
    }

    const { rows } = await client.query(query.text, query.values);

    if (rows.length === 0) {
      return c.json({ error: true, errorMsg: errors.invalidStandard }, 400);
    }

    const betId = rows[0].bet_id;

    return c.json({ error: false, betId }, 200);
  } catch (err) {
    const error = err as Error;
    console.log("error ", error.message);
    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
