import type { Context } from "hono";
import { errors } from "../../shared/index.ts";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { client } from "../db.ts";
import { getMyBetsQuery } from "../queries/getMyBetsQuery.ts";
import { formatUserBets } from "../helpers/formatUserBets.ts";

export const myBets = async (c: Context) => {
  const tokensData = c.get("tokensData");
  const { id: userID } = tokensData;
  try {
    const query = getMyBetsQuery(userID);

    if (!query)
      return handleErrorResponse(c, errors.invalidStandard, 400, false);

    const { rows } = await client.query(query.text, query.values);

    const data = formatUserBets(rows);

    return c.json({ error: false, data }, 200);
  } catch (err) {
    const error = err as Error;

    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
