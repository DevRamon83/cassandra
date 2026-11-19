import type { Context } from "hono";
import { client } from "../db.ts";
import { errors, getCurrentSeason, scopes } from "../../shared/index.ts";
import { getBody } from "../helpers/getBody.ts";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { bankrollQuery } from "../queries/bankrollQuery.ts";

export const bankroll = async (c: Context) => {
  try {
    const auth = c.get("tokensData");
    const { id: authID, username } = auth;

    const { id, budget } = await getBody(c);
    if (id !== authID) {
      const errorMsg = scopes.backend.bankroll + errors.authAttack;
      return handleErrorResponse(c, errorMsg, 404, true);
    }

    if (typeof budget !== "number" || Number.isNaN(budget) || budget <= 0) {
      const errorMsg = scopes.backend.bankroll + errors.notANum;
      return handleErrorResponse(c, errorMsg, 404, true);
    }

    const currentSeason = getCurrentSeason();
    const data = {
      user_id: authID,
      current_budget: budget,
      initial_budget: budget,
      season: currentSeason,
    };

    const query = bankrollQuery(data);
    if (!query) {
      return c.json({ error: true, errorMsg: errors.invalidStandard }, 500);
    }

    const { rows } = await client.query(query.text, query.values);

    const res = {
      id: authID,
      username,
      bankroll_id: rows[0].id,
      current_budget: budget,
      initial_budget: budget,
      season: currentSeason,
    };

    return c.json({ error: false, data: res }, 200);
  } catch (err) {
    const error = err as Error;
    console.log("error ", error.message);
    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
