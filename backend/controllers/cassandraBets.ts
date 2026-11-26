import type { Context } from "hono";
import { errors, getCurrentSeason } from "../../shared/index.ts";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { client } from "../db.ts";
import { getMyBetsQuery } from "../queries/getMyBetsQuery.ts";
import { formatUserBets } from "../helpers/formatUserBets.ts";

export const cassandraBets = async (c: Context) => {
  const userID = Bun.env.ADMIN_ID;

  try {
    const query = getMyBetsQuery(userID!);

    if (!query)
      return handleErrorResponse(c, errors.invalidStandard, 400, false);

    const { rows } = await client.query(query.text, query.values);
    const data = formatUserBets(rows).reverse();
    const season = getCurrentSeason();
    const currentBets = data.filter((bet) => season === bet.season);

    return c.json({ error: false, data: currentBets }, 200);
  } catch (err) {
    const error = err as Error;

    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
