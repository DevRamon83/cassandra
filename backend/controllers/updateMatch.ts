import type { Context } from "hono";
import { client } from "../db.ts";
import { errors } from "../../shared/index.ts";
import { updateMatchQuery } from "../queries/updateMatchQuery.ts";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { getMatchOutcomes } from "../helpers/getMatchData.ts";

export const updateMatch = async (c: Context) => {
  try {
    const body = c.get("matchToFix");

    const outcomes = getMatchOutcomes(body);

    if (!outcomes) {
      return handleErrorResponse(c, errors.invalidStandard, 400, true);
    }

    const query = updateMatchQuery(body, outcomes);
    if (!query) {
      return handleErrorResponse(c, errors.invalidStandard, 400, true);
    }

    await client.query(query.text, query.values);
    return c.json({ error: false, message: "Success" }, 200);
  } catch (err) {
    const error = err as Error;
    console.log("error ", error.message);
    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
